import { useReducedMotion } from 'react-native-reanimated';
import { useSettingsStore } from './settingsStore';

/**
 * Whether to collapse motion, from either source.
 *
 * Screens used to call reanimated's `useReducedMotion` directly, which reads
 * only the OS accessibility switch. That left no way for the game to offer the
 * preference itself — and plenty of people want a game to stop moving without
 * turning it off for their whole phone.
 *
 * Either source wins. A player who set it at the OS level should never have to
 * set it again here, and one who set it here should not be overruled because
 * their phone says nothing.
 *
 * Use this instead of `useReducedMotion` in every screen.
 */
export function useReduceMotion(): boolean {
  const system = useReducedMotion();
  const preference = useSettingsStore((s) => s.settings.reduceMotion);
  return system || preference;
}
