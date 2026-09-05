import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from './theme';
import type { ContradictionVerdict } from '@/engine';

interface Props {
  verdict: ContradictionVerdict | null;
  /** Author's payoff text, only present when the pairing was an intended contradiction. */
  revelation?: string;
  reduceMotion: boolean;
}

/**
 * The words that follow the comparison.
 *
 * This used to draw its own connector line between two pin slots. The timeline
 * above now *is* that connector — it shows the overlap rather than gesturing at
 * it — and running both left two competing animations for one idea. So this is
 * copy only, and it enters after the geometry has settled.
 *
 * The rejection branch matters as much as the success one: telling the player
 * *why* two statements do not conflict turns a wrong guess into a lesson rather
 * than a wall, and it is the clearest evidence that a real rules engine is
 * running underneath rather than a scripted if-statement.
 */
export function ContradictionResult({ verdict, revelation, reduceMotion }: Props) {
  /*
   * Nothing, deliberately. This used to render "Pin two statements, then run
   * the check." — which the docked slots and the 0/2 counter now say twice over
   * while the player is looking straight at them. Three restatements of one
   * instruction is not thorough, it is noise, and it pushed the instrument off
   * the top of the screen to make room for itself.
   */
  if (!verdict) return null;

  return (
    <Animated.View
      // Keyed on the reason so a second verdict re-enters instead of swapping
      // text silently under the player's eyes.
      key={verdict.reason}
      entering={reduceMotion ? undefined : FadeIn.duration(theme.motion.base).delay(theme.motion.base)}
      style={styles.copy}
    >
      <View style={styles.headline}>
        {verdict.ok ? <View style={styles.mark} /> : null}
        <Text style={verdict.ok ? styles.reasonOk : styles.reasonNo}>{verdict.reason}</Text>
      </View>
      {verdict.ok && revelation ? <Text style={styles.revelation}>{revelation}</Text> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  copy: { gap: theme.space.sm },
  headline: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  /** Hairline, not a 2px colour bar down the side of a card. */
  mark: { width: 14, height: 1, backgroundColor: theme.color.danger },
  // dangerText, not danger: the 3.1:1 line colour is unreadable as type.
  reasonOk: { ...theme.type.body, color: theme.color.dangerText, fontWeight: '600', flexShrink: 1 },
  reasonNo: { ...theme.type.body, color: theme.color.textDim, flexShrink: 1 },
  revelation: { ...theme.type.body, color: theme.color.text },
});
