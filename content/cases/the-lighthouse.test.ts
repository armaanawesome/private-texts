import { describe, it, expect } from 'vitest';
import {
  loadCase,
  checkContradiction,
  evaluateAccusation,
  visibleThreads,
  type Claim,
} from '@/engine';
import { theLighthouseRaw } from './the-lighthouse';

const script = loadCase(theLighthouseRaw);

const allClaims: Claim[] = script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? []));
const byId = new Map(allClaims.map((c) => [c.id, c]));

function claim(id: string): Claim {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
}

describe('The Lighthouse', () => {
  it('passes schema and referential validation', () => {
    expect(script.id).toBe('the-lighthouse');
    expect(script.characters).toHaveLength(5);
    expect(script.threads).toHaveLength(6);
  });

  it('has exactly three intended contradictions, all required to accuse', () => {
    expect(script.contradictions).toHaveLength(3);
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect([...script.solution.requiredContradictionIds].sort()).toEqual(
      [...script.contradictions.map((c) => c.id)].sort(),
    );
  });

  it('confirms every intended contradiction actually validates in the engine', () => {
    for (const c of script.contradictions) {
      const verdict = checkContradiction(script.places, claim(c.claimIdA), claim(c.claimIdB));
      expect(verdict, `${c.id} does not validate: ${verdict.reason}`).toMatchObject({ ok: true });
    }
  });

  /**
   * The one that catches content bugs nothing else will.
   *
   * The engine confirms ANY pair satisfying its rules, whether the author meant
   * it or not. A stray fourth contradiction would let a player skip the gated
   * thread; a claim window nudged by ten minutes can create one silently. So
   * every pair is checked, and anything that fires must be declared.
   */
  it('contains no contradictions the author did not intend', () => {
    const intended = new Set(
      script.contradictions.map((c) => [c.claimIdA, c.claimIdB].sort().join('|')),
    );
    const surprises: string[] = [];

    for (let i = 0; i < allClaims.length; i += 1) {
      for (let j = i + 1; j < allClaims.length; j += 1) {
        const a = allClaims[i]!;
        const b = allClaims[j]!;
        if (!checkContradiction(script.places, a, b).ok) continue;
        const key = [a.id, b.id].sort().join('|');
        if (!intended.has(key)) surprises.push(key);
      }
    }

    expect(surprises).toEqual([]);
  });

  it('gives the player two contradictions from threads that are open at the start', () => {
    const open = visibleThreads(script, []);
    const reachable = new Set(
      open.flatMap((t) => t.messages.flatMap((m) => (m.claims ?? []).map((c) => c.id))),
    );

    const solvableUpfront = script.contradictions.filter(
      (c) => reachable.has(c.claimIdA) && reachable.has(c.claimIdB),
    );
    expect(solvableUpfront.map((c) => c.id)).toEqual(['x-callum-alibi', 'x-mairi-path']);
  });

  it('gates the third contradiction behind the first two', () => {
    const beforeAnyProof = visibleThreads(script, []).map((t) => t.id);
    expect(beforeAnyProof).not.toContain('t-callum-truth');

    const afterTwo = visibleThreads(script, ['x-callum-alibi', 'x-mairi-path']).map((t) => t.id);
    expect(afterTwo).toContain('t-callum-truth');

    // And the claim that completes contradiction 3 lives behind that gate.
    const gated = script.threads.find((t) => t.id === 't-callum-truth');
    const gatedClaimIds = gated?.messages.flatMap((m) => (m.claims ?? []).map((c) => c.id)) ?? [];
    expect(gatedClaimIds).toContain('c-mairi-door');
  });

  it('refuses an accusation until all three are proven, then accepts only Mairi', () => {
    expect(evaluateAccusation(script, 'mairi', [])).toMatchObject({ correct: false });
    expect(
      evaluateAccusation(script, 'mairi', ['x-callum-alibi', 'x-mairi-path']),
    ).toMatchObject({ correct: false, missingCount: 1 });

    const all = ['x-callum-alibi', 'x-mairi-path', 'x-mairi-door'];
    // Right proof, wrong person: must still fail, or the killer is brute-forceable.
    expect(evaluateAccusation(script, 'callum', all)).toMatchObject({ correct: false });
    expect(evaluateAccusation(script, 'esme', all)).toMatchObject({ correct: false });
    expect(evaluateAccusation(script, 'mairi', all)).toMatchObject({ correct: true });
  });

  it('sources every claim from the message it is attached to', () => {
    for (const thread of script.threads) {
      for (const msg of thread.messages) {
        for (const c of msg.claims ?? []) {
          expect(c.sourceMessageId, `claim ${c.id}`).toBe(msg.id);
        }
      }
    }
  });

  it('keeps every message in the thread it says it belongs to', () => {
    for (const thread of script.threads) {
      for (const msg of thread.messages) {
        expect(msg.threadId, `message ${msg.id}`).toBe(thread.id);
      }
    }
  });

  it('orders every thread by send time, because the UI does not sort', () => {
    for (const thread of script.threads) {
      const times = thread.messages.map((m) => m.sentAt);
      expect(times, `thread ${thread.id}`).toEqual([...times].sort((x, y) => x - y));
    }
  });
});
