import { describe, it, expect } from 'vitest';

/**
 * Mirror of the reducer inside useEntitlements. Kept as a pure function test
 * because the hook itself needs a React renderer and the native Purchases
 * module, neither of which run in the Node suite.
 *
 * This guards a crash that reached a device: RevenueCat returns a fresh array
 * on every poll and every listener fire, so storing it verbatim gave
 * `entitlementIds` a new identity each update. An effect keyed on it re-ran
 * forever — "Maximum update depth exceeded" on the paywall.
 */
function sameIds(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

function apply(prev: string[], next: string[]): string[] {
  const sorted = [...next].sort();
  return sameIds(prev, sorted) ? prev : sorted;
}

describe('entitlement id reducer', () => {
  it('keeps the previous reference when nothing changed', () => {
    const prev = ['case_pack_01'];
    expect(apply(prev, ['case_pack_01'])).toBe(prev);
  });

  it('keeps the previous reference regardless of incoming order', () => {
    const prev = ['a', 'b'];
    expect(apply(prev, ['b', 'a'])).toBe(prev);
  });

  it('returns a new reference when an entitlement is granted', () => {
    const prev: string[] = [];
    const next = apply(prev, ['case_pack_01']);
    expect(next).not.toBe(prev);
    expect(next).toEqual(['case_pack_01']);
  });

  it('returns a new reference when an entitlement is revoked', () => {
    const prev = ['case_pack_01'];
    const next = apply(prev, []);
    expect(next).not.toBe(prev);
    expect(next).toEqual([]);
  });

  it('does not mutate the incoming array', () => {
    const incoming = ['b', 'a'];
    apply([], incoming);
    expect(incoming).toEqual(['b', 'a']);
  });

  it('is stable across repeated identical updates', () => {
    // The listener can fire many times with the same payload; every one of
    // those must be a no-op or the paywall loops again.
    let state: string[] = [];
    state = apply(state, ['case_pack_01']);
    const settled = state;
    for (let i = 0; i < 10; i += 1) state = apply(state, ['case_pack_01']);
    expect(state).toBe(settled);
  });
});
