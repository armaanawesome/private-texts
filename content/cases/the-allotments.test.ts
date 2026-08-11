import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theAllotmentsRaw } from './the-allotments';
import { describeCaseContract } from './caseContract';

const script = loadCase(theAllotmentsRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Allotments', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-plot']);
  });

  /**
   * Ledger rule 2: no two consecutive packs lean on the same axis, and Pack 10
   * was the object pack. Possession is still the theme here, but the object
   * carries exactly one contradiction and it is the optional one.
   */
  it('keeps the object axis out of the required proofs', () => {
    for (const id of script.solution.requiredContradictionIds) {
      const c = script.contradictions.find((x) => x.id === id)!;
      for (const cl of [claim(c.claimIdA), claim(c.claimIdB)]) {
        expect(cl.predicate.kind, `${id} leans on the object axis`).not.toBe('has_object');
      }
    }
    const objectClaims = [...byId.values()].filter((c) => c.predicate.kind === 'has_object');
    expect(objectClaims).toHaveLength(2);
  });

  /**
   * The fork everybody can identify at forty feet is the red herring, and
   * clearing Nev is what turns it from an accusation into a fact about
   * proximity.
   */
  it('clears the man whose fork it is, and does not require it', () => {
    const v = checkContradiction(script, claim('c-fork-nev'), claim('c-fork-wilf'));
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/only one/i);
    expect(script.solution.requiredContradictionIds).not.toContain('x-fork');
    expect(script.solution.killerId).not.toBe('nev');
  });

  it('breaks her on a witness, an absence and a camera, in that order', () => {
    const beats = script.confrontation?.beats ?? [];
    expect(beats[0]?.evidence.id).toBe('x-deb-shedrow');
    expect(beats[1]?.evidence.id).toBe('x-deb-burning');
    // The camera goes third for the same reason the fob did in Pack 3: it is the
    // one she cannot call unreliable.
    expect(beats[2]?.evidence.id).toBe('x-deb-lane');
  });

  it('opens Sami only after Nev points at him', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-sami');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['v7'],
    }).map((t) => t.id);
    expect(after).toContain('t-sami');
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
