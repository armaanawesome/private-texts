import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { theme } from './theme';
import { clockOf, domainFor, fractionOf, overlapOf, type Span } from './timeScale';

export interface TimelineClaim {
  /** What was asserted — "the café", "with Esme", "cashing up". */
  readonly what: string;
  /** Who asserted it — "own account", "per Esme". */
  readonly who: string;
  readonly window: Span;
}

interface Props {
  /** The person both statements are about. */
  readonly subjectName: string;
  readonly a: TimelineClaim;
  readonly b: TimelineClaim;
  /**
   * Whether the engine confirmed these cannot both be true. The overlap band
   * only ignites when it does — two bars can share a stretch of clock and still
   * be perfectly compatible (the same person, the same place, two witnesses),
   * and lighting that up would teach the player a rule the game does not have.
   */
  readonly conflict: boolean;
  readonly reduceMotion: boolean;
}

const GROW_MS = 520;
const STAGGER_MS = 120;
const BAND_MS = 300;
/** Ticks across the axis. A multiple of 4 so the majors land evenly. */
const TICKS = 24;

/**
 * Two statements drawn against one clock.
 *
 * This is the screen the game is named for. Everywhere else the app pretends to
 * be a phone; here it stops pretending and shows you the machinery — the same
 * three questions `checkContradiction` asks, in the same order, as geometry:
 * one subject in the header, one shared axis for time, two bars for place. When
 * the bars overlap and the places cannot both be true, the shared stretch lights
 * up. The player reads the conclusion off the picture before the words arrive.
 *
 * The bars grow from the left rather than fading in, because the rail is the
 * already-visible default and growth along it reads as measurement being taken.
 */
export function ClaimTimeline({ subjectName, a, b, conflict, reduceMotion }: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = useSharedValue(reduceMotion ? 1 : 0);
  const band = useSharedValue(reduceMotion ? 1 : 0);

  const domain = domainFor(a.window, b.window);
  const overlap = overlapOf(a.window, b.window);
  const lit = conflict && overlap !== null;

  const geom = (w: Span) => {
    const left = fractionOf(domain, w.start) * trackWidth;
    const right = fractionOf(domain, w.end) * trackWidth;
    return { left, width: Math.max(right - left, 2) };
  };

  const aGeom = geom(a.window);
  const bGeom = geom(b.window);
  const bandGeom = overlap ? geom(overlap) : { left: 0, width: 0 };

  // Re-run whenever the pairing changes, so swapping one chip re-measures rather
  // than leaving the previous bars sitting at full width.
  const signature = `${a.what}|${b.what}|${a.window.start}|${b.window.start}|${lit}`;
  useEffect(() => {
    if (reduceMotion) {
      progress.value = 1;
      band.value = 1;
      return;
    }
    progress.value = 0;
    band.value = 0;
    progress.value = withTiming(1, { duration: GROW_MS, easing: Easing.out(Easing.exp) });
    band.value = withDelay(
      GROW_MS - 120,
      withTiming(1, { duration: BAND_MS, easing: Easing.out(Easing.cubic) }),
    );
  }, [signature, reduceMotion, progress, band]);

  const barA = useAnimatedStyle<ViewStyle>(() => ({
    width: aGeom.width * progress.value,
  }));
  // The second bar lags by a beat so the eye reads them as two separate
  // statements being laid down, not one shape splitting in half.
  const lag = STAGGER_MS / GROW_MS;
  const barB = useAnimatedStyle<ViewStyle>(() => ({
    width: bGeom.width * Math.max(0, (progress.value - lag) / (1 - lag)),
  }));
  const bandStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: band.value,
    transform: [{ scaleY: 0.72 + 0.28 * band.value }],
  }));

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Text style={styles.subject} numberOfLines={1}>
          {subjectName}
        </Text>
        <Text style={styles.subjectMeta}>one person</Text>
      </View>

      <View style={styles.axis}>
        <Text style={styles.axisLabel}>{clockOf(domain.start)}</Text>
        <View style={styles.axisRule} />
        <Text style={styles.axisLabel}>{clockOf(domain.end)}</Text>
      </View>

      {/* The instrument's own scale. Majors every fourth tick give the eye
          something to measure the bars against. */}
      <View style={styles.ticks} pointerEvents="none">
        {Array.from({ length: TICKS }).map((_, i) => (
          <View key={i} style={[styles.tick, i % 4 === 0 && styles.tickMajor]} />
        ))}
      </View>

      <View style={styles.plot} onLayout={(e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)}>
        {/* Vertical rules behind the rails, aligned to the major ticks, so the
            bars read as measured against a scale rather than floating. */}
        <View style={styles.vgrid} pointerEvents="none">
          {Array.from({ length: TICKS / 4 + 1 }).map((_, i) => (
            <View key={i} style={styles.vline} />
          ))}
        </View>

        {lit && trackWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.band, { left: bandGeom.left, width: bandGeom.width }, bandStyle]}
          />
        ) : null}

        <Row claim={a} geom={aGeom} barStyle={barA} tone={theme.color.accent} />
        <Row claim={b} geom={bGeom} barStyle={barB} tone={theme.color.proof} />
      </View>

      {lit && overlap ? (
        <View style={styles.verdict}>
          <View style={styles.verdictMark} />
          <Text style={styles.verdictText}>
            <Text style={styles.verdictTime}>
              {clockOf(overlap.start)}–{clockOf(overlap.end)}
            </Text>
            {'   both true at once'}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function Row({
  claim,
  geom,
  barStyle,
  tone,
}: {
  claim: TimelineClaim;
  geom: { left: number; width: number };
  barStyle: ReturnType<typeof useAnimatedStyle<ViewStyle>>;
  tone: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowHead}>
        <Text style={styles.what} numberOfLines={1}>
          {claim.what}
        </Text>
        <Text style={styles.who} numberOfLines={1}>
          {claim.who}
        </Text>
      </View>
      <View style={styles.rail}>
        <Animated.View style={[styles.bar, { left: geom.left, backgroundColor: tone }, barStyle]} />
      </View>
      <Text style={styles.span}>
        {clockOf(claim.window.start)}–{clockOf(claim.window.end)}
      </Text>
    </View>
  );
}

const RAIL_H = 10;

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
    gap: theme.space.sm,
  },

  head: { flexDirection: 'row', alignItems: 'baseline', gap: theme.space.sm },
  subject: { ...theme.type.title, color: theme.color.text, flexShrink: 1 },
  subjectMeta: { ...theme.type.meta, color: theme.color.textDim },

  axis: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  axisLabel: { ...theme.type.claim, color: theme.color.textDim, fontSize: 11 },
  axisRule: { flex: 1, height: 1, backgroundColor: theme.color.rule },

  ticks: { flexDirection: 'row', justifyContent: 'space-between', height: 6, marginTop: -2 },
  tick: { width: StyleSheet.hairlineWidth, height: 3, backgroundColor: theme.color.rule },
  tickMajor: { height: 6, backgroundColor: theme.color.textDim },

  plot: { gap: theme.space.md, paddingVertical: theme.space.xs },
  vgrid: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vline: { width: StyleSheet.hairlineWidth, backgroundColor: theme.color.rule, opacity: 0.5 },

  /**
   * Spans both rows on purpose. The overlap is a property of the pair, not of
   * either statement, so drawing it per-row would say the wrong thing.
   */
  band: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: theme.color.dangerWash,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.color.danger,
    borderRadius: 2,
  },

  row: { gap: theme.space.xs },
  rowHead: { flexDirection: 'row', alignItems: 'baseline', gap: theme.space.sm },
  what: { ...theme.type.body, color: theme.color.text, flexShrink: 1 },
  who: { ...theme.type.meta, color: theme.color.textDim },

  rail: {
    height: RAIL_H,
    borderRadius: RAIL_H / 2,
    backgroundColor: theme.color.rail,
    justifyContent: 'center',
  },
  bar: { position: 'absolute', height: RAIL_H, borderRadius: RAIL_H / 2 },
  span: { ...theme.type.claim, color: theme.color.textDim, fontSize: 11 },

  verdict: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  verdictMark: { width: 10, height: 2, backgroundColor: theme.color.danger },
  verdictText: { ...theme.type.meta, color: theme.color.textDim, flexShrink: 1 },
  verdictTime: { ...theme.type.claim, fontSize: 12, color: theme.color.dangerText },
});
