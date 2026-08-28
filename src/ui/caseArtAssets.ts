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
export const CASE_ART: Readonly<Record<string, number>> = {
  tutorial: require('../../assets/cases/tutorial.png'),
  'the-lighthouse': require('../../assets/cases/the-lighthouse.png'),
  'the-understudy': require('../../assets/cases/the-understudy.png'),
  'the-night-round': require('../../assets/cases/the-night-round.png'),
  'the-wake': require('../../assets/cases/the-wake.png'),
  'the-listener': require('../../assets/cases/the-listener.png'),
};

/** The painted cover for a case, or undefined while it still uses the generated one. */
export function artFor(caseId: string): number | undefined {
  return CASE_ART[caseId];
}
