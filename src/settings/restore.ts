/**
 * What the Restore Purchases row says, as a pure function of what happened.
 *
 * Restore is the row people press when they are already annoyed — new phone, or
 * they paid and the case is still sealed. Every branch has to say something
 * specific, because "Something went wrong" on this row is what turns an annoyed
 * player into a refund request.
 */

export type RestoreState =
  | { readonly kind: 'idle' }
  | { readonly kind: 'working' }
  | { readonly kind: 'restored'; readonly entitlementIds: readonly string[] }
  /** The store could not be switched on for this build at all. */
  | { readonly kind: 'unavailable'; readonly reason: string }
  | { readonly kind: 'failed'; readonly message: string };

/** Null means show nothing — an untouched row should not carry a status line. */
export function restoreStatusLine(state: RestoreState): string | null {
  switch (state.kind) {
    case 'idle':
      return null;
    case 'working':
      return 'Checking with the store…';
    case 'restored': {
      const count = state.entitlementIds.length;
      // The honest empty case. "Nothing to restore" sounds like a failure; naming
      // the account is what tells someone they are signed in as the wrong one.
      if (count === 0) {
        return 'No purchases found for this store account.';
      }
      return count === 1
        ? 'Restored 1 purchase. Your case pack is unlocked.'
        : `Restored ${count} purchases. Your case pack is unlocked.`;
    }
    case 'unavailable':
      return state.reason;
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
export function restoreErrorMessage(error: unknown): string {
  const fallback = 'Could not reach the store. Check your connection and try again.';
  if (error instanceof Error && error.message.trim() !== '') return error.message;
  if (typeof error === 'string' && error.trim() !== '') return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const { message } = error as { message: unknown };
    if (typeof message === 'string' && message.trim() !== '') return message;
  }
  return fallback;
}
