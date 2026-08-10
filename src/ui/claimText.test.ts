import { describe, it, expect } from 'vitest';
import { describePredicate, attributionFor } from './claimText';
import type { Character, Claim, Place } from '@/engine';

const places: Place[] = [
  { id: 'point', name: 'Ardnoe Point' },
  { id: 'cafe', name: 'the café', parentId: 'harbour' },
];
const characters: Character[] = [
  { id: 'mairi', name: 'Mairi', avatarColor: '#000' },
  { id: 'esme', name: 'Esme', avatarColor: '#000' },
];

function claimWith(predicate: Claim['predicate']): Claim {
  return {
    id: 'c1',
    subject: 'mairi',
    assertedBy: 'esme',
    predicate,
    window: { start: 0, end: 1 },
    sourceMessageId: 'm1',
    label: 'unused',
  };
}

/**
 * The bar label on the comparison sheet. It has to be short enough to sit under
 * a bar and specific enough to be the thing being contradicted, which the
 * claim's own `label` is not — that reads "Mairi: in the café, 20:30–23:00" and
 * repeats both the subject and the times already printed on the axis.
 */
describe('describePredicate', () => {
  it('names the place for an at_place claim', () => {
    const text = describePredicate(places, characters, claimWith({ kind: 'at_place', placeId: 'cafe' }));
    expect(text).toBe('the café');
  });

  it('names the person for a with_person claim', () => {
    const text = describePredicate(
      places,
      characters,
      claimWith({ kind: 'with_person', personId: 'esme' }),
    );
    expect(text).toBe('with Esme');
  });

  it('turns an action id into readable words', () => {
    const text = describePredicate(
      places,
      characters,
      claimWith({ kind: 'doing', actionId: 'cashing_up', exclusiveGroup: 'g' }),
    );
    expect(text).toBe('cashing up');
  });

  it('falls back to the raw id rather than rendering undefined', () => {
    // A dangling reference should already have been caught by loadCase, but the
    // board must never print "undefined" at a player if one slips through.
    const text = describePredicate(places, characters, claimWith({ kind: 'at_place', placeId: 'nowhere' }));
    expect(text).toBe('nowhere');
  });
});

describe('attributionFor', () => {
  it('reads as self-reported when the speaker is the subject', () => {
    const claim = { ...claimWith({ kind: 'at_place', placeId: 'cafe' }), assertedBy: 'mairi' };
    expect(attributionFor(characters, claim)).toBe('own account');
  });

  it('carries no pronoun, because the cast is not all one gender', () => {
    // "her own account" would print under a claim about Callum. The board never
    // knows a character's pronouns and must not guess them from a name.
    const claim = {
      ...claimWith({ kind: 'at_place', placeId: 'cafe' }),
      subject: 'callum',
      assertedBy: 'callum',
    };
    expect(attributionFor(characters, claim)).not.toMatch(/\b(her|his|she|he)\b/);
  });

  it('names the witness when someone else said it', () => {
    const claim = { ...claimWith({ kind: 'at_place', placeId: 'cafe' }), assertedBy: 'esme' };
    expect(attributionFor(characters, claim)).toBe('per Esme');
  });
});
