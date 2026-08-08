import { useCallback, useEffect, useState } from 'react';
import Purchases, { type CustomerInfo } from 'react-native-purchases';
import { configurePurchases, getActiveEntitlementIds } from './revenuecat';

export interface EntitlementsState {
  entitlementIds: string[];
  loading: boolean;
  error: string | null;
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

  const apply = useCallback((next: string[]) => {
    const sorted = [...next].sort();
    setEntitlementIds((prev) => (sameIds(prev, sorted) ? prev : sorted));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await configurePurchases();
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

    void (async () => {
      await refresh();
      if (!active) return;
      Purchases.addCustomerInfoUpdateListener(onUpdate);
    })();

    return () => {
      active = false;
      // Must pass the same reference that was registered — a fresh closure
      // here would silently fail to detach and leak a listener per mount.
      Purchases.removeCustomerInfoUpdateListener(onUpdate);
    };
  }, [refresh, apply]);

  return { entitlementIds, loading, error, refresh };
}
