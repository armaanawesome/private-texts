import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theNightFerryRaw } from './the-night-ferry';
import { describeCaseContract } from './caseContract';

const script = loadCase(theNightFerryRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Night Ferry', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-messroom']);
  });

  /**
   * The pack's shape. Kirkwall is deliberately not a child of the ship, so a man
   * who puts himself ashore there is claiming a place that shares no ancestry
   * with anywhere aboard. Everywhere else on the vessel nests under `ship`,
   * which is what lets "he was aboard" coexist with "he was on the after deck"
   * and still convict him of the Kirkwall story.
   */
  it('breaks the alibi on a port call that did not happen', () => {
    const ashore = checkContradiction(script, claim('c-dougie-kirkwall'), claim('c-dougie-aboard'));
    expect(ashore.ok).toBe(true);
    expect(ashore.reason).toMatch(/two places/i);

    const aboardAndAft = checkContradiction(
      script,
      claim('c-dougie-aboard'),
      claim('c-dougie-afterdeck'),
    );
    expect(aboardAndAft.ok, 'being on deck is being aboard').toBe(false);
    expect(aboardAndAft.reason).toMatch(/same area/i);
  });

  /**
   * He needed a reason to have been aft and invented the wrong one. The object
   * axis carries exactly one required proof here — Pack 10 was the object pack
   * and Pack 11 kept it optional, so this is the first time since that a thing
   * convicts anybody.
   */
  it('convicts him on the one object he should not have mentioned', () => {
    const v = checkContradiction(script, claim('c-phone-dougie'), claim('c-phone-marisa'));
    expect(v.ok).toBe(true);
    expect(v.reason).toMatch(/only one person/i);
    expect(script.solution.requiredContradictionIds).toContain('x-phone');
  });

  it('presses the witness first and the deck log last', () => {
    const beats = script.confrontation?.beats ?? [];
    expect(beats[0]?.evidence.id).toBe('x-dougie-deck');
    expect(beats[1]?.evidence.id).toBe('x-phone');
    // The Kirkwall call goes third because it is the only one he cannot call
    // unreliable, and by then he has spent both rebuttals calling a barmaid one.
    expect(beats[2]?.evidence.id).toBe('x-dougie-kirkwall');
    expect(beats[0]?.rebuttal).not.toBe('');
    expect(beats[1]?.rebuttal).not.toBe('');
    expect(beats[2]?.rebuttal).toBe('');
  });

  /**
   * The red herring is the man everybody on that ship reaches for first, and
   * Senga is the one who says so — she hands over the accusation and the answer
   * in the same breath, which is the opposite of how Pack 13's killer used his.
   */
  it('clears the man the crew suspected, and does not require it', () => {
    const v = checkContradiction(script, claim('c-eck-afterdeck'), claim('c-eck-hospital'));
    expect(v.ok).toBe(true);
    expect(claim('c-eck-afterdeck').assertedBy).toBe('senga');
    expect(claim('c-eck-afterdeck').assertedBy).not.toBe(script.solution.killerId);
    expect(script.solution.requiredContradictionIds).not.toContain('x-eck');
    expect(script.solution.killerId).not.toBe('eck');
  });

  it('opens Eck only after Marisa says his name', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-eck');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['m10'],
    }).map((t) => t.id);
    expect(after).toContain('t-eck');
  });

  it('opens the officer only once he has been put on that deck', () => {
    expect(script.threads.find((t) => t.id === 't-senga')?.requiresContradictionIds).toEqual([
      'x-dougie-deck',
    ]);
    const gated = visibleThreads(script, {
      confirmedContradictionIds: ['x-dougie-deck'],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(gated).toContain('t-senga');
  });

  /**
   * The motive is proportionate to nothing, and the case has to carry that
   * without anybody being cruel. Nobody laughed. She was pleased to see him.
   */
  it('keeps the motive free of malice on the victim’s side', () => {
    const motive = script.motives.find((m) => m.id === 'm-messroom')!;
    expect(motive.summary).toMatch(/pleased/i);
    expect(motive.establishedByMessageIds).toHaveLength(2);

    // Established across two threads, per the standing craft rule.
    const threadOf = new Map(
      script.threads.flatMap((t) => t.messages.map((m) => [m.id, t.id] as const)),
    );
    const threads = new Set(motive.establishedByMessageIds.map((id) => threadOf.get(id)));
    expect(threads.size).toBe(2);
  });

  it('holds the confession’s turn back until the confession', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toMatch(/I did the messroom\./);
    expect(confession).toMatch(/I heard the announcement/i);

    // He is not a man who slept through it. He heard it, and four days later
    // read the timetable out anyway, which is the whole character.
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toMatch(/I did the messroom\./);
  });

  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
  });
});
