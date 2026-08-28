import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CASES } from '../../content/cases/index';

/**
 * The art map and the files on disk cannot drift apart.
 *
 * `caseArtAssets.ts` is a hand-written map of case id to `require`, because React
 * Native resolves those at bundle time and a loop would not work. A hand-written
 * map rots: a case gets renamed, a file gets moved, and the tile either fails at
 * import or silently falls back to the generated poster and nobody notices for a
 * month.
 *
 * These checks run on ids and filenames rather than on the module, because
 * importing `caseArtAssets.ts` outside Metro would try to `require` a PNG. Same reason
 * `poster.test.ts` tests geometry without a renderer.
 */

const ART_DIR = join(__dirname, '../../assets/cases');
const artFiles = (): string[] =>
  existsSync(ART_DIR) ? readdirSync(ART_DIR).filter((f) => f.endsWith('.png')) : [];

describe('case cover art', () => {
  it('names every art file after a case that exists', () => {
    const ids = new Set(CASES.map((c) => c.id));
    const orphans = artFiles()
      .map((f) => f.replace(/\.png$/, ''))
      .filter((id) => !ids.has(id));

    expect(
      orphans,
      'art file names are case ids — a file naming no case is a rename that lost its picture',
    ).toEqual([]);
  });

  /**
   * Not an assertion that every case is painted. The fallback to the generated
   * poster is deliberate and permanent, so a partial map is a valid state. This
   * only fails if the directory disappears entirely, which would silently revert
   * every tile to bars.
   */
  it('still has art on disk for the cases that claim it', () => {
    expect(existsSync(ART_DIR), 'assets/cases has gone — every tile is back to bars').toBe(true);
    expect(artFiles().length, 'no case art left on disk').toBeGreaterThan(0);
  });
});
