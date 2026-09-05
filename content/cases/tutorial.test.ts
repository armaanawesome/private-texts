import { describe, it, expect } from 'vitest';
import {
  loadCase,
  checkContradiction,
  evaluateAccusation,
  visibleThreads,
  availableClaims,
  type Claim,
} from '@/engine';
import { tutorialRaw } from './tutorial';
import { describeCaseContract } from './caseContract';

const script = loadCase(tutorialRaw);

const allClaims: Claim[] = script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? []));
const allMessageIds = script.threads.flatMap((t) => t.messages.map((m) => m.id));
const byId = new Map(allClaims.map((c) => [c.id, c]));

function claim(id: string): Claim {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
}

/** Progress with the given contradictions proven and everything read. */
const at = (proven: string[]) => ({
  confirmedContradictionIds: proven,
  readMessageIds: allMessageIds,
});

describeCaseContract(script);

describe('Tutorial — The Bakehouse', () => {
  it('stays small enough to finish in five minutes', () => {
    expect(script.id).toBe('tutorial');
    expect(script.characters).toHaveLength(4);
    expect(script.threads).toHaveLength(3);

    const messages = script.threads.reduce((n, t) => n + t.messages.length, 0);
    expect(messages).toBeLessThanOrEqual(30);

    // One contradiction, so the player learns the move rather than grinding it.
    expect(script.solution.requiredContradictionIds).toEqual(['x-roza-square']);
  });

  it('is free, and carries none of the campaign arc', () => {
    expect(script.requiredEntitlementId).toBeUndefined();
    expect(script.coda).toBeUndefined();

    // The arc belongs to the fifteen. A tutorial that name-dropped the Listener
    // would spoil Pack 1 for a player who has not started it.
    const prose = [
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
      ...script.contradictions.map((c) => c.revelation),
      script.confrontation?.confession ?? '',
      script.solution.epilogue,
      script.briefing?.opening ?? '',
    ].join('\n');
    expect(prose).not.toMatch(/keeper|listener|unknown number/i);
  });

  /* ------------------------------------------------------------------ teaches
   * 1. A thread is somebody talking, and what they say goes on the board as a
   *    claim — including the dead man's own messages.
   */
  it('puts a claim in every thread, including the victim’s', () => {
    for (const thread of script.threads) {
      const claims = thread.messages.flatMap((m) => m.claims ?? []);
      expect(claims.length, `thread ${thread.id} puts nothing on the board`).toBeGreaterThan(0);
    }
    expect(claim('c-tom-ovens').assertedBy).toBe('tom');
  });

  /* 2 and 3. Pinning two claims, and what a contradiction actually is. */
  it('fires exactly one pair, and says why in the engine’s own words', () => {
    const verdict = checkContradiction(script, claim('c-roza-ovens'), claim('c-roza-square'));
    expect(verdict).toEqual({ ok: true, kind: 'placeConflict', reason: 'One person, two places, same moment.' });

    const firing = [];
    for (let i = 0; i < allClaims.length; i += 1) {
      for (let j = i + 1; j < allClaims.length; j += 1) {
        if (checkContradiction(script, allClaims[i]!, allClaims[j]!).ok) {
          firing.push([allClaims[i]!.id, allClaims[j]!.id].sort().join('|'));
        }
      }
    }
    expect(firing).toEqual(['c-roza-ovens|c-roza-square']);
  });

  /* ------------------------------------------------------------------------
   * 4. The lesson a tutorial usually skips: some pairs correctly refuse, and
   *    the game explains itself. A player who never sees a rejection has not
   *    understood the game, so both of these are authored, not incidental.
   */
  it('refuses the nested-place pair, because the yard is inside the bakery', () => {
    const verdict = checkContradiction(script, claim('c-tom-yard'), claim('c-tom-bakery'));
    expect(verdict).toEqual({ ok: false, kind: 'sameArea', reason: 'Those two places are the same area.' });

    // It must reject for the RIGHT reason. If the windows ever stop overlapping
    // the pair still fails, but on time — and the place lesson silently dies.
    expect(claim('c-tom-yard').window.start).toBeLessThan(claim('c-tom-bakery').window.end);
    expect(claim('c-tom-bakery').window.start).toBeLessThan(claim('c-tom-yard').window.end);
  });

  it('refuses the same-person pair whose moments never meet', () => {
    const verdict = checkContradiction(script, claim('c-roza-station'), claim('c-roza-ovens'));
    expect(verdict).toEqual({ ok: false, kind: 'differentTimes', reason: 'These describe different times.' });

    // And these two places genuinely conflict, so time is the only thing saving
    // her. That is precisely what makes it a lesson rather than a dead pairing.
    expect(checkContradiction(script, claim('c-roza-station'), claim('c-roza-square')).ok).toBe(
      false,
    );
  });

  it('refuses a pair that is about two different people', () => {
    const verdict = checkContradiction(script, claim('c-tom-ovens'), claim('c-roza-ovens'));
    expect(verdict).toEqual({ ok: false, kind: 'differentPeople', reason: 'These are about different people.' });
  });

  /**
   * A near-miss the player cannot hold in their hands at the same time teaches
   * nobody anything. Both halves of each one must be readable on a normal run.
   */
  it('lets the player actually hold both halves of every near-miss', () => {
    const held = new Set(availableClaims(script, allMessageIds).map((c) => c.id));
    for (const pair of [
      ['c-tom-yard', 'c-tom-bakery'],
      ['c-roza-station', 'c-roza-ovens'],
    ]) {
      for (const id of pair) expect(held.has(id), `${id} is unreachable`).toBe(true);
    }
  });

  /** And the same lesson is taught in the fiction, for a player who never pins it. */
  it('has Ivy give the nested-place answer in her own words', () => {
    const ivy = script.threads.find((t) => t.id === 't-ivy');
    const bodies = ivy?.messages.map((m) => m.body) ?? [];
    expect(bodies.some((b) => b.includes('the yard is the bakery'))).toBe(true);
  });

  /* ------------------------------------------------------------- progression */
  it('finds Ivy by reading rather than by proving anything', () => {
    const cold = visibleThreads(script, { confirmedContradictionIds: [], readMessageIds: [] });
    expect(cold.map((t) => t.id)).toEqual(['t-tom', 't-roza']);

    const afterRoza = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['r8'],
    });
    expect(afterRoza.map((t) => t.id)).toContain('t-ivy');

    // She is named in the message that finds her, or she arrives out of nowhere.
    const r8 = script.threads
      .flatMap((t) => t.messages)
      .find((m) => m.id === 'r8');
    expect(r8?.body).toContain('Ivy');
  });

  it('keeps the proving claim behind the thread the player has to find', () => {
    const openAtStart = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).flatMap((t) => t.messages.flatMap((m) => (m.claims ?? []).map((c) => c.id)));
    expect(openAtStart).toContain('c-roza-ovens');
    expect(openAtStart).not.toContain('c-roza-square');
  });

  /* ----------------------------------------------------------------- 5. accuse */
  it('refuses an accusation until the one contradiction is proven', () => {
    expect(evaluateAccusation(script, 'roza', at([]))).toMatchObject({
      correct: false,
      missingCount: 1,
    });
    expect(evaluateAccusation(script, 'roza', at(['x-roza-square'])).correct).toBe(true);
  });

  it('still refuses when the player can break the story but cannot say why', () => {
    // The motive is assembled from two messages in two different threads, and
    // the accusation screen must not accept proof alone.
    const withoutMotive = {
      confirmedContradictionIds: ['x-roza-square'],
      readMessageIds: allMessageIds.filter((id) => id !== 'iv10'),
    };
    expect(evaluateAccusation(script, 'roza', withoutMotive)).toMatchObject({ correct: false });

    const motive = script.motives[0]!;
    const threadOf = (messageId: string) =>
      script.threads.find((t) => t.messages.some((m) => m.id === messageId))?.id;
    const threads = new Set(motive.establishedByMessageIds.map(threadOf));
    expect(threads.size, 'the motive is readable from a single thread').toBe(2);
  });

  it('accepts nobody but Roza, even on full proof', () => {
    for (const id of ['tom', 'ivy']) {
      expect(evaluateAccusation(script, id, at(['x-roza-square'])).correct).toBe(false);
    }
    expect(evaluateAccusation(script, 'roza', at(['x-roza-square'])).correct).toBe(true);
  });
});
