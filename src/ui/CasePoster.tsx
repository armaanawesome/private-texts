import { View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';
import { posterBarsFor } from './poster';
import type { CaseScript } from '@/engine';

interface Props {
  script: CaseScript;
  locked: boolean;
}

const ROWS = 7;
const TICKS = 24;

/** Cycled per row so a poster reads as several voices, not one. */
const TONES = [theme.color.accent, theme.color.proof, theme.color.danger];

/**
 * Generated cover art: the case's testimony as an abstract instrument readout.
 *
 * Every claim becomes a bar on a shared clock — the same geometry the
 * comparison sheet draws — over a ruled field. Nothing is hand-drawn and no
 * asset ships, so a new case gets its own distinct poster the moment it has
 * claims, with nothing to keep in sync.
 *
 * A locked case is drawn in the rail colour: the shape of the evidence is
 * visible, the reading is not.
 */
export function CasePoster({ script, locked }: Props) {
  const claims = script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? []));
  const bars = posterBarsFor(claims, ROWS);

  return (
    <View style={styles.frame} accessible={false} importantForAccessibility="no-hide-descendants">
      {/* The ruled field the readout sits on. */}
      <View style={styles.grid} pointerEvents="none">
        {Array.from({ length: ROWS }).map((_, i) => (
          <View key={i} style={styles.gridLine} />
        ))}
      </View>

      <View style={styles.plot}>
        {bars.map((b, i) => (
          <View key={i} style={styles.lane}>
            <View
              style={[
                styles.bar,
                {
                  left: `${b.left * 100}%`,
                  width: `${b.width * 100}%`,
                  backgroundColor: locked ? theme.color.rail : TONES[i % TONES.length],
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Tick strip — the instrument's own scale. */}
      <View style={styles.ticks} pointerEvents="none">
        {Array.from({ length: TICKS }).map((_, i) => (
          <View key={i} style={[styles.tick, i % 4 === 0 && styles.tickMajor]} />
        ))}
      </View>

      <Text style={styles.stamp} numberOfLines={1}>
        {locked ? 'SEALED' : script.id.replace(/-/g, ' ').toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 3 / 4,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    backgroundColor: theme.color.bg,
    overflow: 'hidden',
    padding: theme.space.sm,
    justifyContent: 'space-between',
  },

  grid: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'space-evenly',
  },
  gridLine: { height: StyleSheet.hairlineWidth, backgroundColor: theme.color.rule, opacity: 0.6 },

  plot: { flex: 1, justifyContent: 'space-evenly', paddingVertical: theme.space.xs },
  lane: { height: 5, justifyContent: 'center' },
  bar: { position: 'absolute', height: 5, borderRadius: 2.5 },

  ticks: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 8 },
  tick: { width: StyleSheet.hairlineWidth, height: 3, backgroundColor: theme.color.rule },
  tickMajor: { height: 7, backgroundColor: theme.color.textDim },

  stamp: {
    ...theme.type.claim,
    fontSize: 9,
    letterSpacing: 1.2,
    color: theme.color.textDim,
    marginTop: theme.space.xs,
  },
});
