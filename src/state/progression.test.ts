import { describe, it, expect } from 'vitest';
import { firstUnsolvedBefore, decideCaseGate, gateIsLocked } from './progression';
import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';

/**
 * The game is linear now, and this is the rule that makes it so.
 *
 * Two things here are worth guarding more than the arithmetic. First, that it
 * fails closed while progress is still being read — the loading state and a real
 * lock look identical from here, and deciding early is what made the grid flash
 * locked on launch the last time this mistake was made. Second, that a case
 * blocked by progression reports THAT rather than the paywall, because offering
 * to sell somebody a case they cannot open yet is worse than saying nothing.
 */

const ORDER = [
  { id: 'tutorial' },
  { id: 'the-lighthouse' },
  { id: 'the-understudy' },
  { id: 'deep-field', requiredEntitlementId: CASE_PACK_ENTITLEMENT },
] as const;

const gate = (
  id: string,
  solved: string[],
  opts: { entitlements?: string[]; entitlementsLoading?: boolean; progressLoaded?: boolean } = {},
) =>
  decideCaseGate({
    script: ORDER.find((c) => c.id === id)!,
    order: ORDER,
    solvedIds: new Set(solved),
    entitlementIds: opts.entitlements ?? [],
    entitlementsLoading: opts.entitlementsLoading ?? false,
    progressLoaded: opts.progressLoaded ?? true,
  });

describe('firstUnsolvedBefore', () => {
  it('never blocks the first case', () => {
    expect(firstUnsolvedBefore('tutorial', ORDER, new Set())).toBeNull();
  });

  it('names the case immediately before when nothing is solved', () => {
    expect(firstUnsolvedBefore('the-lighthouse', ORDER, new Set())).toBe('tutorial');
  });

  /**
   * All preceding cases, not just the previous one. Under linear play these give
   * the same answer; they diverge only on a save written before ordering
   * existed, where a later case may already be solved. Naming the EARLIEST gap
   * sends the player to the start of what they missed.
   */
  it('names the earliest gap, not the nearest one', () => {
    expect(firstUnsolvedBefore('deep-field', ORDER, new Set(['the-understudy']))).toBe('tutorial');
  });

  it('clears once every earlier case is solved', () => {
    const solved = new Set(['tutorial', 'the-lighthouse', 'the-understudy']);
    expect(firstUnsolvedBefore('deep-field', ORDER, solved)).toBeNull();
  });

  /** An id this build no longer ships must not wedge the list shut. */
  it('does not block on a case that is not in the order', () => {
    expect(firstUnsolvedBefore('a-case-that-was-cut', ORDER, new Set())).toBeNull();
  });
});

describe('decideCaseGate', () => {
  it('opens the first case with nothing solved and nothing bought', () => {
    expect(gate('tutorial', [])).toEqual({ kind: 'open' });
  });

  it('withholds every decision until saved progress has been read', () => {
    expect(gate('tutorial', [], { progressLoaded: false })).toEqual({ kind: 'checking' });
  });

  it('blocks a later case on the earlier one, and says which', () => {
    expect(gate('the-lighthouse', [])).toEqual({
      kind: 'locked-progression',
      blockedByCaseId: 'tutorial',
    });
  });

  it('opens a free case once the way to it is clear', () => {
    expect(gate('the-understudy', ['tutorial', 'the-lighthouse'])).toEqual({ kind: 'open' });
  });

  /**
   * The ordering that matters commercially. A paid case that is also out of
   * reach reports the progression lock, so the player is told to keep playing
   * rather than sold something that would not open when they bought it.
   */
  it('reports progression rather than the paywall when both would block', () => {
    expect(gate('deep-field', [])).toEqual({
      kind: 'locked-progression',
      blockedByCaseId: 'tutorial',
    });
  });

  /** And the paywall appears the moment the case becomes reachable. */
  it('falls through to the paywall once the way is clear but it is unbought', () => {
    const solved = ['tutorial', 'the-lighthouse', 'the-understudy'];
    expect(gate('deep-field', solved)).toEqual({ kind: 'locked-entitlement' });
  });

  it('opens a reachable paid case for a holder of the entitlement', () => {
    const solved = ['tutorial', 'the-lighthouse', 'the-understudy'];
    expect(gate('deep-field', solved, { entitlements: [CASE_PACK_ENTITLEMENT] })).toEqual({
      kind: 'open',
    });
  });

  it('holds rather than locking while the store is still answering', () => {
    const solved = ['tutorial', 'the-lighthouse', 'the-understudy'];
    expect(gate('deep-field', solved, { entitlementsLoading: true })).toEqual({ kind: 'checking' });
  });

  it('does not strand an owner mid-load', () => {
    const solved = ['tutorial', 'the-lighthouse', 'the-understudy'];
    expect(
      gate('deep-field', solved, {
        entitlements: [CASE_PACK_ENTITLEMENT],
        entitlementsLoading: true,
      }),
    ).toEqual({ kind: 'open' });
  });
});

describe('gateIsLocked', () => {
  it('treats both locks as locked and nothing else', () => {
    expect(gateIsLocked({ kind: 'locked-entitlement' })).toBe(true);
    expect(gateIsLocked({ kind: 'locked-progression', blockedByCaseId: 'tutorial' })).toBe(true);
    expect(gateIsLocked({ kind: 'open' })).toBe(false);
    // Checking is NOT locked. A tile drawn as locked while the answer is still
    // outstanding is the flash this whole design exists to avoid.
    expect(gateIsLocked({ kind: 'checking' })).toBe(false);
  });
});
