/**
 * The reference price shown struck through beside the real one.
 *
 * Imports nothing, so the arithmetic is testable in plain Node — the same split
 * `src/audio/volume.ts` and `src/ui/wallpapers.ts` use, and for the same reason.
 *
 * ## The real price is NOT here, and must never be
 *
 * `app/paywall.tsx` renders `pkg.product.priceString`, which is the store's own
 * localised string for what the player will actually be charged. That stays
 * true. A hardcoded price is wrong the moment somebody opens the app in another
 * currency, and wrong in a way that looks like a lie rather than a bug.
 *
 * **The real price lives in the RevenueCat dashboard.** Setting the case pack to
 * $10 is a dashboard change, not a code change.
 *
 * ## What this file is, then
 *
 * The *reference* — the number with a line through it. It is not a former price,
 * because the pack has never sold at another one, and it is not a claim that the
 * cases can be bought separately, because they cannot. It is the pack's stated
 * per-case value: twelve cases, one unit of currency each.
 *
 * Derived rather than written as "$12" so it renders €12 for a euro price and
 * ¥12 for a yen one. A literal dollar sign beside a euro price is the exact
 * failure this file exists to avoid.
 */

/**
 * How many cases the pack unlocks.
 *
 * `pricing.test.ts` asserts this against the case content, so adding a
 * thirteenth paid case fails the suite rather than quietly leaving the paywall
 * advertising twelve.
 */
export const PAID_CASE_COUNT = 12;

/** What one case is worth, in whole units of whatever currency the store quotes. */
export const REFERENCE_PER_CASE = 1;

/**
 * The struck-through figure, formatted for the store's currency.
 *
 * Falls back to a bare number when `Intl` is unavailable or the currency code is
 * one it rejects. A missing currency symbol is a small blemish; a thrown
 * exception on the paywall is a lost sale, and this is decoration.
 */
export function referencePrice(currencyCode: string, locale?: string): string {
  const amount = PAID_CASE_COUNT * REFERENCE_PER_CASE;
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      // Whole units: the reference is a round number by construction, and
      // trailing zeroes make a comparison figure look like a real charge.
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return String(amount);
  }
}
