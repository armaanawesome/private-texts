import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import { useCaseStore } from '@/state/caseStore';
import { evaluateAccusation, motivesFor, type AccusationResult, type Character } from '@/engine';

export function AccusationScreen() {
  const reduceMotion = useReducedMotion();
  const script = useCaseStore((s) => s.script);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const [result, setResult] = useState<AccusationResult | null>(null);

  if (!script) return null;

  const progress = { confirmedContradictionIds: confirmedIds, readMessageIds };

  /** How many proven contradictions name this person. Shown as pressure, not as an answer. */
  const proofAgainst = (id: string) =>
    script.contradictions.filter((c) => {
      if (!confirmedIds.includes(c.id)) return false;
      return script.threads.some((t) =>
        t.messages.some((m) =>
          (m.claims ?? []).some(
            (cl) => (cl.id === c.claimIdA || cl.id === c.claimIdB) && cl.subject === id,
          ),
        ),
      );
    }).length;

  function accuse(person: Character) {
    Alert.alert(
      `Accuse ${person.name}?`,
      'This is final. Be sure you can prove it.',
      [
        { text: 'Back', style: 'cancel' },
        {
          text: 'Accuse',
          style: 'destructive',
          onPress: () => {
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            setResult(evaluateAccusation(script!, person.id, progress));
          },
        },
      ],
      { cancelable: true },
    );
  }

  if (result?.correct) {
    return (
      <Animated.ScrollView
        entering={reduceMotion ? undefined : FadeIn.duration(600)}
        contentContainerStyle={styles.endRoot}
      >
        <Text style={styles.endTitle}>Case closed</Text>
        <Text style={styles.epilogue}>{result.epilogue}</Text>
      </Animated.ScrollView>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.prompt}>Who killed them?</Text>
      <Text style={styles.sub}>
        Naming the right person is not enough. You have to be able to prove it.
      </Text>

      {result && !result.correct ? (
        <Animated.View
          entering={reduceMotion ? undefined : FadeIn.duration(theme.motion.base)}
          style={styles.refusal}
        >
          <Text style={styles.refusalText}>{result.reason}</Text>
          {result.missingCount > 0 ? (
            <Text style={styles.refusalMeta}>
              {result.missingCount === 1
                ? 'One thing in their story still holds up.'
                : `${result.missingCount} things in their story still hold up.`}
            </Text>
          ) : null}
        </Animated.View>
      ) : null}

      <View style={styles.grid}>
        {script.characters.map((c) => {
          const n = proofAgainst(c.id);
          return (
            <Pressable
              key={c.id}
              onPress={() => accuse(c)}
              accessibilityRole="button"
              accessibilityLabel={`Accuse ${c.name}. ${n} proven contradiction${n === 1 ? '' : 's'} name them.`}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={[styles.avatar, { backgroundColor: c.avatarColor }]}>
                <Text style={styles.initial}>{c.name.slice(0, 1)}</Text>
              </View>
              <View style={styles.identity}>
                <Text style={styles.name}>{c.name}</Text>
                <Text style={styles.count}>
                  {n === 0 ? 'nothing proven' : `${n} contradiction${n === 1 ? '' : 's'}`}
                </Text>
                {/* Without this the motive gate is invisible: the player would
                    be refused for a reason they cannot see they are missing. */}
                {motivesFor(script.motives, c.id, readMessageIds).map((m) => (
                  <Text key={m.id} style={styles.motive}>
                    {m.summary}
                  </Text>
                ))}
              </View>
              {/* One mark per proven contradiction naming them — the same bar the
                  sheet draws, so weight of evidence reads at a glance. */}
              <View style={styles.marks}>
                {Array.from({ length: n }).map((_, i) => (
                  <View key={i} style={styles.mark} />
                ))}
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.md, gap: theme.space.md },
  prompt: { ...theme.type.title, color: theme.color.text },
  sub: { ...theme.type.body, color: theme.color.textDim },
  refusal: {
    backgroundColor: theme.color.surface,
    borderWidth: 1,
    borderColor: theme.color.rule,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
    gap: theme.space.xs,
  },
  // dangerText, not danger: 3.1:1 is unreadable as type.
  refusalText: { ...theme.type.body, color: theme.color.dangerText },
  refusalMeta: { ...theme.type.meta, color: theme.color.textDim },
  grid: { gap: theme.space.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    minHeight: theme.hit.min + 16,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  pressed: { opacity: 0.7 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  initial: { ...theme.type.sender, color: theme.color.bg, fontSize: 18 },
  identity: { flex: 1, gap: 2 },
  name: { ...theme.type.body, color: theme.color.text },
  count: { ...theme.type.meta, color: theme.color.textDim },
  motive: { ...theme.type.meta, color: theme.color.accent, marginTop: 2 },
  marks: { flexDirection: 'row', gap: 3, alignItems: 'center' },
  mark: { width: 3, height: 18, borderRadius: 1.5, backgroundColor: theme.color.danger },
  endRoot: { padding: theme.space.lg, gap: theme.space.lg, flexGrow: 1, justifyContent: 'center' },
  endTitle: { ...theme.type.title, color: theme.color.accent, textAlign: 'center' },
  epilogue: { ...theme.type.body, color: theme.color.text },
});
