import { describe, it, expect } from 'vitest';
import {
  reduceAuth,
  classifySignUp,
  describeAuthError,
  initialAuthStatus,
  type AuthStatus,
} from './session';

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
  it('turns a failed login into an instruction, not an accusation', () => {
    const message = describeAuthError('Invalid login credentials');
    expect(message).toMatch(/do not match/i);
    // The recovery matters: most people hitting this have never signed up.
    expect(message).toMatch(/create an account/i);
  });

  it('points at the inbox for an unconfirmed email', () => {
    expect(describeAuthError('Email not confirmed')).toMatch(/inbox/i);
  });

  it('sends an existing account to sign-in', () => {
    expect(describeAuthError('User already registered')).toMatch(/sign in/i);
  });

  it('reassures that local progress survives a network failure', () => {
    // The one error a player is most likely to see, and the one where the fear
    // is "have I lost my case notes".
    expect(describeAuthError('Network request failed')).toMatch(/safe on this device/i);
  });

  it('passes an unrecognised message through rather than flattening it', () => {
    expect(describeAuthError('Signups not allowed for this instance')).toBe(
      'Signups not allowed for this instance',
    );
  });

  it('never returns an empty string', () => {
    for (const input of [null, undefined, '', '   ']) {
      expect(describeAuthError(input).length).toBeGreaterThan(0);
    }
  });
});
