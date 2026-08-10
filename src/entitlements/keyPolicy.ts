/**
 * Decides whether the RevenueCat SDK may be configured at all.
 *
 * Pure and free of react-native imports so it can be unit-tested in the Node
 * suite — the same reason `ids.ts` exists separately from `revenuecat.ts`.
 */

export type PurchasesMode =
  | { kind: 'live'; apiKey: string }
  | { kind: 'disabled'; reason: string };

/** A Test Store key. Real store keys are `appl_` (Apple) or `goog_` (Google). */
const TEST_STORE_PREFIX = 'test_';

/**
 * The single rule that keeps the app launchable.
 *
 * The native SDK does not merely warn about a `test_` key in a Release build —
 * it puts up a "Wrong API Key" alert and terminates the process inside
 * configure(). There is no flag to override it; it is a deliberate guard so test
 * purchases cannot leak into a shipped app.
 *
 * So the decision has to happen here, before the SDK is handed anything. When
 * the key on hand cannot legally run in this build we return `disabled` and
 * never call configure(). The app then launches and plays with the store
 * switched off, which is strictly better than an app that closes on the splash
 * screen — the exact failure that made four builds untestable.
 */
export function decidePurchasesMode(input: {
  key: string | undefined;
  isDev: boolean;
}): PurchasesMode {
  const apiKey = input.key?.trim() ?? '';

  if (apiKey === '') {
    return {
      kind: 'disabled',
      reason:
        'No RevenueCat key is set. Add EXPO_PUBLIC_RC_TEST_STORE_KEY to .env for local runs, ' +
        'or register it as an EAS environment variable for cloud builds.',
    };
  }

  if (!input.isDev && apiKey.startsWith(TEST_STORE_PREFIX)) {
    return {
      kind: 'disabled',
      reason:
        'A Test Store key cannot run in a release build — the SDK closes the app on launch. ' +
        'This build therefore runs with purchases turned off. To demo a purchase, build the ' +
        'Debug "development" profile and connect Metro.',
    };
  }

  return { kind: 'live', apiKey };
}
