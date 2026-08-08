import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import { PinSlot } from './PinSlot';
import { ClaimChip } from './ClaimChip';
import { ContradictionResult } from './ContradictionResult';
import { useCaseStore } from '@/state/caseStore';
import { availableClaims, type Claim } from '@/engine';

export function EvidenceBoard() {
  const reduceMotion = useReducedMotion();
  const script = useCaseStore((s) => s.script);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const pinnedClaimIds = useCaseStore((s) => s.pinnedClaimIds);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const lastVerdict = useCaseStore((s) => s.lastVerdict);
  const lastConfirmedId = useCaseStore((s) => s.lastConfirmedId);
  const togglePin = useCaseStore((s) => s.togglePin);
  const submitPins = useCaseStore((s) => s.submitPins);

  if (!script) return null;

  const claims = availableClaims(script, readMessageIds);
  const byId = new Map(claims.map((c) => [c.id, c]));
  const pinned: (Claim | null)[] = [
    byId.get(pinnedClaimIds[0] ?? '') ?? null,
    byId.get(pinnedClaimIds[1] ?? '') ?? null,
  ];

  const matched = script.contradictions.find((c) => c.id === lastConfirmedId);

  const canCompare = pinnedClaimIds.length === 2;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.slots}>
        <PinSlot claim={pinned[0] ?? null} ordinal={1} reduceMotion={reduceMotion} />
        <PinSlot claim={pinned[1] ?? null} ordinal={2} reduceMotion={reduceMotion} />
      </View>

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
        }}
        accessibilityRole="button"
        accessibilityLabel="Compare the two pinned statements"
        accessibilityState={{ disabled: !canCompare }}
        style={({ pressed }) => [
          styles.compare,
          !canCompare && styles.compareOff,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.compareText, !canCompare && styles.compareTextOff]}>COMPARE</Text>
      </Pressable>

      <Text style={styles.section}>
        On the record ({claims.length})
      </Text>
      {claims.length === 0 ? (
        <Text style={styles.empty}>
          Nothing yet. Read the threads, and hold a message to write down what it claims.
        </Text>
      ) : (
        <View style={styles.list}>
          {claims.map((c) => (
            <ClaimChip
              key={c.id}
              claim={c}
              pinned={pinnedClaimIds.includes(c.id)}
              onPress={() => togglePin(c.id)}
            />
          ))}
        </View>
      )}

      {confirmedIds.length > 0 ? (
        <>
          <Text style={styles.section}>Proven ({confirmedIds.length})</Text>
          <View style={styles.list}>
            {script.contradictions
              .filter((c) => confirmedIds.includes(c.id))
              .map((c) => (
                <View key={c.id} style={styles.proof}>
                  <Text style={styles.proofText}>{c.revelation}</Text>
                </View>
              ))}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.md, gap: theme.space.lg },
  slots: { flexDirection: 'row', gap: theme.space.md },
  compare: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
  },
  compareOff: { backgroundColor: theme.color.surface },
  compareText: { ...theme.type.sender, color: theme.color.bg, letterSpacing: 1.2 },
  compareTextOff: { color: theme.color.textDim },
  pressed: { opacity: 0.7 },
  section: { ...theme.type.sender, color: theme.color.textDim },
  empty: { ...theme.type.body, color: theme.color.textDim },
  list: { gap: theme.space.sm },
  proof: {
    backgroundColor: theme.color.surface,
    borderLeftWidth: 2,
    borderLeftColor: theme.color.danger,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  proofText: { ...theme.type.body, color: theme.color.text },
});
