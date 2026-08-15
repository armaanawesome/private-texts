import { describe, it, expect } from 'vitest';
import { restoreErrorMessage, restoreIsBusy, restoreStatusLine } from './restore';
import { render, type Message } from '@/i18n/message';
import { makeTranslator } from '@/i18n/translate';

/**
 * These helpers return a `Message` now, not a sentence, so the assertions
 * resolve it through the English catalogue exactly the way the settings screen
 * resolves it through the player's own. The wording is still what is being
 * checked — it just lives in src/i18n/strings.ts, where a translator can reach
 * it, instead of inside a switch statement.
 */
const t = makeTranslator('en');
const worded = (m: Message | null): string | null => (m === null ? null : render(m, t));

describe('restoreStatusLine', () => {
  it('says nothing at all before the row is pressed', () => {
    expect(restoreStatusLine({ kind: 'idle' })).toBeNull();
  });

  it('reports progress while the store is being asked', () => {
    expect(worded(restoreStatusLine({ kind: 'working' }))).toBe('Checking with the store…');
  });

  it('distinguishes a successful restore from an empty one', () => {
    // These are completely different situations for the player — one unlocked
    // the pack, the other means they are signed in to the wrong store account —
    // and collapsing them into one message is what generates support mail.
    expect(worded(restoreStatusLine({ kind: 'restored', entitlementIds: ['case_pack'] }))).toContain(
      'unlocked',
    );
    expect(worded(restoreStatusLine({ kind: 'restored', entitlementIds: [] }))).toBe(
      'No purchases found for this store account.',
    );
  });

  it('agrees with itself about singular and plural', () => {
    expect(worded(restoreStatusLine({ kind: 'restored', entitlementIds: ['a'] }))).toContain(
      '1 purchase.',
    );
    expect(worded(restoreStatusLine({ kind: 'restored', entitlementIds: ['a', 'b'] }))).toContain(
      '2 purchases.',
    );
  });

  it('surfaces the reason the store was never switched on', () => {
    // A Test Store key in a release build lands here. The player sees why the
    // button did nothing instead of a dead row.
    //
    // Raw rather than a key, deliberately: the audience is whoever is holding a
    // developer build, and translating it would only make it harder to search.
    expect(restoreStatusLine({ kind: 'unavailable', reason: 'Test Store key in release' })).toEqual(
      { raw: 'Test Store key in release' },
    );
  });

  it('surfaces a failure message verbatim', () => {
    const failure = restoreStatusLine({
      kind: 'failed',
      message: { raw: 'Network request failed' },
    });
    expect(failure).toEqual({ raw: 'Network request failed' });
  });
});

describe('restoreIsBusy', () => {
  it('is true only while the request is in flight', () => {
    expect(restoreIsBusy({ kind: 'working' })).toBe(true);
    expect(restoreIsBusy({ kind: 'idle' })).toBe(false);
    expect(restoreIsBusy({ kind: 'restored', entitlementIds: [] })).toBe(false);
  });
});

describe('restoreErrorMessage', () => {
  it('uses an Error message', () => {
    expect(restoreErrorMessage(new Error('Network request failed'))).toEqual({
      raw: 'Network request failed',
    });
  });

  it('uses a thrown string', () => {
    expect(restoreErrorMessage('Offline')).toEqual({ raw: 'Offline' });
  });

  it('reads message off a plain object, which is how the SDK rejects sometimes', () => {
    // Without this branch String(e) renders "[object Object]" into the UI.
    expect(restoreErrorMessage({ message: 'Store unavailable' })).toEqual({
      raw: 'Store unavailable',
    });
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['an empty Error', new Error('')],
    ['a blank string', '   '],
    ['an object with no message', { code: 12 }],
    ['an object whose message is not a string', { message: 12 }],
  ])('falls back to something actionable for %s', (_label, thrown) => {
    expect(render(restoreErrorMessage(thrown), t)).toBe(
      'Could not reach the store. Check your connection and try again.',
    );
  });
});
