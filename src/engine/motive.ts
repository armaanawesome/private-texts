import type { Motive } from './types';

/**
 * Motives the player has actually earned.
 *
 * A motive is established by reading — every message behind it, not just one —
 * so it cannot be stumbled into by pairing chips on the board. That is the whole
 * point of it being a separate axis: the alibi is broken by comparing, the
 * reason is found by reading.
 */
export function establishedMotiveIds(
  motives: readonly Motive[],
  readMessageIds: readonly string[],
): string[] {
  const read = new Set(readMessageIds);
  return motives
    .filter(
      (m) =>
        // An empty requirement would be vacuously true and hand the player a
        // motive they never found. Treat it as unauthored rather than free.
        m.establishedByMessageIds.length > 0 &&
        m.establishedByMessageIds.every((id) => read.has(id)),
    )
    .map((m) => m.id);
}

/** Established motives naming one person. */
export function motivesFor(
  motives: readonly Motive[],
  characterId: string,
  readMessageIds: readonly string[],
): Motive[] {
  const established = new Set(establishedMotiveIds(motives, readMessageIds));
  return motives.filter((m) => m.characterId === characterId && established.has(m.id));
}
