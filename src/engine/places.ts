import type { Place } from './types';

function ancestryOf(places: readonly Place[], id: string): string[] {
  const byId = new Map(places.map((p) => [p.id, p]));
  const chain: string[] = [];
  let cursor: string | undefined = id;
  // Guard against a malformed case script that loops parentId back on itself.
  const seen = new Set<string>();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    chain.push(cursor);
    cursor = byId.get(cursor)?.parentId;
  }
  return chain;
}

/**
 * True when a person cannot be at both places at once.
 * Nested places do not conflict — standing on the pier is standing at the harbour.
 */
export function placesConflict(places: readonly Place[], idA: string, idB: string): boolean {
  if (idA === idB) return false;
  const a = ancestryOf(places, idA);
  const b = ancestryOf(places, idB);
  return !a.includes(idB) && !b.includes(idA);
}
