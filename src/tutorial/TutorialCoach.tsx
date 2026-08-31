import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { useCaseStore } from '@/state/caseStore';
import { useSettingsStore } from '@/settings/settingsStore';
import { useReduceMotion } from '@/settings/useReduceMotion';
import { tutorialStepFor, type TutorialScreen } from './steps';

/**
 * One line of guidance, over the screen it is about.
 *
 * Mounted by each screen that hosts a step rather than once in the case layout,
 * because the conversation screen lives at `app/thread/[threadId].tsx` — a
 * sibling of `app/case/`, not a child — so no single parent covers all four.
 * Naming the screen at the call site also keeps this component free of any
 * guessing about where it is.
 *
 * ## In flow, not floating
 *
 * The step this spends most of its life showing is "tap anywhere to bring in
 * the next message", and the conversation advances on a tap anywhere in the
 * message area. A floating overlay is one z-index mistake away from swallowing
 * that tap and breaking the exact control it is teaching — so it is not one. It
 * is an ordinary block at the top of a flex column, which takes its own height,
 * leaves the screen below it alone, and cannot intercept anything by
 * construction. The bottom of these screens is spoken for anyway: the tab bar
 * on the case screens, the Skip-all footer on a conversation.
 */
export function TutorialCoach({ screen }: { screen: TutorialScreen }) {
  const t = useTranslator();
  const reduceMotion = useReduceMotion();
  const caseId = useCaseStore((s) => s.script?.id);
  const readCount = useCaseStore((s) => s.readMessageIds.length);
  const pinnedCount = useCaseStore((s) => s.pinnedClaimIds.length);
  const provedCount = useCaseStore((s) => s.confirmedContradictionIds.length);
  const solved = useCaseStore((s) => s.solved);
  const dismissed = useSettingsStore((s) => s.settings.tutorialDismissed);
  const update = useSettingsStore((s) => s.update);

  const step = tutorialStepFor({
    caseId,
    screen,
    dismissed,
    readCount,
    pinnedCount,
    provedCount,
    solved,
  });

  if (!step) return null;

  return (
    <Animated.View
        /*
         * Keyed on the step, so moving from "tap to read on" to "hold a message"
         * replays the entrance. Without the key React reuses the view and the
         * text changes in place, which on a strip this small is easy to miss
         * entirely — and missing it means missing the instruction.
         */
      key={step.id}
      entering={reduceMotion ? undefined : FadeInDown.duration(theme.motion.base)}
      style={styles.strip}
    >
      <View style={styles.mark} />
      <Text style={styles.body}>{t(step.key)}</Text>
      <Pressable
        onPress={() => update({ tutorialDismissed: true })}
        accessibilityRole="button"
        accessibilityLabel={t('tutorial.dismissLabel')}
        hitSlop={theme.hit.slop}
        style={({ pressed }) => [styles.got, pressed && styles.pressed]}
      >
        <Text style={styles.gotText}>{t('tutorial.dismiss')}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    paddingVertical: theme.space.md,
    paddingHorizontal: theme.space.md,
    backgroundColor: theme.color.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.color.rule,
  },
  /** The one amber element. Marks the strip as guidance without spending a word on it. */
  mark: { width: 3, alignSelf: 'stretch', borderRadius: 1.5, backgroundColor: theme.color.accent },
  body: { ...theme.type.meta, color: theme.color.text, flex: 1, lineHeight: 18 },
  got: { minHeight: theme.hit.min, justifyContent: 'center' },
  gotText: { ...theme.type.meta, color: theme.color.textDim, fontWeight: '600' },
  pressed: { opacity: 0.6 },
});
