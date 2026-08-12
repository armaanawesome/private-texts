import { z } from 'zod';

/**
 * The shape of a saved case, in exactly one place.
 *
 * This schema used to live inline in persistence.ts. Sync needs the same shape
 * to validate a row that came back from Supabase, and two hand-written copies
 * of a shape are two things that drift: the remote parser would go on accepting
 * a field the local one had already dropped, and the bug would look like a
 * server problem rather than a duplicated definition.
 *
 * Saves are validated, not cast. `as SaveBlob` on parsed JSON is a lie the
 * compiler cannot check: a hand-edited save, a corrupted write, or a row
 * written by an older build could put a string where the app expects an array,
 * and the failure would surface far from here.
 */
export const saveBlobSchema = z.object({
  /**
   * `.catch(() => [])`, not `.catch([])`.
   *
   * The value form hands every failed parse the *same* array instance, so two
   * corrupt saves would share one list and a caller that pushed into one would
   * silently edit the other. The factory form gives each parse its own array —
   * the same reason `empty()` in caseStore.ts is a function.
   */
  readMessageIds: z.array(z.string()).catch(() => []),
  confirmedContradictionIds: z.array(z.string()).catch(() => []),
});

export type SaveBlob = z.infer<typeof saveBlobSchema>;

/** Fresh arrays every call, for the reason given above. */
export const emptySave = (): SaveBlob => ({
  readMessageIds: [],
  confirmedContradictionIds: [],
});

const PREFIX = 'save:';

export const saveKey = (caseId: string): string => `${PREFIX}${caseId}`;

/**
 * The case id inside a save key, or null if the key is not a save.
 *
 * AsyncStorage is one flat namespace shared with Supabase's own session key and
 * anything a future feature stores, so sync cannot assume every key it finds is
 * a case. Reading `supabase.auth.token` as a case id would send a garbage row
 * to the server on every launch.
 */
export function caseIdFromSaveKey(key: string): string | null {
  if (!key.startsWith(PREFIX)) return null;
  const caseId = key.slice(PREFIX.length);
  return caseId === '' ? null : caseId;
}
