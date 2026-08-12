import { describe, it, expect } from 'vitest';
import { mergeSaves, savesDiffer, planSaveSync } from './saveMerge';
import type { SaveBlob } from './saveBlob';

/**
 * These tests exist to stop one specific regression: a merge that overwrites.
 *
 * Progress sync is the only feature in this app that can destroy something the
 * player made. A wrong entitlement locks a case they can unlock again; a wrong
 * merge deletes an evening of reading with no undo and no copy anywhere. So the
 * rule is union, and the tests below are mostly about the cases where an
 * "obvious" implementation would quietly drop ids instead.
 */

const blob = (
  read: string[],
  confirmed: string[],
  pointer: { thread?: string | null; message?: string | null } = {},
): SaveBlob => ({
  readMessageIds: read,
  confirmedContradictionIds: confirmed,
  lastThreadId: pointer.thread ?? null,
  lastMessageId: pointer.message ?? null,
});

describe('mergeSaves', () => {
  it('keeps the local save when the server has nothing for this case', () => {
    // First sync after signing up: every case is local-only. Returning the
    // remote side here would wipe the device that had all the progress.
    const local = blob(['m1', 'm2'], ['c1']);
    expect(mergeSaves(local, null)).toEqual(local);
  });

  it('keeps the remote save when this device has nothing for this case', () => {
    // Signing in on a new phone. The local side is empty by definition, and
    // preferring it would show a fresh case to someone half way through one.
    const remote = blob(['m7'], ['c3']);
    expect(mergeSaves(null, remote)).toEqual(remote);
  });

  it('is empty when neither side has anything', () => {
    expect(mergeSaves(null, null)).toEqual(blob([], []));
  });

  it('keeps every id when the two sides are completely disjoint', () => {
    // The real cross-device case: read some messages on the phone, some on the
    // tablet, never synced in between. Nothing may be dropped.
    const merged = mergeSaves(blob(['m1', 'm2'], ['c1']), blob(['m8', 'm9'], ['c4']));
    expect(merged.readMessageIds).toEqual(['m1', 'm2', 'm8', 'm9']);
    expect(merged.confirmedContradictionIds).toEqual(['c1', 'c4']);
  });

  it('does not duplicate ids the two sides share', () => {
    const merged = mergeSaves(blob(['m1', 'm2'], ['c1']), blob(['m2', 'm3'], ['c1', 'c2']));
    expect(merged.readMessageIds).toEqual(['m1', 'm2', 'm3']);
    expect(merged.confirmedContradictionIds).toEqual(['c1', 'c2']);
  });

  it('collapses duplicates that were already inside one side', () => {
    // A save written by an older build, or a double-tap that got persisted.
    // Sync is the natural place to stop carrying it forever.
    const merged = mergeSaves(blob(['m1', 'm1', 'm2'], []), null);
    expect(merged.readMessageIds).toEqual(['m1', 'm2']);
  });

  it('returns the same content when both sides already agree', () => {
    const same = blob(['m1'], ['c1']);
    expect(mergeSaves(same, { ...same })).toEqual(same);
  });

  it('never loses an id from either side', () => {
    // The property the whole feature rests on, stated directly rather than
    // inferred from the examples above.
    const local = blob(['a', 'b', 'c'], ['x']);
    const remote = blob(['c', 'd'], ['x', 'y', 'z']);
    const merged = mergeSaves(local, remote);
    for (const id of [...local.readMessageIds, ...remote.readMessageIds]) {
      expect(merged.readMessageIds).toContain(id);
    }
    for (const id of [
      ...local.confirmedContradictionIds,
      ...remote.confirmedContradictionIds,
    ]) {
      expect(merged.confirmedContradictionIds).toContain(id);
    }
  });

  it('does not mutate either input', () => {
    // The store holds these arrays. Merging in place would edit live state from
    // a background sync, which is the kind of bug that only shows up on a device.
    const local = blob(['m1'], ['c1']);
    const remote = blob(['m2'], ['c2']);
    mergeSaves(local, remote);
    expect(local).toEqual(blob(['m1'], ['c1']));
    expect(remote).toEqual(blob(['m2'], ['c2']));
  });

  it('returns arrays that alias neither input', () => {
    // Handing back a borrowed reference would let a later push into the merged
    // save silently edit the store's array too.
    const local = blob(['m1'], ['c1']);
    const merged = mergeSaves(local, null);
    expect(merged.readMessageIds).not.toBe(local.readMessageIds);
    expect(merged.confirmedContradictionIds).not.toBe(local.confirmedContradictionIds);
  });
});

describe('mergeSaves — the resume pointer', () => {
  it('never pairs one device thread with the other device message', () => {
    // The bug this exists to prevent. Merging the pointer field by field would
    // resume the player at t-b/m-a: a message that is not in the thread they
    // just landed in, which either renders nothing or scrolls to the wrong place.
    const merged = mergeSaves(
      blob([], [], { thread: 't-a', message: 'm-a' }),
      blob([], [], { thread: 't-b', message: 'm-b' }),
    );
    expect(merged.lastThreadId).toBe('t-a');
    expect(merged.lastMessageId).toBe('m-a');
  });

  it('adopts the server pointer when this device has none', () => {
    // Signing in on a new phone: this is what makes Continue work there.
    const merged = mergeSaves(null, blob(['m1'], [], { thread: 't-b', message: 'm-b' }));
    expect(merged.lastThreadId).toBe('t-b');
    expect(merged.lastMessageId).toBe('m-b');
  });

  it('adopts the server pointer when the local save predates the resume feature', () => {
    // Old saves parse with both fields null rather than failing, so a local save
    // can legitimately have progress but no pointer.
    const merged = mergeSaves(blob(['m1'], []), blob([], [], { thread: 't-b', message: 'm-b' }));
    expect(merged.readMessageIds).toEqual(['m1']);
    expect(merged.lastThreadId).toBe('t-b');
  });

  it('is null when neither side has been anywhere', () => {
    const merged = mergeSaves(blob(['m1'], []), blob(['m2'], []));
    expect(merged.lastThreadId).toBeNull();
    expect(merged.lastMessageId).toBeNull();
  });

  it('carries a thread with no message without inventing one', () => {
    const merged = mergeSaves(
      blob([], [], { thread: 't-a' }),
      blob([], [], { thread: 't-b', message: 'm-b' }),
    );
    expect(merged.lastThreadId).toBe('t-a');
    expect(merged.lastMessageId).toBeNull();
  });
});

describe('savesDiffer', () => {
  it('treats a missing previous save as a difference', () => {
    expect(savesDiffer(null, blob([], []))).toBe(true);
  });

  it('is false when nothing changed, so sync can skip the write', () => {
    // Without this the app pays a storage write and a row upsert per case on
    // every launch to store bytes that were already there.
    expect(savesDiffer(blob(['m1'], ['c1']), blob(['m1'], ['c1']))).toBe(false);
  });

  it('is true when the merge added an id', () => {
    expect(savesDiffer(blob(['m1'], []), blob(['m1', 'm2'], []))).toBe(true);
  });

  it('notices a change in the contradiction list alone', () => {
    expect(savesDiffer(blob(['m1'], []), blob(['m1'], ['c1']))).toBe(true);
  });

  it('notices the player moving to another thread without reading anything new', () => {
    // Ignoring the pointer here would mean opening a new thread never syncs, so
    // the other device keeps resuming at a conversation the player has left.
    const before = blob(['m1'], [], { thread: 't-a', message: 'm1' });
    const after = blob(['m1'], [], { thread: 't-b', message: 'm1' });
    expect(savesDiffer(before, after)).toBe(true);
  });
});

describe('planSaveSync', () => {
  const plan = (
    local: Record<string, SaveBlob>,
    remote: Record<string, SaveBlob>,
  ) => planSaveSync(new Map(Object.entries(local)), new Map(Object.entries(remote)));

  it('uploads a case the server has never seen', () => {
    const result = plan({ 'the-cut': blob(['m1'], []) }, {});
    expect(result.toRemote).toEqual([{ caseId: 'the-cut', blob: blob(['m1'], []) }]);
    // Nothing to write back: the device already has exactly this.
    expect(result.toLocal).toEqual([]);
  });

  it('downloads a case this device has never seen', () => {
    const result = plan({}, { 'the-bothy': blob(['m4'], ['c2']) });
    expect(result.toLocal).toEqual([{ caseId: 'the-bothy', blob: blob(['m4'], ['c2']) }]);
    expect(result.toRemote).toEqual([]);
  });

  it('writes both ways when each side knows something the other does not', () => {
    const result = plan({ 'the-wake': blob(['m1'], []) }, { 'the-wake': blob(['m2'], []) });
    const merged = blob(['m1', 'm2'], []);
    expect(result.toLocal).toEqual([{ caseId: 'the-wake', blob: merged }]);
    expect(result.toRemote).toEqual([{ caseId: 'the-wake', blob: merged }]);
  });

  it('plans nothing when the two sides already agree', () => {
    const result = plan({ 'the-cut': blob(['m1'], ['c1']) }, { 'the-cut': blob(['m1'], ['c1']) });
    expect(result).toEqual({ toLocal: [], toRemote: [] });
  });

  it('plans nothing at all for a player with no saves anywhere', () => {
    expect(plan({}, {})).toEqual({ toLocal: [], toRemote: [] });
  });

  it('orders cases deterministically', () => {
    // A reproducible plan means a failing test names the same case every run,
    // and the upsert goes up in a stable order.
    const result = plan(
      { zebra: blob(['m1'], []), alpha: blob(['m2'], []) },
      {},
    );
    expect(result.toRemote.map((e) => e.caseId)).toEqual(['alpha', 'zebra']);
  });

  it('handles many cases at once without crossing them over', () => {
    const result = plan(
      { a: blob(['a1'], []), b: blob(['b1'], []) },
      { b: blob(['b2'], []), c: blob(['c1'], []) },
    );
    expect(result.toLocal).toEqual([
      { caseId: 'b', blob: blob(['b1', 'b2'], []) },
      { caseId: 'c', blob: blob(['c1'], []) },
    ]);
    expect(result.toRemote).toEqual([
      { caseId: 'a', blob: blob(['a1'], []) },
      { caseId: 'b', blob: blob(['b1', 'b2'], []) },
    ]);
  });
});
