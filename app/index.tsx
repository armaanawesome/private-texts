import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { theme } from '@/ui/theme';
import { useEntitlements } from '@/entitlements/useEntitlements';
import {
  getCasePackOffering,
  purchaseCasePack,
  restorePurchases,
} from '@/entitlements/revenuecat';

/**
 * TEMPORARY harness for Task 5, replaced by the real case-select screen in Task 14.
 * Its only job is to prove a Test Store purchase completes end to end on both
 * platforms before any UI work starts.
 */
export default function DebugPurchaseScreen() {
  const { entitlementIds, loading, error, refresh } = useEntitlements();
  const [log, setLog] = useState<string[]>([]);

  const say = (line: string) => setLog((l) => [...l, line]);

  async function handlePurchase() {
    try {
      say('Fetching current offering...');
      const offering = await getCasePackOffering();
      if (!offering) {
        say('No current offering. Check the "default" offering in the dashboard.');
        return;
      }
      const pkg = offering.availablePackages[0];
      if (!pkg) {
        say(`Offering "${offering.identifier}" has no packages.`);
        return;
      }
      say(`Purchasing ${pkg.product.identifier} (${pkg.product.priceString})...`);
      const ok = await purchaseCasePack(pkg);
      say(ok ? 'Entitlement active.' : 'Cancelled or not entitled.');
      await refresh();
    } catch (e) {
      say(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async function handleRestore() {
    try {
      const ids = await restorePurchases();
      say(`Restored: ${ids.length ? ids.join(', ') : 'nothing'}`);
      await refresh();
    } catch (e) {
      say(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text style={styles.title}>Task 5 · Test Store harness</Text>
      <Text style={styles.meta}>Platform: {Platform.OS}</Text>
      <Text style={styles.meta}>
        Entitlements:{' '}
        {loading ? 'loading...' : entitlementIds.length ? entitlementIds.join(', ') : 'none'}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Buy case pack</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonGhost]} onPress={handleRestore}>
        <Text style={styles.buttonText}>Restore purchases</Text>
      </Pressable>

      <View style={styles.log}>
        {log.map((line, i) => (
          <Text key={i} style={styles.logLine}>
            {line}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { padding: theme.space.lg, gap: theme.space.md, backgroundColor: theme.color.bg, flexGrow: 1 },
  title: { ...theme.type.title, color: theme.color.text },
  meta: { ...theme.type.meta, color: theme.color.textDim },
  error: { ...theme.type.meta, color: theme.color.danger },
  button: {
    backgroundColor: theme.color.bubbleYou,
    padding: theme.space.md,
    borderRadius: theme.radius.chip,
    alignItems: 'center',
  },
  buttonGhost: { backgroundColor: theme.color.surface },
  buttonText: { ...theme.type.body, color: theme.color.text },
  log: { marginTop: theme.space.lg, gap: theme.space.xs },
  logLine: { ...theme.type.meta, color: theme.color.textDim, fontFamily: 'monospace' },
});
