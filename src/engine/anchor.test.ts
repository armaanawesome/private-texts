import { describe, it, expect } from 'vitest';
import { anchorOf } from './anchor';
import type { Claim } from './types';

function claim(predicate: Claim['predicate'], subject = 'mairi'): Claim {
  return {
    id: 'c1',
    subject,
    assertedBy: 'esme',
    predicate,
    window: { start: 0, end: 10 },
    sourceMessageId: 'm1',
    label: 'l',
  };
}

/**
 * The anchor is the thing a claim makes a statement *about*.
 *
 * This exists because "one person cannot be in two places" and "one knife
 * cannot be in two hands" are the same rule pointed at different nouns. The
 * engine used to hardcode the person by rejecting any pair whose `subject`
 * differed, which made the weapon axis impossible without a special case.
 *
 * Generalising to an anchor keeps every existing rule byte-identical — for
 * place, action and company the anchor simply *is* the subject — while letting
 * an object-holding claim anchor on the object instead.
 */
describe('anchorOf', () => {
  it('anchors a place claim on the person', () => {
    expect(anchorOf(claim({ kind: 'at_place', placeId: 'cafe' }))).toBe('person:mairi');
  });

  it('anchors an action claim on the person', () => {
    expect(anchorOf(claim({ kind: 'doing', actionId: 'cashing_up', exclusiveGroup: 'g' }))).toBe(
      'person:mairi',
    );
  });

  it('anchors a company claim on the person', () => {
    expect(anchorOf(claim({ kind: 'with_person', personId: 'esme' }))).toBe('person:mairi');
  });

  it('gives two claims about the same person the same anchor', () => {
    const a = anchorOf(claim({ kind: 'at_place', placeId: 'cafe' }));
    const b = anchorOf(claim({ kind: 'doing', actionId: 'x', exclusiveGroup: 'g' }));
    expect(a).toBe(b);
  });

  it('anchors an object claim on the OBJECT, not the holder', () => {
    // The whole point: two claims naming different holders of one knife must
    // meet each other, and they only do if the knife is what they share.
    expect(anchorOf(claim({ kind: 'has_object', objectId: 'boat_key' }, 'callum'))).toBe(
      'object:boat_key',
    );
  });

  it('keeps object and person namespaces apart', () => {
    // A character called "boat_key" must not collide with the object.
    const person = anchorOf(claim({ kind: 'at_place', placeId: 'cafe' }, 'boat_key'));
    const object = anchorOf(claim({ kind: 'has_object', objectId: 'boat_key' }));
    expect(person).not.toBe(object);
  });
});
