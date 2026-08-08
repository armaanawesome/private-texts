import { describe, it, expect } from 'vitest';
import { visibleThreads, availableClaims } from './progression';
import type { CaseScript } from './types';

const SCRIPT = {
  id: 'c',
  title: 'C',
  blurb: '',
  characters: [{ id: 'nadia', name: 'Nadia', avatarColor: '#c33' }],
  places: [{ id: 'studio', name: 'Studio' }],
  threads: [
    {
      id: 'open',
      title: 'Open',
      participantIds: ['nadia'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 'open',
          senderId: 'nadia',
          sentAt: 1,
          body: 'hi',
          claims: [
            {
              id: 'c1',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'studio' },
              window: { start: 1, end: 2 },
              sourceMessageId: 'm1',
              label: 'L1',
            },
          ],
        },
        {
          id: 'm2',
          threadId: 'open',
          senderId: 'nadia',
          sentAt: 2,
          body: 'bye',
          claims: [
            {
              id: 'c2',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'studio' },
              window: { start: 3, end: 4 },
              sourceMessageId: 'm2',
              label: 'L2',
            },
          ],
        },
      ],
    },
    {
      id: 'locked',
      title: 'Locked',
      participantIds: ['nadia'],
      requiresContradictionIds: ['x1'],
      messages: [],
    },
  ],
  contradictions: [{ id: 'x1', claimIdA: 'c1', claimIdB: 'c2', revelation: 'r' }],
  solution: { killerId: 'nadia', requiredContradictionIds: ['x1'], epilogue: 'e' },
} as CaseScript;

describe('visibleThreads', () => {
  it('shows only unconditional threads at the start', () => {
    expect(visibleThreads(SCRIPT, []).map((t) => t.id)).toEqual(['open']);
  });

  it('reveals a gated thread once its contradiction is confirmed', () => {
    expect(visibleThreads(SCRIPT, ['x1']).map((t) => t.id)).toEqual(['open', 'locked']);
  });
});

describe('availableClaims', () => {
  it('returns nothing before any message is read', () => {
    expect(availableClaims(SCRIPT, [])).toEqual([]);
  });

  it('returns only claims from messages the player has read', () => {
    expect(availableClaims(SCRIPT, ['m1']).map((c) => c.id)).toEqual(['c1']);
  });

  it('accumulates claims as more messages are read', () => {
    expect(availableClaims(SCRIPT, ['m1', 'm2']).map((c) => c.id)).toEqual(['c1', 'c2']);
  });

  it('ignores unknown message ids', () => {
    expect(availableClaims(SCRIPT, ['m1', 'nope']).map((c) => c.id)).toEqual(['c1']);
  });
});
