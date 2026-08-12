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

  /**
   * Where the player actually was, so Continue can return them to the
   * conversation rather than dropping them on the case index.
   *
   * Both recover to null rather than failing, because every save written before
   * resume shipped is missing them. An old save is not a corrupt save — if
   * these threw, `loadProgress` would delete a perfectly good playthrough as
   * unreadable. Missing simply means "no conversation to return to".
   */
  lastThreadId: z.string().nullable().catch(() => null),
  lastMessageId: z.string().nullable().catch(() => null),
});

export type SaveBlob = z.infer<typeof saveBlobSchema>;

/** Fresh arrays every call, for the reason given above. */
export const emptySave = (): SaveBlob => ({
  readMessageIds: [],
  confirmedContradictionIds: [],
  lastThreadId: null,
  lastMessageId: null,
});

/*
 * The key space deliberately does NOT live here. saveKeys.ts owns it, and this
 * module owns the shape. Keeping a second `save:` prefix next to the schema is
 * how the two definitions drift apart.
 */
