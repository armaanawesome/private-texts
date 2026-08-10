import type { Character, Claim, Place } from '@/engine';

/**
 * Player-facing wording for a claim on the comparison sheet.
 *
 * A claim's own `label` reads "Mairi: in the café, 20:30–23:00", which is right
 * for a chip in a list and wrong under a bar — the sheet already prints the
 * subject in its header and the times along its axis, so the label would say
 * everything three times. These give the short form: what is being asserted,
 * and who is asserting it.
 *
 * Pure, so it can be tested without a renderer.
 */

/** What the claim says happened. One short phrase, no subject and no times. */
export function describePredicate(
  places: readonly Place[],
  characters: readonly Character[],
  claim: Claim,
): string {
  switch (claim.predicate.kind) {
    case 'at_place': {
      const id = claim.predicate.placeId;
      // loadCase rejects dangling references, so the fallback should be
      // unreachable — but printing an id beats printing "undefined" at a player.
      return places.find((p) => p.id === id)?.name ?? id;
    }
    case 'with_person': {
      const id = claim.predicate.personId;
      return `with ${characters.find((c) => c.id === id)?.name ?? id}`;
    }
    case 'doing':
      return claim.predicate.actionId.replace(/_/g, ' ');
  }
}

/**
 * Who put the claim on the record, and whether that was the subject themselves.
 *
 * Deliberately pronoun-free. The cast is not all one gender and a case script
 * never states pronouns, so "her own account" would eventually print under a
 * claim about Callum.
 */
export function attributionFor(characters: readonly Character[], claim: Claim): string {
  if (claim.assertedBy === claim.subject) return 'own account';
  const name = characters.find((c) => c.id === claim.assertedBy)?.name ?? claim.assertedBy;
  return `per ${name}`;
}
