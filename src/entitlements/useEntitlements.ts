import { useCallback, useEffect, useState } from 'react';
import Purchases, { type CustomerInfo } from 'react-native-purchases';
import { configurePurchases, getActiveEntitlementIds, purchasesAreLive } from './revenuecat';

export interface EntitlementsState {
  entitlementIds: string[];
  loading: boolean;
  error: string | null;
  /**
   * Set when the store could not be switched on for this build — most often a
   * Test Store key in a release binary. The paywall shows this instead of a
   * dead "Buy" button, so the reason is visible in the app rather than only in
   * a native log the player cannot reach.
   */
  unavailableReason: string | null;
  refresh: () => Promise<void>;
}

/**
 * Replaces state only when the set of ids actually differs.
 *
 * RevenueCat hands back a fresh array on every poll and every listener fire.
 * Storing those verbatim gives `entitlementIds` a new identity on each update,
 * which makes it useless as a `useEffect` dependency — any effect keyed on it
 * re-runs forever. Keeping the old reference when nothing changed is what makes
 * it safe to depend on.
 */
function sameIds(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

export function useEntitlements(): EntitlementsState {
  const [entitlementIds, setEntitlementIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unavailableReason, setUnavailableReason] = useState<string | null>(null);

  const apply = useCallback((next: string[]) => {
    const sorted = [...next].sort();
    if (__DEV__) {
      // The entitlement id in the dashboard must match CASE_PACK_ENTITLEMENT
      // exactly, or a purchase succeeds and unlocks nothing. Printing what
      // RevenueCat actually reports turns that into a one-line diagnosis.
      console.log('[entitlements] active:', sorted.length ? sorted.join(', ') : '(none)');
    }
    setEntitlementIds((prev) => (sameIds(prev, sorted) ? prev : sorted));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const mode = await configurePurchases();
      setUnavailableReason(mode.kind === 'disabled' ? mode.reason : null);
      apply(await getActiveEntitlementIds());
    } catch (e) {
      // A store outage must not brick the app: the free case still has to open.
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [apply]);

  useEffect(() => {
    let active = true;

    /**
     * The listener — not the purchase call — is what flips gated UI. It also
     * catches changes this app never initiated: a renewal, a revocation, or a
     * restore performed on another device.
     */
    const onUpdate = (info: CustomerInfo) => {
      if (!active) return;
      apply(Object.keys(info.entitlements.active));
    };

    let listening = false;

    void (async () => {
      await refresh();
      if (!active) return;
      // Registering against an unconfigured SDK throws a native "singleton
      // instance not set" error, which would turn a build with purchases
      // switched off into a different crash than the one we just removed.
      if (!purchasesAreLive()) return;
      Purchases.addCustomerInfoUpdateListener(onUpdate);
      listening = true;
    })();

    return () => {
      active = false;
      // Must pass the same reference that was registered — a fresh closure
      // here would silently fail to detach and leak a listener per mount.
      if (listening) Purchases.removeCustomerInfoUpdateListener(onUpdate);
    };
  }, [refresh, apply]);

  return { entitlementIds, loading, error, unavailableReason, refresh };
}
