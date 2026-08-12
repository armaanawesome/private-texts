import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theListenerRaw } from './the-listener';
import { theLighthouseRaw } from './the-lighthouse';
import { describeCaseContract } from './caseContract';

const script = loadCase(theListenerRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

/** Everything he ever says, in the case and in the confrontation. */
function hisWords(): string[] {
  const c = script.confrontation!;
  return [
    ...script.threads.flatMap((t) =>
      t.messages.filter((m) => m.senderId === 'listener').map((m) => m.body),
    ),
    c.opening,
    ...c.deflections,
    ...c.beats.map((b) => b.rebuttal),
    c.confession,
  ];
}

describe('The Listener', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-finding-out']);
    expect(script.solution.killerId).toBe('listener');
  });

  /**
   * The arc payoff, pinned across two case files. `x-papers-lie` has sat in
   * Pack 1 since it was written — gating nothing, required by nothing, so a
   * player could finish the tutorial having never noticed it. Claims cannot
   * cross case scripts, so the finale re-records it from the Ardnoe file. If
   * anybody edits the lie in Pack 1, this fails.
   */
  it('hangs him on the clue the tutorial case left lying there', () => {
    const pack1 = loadCase(theLighthouseRaw);
    const lie = pack1.contradictions.find((c) => c.id === 'x-papers-lie');
    expect(lie, 'Pack 1 no longer carries the Listener clue').toBeDefined();
    expect(
      pack1.solution.requiredContradictionIds,
      'the clue must stay optional in Pack 1',
    ).not.toContain('x-papers-lie');

    const pack1Claims = new Map(
      pack1.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
    );
    for (const id of ['c-papers-sent', 'c-papers-kept']) {
      const there = pack1Claims.get(id);
      const here = claim(id);
      expect(there, `Pack 1 no longer has ${id}`).toBeDefined();
      expect(here.subject).toBe(there!.subject);
      expect(here.predicate).toEqual(there!.predicate);
    }

    const v = checkContradiction(script, claim('c-papers-sent'), claim('c-papers-kept'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).toContain('x-papers');
  });

  /**
   * Continuity with the tutorial case, found by reading the generated storybook
   * rather than by any test. The finale had her as "Ruth Nairn", kept the light
   * for nineteen years, wrote in careful sentences, and admired the still night
   * she died on. She is Ruth Calder, she kept it for forty years, she is the
   * player's aunt, she types in lowercase with no full stops, and it was the
   * night of the equinox storm.
   */
  it('agrees with the tutorial case about who she was', () => {
    const pack1 = loadCase(theLighthouseRaw);

    expect(script.characters.find((c) => c.id === 'ruth')?.name).toBe('Ruth Calder');
    expect(pack1.briefing!.opening).toContain('Ruth Calder');

    const opening = script.briefing!.opening;
    expect(opening).toContain('Ruth Calder');
    expect(opening, 'the finale forgets she was his aunt').toMatch(/your aunt/i);
    expect(opening).toMatch(/forty years/i);

    // The archive is her real handset. At least one message is hers word for
    // word, which is what a player who did Pack 1 will recognise.
    const hersInPack1 = new Set(
      pack1.threads.flatMap((t) => t.messages.filter((m) => m.senderId === 'ruth').map((m) => m.body)),
    );
    const archived = script.threads
      .find((t) => t.id === 't-ruth')!
      .messages.filter((m) => m.senderId === 'ruth')
      .map((m) => m.body);
    expect(archived.length).toBeGreaterThan(3);
    expect(
      archived.some((b) => hersInPack1.has(b)),
      'nothing in the archive is actually from her Pack 1 handset',
    ).toBe(true);

    // Her voice: lowercase, no trailing full stop, never a still night.
    for (const b of archived) {
      expect(b.endsWith('.'), `Ruth does not end on a full stop: ${b}`).toBe(false);
      expect(b).not.toMatch(/still night/i);
    }
  });

  /**
   * The structural problem the pack exists to solve. He has asserted nothing for
   * fourteen packs, and the engine needs claims. So he is made to correct a
   * wrong account of his own work, and both halves of that proof are his — the
   * only contradiction in fifteen cases where one person supplies both claims.
   */
  it('breaks him on two things he says himself', () => {
    const a = claim('c-listener-never');
    const b = claim('c-listener-wording');
    expect(a.assertedBy).toBe('listener');
    expect(b.assertedBy).toBe('listener');
    expect(a.subject).toBe('listener');
    expect(b.subject).toBe('listener');

    const v = checkContradiction(script, a, b);
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/both at once/i);
  });

  it('puts him in the box with a number nobody published', () => {
    const v = checkContradiction(script, claim('c-listener-home'), claim('c-listener-box'));
    expect(v.ok).toBe(true);
    expect(claim('c-listener-box').assertedBy).toBe('nkemdi');
    expect(script.contradictions.find((c) => c.id === 'x-box')?.revelation).toMatch(/ninety-four/i);
  });

  /**
   * The premise the whole arc rests on: he is never in the room, so there is
   * nothing of his to trace. The call box is four miles out on the Kilmorack
   * road and shares no ancestry with the village.
   */
  it('never puts him inside the village', () => {
    const ardnoe = new Set(
      script.places.filter((p) => p.id === 'ardnoe' || p.parentId === 'ardnoe').map((p) => p.id),
    );
    for (const c of byId.values()) {
      if (c.subject !== 'listener') continue;
      if (c.predicate.kind !== 'at_place') continue;
      expect(ardnoe.has(c.predicate.placeId), `${c.id} puts him in Ardnoe`).toBe(false);
    }
  });

  /**
   * She is every clue at once — a crisis line, the call box, fifteen years of
   * knowing — and innocent for a reason the same tools prove. Per the arc rule:
   * a suspect who merely looks guilty and is then dropped is a cheat.
   */
  it('clears the woman who matches every clue, and does not require it', () => {
    const v = checkContradiction(script, claim('c-beth-box'), claim('c-beth-hospital'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-beth');
    expect(script.solution.killerId).not.toBe('beth');
  });

  it('opens Mairi by discovery and Beth on the Ardnoe lie', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-mairi');
    expect(cold).not.toContain('t-beth');
    expect(cold).toContain('t-listener');

    const afterReading = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['k11'],
    }).map((t) => t.id);
    expect(afterReading).toContain('t-mairi');

    const afterProof = visibleThreads(script, {
      confirmedContradictionIds: ['x-papers'],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(afterProof).toContain('t-beth');
  });

  /**
   * The rule that keeps him frightening across fifteen packs: he never
   * threatens, never gloats, never uses the word. He reviews your work. Praise
   * from him is worse than a threat and none of it is prosecutable, which is
   * exactly why he permits himself to send it.
   */
  it('never lets him say the word, or threaten, in fifteen packs of talking', () => {
    for (const line of hisWords()) {
      expect(/\bkill|\bmurder|\bstab|\bstrangl/i.test(line), `he says it: ${line}`).toBe(false);
      expect(/\bI will find you|\byou will regret|\bwatch yourself/i.test(line), line).toBe(false);
    }
    // Mairi says it in her own thread. The prohibition is his alone.
    const hers = script.threads
      .flatMap((t) => t.messages.filter((m) => m.senderId === 'mairi').map((m) => m.body))
      .join(' ');
    expect(hers).toMatch(/killed/i);
  });

  it('reviews the player’s earlier cases before it turns on him', () => {
    const early = script.threads
      .find((t) => t.id === 't-listener')!
      .messages.filter((m) => m.senderId === 'listener' && m.sentAt < 200)
      .map((m) => m.body)
      .join(' ');
    expect(early).toMatch(/Ardnoe/);
    expect(early).toMatch(/ferry/i);
    expect(early).toMatch(/kept all of them/i);
  });

  /**
   * The ending, written first in docs/arc-design.md: you catch him, and the
   * confession is that your first famous case was his.
   */
  it('lands the reveal the whole arc was written backwards from', () => {
    const confession = script.confrontation!.confession;
    expect(confession).toMatch(/Corrieburn was mine/);
    expect(confession).toMatch(/I did not choose you because you were the best/);
    expect(confession).toMatch(/You are the best because I chose you/);
    // He explains the follow-ups, which is the motive rather than a flourish.
    expect(confession).toMatch(/It has to be proved/);
  });

  /**
   * He does not get the last word. The finale's promise is that you catch him,
   * and a coda from a caught man takes it back — so the last voice in fifteen
   * packs is the first killer.
   */
  it('gives the last word to Mairi Bell and not to him', () => {
    expect(script.coda).toBeDefined();
    expect(script.coda!.from).toBe('Mairi Bell');
    expect(script.coda!.from).not.toBe('Unknown number');
    expect(script.coda!.messages.join(' ')).toMatch(/then you already know/i);
  });
});
