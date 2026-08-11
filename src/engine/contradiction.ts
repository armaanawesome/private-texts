import type { CaseObject, Claim, Place } from './types';
import { windowsOverlap } from './time';
import { placesConflict } from './places';
import { anchorOf } from './anchor';

export type ContradictionVerdict =
  | { readonly ok: true; readonly reason: string }
  | { readonly ok: false; readonly reason: string };

/**
 * The world the rules are judged against.
 *
 * A `CaseScript` satisfies this structurally, so call sites pass the script
 * itself and never have to keep an argument list in sync.
 */
export interface RuleContext {
  readonly places: readonly Place[];
  readonly objects: readonly CaseObject[];
}

/**
 * Decides whether two claims cannot both be true.
 *
 * Deliberately conservative: it only fires on rules a player can verify by
 * reading. The `reason` on a rejection is player-facing — when a pairing does
 * not conflict, the game explains why, which turns a wrong guess into a lesson
 * rather than a wall, and is the clearest evidence that a real rules engine is
 * running underneath rather than a scripted if-statement.
 *
 * Pairs are matched on their **anchor** rather than their subject. For place,
 * action and company the anchor is the subject, so those rules are unchanged.
 * An object claim anchors on the object, which is what lets two accounts of who
 * held one thing meet each other — they name different people by definition, so
 * the old subject rule discarded them before any rule could look.
 */
export function checkContradiction(ctx: RuleContext, a: Claim, b: Claim): ContradictionVerdict {
  if (a.id === b.id) {
    return { ok: false, reason: 'That is the same statement twice.' };
  }

  if (anchorOf(a) !== anchorOf(b)) {
    return { ok: false, reason: mismatchReason(a, b) };
  }

  if (!windowsOverlap(a.window, b.window)) {
    return { ok: false, reason: 'These describe different times.' };
  }

  if (a.predicate.kind !== b.predicate.kind) {
    return { ok: false, reason: 'These describe different kinds of thing.' };
  }

  if (a.predicate.kind === 'at_place' && b.predicate.kind === 'at_place') {
    return placesConflict(ctx.places, a.predicate.placeId, b.predicate.placeId)
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

  if (a.predicate.kind === 'has_object' && b.predicate.kind === 'has_object') {
    // Same anchor already guarantees the same object; what matters is whether
    // two different hands are claiming it, and whether there is only one of it.
    if (a.subject === b.subject) {
      return { ok: false, reason: 'Both statements put it in the same hands.' };
    }
    // Bound outside the closure: TypeScript drops the narrowing on `a.predicate`
    // once it is read inside a callback.
    const objectId = a.predicate.objectId;
    // An undeclared object degrades to "not unique" rather than throwing.
    // loadCase rejects dangling references, so this should be unreachable — but
    // an exception here would kill a playthrough mid-comparison.
    const object = ctx.objects.find((o) => o.id === objectId);
    return object?.unique === true
      ? { ok: true, reason: 'Only one person can have had it.' }
      : { ok: false, reason: 'There could be more than one of those.' };
  }

  // with_person: being with one person does not exclude being with another.
  return { ok: false, reason: 'Those two things can both be true.' };
}

/**
 * Why two claims never met.
 *
 * Worth the care: this is the message a player sees most often, and a vague one
 * ("these do not match") teaches nothing about how the game thinks.
 */
function mismatchReason(a: Claim, b: Claim): string {
  const aIsObject = a.predicate.kind === 'has_object';
  const bIsObject = b.predicate.kind === 'has_object';

  if (aIsObject && bIsObject) return 'These are about two different things.';
  if (aIsObject !== bIsObject) return 'One is about a person, the other about a thing.';
  return 'These are about different people.';
}
