import { describe, it, expect } from 'vitest';
import { establishedMotiveIds, motivesFor } from './motive';
import type { Motive } from './types';

const MOTIVES: Motive[] = [
  {
    id: 'm-money',
    characterId: 'mairi',
    summary: 'The Trust money was covering her son.',
    establishedByMessageIds: ['r7', 'k11'],
  },
  {
    id: 'm-grudge',
    characterId: 'callum',
    summary: 'He was about to be named.',
    establishedByMessageIds: ['k11'],
  },
];

/**
 * Motive is deliberately NOT a contradiction.
 *
 * The contradiction engine answers "can these both be true?". Motive answers
 * "why would they?" — it is not falsifiable by pairing two statements, and
 * forcing it through checkContradiction would produce a verdict the game could
 * not explain in one line, which is the thing that makes the rejections
 * teachable.
 *
 * So it is a second axis, established purely by reading. That is what makes
 * reading matter as much as pairing.
 */
describe('establishedMotiveIds', () => {
  it('establishes a motive only when every message behind it has been read', () => {
    expect(establishedMotiveIds(MOTIVES, ['r7'])).toEqual([]);
    expect(establishedMotiveIds(MOTIVES, ['r7', 'k11'])).toContain('m-money');
  });

  it('ignores the order the messages were read in', () => {
    expect(establishedMotiveIds(MOTIVES, ['k11', 'r7'])).toContain('m-money');
  });

  it('establishes each motive independently', () => {
    // k11 alone is enough for Callum's, not for Mairi's.
    const ids = establishedMotiveIds(MOTIVES, ['k11']);
    expect(ids).toEqual(['m-grudge']);
  });

  it('establishes nothing when nothing has been read', () => {
    expect(establishedMotiveIds(MOTIVES, [])).toEqual([]);
  });

  it('treats a motive with no required reading as never established', () => {
    // An empty requirement would otherwise be vacuously true and hand the
    // player a motive they never found.
    const sloppy: Motive[] = [
      { id: 'm-free', characterId: 'x', summary: 's', establishedByMessageIds: [] },
    ];
    expect(establishedMotiveIds(sloppy, [])).toEqual([]);
  });
});

describe('motivesFor', () => {
  it('returns only the established motives naming a person', () => {
    const found = motivesFor(MOTIVES, 'mairi', ['r7', 'k11']);
    expect(found.map((m) => m.id)).toEqual(['m-money']);
  });

  it('returns nothing for a person whose motive is not yet established', () => {
    expect(motivesFor(MOTIVES, 'mairi', ['r7'])).toEqual([]);
  });
});
