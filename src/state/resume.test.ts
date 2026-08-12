import { describe, it, expect } from 'vitest';
import {
  RESUME_KEY,
  lastPlayedSchema,
  hasStarted,
  resumableThreadId,
  offerResume,
  describeElapsed,
  type LastPlayed,
} from './resume';
import { isSaveKey } from './saveKeys';
import { emptySave } from './saveBlob';
import type { CaseScript } from '@/engine';

/**
 * Two threads: one open from the start, one gated behind the case's single
 * contradiction. The gate is what makes "is this save resumable" a real
 * question rather than an existence check.
 */
const SCRIPT = {
  id: 'the-lighthouse',
  title: 'The Lighthouse',
  blurb: '',
  characters: [{ id: 'nadia', name: 'Nadia', avatarColor: '#c33' }],
  objects: [],
  motives: [],
  places: [{ id: 'studio', name: 'Studio' }],
  threads: [
    {
      id: 't-nadia',
      title: 'Nadia Okonjo',
      participantIds: ['nadia'],
      requiresContradictionIds: [],
      messages: [
        { id: 'm1', threadId: 't-nadia', senderId: 'nadia', sentAt: 1, body: 'a' },
        { id: 'm2', threadId: 't-nadia', senderId: 'nadia', sentAt: 2, body: 'b' },
        { id: 'm3', threadId: 't-nadia', senderId: 'nadia', sentAt: 3, body: 'c' },
      ],
    },
    {
      id: 't-sealed',
      title: 'Harbour Office',
      participantIds: ['nadia'],
      requiresContradictionIds: ['x1'],
      messages: [{ id: 'm4', threadId: 't-sealed', senderId: 'nadia', sentAt: 4, body: 'd' }],
    },
  ],
  contradictions: [{ id: 'x1', claimIdA: 'c1', claimIdB: 'c2', revelation: 'Caught.' }],
  solution: { killerId: 'nadia', requiredContradictionIds: ['x1'], requiredMotiveIds: [], epilogue: 'e' },
} as CaseScript;

const LAST: LastPlayed = { caseId: 'the-lighthouse', updatedAt: 1_000 };

const save = (over: Partial<ReturnType<typeof emptySave>> = {}) => ({ ...emptySave(), ...over });

describe('RESUME_KEY', () => {
  /**
   * The pointer must never be mistaken for a case save: progress sync reads the
   * suffix of every save key as a case id, so `save:last` would be uploaded as
   * a case called "last".
   */
  it('sits outside the save key space', () => {
    expect(isSaveKey(RESUME_KEY)).toBe(false);
  });
});

describe('lastPlayedSchema', () => {
  it('parses a good pointer', () => {
    expect(lastPlayedSchema.parse({ caseId: 'the-cut', updatedAt: 42 })).toEqual({
      caseId: 'the-cut',
      updatedAt: 42,
    });
  });

  it('recovers a broken clock but keeps the case', () => {
    const parsed = lastPlayedSchema.parse({ caseId: 'the-cut', updatedAt: 'tuesday' });
    expect(parsed.caseId).toBe('the-cut');
    expect(parsed.updatedAt).toBe(0);
  });

  it('throws when there is no usable case id', () => {
    // Nothing to recover to — a pointer that cannot name a case is not a pointer.
    expect(() => lastPlayedSchema.parse({ caseId: '', updatedAt: 1 })).toThrow();
    expect(() => lastPlayedSchema.parse({ updatedAt: 1 })).toThrow();
    expect(() => lastPlayedSchema.parse(null)).toThrow();
  });
});

describe('hasStarted', () => {
  it('is false for a case that was only opened', () => {
    expect(hasStarted(save())).toBe(false);
  });

  it('is true once a message has been read', () => {
    expect(hasStarted(save({ readMessageIds: ['m1'] }))).toBe(true);
  });

  it('is true once something has been proved, even with nothing marked read', () => {
    expect(hasStarted(save({ confirmedContradictionIds: ['x1'] }))).toBe(true);
  });
});

describe('resumableThreadId', () => {
  it('returns the thread the player had open', () => {
    const s = save({ lastThreadId: 't-nadia', readMessageIds: ['m1'] });
    expect(resumableThreadId(SCRIPT, s)).toBe('t-nadia');
  });

  it('is null when no thread was recorded', () => {
    expect(resumableThreadId(SCRIPT, save({ readMessageIds: ['m1'] }))).toBeNull();
  });

  it('is null when the thread no longer exists in the script', () => {
    // The case was edited between builds and this conversation was cut.
    const s = save({ lastThreadId: 't-deleted', readMessageIds: ['m1'] });
    expect(resumableThreadId(SCRIPT, s)).toBeNull();
  });

  it('is null when the thread is gated behind something unproved', () => {
    const s = save({ lastThreadId: 't-sealed', readMessageIds: ['m1'] });
    expect(resumableThreadId(SCRIPT, s)).toBeNull();
  });

  it('returns a gated thread once its gate is satisfied', () => {
    const s = save({ lastThreadId: 't-sealed', readMessageIds: ['m1'], confirmedContradictionIds: ['x1'] });
    expect(resumableThreadId(SCRIPT, s)).toBe('t-sealed');
  });
});

describe('offerResume', () => {
  const base = { last: LAST, save: save({ lastThreadId: 't-nadia', readMessageIds: ['m1'] }), script: SCRIPT, unlocked: true };

  it('offers the conversation the player was in', () => {
    const offer = offerResume(base);
    expect(offer).not.toBeNull();
    expect(offer?.caseId).toBe('the-lighthouse');
    expect(offer?.threadId).toBe('t-nadia');
    expect(offer?.updatedAt).toBe(1_000);
  });

  it('counts what is still unread in that conversation', () => {
    // Three messages in t-nadia, one read.
    expect(offerResume(base)?.unreadInThread).toBe(2);
  });

  it('reports progress against the case', () => {
    const offer = offerResume({
      ...base,
      save: save({ lastThreadId: 't-nadia', readMessageIds: ['m1'], confirmedContradictionIds: ['x1'] }),
    });
    expect(offer?.provedCount).toBe(1);
    expect(offer?.totalCount).toBe(1);
  });

  it('ignores a confirmed id this build no longer defines', () => {
    // Otherwise an edited case renders "2 of 1 proved".
    const offer = offerResume({
      ...base,
      save: save({ lastThreadId: 't-nadia', readMessageIds: ['m1'], confirmedContradictionIds: ['x1', 'x-gone'] }),
    });
    expect(offer?.provedCount).toBe(1);
  });

  it('carries the last message read, so the card can quote it back', () => {
    const offer = offerResume({
      ...base,
      save: save({ lastThreadId: 't-nadia', lastMessageId: 'm2', readMessageIds: ['m1', 'm2'] }),
    });
    expect(offer?.lastMessageId).toBe('m2');
  });

  it('drops a last message that is not in the thread being reopened', () => {
    // m4 belongs to t-sealed; quoting it under t-nadia would show a line from a
    // conversation the card is not offering to open.
    const offer = offerResume({
      ...base,
      save: save({ lastThreadId: 't-nadia', lastMessageId: 'm4', readMessageIds: ['m1'] }),
    });
    expect(offer?.lastMessageId).toBeNull();
  });

  it('still offers the case when the thread is unreachable, pointing at the index', () => {
    const offer = offerResume({
      ...base,
      save: save({ lastThreadId: 't-sealed', readMessageIds: ['m1'] }),
    });
    expect(offer).not.toBeNull();
    expect(offer?.threadId).toBeNull();
    expect(offer?.unreadInThread).toBe(0);
  });

  it('offers nothing without a pointer or a save', () => {
    expect(offerResume({ ...base, last: null })).toBeNull();
    expect(offerResume({ ...base, save: null })).toBeNull();
  });

  it('offers nothing for a case this build no longer ships', () => {
    expect(offerResume({ ...base, script: undefined })).toBeNull();
  });

  it('offers nothing for a case the player can no longer open', () => {
    // An entitlement lapsed. Continue must not lead to the paywall.
    expect(offerResume({ ...base, unlocked: false })).toBeNull();
  });

  it('offers nothing for a case that was opened but never played', () => {
    expect(offerResume({ ...base, save: save() })).toBeNull();
  });

  it('offers nothing when the pointer and the script disagree', () => {
    // Guards the caller looking up the wrong case for the pointer.
    expect(offerResume({ ...base, last: { caseId: 'the-cut', updatedAt: 1 } })).toBeNull();
  });
});

describe('describeElapsed', () => {
  const at = (ms: number) => describeElapsed(ms, 0);

  it('reads anything under a minute as just now', () => {
    expect(at(0)).toBe('just now');
    expect(at(59_000)).toBe('just now');
  });

  it('counts minutes and hours, singular and plural', () => {
    expect(at(60_000)).toBe('1 minute ago');
    expect(at(12 * 60_000)).toBe('12 minutes ago');
    expect(at(60 * 60_000)).toBe('1 hour ago');
    expect(at(5 * 60 * 60_000)).toBe('5 hours ago');
  });

  it('names yesterday rather than counting hours past a day', () => {
    expect(at(25 * 60 * 60_000)).toBe('yesterday');
  });

  it('counts days, then weeks, then gives up', () => {
    expect(at(3 * 86_400_000)).toBe('3 days ago');
    expect(at(8 * 86_400_000)).toBe('last week');
    expect(at(20 * 86_400_000)).toBe('2 weeks ago');
    expect(at(60 * 86_400_000)).toBe('a while ago');
  });

  it('never reports the future', () => {
    // A device clock that moved backwards, or a save from a device running ahead.
    expect(describeElapsed(0, 10 * 60_000)).toBe('just now');
  });
});
