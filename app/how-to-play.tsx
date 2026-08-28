import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { useSettingsStore } from '@/settings/settingsStore';

/**
 * How the game works, before the game asks you to play it.
 *
 * The tutorial CASE teaches the reasoning — it is built so exactly one pair of
 * claims fires and two near-misses correctly refuse to. What nothing taught was
 * the *controls*: that a message is held rather than tapped, that holding one
 * puts a claim on the record, that two claims are compared on the board, and
 * that the accusation is one shot. A player who never discovers the long press
 * never reaches the reasoning the tutorial case was built to teach.
 *
 * Five steps, because that is how many distinct actions there are. Shown once on
 * first launch and repeatable from Settings, so skipping it is not a trap.
 *
 * ## What it deliberately does not teach
 *
 * There is no weapon to choose and no suspect list to eliminate. The engine
 * knows people, places, and minute windows, and a contradiction is one person in
 * two places across one shared minute. Teaching a Cluedo-shaped game here would
 * describe a game this is not, and send the player hunting for a mechanic that
 * does not exist.
 */

const STEPS = [1, 2, 3, 4, 5] as const;

export default function HowToPlayScreen() {
  const t = useTranslator();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const update = useSettingsStore((s) => s.update);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const screenOptions = useMemo(() => ({ title: t('howToPlay.title') }), [t]);

  /**
   * Marks it seen on the way out, whichever exit was taken.
   *
   * Skipping counts. Someone who skips has decided they do not need it, and
   * showing it again next launch would overrule a choice they made — the
   * Settings row is how they come back if they were wrong.
   */
  const finish = useCallback(() => {
    update({ hasSeenHowToPlay: true });
    router.replace('/');
  }, [update, router]);

  const goTo = useCallback(
    (next: number) => {
      // Clamped rather than trusted: this also serves the scroll handler, whose
      // page maths can round past the end on a bouncy over-scroll.
      const clamped = Math.max(0, Math.min(next, STEPS.length - 1));
      setIndex(clamped);
      scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
    },
    [width],
  );

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const page = Math.round(e.nativeEvent.contentOffset.x / Math.max(width, 1));
      setIndex(Math.max(0, Math.min(page, STEPS.length - 1)));
    },
    [width],
  );

  const last = index === STEPS.length - 1;

  return (
    <View style={styles.root}>
      <Stack.Screen options={screenOptions} />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        bounces={false}
      >
        {STEPS.map((n) => (
          <View key={n} style={[styles.page, { width }]}>
            <View style={styles.figure}>{figureFor(n)}</View>
            <Text style={styles.kicker}>{t('howToPlay.step', { n, total: STEPS.length })}</Text>
            <Text style={styles.heading}>{t(`howToPlay.${n}.title`)}</Text>
            <Text style={styles.body}>{t(`howToPlay.${n}.body`)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View
          style={styles.dots}
          accessible
          accessibilityLabel={t('howToPlay.step', { n: index + 1, total: STEPS.length })}
        >
          {STEPS.map((n, i) => (
            <View key={n} style={[styles.dot, i === index && styles.dotOn]} />
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={finish}
            accessibilityRole="button"
            hitSlop={theme.hit.slop}
            style={styles.skip}
          >
            <Text style={styles.skipText}>{t('howToPlay.skip')}</Text>
          </Pressable>

          <Pressable
            onPress={() => (last ? finish() : goTo(index + 1))}
            accessibilityRole="button"
            style={({ pressed }) => [styles.next, pressed && styles.pressed]}
          >
            <Text style={styles.nextText}>{last ? t('howToPlay.start') : t('howToPlay.next')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/**
 * A diagram per step, drawn from theme primitives rather than imported from the
 * real screens.
 *
 * Deliberate: the real components need a live case, a store, and a claim before
 * they render anything, and threading a fake case through them to draw a picture
 * would make the tutorial the most coupled screen in the app. These are the same
 * tokens at the same sizes, so they read as the same product without depending
 * on it.
 */
function figureFor(step: number) {
  if (step === 1) {
    return (
      <View style={fig.stack}>
        <View style={fig.ruling}>
          <Text style={fig.rulingText}>Recorded as accidental</Text>
        </View>
        <Text style={fig.strike}>—</Text>
      </View>
    );
  }
  if (step === 2) {
    return (
      <View style={fig.stack}>
        <View style={fig.bubble} />
        <View style={[fig.bubble, fig.short]} />
        <View style={fig.tap} />
      </View>
    );
  }
  if (step === 3) {
    return (
      <View style={fig.stack}>
        <View style={[fig.bubble, fig.held]} />
        <View style={fig.chip}>
          <Text style={fig.chipText}>who · where · when</Text>
        </View>
      </View>
    );
  }
  if (step === 4) {
    return (
      <View style={fig.stack}>
        <View style={fig.chip}>
          <Text style={fig.chipText}>the bakehouse · 02:40</Text>
        </View>
        <View style={fig.link} />
        <View style={[fig.chip, fig.chipClash]}>
          <Text style={fig.chipText}>the market square · 02:40</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={fig.stack}>
      <View style={fig.plate}>
        <Text style={fig.plateText}>?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },

  page: { paddingHorizontal: theme.space.lg, justifyContent: 'center', gap: theme.space.md },
  figure: { height: 160, justifyContent: 'center', marginBottom: theme.space.lg },
  kicker: { ...theme.type.meta, color: theme.color.textDim, letterSpacing: 0.6 },
  heading: { ...theme.type.title, color: theme.color.text, fontSize: 26, lineHeight: 32 },
  body: { ...theme.type.body, color: theme.color.textDim, lineHeight: 24 },

  footer: {
    paddingHorizontal: theme.space.lg,
    paddingBottom: theme.space.xl,
    gap: theme.space.lg,
  },
  dots: { flexDirection: 'row', gap: theme.space.sm, justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.color.rail },
  dotOn: { backgroundColor: theme.color.accent },

  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skip: { minHeight: theme.hit.min, justifyContent: 'center', paddingRight: theme.space.lg },
  skipText: { ...theme.type.body, color: theme.color.textDim },
  next: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    paddingHorizontal: theme.space.xl,
    borderRadius: theme.radius.chip,
    backgroundColor: theme.color.accent,
  },
  pressed: { opacity: 0.7 },
  nextText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
});

const fig = StyleSheet.create({
  stack: { gap: theme.space.sm, alignItems: 'flex-start' },

  bubble: {
    height: 34,
    width: 190,
    borderRadius: theme.radius.bubble,
    backgroundColor: theme.color.bubbleThem,
  },
  short: { width: 120 },
  held: { borderWidth: 2, borderColor: theme.color.accent },
  tap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: theme.color.accent,
    marginTop: theme.space.sm,
    marginLeft: theme.space.lg,
  },

  chip: {
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: theme.radius.chip,
    backgroundColor: theme.color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.rule,
  },
  chipClash: { borderColor: theme.color.danger, backgroundColor: theme.color.dangerWash },
  chipText: { ...theme.type.claim, color: theme.color.text },
  link: { width: 2, height: 22, backgroundColor: theme.color.danger, marginLeft: theme.space.lg },

  ruling: {
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: theme.radius.chip,
    backgroundColor: theme.color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.rule,
  },
  rulingText: { ...theme.type.claim, color: theme.color.textDim },
  strike: { ...theme.type.title, color: theme.color.danger, marginLeft: theme.space.lg },

  plate: {
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.md,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.accent,
  },
  plateText: { ...theme.type.title, color: theme.color.accent },
});
