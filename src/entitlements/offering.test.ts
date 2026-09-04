import { describe, it, expect } from 'vitest';
import {
  chooseOptions,
  classifyPurchaseFailure,
  FAILURE_MESSAGE_KEY,
  type PackageLike,
  type PurchaseFailure,
} from './offering';
import { CASE_PACK_ENTITLEMENT } from './ids';
import { singleCaseEntitlement } from './access';
import { EN } from '@/i18n/strings';

/**
 * What these protect is a paywall that now sells two things at two prices out of
 * one offering.
 *
 * The failure being guarded against does not throw and does not look like a bug:
 * the wrong package is charged for, the screen says one price, the store takes
 * another, and every log line reports success. That is the `case_pack_01` shape
 * with money attached, which is why the matching below is exact and why absence
 * has to stay absence.
 */

function pkg(productId: string, packageId = productId, priceString = '$1.00'): PackageLike {
  return {
    identifier: packageId,
    product: { identifier: productId, priceString, currencyCode: 'USD' },
  };
}

const BUNDLE = pkg(CASE_PACK_ENTITLEMENT, '$rc_lifetime', '$9.99');
const WAKE = pkg(singleCaseEntitlement('the-wake'));
const BOTHY = pkg(singleCaseEntitlement('the-bothy'));

describe('chooseOptions', () => {
  it('finds this case and the pack in one offering', () => {
    const { single, bundle } = chooseOptions([WAKE, BOTHY, BUNDLE], 'the-wake');
    expect(single).toBe(WAKE);
    expect(bundle).toBe(BUNDLE);
  });

  /**
   * The whole point of the null. A dashboard that sells no per-case product must
   * produce a screen with one option, not a "this case, one pound" button that
   * charges ten times that for something else.
   */
  it('returns no single option when the store does not sell this case', () => {
    const { single, bundle } = chooseOptions([BOTHY, BUNDLE], 'the-wake');
    expect(single).toBeNull();
    expect(bundle).toBe(BUNDLE);
  });

  it('never offers one case as the pack', () => {
    const { single, bundle } = chooseOptions([WAKE], 'the-wake');
    expect(single).toBe(WAKE);
    expect(bundle).toBeNull();
  });

  /**
   * Somebody else's case is not this case. Matching on the prefix alone, or on
   * position in the offering, would sell the wrong one.
   */
  it('never offers a different case as this one', () => {
    expect(chooseOptions([BOTHY], 'the-wake').single).toBeNull();
    expect(chooseOptions([BOTHY, WAKE], 'the-bothy').single).toBe(BOTHY);
  });

  it('matches on the package identifier as well as the product identifier', () => {
    const byPackage = pkg('rc_prod_47', singleCaseEntitlement('the-wake'));
    expect(chooseOptions([byPackage], 'the-wake').single).toBe(byPackage);
  });

  /**
   * The pack has already been renamed once (`case_pack_1` to `all_cases`) and
   * will be again. Falling back to any package that is not somebody's single
   * case keeps it sellable through that, and cannot pick up a single case by
   * mistake because the prefix is checked first.
   */
  it('falls back to an unnamed package for the pack, but never to a single case', () => {
    const renamed = pkg('everything_v2', 'everything_v2', '$9.99');
    expect(chooseOptions([WAKE, renamed], 'the-wake').bundle).toBe(renamed);
    expect(chooseOptions([WAKE, BOTHY], 'the-wake').bundle).toBeNull();
  });

  it('prefers the exactly-named pack over the fallback', () => {
    const other = pkg('something_else', 'something_else');
    expect(chooseOptions([other, BUNDLE], 'the-wake').bundle).toBe(BUNDLE);
  });

  it('has nothing to sell from an empty offering', () => {
    expect(chooseOptions([], 'the-wake')).toEqual({ single: null, bundle: null });
  });

  /** The paywall opened with no case in hand still sells the pack. */
  it('offers only the pack when no case was named', () => {
    const { single, bundle } = chooseOptions([WAKE, BUNDLE], undefined);
    expect(single).toBeNull();
    expect(bundle).toBe(BUNDLE);
  });

  it('hands back the caller own package objects, not copies', () => {
    const list = [WAKE, BUNDLE];
    const { single, bundle } = chooseOptions(list, 'the-wake');
    // Identity matters: the screen passes the result straight to
    // purchasePackage(), which needs the SDK's own object.
    expect(single).toBe(list[0]);
    expect(bundle).toBe(list[1]);
  });
});

describe('classifyPurchaseFailure', () => {
  /**
   * The flag comes before the code, because backing out of the store sheet is
   * the one outcome that must never be shown to the player as a fault.
   */
  it('reads a cancellation from the flag the SDK guarantees', () => {
    expect(classifyPurchaseFailure({ userCancelled: true })).toBe('cancelled');
    expect(classifyPurchaseFailure({ userCancelled: true, code: '2' })).toBe('cancelled');
    expect(classifyPurchaseFailure({ code: '1' })).toBe('cancelled');
  });

  it('separates the outcomes that need different actions from the player', () => {
    expect(classifyPurchaseFailure({ code: '10' })).toBe('offline');
    expect(classifyPurchaseFailure({ code: '35' })).toBe('offline');
    expect(classifyPurchaseFailure({ code: '3' })).toBe('declined');
    expect(classifyPurchaseFailure({ code: '6' })).toBe('alreadyOwned');
    expect(classifyPurchaseFailure({ code: '20' })).toBe('pending');
    expect(classifyPurchaseFailure({ code: '15' })).toBe('inProgress');
    expect(classifyPurchaseFailure({ code: '5' })).toBe('unavailable');
    expect(classifyPurchaseFailure({ code: '2' })).toBe('store');
  });

  /** The native bridge has handed a number across. String and number must agree. */
  it('reads a numeric code the same as a string one', () => {
    expect(classifyPurchaseFailure({ code: 10 })).toBe('offline');
    expect(classifyPurchaseFailure({ code: 6 })).toBe('alreadyOwned');
  });

  it('falls back to unknown rather than guessing', () => {
    expect(classifyPurchaseFailure({ code: '999' })).toBe('unknown');
    expect(classifyPurchaseFailure({})).toBe('unknown');
    expect(classifyPurchaseFailure(new Error('boom'))).toBe('unknown');
    expect(classifyPurchaseFailure(null)).toBe('unknown');
    expect(classifyPurchaseFailure(undefined)).toBe('unknown');
    expect(classifyPurchaseFailure('offline')).toBe('unknown');
  });

  /**
   * `userCancelled: false` is what a real failure carries. Reading it as
   * anything but "not a cancellation" would swallow every genuine error.
   */
  it('does not treat a false cancellation flag as a cancellation', () => {
    expect(classifyPurchaseFailure({ userCancelled: false, code: '10' })).toBe('offline');
  });
});

describe('FAILURE_MESSAGE_KEY', () => {
  /**
   * The check that stops a new failure kind shipping as a blank line on the
   * paywall. `Record<PurchaseFailure, StringKey>` makes the compiler demand an
   * entry; only this makes the catalogue demand a sentence.
   */
  it('names a real English string for every outcome', () => {
    for (const [failure, key] of Object.entries(FAILURE_MESSAGE_KEY)) {
      expect(EN[key], `${failure} has no sentence`).toBeTruthy();
    }
  });

  it('gives each outcome its own sentence', () => {
    const keys = Object.values(FAILURE_MESSAGE_KEY);
    expect(new Set(keys).size).toBe(keys.length);
  });

  /** Every classification the function can return has to be in the map. */
  it('covers everything classifyPurchaseFailure produces', () => {
    const produced: PurchaseFailure[] = [
      classifyPurchaseFailure({ userCancelled: true }),
      classifyPurchaseFailure({ code: '10' }),
      classifyPurchaseFailure({ code: '3' }),
      classifyPurchaseFailure({ code: '6' }),
      classifyPurchaseFailure({ code: '20' }),
      classifyPurchaseFailure({ code: '15' }),
      classifyPurchaseFailure({ code: '5' }),
      classifyPurchaseFailure({ code: '2' }),
      classifyPurchaseFailure({}),
    ];
    for (const failure of produced) {
      expect(FAILURE_MESSAGE_KEY[failure]).toBeTruthy();
    }
    expect(new Set(produced).size).toBe(Object.keys(FAILURE_MESSAGE_KEY).length);
  });
});
