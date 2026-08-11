import { describe, it, expect } from 'vitest';
import { explainEntitlementGap } from './diagnosis';

/**
 * A purchase that succeeds and unlocks nothing is the worst failure this app
 * has: the player pays, the receipt is valid, and no error appears anywhere.
 * It also fails the one hard requirement of the competition.
 *
 * The causes need opposite fixes and look identical from the outside, so this
 * turns the evidence into a verdict instead of leaving it to guesswork:
 *
 *  - an entitlement is active under a different id  -> our constant is wrong
 *  - a product was bought but no entitlement exists -> the dashboard is wrong
 *
 * Pure, so it is tested here rather than read off a device.
 */
describe('explainEntitlementGap', () => {
  const expected = 'case_pack_01';

  it('reports success when the expected entitlement is active', () => {
    const v = explainEntitlementGap({
      expected,
      activeIds: ['case_pack_01'],
      allIds: ['case_pack_01'],
      purchasedProductIds: ['case_pack_1'],
    });
    expect(v.ok).toBe(true);
  });

  it('names the real id when an entitlement is active under a different name', () => {
    const v = explainEntitlementGap({
      expected,
      activeIds: ['case_pack_1'],
      allIds: ['case_pack_1'],
      purchasedProductIds: ['case_pack_1'],
    });
    expect(v.ok).toBe(false);
    expect(v.fix).toContain('case_pack_1');
    // The actionable half: this one is fixed in code, not in the dashboard.
    expect(v.fix).toMatch(/ids\.ts|constant/i);
  });

  it('blames the dashboard when a product was bought but grants no entitlement', () => {
    const v = explainEntitlementGap({
      expected,
      activeIds: [],
      allIds: [],
      purchasedProductIds: ['case_pack_1'],
    });
    expect(v.ok).toBe(false);
    expect(v.fix).toMatch(/dashboard/i);
    // Must NOT send the reader to change the constant - there is nothing to
    // change it to, and doing so would waste the next debugging session.
    expect(v.fix).not.toMatch(/ids\.ts/i);
  });

  it('reports an expired grant when the entitlement exists but is not active', () => {
    const v = explainEntitlementGap({
      expected,
      activeIds: [],
      allIds: ['case_pack_01'],
      purchasedProductIds: ['case_pack_1'],
    });
    expect(v.ok).toBe(false);
    expect(v.fix).toMatch(/expired|no longer active|revoked/i);
  });

  it('reports that nothing reached RevenueCat when there is no purchase at all', () => {
    const v = explainEntitlementGap({
      expected,
      activeIds: [],
      allIds: [],
      purchasedProductIds: [],
    });
    expect(v.ok).toBe(false);
    expect(v.fix).toMatch(/no purchase/i);
  });
});
