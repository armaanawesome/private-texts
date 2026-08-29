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
/**
 * Where along a track a touch landed, as a volume.
 *
 * Pulled out of the slider component because it is the only arithmetic in it,
 * and inside a component it cannot be tested in the Node suite at all — the
 * gesture that feeds it needs a device, but the sum it performs does not.
 *
 * The zero-width guard is the case that matters. A layout event can arrive
 * after the first touch, or never on a view that was never measured, and
 * dividing by that width would send the volume to Infinity and clamp it to
 * full. Returning the current value instead means an unmeasured slider does
 * nothing rather than something violent.
 */
export function volumeAtPosition(x: number, width: number, current: number): number {
  if (!(width > 0)) return current;
  return Math.min(1, Math.max(0, x / width));
}

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
