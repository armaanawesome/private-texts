import { describe, it, expect } from 'vitest';
import { checkContradiction, type RuleContext } from './contradiction';
import type { CaseObject, Claim, Place } from './types';

const PLACES: Place[] = [
  { id: 'harbour', name: 'The harbour' },
  { id: 'pier', name: 'The pier', parentId: 'harbour' },
  { id: 'studio', name: 'The studio' },
];

const OBJECTS: CaseObject[] = [
  { id: 'boat_key', name: 'the boat key', unique: true },
  { id: 'torch', name: 'a torch', unique: false },
];

const WORLD: RuleContext = { places: PLACES, objects: OBJECTS };

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
    expect(checkContradiction(WORLD, a, b).ok).toBe(true);
  });

  it('does not flag two claims about different people', () => {
    const a = claim({ id: 'c1', subject: 'nadia', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({ id: 'c2', subject: 'tom', predicate: { kind: 'at_place', placeId: 'harbour' } });
    const v = checkContradiction(WORLD, a, b);
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
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different times/i);
  });

  it('does not flag nested places', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'pier' } });
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'harbour' } });
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
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
    expect(checkContradiction(WORLD, a, b).ok).toBe(true);
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
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
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
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
  });

  it('does not flag being with two different people', () => {
    // You can stand in a room with more than one person.
    const a = claim({ id: 'c1', predicate: { kind: 'with_person', personId: 'tom' } });
    const b = claim({ id: 'c2', predicate: { kind: 'with_person', personId: 'priya' } });
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
  });

  it('does not flag a claim against itself', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const v = checkContradiction(WORLD, a, a);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/same statement/i);
  });

  it('does not flag predicates of different kinds', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({
      id: 'c2',
      predicate: { kind: 'doing', actionId: 'asleep', exclusiveGroup: 'consciousness' },
    });
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
  });

  it('is symmetric', () => {
    const a = claim({ id: 'c1', predicate: { kind: 'at_place', placeId: 'studio' } });
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'harbour' } });
    expect(checkContradiction(WORLD, a, b).ok).toBe(checkContradiction(WORLD, b, a).ok);
  });
});

/**
 * The object axis. These are the pairs the old subject rule made unreachable:
 * two accounts of who held one thing name *different people* by definition, so
 * "different subject -> reject" threw them out before any rule could look.
 */
describe('checkContradiction — objects', () => {
  const held = (id: string, subject: string, objectId: string, window?: Claim['window']) =>
    claim({
      id,
      subject,
      predicate: { kind: 'has_object', objectId },
      ...(window ? { window } : {}),
    });

  it('flags two people holding one unique object at the same time', () => {
    const a = held('c1', 'nadia', 'boat_key');
    const b = held('c2', 'tom', 'boat_key');
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/one person|only one/i);
  });

  it('does not flag one person holding the same object twice', () => {
    const a = held('c1', 'nadia', 'boat_key');
    const b = held('c2', 'nadia', 'boat_key');
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(false);
  });

  it('does not flag two people holding a thing there is more than one of', () => {
    const a = held('c1', 'nadia', 'torch');
    const b = held('c2', 'tom', 'torch');
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/more than one/i);
  });

  it('does not flag the same object held at different times', () => {
    const a = held('c1', 'nadia', 'boat_key', { start: 100, end: 200 });
    const b = held('c2', 'tom', 'boat_key', { start: 300, end: 400 });
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different times/i);
  });

  it('does not pair claims about two different objects', () => {
    const a = held('c1', 'nadia', 'boat_key');
    const b = held('c2', 'tom', 'torch');
    const v = checkContradiction(WORLD, a, b);
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different things/i);
  });

  it('does not pair an object claim with a place claim', () => {
    const a = held('c1', 'nadia', 'boat_key');
    const b = claim({ id: 'c2', predicate: { kind: 'at_place', placeId: 'studio' } });
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
  });

  it('treats an object the case never declared as not unique, rather than throwing', () => {
    // loadCase rejects dangling references, so this should be unreachable - but
    // the engine must degrade to "no contradiction" rather than crash mid-game.
    const a = held('c1', 'nadia', 'ghost');
    const b = held('c2', 'tom', 'ghost');
    expect(checkContradiction(WORLD, a, b).ok).toBe(false);
  });

  it('is symmetric for objects too', () => {
    const a = held('c1', 'nadia', 'boat_key');
    const b = held('c2', 'tom', 'boat_key');
    expect(checkContradiction(WORLD, a, b).ok).toBe(checkContradiction(WORLD, b, a).ok);
  });
});
