import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theBothyRaw } from './the-bothy';
import { describeCaseContract } from './caseContract';

const script = loadCase(theBothyRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Bothy', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-raven']);
  });

  /**
   * The shape of this case: order. He arrived twice, and the second arrival was
   * a performance in front of four witnesses. Both arrivals are true, which is
   * why nobody caught it — so the case must break on the FIRST one, and the two
   * signatures are the only physical record that it happened.
   */
  it('breaks him on the signing, which is the only record of the first arrival', () => {
    const v = checkContradiction(script, claim('c-keir-book-late'), claim('c-keir-book-early'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).toContain('x-keir-book');
  });

  it('keeps his real arrival inside the window his own alibi covers', () => {
    // His story is one continuous walk from 18:40 to 21:40. Both sightings have
    // to fall inside that, or the alibi would not need to be a lie.
    const hill = claim('c-keir-hill');
    for (const id of ['c-keir-mainroom', 'c-keir-backroom']) {
      const seen = claim(id);
      expect(seen.window.start).toBeGreaterThanOrEqual(hill.window.start);
      expect(seen.window.end).toBeLessThanOrEqual(hill.window.end);
      expect(checkContradiction(script, hill, seen).ok).toBe(true);
    }
  });

  it('does not let the two sightings of him contradict each other', () => {
    // He crossed the main room, then went through the back. Sequential, not
    // conflicting — if these ever fired, the case would be accusing itself.
    const v = checkContradiction(script, claim('c-keir-mainroom'), claim('c-keir-backroom'));
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different times/i);
  });

  /**
   * Red herring seeded from clue 2 — he had private access. Pris cleaned
   * Struan’s house for nine years and knows everything about him, which is
   * exactly what makes her look guilty and is not a motive.
   */
  it('clears the cleaner, and does not require it', () => {
    const v = checkContradiction(script, claim('c-pris-backroom'), claim('c-pris-porch'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-pris-porch');
    expect(script.solution.killerId).not.toBe('pris');
  });

  it('opens Pris only after Morven points at her', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-pris');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['m10'],
    }).map((t) => t.id);
    expect(after).toContain('t-pris');
  });

  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
  });

  it('keeps every claim window inside one day', () => {
    for (const c of byId.values()) {
      expect(c.window.end - c.window.start, `claim ${c.id}`).toBeLessThanOrEqual(1440);
      expect(Math.floor(c.window.start / 1440)).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });
});
