import { describe, it, expect } from 'vitest';
import { CASES, getCase } from './index';
import { checkContradiction, evaluateAccusation } from '@/engine';

/**
 * Every case ships through these checks. They mechanically prove a case is
 * winnable and that no thread is orphaned — the two content bugs that would
 * otherwise surface only when a judge is playing it.
 */
describe.each(CASES.map((c) => [c.id, c] as const))('case: %s', (_id, script) => {
  it('resolves by id', () => {
    expect(getCase(script.id)?.id).toBe(script.id);
  });

  it('has at least one intended contradiction', () => {
    expect(script.contradictions.length).toBeGreaterThan(0);
  });

  it('every intended contradiction actually validates in the engine', () => {
    const claims = new Map(
      script.threads
        .flatMap((t) => t.messages.flatMap((m) => m.claims ?? []))
        .map((c) => [c.id, c]),
    );
    for (const con of script.contradictions) {
      const a = claims.get(con.claimIdA);
      const b = claims.get(con.claimIdB);
      expect(a, `claim ${con.claimIdA} missing`).toBeDefined();
      expect(b, `claim ${con.claimIdB} missing`).toBeDefined();
      const verdict = checkContradiction(script, a!, b!);
      expect(verdict.ok, `${con.id} does not validate: ${verdict.reason}`).toBe(true);
    }
  });

  /** Everything proven and every message read — the state a finished player is in. */
  const solved = () => ({
    confirmedContradictionIds: [...script.solution.requiredContradictionIds],
    readMessageIds: script.threads.flatMap((t) => t.messages.map((m) => m.id)),
  });

  it('is solvable with the killer plus all required proof and motive', () => {
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

  it('every required motive is establishable by reading the case', () => {
    // A motive gated on a message that no thread contains would make the case
    // unwinnable, and only at the very last step.
    const r = evaluateAccusation(script, script.solution.killerId, solved());
    expect(r.correct, 'required motives are not all establishable').toBe(true);
  });

  it('every gated thread references a real contradiction', () => {
    const known = new Set(script.contradictions.map((c) => c.id));
    for (const t of script.threads) {
      for (const id of t.requiresContradictionIds) {
        expect(known.has(id), `thread ${t.id} gated on unknown ${id}`).toBe(true);
      }
    }
  });

  it('every thread is reachable — no orphaned content', () => {
    const required = new Set(script.solution.requiredContradictionIds);
    for (const t of script.threads) {
      for (const id of t.requiresContradictionIds) {
        // A thread gated behind a contradiction that solving never requires
        // could be missed entirely by a player who wins. That is wasted writing.
        expect(required.has(id), `thread ${t.id} may be unreachable on a winning run`).toBe(true);
      }
    }
  });
});
