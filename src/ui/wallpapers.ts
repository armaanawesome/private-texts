/**
 * The ten chat backdrops, and the rule that assigns them.
 *
 * Imports nothing — not react-native, not React — so every rule below is
 * testable in plain Node. `ChatWallpaper.tsx` does the drawing and owns the only
 * `View` in the feature.
 *
 * That split is not tidiness. A test importing the component fails outright:
 * vitest cannot parse `node_modules/react-native/index.js`, so any assertion
 * about wallpaper assignment would be untestable if it lived beside the JSX.
 * `src/audio/volume.ts` exists for exactly the same reason, and
 * `caseArtAssets.test.ts` documents the trap.
 */

/** A motif name; `ChatWallpaper` knows how to draw each one from bordered Views. */
export type Shape =
  | 'clock'
  | 'bubble'
  | 'lens'
  | 'key'
  | 'cross'
  | 'envelope'
  | 'lock'
  | 'print'
  | 'pin'
  | 'link'
  | 'tally'
  | 'pane';

export interface Wallpaper {
  readonly name: string;
  /** The field. Always darker than a bubble. */
  readonly field: string;
  /** The line colour. */
  readonly ink: string;
  readonly shapes: readonly [Shape, Shape, Shape];
  readonly rows: number;
  readonly columns: number;
  /** Line opacity, tuned per theme: a cool ink on a cool field needs more than a warm one. */
  readonly opacity: number;
}

/**
 * Ten backdrops.
 *
 * What varies: the field colour, the ink, the three motifs, the grid density.
 * What does not: hairline stroke, ~30px motifs, low opacity, dark field. That
 * split is what lets ten backdrops be obviously different from each other and
 * obviously the same product.
 *
 * Every field is darker than `theme.color.bubbleThem` (#22262D), the rule that
 * keeps a bubble reading as a bubble on all ten. `chatWallpaper.test.ts`
 * enforces it, along with a minimum ink-to-field separation — the first version
 * of this feature shipped a motif that was technically present and practically
 * invisible, and a number in a comment would not have stopped the second.
 *
 * Typed as a non-empty tuple, not `readonly Wallpaper[]`: under
 * `noUncheckedIndexedAccess` every index into a plain array is possibly
 * undefined, including the `[0]` used as a fallback.
 */
const WALLPAPERS: readonly [Wallpaper, ...Wallpaper[]] = [
  {
    name: 'ink',
    field: '#0D1218',
    ink: '#7FA6C9',
    shapes: ['clock', 'lens', 'cross'],
    rows: 10,
    columns: 5,
    opacity: 0.17,
  },
  {
    name: 'oxblood',
    field: '#150E10',
    ink: '#C98F8F',
    shapes: ['bubble', 'key', 'tally'],
    rows: 9,
    columns: 5,
    opacity: 0.18,
  },
  {
    name: 'forest',
    field: '#0C1310',
    ink: '#7FC7A4',
    shapes: ['pane', 'clock', 'link'],
    rows: 11,
    columns: 5,
    opacity: 0.16,
  },
  {
    name: 'umber',
    field: '#16110C',
    ink: '#C7A87F',
    shapes: ['key', 'envelope', 'pin'],
    rows: 9,
    columns: 4,
    opacity: 0.19,
  },
  {
    name: 'slate',
    field: '#0B1114',
    ink: '#7FBFC7',
    shapes: ['print', 'bubble', 'cross'],
    rows: 10,
    columns: 5,
    opacity: 0.16,
  },
  {
    name: 'plum',
    field: '#130E16',
    ink: '#B08FC7',
    shapes: ['lock', 'link', 'tally'],
    rows: 10,
    columns: 4,
    opacity: 0.18,
  },
  {
    name: 'charcoal',
    field: '#101113',
    ink: '#9AA0A6',
    shapes: ['tally', 'pane', 'clock'],
    rows: 12,
    columns: 6,
    opacity: 0.15,
  },
  {
    name: 'teal',
    field: '#0A1315',
    ink: '#6FB3B8',
    shapes: ['envelope', 'lens', 'pin'],
    rows: 9,
    columns: 5,
    opacity: 0.17,
  },
  {
    name: 'rose',
    field: '#150F13',
    ink: '#C78FA6',
    shapes: ['bubble', 'print', 'link'],
    rows: 10,
    columns: 5,
    opacity: 0.17,
  },
  {
    name: 'olive',
    field: '#111308',
    ink: '#B5BE7F',
    shapes: ['lock', 'key', 'pane'],
    rows: 11,
    columns: 5,
    opacity: 0.16,
  },
];

/** How many distinct backdrops exist. */
export const WALLPAPER_COUNT = WALLPAPERS.length;

/** FNV-1a. Deterministic, so a wallpaper never reshuffles between renders. */
export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/**
 * Which backdrop a conversation gets — **by seat in the case's roster, not by
 * hashing the contact.**
 *
 * Hashing was the first attempt and it fails at the one thing the feature is
 * for. Five contacts drawn independently from ten wallpapers collide about
 * seventy percent of the time, and a collision inside a single case is exactly
 * where it shows: `tutorial:tom` and `tutorial:ivy` both landed on plum, so two
 * of the Bakehouse's threads looked identical. Indexing by position in the
 * roster makes every contact in a case distinct by construction, for any case
 * with ten or fewer people — which is all of them.
 *
 * A group thread has no single contact, so it takes a seat *past* the roster,
 * chosen from what is left over. That keeps it clear of every one-to-one
 * backdrop in the same case.
 */
export function wallpaperIndexFor(
  roster: readonly string[],
  contactId: string | undefined,
  threadId: string,
): number {
  const seat = contactId === undefined ? -1 : roster.indexOf(contactId);
  if (seat >= 0) return seat % WALLPAPER_COUNT;

  const spare = Math.max(1, WALLPAPER_COUNT - roster.length);
  return (roster.length + (hashSeed(threadId) % spare)) % WALLPAPER_COUNT;
}

/** The backdrop at an index, wrapped into range. */
export function wallpaperAt(index: number): Wallpaper {
  const i = ((Math.trunc(index) % WALLPAPER_COUNT) + WALLPAPER_COUNT) % WALLPAPER_COUNT;
  return WALLPAPERS[i] ?? WALLPAPERS[0];
}
