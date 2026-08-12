import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '@/ui/theme';
import { VOLUME_STEPS, stepForVolume, volumeForStep, volumeStepLabel } from './volumeSteps';

/**
 * The volume control, drawn as six bars on a rail.
 *
 * A continuous slider would mean a new native module and a dev-client rebuild.
 * It would also be the wrong control for this game: bars rising along a shared
 * rail are the motif the case poster and the comparison sheet are both built
 * from, so the one control on the settings screen that could have looked
 * borrowed instead looks like it came from the evidence board.
 *
 * All the arithmetic lives in volumeSteps.ts and is tested there.
 */
export function VolumeRail({
  volume,
  onChange,
  disabled,
}: {
  volume: number;
  onChange: (next: number) => void;
  disabled: boolean;
}) {
  const step = stepForVolume(volume);

  function setStep(next: number) {
    const clamped = Math.min(VOLUME_STEPS, Math.max(0, next));
    if (clamped === step) return;
    onChange(volumeForStep(clamped));
  }

  return (
    <View style={styles.wrap}>
      <View
        // One accessibility element, not six. A screen reader user adjusts this
        // by swiping up and down; six separate stops would be a worse version of
        // the same control and would bury the rows after it.
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Sound effects volume"
        accessibilityValue={{ min: 0, max: VOLUME_STEPS, now: step, text: volumeStepLabel(step) }}
        accessibilityState={{ disabled }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(event) => {
          if (disabled) return;
          if (event.nativeEvent.actionName === 'increment') setStep(step + 1);
          if (event.nativeEvent.actionName === 'decrement') setStep(step - 1);
        }}
        style={styles.rail}
      >
        {Array.from({ length: VOLUME_STEPS }).map((_, i) => {
          const filled = i < step;
          return (
            <Pressable
              key={i}
              accessible={false}
              disabled={disabled}
              onPress={() => setStep(i + 1)}
              style={styles.segment}
            >
              <View
                style={[
                  styles.bar,
                  // A ramp, so the control reads as a level even in a still
                  // screenshot and for anyone who cannot separate the two fills.
                  { height: 10 + i * 3.5 },
                  filled && !disabled && styles.barFilled,
                  disabled && styles.barDisabled,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      {/* The level in words. Colour alone must never be the indicator. */}
      <Text style={styles.readout}>{disabled ? 'Sound is off' : volumeStepLabel(step)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'flex-end', gap: theme.space.md },

  rail: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: theme.space.xs },
  /** Full-height target: the bar is 10–28pt tall, the tap area is always 44. */
  segment: { flex: 1, height: theme.hit.min, justifyContent: 'flex-end' },

  bar: { borderRadius: 2, backgroundColor: theme.color.rail },
  barFilled: { backgroundColor: theme.color.accent },
  barDisabled: { backgroundColor: theme.color.rule },

  readout: {
    ...theme.type.meta,
    fontFamily: theme.font.mono,
    fontSize: 11,
    color: theme.color.textDim,
    paddingBottom: theme.space.xs,
    // Fixed so the rail does not resize as the label changes width.
    width: 84,
    textAlign: 'right',
  },
});
