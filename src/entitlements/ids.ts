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
export const CASE_PACK_ENTITLEMENT = 'case_pack_1';
