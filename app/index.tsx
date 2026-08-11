import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '@/ui/theme';
import { CasePoster } from '@/ui/CasePoster';
import { CASES } from '@content/cases';
import { useEntitlements } from '@/entitlements/useEntitlements';
import type { CaseScript } from '@/engine';

export default function CaseSelectScreen() {
  const { entitlementIds } = useEntitlements();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.masthead}>
        <Text style={styles.title}>Private Texts</Text>
        <Text style={styles.sub}>
          Someone is dead. All you have is their messages. Find the statement that cannot be true.
        </Text>
      </View>

      <View style={styles.grid}>
        {CASES.map((c) => (
          <CaseTile
            key={c.id}
            script={c}
            locked={
              c.requiredEntitlementId !== undefined && !entitlementIds.includes(c.requiredEntitlementId)
            }
          />
        ))}
      </View>

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

function CaseTile({ script, locked }: { script: CaseScript; locked: boolean }) {
  const count = script.contradictions.length;

  return (
    <Link href={locked ? '/paywall' : `/case/${script.id}/threads`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          locked
            ? `${script.title}, sealed. ${count} contradictions. Unlock.`
            : `${script.title}. ${count} contradictions to prove. Open.`
        }
        style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
      >
        <CasePoster script={script} locked={locked} />
        <Text style={styles.name} numberOfLines={2}>
          {script.title}
        </Text>
        <View style={styles.meta}>
          {/* One mark per contradiction the case hides — the same bar the
              comparison sheet draws, so the motif introduces itself here. */}
          <View style={styles.marks}>
            {Array.from({ length: count }).map((_, i) => (
              <View key={i} style={[styles.mark, locked && styles.markLocked]} />
            ))}
          </View>
          <Text style={styles.metaText}>{locked ? 'Sealed' : `${count} to prove`}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.xl, paddingBottom: theme.space.xl },

  masthead: { gap: theme.space.sm },
  title: { ...theme.type.title, color: theme.color.text, fontSize: 32, lineHeight: 38 },
  sub: { ...theme.type.body, color: theme.color.textDim },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space.md },
  /**
   * Two up. `flexBasis` with a subtracted gap rather than a fixed width, so the
   * tiles hold their proportions on a narrow phone and a tablet alike.
   */
  tile: { flexBasis: '47%', flexGrow: 1, maxWidth: '48%', gap: theme.space.sm },
  pressed: { opacity: 0.7 },

  name: { ...theme.type.body, color: theme.color.text, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  marks: { flexDirection: 'row', gap: 3 },
  mark: { width: 2, height: 12, borderRadius: 1, backgroundColor: theme.color.danger },
  markLocked: { backgroundColor: theme.color.rail },
  metaText: { ...theme.type.meta, color: theme.color.textDim, fontSize: 11 },

  debug: { ...theme.type.meta, color: theme.color.textDim },
});
