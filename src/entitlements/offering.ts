/**
 * Which package sells what, and what to say when a purchase does not complete.
 *
 * Pure — its only imports are the other pure modules in this folder — so the
 * whole of it is covered by the Node suite. Same split as `pricing.ts` and
 * `access.ts`, and for the same reason: anything importing
 * react-native-purchases cannot be tested at all here, and the two decisions
 * below are exactly the ones that must not be got wrong by inspection.
 *
 * ## Why matching is exact, and why that is a safety property
 *
 * The paywall now sells two different things at two different prices from the
 * same offering. Picking the wrong package does not fail loudly: it charges the
 * player for one thing while the screen says another, which is the same class of
 * silent fault `ids.ts` was written about, with money attached.
 *
 * So a package is the single-case option ONLY if an identifier on it is exactly
 * `single_case_<case id>`, and the bundle only if one is exactly the pack
 * entitlement. Both the package identifier and the product identifier are
 * checked because RevenueCat lets those differ, and which one carries the
 * meaningful string is a dashboard decision this code should not depend on.
 *
 * **What the dashboard must therefore declare**, per case sold on its own:
 * a product `single_case_the_wake`, an entitlement of the same name, both
 * attached to the current offering. `access.ts` grants the case on that
 * entitlement, and nothing here can conjure it if it is absent — which is the
 * point of the null return.
 */
import { CASE_PACK_ENTITLEMENT } from './ids';
import { SINGLE_CASE_PREFIX, singleCaseEntitlement } from './access';
import type { StringKey } from '@/i18n/strings';

/**
 * The part of `PurchasesPackage` this file reads.
 *
 * Structural rather than the SDK type, so the tests can build one in Node. The
 * screen passes real packages straight in — `chooseOptions` is generic and
 * returns the caller's own objects, never a copy, so nothing is lost on the way
 * to `purchasePackage()`.
 */
export interface PackageLike {
  readonly identifier: string;
  readonly product: {
    readonly identifier: string;
    readonly priceString: string;
    readonly currencyCode: string;
  };
}

export interface PurchaseOptions<P> {
  /** This one case, on its own. Null when the dashboard sells no such product. */
  readonly single: P | null;
  /** Every paid case. Null only if the offering is empty. */
  readonly bundle: P | null;
}

function identifiersOf(pkg: PackageLike): readonly string[] {
  return [pkg.product.identifier, pkg.identifier];
}

function isSingleCasePackage(pkg: PackageLike): boolean {
  return identifiersOf(pkg).some((id) => id.startsWith(SINGLE_CASE_PREFIX));
}

/**
 * The two things a locked case can be bought as.
 *
 * `single` has no fallback on purpose. A player who taps "unlock this case" and
 * is charged for the pack has been overcharged by ten times, so absence has to
 * mean absence — the screen then draws one option instead of two, and there is
 * never a button that takes money for something other than its label.
 *
 * `bundle` does fall back, to any package that is not somebody's single case.
 * The asymmetry is deliberate: renaming the pack product in the dashboard is a
 * thing that will happen (it already has, `case_pack_1` to `all_cases`), and the
 * cost of the fallback being wrong is selling the pack under a different name,
 * not selling the wrong thing.
 */
export function chooseOptions<P extends PackageLike>(
  packages: readonly P[],
  caseId: string | undefined,
): PurchaseOptions<P> {
  const wanted = caseId === undefined ? null : singleCaseEntitlement(caseId);
  const single =
    wanted === null ? null : (packages.find((p) => identifiersOf(p).includes(wanted)) ?? null);
  const named = packages.find((p) => identifiersOf(p).includes(CASE_PACK_ENTITLEMENT));
  const bundle = named ?? packages.find((p) => !isSingleCasePackage(p)) ?? null;
  return { single, bundle };
}

/**
 * Why a purchase did not complete, in terms the player can act on.
 *
 * Not decoration. "Something went wrong" on a phone with no signal sends
 * somebody to check their card details; "already purchased" is not an error at
 * all but an instruction to restore. RevenueCat hands back a numbered code for
 * every one of these and the numbers are stable, so the classification is a
 * lookup rather than string matching on a message that changes with the OS
 * language.
 */
export type PurchaseFailure =
  /** Backed out of the store sheet. Not an error; say nothing. */
  | 'cancelled'
  /** No route to the store — flight mode, dead wifi, a network that blocks it. */
  | 'offline'
  /** The store refused the payment. */
  | 'declined'
  /** They already own it. The repair is a restore, not a second charge. */
  | 'alreadyOwned'
  /** Approval pending — parental consent, or a bank confirmation. */
  | 'pending'
  /** A purchase is already open. Almost always a double tap. */
  | 'inProgress'
  /** The product is not for sale here. A dashboard problem, not the player's. */
  | 'unavailable'
  /** The store itself is unwell. Worth retrying. */
  | 'store'
  | 'unknown';

/**
 * RevenueCat's own numbering, from
 * `@revenuecat/purchases-typescript-internal/generated/error-codes`. Kept as
 * strings because that is what the enum is; the read below coerces, since the
 * native bridge has been known to hand a number across.
 */
const BY_CODE: Readonly<Record<string, PurchaseFailure>> = {
  '1': 'cancelled', // PURCHASE_CANCELLED_ERROR
  '2': 'store', // STORE_PROBLEM_ERROR
  '3': 'declined', // PURCHASE_NOT_ALLOWED_ERROR
  '4': 'declined', // PURCHASE_INVALID_ERROR
  '5': 'unavailable', // PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR
  '6': 'alreadyOwned', // PRODUCT_ALREADY_PURCHASED_ERROR
  '7': 'alreadyOwned', // RECEIPT_ALREADY_IN_USE_ERROR
  '10': 'offline', // NETWORK_ERROR
  '15': 'inProgress', // OPERATION_ALREADY_IN_PROGRESS_ERROR
  '20': 'pending', // PAYMENT_PENDING_ERROR
  '32': 'store', // PRODUCT_REQUEST_TIMED_OUT_ERROR
  '33': 'offline', // API_ENDPOINT_BLOCKED - a filter or VPN, which reads as no connection
  '35': 'offline', // OFFLINE_CONNECTION_ERROR
};

export function classifyPurchaseFailure(error: unknown): PurchaseFailure {
  if (typeof error !== 'object' || error === null) return 'unknown';
  const e = error as { userCancelled?: unknown; code?: unknown };
  // Checked before the code, because this is the one flag the SDK guarantees on
  // both platforms for the outcome that must never be shown as a fault.
  if (e.userCancelled === true) return 'cancelled';
  if (e.code === undefined || e.code === null) return 'unknown';
  return BY_CODE[String(e.code)] ?? 'unknown';
}

/**
 * The sentence for each outcome.
 *
 * A map rather than a built-up template, so every value is a real `StringKey` —
 * and `offering.test.ts` checks each one resolves in the English catalogue,
 * which is what stops a new failure kind shipping as a blank line on the
 * paywall.
 */
export const FAILURE_MESSAGE_KEY: Readonly<Record<PurchaseFailure, StringKey>> = {
  cancelled: 'paywall.error.cancelled',
  offline: 'paywall.error.offline',
  declined: 'paywall.error.declined',
  alreadyOwned: 'paywall.error.alreadyOwned',
  pending: 'paywall.error.pending',
  inProgress: 'paywall.error.inProgress',
  unavailable: 'paywall.error.unavailable',
  store: 'paywall.error.store',
  unknown: 'paywall.error.unknown',
};
