import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  VOLUME_STEPS,
  stepForVolume,
  volumeAtPosition,
  volumeForStep,
  volumeStepLabel,
} from './volumeSteps';

/**
 * The slider must measure the gesture in WINDOW coordinates.
 *
 * This shipped reading `e.nativeEvent.locationX`, which is the touch position
 * relative to the view *under the finger* rather than to the element holding the
 * responder. The thumb is a 22pt child on the track, so a drag — which begins by
 * grabbing the thumb — collapsed the reading to 0..22 measured inside the thumb.
 * Divided by the track width, that pinned the volume at about 0.2, and no drag
 * could exceed it.
 *
 * It was not merely a stuck control. Touching the slider once COMMITTED 0.2, and
 * 0.2 squared is 0.04 amplitude, so every cue and bed landed near -35dBFS. One
 * tap on the volume control permanently muted the game, and three rounds of
 * fixing the audio pipeline could not recover it, because the fault was upstream
 * of all of them.
 *
 * The arithmetic below is pure and was always correct — it was fed the wrong
 * number. So this asserts on the component's source, which is the only place the
 * mistake can live and the only part of it a Node suite can reach.
 */
const SLIDER = readFileSync(join(__dirname, 'VolumeSlider.tsx'), 'utf8');

describe('the volume gesture is measured in window coordinates', () => {
  it('never reads locationX, which is relative to whichever child is touched', () => {
    const code = SLIDER.split('\n')
      .filter((l) => !l.trim().startsWith('*') && !l.trim().startsWith('//'))
      .join('\n');
    expect(code).not.toMatch(/locationX/);
  });

  it('reads the gesture state, which is absolute', () => {
    expect(SLIDER).toMatch(/g\.moveX/);
    expect(SLIDER).toMatch(/g\.x0/);
  });

  /** An absolute X is only a position on the track once the origin is known. */
  it('subtracts the measured origin of the track', () => {
    expect(SLIDER).toMatch(/measureInWindow/);
  });
});

describe('stepForVolume', () => {
  it('maps silence and full travel to the ends', () => {
    expect(stepForVolume(0)).toBe(0);
    expect(stepForVolume(1)).toBe(VOLUME_STEPS);
  });

  it('maps the stored default onto a real step', () => {
    // 0.7 is DEFAULT_SETTINGS.soundVolume. If this ever rounded to something
    // outside 1..6 the rail would open with nothing lit on a fresh install.
    const step = stepForVolume(0.7);
    expect(step).toBeGreaterThan(0);
    expect(step).toBeLessThanOrEqual(VOLUME_STEPS);
  });

  it('clamps values from outside the range instead of returning a phantom step', () => {
    expect(stepForVolume(-1)).toBe(0);
    expect(stepForVolume(4)).toBe(VOLUME_STEPS);
    expect(stepForVolume(Number.NaN)).toBe(0);
  });
});

describe('volumeForStep', () => {
  it('maps the ends back to silence and full travel', () => {
    expect(volumeForStep(0)).toBe(0);
    expect(volumeForStep(VOLUME_STEPS)).toBe(1);
  });

  it('clamps a step from outside the rail', () => {
    expect(volumeForStep(-2)).toBe(0);
    expect(volumeForStep(99)).toBe(1);
    expect(volumeForStep(Number.NaN)).toBe(0);
  });
});

describe('the two together', () => {
  it('round-trips every step the rail can produce', () => {
    // Tapping a bar writes volumeForStep(n) and the rail then re-reads it with
    // stepForVolume. If these disagreed the bar you tapped would not be the bar
    // that lit up.
    for (let step = 0; step <= VOLUME_STEPS; step++) {
      expect(stepForVolume(volumeForStep(step))).toBe(step);
    }
  });
});

describe('volumeStepLabel', () => {
  it('names silence rather than counting it', () => {
    expect(volumeStepLabel(0)).toBe('Muted');
  });

  it('reads as a position on the rail', () => {
    expect(volumeStepLabel(3)).toBe('Level 3 of 6');
    expect(volumeStepLabel(VOLUME_STEPS)).toBe('Level 6 of 6');
  });
});


/**
 * The slider's only arithmetic.
 *
 * The gesture that feeds it needs a device and cannot be exercised here — a
 * synthetic pointer event does not reach React's responder system reliably
 * enough to prove anything. The sum it performs is testable, so it is tested,
 * and what is left for the device is genuinely only "does a finger reach this".
 */
describe('volumeAtPosition', () => {
  it('maps the left edge to silence and the right edge to full', () => {
    expect(volumeAtPosition(0, 300, 0.5)).toBe(0);
    expect(volumeAtPosition(300, 300, 0.5)).toBe(1);
  });

  it('maps the middle to half', () => {
    expect(volumeAtPosition(150, 300, 0)).toBeCloseTo(0.5, 5);
  });

  /** A finger dragged off the end of the track, which is normal, not an error. */
  it('clamps a touch that travelled past either end', () => {
    expect(volumeAtPosition(-80, 300, 0.5)).toBe(0);
    expect(volumeAtPosition(420, 300, 0.5)).toBe(1);
  });

  /**
   * The case this guard exists for. A layout event can arrive after the first
   * touch, or never at all on a view that was never measured. Dividing by that
   * width sends the result to Infinity, which clamps to FULL VOLUME — so the
   * unmeasured slider would not merely misbehave, it would go loud.
   */
  it('returns the current volume rather than dividing by an unmeasured width', () => {
    expect(volumeAtPosition(120, 0, 0.3)).toBe(0.3);
    expect(volumeAtPosition(120, -1, 0.3)).toBe(0.3);
    expect(volumeAtPosition(120, Number.NaN, 0.3)).toBe(0.3);
  });

  it('agrees with the step helpers at the ends', () => {
    expect(stepForVolume(volumeAtPosition(0, 300, 0.5))).toBe(0);
    expect(stepForVolume(volumeAtPosition(300, 300, 0.5))).toBe(VOLUME_STEPS);
    expect(volumeForStep(VOLUME_STEPS)).toBe(1);
  });
});
