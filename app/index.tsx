import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '@/ui/theme';
import { CASES } from '@content/cases';
import { useEntitlements } from '@/entitlements/useEntitlements';
import type { CaseScript } from '@/engine';

export default function CaseSelectScreen() {
  const { entitlementIds, loading } = useEntitlements();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.masthead}>
        <Text style={styles.title}>Private Texts</Text>
        <Text style={styles.sub}>
          Someone is dead. All you have is their messages. Find the statement that cannot be true.
        </Text>
      </View>

      {CASES.map((c) => (
        <CaseRow
          key={c.id}
          script={c}
          locked={c.requiredEntitlementId !== undefined && !entitlementIds.includes(c.requiredEntitlementId)}
          checking={loading}
        />
      ))}

      {/* Dev-only. A "Test Store harness" link on the first screen is workshop
          debris, and this is the screen a judge opens first. */}
      {__DEV__ ? (
        <Link href="/debug" style={styles.debug}>
          Test Store harness
        </Link>
      ) : null}
    </ScrollView>
  );
}

function CaseRow({
  script,
  locked,
  checking,
}: {
  script: CaseScript;
  locked: boolean;
  checking: boolean;
}) {
  const count = script.contradictions.length;

  return (
    <View style={styles.case}>
      <View style={styles.caseHead}>
        <Text style={styles.caseTitle}>{script.title}</Text>
        {locked ? <Text style={styles.sealed}>sealed</Text> : null}
      </View>

      <Text style={styles.blurb}>{script.blurb}</Text>

      <View style={styles.meta}>
        {/* One mark per contradiction the case hides — the same bar the
            comparison sheet draws, so the motif introduces itself here. */}
        <View style={styles.marks}>
          {Array.from({ length: count }).map((_, i) => (
            <View key={i} style={[styles.mark, locked && styles.markLocked]} />
          ))}
        </View>
        <Text style={styles.metaText}>
          {count === 1 ? '1 contradiction to prove' : `${count} contradictions to prove`}
        </Text>
      </View>

      <Link href={locked ? '/paywall' : `/case/${script.id}/threads`} asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={locked ? `Unlock ${script.title}` : `Open ${script.title}`}
          style={({ pressed }) => [
            styles.cta,
            locked && styles.ctaLocked,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.ctaText, locked && styles.ctaTextLocked]}>
            {locked ? (checking ? 'Checking…' : 'Unlock') : 'Open'}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.xl, paddingBottom: theme.space.xl },

  masthead: { gap: theme.space.sm },
  title: { ...theme.type.title, color: theme.color.text, fontSize: 32, lineHeight: 38 },
  sub: { ...theme.type.body, color: theme.color.textDim },

  /** A block on a rule, not a floating card. Cards would make this a menu. */
  case: {
    gap: theme.space.sm,
    borderTopWidth: 1,
    borderTopColor: theme.color.rule,
    paddingTop: theme.space.md,
  },
  caseHead: { flexDirection: 'row', alignItems: 'baseline', gap: theme.space.sm },
  caseTitle: { ...theme.type.title, color: theme.color.text, flexShrink: 1 },
  sealed: { ...theme.type.claim, fontSize: 11, color: theme.color.accent },
  blurb: { ...theme.type.body, color: theme.color.textDim },

  meta: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  marks: { flexDirection: 'row', gap: 3 },
  mark: { width: 3, height: 14, borderRadius: 1.5, backgroundColor: theme.color.danger },
  markLocked: { backgroundColor: theme.color.rail },
  metaText: { ...theme.type.meta, color: theme.color.textDim },

  cta: {
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.chip,
    backgroundColor: theme.color.accent,
    marginTop: theme.space.xs,
  },
  ctaLocked: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.color.rule },
  ctaText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
  ctaTextLocked: { color: theme.color.text },
  pressed: { opacity: 0.7 },

  debug: { ...theme.type.meta, color: theme.color.textDim, marginTop: theme.space.lg },
});
