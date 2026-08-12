/**
 * The volume control is stepped, not continuous.
 *
 * A continuous slider means `@react-native-community/slider`, which is a native
 * module and a dev-client rebuild. It is also the wrong control: this app's
 * whole visual language is bars drawn on a shared rail — the case poster, the
 * comparison sheet — and six discrete bars fit that language, are far easier to
 * hit than a 4pt thumb, and are the only version of this control a screen reader
 * can describe honestly.
 *
 * Pure, so the arithmetic is tested without a renderer.
 */

/** Six audible steps, plus silence at 0. */
export const VOLUME_STEPS = 6;

/** The step a stored 0–1 position sits on. */
export function stepForVolume(volume: number): number {
  if (Number.isNaN(volume)) return 0;
  const clamped = Math.min(1, Math.max(0, volume));
  return Math.round(clamped * VOLUME_STEPS);
}

/** The 0–1 position a step means. */
export function volumeForStep(step: number): number {
  if (Number.isNaN(step)) return 0;
  const clamped = Math.min(VOLUME_STEPS, Math.max(0, Math.round(step)));
  return clamped / VOLUME_STEPS;
}

/**
 * What a screen reader says for the current step.
 *
 * Step 0 is reachable — an old build or the accessibility decrement action can
 * both land there — so it needs a word, not "0 of 6", which reads as broken
 * rather than as a state someone chose.
 */
export function volumeStepLabel(step: number): string {
  const clamped = Math.min(VOLUME_STEPS, Math.max(0, Math.round(step)));
  return clamped === 0 ? 'Muted' : `Level ${clamped} of ${VOLUME_STEPS}`;
}
