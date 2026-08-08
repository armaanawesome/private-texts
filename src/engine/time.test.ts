import { describe, it, expect } from 'vitest';
import { windowsOverlap } from './time';

describe('windowsOverlap', () => {
  it('returns true for windows that partially overlap', () => {
    expect(windowsOverlap({ start: 10, end: 30 }, { start: 20, end: 40 })).toBe(true);
  });

  it('returns true when one window fully contains the other', () => {
    expect(windowsOverlap({ start: 0, end: 100 }, { start: 40, end: 50 })).toBe(true);
  });

  it('returns false for windows that merely touch at the boundary', () => {
    // Half-open intervals: [10,20) and [20,30) do not overlap.
    // "Left at 22:00" must not contradict "arrived at 22:00".
    expect(windowsOverlap({ start: 10, end: 20 }, { start: 20, end: 30 })).toBe(false);
  });

  it('returns false for clearly separate windows', () => {
    expect(windowsOverlap({ start: 0, end: 10 }, { start: 60, end: 70 })).toBe(false);
  });

  it('is symmetric', () => {
    const a = { start: 10, end: 30 };
    const b = { start: 25, end: 35 };
    expect(windowsOverlap(a, b)).toBe(windowsOverlap(b, a));
  });
});
