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
 * Supabase error text, rewritten as something a player can act on.
 *
 * Every branch names both the problem and the way out. The raw strings are
 * developer-facing and some of them ("Invalid login credentials") read as an
 * accusation rather than an instruction.
 */
export function describeAuthError(raw: string | null | undefined): string {
  const message = raw?.trim() ?? '';
  if (message === '') return 'Something went wrong. Try again in a moment.';

  if (/invalid login credentials|invalid.*password/i.test(message)) {
    return 'That email and password do not match an account. Check both, or create an account instead.';
  }
  if (/email not confirmed/i.test(message)) {
    return 'Confirm your email first — the link is in your inbox. Check spam if it is not there.';
  }
  if (/already registered|already been registered|user already exists/i.test(message)) {
    return 'That email already has an account. Sign in instead.';
  }
  if (/password should be at least|password.*too short/i.test(message)) {
    return 'That password is too short. Use at least 6 characters.';
  }
  if (/rate limit|too many requests|for security purposes/i.test(message)) {
    return 'Too many attempts. Wait a minute and try again.';
  }
  if (/network|fetch|timeout|failed to fetch|connection/i.test(message)) {
    return 'Could not reach the server. Check your connection and try again — your progress is safe on this device.';
  }
  if (/email address.*invalid|invalid email/i.test(message)) {
    return 'That does not look like an email address. Check it and try again.';
  }

  // Unrecognised errors are passed through rather than flattened into a generic
  // line: an unfamiliar message the player can screenshot is worth more than a
  // polished one that says nothing.
  return message;
}
