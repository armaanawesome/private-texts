import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { theme } from './theme';
import type { Claim } from '@/engine';

interface Props {
  claim: Claim | null;
  /** Index shown when empty, so the two slots read as an ordered pair. */
  ordinal: number;
  reduceMotion: boolean;
}

export function PinSlot({ claim, ordinal, reduceMotion }: Props) {
  if (!claim) {
    return (
      <View style={[styles.slot, styles.empty]}>
        <Text style={styles.emptyText}>Statement {ordinal}</Text>
      </View>
    );
  }
  return (
    <Animated.View
      entering={reduceMotion ? undefined : FadeIn.duration(theme.motion.fast)}
      exiting={reduceMotion ? undefined : FadeOut.duration(theme.motion.fast)}
      style={styles.slot}
    >
      <Text style={styles.text} numberOfLines={4}>
        {claim.label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
    minHeight: 96,
    justifyContent: 'center',
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  empty: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.color.bubbleThem,
    backgroundColor: 'transparent',
  },
  emptyText: { ...theme.type.meta, color: theme.color.textDim, textAlign: 'center' },
  text: { ...theme.type.claim, color: theme.color.text },
});
