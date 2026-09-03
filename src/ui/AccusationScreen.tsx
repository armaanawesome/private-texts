import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { feedback } from '@/settings/feedback';
import { useReduceMotion } from '@/settings/useReduceMotion';
import { theme } from './theme';
import { useTabBarClearance } from './useTabBarClearance';
import { ConfrontationScreen } from './ConfrontationScreen';
import { CaseClosedScreen } from './CaseClosedScreen';
import { TutorialCoach } from '@/tutorial/TutorialCoach';
import { useCaseStore } from '@/state/caseStore';
import { saveProgress } from '@/state/persistence';
import { syncProgress } from '@/auth';
import { evaluateAccusation, motivesFor, type AccusationResult, type Character } from '@/engine';

export function AccusationScreen() {
  const reduceMotion = useReduceMotion();
  // The native tab bar overlays this screen. Without this the last row is under it.
  const clearance = useTabBarClearance();
  const script = useCaseStore((s) => s.script);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const markSolved = useCaseStore((s) => s.markSolved);
  const [result, setResult] = useState<AccusationResult | null>(null);
  const [closed, setClosed] = useState(false);

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
      // This used to read "This is final. Be sure you can prove it." It was not
      // true. Naming the wrong person returns a refusal and the screen falls
      // straight back to the suspects with every proof intact, so the player can
      // name somebody else immediately. Copy that threatens a consequence the
      // game does not impose teaches people to stop playing.
      'If your evidence does not fit them, you will be told so and can name someone else.',
      [
        { text: 'Back', style: 'cancel' },
        {
          text: 'Accuse',
          style: 'destructive',
          onPress: () => {
            feedback.notify('warning');
            feedback.cue('accusation');
            const outcome = evaluateAccusation(script!, person.id, progress);
            setResult(outcome);
            // Written to disk here rather than left in component state, which is
            // where the result used to live and die: closing the app after
            // solving a case forgot it had been solved. Now that cases unlock in
            // order, forgetting it would re-lock the rest of the game.
            if (outcome.correct) {
              markSolved();
              void saveProgress(script!.id);
              /*
               * Push it now, not merely at the next backgrounding.
               *
               * Solving a case is the one moment in the game worth losing
               * nothing from, and it is also when a player is most likely to put
               * the phone down in a way that never produces a clean background
               * event. Fire and forget: a signed-out player gets a cheap no-op,
               * and a failure is retried by the next sync rather than surfaced
               * over the top of the epilogue.
               */
              void syncProgress();
            }
          },
        },
      ],
      { cancelable: true },
    );
  }

  // A correct accusation opens the confrontation rather than the epilogue: the
  // player has proved it, now they have to say it to her face. The epilogue is
  // what is left after she stops arguing.
  if (result?.correct && script.confrontation && !closed) {
    return (
      <ConfrontationScreen script={script} progress={progress} onClosed={() => setClosed(true)} />
    );
  }

  if (result?.correct) {
    return (
      <CaseClosedScreen
        script={script}
        epilogue={result.epilogue}
        proved={confirmedIds.length}
        total={script.contradictions.length}
        messagesRead={readMessageIds.length}
        threadCount={script.threads.length}
        /*
         * Replay has to clear the two pieces of state this component owns, not
         * merely the store. `result` and `closed` live here, and the store knows
         * nothing about either — without this the case would restart underneath
         * a closing screen that stayed on top of it.
         */
        onReplay={() => {
          setResult(null);
          setClosed(false);
        }}
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* First child, in flow: it takes its own height and the list scrolls below. */}
      <TutorialCoach screen="accuse" />
      {/* `flex: 1` is not decoration here. The scroller is now a child of a flex
          column rather than the screen itself, and without it a ScrollView takes
          its content height and stops scrolling. */}
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: clearance }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  scroll: { flex: 1 },
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
});
