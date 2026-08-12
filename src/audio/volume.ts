/**
 * How loud a cue actually plays.
 *
 * Imports nothing — not expo-audio, not React, not the settings store — so every
 * rule below is testable in plain Node. The service in sound.ts does no
 * arithmetic of its own; it asks this file and obeys.
 */

/**
 * What a cue is *for*, which is what decides whether Reduce Motion silences it.
 *
 * - `signal` carries information the player needs: a contradiction landed.
 * - `flourish` is redundant with something already on screen: a bubble arriving,
 *   a chip lighting up.
 */
export type CueRole = 'signal' | 'flourish';

export interface VolumePrefs {
  readonly soundEnabled: boolean;
  /** The slider position the player set, 0–1. */
  readonly soundVolume: number;
  readonly reduceMotion: boolean;
}

export interface CueGain {
  readonly role: CueRole;
  /** This cue's loudness relative to the others, 0–1. Authored, not chosen by the player. */
  readonly gain: number;
}

export function clamp01(n: number): number {
  // NaN fails both comparisons below and would fall through as NaN, which would
  // reach the native player as a volume and behave differently per platform.
  if (Number.isNaN(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

/**
 * Slider position to amplitude.
 *
 * Loudness is not linear in amplitude. Wiring a slider straight to gain puts
 * almost the entire audible range in the bottom third of the travel: the top two
 * thirds all sound like "full", and the control feels broken. Squaring the
 * position spreads the range across the whole rail, which is the difference
 * between a volume control that works and one that only appears to.
 */
export function amplitudeFor(sliderPosition: number): number {
  const p = clamp01(sliderPosition);
  return p * p;
}

export function resolveVolume(prefs: VolumePrefs, cue: CueGain): number {
  if (!prefs.soundEnabled) return 0;

  // Reduce Motion is the only "less sensory noise" preference this app has, so
  // it is the one that has to carry decorative sound too. Cues that carry
  // information keep playing: silencing those would hide the moment a
  // contradiction landed, and that moment is the game.
  if (prefs.reduceMotion && cue.role === 'flourish') return 0;

  return clamp01(amplitudeFor(prefs.soundVolume) * clamp01(cue.gain));
}
