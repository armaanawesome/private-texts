import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { openMicRaw } from './open-mic';
import { describeCaseContract } from './caseContract';

const script = loadCase(openMicRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('Open Mic', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-tour']);
  });

  /**
   * The shape: the alibi footage is real and he is really in it, and it is from
   * the wrong week. So the clip is broken by proving something about the VICTIM,
   * not about him — she cannot be at the bar in his clip and on the stage with
   * her microphone up at the same minute.
   */
  it('breaks the clip on the victim rather than the killer', () => {
    const bar = claim('c-marnie-bar');
    const stage = claim('c-marnie-stage');
    expect(bar.subject).toBe('marnie');
    expect(stage.subject).toBe('marnie');
    expect(bar.window).toEqual(stage.window);
    expect(checkContradiction(script, bar, stage).ok).toBe(true);
    expect(script.solution.requiredContradictionIds).toContain('x-marnie-bar');
  });

  /** The object axis: one camera, one card, two people holding it. */
  it('uses the single card as a cross-subject contradiction', () => {
    const a = claim('c-card-gil');
    const b = claim('c-card-roz');
    expect(a.subject).not.toBe(b.subject);
    const v = checkContradiction(script, a, b);
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/only one/i);

    const card = script.objects.find((o) => o.id === 'card');
    expect(card?.unique, 'the card must be unique or the alibi cannot be broken').toBe(true);
  });

  /**
   * Red herring seeded from clue 3 — decades on the circuit. Kevin is
   * sixty-one, has worked every town since 1994, knows everybody, and carries a
   * Nokia, which after Pack 4 should make the player's stomach drop. He is
   * cleared by the very recording the killer offered up.
   */
  it('clears the lifer, and does not require it', () => {
    const v = checkContradiction(script, claim('c-ferdy-alley'), claim('c-ferdy-stage'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-ferdy-stage');
    expect(script.solution.killerId).not.toBe('ferdy');
  });

  it('opens Kevin only after Kit points at him', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-ferdy');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['k8'],
    }).map((t) => t.id);
    expect(after).toContain('t-ferdy');
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
