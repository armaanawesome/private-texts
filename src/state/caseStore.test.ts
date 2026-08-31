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

/**
 * Changing language mid-case.
 *
 * `loadScript` clears progress, which is right for a different case and
 * catastrophic for the same case arriving in another language. These tests are
 * the guard on that: the failure they prevent is a player switching to Spanish
 * on case eleven and losing the whole playthrough.
 */
describe('relocaliseScript', () => {
  const TRANSLATED: CaseScript = { ...SCRIPT, title: 'C en español' };

  beforeEach(() => {
    useCaseStore.getState().reset();
    useCaseStore.getState().loadScript(SCRIPT);
  });

  it('swaps the prose and keeps every bit of progress', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markRead('m2');
    s.togglePin('c1');
    s.togglePin('c2');
    s.submitPins();

    const before = useCaseStore.getState();
    const readBefore = [...before.readMessageIds];
    const confirmedBefore = [...before.confirmedContradictionIds];

    useCaseStore.getState().relocaliseScript(TRANSLATED);

    const after = useCaseStore.getState();
    expect(after.script?.title, 'the prose did not swap').toBe('C en español');
    expect(after.readMessageIds).toEqual(readBefore);
    expect(after.confirmedContradictionIds).toEqual(confirmedBefore);
    expect(after.hydrated).toBe(before.hydrated);
  });

  /**
   * Guarded on the id rather than trusting the caller. Attaching one case's
   * prose to another case's progress is a silent corruption — the player would
   * see a different story over their own read state — rather than a crash.
   */
  it('refuses a script for a different case', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');

    const other: CaseScript = { ...SCRIPT, id: 'other', title: 'Other' };
    useCaseStore.getState().relocaliseScript(other);

    expect(useCaseStore.getState().script?.id).toBe('c');
    expect(useCaseStore.getState().readMessageIds).toEqual(['m1']);
  });

  it('does nothing when no case is loaded', () => {
    useCaseStore.getState().reset();
    useCaseStore.getState().relocaliseScript(TRANSLATED);
    expect(useCaseStore.getState().script).toBeNull();
  });

  /** The contrast that makes the whole thing worth having. */
  it('loadScript still clears, so the two are not interchangeable', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    useCaseStore.getState().loadScript(TRANSLATED);
    expect(useCaseStore.getState().readMessageIds).toEqual([]);
  });
});

/**
 * Replay: forget the playthrough, remember that there was one.
 *
 * The distinction is load-bearing in two places at once. The case grid draws its
 * green tick from `solved`, and linear progression unlocks the NEXT case from
 * the same flag — so a restart that cleared it would take a player's tick away
 * and re-lock the rest of the game behind a case they had already finished, as
 * a reward for wanting to play it again.
 */
describe('restart', () => {
  beforeEach(() => {
    useCaseStore.getState().loadScript(SCRIPT as CaseScript);
  });

  it('clears the playthrough but keeps solved', () => {
    const s = useCaseStore.getState();
    s.markRead('m1');
    s.markSolved();

    useCaseStore.getState().restart();

    const after = useCaseStore.getState();
    expect(after.readMessageIds).toEqual([]);
    expect(after.confirmedContradictionIds).toEqual([]);
    expect(after.pinnedClaimIds).toEqual([]);
    expect(after.lastThreadId).toBeNull();
    expect(after.solved).toBe(true);
  });

  it('keeps the script loaded', () => {
    useCaseStore.getState().restart();
    expect(useCaseStore.getState().script?.id).toBe('c');
  });

  /**
   * The case layout only calls loadProgress when the SCRIPT changes, and on a
   * replay it has not — so nothing would ever set this. The inbox waits on it,
   * so inheriting the false from empty() would leave a replay on a skeleton for
   * as long as the player was willing to look at one.
   */
  it('leaves storage marked as consulted', () => {
    useCaseStore.setState({ hydrated: true });
    useCaseStore.getState().restart();
    expect(useCaseStore.getState().hydrated).toBe(true);
  });

  /**
   * The inbox shows a solved case's closing screen unless this flag says the
   * player asked to play it again. Without it, Play again clears the save, lands
   * back on the inbox, still reads `solved`, and shows the closing screen it had
   * just come from — a button that appears to do nothing.
   */
  it('marks the session as a replay, and loadScript clears that again', () => {
    useCaseStore.getState().markSolved();
    expect(useCaseStore.getState().replaying).toBe(false);

    useCaseStore.getState().restart();
    expect(useCaseStore.getState().replaying).toBe(true);

    // Opening any case afresh — including this one next launch — forgets it.
    useCaseStore.getState().loadScript(SCRIPT as CaseScript);
    expect(useCaseStore.getState().replaying).toBe(false);
  });

  it('is not loadScript, which forgets the case was ever solved', () => {
    useCaseStore.getState().markSolved();
    useCaseStore.getState().loadScript(SCRIPT as CaseScript);
    expect(useCaseStore.getState().solved).toBe(false);
  });
});
