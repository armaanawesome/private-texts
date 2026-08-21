/**
 * The five helpers every pack test needs, in one place.
 *
 * Each pack test had been declaring its own copies — `numbers` and `paragraphs`
 * in thirty-five files, `clock` in thirty-one — and two translation agents
 * flagged it in the same round from opposite directions: one went looking for
 * something to reuse and found nothing, the other noticed it had pasted the
 * same block into eight files.
 *
 * What makes it worth a file rather than leaving alone is that a copy drifts.
 * `clock` had **three** distinct versions and two were missing the `mod 1440`
 * wrap. Not hypothetical: the Portuguese night round shipped with an unwrapped
 * one and every post-midnight claim read as a mismatch, because the engine
 * holds 01:00 as 25:00 in a case that starts the evening before. French had the
 * wrapped version and was fine. The bug was a property of which file the helper
 * had been copied out of.
 *
 * Deliberately not exported from `caseText.ts`, which is production code. These
 * are test plumbing and nothing under `src/` should be able to reach them.
 */

/**
 * Minutes past the case's own zero, as a wall clock.
 *
 * The wrap is the load-bearing part, and two packs show why at different
 * scales. `the-night-round` is a night shift, so the engine holds 01:00–02:00
 * as 25:00–26:00 — `clockOf` takes it mod 1440 and `domainFor` does not. `the-
 * wake` is worse: funeral day is **day 43**, so every window is tens of
 * thousands of minutes past the case epoch and an unwrapped divide renders
 * 16:00 as `1024:00`, failing every correct chip in the pack.
 */
export const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

/** Clock times a chip label actually prints, e.g. `21:40`. */
export const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];

/**
 * Every number in a string, sorted.
 *
 * Sorted rather than in order, because the check is that a translation states
 * the same facts — not that it states them in English word order, which is the
 * one thing a translation is entitled to change.
 */
export const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();

/** Paragraph count. A dropped break is a dropped beat, and reads as one. */
export const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

/**
 * Accents, punctuation and case removed, for comparing a name against prose.
 *
 * Deliberately lossy: it exists so `l’infirmerie` matches `L'infirmerie`. Where
 * a rule needs the raw string — a place name whose article a contracted
 * preposition would swallow — compare without folding instead.
 */
export const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
