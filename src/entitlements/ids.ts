/**
 * Entitlement identifiers, matching the RevenueCat dashboard.
 *
 * Deliberately its own module with ZERO imports. Case content needs to name the
 * entitlement that gates it, but content must stay loadable in plain Node for
 * the test suite — importing it from revenuecat.ts would pull in
 * react-native-purchases and break the boundary the whole engine relies on.
 */
/**
 * MUST match the entitlement identifier in the RevenueCat dashboard exactly.
 *
 * It is `case_pack_1` — one digit, no leading zero. Confirmed against the
 * dashboard on 2026-08-11 after a real purchase unlocked nothing.
 *
 * This was `case_pack_01`, which is the worst kind of wrong: `purchase()` still
 * succeeds, the receipt is still valid, customer info comes back with an
 * entitlement this app then fails to recognise, and the player pays for nothing
 * with no error anywhere. Do not "tidy" this to match a case id or a product id
 * — `diagnoseEntitlements()` in revenuecat.ts is the thing that proves what the
 * dashboard actually grants.
 */
export const CASE_PACK_ENTITLEMENT = 'all_cases';

/**
 * Pack entitlements that are no longer sold but must still grant access.
 *
 * `case_pack_1` was the original, and its price could not be changed in the Test
 * Store — so a new product, offering and entitlement called `all_cases` was
 * created at $9.99 and the constant above moved to it.
 *
 * The old id stays honoured rather than being deleted, because deleting it would
 * silently revoke access from anybody who had already bought the pack. A player
 * who paid does not care which identifier was current on the day they paid, and
 * "we renamed a string" is not a reason to take twelve cases away.
 *
 * It is also the safety net for the offering being switched back in the
 * dashboard: whichever of the two is actually granted, the app recognises it.
 */
export const LEGACY_PACK_ENTITLEMENTS = ['case_pack_1'] as const;
