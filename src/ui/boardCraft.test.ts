import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { EN } from '@/i18n/strings';

/**
 * Guards on the evidence board, the one screen the game is named for.
 *
 * Source assertions rather than render assertions, for the reason
 * `bubbleMemo.test.ts` documents: these components import react-native, which
 * the Node suite cannot parse. What can be checked is that the two arrangements
 * that were actually wrong have not come back.
 *
 * 1. Every visible string on this screen was a hardcoded English literal while
 *    the other twelve screens went through the catalogue, so a Spanish player
 *    read the whole instrument in English.
 * 2. The compare control lived inside the ScrollView. Past about six claims on
 *    the record it scrolled off-screen behind the player at exactly the moment
 *    they were pinning their second statement.
 */

const read = (rel: string) => readFileSync(join(process.cwd(), rel), 'utf8');

describe('the board speaks the player’s language', () => {
  const board = read('src/ui/EvidenceBoard.tsx');
  const dock = read('src/ui/BoardDock.tsx');
  const timeline = read('src/ui/ClaimTimeline.tsx');

  it('routes its own copy through the catalogue', () => {
    expect(board).toContain('useTranslator');
    expect(dock).toContain('useTranslator');
  });

  /**
   * The exact literals that shipped. Named individually rather than by a regex
   * over all quoted text, because the files are full of legitimate string
   * literals — style keys, ids, the `{pinned}/2` counter — and a blanket rule
   * would have to be weakened until it caught nothing.
   */
  const GONE = [
    'Run the check',
    'On the record',
    'Nothing yet. Read the threads',
    'both true at once',
    'one person',
    'Pin two statements',
    'One statement loaded',
  ];

  it.each(GONE)('no longer hardcodes %j', (literal) => {
    expect(board).not.toContain(`>${literal}`);
    expect(board).not.toContain(`'${literal}`);
    expect(dock).not.toContain(`'${literal}`);
  });

  /**
   * The timeline's two remaining human sentences arrive as props. It has no
   * translator of its own on purpose — it is handed pre-rendered strings so the
   * board stays the single place that decides what this screen says.
   */
  it('takes its prose from the board rather than inlining it', () => {
    expect(timeline).toContain('subjectMeta');
    expect(timeline).toContain('overlapLabel');
    expect(timeline).not.toContain("'one person'");
    expect(timeline).not.toContain('both true at once');
  });

  /**
   * A key in the catalogue that no screen renders is worse than a missing one:
   * it reads as coverage that does not exist and costs a translator real work
   * on a string nobody will see. The file header of strings.ts states this
   * rule; this enforces it for the group just added.
   */
  it('renders every board key it added', () => {
    const screens = board + dock;
    const unused = Object.keys(EN)
      .filter((k) => k.startsWith('board.'))
      .filter((k) => !screens.includes(k));
    expect(unused).toEqual([]);
  });
});

describe('the compare control stays reachable', () => {
  const board = read('src/ui/EvidenceBoard.tsx');

  /**
   * The dock must be a sibling of the ScrollView, not a child of it. Checked by
   * position because that is the whole property: content scrolls, the control
   * does not.
   */
  it('renders the dock outside the scroller', () => {
    const closeScroll = board.indexOf('</ScrollView>');
    const dock = board.indexOf('<BoardDock');
    expect(closeScroll).toBeGreaterThan(-1);
    expect(dock).toBeGreaterThan(closeScroll);
  });

  it('pads the scroll content by the dock’s measured height', () => {
    expect(board).toContain('paddingBottom: dockHeight');
    expect(board).toContain('onMeasure={setDockHeight}');
  });

  /**
   * The dock shows what is pinned right now. Feeding it `shown` instead would
   * leave the slots full after a win — the pins clear on a proven contradiction,
   * and the player would be looking at two filled slots they cannot compare.
   */
  it('feeds the dock the live pins, not the last compared pair', () => {
    expect(board).toContain('a={pinnedA}');
    expect(board).toContain('b={pinnedB}');
  });
});
