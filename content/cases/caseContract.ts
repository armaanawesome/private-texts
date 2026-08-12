import { describe, it, expect } from 'vitest';
import {
  availableClaims,
  checkContradiction,
  evaluateAccusation,
  press,
  remainingBeats,
  visibleThreads,
  type CaseScript,
  type Claim,
  type EvidenceRef,
} from '@/engine';

/**
 * The contract every case must satisfy.
 *
 * Extracted at three cases because fifteen are coming and the same eight
 * assertions were already copied twice. A per-case file now only holds what is
 * true of *that* case.
 *
 * These are content bugs that nothing else catches, and every one of them fails
 * at the worst possible moment — mid-playthrough, or on the last screen, after
 * the player has done everything right.
 */
export function describeCaseContract(script: CaseScript) {
  const allClaims: Claim[] = script.threads.flatMap((t) =>
    t.messages.flatMap((m) => m.claims ?? []),
  );
  const byId = new Map(allClaims.map((c) => [c.id, c]));
  const allMessageIds = script.threads.flatMap((t) => t.messages.map((m) => m.id));

  const claim = (id: string): Claim => {
    const c = byId.get(id);
    if (!c) throw new Error(`no claim "${id}"`);
    return c;
  };

  /** Everything proven, everything read — a finished player. */
  const solved = () => ({
    confirmedContradictionIds: [...script.solution.requiredContradictionIds],
    readMessageIds: allMessageIds,
  });

  describe(`case contract: ${script.id}`, () => {
    it('validates every intended contradiction in the engine', () => {
      for (const c of script.contradictions) {
        const v = checkContradiction(script, claim(c.claimIdA), claim(c.claimIdB));
        expect(v, `${c.id} does not validate: ${v.reason}`).toMatchObject({ ok: true });
      }
    });

    /**
     * The scan nothing else replaces. The engine confirms ANY pair satisfying
     * its rules, so a window nudged ten minutes can silently add a contradiction
     * and let a player skip a gated thread.
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

    it('is solvable by the killer with the required proof and motive', () => {
      expect(evaluateAccusation(script, script.solution.killerId, solved()).correct).toBe(true);
    });

    it('is not solvable without complete proof', () => {
      const partial = script.solution.requiredContradictionIds.slice(0, -1);
      expect(
        evaluateAccusation(script, script.solution.killerId, {
          ...solved(),
          confirmedContradictionIds: [...partial],
        }).correct,
      ).toBe(false);
    });

    it('accuses nobody but the killer, even on full proof', () => {
      for (const c of script.characters) {
        if (c.id === script.solution.killerId || c.id === 'you') continue;
        expect(
          evaluateAccusation(script, c.id, solved()).correct,
          `${c.id} should not be accusable`,
        ).toBe(false);
      }
    });

    it('makes every required motive establishable by reading the case', () => {
      // A motive gated on a message no thread contains would make the case
      // unwinnable, and only at the very last step.
      expect(evaluateAccusation(script, script.solution.killerId, solved()).correct).toBe(true);
    });

    it('opens at least one thread by discovery rather than by proof', () => {
      const byReading = script.threads.filter((t) => (t.requiresReadMessageIds ?? []).length > 0);
      expect(byReading.length, 'no thread is found by reading').toBeGreaterThan(0);
    });

    it('leaves every thread reachable on a winning run', () => {
      const required = new Set(script.solution.requiredContradictionIds);
      for (const t of script.threads) {
        for (const id of t.requiresContradictionIds) {
          expect(required.has(id), `thread ${t.id} may be unreachable on a winning run`).toBe(true);
        }
      }
      expect(visibleThreads(script, solved())).toHaveLength(script.threads.length);
    });

    /**
     * Attainability, played forward from nothing.
     *
     * `leaves every thread reachable on a winning run` hands the player every
     * contradiction at once and so cannot see ordering: a thread gated on a
     * proof that only that thread supplies still passes it. Two shipped packs
     * were doing exactly that, found at Pack 14 — Sunday Service gated Grace on a
     * contradiction whose claims are both inside her thread, and The Bothy gated
     * Hamish on half a proof of his own. Both were unopenable, and it would have
     * surfaced as a player staring at a locked conversation with nothing left to
     * read.
     *
     * This runs the real loop instead: open what is open, read it, confirm every
     * declared contradiction both of whose claims you now hold, repeat to a
     * fixpoint. It catches a cycle across two threads as well as direct
     * self-supply.
     */
    it('opens every thread by playing forward from nothing', () => {
      let readIds: string[] = [];
      let confirmed: string[] = [];
      let visible = 0;

      for (let pass = 0; pass <= script.threads.length + 1; pass += 1) {
        const open = visibleThreads(script, {
          confirmedContradictionIds: confirmed,
          readMessageIds: readIds,
        });
        if (open.length === visible && pass > 0) break;
        visible = open.length;

        readIds = open.flatMap((t) => t.messages.map((m) => m.id));
        const held = new Set(availableClaims(script, readIds).map((c) => c.id));
        confirmed = script.contradictions
          .filter((c) => held.has(c.claimIdA) && held.has(c.claimIdB))
          .map((c) => c.id);
      }

      const opened = new Set(
        visibleThreads(script, {
          confirmedContradictionIds: confirmed,
          readMessageIds: readIds,
        }).map((t) => t.id),
      );
      const stuck = script.threads.filter((t) => !opened.has(t.id)).map((t) => t.id);
      expect(stuck, 'these threads can never be opened by playing').toEqual([]);
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

    it('gives the victim a thread, so the player meets them alive', () => {
      const victim = script.briefing?.victimId;
      if (!victim) return;
      const spoke = script.threads.some((t) => t.messages.some((m) => m.senderId === victim));
      expect(spoke, 'the victim never speaks').toBe(true);
    });

    if (script.confrontation) {
      it('reaches a confession using only the evidence the win requires', () => {
        const c = script.confrontation!;
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
        expect(complete, 'ran out of required evidence before the confession').toBe(true);
        expect(remainingBeats(c, landed)).toEqual([]);
      });
    }
  });
}
