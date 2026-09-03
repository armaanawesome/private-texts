import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * A message that can go on the record must be VISIBLY marked on the device.
 *
 * This exists because the marking shipped twice and worked neither time, and
 * both failures were invisible to every other check in the repo:
 *
 *  1. A hairline border in `rule`, which players reported missing entirely.
 *  2. `fontWeight: '600'`, which does nothing at all on Android. `theme.type.body`
 *     sets `fontFamily: 'sans-serif'`, and React Native resolves a named Android
 *     family through `Typeface.create`, which understands only normal and bold —
 *     every numeric weight below 700 collapses back to regular. It rendered
 *     correctly in a desktop browser, which is exactly how it survived review.
 *
 * The suite was green through both, and could only ever have been green, because
 * nothing here renders on a phone. So this asserts the two properties that
 * decide whether a clue is noticeable, against the source itself — the same
 * source-scanning tactic `renameLeak.test.ts` uses, and for the same reason: a
 * convention in a comment rots, and this one rotted twice.
 *
 * WHAT THIS CANNOT SEE: whether the mark is noticeable to a person. It can only
 * prove the values have not silently slid back under the thresholds that made
 * the last two versions invisible.
 */

const SOURCE = readFileSync(join(__dirname, 'ChatBubble.tsx'), 'utf8');

/** The weights Android is guaranteed to honour on a named system family. */
const ANDROID_SAFE_WEIGHTS = ["'700'", "'800'", "'900'", "'bold'"];

function styleBlock(name: string): string {
  const start = SOURCE.indexOf(`${name}: {`);
  expect(start, `${name} is gone from ChatBubble.tsx`).toBeGreaterThan(-1);
  const end = SOURCE.indexOf('}', start);
  return SOURCE.slice(start, end + 1);
}

describe('claim marking survives Android', () => {
  it('sets the claim line at a weight Android actually renders', () => {
    const block = styleBlock('bodyClaim');
    const weight = /fontWeight:\s*('[^']+')/.exec(block)?.[1];
    expect(weight, 'bodyClaim declares no fontWeight').toBeDefined();
    expect(
      ANDROID_SAFE_WEIGHTS,
      `fontWeight ${weight} collapses to regular on Android — use '700'`,
    ).toContain(weight);
  });

  /**
   * Weight alone was not enough even once it worked: bold at 16px on a dark
   * bubble is a smaller step than it looks on a monitor. A second, non-typographic
   * axis is what makes the bubble read as marked while being scrolled past.
   */
  it('marks the bubble itself, not only its text', () => {
    const block = styleBlock('hasClaims');
    const edge = /borderLeftWidth:\s*([\d.]+)/.exec(block)?.[1];
    expect(edge, 'hasClaims has no borderLeftWidth — the bubble carries no edge').toBeDefined();
    expect(Number(edge)).toBeGreaterThanOrEqual(3);
    expect(block, 'the edge is not in the accent colour').toContain('theme.color.accent');
  });

  /** Both bubbles show the same message, so both have to mark it the same way. */
  it('applies the claim style in the interactive bubble and the lifted copy', () => {
    const uses = SOURCE.match(/styles\.bodyClaim/g) ?? [];
    expect(
      uses.length,
      'ChatBubble and StaticBubble must both use bodyClaim',
    ).toBeGreaterThanOrEqual(2);
  });
});
