import Purchases, {
  LOG_LEVEL,
  type PurchasesOffering,
  type PurchasesPackage,
} from 'react-native-purchases';

export { CASE_PACK_ENTITLEMENT } from './ids';
import { CASE_PACK_ENTITLEMENT } from './ids';

let configured = false;

/**
 * Resolves the API key.
 *
 * The RevenueCat Test Store issues ONE key that works on both iOS and Android,
 * which is what lets this project run real purchase flows with no paid Apple or
 * Google developer account — the reason the Next Gen award is reachable at all.
 *
 * A production build would branch here on Platform.OS and return separate Apple
 * and Google keys. Never ship a `test_` key to a real store listing.
 */
function resolveApiKey(): string {
  const key = process.env.EXPO_PUBLIC_RC_TEST_STORE_KEY;
  if (!key) {
    throw new Error(
      'EXPO_PUBLIC_RC_TEST_STORE_KEY is not set. Copy .env.example to .env and add ' +
        'your RevenueCat Test Store key (app.revenuecat.com -> Apps and providers -> Test Store).',
    );
  }

  // The SDK refuses a test_ key in a Release build: it shows a "Wrong API Key"
  // alert and terminates the app at configure() time. Nothing here can override
  // that, so surface the actual fix in the logs before the SDK kills us.
  if (!__DEV__ && key.startsWith('test_')) {
    console.error(
      '[RevenueCat] A Test Store key cannot run in a Release build — the SDK will ' +
        'close the app. Build with the "demo" EAS profile (Debug configuration):\n' +
        '  eas build --profile demo --platform ios',
    );
  }
  return key;
}

export async function configurePurchases(): Promise<void> {
  if (configured) return;
  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR);
  await Purchases.configure({ apiKey: resolveApiKey() });
  configured = true;
}

export async function getCasePackOffering(): Promise<PurchasesOffering | null> {
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
  const customerInfo = await Purchases.restorePurchases();
  return Object.keys(customerInfo.entitlements.active);
}

export async function getActiveEntitlementIds(): Promise<string[]> {
  const customerInfo = await Purchases.getCustomerInfo();
  return Object.keys(customerInfo.entitlements.active);
}
