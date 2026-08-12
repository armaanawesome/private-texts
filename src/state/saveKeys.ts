/**
 * The AsyncStorage key space for case progress.
 *
 * Pure and dependency-free, because two callers have to agree on it exactly:
 * persistence.ts, which writes one save per case, and the settings screen's
 * "reset progress", which has to find every one of them. A second hand-written
 * `save:` prefix in the reset path would eventually drift from this one, and the
 * failure mode is silent — either saves survive a reset the player asked for, or
 * a key that was never ours gets deleted.
 */

export const SAVE_KEY_PREFIX = 'save:';

export function saveKey(caseId: string): string {
  return `${SAVE_KEY_PREFIX}${caseId}`;
}

/**
 * A bare `startsWith` would also accept the prefix alone, which is not a save
 * for any case, and would accept it as ours to delete.
 */
export function isSaveKey(key: string): boolean {
  return key.startsWith(SAVE_KEY_PREFIX) && key.length > SAVE_KEY_PREFIX.length;
}

/** Every key in `keys` that is a case save. Order is preserved. */
export function saveKeysIn(keys: readonly string[]): string[] {
  return keys.filter(isSaveKey);
}
