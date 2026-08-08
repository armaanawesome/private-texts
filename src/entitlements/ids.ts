/**
 * Entitlement identifiers, matching the RevenueCat dashboard.
 *
 * Deliberately its own module with ZERO imports. Case content needs to name the
 * entitlement that gates it, but content must stay loadable in plain Node for
 * the test suite — importing it from revenuecat.ts would pull in
 * react-native-purchases and break the boundary the whole engine relies on.
 */
export const CASE_PACK_ENTITLEMENT = 'case_pack_01';
