import { describe, it, expect } from 'vitest';
import { CASES } from '../../content/cases/index';
import { WALLPAPER_COUNT, wallpaperAt, wallpaperIndexFor } from './wallpapers';

/**
 * Every contact in a case gets a visibly different backdrop.
 *
 * The first implementation hashed the contact id, which fails at exactly the
 * thing the feature exists for: five contacts drawn independently from ten
 * wallpapers collide about seventy percent of the time, and `tutorial:tom` and
 * `tutorial:ivy` did — two of the Bakehouse's threads looked identical. Seating
 * by roster position makes it true by construction, and this is the check that
 * keeps it true when somebody adds an eleventh character or a seventeenth case.
 *
 * WHAT THIS CANNOT SEE: whether the ten actually look different to a person. It
 * proves they are different *records*, and that the palette rules hold.
 */

/** `theme.color.bubbleThem`. A field lighter than this stops bubbles reading as bubbles. */
const BUBBLE = 0x22262d;

function asNumber(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

function channels(hex: string): [number, number, number] {
  const n = asNumber(hex);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

describe('wallpaperIndexFor', () => {
  it('gives every contact in a case its own backdrop', () => {
    for (const c of CASES) {
      const roster = c.characters.filter((ch) => ch.id !== 'you').map((ch) => ch.id);
      // A case with more people than there are wallpapers cannot satisfy this,
      // and would need more wallpapers rather than a cleverer assignment.
      expect(roster.length, `${c.id} has more contacts than wallpapers`).toBeLessThanOrEqual(
        WALLPAPER_COUNT,
      );

      const seen = new Set<number>();
      for (const id of roster) {
        const index = wallpaperIndexFor(roster, id, `t-${id}`);
        expect(seen.has(index), `${c.id}: ${id} reuses a backdrop`).toBe(false);
        seen.add(index);
      }
    }
  });

  it('keeps a group thread clear of every one-to-one backdrop in its case', () => {
    for (const c of CASES) {
      const roster = c.characters.filter((ch) => ch.id !== 'you').map((ch) => ch.id);
      if (roster.length >= WALLPAPER_COUNT) continue;
      const soloIndexes = new Set(roster.map((id) => wallpaperIndexFor(roster, id, `t-${id}`)));
      for (const thread of c.threads) {
        const others = thread.participantIds.filter((id) => id !== 'you');
        if (others.length <= 1) continue;
        const index = wallpaperIndexFor(roster, undefined, thread.id);
        expect(soloIndexes.has(index), `${c.id}: group ${thread.id} clashes`).toBe(false);
      }
    }
  });

  it('is stable — the same contact always gets the same backdrop', () => {
    const roster = ['a', 'b', 'c'];
    expect(wallpaperIndexFor(roster, 'b', 't')).toBe(wallpaperIndexFor(roster, 'b', 't'));
  });

  it('never returns an index outside the set, even for an unknown contact', () => {
    for (const id of ['', 'nobody', 'x'.repeat(200)]) {
      const index = wallpaperIndexFor(['a'], id, id);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(WALLPAPER_COUNT);
    }
  });
});

describe('the ten backdrops', () => {
  const all = Array.from({ length: WALLPAPER_COUNT }, (_, i) => wallpaperAt(i));

  it('are all darker than a message bubble', () => {
    for (const w of all) {
      expect(asNumber(w.field), `${w.name} field is too light`).toBeLessThan(BUBBLE);
    }
  });

  /** Ten backdrops that share a colour are one backdrop with extra steps. */
  it('have distinct fields and distinct inks', () => {
    expect(new Set(all.map((w) => w.field)).size).toBe(WALLPAPER_COUNT);
    expect(new Set(all.map((w) => w.ink)).size).toBe(WALLPAPER_COUNT);
  });

  /**
   * The ink has to survive being drawn at ~17% over its own field. Requiring a
   * real gap on at least one channel is what stops a theme being invented that
   * repeats the first wallpaper's mistake of being technically present and
   * practically invisible.
   */
  it('draws ink that separates from the field it sits on', () => {
    for (const w of all) {
      const [fr, fg, fb] = channels(w.field);
      const [ir, ig, ib] = channels(w.ink);
      const gap = Math.max(Math.abs(ir - fr), Math.abs(ig - fg), Math.abs(ib - fb));
      expect(gap, `${w.name} ink is too close to its field`).toBeGreaterThan(80);
    }
  });

  it('keeps the shared vibe: three motifs each, sane grid, low opacity', () => {
    for (const w of all) {
      expect(w.shapes, `${w.name}`).toHaveLength(3);
      expect(w.rows).toBeGreaterThanOrEqual(8);
      expect(w.columns).toBeGreaterThanOrEqual(4);
      expect(w.opacity).toBeGreaterThanOrEqual(0.14);
      expect(w.opacity).toBeLessThanOrEqual(0.22);
    }
  });
});
