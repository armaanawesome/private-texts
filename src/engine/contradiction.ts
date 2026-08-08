import type { Claim, Place } from './types';
import { windowsOverlap } from './time';
import { placesConflict } from './places';

export type ContradictionVerdict =
  | { readonly ok: true; readonly reason: string }
  | { readonly ok: false; readonly reason: string };

/**
 * Decides whether two claims cannot both be true.
 *
 * Deliberately conservative: it only fires on rules a player can verify by reading.
 * The `reason` on a rejection is player-facing — when a pairing does not contradict,
 * the game explains why, which turns a wrong guess into a lesson rather than a wall.
 */
export function checkContradiction(
  places: readonly Place[],
  a: Claim,
  b: Claim,
): ContradictionVerdict {
  if (a.id === b.id) {
    return { ok: false, reason: 'That is the same statement twice.' };
  }
  if (a.subject !== b.subject) {
    return { ok: false, reason: 'These are about different people.' };
  }
  if (!windowsOverlap(a.window, b.window)) {
    return { ok: false, reason: 'These describe different times.' };
  }
  if (a.predicate.kind !== b.predicate.kind) {
    return { ok: false, reason: 'These describe different kinds of thing.' };
  }

  if (a.predicate.kind === 'at_place' && b.predicate.kind === 'at_place') {
    return placesConflict(places, a.predicate.placeId, b.predicate.placeId)
      ? { ok: true, reason: 'One person, two places, same moment.' }
      : { ok: false, reason: 'Those two places are the same area.' };
  }

  if (a.predicate.kind === 'doing' && b.predicate.kind === 'doing') {
    const sameGroup = a.predicate.exclusiveGroup === b.predicate.exclusiveGroup;
    const differentAction = a.predicate.actionId !== b.predicate.actionId;
    return sameGroup && differentAction
      ? { ok: true, reason: 'They cannot have been doing both at once.' }
      : { ok: false, reason: 'Those two things can both be true.' };
  }

  // with_person: being with one person does not exclude being with another.
  return { ok: false, reason: 'Those two things can both be true.' };
}
