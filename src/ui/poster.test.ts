import { describe, it, expect } from 'vitest';
import { posterBarsFor } from './poster';

const span = (start: number, end: number) => ({ window: { start, end } });

/**
 * The case-pack grid needs a distinct image per case, and there are no image
 * assets and no SVG library (adding one would force another native build).
 *
 * So a poster is drawn from the case's own testimony: every claim becomes a bar
 * on a shared clock. It is abstract, it is different for every case for free,
 * and it is the same geometry the comparison sheet uses — the cover art is
 * literally the evidence.
 */
describe('posterBarsFor', () => {
  it('stretches the earliest and latest moments to the full width', () => {
    const bars = posterBarsFor([span(100, 200), span(300, 400)], 8);
    expect(bars[0]!.left).toBeCloseTo(0);
    const last = bars[bars.length - 1]!;
    expect(last.left + last.width).toBeCloseTo(1);
  });

  it('keeps every bar inside the frame', () => {
    const bars = posterBarsFor([span(0, 10), span(5, 900), span(880, 1000)], 8);
    for (const b of bars) {
      expect(b.left).toBeGreaterThanOrEqual(0);
      expect(b.left + b.width).toBeLessThanOrEqual(1.0001);
    }
  });

  it('caps the number of bars so a long case does not draw a solid block', () => {
    const many = Array.from({ length: 40 }, (_, i) => span(i * 10, i * 10 + 5));
    expect(posterBarsFor(many, 7)).toHaveLength(7);
  });

  it('gives a single claim a visible bar instead of dividing by zero', () => {
    const bars = posterBarsFor([span(500, 501)], 8);
    expect(bars).toHaveLength(1);
    expect(bars[0]!.width).toBeGreaterThan(0);
    expect(Number.isFinite(bars[0]!.left)).toBe(true);
  });

  it('never returns a zero-width bar, however short the claim', () => {
    const bars = posterBarsFor([span(0, 1), span(0, 1000)], 8);
    for (const b of bars) expect(b.width).toBeGreaterThan(0);
  });

  it('returns nothing when there is nothing to draw', () => {
    expect(posterBarsFor([], 8)).toEqual([]);
  });

  it('is deterministic — the same case always draws the same poster', () => {
    const claims = [span(100, 200), span(150, 400), span(380, 390)];
    expect(posterBarsFor(claims, 6)).toEqual(posterBarsFor(claims, 6));
  });
});
