import type { Claim } from './types';

/**
 * The entity a claim makes a statement *about*.
 *
 * "One person cannot be in two places at once" and "one knife cannot be in two
 * hands at once" are the same rule pointed at different nouns. The engine used
 * to hardcode the person, by rejecting any pair whose `subject` differed — which
 * made an object contradiction impossible to express without a special case,
 * because those pairs name *different* people by definition.
 *
 * Anchoring generalises that. For place, action and company the anchor simply is
 * the subject, so every existing rule behaves identically. An object-holding
 * claim anchors on the object, so two accounts of who held it meet each other.
 */
export function anchorOf(claim: Claim): string {
  switch (claim.predicate.kind) {
    case 'has_object':
      // Namespaced so a character whose id happens to match an object id cannot
      // collide with it and produce a nonsense pairing.
      return `object:${claim.predicate.objectId}`;
    case 'at_place':
    case 'doing':
    case 'with_person':
      return `person:${claim.subject}`;
  }
}
