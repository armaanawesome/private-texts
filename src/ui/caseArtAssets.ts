/**
 * Painted cover art, for the cases that have it.
 *
 * `CasePoster` draws every case's claim windows as bars, which was the right
 * answer while there were no image assets at all: a new pack got a distinct
 * poster for free with nothing to keep in sync. What it could not do is make
 * sixteen tiles look like sixteen different cases. Every reference grid — the
 * PlayStation library, DailyArt, Calm, TIDE — carries pictorial art with its
 * own palette and focal point, and a wall of bar charts in three accent colours
 * reads as one texture repeated.
 *
 * So: art where it exists, generated poster where it does not. The map is
 * deliberately partial and the fallback is deliberately permanent — a pack
 * without art still ships a tile that belongs, which is what lets art arrive
 * one case at a time rather than all sixteen or nothing.
 *
 * `poster.ts` says image assets were avoided because adding one would mean a
 * native rebuild. That is true of an SVG library and not of PNGs: Metro bundles
 * static images with no native module, so the constraint that produced the bars
 * never applied to this.
 *
 * Named `caseArtAssets` rather than `caseArt` because `CaseArt.tsx` sits beside
 * it, and on a case-insensitive filesystem two modules differing only in the
 * first letter resolve to the same file. TypeScript catches it; the error is
 * confusing enough to be worth naming here.
 *
 * The `require` calls must be literal — React Native resolves them at bundle
 * time, so this cannot be a loop over case ids.
 */
/*
 * The map is no longer partial: all sixteen cases have art, so the generated
 * poster is now a fallback nothing reaches. It stays anyway — a seventeenth case
 * should ship a tile that belongs on the day it is written, not on the day
 * somebody gets round to drawing it.
 *
 * The first six are 640×640; the ten added afterwards are 1080×1350. That is
 * deliberate rather than sloppy: `CaseArt` draws into a 3:4 frame with
 * `resizeMode="cover"`, so a square source loses roughly a quarter of itself top
 * and bottom, where a 4:5 source loses almost nothing. The newer covers were
 * generated at the aspect the grid actually renders.
 */
export const CASE_ART: Readonly<Record<string, number>> = {
  tutorial: require('../../assets/cases/tutorial.png'),
  'the-lighthouse': require('../../assets/cases/the-lighthouse.png'),
  'the-understudy': require('../../assets/cases/the-understudy.png'),
  'the-night-round': require('../../assets/cases/the-night-round.png'),
  'the-wake': require('../../assets/cases/the-wake.png'),
  'the-listener': require('../../assets/cases/the-listener.png'),
  'deep-field': require('../../assets/cases/deep-field.png'),
  'the-long-course': require('../../assets/cases/the-long-course.png'),
  'the-bothy': require('../../assets/cases/the-bothy.png'),
  'sunday-service': require('../../assets/cases/sunday-service.png'),
  'the-cut': require('../../assets/cases/the-cut.png'),
  'open-mic': require('../../assets/cases/open-mic.png'),
  'the-allotments': require('../../assets/cases/the-allotments.png'),
  'the-helpline': require('../../assets/cases/the-helpline.png'),
  'the-reunion': require('../../assets/cases/the-reunion.png'),
  'the-night-ferry': require('../../assets/cases/the-night-ferry.png'),
};

/** The painted cover for a case, or undefined while it still uses the generated one. */
export function artFor(caseId: string): number | undefined {
  return CASE_ART[caseId];
}
