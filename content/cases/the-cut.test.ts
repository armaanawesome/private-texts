import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theCutRaw } from './the-cut';
import { describeCaseContract } from './caseContract';

const script = loadCase(theCutRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Cut', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-effie']);
  });

  /**
   * The shape of this case: movement. The boat's alibi is TRUE and must stay
   * true — Alan confirms it in a court, and the case is not that anybody lied
   * about the boat. The lie is that he was with it.
   */
  it('never contradicts the boat itself', () => {
    // Alan's claim puts her at the locks, watching. Nothing about the boat's
    // position is ever broken, because nothing about it is false.
    const gwyn = claim('c-gwyn-locks');
    for (const other of byId.values()) {
      if (other.id === gwyn.id) continue;
      expect(checkContradiction(script, gwyn, other).ok, `${other.id} broke Alan`).toBe(false);
    }
  });

  it('breaks him on the man, not the boat', () => {
    const bike = checkContradiction(script, claim('c-nate-moored'), claim('c-nate-bike'));
    expect(bike.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).toContain('x-nate-bike');
  });

  /**
   * The wharf sits inside Norbury, so a sighting at Norbury and a key log at
   * the wharf must corroborate rather than collide. Place nesting is what makes
   * that work, and it is easy to break by reparenting a place.
   */
  it('lets the wharf and the village agree with each other', () => {
    const v = checkContradiction(script, claim('c-nate-norbury'), claim('c-nate-wharf'));
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/same area/i);
  });

  it('clears the man he pointed at, and does not require it', () => {
    const v = checkContradiction(script, claim('c-tam-norbury'), claim('c-tam-hospital'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-tam-hospital');
    expect(script.solution.killerId).not.toBe('tam');
  });

  it('opens Sam only after somebody points at Sam', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-bo');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['m7'],
    }).map((t) => t.id);
    expect(after).toContain('t-bo');
  });

  /**
   * Pack 9 is a connection pack. Clue 4 is that he follows up — he rang again
   * on the Sunday to ask how it had gone. It surfaces in the confession only.
   */
  it('carries the arc, and only after the case is solved', () => {
    expect(script.coda).toBeDefined();
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toMatch(/rang again/i);
    expect(confession).toMatch(/how did it go/i);

    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toMatch(/rang again|how did it go/i);
  });

  it('keeps every claim window inside one day', () => {
    for (const c of byId.values()) {
      expect(c.window.end - c.window.start, `claim ${c.id}`).toBeLessThanOrEqual(1440);
      expect(Math.floor(c.window.start / 1440)).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });
});
