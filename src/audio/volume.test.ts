import { describe, it, expect } from 'vitest';
import { amplitudeFor, clamp01, resolveVolume, type CueGain, type VolumePrefs } from './volume';

const on: VolumePrefs = { soundEnabled: true, soundVolume: 1, reduceMotion: false };
const signal: CueGain = { role: 'signal', gain: 1 };
const flourish: CueGain = { role: 'flourish', gain: 1 };

describe('clamp01', () => {
  it('passes values already inside the range', () => {
    expect(clamp01(0)).toBe(0);
    expect(clamp01(0.5)).toBe(0.5);
    expect(clamp01(1)).toBe(1);
  });

  it('clamps both ends', () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(9)).toBe(1);
  });

  it('turns NaN into silence rather than passing it to the native player', () => {
    // NaN fails every comparison, so an unguarded clamp returns it unchanged and
    // each platform then does something different with it.
    expect(clamp01(Number.NaN)).toBe(0);
  });
});

describe('amplitudeFor', () => {
  it('keeps the ends of the travel honest', () => {
    expect(amplitudeFor(0)).toBe(0);
    expect(amplitudeFor(1)).toBe(1);
  });

  it('puts the midpoint well below half amplitude', () => {
    // This is the whole point of the curve. A linear map would return 0.5 here,
    // which is barely quieter than full and makes the top half of the rail dead.
    expect(amplitudeFor(0.5)).toBeCloseTo(0.25);
  });

  it('rises monotonically across the travel', () => {
    const points = [0, 0.2, 0.4, 0.6, 0.8, 1].map(amplitudeFor);
    for (let i = 1; i < points.length; i++) {
      expect(points[i]!).toBeGreaterThan(points[i - 1]!);
    }
  });

  it('clamps a position from outside the range', () => {
    expect(amplitudeFor(-1)).toBe(0);
    expect(amplitudeFor(4)).toBe(1);
  });
});

describe('resolveVolume', () => {
  it('is silent whenever sound is switched off, whatever the slider says', () => {
    expect(resolveVolume({ ...on, soundEnabled: false }, signal)).toBe(0);
  });

  it('plays a cue at full travel and full gain at full amplitude', () => {
    expect(resolveVolume(on, signal)).toBe(1);
  });

  it("scales by the cue's own authored gain", () => {
    expect(resolveVolume(on, { role: 'signal', gain: 0.5 })).toBeCloseTo(0.5);
  });

  it('applies the perceptual curve to the slider position', () => {
    expect(resolveVolume({ ...on, soundVolume: 0.5 }, signal)).toBeCloseTo(0.25);
  });

  describe('with Reduce Motion on', () => {
    const quiet: VolumePrefs = { ...on, reduceMotion: true };

    it('silences a flourish, which is redundant with something already on screen', () => {
      expect(resolveVolume(quiet, flourish)).toBe(0);
    });

    it('leaves a signal audible, because it is the only report of what happened', () => {
      expect(resolveVolume(quiet, signal)).toBe(1);
    });
  });

  it('never returns more than 1, even if a cue is authored with too much gain', () => {
    expect(resolveVolume(on, { role: 'signal', gain: 4 })).toBe(1);
  });

  it('never returns a negative volume', () => {
    expect(resolveVolume({ ...on, soundVolume: -1 }, signal)).toBe(0);
    expect(resolveVolume(on, { role: 'signal', gain: -1 })).toBe(0);
  });
});
