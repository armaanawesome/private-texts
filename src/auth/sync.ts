import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { getSupabase } from './client';
import { describeAuthError } from './session';
import type { Message } from '@/i18n/message';
import { saveBlobSchema, type SaveBlob } from '@/state/saveBlob';
import { saveKey, caseIdFromSaveKey } from '@/state/saveKeys';
import { planSaveSync } from '@/state/saveMerge';

/**
 * Cross-device progress sync.
 *
 * All the logic that could lose a player's progress lives in
 * src/state/saveMerge.ts, which is pure and tested. What is left here is the
 * I/O: read every local save, read the player's rows, apply the plan both ways.
 *
 * The one thing to know before calling: this reads the SAVED blobs, not the
 * live store. A case that is open right now has unsaved state in useCaseStore,
 * so call `saveProgress(caseId)` first or sync from a screen where no case is
 * in progress. The sign-in screen is the latter.
 */

export const PROGRESS_TABLE = 'case_progress';

/**
 * Postgres columns are snake_case; the app's blob is camelCase. Rather than
 * keep a second shape, a row is mapped into the app's field names and then run
 * through `saveBlobSchema` — the exact schema the local save uses — so a row
 * written by a newer build, or hand-edited in the dashboard, is validated and
 * never cast.
 */
const remoteRowSchema = z.object({
  case_id: z.string(),
  read_message_ids: z.array(z.string()).nullable(),
  confirmed_contradiction_ids: z.array(z.string()).nullable(),
  last_thread_id: z.string().nullable(),
  last_message_id: z.string().nullable(),
  // Nullable because a row written before the column existed carries no value,
  // and a null there means unsolved rather than unreadable.
  solved: z.boolean().nullable(),
});

const SELECT_COLUMNS =
  'case_id, read_message_ids, confirmed_contradiction_ids, last_thread_id, last_message_id, solved';

export type SyncResult =
  /** Nothing was attempted, and that is fine — no account, or accounts are off. */
  | { kind: 'skipped'; reason: Message }
  | { kind: 'failed'; reason: Message }
  | { kind: 'synced'; downloaded: number; uploaded: number };

/** Every case save on this device, keyed by case id. */
async function readLocalSaves(): Promise<Map<string, SaveBlob>> {
  const saves = new Map<string, SaveBlob>();
  const allKeys = await AsyncStorage.getAllKeys();

  // AsyncStorage is one flat namespace shared with Supabase's own session
  // entry, so the keys are filtered rather than assumed.
  const keys = allKeys.filter((key) => caseIdFromSaveKey(key) !== null);
  if (keys.length === 0) return saves;

  for (const [key, raw] of await AsyncStorage.multiGet(keys)) {
    const caseId = caseIdFromSaveKey(key);
    if (caseId === null || raw === null) continue;
    try {
      saves.set(caseId, saveBlobSchema.parse(JSON.parse(raw)));
    } catch {
      // One corrupt save must not sink the sync for every other case. Skipping
      // it means the merge treats this case as local-empty, so the server copy
      // is adopted whole — which is a repair, not a loss.
      continue;
    }
  }
  return saves;
}

export async function syncProgress(): Promise<SyncResult> {
  const handle = getSupabase();
  // A config problem, not a player problem — it means the build shipped without
  // Supabase keys. Raw on purpose: the audience is whoever is holding the
  // developer build, and translating it would only make it harder to search for.
  if (handle.kind === 'unavailable') return { kind: 'skipped', reason: { raw: handle.reason } };
  const { client } = handle;

  try {
    // getSession, not getUser: getUser makes a network round trip to validate
    // the token, so an offline player would be told they are not signed in
    // rather than that the connection failed. getSession reads the stored
    // session and refreshes only if it has expired.
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    const user = sessionData.session?.user ?? null;
    if (sessionError || !user) {
      return { kind: 'skipped', reason: { key: 'sync.notSignedIn' } };
    }

    const local = await readLocalSaves();

    const { data, error } = await client
      .from(PROGRESS_TABLE)
      .select(SELECT_COLUMNS)
      // Redundant under row-level security, which already restricts this to the
      // caller's own rows. Kept because defence in depth costs nothing here and
      // it states the intent at the call site: this query is per-user.
      .eq('user_id', user.id);

    if (error) return { kind: 'failed', reason: describeAuthError(error.message) };

    const remote = new Map<string, SaveBlob>();
    for (const row of data ?? []) {
      const parsed = remoteRowSchema.safeParse(row);
      if (!parsed.success) continue;
      const blob = saveBlobSchema.safeParse({
        readMessageIds: parsed.data.read_message_ids ?? [],
        confirmedContradictionIds: parsed.data.confirmed_contradiction_ids ?? [],
        lastThreadId: parsed.data.last_thread_id,
        lastMessageId: parsed.data.last_message_id,
        solved: parsed.data.solved ?? false,
      });
      if (blob.success) remote.set(parsed.data.case_id, blob.data);
    }

    const plan = planSaveSync(local, remote);

    /*
     * Local first.
     *
     * The merged blob is a superset of what is already on this device, so
     * writing it can only add. If the upload then fails, the player keeps
     * everything both devices knew and the next sync retries the push — whereas
     * pushing first and failing the local write would report success while this
     * device still lacked what it just downloaded.
     */
    if (plan.toLocal.length > 0) {
      await AsyncStorage.multiSet(
        plan.toLocal.map(({ caseId, blob }) => [saveKey(caseId), JSON.stringify(blob)]),
      );
    }

    if (plan.toRemote.length > 0) {
      const now = new Date().toISOString();
      const { error: upsertError } = await client.from(PROGRESS_TABLE).upsert(
        plan.toRemote.map(({ caseId, blob }) => ({
          user_id: user.id,
          case_id: caseId,
          read_message_ids: blob.readMessageIds,
          confirmed_contradiction_ids: blob.confirmedContradictionIds,
          last_thread_id: blob.lastThreadId,
          last_message_id: blob.lastMessageId,
          solved: blob.solved,
          updated_at: now,
        })),
        // The table's primary key. Without naming it, a second sync from the
        // same account inserts duplicate rows instead of updating.
        { onConflict: 'user_id,case_id' },
      );
      if (upsertError) return { kind: 'failed', reason: describeAuthError(upsertError.message) };
    }

    return { kind: 'synced', downloaded: plan.toLocal.length, uploaded: plan.toRemote.length };
  } catch (e) {
    // A dropped connection mid-sync must not become an unhandled rejection.
    // Nothing above deletes anything, so a failure here is always recoverable
    // by syncing again.
    return { kind: 'failed', reason: describeAuthError(e instanceof Error ? e.message : String(e)) };
  }
}

/**
 * Player-facing summary of a finished sync.
 *
 * Four whole sentences rather than a stem plus comma-joined fragments. The
 * fragment version built `Case notes synced — 2 brought back, 1 backed up.` in
 * code, which hands a translator two noun phrases and an em dash and assumes
 * their language joins clauses in that order with that punctuation. Several do
 * not, and none of them can fix it from the catalogue.
 */
export function describeSyncResult(result: SyncResult): Message {
  switch (result.kind) {
    case 'skipped':
    case 'failed':
      return result.reason;
    case 'synced': {
      const { downloaded, uploaded } = result;
      if (downloaded === 0 && uploaded === 0) return { key: 'sync.upToDate' };
      if (downloaded > 0 && uploaded > 0) {
        return { key: 'sync.both', params: { downloaded, uploaded } };
      }
      return downloaded > 0
        ? { key: 'sync.downloaded', params: { count: downloaded } }
        : { key: 'sync.uploaded', params: { count: uploaded } };
    }
  }
}
