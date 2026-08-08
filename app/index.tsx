import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '@/ui/theme';
import { CASES } from '@content/cases';
import { useEntitlements } from '@/entitlements/useEntitlements';

export default function CaseSelectScreen() {
  const { entitlementIds, loading } = useEntitlements();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Private Texts</Text>
      <Text style={styles.sub}>
        Someone is dead. All you have is their messages. Find the statement that cannot be true.
      </Text>

      {CASES.map((c) => {
        const locked =
          c.requiredEntitlementId !== undefined && !entitlementIds.includes(c.requiredEntitlementId);
        return (
          <View key={c.id} style={styles.card}>
            <Text style={styles.caseTitle}>{c.title}</Text>
            <Text style={styles.blurb}>{c.blurb}</Text>
            {locked ? (
              <Link href="/paywall" asChild>
                <Pressable style={({ pressed }) => [styles.cta, pressed && styles.pressed]}>
                  <Text style={styles.ctaText}>{loading ? 'Checking...' : 'Unlock'}</Text>
                </Pressable>
              </Link>
            ) : (
              <Link href={`/case/${c.id}/threads`} asChild>
                <Pressable style={({ pressed }) => [styles.cta, pressed && styles.pressed]}>
                  <Text style={styles.ctaText}>Open</Text>
                </Pressable>
              </Link>
            )}
          </View>
        );
      })}

      <Link href="/debug" style={styles.debug}>
        Test Store harness
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.md },
  title: { ...theme.type.title, color: theme.color.text },
  sub: { ...theme.type.body, color: theme.color.textDim, marginBottom: theme.space.md },
  card: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
    gap: theme.space.sm,
  },
  caseTitle: { ...theme.type.body, color: theme.color.text, fontWeight: '600' },
  blurb: { ...theme.type.meta, color: theme.color.textDim },
  cta: {
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.bubbleYou,
    borderRadius: theme.radius.chip,
  },
  ctaText: { ...theme.type.body, color: theme.color.text },
  pressed: { opacity: 0.7 },
  debug: { ...theme.type.meta, color: theme.color.textDim, marginTop: theme.space.xl },
});
