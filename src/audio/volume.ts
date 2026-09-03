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

/**
 * How loud a looping background bed sits under everything else.
 *
 * Half the cue level. Background music mixed at the same gain as a text tone
 * stops being background — it competes with the thing the player is actually
 * doing, which here is reading somebody's messages.
 *
 * It was a fifth, and a fifth was wrong. The bed files were also normalised to
 * half scale, and the two attenuations compounded: at the default slider the
 * bed reached the speaker at roughly -36dBFS, under the noise floor of an
 * ordinary room. Combined with a fundamental below what a phone speaker can
 * reproduce at all, the result was seventeen background tracks that nobody has
 * ever heard. The files are now normalised to 0.85 and pitched an octave and a
 * half higher; this is the runtime half of the same fix.
 */
const BED_GAIN = 0.5;

/**
 * Whether a bed should play at all, and how loud.
 *
 * Lives here rather than beside the bed registry for a mechanical reason worth
 * knowing: `beds.ts` is a list of `require` calls on WAV files, and requiring a
 * binary outside Metro throws, so anything in that file is untestable in Node.
 * `caseArtAssets.test.ts` documents the same constraint for the PNG map. Keeping
 * the arithmetic in this file — which imports nothing at all — is what lets the
 * rule below have tests.
 *
 * Reduce Motion silences beds outright, where a `signal` cue survives it. A
 * drone is the definition of a non-informational sound: it tells the player
 * nothing they could miss, so somebody who asked for less sensory load should
 * not be handed seventeen of them.
 */
export function resolveBedVolume(prefs: VolumePrefs): number {
  if (!prefs.soundEnabled) return 0;
  if (prefs.reduceMotion) return 0;
  return clamp01(amplitudeFor(prefs.soundVolume) * BED_GAIN);
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
