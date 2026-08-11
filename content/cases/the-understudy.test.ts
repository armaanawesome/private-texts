import { describe, it, expect } from 'vitest';
import {
  loadCase,
  checkContradiction,
  evaluateAccusation,
  visibleThreads,
  press,
  remainingBeats,
  type Claim,
  type EvidenceRef,
} from '@/engine';
import { theUnderstudyRaw } from './the-understudy';
import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

const script = loadCase(theUnderstudyRaw);

const allClaims: Claim[] = script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? []));
const allMessageIds = script.threads.flatMap((t) => t.messages.map((m) => m.id));
const byId = new Map(allClaims.map((c) => [c.id, c]));

const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

/** Progress with the given contradictions proven and everything read. */
const at = (proven: string[]) => ({
  confirmedContradictionIds: proven,
  readMessageIds: allMessageIds,
});

describe('The Understudy', () => {
  /**
   * Free, changed at Pack 15. This asserted the opposite when Pack 2 was the
   * first paid case, which predates the 15-pack plan. The free tier is 1–3 so
   * that it ends on Pack 3's arc connection rather than on a full stop; the
   * whole boundary is pinned in ledger.test.ts.
   */
  it('is free, and is not the paywall', () => {
    expect(script.id).toBe('the-understudy');
    expect(script.requiredEntitlementId).toBeUndefined();
    expect(script.requiredEntitlementId).not.toBe(CASE_PACK_ENTITLEMENT);
  });

  it('requires three contradictions and the motive to accuse', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-sheffield']);
  });

  it('confirms every intended contradiction actually validates in the engine', () => {
    for (const c of script.contradictions) {
      const verdict = checkContradiction(script, claim(c.claimIdA), claim(c.claimIdB));
      expect(verdict, `${c.id} does not validate: ${verdict.reason}`).toMatchObject({ ok: true });
    }
  });

  /**
   * The scan that catches what nothing else will. The engine confirms ANY pair
   * satisfying its rules, so a window nudged ten minutes can silently add a
   * contradiction and let a player skip a gate.
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
        if (!checkContradiction(script, a, b).ok) continue;
        const key = [a.id, b.id].sort().join('|');
        if (!intended.has(key)) surprises.push(key);
      }
    }

    expect(surprises).toEqual([]);
  });

  /** The locked room. This is the axis Case 1 never uses. */
  it('breaks the locked room on the single key, across two different people', () => {
    const verdict = checkContradiction(script, claim('c-key-dev'), claim('c-key-bea'));
    expect(verdict.ok).toBe(true);
    expect(verdict.reason).toMatch(/only one/i);

    const key = script.objects.find((o) => o.id === 'key1');
    expect(key?.unique, 'the key must be unique or the locked room collapses').toBe(true);
  });

  it('opens Nell only after somebody names her', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-nell');

    const named = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['q14', 'd5'],
    }).map((t) => t.id);
    expect(named).toContain('t-nell');
  });

  it('gates Beatrice behind the key and the corridor', () => {
    expect(visibleThreads(script, at([])).map((t) => t.id)).not.toContain('t-bea');
    expect(visibleThreads(script, at(['x-key', 'x-bea-corridor'])).map((t) => t.id)).toContain(
      't-bea',
    );
  });

  /**
   * The red herring rule: a suspect who looks guilty must be innocent for a
   * reason the player can prove with the same tools. Dev is the one Beatrice
   * points at, and clearing him is an ordinary contradiction.
   */
  it('lets the player clear the obvious suspect, and does not require it', () => {
    const verdict = checkContradiction(script, claim('c-dev-station'), claim('c-dev-stagedoor'));
    expect(verdict.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-dev-train');
  });

  it('refuses until proof and motive are in, then accepts only Beatrice', () => {
    expect(evaluateAccusation(script, 'bea', at([]))).toMatchObject({ correct: false });

    const all = [...script.solution.requiredContradictionIds];
    expect(
      evaluateAccusation(script, 'bea', {
        confirmedContradictionIds: all,
        readMessageIds: ['cl7'],
      }),
      'motive not established should refuse',
    ).toMatchObject({ correct: false });

    // The understudy is the obvious answer and must survive full proof.
    expect(evaluateAccusation(script, 'nell', at(all))).toMatchObject({ correct: false });
    expect(evaluateAccusation(script, 'dev', at(all))).toMatchObject({ correct: false });
    expect(evaluateAccusation(script, 'bea', at(all))).toMatchObject({ correct: true });
  });

  it('can be driven to a confession using only the evidence the win requires', () => {
    const c = script.confrontation;
    expect(c).toBeDefined();
    if (!c) return;

    const held: EvidenceRef[] = [
      ...script.solution.requiredContradictionIds.map(
        (id) => ({ kind: 'contradiction', id }) as const,
      ),
      ...script.solution.requiredMotiveIds.map((id) => ({ kind: 'motive', id }) as const),
    ];

    let landed: string[] = [];
    let complete = false;
    for (const evidence of held) {
      const outcome = press(c, landed, evidence);
      expect(outcome.kind, `nothing to say for ${evidence.kind} "${evidence.id}"`).toBe('lands');
      if (outcome.kind !== 'lands') return;
      landed = [...landed, outcome.beat.id];
      complete = outcome.complete;
    }
    expect(complete).toBe(true);
    expect(remainingBeats(c, landed)).toEqual([]);
  });

  /** Pack 2 is standalone by design — the silence is what makes Pack 3 land. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
  });

  it('keeps every message in its thread, in send order', () => {
    for (const thread of script.threads) {
      for (const msg of thread.messages) {
        expect(msg.threadId, `message ${msg.id}`).toBe(thread.id);
      }
      const times = thread.messages.map((m) => m.sentAt);
      expect(times, `thread ${thread.id}`).toEqual([...times].sort((x, y) => x - y));
    }
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
});
