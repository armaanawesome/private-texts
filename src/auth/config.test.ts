import { describe, it, expect } from 'vitest';
import {
  decideSupabaseConfig,
  SUPABASE_URL_VAR,
  SUPABASE_ANON_KEY_VAR,
} from './config';

/**
 * Two failures are guarded here, and they are not the same size.
 *
 * The first is a repeat of the RevenueCat launch crash: a client configured
 * with a bad key took the app down on the splash screen before a screen
 * rendered. Auth is optional in this game, so a missing or malformed config
 * must always degrade to "accounts are off" and never to a crash.
 *
 * The second is worse and quieter. `EXPO_PUBLIC_*` values are inlined into the
 * bundle and extractable from any build. A service-role key pasted into the
 * anon variable bypasses row-level security, so it would work flawlessly in
 * testing while handing every player everyone else's rows.
 */

const URL = 'https://abcdefgh.supabase.co';

/** A legacy Supabase key is a JWT; only the payload matters to this policy. */
const jwtWithRole = (role: string): string =>
  [
    Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({ iss: 'supabase', role })).toString('base64url'),
    'not-a-real-signature',
  ].join('.');

const ANON_JWT = jwtWithRole('anon');

describe('decideSupabaseConfig', () => {
  it('configures a client when both variables are set', () => {
    expect(decideSupabaseConfig({ url: URL, anonKey: ANON_JWT })).toEqual({
      kind: 'configured',
      url: URL,
      anonKey: ANON_JWT,
    });
  });

  it('accepts a current-format publishable key', () => {
    const config = decideSupabaseConfig({ url: URL, anonKey: 'sb_publishable_abc123' });
    expect(config.kind).toBe('configured');
  });

  describe('missing configuration', () => {
    it('names the URL variable when only it is missing', () => {
      const config = decideSupabaseConfig({ url: undefined, anonKey: ANON_JWT });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toContain(SUPABASE_URL_VAR);
      expect(config.reason).not.toContain(SUPABASE_ANON_KEY_VAR);
    });

    it('names the key variable when only it is missing', () => {
      const config = decideSupabaseConfig({ url: URL, anonKey: undefined });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toContain(SUPABASE_ANON_KEY_VAR);
    });

    it('names both when neither is set', () => {
      const config = decideSupabaseConfig({ url: undefined, anonKey: undefined });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toContain(SUPABASE_URL_VAR);
      expect(config.reason).toContain(SUPABASE_ANON_KEY_VAR);
    });

    it('says the game still plays, because it does', () => {
      // Auth is optional. A reason that reads like a fatal error would send the
      // next person debugging a build that is working exactly as designed.
      const config = decideSupabaseConfig({ url: undefined, anonKey: undefined });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toMatch(/plays normally|without it/i);
    });

    it('treats whitespace-only values as missing', () => {
      // EAS hands back an empty string for a variable that was registered and
      // then left blank, which otherwise reads as "present".
      expect(decideSupabaseConfig({ url: '   ', anonKey: ANON_JWT }).kind).toBe('unavailable');
      expect(decideSupabaseConfig({ url: URL, anonKey: '\n  ' }).kind).toBe('unavailable');
    });

    it('trims padded values rather than rejecting them', () => {
      expect(decideSupabaseConfig({ url: `  ${URL}\n`, anonKey: ` ${ANON_JWT} ` })).toEqual({
        kind: 'configured',
        url: URL,
        anonKey: ANON_JWT,
      });
    });
  });

  describe('the service-role guard', () => {
    it('REFUSES a legacy service-role key', () => {
      // The whole point of this file. Returning `configured` here ships a key
      // that bypasses row-level security inside a public bundle.
      const config = decideSupabaseConfig({ url: URL, anonKey: jwtWithRole('service_role') });
      expect(config.kind).toBe('unavailable');
    });

    it('REFUSES a current-format secret key', () => {
      const config = decideSupabaseConfig({ url: URL, anonKey: 'sb_secret_abc123' });
      expect(config.kind).toBe('unavailable');
    });

    it('says what is wrong and to rotate the key', () => {
      // A bare "auth unavailable" would get the key swapped and the leaked one
      // left live in the project.
      const config = decideSupabaseConfig({ url: URL, anonKey: jwtWithRole('service_role') });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toMatch(/service role/i);
      expect(config.reason).toMatch(/rotate/i);
    });

    it('still accepts the anon key, which is the one that belongs here', () => {
      expect(decideSupabaseConfig({ url: URL, anonKey: ANON_JWT }).kind).toBe('configured');
    });

    it('does not reject a key it simply cannot decode', () => {
      // Only positive evidence disables auth. Guessing at an unfamiliar but
      // valid key format would break accounts for no reason.
      expect(decideSupabaseConfig({ url: URL, anonKey: 'opaque-key-format' }).kind).toBe(
        'configured',
      );
      expect(decideSupabaseConfig({ url: URL, anonKey: 'a.b.c' }).kind).toBe('configured');
    });
  });

  describe('the URL', () => {
    it('rejects something that is not a URL', () => {
      const config = decideSupabaseConfig({ url: 'abcdefgh.supabase.co', anonKey: ANON_JWT });
      if (config.kind !== 'unavailable') throw new Error('expected unavailable');
      expect(config.reason).toContain('https://');
    });

    it('accepts a local Supabase stack over http', () => {
      const config = decideSupabaseConfig({ url: 'http://127.0.0.1:54321', anonKey: ANON_JWT });
      expect(config.kind).toBe('configured');
    });

    it('strips a trailing slash rather than rejecting it', () => {
      // Pasting the dashboard URL usually brings one along, and it produces a
      // doubled slash in every request path.
      const config = decideSupabaseConfig({ url: `${URL}/`, anonKey: ANON_JWT });
      if (config.kind !== 'configured') throw new Error('expected configured');
      expect(config.url).toBe(URL);
    });
  });

  it('never returns an empty reason', () => {
    const bad = [
      { url: undefined, anonKey: undefined },
      { url: 'nonsense', anonKey: ANON_JWT },
      { url: URL, anonKey: 'sb_secret_x' },
    ];
    for (const input of bad) {
      const config = decideSupabaseConfig(input);
      if (config.kind !== 'unavailable') throw new Error(`expected unavailable for ${input.url}`);
      expect(config.reason.length).toBeGreaterThan(20);
    }
  });
});
