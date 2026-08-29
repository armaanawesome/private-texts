import { z } from 'zod';
import { visibleThreads, type CaseScript } from '@/engine';
import type { SaveBlob } from './saveBlob';

/**
 * Resume: deciding whether to offer Continue, and what it should open.
 *
 * Pure and dependency-free on purpose. Every rule below is a way the offer can
 * be *wrong* — a sealed case, a deleted case, a thread the player cannot reach
 * yet — and each one is cheap to get right here and expensive to debug on a
 * device. persistence.ts does the AsyncStorage I/O and hands the raw records to
 * `offerResume`; the screen renders whatever comes back.
 */

/**
 * The global "last played" pointer.
 *
 * Deliberately NOT under the `save:` prefix. Progress sync walks the save keys
 * and treats each suffix as a case id, so a `save:last` pointer would be read
 * as a case called "last" and pushed to the server as a garbage row — exactly
 * the failure saveKeys.ts guards against. Keeping it in its own namespace means
 * `isSaveKey` rejects it for free.
 */
export const RESUME_KEY = 'resume:last';

/**
 * Which case was last open, and when.
 *
 * `caseId` has no `.catch`: a pointer that cannot name a case is not a
 * recoverable pointer, it is meaningless, and the whole record should be thrown
 * out so the home screen falls back to the plain grid. `updatedAt` recovers to
 * 0 because a pointer with a broken clock still knows which case to open — it
 * just cannot say how long ago, and "a while ago" beats losing the save.
 */
export const lastPlayedSchema = z.object({
  caseId: z.string().min(1),
  updatedAt: z.number().int().nonnegative().catch(() => 0),
});

export type LastPlayed = z.infer<typeof lastPlayedSchema>;

/** Everything the Continue affordance needs, or null when there is nothing to offer. */
export interface ResumeOffer {
  readonly caseId: string;
  /** The conversation to reopen. Null means "open the case index instead". */
  readonly threadId: string | null;
  /** Unread messages waiting in that conversation. The reason to tap. */
  readonly unreadInThread: number;
  /**
   * The last message the player actually read, if it is still in the thread
   * being reopened. Null when the save has no pointer or the message was cut
   * from the case, in which case the card has nothing to quote back.
   */
  readonly lastMessageId: string | null;
  readonly provedCount: number;
  readonly totalCount: number;
  readonly updatedAt: number;
}

/**
 * Has this case actually been played?
 *
 * Opening a case stamps the pointer, so the pointer alone is not evidence the
 * player started. Offering to "continue" a case they glanced at and backed out
 * of is a lie, and worse, it buries the case they were really playing.
 */
export function hasStarted(save: SaveBlob): boolean {
  return save.readMessageIds.length > 0 || save.confirmedContradictionIds.length > 0;
}

/**
 * The saved thread, but only if it is still a real, reachable conversation.
 *
 * Two ways a stored id goes stale, both of which produce a black hole if
 * followed: the case was edited between builds and the thread no longer exists,
 * or the thread is gated behind a contradiction this save has not proved.
 * Gating normally only loosens as the player progresses, so the second case
 * means the *script* changed under an old save. Either way the answer is to
 * drop the player at the case index rather than at nothing.
 */
export function resumableThreadId(script: CaseScript, save: SaveBlob): string | null {
  const { lastThreadId } = save;
  if (lastThreadId === null) return null;

  const reachable = visibleThreads(script, {
    confirmedContradictionIds: save.confirmedContradictionIds,
    readMessageIds: save.readMessageIds,
  });
  return reachable.some((t) => t.id === lastThreadId) ? lastThreadId : null;
}

/** Unread messages in one thread, given what the save says has been read. */
function unreadIn(script: CaseScript, threadId: string | null, readMessageIds: readonly string[]): number {
  if (threadId === null) return 0;
  const thread = script.threads.find((t) => t.id === threadId);
  if (!thread) return 0;
  const read = new Set(readMessageIds);
  return thread.messages.filter((m) => !read.has(m.id)).length;
}

/**
 * The saved message id, but only if it is still in the thread being reopened.
 *
 * A message id that belongs to some other thread would have the card quote a
 * line from a conversation it is not offering to open.
 */
function messageInThread(
  script: CaseScript,
  threadId: string | null,
  messageId: string | null,
): string | null {
  if (threadId === null || messageId === null) return null;
  const thread = script.threads.find((t) => t.id === threadId);
  if (!thread) return null;
  return thread.messages.some((m) => m.id === messageId) ? messageId : null;
}

/**
 * Contradictions proved, counting only ones this build still defines.
 *
 * An edited case can leave a confirmed id behind that no longer matches any
 * contradiction. Counting it would render "4 of 3 proved", which reads as a bug
 * in the deduction engine rather than a stale save.
 */
function provedIn(script: CaseScript, confirmedContradictionIds: readonly string[]): number {
  const real = new Set(script.contradictions.map((c) => c.id));
  return confirmedContradictionIds.filter((id) => real.has(id)).length;
}

/**
 * Should Continue appear, and what should it open?
 *
 * `script` is undefined when the pointer names a case this build no longer
 * ships; `unlocked` is false when the case is behind an entitlement the player
 * no longer holds. Both must return null rather than a disabled affordance — a
 * Continue button that refuses to continue is worse than no button.
 */
export function offerResume(params: {
  readonly last: LastPlayed | null;
  readonly save: SaveBlob | null;
  readonly script: CaseScript | undefined;
  readonly unlocked: boolean;
}): ResumeOffer | null {
  const { last, save, script, unlocked } = params;
  if (!last || !save || !script || !unlocked) return null;
  if (script.id !== last.caseId) return null;
  if (!hasStarted(save)) return null;

  /*
   * A finished case has no "where you left off".
   *
   * Without this, solving a case leaves Continue pointing back into it - the
   * last thing the player did was end it, and the pointer records that
   * faithfully. It reads as an invitation to replay the one case they have no
   * reason to reopen, and it does it on the screen whose whole job is to say
   * what to do next. Now that cases unlock in order, what to do next is the
   * case that just became available, and the grid is what offers it.
   *
   * Replaying stays possible - the tile is still there and still opens. What
   * goes away is the app suggesting it.
   */
  if (save.solved) return null;

  const threadId = resumableThreadId(script, save);
  return {
    caseId: last.caseId,
    threadId,
    unreadInThread: unreadIn(script, threadId, save.readMessageIds),
    lastMessageId: messageInThread(script, threadId, save.lastMessageId),
    provedCount: provedIn(script, save.confirmedContradictionIds),
    totalCount: script.contradictions.length,
    updatedAt: last.updatedAt,
  };
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/**
 * How long ago, as a string key rather than a sentence.
 *
 * This used to return English prose, which made the Continue card the most
 * visible bug in the game once the UI was translated: the surrounding line came
 * from the catalogue and the gap came from here, so a Spanish player read
 * "3 de 4 probadas. Última partida 2 hours ago."
 *
 * Returning a key keeps the *rules* here — where they are tested, and where
 * rounding down and refusing to report the future belong — while the words live
 * with every other word in the game. It also means a language whose plurals do
 * not split at one gets to say so in its own catalogue instead of being forced
 * through English's singular/plural shape.
 */
export interface Elapsed {
  readonly key: ElapsedKey;
  /** Absent for the keys that take no number: just now, yesterday, last week. */
  readonly params?: Readonly<{ count: number }>;
}

export type ElapsedKey =
  | 'elapsed.justNow'
  | 'elapsed.minuteOne'
  | 'elapsed.minuteMany'
  | 'elapsed.hourOne'
  | 'elapsed.hourMany'
  | 'elapsed.yesterday'
  | 'elapsed.dayMany'
  | 'elapsed.lastWeek'
  | 'elapsed.weekMany'
  | 'elapsed.aWhile';

/**
 * Rounds down throughout, so nothing ever claims more time has passed than
 * actually has. A negative gap — device clock moved backwards, or a save synced
 * from a device running ahead — reads as "just now" rather than a nonsense
 * "in 3 hours"; the player does not care why, they care that it was recent.
 */
export function describeElapsed(nowMs: number, thenMs: number): Elapsed {
  const gap = nowMs - thenMs;
  if (!Number.isFinite(gap) || gap < MINUTE) return { key: 'elapsed.justNow' };

  if (gap < HOUR) {
    const count = Math.floor(gap / MINUTE);
    return count === 1
      ? { key: 'elapsed.minuteOne' }
      : { key: 'elapsed.minuteMany', params: { count } };
  }
  if (gap < DAY) {
    const count = Math.floor(gap / HOUR);
    return count === 1 ? { key: 'elapsed.hourOne' } : { key: 'elapsed.hourMany', params: { count } };
  }
  if (gap < 2 * DAY) return { key: 'elapsed.yesterday' };
  if (gap < WEEK) return { key: 'elapsed.dayMany', params: { count: Math.floor(gap / DAY) } };

  const weeks = Math.floor(gap / WEEK);
  if (weeks === 1) return { key: 'elapsed.lastWeek' };
  // Past a month the exact number stops meaning anything to a player.
  return weeks >= 4 ? { key: 'elapsed.aWhile' } : { key: 'elapsed.weekMany', params: { count: weeks } };
}
