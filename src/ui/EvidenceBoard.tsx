import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import { ClaimChip } from './ClaimChip';
import { ClaimTimeline } from './ClaimTimeline';
import { ContradictionResult } from './ContradictionResult';
import { describePredicate, attributionFor } from './claimText';
import { useCaseStore } from '@/state/caseStore';
import { saveProgress } from '@/state/persistence';
import { availableClaims, type Claim, type CaseScript } from '@/engine';

export function EvidenceBoard() {
  const reduceMotion = useReducedMotion();
  const script = useCaseStore((s) => s.script);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const pinnedClaimIds = useCaseStore((s) => s.pinnedClaimIds);
  const comparedIds = useCaseStore((s) => s.lastComparedClaimIds);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const lastVerdict = useCaseStore((s) => s.lastVerdict);
  const lastConfirmedId = useCaseStore((s) => s.lastConfirmedId);
  const togglePin = useCaseStore((s) => s.togglePin);
  const submitPins = useCaseStore((s) => s.submitPins);

  if (!script) return null;

  const claims = availableClaims(script, readMessageIds);
  const byId = new Map(claims.map((c) => [c.id, c]));

  // Proving a contradiction clears the pins, so fall back to the pair the last
  // check actually ran on. Without that the sheet blanks at the moment of the win.
  const shown = lastVerdict && comparedIds.length === 2 ? comparedIds : pinnedClaimIds;
  const a = byId.get(shown[0] ?? '') ?? null;
  const b = byId.get(shown[1] ?? '') ?? null;

  const matched = script.contradictions.find((c) => c.id === lastConfirmedId);
  const canCompare = pinnedClaimIds.length === 2;
  const proven = script.contradictions.filter((c) => confirmedIds.includes(c.id));

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Sheet script={script} a={a} b={b} lit={lastVerdict?.ok === true} reduceMotion={reduceMotion} />

      <ContradictionResult
        verdict={lastVerdict}
        revelation={matched?.revelation}
        reduceMotion={reduceMotion}
      />

      <Pressable
        disabled={!canCompare}
        onPress={() => {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          submitPins();
          // Persist after the verdict resolves: a proven contradiction unlocks
          // threads, and losing that to a force-quit would be brutal.
          void saveProgress(script.id);
        }}
        accessibilityRole="button"
        accessibilityLabel="Run the check on the two pinned statements"
        accessibilityState={{ disabled: !canCompare }}
        style={({ pressed }) => [
          styles.compare,
          !canCompare && styles.compareOff,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.compareText, !canCompare && styles.compareTextOff]}>Run the check</Text>
      </Pressable>

      <SectionHead label="On the record" count={claims.length} />
      {claims.length === 0 ? (
        <Text style={styles.empty}>
          Nothing yet. Read the threads, and hold a message to write down what it claims.
        </Text>
      ) : (
        <View style={styles.list}>
          {claims.map((c) => {
            const at = pinnedClaimIds.indexOf(c.id);
            return (
              <ClaimChip
                key={c.id}
                claim={c}
                pinned={at !== -1}
                slot={at === 0 ? 1 : at === 1 ? 2 : undefined}
                onPress={() => togglePin(c.id)}
              />
            );
          })}
        </View>
      )}

      {proven.length > 0 ? (
        <>
          <SectionHead label="Proven" count={proven.length} />
          <View style={styles.list}>
            {proven.map((c) => (
              <View key={c.id} style={styles.proof}>
                <View style={styles.proofMark} />
                <Text style={styles.proofText}>{c.revelation}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

/**
 * The instrument. It is on screen whether or not anything is loaded into it,
 * because a tool that appears only once you have used it correctly cannot teach
 * you what it is for.
 */
function Sheet({
  script,
  a,
  b,
  lit,
  reduceMotion,
}: {
  script: CaseScript;
  a: Claim | null;
  b: Claim | null;
  lit: boolean;
  reduceMotion: boolean;
}) {
  if (!a || !b) {
    return (
      <View style={styles.waiting}>
        <View style={styles.axis}>
          <View style={styles.axisRule} />
        </View>
        <View style={styles.emptyRail} />
        <View style={styles.emptyRail} />
        <Text style={styles.waitingText}>
          {a ? 'One statement loaded. Pin a second to compare them.' : 'Pin two statements to compare them.'}
        </Text>
      </View>
    );
  }

  const name = (id: string) => script.characters.find((c) => c.id === id)?.name ?? id;
  const claimOf = (c: Claim) => ({
    what: describePredicate(script, c),
    who: attributionFor(script, c),
    window: c.window,
  });

  return (
    <ClaimTimeline
      subjectName={a.subject === b.subject ? name(a.subject) : `${name(a.subject)} · ${name(b.subject)}`}
      a={claimOf(a)}
      b={claimOf(b)}
      conflict={lit}
      reduceMotion={reduceMotion}
    />
  );
}

function SectionHead({ label, count }: { label: string; count: number }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.section}>{label}</Text>
      <View style={styles.sectionRule} />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.md, gap: theme.space.lg, paddingBottom: theme.space.xl },

  waiting: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
    gap: theme.space.md,
  },
  axis: { flexDirection: 'row', alignItems: 'center' },
  axisRule: { flex: 1, height: 1, backgroundColor: theme.color.rule },
  emptyRail: { height: 10, borderRadius: 5, backgroundColor: theme.color.rail },
  waitingText: { ...theme.type.meta, color: theme.color.textDim },

  compare: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
  },
  compareOff: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.color.rule },
  compareText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
  compareTextOff: { color: theme.color.textDim },
  pressed: { opacity: 0.7 },

  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  section: { ...theme.type.sender, color: theme.color.textDim },
  sectionRule: { flex: 1, height: 1, backgroundColor: theme.color.rule },
  count: { ...theme.type.claim, fontSize: 12, color: theme.color.textDim },

  empty: { ...theme.type.body, color: theme.color.textDim },
  list: { gap: theme.space.sm },
  proof: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space.sm,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  /** A hairline mark, not a 2px colour bar down the side of the card. */
  proofMark: { width: 14, height: 1, backgroundColor: theme.color.danger, marginTop: 10 },
  proofText: { ...theme.type.body, color: theme.color.text, flexShrink: 1 },
});
