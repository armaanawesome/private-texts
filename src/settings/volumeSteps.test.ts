import { describe, it, expect } from 'vitest';
import { VOLUME_STEPS, stepForVolume, volumeForStep, volumeStepLabel } from './volumeSteps';

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
