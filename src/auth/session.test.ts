import { describe, it, expect } from 'vitest';
import {
  reduceAuth,
  classifySignUp,
  describeAuthError,
  initialAuthStatus,
  type AuthStatus,
} from './session';
import { render } from '@/i18n/message';
import { makeTranslator } from '@/i18n/translate';
import { EN } from '@/i18n/strings';
import { SUPPORTED_LOCALES } from '@/i18n/locales';

const t = makeTranslator('en');

const user = { id: 'u1', email: 'alex@example.com' };

describe('reduceAuth', () => {
  it('starts by restoring, because a stored session takes a read to find', () => {
    // Showing "signed out" during the read would flash a sign-in prompt at
    // someone who is signed in, on every single launch.
    expect(initialAuthStatus).toEqual({ kind: 'restoring' });
  });

  it('signs in when a session arrives', () => {
    const next = reduceAuth(initialAuthStatus, { type: 'session', user });
    expect(next).toEqual({ kind: 'signedIn', user });
  });

  it('signs out when the session is null', () => {
    expect(reduceAuth(initialAuthStatus, { type: 'session', user: null })).toEqual({
      kind: 'signedOut',
    });
  });

  it('signs out when a signed-in session ends', () => {
    const signedIn: AuthStatus = { kind: 'signedIn', user };
    expect(reduceAuth(signedIn, { type: 'session', user: null })).toEqual({ kind: 'signedOut' });
  });

  describe('reference stability', () => {
    /*
     * This project has twice hit "Maximum update depth exceeded" from state that
     * got a new identity on every update and re-entered the effect watching it.
     * supabase-js refreshes the token roughly hourly and hands back a fresh
     * session object each time, so these are not hypothetical.
     */

    it('returns the SAME object when the same user is re-reported', () => {
      const signedIn: AuthStatus = { kind: 'signedIn', user };
      const next = reduceAuth(signedIn, { type: 'session', user: { ...user } });
      expect(next).toBe(signedIn);
    });

    it('returns the same object when already signed out', () => {
      const signedOut: AuthStatus = { kind: 'signedOut' };
      expect(reduceAuth(signedOut, { type: 'session', user: null })).toBe(signedOut);
    });

    it('returns the same object when the reason is unchanged', () => {
      const off: AuthStatus = { kind: 'unavailable', reason: 'no key' };
      expect(reduceAuth(off, { type: 'unavailable', reason: 'no key' })).toBe(off);
    });

    it('still produces a new object when the user actually changes', () => {
      const signedIn: AuthStatus = { kind: 'signedIn', user };
      const next = reduceAuth(signedIn, {
        type: 'session',
        user: { id: 'u2', email: 'sam@example.com' },
      });
      expect(next).not.toBe(signedIn);
      expect(next).toEqual({ kind: 'signedIn', user: { id: 'u2', email: 'sam@example.com' } });
    });

    it('produces a new object when only the email changed', () => {
      const signedIn: AuthStatus = { kind: 'signedIn', user };
      const next = reduceAuth(signedIn, {
        type: 'session',
        user: { id: 'u1', email: 'new@example.com' },
      });
      expect(next).not.toBe(signedIn);
    });
  });

  describe('unavailable is terminal', () => {
    it('absorbs a session event rather than signing anyone in', () => {
      // There is no configured client that could have produced this. Accepting
      // it would show an account the app can neither refresh nor sync.
      const off: AuthStatus = { kind: 'unavailable', reason: 'no key' };
      expect(reduceAuth(off, { type: 'session', user })).toBe(off);
    });

    it('absorbs a sign-out event too', () => {
      const off: AuthStatus = { kind: 'unavailable', reason: 'no key' };
      expect(reduceAuth(off, { type: 'session', user: null })).toBe(off);
    });

    it('can be entered from any state', () => {
      const states: AuthStatus[] = [
        { kind: 'restoring' },
        { kind: 'signedOut' },
        { kind: 'signedIn', user },
      ];
      for (const state of states) {
        expect(reduceAuth(state, { type: 'unavailable', reason: 'no key' })).toEqual({
          kind: 'unavailable',
          reason: 'no key',
        });
      }
    });
  });
});

describe('classifySignUp', () => {
  it('reports an existing account when identities come back empty', () => {
    // Supabase returns a user with no identities and NO error for an address
    // that is already registered, so sign-up cannot be used to enumerate
    // accounts. Reading that as success tells someone to check an inbox for a
    // mail that was never sent.
    expect(classifySignUp({ hasSession: false, identityCount: 0 })).toBe('alreadyRegistered');
  });

  it('prefers the existing-account reading even if a session came back', () => {
    expect(classifySignUp({ hasSession: true, identityCount: 0 })).toBe('alreadyRegistered');
  });

  it('signs in directly when the project has confirmation switched off', () => {
    expect(classifySignUp({ hasSession: true, identityCount: 1 })).toBe('signedIn');
  });

  it('waits for confirmation when there is no session', () => {
    expect(classifySignUp({ hasSession: false, identityCount: 1 })).toBe('confirmEmail');
  });

  it('falls back on the session when identities are absent entirely', () => {
    expect(classifySignUp({ hasSession: true, identityCount: null })).toBe('signedIn');
    expect(classifySignUp({ hasSession: false, identityCount: null })).toBe('confirmEmail');
  });
});

describe('describeAuthError', () => {
  /**
   * Asserts against the English catalogue, not against a returned sentence.
   *
   * These used to match the function's own output, because it returned English
   * prose. It now returns a key, which is what stops a Spanish player getting
   * an English paragraph in the middle of a translated sign-in screen — so the
   * wording lives in `EN` and the test resolves it the way the screen does.
   */
  const worded = (raw: string | null | undefined): string => render(describeAuthError(raw), t);

  it('turns a failed login into an instruction, not an accusation', () => {
    const message = worded('Invalid login credentials');
    expect(message).toMatch(/do not match/i);
    // The recovery matters: most people hitting this have never signed up.
    expect(message).toMatch(/create an account/i);
  });

  it('points at the inbox for an unconfirmed email', () => {
    expect(worded('Email not confirmed')).toMatch(/inbox/i);
  });

  it('sends an existing account to sign-in', () => {
    expect(worded('User already registered')).toMatch(/sign in/i);
  });

  it('reassures that local progress survives a network failure', () => {
    // The one error a player is most likely to see, and the one where the fear
    // is "have I lost my case notes".
    expect(worded('Network request failed')).toMatch(/safe on this device/i);
  });

  it('passes an unrecognised message through rather than flattening it', () => {
    const out = describeAuthError('Signups not allowed for this instance');
    // Raw, explicitly: the point is that it did NOT get classified, and a key
    // here would mean some pattern had started matching things it should not.
    expect(out).toEqual({ raw: 'Signups not allowed for this instance' });
  });

  it('never returns an empty string, in any locale', () => {
    for (const input of [null, undefined, '', '   ']) {
      for (const locale of SUPPORTED_LOCALES) {
        const out = render(describeAuthError(input), makeTranslator(locale.tag));
        expect(out.length, `${locale.tag} renders nothing for ${JSON.stringify(input)}`).
          toBeGreaterThan(0);
      }
    }
  });

  /**
   * Every key this can name has to exist, in English at least. The union is
   * checked by the compiler, but a key present in the type and absent from the
   * catalogue would render as the key itself — `auth.error.rateLimit` on screen.
   */
  it('names only keys the catalogue defines', () => {
    const inputs = [
      'Invalid login credentials',
      'Email not confirmed',
      'User already registered',
      'Password should be at least 6 characters',
      'Rate limit exceeded',
      'Network request failed',
      'Unable to validate email address: invalid format',
      '',
    ];
    for (const input of inputs) {
      const out = describeAuthError(input);
      if (out.key === undefined) continue;
      expect(EN[out.key], `no catalogue entry for ${out.key}`).toBeDefined();
    }
  });
});
