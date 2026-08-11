import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theWakeRaw } from './the-wake';
import { describeCaseContract } from './caseContract';

const script = loadCase(theWakeRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Wake', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-morphine']);
  });

  /**
   * The shape of this case: a collective alibi. Every adult repeats the same
   * sentence and it is nearly all true, which is what makes it hold. Two of them
   * assert it independently, and the killer’s copy is the one that breaks.
   */
  it('has more than one person asserting the front room', () => {
    const frontRoom = [...byId.values()].filter(
      (c) => c.predicate.kind === 'at_place' && c.predicate.placeId === 'frontroom',
    );
    expect(frontRoom.length).toBeGreaterThan(1);
    // And Nuala’s copy of the lie must NOT be breakable — she really was there.
    const nuala = frontRoom.filter((c) => c.subject === 'nuala');
    expect(nuala).toHaveLength(1);
    for (const other of [...byId.values()].filter((c) => c.subject === 'nuala')) {
      for (const n of nuala) {
        if (n.id === other.id) continue;
        expect(checkContradiction(script, n, other).ok).toBe(false);
      }
    }
  });

  /**
   * The red herring is the person the family’s own shield was built for, and the
   * only one anybody accuses out loud. Clearing her must be provable and must
   * not be required.
   */
  it('clears the girl the shield was built for, and does not require it', () => {
    const v = checkContradiction(script, claim('c-cass-gardenroom'), claim('c-cass-return'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-cass-return');
    expect(script.solution.killerId).not.toBe('cass');
  });

  /**
   * Guards a display bug found while writing this case.
   *
   * The prescription contradiction wanted to span three weeks, but `clockOf`
   * wraps at 24 hours, so a multi-day window renders an axis reading something
   * like 07:41 to 16:19 for a three week span. The comparison sheet is the one
   * screen that must never lie, so every claim is kept inside a single day.
   */
  it('keeps every claim window inside one day, so the timeline axis cannot lie', () => {
    for (const c of byId.values()) {
      const span = c.window.end - c.window.start;
      expect(span, `claim ${c.id} spans more than a day`).toBeLessThanOrEqual(1440);
      expect(
        Math.floor(c.window.start / 1440),
        `claim ${c.id} crosses midnight`,
      ).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });

  it('opens Cass only after Bridie points at her', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-cass');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['r10'],
    }).map((t) => t.id);
    expect(after).toContain('t-cass');
  });

  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
  });
});
