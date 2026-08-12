import { describe, it, expect } from 'vitest';
import { SAVE_KEY_PREFIX, saveKey, isSaveKey, saveKeysIn } from './saveKeys';

describe('save keys', () => {
  it('builds a key per case', () => {
    expect(saveKey('the-lighthouse')).toBe('save:the-lighthouse');
    expect(saveKey('the-lighthouse')).not.toBe(saveKey('the-listener'));
  });

  /**
   * "Reset progress" reads every AsyncStorage key and deletes the ones that are
   * ours. Both directions of a loose check are damaging: too tight and saves
   * survive a reset the player asked for, too loose and it deletes a key that
   * was never ours.
   */
  it('claims our keys and nothing else', () => {
    expect(isSaveKey('save:the-cut')).toBe(true);
    expect(isSaveKey('settings')).toBe(false);
    expect(isSaveKey('supabase.auth.token')).toBe(false);
    // The bare prefix is not a save for any case.
    expect(isSaveKey(SAVE_KEY_PREFIX)).toBe(false);
    // Ours must be a prefix, not a substring.
    expect(isSaveKey('legacy:save:the-cut')).toBe(false);
  });

  it('filters a key list and keeps its order', () => {
    const keys = ['settings', 'save:b', 'auth', 'save:a', 'save:'];
    expect(saveKeysIn(keys)).toEqual(['save:b', 'save:a']);
  });

  it('round-trips a built key', () => {
    for (const id of ['tutorial', 'the-night-ferry', 'a-b-c']) {
      expect(isSaveKey(saveKey(id))).toBe(true);
    }
  });
});
