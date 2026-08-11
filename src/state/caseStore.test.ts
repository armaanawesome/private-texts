import { describe, it, expect, beforeEach } from 'vitest';
import { useCaseStore } from './caseStore';
import type { CaseScript } from '@/engine';

const SCRIPT = {
  id: 'c',
  title: 'C',
  blurb: '',
  characters: [{ id: 'nadia', name: 'Nadia', avatarColor: '#c33' }],
  objects: [],
  motives: [],
  places: [
    { id: 'studio', name: 'Studio' },
    { id: 'harbour', name: 'Harbour' },
  ],
  threads: [
    {
      id: 't',
      title: 'T',
      participantIds: ['nadia'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't',
          senderId: 'nadia',
          sentAt: 1,
          body: 'a',
          claims: [
            {
              id: 'c1',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'studio' },
              window: { start: 100, end: 200 },
              sourceMessageId: 'm1',
              label: 'L1',
            },
          ],
        },
        {
          id: 'm2',
          threadId: 't',
          senderId: 'nadia',
          sentAt: 2,
          body: 'b',
          claims: [
            {
              id: 'c2',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'harbour' },
              window: { start: 150, end: 250 },
              sourceMessageId: 'm2',
              label: 'L2',
            },
          ],
        },
      ],
    },
  ],
  contradictions: [{ id: 'x1', claimIdA: 'c1', claimIdB: 'c2', revelation: 'Caught.' }],
  solution: { killerId: 'nadia', requiredContradictionIds: ['x1'], requiredMotiveIds: [], epilogue: 'e' },
} as CaseScript;

describe('useCaseStore', () => {
  beforeEach(() => {
    useCaseStore.getState().reset();
    useCaseStore.getState().loadScript(SCRIPT);
  });

  it('starts with nothing read, pinned, or confirmed', () => {
    const s = useCaseStore.getState();
    expect(s.readMessageIds).toEqual([]);
    expect(s.pinnedClaimIds).toEqual([]);
    expect(s.confirmedContradictionIds).toEqual([]);
  });

  it('records a message as read exactly once', () => {
    useCaseStore.getState().markRead('m1');
    useCaseStore.getState().markRead('m1');
    expect(useCaseStore.getState().readMessageIds).toEqual(['m1']);
  });

  it('pins and unpins a claim', () => {
    useCaseStore.getState().togglePin('c1');
    expect(useCaseStore.getState().pinnedClaimIds).toEqual(['c1']);
    useCaseStore.getState().togglePin('c1');
    expect(useCaseStore.getState().pinnedClaimIds).toEqual([]);
  });

  it('holds at most two pins, dropping the oldest', () => {
    const { togglePin } = useCaseStore.getState();
    togglePin('c1');
    togglePin('c2');
    togglePin('c3');
    expect(useCaseStore.getState().pinnedClaimIds).toEqual(['c2', 'c3']);
  });

  it('confirms a real contradiction on submit', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    const after = useCaseStore.getState();
    expect(after.confirmedContradictionIds).toEqual(['x1']);
    expect(after.lastVerdict?.ok).toBe(true);
    expect(after.pinnedClaimIds).toEqual([]);
  });

  it('rejects a non-contradiction and keeps the pins on the board', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.togglePin('c1');
    s.submitPins();
    const after = useCaseStore.getState();
    expect(after.confirmedContradictionIds).toEqual([]);
    expect(after.lastVerdict?.ok).toBe(false);
    expect(after.pinnedClaimIds).toEqual(['c1']);
  });

  it('reports which contradiction the latest submit proved', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    expect(useCaseStore.getState().lastConfirmedId).toBe('x1');
  });

  it('clears lastConfirmedId when a pairing conflicts but was not authored', () => {
    // A genuine conflict the author never anticipated is still a valid deduction,
    // but it unlocks nothing and must not surface a stale revelation.
    useCaseStore.setState({ lastConfirmedId: 'x1' });
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    useCaseStore.setState({
      script: { ...SCRIPT, contradictions: [] } as CaseScript,
    });
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    expect(useCaseStore.getState().lastConfirmedId).toBeNull();
  });

  it('does not confirm the same contradiction twice', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    expect(useCaseStore.getState().confirmedContradictionIds).toEqual(['x1']);
  });

  it('clears the verdict when a pin changes', () => {
    const s = useCaseStore.getState();
    s.togglePin('c1');
    s.submitPins();
    expect(useCaseStore.getState().lastVerdict).not.toBeNull();
    s.togglePin('c2');
    expect(useCaseStore.getState().lastVerdict).toBeNull();
  });

  /**
   * Success clears the pins, which is right for the chips — they deselect ready
   * for the next pairing. But the comparison sheet draws the two statements it
   * just broke, so it needs them to survive the clear. Without this the board
   * blanks itself at the exact moment the player wins.
   */
  it('remembers the compared pair after a win clears the pins', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();

    const after = useCaseStore.getState();
    expect(after.pinnedClaimIds).toEqual([]);
    expect([...after.lastComparedClaimIds].sort()).toEqual(['c1', 'c2']);
  });

  it('remembers the compared pair after a rejection too', () => {
    // Both claims at the same place, so the engine rejects the pairing. The
    // sheet still has to draw what was compared, or a rejected check explains
    // itself against an empty picture.
    const sameArea = {
      ...SCRIPT,
      threads: [
        {
          ...SCRIPT.threads[0]!,
          messages: SCRIPT.threads[0]!.messages.map((m) =>
            m.id !== 'm2'
              ? m
              : {
                  ...m,
                  claims: [{ ...m.claims![0]!, predicate: { kind: 'at_place', placeId: 'studio' } }],
                },
          ),
        },
      ],
    } as CaseScript;

    useCaseStore.getState().loadScript(sameArea);
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();

    const after = useCaseStore.getState();
    expect(after.lastVerdict?.ok).toBe(false);
    expect([...after.lastComparedClaimIds].sort()).toEqual(['c1', 'c2']);
  });

  it('forgets the compared pair on reset', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();
    useCaseStore.getState().reset();
    expect(useCaseStore.getState().lastComparedClaimIds).toEqual([]);
  });
});
