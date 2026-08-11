import Purchases, {
  LOG_LEVEL,
  type PurchasesOffering,
  type PurchasesPackage,
} from 'react-native-purchases';

export { CASE_PACK_ENTITLEMENT } from './ids';
import { CASE_PACK_ENTITLEMENT } from './ids';
import { decidePurchasesMode, type PurchasesMode } from './keyPolicy';
import {
  explainEntitlementGap,
  type EntitlementEvidence,
  type EntitlementVerdict,
} from './diagnosis';

export type { PurchasesMode };

/**
 * Null until the first configure attempt, then sticky.
 *
 * The RevenueCat Test Store issues ONE key that works on both iOS and Android,
 * which is what lets this project run real purchase flows with no paid Apple or
 * Google developer account — the reason the Next Gen award is reachable at all.
 */
let mode: PurchasesMode | null = null;

/**
 * Configures the SDK, or decides not to.
 *
 * Never throws on a key problem. `decidePurchasesMode` is what stops a Test
 * Store key reaching configure() in a release build, where the SDK would put up
 * a "Wrong API Key" alert and terminate the process on the splash screen.
 * See keyPolicy.ts for why that guard has to live outside the SDK.
 */
export async function configurePurchases(): Promise<PurchasesMode> {
  if (mode) return mode;

  const decided = decidePurchasesMode({
    key: process.env.EXPO_PUBLIC_RC_TEST_STORE_KEY,
    isDev: __DEV__,
  });

  if (decided.kind === 'disabled') {
    console.warn('[RevenueCat] purchases disabled —', decided.reason);
    mode = decided;
    return mode;
  }

  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR);
  await Purchases.configure({ apiKey: decided.apiKey });
  mode = decided;
  return mode;
}

/**
 * Whether the native SDK has actually been configured.
 *
 * Every call below is guarded by this. Calling into react-native-purchases
 * before configure() throws a native "singleton instance not set" error, so a
 * disabled build would trade one crash for another without these guards.
 */
export function purchasesAreLive(): boolean {
  return mode?.kind === 'live';
}

export async function getCasePackOffering(): Promise<PurchasesOffering | null> {
  if (!purchasesAreLive()) return null;
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export type PurchaseOutcome =
  | { kind: 'purchased' }
  | { kind: 'cancelled' }
  | { kind: 'failed'; error: unknown };

/**
 * Deliberately does NOT unlock content or return an entitlement boolean.
 *
 * A boolean would conflate "user cancelled" with "purchase failed" with "bought
 * but not entitled" — three outcomes that need different UI. And unlocking here
 * would create a second source of truth alongside the restore path; instead the
 * CustomerInfo listener in useEntitlements flips gated UI, so purchase and
 * restore converge on one path.
 */
export async function purchaseCasePack(pkg: PurchasesPackage): Promise<PurchaseOutcome> {
  if (!purchasesAreLive()) {
    const why = mode?.kind === 'disabled' ? mode.reason : 'Purchases are not available.';
    return { kind: 'failed', error: new Error(why) };
  }
  try {
    await Purchases.purchasePackage(pkg);
    return { kind: 'purchased' };
  } catch (e) {
    // Backing out of the store sheet is a normal outcome, not an error to surface.
    if (typeof e === 'object' && e !== null && 'userCancelled' in e && e.userCancelled === true) {
      return { kind: 'cancelled' };
    }
    return { kind: 'failed', error: e };
  }
}

export async function restorePurchases(): Promise<string[]> {
  if (!purchasesAreLive()) return [];
  const customerInfo = await Purchases.restorePurchases();
  return Object.keys(customerInfo.entitlements.active);
}

export async function getActiveEntitlementIds(): Promise<string[]> {
  if (!purchasesAreLive()) return [];
  const customerInfo = await Purchases.getCustomerInfo();
  return Object.keys(customerInfo.entitlements.active);
}

/**
 * Why the case is still locked after a purchase that appeared to work.
 *
 * Reads the whole customer record — inactive entitlements and purchased product
 * ids included — because the useful signal is in what is *missing*. See
 * diagnosis.ts for how the evidence becomes a verdict.
 */
export async function diagnoseEntitlements(): Promise<EntitlementEvidence & EntitlementVerdict> {
  if (!purchasesAreLive()) {
    const why = mode?.kind === 'disabled' ? mode.reason : 'Purchases are not configured.';
    const evidence: EntitlementEvidence = {
      expected: CASE_PACK_ENTITLEMENT,
      activeIds: [],
      allIds: [],
      purchasedProductIds: [],
    };
    return { ...evidence, ok: false, fix: why };
  }

  const info = await Purchases.getCustomerInfo();
  const evidence: EntitlementEvidence = {
    expected: CASE_PACK_ENTITLEMENT,
    activeIds: Object.keys(info.entitlements.active),
    allIds: Object.keys(info.entitlements.all),
    purchasedProductIds: info.allPurchasedProductIdentifiers,
  };
  return { ...evidence, ...explainEntitlementGap(evidence) };
}
