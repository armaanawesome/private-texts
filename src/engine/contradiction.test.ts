import { describe, it, expect } from 'vitest';
import { checkContradiction } from './contradiction';
import type { Claim, Place } from './types';

const PLACES: Place[] = [
  { id: 'harbour', name: 'The harbour' },
  { id: 'pier', name: 'The pier', parentId: 'harbour' },
  { id: 'studio', name: 'The studio' },
];

function claim(over: Partial<Claim> & Pick<Claim, 'id' | 'predicate'>): Claim {
  return {
    subject: 'nadia',
    assertedBy: 'nadia',
    window: { start: 1300, end: 1320 },
    sourceMessageId: 'm1',
    label: 'test claim',
    ...over,
  };
}

describe('checkContradiction', () => {
  it('flags one person in two unrelated places at the same time', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'harbour' } });
    expect(checkContradiction(PLACES, a, b).ok).toBe(true);
  });

  it('does not flag two claims about different people', () => {
    const a = claim({ id: 'c1', subject: 'nadia', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({ id: 'c2', subject: 'tom', predicate: { kind: 'at_place', placeId: 'harbour' } });
    const v = checkContradiction(PLACES, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different people/i);
  });

  it('does not flag the same person in the same place at different times', () => {
    const a = claim({
      id: 'c1',
      window: { start: 1300, end: 1320 },
      predicate: { kind: 'at_place', placeId: 'studio' },
    });
    const b = claim({
      id: 'c2',
      window: { start: 1400, end: 1420 },
      predicate: { kind: 'at_place', placeId: 'harbour' },
    });
    const v = checkContradiction(PLACES, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different times/i);
  });

  it('does not flag nested places', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'pier' } });
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'harbour' } });
    expect(checkContradiction(PLACES, a, b).ok).toBe(false);
  });

  it('flags mutually exclusive actions in the same exclusive group', () => {
    const a = claim({
      id: 'c1',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    const b = claim({
      id: 'c2',
      predicate: { kind: 'doing', actionId: 'driving', exclusiveGroup: 'consciousness' },
    });
    expect(checkContradiction(PLACES, a, b).ok).toBe(true);
  });

  it('does not flag actions in different exclusive groups', () => {
    const a = claim({
      id: 'c1',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    const b = claim({
      id: 'c2',
      predicate: { kind: 'doing', actionId: 'raining', exclusiveGroup: 'weather' },
    });
    expect(checkContradiction(PLACES, a, b).ok).toBe(false);
  });

  it('does not flag the same action asserted twice', () => {
    const a = claim({
      id: 'c1',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    const b = claim({
      id: 'c2',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    expect(checkContradiction(PLACES, a, b).ok).toBe(false);
  });

  it('does not flag being with two different people', () => {
    // You can stand in a room with more than one person.
    const a = claim({ id: 'c1', predicate: { kind: 'with_person', personId: 'tom' } });
    const b = claim({ id: 'c2', predicate: { kind: 'with_person', personId: 'priya' } });
    expect(checkContradiction(PLACES, a, b).ok).toBe(false);
  });

  it('does not flag a claim against itself', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const v = checkContradiction(PLACES, a, a);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/same statement/i);
  });

  it('does not flag predicates of different kinds', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({
      id: 'c2',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    expect(checkContradiction(PLACES, a, b).ok).toBe(false);
  });

  it('is symmetric', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'harbour' } });
    expect(checkContradiction(PLACES, a, b).ok).toBe(checkContradiction(PLACES, b, a).ok);
  });
});
