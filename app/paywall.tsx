import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import type { PurchasesPackage } from 'react-native-purchases';
import { theme } from '@/ui/theme';
import { useEntitlements } from '@/entitlements/useEntitlements';
import {
  CASE_PACK_ENTITLEMENT,
  getCasePackOffering,
  purchaseCasePack,
  restorePurchases,
} from '@/entitlements/revenuecat';

type Phase =
  | { kind: 'loading' }
  | { kind: 'ready'; pkg: PurchasesPackage }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'failed'; pkg: PurchasesPackage; reason: string };

/**
 * A deliberately custom paywall rather than RevenueCatUI.
 *
 * RevenueCatUI renders a dashboard-templated layout, which would be the one
 * screen in this app that looks like a game store — breaking the premise that
 * you are reading a real phone. The purchase flow underneath is the hardened
 * one from src/entitlements, so we lose nothing but the stock chrome.
 */
export default function PaywallScreen() {
  const router = useRouter();
  const { entitlementIds } = useEntitlements();
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setPhase({ kind: 'loading' });
    try {
      const offering = await getCasePackOffering();
      const pkg = offering?.availablePackages[0];
      if (!pkg) {
        setPhase({
          kind: 'unavailable',
          reason: 'The store has nothing to sell right now. Try again in a moment.',
        });
        return;
      }
      setPhase({ kind: 'ready', pkg });
    } catch (e) {
      setPhase({
        kind: 'unavailable',
        reason: e instanceof Error ? e.message : 'Could not reach the store.',
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // The listener in useEntitlements is the source of truth, not the purchase
  // call — so this closes the paywall whether the unlock came from a purchase,
  // a restore, or a renewal that happened elsewhere.
  useEffect(() => {
    if (entitlementIds.includes(CASE_PACK_ENTITLEMENT)) router.back();
  }, [entitlementIds, router]);

  async function buy(pkg: PurchasesPackage) {
    if (busy) return;
    setBusy(true);
    const outcome = await purchaseCasePack(pkg);
    setBusy(false);
    if (outcome.kind === 'failed') {
      setPhase({
        kind: 'failed',
        pkg,
        reason:
          (outcome.error as { message?: string })?.message ??
          'The purchase did not go through. You have not been charged.',
      });
    }
    // 'cancelled' is not an error. Say nothing and leave the paywall open.
  }

  async function restore() {
    if (busy) return;
    setBusy(true);
    try {
      await restorePurchases();
    } finally {
      setBusy(false);
    }
  }

  const pkg = phase.kind === 'ready' || phase.kind === 'failed' ? phase.pkg : null;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: '', presentation: 'modal' }} />

      <Text style={styles.kicker}>CASE FILE — SEALED</Text>
      <Text style={styles.title}>More cases</Text>
      <Text style={styles.body}>
        Another death, another phone, another story that does not hold up. Unlock the case pack to
        keep going.
      </Text>

      <View style={styles.list}>
        <Text style={styles.bullet}>· A second full-length case</Text>
        <Text style={styles.bullet}>· New suspects, new contradictions</Text>
        <Text style={styles.bullet}>· Yours permanently — this is not a subscription</Text>
      </View>

      {phase.kind === 'loading' ? (
        <ActivityIndicator color={theme.color.accent} style={styles.spinner} />
      ) : null}

      {phase.kind === 'unavailable' ? (
        <View style={styles.problem}>
          <Text style={styles.problemText}>{phase.reason}</Text>
          <Pressable onPress={load} style={styles.retry} accessibilityRole="button">
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : null}

      {phase.kind === 'failed' ? (
        <View style={styles.problem}>
          <Text style={styles.problemText}>{phase.reason}</Text>
        </View>
      ) : null}

      {pkg ? (
        <Pressable
          onPress={() => buy(pkg)}
          disabled={busy}
          accessibilityRole="button"
          accessibilityState={{ disabled: busy }}
          accessibilityLabel={`Unlock the case pack for ${pkg.product.priceString}`}
          style={({ pressed }) => [styles.cta, busy && styles.ctaBusy, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>
            {/* Always the localised store price. Never a hardcoded one. */}
            {busy ? 'Working…' : `Unlock · ${pkg.product.priceString}`}
          </Text>
        </Pressable>
      ) : null}

      <Pressable onPress={restore} disabled={busy} accessibilityRole="button" hitSlop={theme.hit.slop}>
        <Text style={styles.restore}>Restore purchases</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} accessibilityRole="button" hitSlop={theme.hit.slop}>
        <Text style={styles.notNow}>Not now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.md, flexGrow: 1, justifyContent: 'center' },
  kicker: { ...theme.type.claim, color: theme.color.accent, letterSpacing: 1.5 },
  title: { ...theme.type.title, color: theme.color.text },
  body: { ...theme.type.body, color: theme.color.textDim },
  list: { gap: theme.space.xs, marginVertical: theme.space.sm },
  bullet: { ...theme.type.body, color: theme.color.text },
  spinner: { marginVertical: theme.space.lg },
  problem: {
    backgroundColor: theme.color.surface,
    borderLeftWidth: 2,
    borderLeftColor: theme.color.danger,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
    gap: theme.space.sm,
  },
  problemText: { ...theme.type.body, color: theme.color.dangerText },
  retry: { minHeight: theme.hit.min, justifyContent: 'center' },
  retryText: { ...theme.type.body, color: theme.color.text, textDecorationLine: 'underline' },
  cta: {
    minHeight: theme.hit.min + 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
    marginTop: theme.space.sm,
  },
  ctaBusy: { opacity: 0.5 },
  ctaText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
  pressed: { opacity: 0.7 },
  restore: {
    ...theme.type.meta,
    color: theme.color.textDim,
    textAlign: 'center',
    paddingVertical: theme.space.md,
  },
  notNow: { ...theme.type.meta, color: theme.color.textDim, textAlign: 'center' },
});
