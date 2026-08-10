import { useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import type { Claim } from '@/engine';

interface Props {
  claim: Claim;
  pinned: boolean;
  /**
   * Which bar this became on the sheet, 1 or 2. The colours match
   * `ClaimTimeline` exactly, so a pinned chip and its bar are visibly the same
   * object — without it the player has to remember which statement they pinned
   * first to read the picture.
   */
  slot?: 1 | 2;
  onPress: () => void;
}

const toneFor = (slot?: 1 | 2) => (slot === 2 ? theme.color.proof : theme.color.accent);

export function ClaimChip({ claim, pinned, slot, onPress }: Props) {
  const on = useSharedValue(pinned ? 1 : 0);

  useEffect(() => {
    on.value = withTiming(pinned ? 1 : 0, {
      duration: theme.motion.fast,
      easing: Easing.out(Easing.quad),
    });
  }, [pinned, on]);

  const tone = toneFor(slot);

  // A hairline that thickens rather than a colour bar that appears: the chip
  // stays the same object through the change instead of swapping appearance.
  const frame = useAnimatedStyle(() => ({
    borderColor: on.value > 0.5 ? tone : theme.color.rule,
    backgroundColor: on.value > 0.5 ? theme.color.surface : theme.color.bg,
  }));

  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      hitSlop={theme.hit.slop}
      accessibilityRole="button"
      accessibilityState={{ selected: pinned }}
      accessibilityLabel={`${claim.label}. ${pinned ? `Pinned as statement ${slot ?? 1}` : 'Not pinned'}.`}
      style={({ pressed }) => [styles.press, pressed && styles.pressed]}
    >
      <Animated.View style={[styles.chip, frame]}>
        <Marker on={on} tone={tone} />
        <Text style={styles.label}>{claim.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

/** A miniature of the bar the claim becomes on the sheet. */
function Marker({ on, tone }: { on: SharedValue<number>; tone: string }) {
  const style = useAnimatedStyle(() => ({
    backgroundColor: on.value > 0.5 ? tone : theme.color.rail,
    transform: [{ scaleY: 0.55 + 0.45 * on.value }],
  }));
  return <Animated.View style={[styles.marker, style]} />;
}

const styles = StyleSheet.create({
  press: { borderRadius: theme.radius.chip },
  pressed: { opacity: 0.7 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.sm,
    minHeight: theme.hit.min,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
  },
  marker: { width: 3, height: 20, borderRadius: 1.5 },
  label: { ...theme.type.claim, color: theme.color.text, flexShrink: 1 },
});
