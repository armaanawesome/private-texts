import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { sundayServiceRaw } from './sunday-service';
import { describeCaseContract } from './caseContract';

const script = loadCase(sundayServiceRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('Sunday Service', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-register']);
  });

  /**
   * The shape of this case: a forged record against a living memory. The
   * register lie is proven on a day in March, months before the killing, which
   * is what makes it a different kind of proof from the other two.
   */
  it('proves the register lie on a different day from the death', () => {
    const v = checkContradiction(
      script,
      claim('c-cordy-never-register'),
      claim('c-cordy-signed-out'),
    );
    expect(v.ok).toBe(true);

    const death = claim('c-cordy-home');
    const register = claim('c-cordy-signed-out');
    expect(Math.floor(register.window.start / 1440)).not.toBe(
      Math.floor(death.window.start / 1440),
    );
  });

  it('keeps every claim window inside one day, so the axis cannot lie', () => {
    for (const c of byId.values()) {
      expect(c.window.end - c.window.start, `claim ${c.id}`).toBeLessThanOrEqual(1440);
      expect(Math.floor(c.window.start / 1440)).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });

  /**
   * Jack is the living memory and the case rests on him twice: he dates the
   * roof, and he saw her go in. If he were ever the killer or the herring the
   * whole shape would collapse.
   */
  it('leans on the same witness for the record and the sighting', () => {
    expect(claim('c-cordy-vestry').assertedBy).toBe('jack');
    expect(script.solution.killerId).not.toBe('jack');
    const jackSays = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.senderId === 'jack');
    expect(jackSays.length).toBeGreaterThan(0);
  });

  it('clears the organist, and does not require it', () => {
    const v = checkContradiction(script, claim('c-petra-nave'), claim('c-petra-tower'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-petra-tower');
    expect(script.solution.killerId).not.toBe('petra');
  });

  it('opens Jack only after Denise points at him', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-jack');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['e8'],
    }).map((t) => t.id);
    expect(after).toContain('t-jack');
  });

  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
  });
});
