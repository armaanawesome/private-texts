import { emptySave, type SaveBlob } from './saveBlob';

/**
 * Merging two saves is a UNION, never an overwrite. This is the whole rule.
 *
 * The two obvious implementations are both wrong in the same way. "Last write
 * wins" throws away whichever device the player used second-to-last; "newest
 * `updated_at` wins" does the same thing with extra steps and a clock the
 * client does not control. Either one can silently delete an evening of
 * reading, and the player has no way to get it back — there is no undo for a
 * sync.
 *
 * Union cannot lose anything. Its failure mode is the harmless one: a message
 * marked read that the player does not remember reading. Both arrays are sets
 * of ids where re-adding an id is a no-op, so there is no state that union can
 * corrupt. That asymmetry is why this file does not take a timestamp at all.
 */

/**
 * Every id in `a`, then every id in `b` that `a` did not already have.
 *
 * Order is `a`-first and stable rather than sorted, so a merge that changes
 * nothing produces an array equal to what was already stored — which is what
 * lets `savesDiffer` skip the write instead of churning storage and the network
 * on every launch.
 */
function union(a: readonly string[], b: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of [a, b]) {
    for (const id of list) {
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

/**
 * The resume pointer, taken from ONE side as a pair.
 *
 * `lastThreadId` and `lastMessageId` cannot be unioned — they are scalars, and
 * there is no "both" to keep. More importantly they cannot be merged field by
 * field either: a message id only means anything inside its own thread, so
 * pairing this device's thread with the other device's message would resume the
 * player at a message that is not in the thread they land in.
 *
 * Local wins when both sides have one. The player is holding *this* device, and
 * a pointer synced from the tablet would teleport them somewhere they were not.
 * Nothing is lost either way: the worst case for a dropped pointer is landing
 * on the case index instead of mid-conversation, which is why the never-lose
 * rule that governs the id arrays does not govern this.
 */
function resumePointer(
  local: SaveBlob | null,
  remote: SaveBlob | null,
): Pick<SaveBlob, 'lastThreadId' | 'lastMessageId'> {
  for (const side of [local, remote]) {
    if (side && side.lastThreadId !== null) {
      return { lastThreadId: side.lastThreadId, lastMessageId: side.lastMessageId };
    }
  }
  return { lastThreadId: null, lastMessageId: null };
}

/**
 * `null` means "this side has no save for this case" — a case the player has
 * only ever opened on the other device. It is deliberately not an error, and
 * deliberately not distinct from an empty save: both mean "contributes
 * nothing", and collapsing them here keeps every caller from re-deciding it.
 */
export function mergeSaves(local: SaveBlob | null, remote: SaveBlob | null): SaveBlob {
  const l = local ?? emptySave();
  const r = remote ?? emptySave();
  return {
    readMessageIds: union(l.readMessageIds, r.readMessageIds),
    confirmedContradictionIds: union(l.confirmedContradictionIds, r.confirmedContradictionIds),
    ...resumePointer(local, remote),
  };
}

function sameIds(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

/**
 * Whether writing `next` over `previous` would actually change anything.
 *
 * Without this, a signed-in player pays one AsyncStorage write and one row
 * upsert per case on every launch and every foreground, forever, to store bytes
 * that were already there. Order-sensitive on purpose: `mergeSaves` is stable,
 * so equal content really does mean equal arrays here.
 */
export function savesDiffer(previous: SaveBlob | null, next: SaveBlob): boolean {
  if (previous === null) return true;
  return (
    !sameIds(previous.readMessageIds, next.readMessageIds) ||
    !sameIds(previous.confirmedContradictionIds, next.confirmedContradictionIds) ||
    // The resume pointer counts. Comparing only the arrays would mean a player
    // who moved to a new thread and read nothing new never has that synced.
    previous.lastThreadId !== next.lastThreadId ||
    previous.lastMessageId !== next.lastMessageId
  );
}

export interface SavePlanEntry {
  caseId: string;
  blob: SaveBlob;
}

export interface SyncPlan {
  /** Cases whose on-device save is missing something the server had. */
  toLocal: SavePlanEntry[];
  /** Cases whose server row is missing something this device had, or absent. */
  toRemote: SavePlanEntry[];
}

/**
 * Decides what a sync should write, without performing any of it.
 *
 * Pure so the interesting half of sync is testable in the Node suite: the I/O
 * around it is a storage call and a Supabase upsert, neither of which can run
 * here, but neither of which contains a decision. Everything that could lose a
 * player's progress is in this function.
 */
export function planSaveSync(
  local: ReadonlyMap<string, SaveBlob>,
  remote: ReadonlyMap<string, SaveBlob>,
): SyncPlan {
  const plan: SyncPlan = { toLocal: [], toRemote: [] };

  // Sorted, so a plan is reproducible and a failing test names the same case
  // every run. Set union covers a case that exists on only one of the two.
  const caseIds = [...new Set([...local.keys(), ...remote.keys()])].sort();

  for (const caseId of caseIds) {
    const here = local.get(caseId) ?? null;
    const there = remote.get(caseId) ?? null;
    const merged = mergeSaves(here, there);
    if (savesDiffer(here, merged)) plan.toLocal.push({ caseId, blob: merged });
    if (savesDiffer(there, merged)) plan.toRemote.push({ caseId, blob: merged });
  }

  return plan;
}
