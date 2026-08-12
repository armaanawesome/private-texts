import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theLongCourseRaw } from './the-long-course';
import { describeCaseContract } from './caseContract';

const script = loadCase(theLongCourseRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Long Course', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-nance']);
  });

  /**
   * The shape of this case: identity. The killer and his substitute make claims
   * about the same twenty-two minutes on the same water, and both are true of
   * *somebody*. The case only works because the boat holds eight and nobody
   * counts which eight.
   */
  it('puts the killer and the substitute on the water in the same window', () => {
    const saul = claim('c-saul-river');
    const imo = claim('c-imo-river');
    expect(saul.window).toEqual(imo.window);
    // Same place, different people, so the engine must NOT pair them. The lie is
    // not that one of them is wrong; it is that the crew was never counted.
    expect(checkContradiction(script, saul, imo).ok).toBe(false);
  });

  it('breaks him on where he was, not on who was in the boat', () => {
    for (const id of script.solution.requiredContradictionIds) {
      const c = script.contradictions.find((x) => x.id === id)!;
      const a = claim(c.claimIdA);
      const b = claim(c.claimIdB);
      expect(a.predicate.kind).toBe('at_place');
      expect(b.predicate.kind).toBe('at_place');
    }
  });

  it('clears the coach he pointed at, and does not require it', () => {
    const v = checkContradiction(script, claim('c-warren-boathouse'), claim('c-warren-bank'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-warren-bank');
    expect(script.solution.killerId).not.toBe('warren');
  });

  it('opens Em only after Carol notices the kit', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-imo');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['d10'],
    }).map((t) => t.id);
    expect(after).toContain('t-imo');
  });

  /**
   * Pack 6 is a connection pack. Clue 3 is that he spoke about a 2009 drowning
   * as though he had been on the bank for it, and the detail that proves it is
   * a thing two boys heard on a raft and never repeated.
   */
  it('carries the arc, and only after the case is solved', () => {
    expect(script.coda).toBeDefined();
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toMatch(/asked me not to go/i);
    expect(confession).toMatch(/never in the inquest/i);

    // It must not leak into the briefing or any thread.
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toMatch(/asked me not to go/i);
  });

  it('keeps every claim window inside one day', () => {
    for (const c of byId.values()) {
      expect(c.window.end - c.window.start, `claim ${c.id}`).toBeLessThanOrEqual(1440);
      expect(Math.floor(c.window.start / 1440)).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });
});
