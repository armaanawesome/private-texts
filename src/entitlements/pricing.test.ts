import { describe, it, expect } from 'vitest';
import { CASES } from '../../content/cases/index';
import { CASE_PACK_ENTITLEMENT } from './ids';
import { PAID_CASE_COUNT, REFERENCE_PER_CASE, referencePrice } from './pricing';

/**
 * The paywall advertises a number of cases. That number has to be true.
 *
 * The copy this replaced said "A second full-length case", written when there
 * were two. Twelve cases later it was still saying it, on the one screen where a
 * wrong count is a wrong claim about what somebody is buying. Nothing caught it,
 * because a stale sentence is not a failing test until somebody writes one.
 */
describe('PAID_CASE_COUNT', () => {
  const paid = CASES.filter((c) => c.requiredEntitlementId === CASE_PACK_ENTITLEMENT);

  it('matches the number of cases the pack actually unlocks', () => {
    expect(
      paid.length,
      `the paywall advertises ${PAID_CASE_COUNT} cases but ${paid.length} require the entitlement`,
    ).toBe(PAID_CASE_COUNT);
  });

  it('leaves some cases free, or the paywall is the first screen anybody meets', () => {
    expect(CASES.length).toBeGreaterThan(paid.length);
  });
});

describe('referencePrice', () => {
  /**
   * The struck-through figure is the pack's stated per-case value, so it is
   * exactly count x unit — not a discount computed off the live price, which
   * would move whenever the store price moved and quietly stop meaning anything.
   */
  it('is one unit per case, in the store currency', () => {
    expect(referencePrice('USD', 'en-US')).toBe('$12');
    expect(PAID_CASE_COUNT * REFERENCE_PER_CASE).toBe(12);
  });

  /**
   * The whole reason this is computed rather than written as the literal "$12":
   * a dollar sign beside a euro price is worse than no reference at all.
   */
  it('follows the currency rather than assuming dollars', () => {
    expect(referencePrice('EUR', 'de-DE')).toContain('12');
    expect(referencePrice('EUR', 'de-DE')).not.toContain('$');
    expect(referencePrice('JPY', 'ja-JP')).toContain('12');
  });

  it('shows whole units, never a fake-looking 12.00', () => {
    expect(referencePrice('USD', 'en-US')).not.toContain('.00');
  });

  /** Decoration must never throw on the paywall. */
  it('degrades to a bare number rather than throwing on a bad currency', () => {
    expect(referencePrice('NOT_A_CURRENCY')).toBe('12');
    expect(referencePrice('')).toBe('12');
  });
});
