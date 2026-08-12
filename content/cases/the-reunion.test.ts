import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theReunionRaw } from './the-reunion';
import { describeCaseContract } from './caseContract';

const script = loadCase(theReunionRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Reunion', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-riverbank']);
  });

  /**
   * Ledger correction, 2026-08-12. This pack was filed under `with_person`,
   * which the engine can never fire on — `checkContradiction` ends at
   * src/engine/contradiction.ts:85 with "Those two things can both be true".
   * The axis moved to time and the refusal became the pack's signature.
   */
  it('keeps with_person out of every required proof', () => {
    for (const id of script.solution.requiredContradictionIds) {
      const c = script.contradictions.find((x) => x.id === id)!;
      for (const cl of [claim(c.claimIdA), claim(c.claimIdB)]) {
        expect(cl.predicate.kind, `${id} leans on an axis that cannot fire`).not.toBe('with_person');
      }
    }
  });

  /**
   * The signature. A reunion is a room where ninety people can tell you who they
   * were standing with, and none of it is evidence. The player pairs these,
   * is told they can both be true, and learns the rule from the refusal.
   */
  it('refuses every pairing of who was standing with whom', () => {
    const company = [...byId.values()].filter((c) => c.predicate.kind === 'with_person');
    expect(company.length, 'the decoys are missing').toBe(4);

    const pairs: [string, string][] = [
      ['c-marika-with-nia', 'c-marika-with-rafe'],
      ['c-nia-with-marika', 'c-nia-with-rafe'],
    ];
    for (const [a, b] of pairs) {
      const v = checkContradiction(script, claim(a), claim(b));
      expect(v.ok, `${a} × ${b} should not convict anybody`).toBe(false);
      expect(v.reason).toBe('Those two things can both be true.');
    }
  });

  /**
   * The time lie, and what makes it this pack's rather than Pack 4's, 7's or
   * 10's: he did not falsify a clock, he became one. Nobody at a reunion looks
   * at a watch — they date the evening by the speech, and he wrote the running
   * order and then moved his own slot forty-five minutes early.
   */
  it('breaks him on the clock every other witness is using', () => {
    const v = checkContradiction(script, claim('c-rafe-speech'), claim('c-rafe-outside'));
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/both at once/i);
    expect(script.solution.requiredContradictionIds).toContain('x-rafe-speech');
  });

  it('breaks him on a witness, then on a barrier that prints', () => {
    const beats = script.confrontation?.beats ?? [];
    expect(beats[0]?.evidence.id).toBe('x-rafe-speech');
    expect(beats[1]?.evidence.id).toBe('x-rafe-music');
    // The log goes third for the same reason the fob did in Pack 3 and the
    // camera in Pack 11: it is the one he cannot call unreliable, and he has
    // already spent his rebuttals calling a caretaker unreliable.
    expect(beats[2]?.evidence.id).toBe('x-rafe-gate');
    expect(beats[1]?.rebuttal).not.toBe('');
    expect(beats[2]?.rebuttal).toBe('');
  });

  /**
   * The herring seeded by Pack 12's clue 5. The killer is the one who points at
   * him, and the fact that clears him — a crisis line shift forty-one miles away
   * — is the exact fact the arc has trained the player to find damning.
   */
  it('clears the volunteer, and has the killer be the one who named him', () => {
    const v = checkContradiction(script, claim('c-tobi-hall'), claim('c-tobi-branch'));
    expect(v.ok).toBe(true);
    expect(claim('c-tobi-hall').assertedBy).toBe(script.solution.killerId);
    expect(script.solution.requiredContradictionIds).not.toContain('x-tobi-branch');
    expect(script.solution.killerId).not.toBe('tobi');
  });

  it('opens Tobi only after Mark points at him', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-tobi');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['r7'],
    }).map((t) => t.id);
    expect(after).toContain('t-tobi');
  });

  /**
   * Mr Vale carries two of the three proofs, so the proof that opens him has to
   * come from elsewhere — Mark's own account against Michelle's. The general
   * deadlock check now lives in the shared contract.
   */
  it('opens Mr Vale on the one proof he does not supply', () => {
    expect(script.threads.find((t) => t.id === 't-corin')?.requiresContradictionIds).toEqual([
      'x-rafe-speech',
    ]);
    for (const cid of ['c-rafe-speech', 'c-rafe-outside']) {
      expect(claim(cid).assertedBy, `${cid} comes from Mr Vale`).not.toBe('corin');
    }
  });

  /**
   * The turn. He was not stopping an accusation — the letter said "we" and it
   * had been in a postbox since ten past eight that morning. He did not know
   * because he never asked her a direct question, which is the habit he taught
   * the other three on the bank when they were seventeen.
   */
  it('lands the confession on the letter he never read', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toMatch(/never asked her what was in it/i);
    expect(confession).toMatch(/it did not have my name in it/i);
  });

  /**
   * His voice tell is control: he never contracts a word, anywhere, for the
   * whole case. It breaks exactly once, on the last line of the confession, and
   * that break is the character.
   */
  it('never lets him contract a word until the last line', () => {
    const contraction = /\w(n’t|’re|’ve|’ll|’d|’m)\b|\bit’s\b/i;

    const his = script.threads.flatMap((t) =>
      t.messages.filter((m) => m.senderId === 'rafe').map((m) => m.body),
    );
    expect(his.length, 'Mark barely speaks').toBeGreaterThan(8);
    for (const body of his) {
      expect(contraction.test(body), `Mark contracts a word: ${body}`).toBe(false);
    }

    const c = script.confrontation!;
    for (const line of [c.opening, ...c.deflections, ...c.beats.map((b) => b.rebuttal)]) {
      expect(contraction.test(line), `Mark contracts a word: ${line}`).toBe(false);
    }

    const lines = c.confession.split('\n').filter((l) => l.trim() !== '');
    expect(lines.filter((l) => contraction.test(l))).toEqual(['She wasn’t going to name me.']);
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
