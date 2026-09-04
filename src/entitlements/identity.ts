/**
 * Who RevenueCat thinks the player is.
 *
 * Pure and import-free, for the reason every file in this folder is: it has to
 * be testable in the Node suite, and anything importing react-native-purchases
 * cannot be.
 *
 * ## The bug this exists to fix
 *
 * `configurePurchases()` never called `Purchases.logIn`, so RevenueCat only ever
 * saw an anonymous id — `$RCAnonymousID:` followed by a UUID it generates per
 * install. A purchase was therefore attached to **that install**, not to the
 * account. Sign in to the same account on a second phone and RevenueCat issues a
 * fresh anonymous id with no entitlements on it, so the cases they paid for are
 * simply not there, and nothing in the app can explain why: the receipt is valid,
 * the money moved, and the customer record it landed on belongs to a device
 * sitting in a drawer.
 *
 * Telling RevenueCat the Supabase user id makes the account the thing that owns
 * the purchase, which is what the player already believes is happening.
 *
 * ## The id is the Supabase user UUID, and never the email
 *
 * RevenueCat treats the id as an opaque string that is hard to change later, so
 * it must be stable and it must not be personal data. `user.id` is a UUID that
 * never changes for the life of the account; an email address fails both tests —
 * people change them, and it would put an address in a third party's customer
 * list for no reason.
 */

/** RevenueCat's own prefix for an id it generated rather than one we supplied. */
export const ANONYMOUS_ID_PREFIX = '$RCAnonymousID:';

export function isAnonymousId(id: string): boolean {
  return id.startsWith(ANONYMOUS_ID_PREFIX);
}

export type IdentityAction =
  /** Already correct. Do nothing — this is the common case, on every render. */
  | 'none'
  /** Signed in, and RevenueCat does not know it yet. */
  | 'identify'
  /** Signed out. Hand the SDK back to a fresh anonymous id. */
  | 'forget'
  /** A different account signed in. Must be logOut THEN logIn, never a second logIn. */
  | 'switch';

/**
 * What to do about a change in who is signed in.
 *
 * Written as a pure transition rather than a chain of ifs inside the effect,
 * because the switch case is the one that is easy to get wrong and impossible to
 * notice: calling `logIn` with a second id while the first is still active
 * **aliases the two accounts together** in RevenueCat, permanently. Two people
 * sharing a phone would end up sharing their purchases, and the alias cannot be
 * undone from the client.
 *
 * So a switch is a distinct outcome from an identify, and the caller is obliged
 * to sequence it.
 */
export function decideIdentityAction(previous: string | null, next: string | null): IdentityAction {
  if (previous === next) return 'none';
  if (next === null) return 'forget';
  if (previous === null) return 'identify';
  return 'switch';
}
