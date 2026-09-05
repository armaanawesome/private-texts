import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { theme } from './theme';
import { useReduceMotion } from '@/settings/useReduceMotion';
import { useTranslator } from '@/i18n/useTranslator';

/**
 * Placeholders in the shape of the thing that is coming.
 *
 * Three screens in this app returned `null` while they waited — the case grid
 * while RevenueCat answered, the case layout while entitlements resolved, and
 * the inbox while the save came back off AsyncStorage. Each of those `null`s was
 * correct logic and a blank screen, which on a slow device or a bad connection
 * is indistinguishable from a crash.
 *
 * A skeleton rather than a spinner, which is the near-unanimous pattern in
 * shipped apps: a spinner says "something is happening somewhere", a skeleton
 * says "a grid of cases is about to appear here, and it will be this shape".
 * The second makes the wait feel shorter even when it is the same length,
 * because the layout does not jump when the content lands.
 *
 * The shapes below deliberately mirror the real components' geometry — the same
 * 3:4 frame as `CaseArt`, the same 44pt avatar and inset rule as the inbox — so
 * the swap is a fill change rather than a reflow.
 */

const PULSE_MS = 900;
const DIM = 0.35;
const BRIGHT = 0.75;

/**
 * One pulsing block.
 *
 * The pulse is the only thing distinguishing "loading" from "empty", so it is
 * load-bearing rather than decoration — but it still yields to reduced motion,
 * where it settles at a fixed opacity between the two extremes. A player who has
 * asked the phone to stop animating still needs to see that something is
 * pending; they just should not be made to watch it breathe.
 */
export function SkeletonBlock({ style }: { style?: StyleProp<ViewStyle> }) {
  const reduceMotion = useReduceMotion();
  const pulse = useSharedValue(reduceMotion ? 1 : 0);

  if (!reduceMotion && pulse.value === 0) {
    // Started here rather than in an effect: an effect runs after the first
    // paint, so the block would show one frame at full opacity before the
    // animation took over, and a grid of them would flash in unison.
    pulse.value = withRepeat(
      withTiming(1, { duration: PULSE_MS, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }

  const animated = useAnimatedStyle(() => ({
    opacity: reduceMotion ? (DIM + BRIGHT) / 2 : DIM + (BRIGHT - DIM) * pulse.value,
  }));

  return <Animated.View style={[styles.block, style, animated]} />;
}

/**
 * The case grid, before entitlements have resolved.
 *
 * Without this the grid rendered immediately with `entitlementIds` still `[]`,
 * so every paid case drew as locked and then popped open a moment later once
 * RevenueCat answered. A paying customer watched their twelve cases re-lock and
 * unlock on every single launch.
 */
export function CaseGridSkeleton({ count = 6 }: { count?: number }) {
  const t = useTranslator();
  return (
    <View
      style={styles.grid}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={t('a11y.loadingCases')}
    >
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={styles.tile}>
          {/* Matches CaseArt's frame exactly, so nothing shifts on swap. */}
          <SkeletonBlock style={styles.art} />
          <SkeletonBlock style={styles.name} />
          <SkeletonBlock style={styles.meta} />
        </View>
      ))}
    </View>
  );
}

/** The inbox, while the save is read back. Mirrors the real row's geometry. */
export function ThreadListSkeleton({ count = 5 }: { count?: number }) {
  const t = useTranslator();
  return (
    <View accessible accessibilityRole="progressbar" accessibilityLabel={t('a11y.loadingThreads')}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.row, i > 0 && styles.divided]}>
          <SkeletonBlock style={styles.avatar} />
          <View style={styles.body}>
            {/* Two unequal lines. Equal ones read as a table, not as messages. */}
            <SkeletonBlock style={styles.lineWide} />
            <SkeletonBlock style={styles.lineNarrow} />
          </View>
        </View>
      ))}
    </View>
  );
}

const AVATAR = 44;

const styles = StyleSheet.create({
  block: { backgroundColor: theme.color.rail, borderRadius: theme.radius.chip },

  // Matches app/index.tsx exactly. A skeleton on a different grid than the
  // content it stands in for reflows the moment the real tiles arrive, which
  // is the one thing a skeleton exists to prevent.
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.space.lg,
  },
  tile: { width: '48%', gap: theme.space.sm },
  art: { aspectRatio: 3 / 4, width: '100%', borderRadius: theme.radius.chip },
  name: { height: 16, width: '80%', borderRadius: 4 },
  meta: { height: 11, width: '45%', borderRadius: 4 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.md,
  },
  divided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.rule,
    marginLeft: AVATAR + theme.space.md + theme.space.md,
    paddingLeft: 0,
  },
  avatar: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2 },
  body: { flex: 1, gap: 6 },
  lineWide: { height: 15, width: '62%', borderRadius: 4 },
  lineNarrow: { height: 12, width: '88%', borderRadius: 4 },
});
