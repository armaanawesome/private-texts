import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSettingsStore } from '@/settings/settingsStore';
import { playBed } from './music';

/**
 * Play a background bed for as long as this screen is the one in front.
 *
 * ## Why focus and not mount
 *
 * `useEffect` is wrong here, and wrong in a way that only shows up on the way
 * back. Screens below the top of a stack stay MOUNTED — the home screen does not
 * unmount when a case opens — so a mount effect fires once on the way in and
 * never again. Going home from a case would leave the case's bed playing under
 * the case list, because nothing ever told it otherwise.
 *
 * `useFocusEffect` fires every time a screen returns to the front, so whichever
 * screen the player is actually looking at owns the sound. Nothing stops the bed
 * on blur, deliberately: the screen being revealed sets its own track a moment
 * later, and stopping first would punch a hole of silence into every navigation.
 *
 * Volume is in the dependency list so changing the slider or muting takes effect
 * on the bed already playing, rather than only on the next screen.
 */
export function useBed(trackId: string | null): void {
  const soundEnabled = useSettingsStore((s) => s.settings.soundEnabled);
  const soundVolume = useSettingsStore((s) => s.settings.soundVolume);
  const reduceMotion = useSettingsStore((s) => s.settings.reduceMotion);

  useFocusEffect(
    useCallback(() => {
      playBed(trackId, { soundEnabled, soundVolume, reduceMotion });
    }, [trackId, soundEnabled, soundVolume, reduceMotion]),
  );
}
