import { describe, it, expect } from 'vitest';
import { visibleThreads, availableClaims } from './progression';
import type { CaseScript } from './types';

const SCRIPT = {
  id: 'c',
  title: 'C',
  blurb: '',
  characters: [{ id: 'nadia', name: 'Nadia', avatarColor: '#c33' }],
  places: [{ id: 'studio', name: 'Studio' }],
  objects: [],
  motives: [],
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
  solution: { killerId: 'nadia', requiredContradictionIds: ['x1'], requiredMotiveIds: [], epilogue: 'e' },
} as CaseScript;

describe('visibleThreads', () => {
  it('shows only unconditional threads at the start', () => {
    expect(visibleThreads(SCRIPT, { confirmedContradictionIds: [], readMessageIds: [] }).map((t) => t.id)).toEqual(['open']);
  });

  it('reveals a gated thread once its contradiction is confirmed', () => {
    expect(visibleThreads(SCRIPT, { confirmedContradictionIds: ['x1'], readMessageIds: [] }).map((t) => t.id)).toEqual(['open', 'locked']);
  });

  /**
   * Discovery, as opposed to escalation. Someone mentions a person and that
   * person becomes reachable — the chain that runs from first responders
   * outward, rather than a ladder of puzzle rewards.
   */
  describe('discovery by reading', () => {
    const withMention = {
      ...SCRIPT,
      threads: [
        ...SCRIPT.threads,
        {
          id: 'mentioned',
          title: 'Mentioned',
          participantIds: ['nadia'],
          requiresContradictionIds: [],
          requiresReadMessageIds: ['m1', 'm2'],
          messages: [],
        },
      ],
    } as CaseScript;

    it('hides a thread until every message naming it has been read', () => {
      const ids = visibleThreads(withMention, {
        confirmedContradictionIds: [],
        readMessageIds: ['m1'],
      }).map((t) => t.id);
      expect(ids).not.toContain('mentioned');
    });

    it('reveals it once they all have', () => {
      const ids = visibleThreads(withMention, {
        confirmedContradictionIds: [],
        readMessageIds: ['m1', 'm2'],
      }).map((t) => t.id);
      expect(ids).toContain('mentioned');
    });

    it('still applies the contradiction gate alongside it', () => {
      // Both gates are independent and both must pass.
      const both = {
        ...withMention,
        threads: withMention.threads.map((t) =>
          t.id === 'mentioned' ? { ...t, requiresContradictionIds: ['x1'] } : t,
        ),
      } as CaseScript;

      const readOnly = visibleThreads(both, {
        confirmedContradictionIds: [],
        readMessageIds: ['m1', 'm2'],
      }).map((t) => t.id);
      expect(readOnly).not.toContain('mentioned');

      const bothDone = visibleThreads(both, {
        confirmedContradictionIds: ['x1'],
        readMessageIds: ['m1', 'm2'],
      }).map((t) => t.id);
      expect(bothDone).toContain('mentioned');
    });
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
