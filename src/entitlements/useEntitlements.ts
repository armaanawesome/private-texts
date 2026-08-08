import { useCallback, useEffect, useState } from 'react';
import { configurePurchases, getActiveEntitlementIds } from './revenuecat';

export interface EntitlementsState {
  entitlementIds: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useEntitlements(): EntitlementsState {
  const [entitlementIds, setEntitlementIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await configurePurchases();
      setEntitlementIds(await getActiveEntitlementIds());
    } catch (e) {
      // A store outage must not brick the app: the free case still has to open.
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { entitlementIds, loading, error, refresh };
}
