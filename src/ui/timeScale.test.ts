import { describe, it, expect } from 'vitest';
import { domainFor, fractionOf, overlapOf, clockOf } from './timeScale';

/**
 * The geometry behind the comparison sheet.
 *
 * This is the one place the game's central claim — "one person, two places, the
 * same moment" — becomes something you can see rather than read. If the maths is
 * off by a few percent the two bars stop lining up with the times printed under
 * them, and the player is being asked to trust a picture that lies.
 *
 * Kept pure and out of the component so it can be tested without a renderer.
 */
describe('domainFor', () => {
  it('spans both windows', () => {
    const d = domainFor({ start: 1230, end: 1380 }, { start: 1305, end: 1320 });
    expect(d.start).toBeLessThanOrEqual(1230);
    expect(d.end).toBeGreaterThanOrEqual(1380);
  });

  it('pads so neither bar bleeds off the edge of the axis', () => {
    const d = domainFor({ start: 1200, end: 1300 }, { start: 1200, end: 1300 });
    expect(d.start).toBeLessThan(1200);
    expect(d.end).toBeGreaterThan(1300);
  });

  it('never collapses to zero width, even for two identical instants', () => {
    // A point-in-time claim uses end = start + 1. Two of them would otherwise
    // divide by zero and put every bar at NaN%.
    const d = domainFor({ start: 1000, end: 1001 }, { start: 1000, end: 1001 });
    expect(d.end - d.start).toBeGreaterThan(0);
  });
});

describe('fractionOf', () => {
  const domain = { start: 1200, end: 1400 };

  it('maps the domain start to 0 and the end to 1', () => {
    expect(fractionOf(domain, 1200)).toBe(0);
    expect(fractionOf(domain, 1400)).toBe(1);
  });

  it('maps the midpoint to a half', () => {
    expect(fractionOf(domain, 1300)).toBeCloseTo(0.5);
  });

  it('clamps outside the domain rather than returning a negative width', () => {
    expect(fractionOf(domain, 1100)).toBe(0);
    expect(fractionOf(domain, 1500)).toBe(1);
  });
});

describe('overlapOf', () => {
  it('returns the shared interval of two overlapping windows', () => {
    // Mairi: café 20:30-23:00 against the path 21:45-22:00.
    expect(overlapOf({ start: 1230, end: 1380 }, { start: 1305, end: 1320 })).toEqual({
      start: 1305,
      end: 1320,
    });
  });

  it('returns null for windows that only touch at a boundary', () => {
    // Half-open intervals: 22:00 is not inside a window that ends at 22:00.
    // Esme on the path 21:40-22:10 and Callum's sighting 22:05-22:15 rely on this.
    expect(overlapOf({ start: 1300, end: 1320 }, { start: 1320, end: 1340 })).toBeNull();
  });

  it('returns null for windows that never meet', () => {
    expect(overlapOf({ start: 1140, end: 1200 }, { start: 1300, end: 1335 })).toBeNull();
  });

  it('is order independent', () => {
    const a = { start: 1230, end: 1380 };
    const b = { start: 1305, end: 1320 };
    expect(overlapOf(a, b)).toEqual(overlapOf(b, a));
  });
});

describe('clockOf', () => {
  it('formats minutes since the case epoch as a 24-hour clock', () => {
    expect(clockOf(1305)).toBe('21:45');
    expect(clockOf(1230)).toBe('20:30');
  });

  it('pads single digits so the axis labels stay the same width', () => {
    // Ragged labels make the axis look broken at a glance.
    expect(clockOf(545)).toBe('09:05');
    expect(clockOf(0)).toBe('00:00');
  });

  it('wraps past midnight instead of printing 25:00', () => {
    expect(clockOf(1440)).toBe('00:00');
    expect(clockOf(1500)).toBe('01:00');
  });
});
