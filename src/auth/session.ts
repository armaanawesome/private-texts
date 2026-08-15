/**
 * The auth state machine, as a pure reduction.
 *
 * Pure so it can be tested in the Node suite, and separate from useAuth.ts so
 * the rules below are stated once rather than re-derived inside an effect. Two
 * bugs in this project's history came from state that changed identity on every
 * update and re-entered the effect that watched it, so reference stability is a
 * requirement here, not an optimisation.
 */

export interface AuthUser {
  id: string;
  /** Supabase permits accounts with no email on other providers; ours always has one. */
  email: string | null;
}

// Type-only, so this file stays a pure reduction with no runtime dependency on
// the catalogue — it names keys, it does not resolve them.
import type { Message } from '@/i18n/message';

export type AuthStatus =
  /** No usable Supabase config. Terminal for the life of the process. */
  | { kind: 'unavailable'; reason: string }
  /** Reading the stored session out of AsyncStorage. The launch state. */
  | { kind: 'restoring' }
  | { kind: 'signedOut' }
  | { kind: 'signedIn'; user: AuthUser };

export type AuthEvent =
  | { type: 'unavailable'; reason: string }
  /** A session from `getSession` or `onAuthStateChange`. null means signed out. */
  | { type: 'session'; user: AuthUser | null };

export const initialAuthStatus: AuthStatus = { kind: 'restoring' };

export function reduceAuth(previous: AuthStatus, event: AuthEvent): AuthStatus {
  if (event.type === 'unavailable') {
    if (previous.kind === 'unavailable' && previous.reason === event.reason) return previous;
    return { kind: 'unavailable', reason: event.reason };
  }

  /*
   * `unavailable` absorbs everything after it.
   *
   * There is no configured client in that state, so a session event cannot
   * legitimately arrive — and if a stale listener produced one anyway, showing
   * a signed-in account the app can neither refresh nor sync is worse than
   * saying accounts are off. The screen's whole job in this state is to explain
   * that and get out of the way.
   */
  if (previous.kind === 'unavailable') return previous;

  if (event.user === null) {
    return previous.kind === 'signedOut' ? previous : { kind: 'signedOut' };
  }

  // Same user, same object. supabase-js hands back a fresh session object on
  // every token refresh — roughly hourly — and storing those verbatim would
  // give `status` a new identity each time, re-firing every effect keyed on it.
  if (
    previous.kind === 'signedIn' &&
    previous.user.id === event.user.id &&
    previous.user.email === event.user.email
  ) {
    return previous;
  }

  return { kind: 'signedIn', user: event.user };
}

/**
 * What actually happened when a sign-up call came back without an error.
 *
 * Three different outcomes arrive through the same success path and need three
 * different things said to the player, so the branch is worth naming.
 */
export type SignUpOutcome =
  /** Email confirmation is off in the project: they are already in. */
  | 'signedIn'
  /** Confirmation is on. Nothing happens until they click the link. */
  | 'confirmEmail'
  /** The address already has an account. */
  | 'alreadyRegistered';

export function classifySignUp(input: {
  hasSession: boolean;
  /**
   * `user.identities.length`, or null when the field is absent.
   *
   * Supabase returns a user with an EMPTY identities array — and no error —
   * when the address is already registered, deliberately, so that sign-up
   * cannot be used to discover which addresses have accounts. Reading that as
   * success is how an app tells someone "check your email" for a mail that is
   * never sent.
   */
  identityCount: number | null;
}): SignUpOutcome {
  if (input.identityCount === 0) return 'alreadyRegistered';
  return input.hasSession ? 'signedIn' : 'confirmEmail';
}

/**
 * Supabase error text, classified into something a player can act on.
 *
 * Every branch names both the problem and the way out. The raw strings are
 * developer-facing and some of them ("Invalid login credentials") read as an
 * accusation rather than an instruction.
 *
 * Returns a `Message`, not a sentence. This used to return English prose, which
 * meant a player who had set the app to Spanish and then mistyped a password
 * got a Spanish screen with an English paragraph in the middle of it. Supabase
 * itself only speaks English here, so the classification has to happen on this
 * side and the wording has to come from the catalogue.
 *
 * The patterns match Supabase's *English* error text deliberately, and that is
 * a real dependency worth naming: these are matched against what the API
 * returns, not against anything the player sees, so they must not be
 * translated. If Supabase ever localises its errors, every branch here stops
 * firing and everything falls through to `raw` — degraded, but not broken.
 */
export function describeAuthError(raw: string | null | undefined): Message {
  const message = raw?.trim() ?? '';
  if (message === '') return { key: 'auth.error.generic' };

  if (/invalid login credentials|invalid.*password/i.test(message)) {
    return { key: 'auth.error.badCredentials' };
  }
  if (/email not confirmed/i.test(message)) {
    return { key: 'auth.error.emailUnconfirmed' };
  }
  if (/already registered|already been registered|user already exists/i.test(message)) {
    return { key: 'auth.error.alreadyRegistered' };
  }
  if (/password should be at least|password.*too short/i.test(message)) {
    return { key: 'auth.error.passwordShort' };
  }
  if (/rate limit|too many requests|for security purposes/i.test(message)) {
    return { key: 'auth.error.rateLimit' };
  }
  if (/network|fetch|timeout|failed to fetch|connection/i.test(message)) {
    return { key: 'auth.error.network' };
  }
  if (/email address.*invalid|invalid email/i.test(message)) {
    return { key: 'auth.error.badEmail' };
  }

  // Unrecognised errors are passed through rather than flattened into a generic
  // line: an unfamiliar message the player can screenshot is worth more than a
  // polished one that says nothing. Untranslated, necessarily — it is whatever
  // the server said.
  return { raw: message };
}
