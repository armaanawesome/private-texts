import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { theme } from './theme';
import type { ContradictionVerdict } from '@/engine';

interface Props {
  verdict: ContradictionVerdict | null;
  /** Author's payoff text, only present when the pairing was an intended contradiction. */
  revelation?: string;
  reduceMotion: boolean;
}

/**
 * The connector between the two pin slots, plus the verdict copy.
 *
 * The rejection branch matters as much as the success one: telling the player
 * *why* two statements do not conflict turns a wrong guess into a lesson rather
 * than a wall, and it is the clearest on-camera evidence that a real rules
 * engine is running underneath rather than a scripted if-statement.
 */
export function ContradictionResult({ verdict, revelation, reduceMotion }: Props) {
  const draw = useSharedValue(0);
  const shake = useSharedValue(0);

  useEffect(() => {
    if (!verdict) {
      draw.value = 0;
      return;
    }
    if (reduceMotion) {
      draw.value = 1;
      return;
    }
    draw.value = withTiming(1, {
      duration: theme.motion.compare,
      easing: Easing.out(Easing.cubic),
    });
    if (verdict.ok) {
      shake.value = withSequence(
        withTiming(-6, { duration: 60 }),
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }
  }, [verdict, reduceMotion, draw, shake]);

  const lineStyle = useAnimatedStyle(() => ({
    width: `${draw.value * 100}%`,
    transform: [{ translateX: shake.value }],
  }));

  return (
    <View style={styles.root}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.line,
            lineStyle,
            { backgroundColor: verdict?.ok ? theme.color.danger : theme.color.textDim },
          ]}
        />
      </View>

      {verdict ? (
        <View style={styles.copy}>
          <Text style={verdict.ok ? styles.reasonOk : styles.reasonNo}>{verdict.reason}</Text>
          {verdict.ok && revelation ? <Text style={styles.revelation}>{revelation}</Text> : null}
        </View>
      ) : (
        <Text style={styles.hint}>Pin two statements, then compare them.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: theme.space.sm },
  track: { height: 2, backgroundColor: theme.color.bubbleThem, borderRadius: 1, overflow: 'hidden' },
  line: { height: 2, borderRadius: 1 },
  copy: { gap: theme.space.xs },
  // dangerText, not danger: the 3.1:1 line colour is unreadable as type.
  reasonOk: { ...theme.type.body, color: theme.color.dangerText, fontWeight: '600' },
  reasonNo: { ...theme.type.body, color: theme.color.textDim },
  revelation: { ...theme.type.body, color: theme.color.text },
  hint: { ...theme.type.meta, color: theme.color.textDim, textAlign: 'center' },
});
