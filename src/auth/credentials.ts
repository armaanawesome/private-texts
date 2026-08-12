/**
 * Client-side credential checks, so the obvious mistakes never cost a round
 * trip and never come back as developer-facing server text.
 *
 * This is not validation in the security sense — Supabase enforces the real
 * rules and this file cannot be trusted by anything. It exists so that a
 * missing `@` is caught next to the field the player is looking at rather than
 * surfacing as "Unable to validate email address: invalid format" from the API.
 */

export type CredentialField = 'email' | 'password';

export interface CredentialProblem {
  /** Which input to attach the message to. Errors belong beside their cause. */
  field: CredentialField;
  message: string;
}

/** Supabase's own default minimum. Duplicated knowingly; see the note below. */
export const MIN_PASSWORD_LENGTH = 6;

/**
 * Deliberately loose. The only job is catching a typo the player can see for
 * themselves — a missing `@`, a trailing comma, a whole sentence in the field.
 * Anything stricter starts rejecting addresses that genuinely deliver, and the
 * server is the real authority regardless.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed and lowercased. Supabase stores addresses lowercased, so sending
 *  `Alex@Example.com` at sign-in after signing up as `alex@example.com` would
 *  otherwise look to the player like the same address failing. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateCredentials(input: {
  email: string;
  password: string;
  mode: 'signIn' | 'signUp';
}): CredentialProblem | null {
  const email = input.email.trim();

  if (email === '') {
    return { field: 'email', message: 'Enter your email address.' };
  }
  if (!EMAIL.test(email)) {
    return { field: 'email', message: 'That does not look like an email address.' };
  }
  if (input.password === '') {
    return { field: 'password', message: 'Enter your password.' };
  }

  /*
   * The length rule applies to sign-up only.
   *
   * At sign-in the account already exists and its password is whatever it is —
   * possibly set before the minimum changed, possibly set elsewhere. Enforcing
   * a local rule there would block a valid login on a guess about server
   * policy, and tell the player their own correct password is invalid.
   */
  if (input.mode === 'signUp' && input.password.length < MIN_PASSWORD_LENGTH) {
    return {
      field: 'password',
      message: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  return null;
}
