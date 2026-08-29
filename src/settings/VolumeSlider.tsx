import { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, type LayoutChangeEvent } from 'react-native';
import { theme } from '@/ui/theme';
import { VOLUME_STEPS, stepForVolume, volumeForStep, volumeStepLabel } from './volumeSteps';

/**
 * A continuous volume slider.
 *
 * It replaces a six-bar stepped rail. The rail's own note argued that a slider
 * "would mean a new native module and a dev-client rebuild" — true of
 * `@react-native-community/slider`, and not true of this. React Native ships
 * PanResponder, so a drag costs nothing but the code below and needs no rebuild.
 *
 * PanResponder rather than react-native-gesture-handler, which is also
 * installed: this needs one axis, one finger, and no negotiation with a scroll
 * view's gesture, so the platform's own answer is the smaller one.
 *
 * ## The value is committed on release, not during the drag
 *
 * Settings autosave: every change to the store writes the whole blob to
 * AsyncStorage. Calling `onChange` per move event would issue a write per frame
 * for the length of a drag. So the thumb follows the finger from local state and
 * the store hears once, at the end — which is also the moment the value is what
 * the player actually meant.
 */

const TRACK_HEIGHT = 4;
const THUMB = 22;
/** The row stays a 44pt target even though the track it draws is 4pt tall. */
const ROW_HEIGHT = theme.hit.min;

export function VolumeSlider({
  volume,
  onChange,
  disabled,
}: {
  volume: number;
  onChange: (next: number) => void;
  disabled: boolean;
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  /** Non-null only while a finger is down. The thumb follows this, not the prop. */
  const [dragging, setDragging] = useState<number | null>(null);

  /*
   * PanResponder is built once and would otherwise close over the first render's
   * width and callback forever — the classic stale-closure bug, and here it
   * would present as a slider that works until the screen re-renders and then
   * silently computes against a width of zero.
   */
  const latest = useRef({ trackWidth, onChange, disabled, volume });
  latest.current = { trackWidth, onChange, disabled, volume };

  const valueAt = (x: number): number => {
    const w = latest.current.trackWidth;
    if (w <= 0) return latest.current.volume;
    return Math.min(1, Math.max(0, x / w));
  };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !latest.current.disabled,
        onMoveShouldSetPanResponder: () => !latest.current.disabled,
        onPanResponderGrant: (e) => setDragging(valueAt(e.nativeEvent.locationX)),
        onPanResponderMove: (e) => setDragging(valueAt(e.nativeEvent.locationX)),
        onPanResponderRelease: (e) => {
          const next = valueAt(e.nativeEvent.locationX);
          setDragging(null);
          latest.current.onChange(next);
        },
        // A cancelled gesture — a call arriving, a parent claiming the responder
        // — must not leave the thumb parked somewhere the player never chose.
        onPanResponderTerminate: () => setDragging(null),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const shown = dragging ?? volume;
  const step = stepForVolume(shown);

  return (
    <View
      style={styles.row}
      onLayout={(e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)}
      /*
       * One adjustable element, as the rail had. A screen reader user changes
       * this by swiping up and down, and the increments land on the same six
       * stops the rail used — a continuous drag is a pointer affordance, and
       * offering a swipe a hundred indistinguishable stops is not a finer
       * control, only a slower one.
       */
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Sound effects volume"
      accessibilityValue={{ min: 0, max: VOLUME_STEPS, now: step, text: volumeStepLabel(step) }}
      accessibilityState={{ disabled }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(event) => {
        if (disabled) return;
        const delta = event.nativeEvent.actionName === 'increment' ? 1 : -1;
        const next = Math.min(VOLUME_STEPS, Math.max(0, step + delta));
        if (next !== step) onChange(volumeForStep(next));
      }}
      {...pan.panHandlers}
    >
      <View style={[styles.track, disabled && styles.dim]}>
        <View style={[styles.fill, { width: `${shown * 100}%` }]} />
      </View>
      <View
        style={[
          styles.thumb,
          disabled && styles.dim,
          // Travel is the track minus one thumb, so the thumb stays inside its
          // own track at both ends rather than hanging off them.
          { left: shown * Math.max(trackWidth - THUMB, 0) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { height: ROW_HEIGHT, justifyContent: 'center' },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: theme.color.rail,
    overflow: 'hidden',
  },
  fill: { height: TRACK_HEIGHT, backgroundColor: theme.color.accent },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: theme.color.accent,
    // A ring in the page colour, so the thumb keeps its edge where it overlaps
    // the filled part of its own track.
    borderWidth: 2,
    borderColor: theme.color.bg,
  },
  dim: { opacity: 0.4 },
});
