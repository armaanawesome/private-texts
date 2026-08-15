/**
 * What the Restore Purchases row says, as a pure function of what happened.
 *
 * Restore is the row people press when they are already annoyed — new phone, or
 * they paid and the case is still sealed. Every branch has to say something
 * specific, because "Something went wrong" on this row is what turns an annoyed
 * player into a refund request.
 */

import type { Message } from '@/i18n/message';

export type RestoreState =
  | { readonly kind: 'idle' }
  | { readonly kind: 'working' }
  | { readonly kind: 'restored'; readonly entitlementIds: readonly string[] }
  /** The store could not be switched on for this build at all. */
  | { readonly kind: 'unavailable'; readonly reason: string }
  | { readonly kind: 'failed'; readonly message: Message };

/**
 * Null means show nothing — an untouched row should not carry a status line.
 *
 * Returns a `Message` rather than a sentence, for the reason set out in
 * src/i18n/message.ts: this row is read by every player in every language, and
 * a helper that returns English puts English on a translated screen.
 *
 * `unavailable.reason` stays raw on purpose. It means the build shipped without
 * a usable store key, so its only reader is whoever is holding a developer
 * build — translating it would make it harder to search for, not easier to act
 * on.
 */
export function restoreStatusLine(state: RestoreState): Message | null {
  switch (state.kind) {
    case 'idle':
      return null;
    case 'working':
      return { key: 'restore.working' };
    case 'restored': {
      const count = state.entitlementIds.length;
      // The honest empty case. "Nothing to restore" sounds like a failure; naming
      // the account is what tells someone they are signed in as the wrong one.
      if (count === 0) return { key: 'restore.none' };
      return count === 1 ? { key: 'restore.oneRestored' } : { key: 'restore.manyRestored', params: { count } };
    }
    case 'unavailable':
      return { raw: state.reason };
    case 'failed':
      return state.message;
  }
}

/** Whether the row should show a spinner and refuse a second tap. */
export function restoreIsBusy(state: RestoreState): boolean {
  return state.kind === 'working';
}

/**
 * An unknown thrown value turned into something a player can act on.
 *
 * RevenueCat rejects with an Error most of the time and with a plain object some
 * of the time; `String(e)` on the latter renders "[object Object]" into the UI.
 */
export function restoreErrorMessage(error: unknown): Message {
  if (error instanceof Error && error.message.trim() !== '') return { raw: error.message };
  if (typeof error === 'string' && error.trim() !== '') return { raw: error };
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const { message } = error as { message: unknown };
    if (typeof message === 'string' && message.trim() !== '') return { raw: message };
  }
  // Only the fallback is translated. The others are the store's own words, and
  // a message the player can screenshot is worth more than a tidy one.
  return { key: 'restore.unreachable' };
}
