import { Text, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import type { Claim } from '@/engine';

interface Props {
  claim: Claim;
  pinned: boolean;
  onPress: () => void;
}

export function ClaimChip({ claim, pinned, onPress }: Props) {
  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      hitSlop={theme.hit.slop}
      accessibilityRole="button"
      accessibilityState={{ selected: pinned }}
      accessibilityLabel={`${claim.label}. ${pinned ? 'Pinned' : 'Not pinned'}.`}
      style={({ pressed }) => [styles.chip, pinned && styles.pinned, pressed && styles.pressed]}
    >
      <Text style={[styles.label, pinned && styles.labelPinned]}>{claim.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    borderLeftWidth: 2,
    borderLeftColor: theme.color.proof,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
  },
  pinned: { backgroundColor: theme.color.proof },
  pressed: { opacity: 0.7 },
  label: { ...theme.type.claim, color: theme.color.text },
  labelPinned: { color: theme.color.bg },
});
