import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { deepFieldRaw } from './deep-field';
import { describeCaseContract } from './caseContract';

const script = loadCase(deepFieldRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('Deep Field', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-medevac']);
  });

  /**
   * The shape of this case, per docs/pack-ledger.md: which clock.
   *
   * `c-mal-log` exists to be REJECTED. A player pins the platform log against
   * the witness who saw Orla go through the porch, expecting the log to break
   * his alibi, and the engine answers "These describe different times."
   *
   * That rejection IS the deduction. The log is UTC, the station runs UTC+3, so
   * the entry everybody treated as his alibi covers three hours after she was
   * already outside. If this ever starts firing as a contradiction, the whole
   * point of the case has been lost.
   */
  it('rejects the platform log against a sighting of him, on time', () => {
    // Both claims are about Mal, so the engine gets past the subject check and
    // lands on the one that matters. The log does not cover the evening at all.
    const v = checkContradiction(script, claim('c-mal-log'), claim('c-mal-block'));
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different times/i);
  });

  it('rejects the log against the victim on subject, before time is even reached', () => {
    // Worth pinning: a player who pairs the log with Orla learns nothing about
    // the clock, because "different people" fires first. The case has to point
    // them at a claim about Mal, and Pilar's messages do.
    const v = checkContradiction(script, claim('c-mal-log'), claim('c-orla-coldporch'));
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/different people/i);
  });

  it('does not let the log contradict his own alibi either', () => {
    // Same place, so it can never fire — the log corroborates the wrong hours,
    // which is exactly why it fooled the station for a fortnight.
    const v = checkContradiction(script, claim('c-mal-log'), claim('c-mal-telescope'));
    expect(v.ok).toBe(false);
  });

  it('puts the converted log three hours after the death window', () => {
    const log = claim('c-mal-log');
    const porch = claim('c-orla-coldporch');
    expect(log.window.start - porch.window.start).toBe(170);
    expect(log.window.start).toBeGreaterThan(porch.window.end);
  });

  /**
   * The first red herring seeded from a clue the player already holds: after
   * Ardnoe and Marchbank they know the Listener never writes. Rune only ever
   * sends voice notes. He has to be provably innocent, and the reason has to be
   * humane rather than a trick.
   */
  it('clears the man who never types, and does not require it', () => {
    const v = checkContradiction(script, claim('c-rune-outside'), claim('c-rune-radio'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-rune-mast');
    expect(script.solution.killerId).not.toBe('rune');

    const runeSpeaks = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.senderId === 'rune');
    expect(runeSpeaks.length).toBeGreaterThan(0);
    for (const m of runeSpeaks) {
      expect(m.body, 'Rune never types — every message is a voice note').toMatch(/^\[voice note/);
    }
  });

  it('opens the porch camera only once somebody mentions the porch', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-porch');
    expect(cold).not.toContain('t-rune');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['h4', 'h8'],
    }).map((t) => t.id);
    expect(after).toContain('t-porch');
    expect(after).toContain('t-rune');
  });

  /** Pack 4 is standalone. The silence is what makes Pack 6 land. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    const everything = [
      script.confrontation?.confession ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(everything).not.toMatch(/telephoned|unknown number/i);
  });
});
