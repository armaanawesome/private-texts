/**
 * Client-side credential checks, so the obvious mistakes never cost a round trip
 * and never come back as developer-facing server text.
 *
 * This is not validation in the security sense — Supabase enforces the real
 * rules and nothing may trust this file. It exists so that a missing `@` is
 * caught next to the field the player is looking at, rather than surfacing as
 * "Unable to validate email address: invalid format" from the API.
 */
import type { StringKey } from '@/i18n/strings';
import type { Message } from '@/i18n/message';
import { checkPassword, type PasswordRuleId } from './passwordStrength';

export { MIN_PASSWORD_LENGTH } from './passwordStrength';

export type CredentialField = 'email' | 'password';

export interface CredentialProblem {
  /** Which input to attach the message to. Errors belong beside their cause. */
  field: CredentialField;
  /**
   * A key, not a sentence.
   *
   * These were English prose in a game that ships in five languages, so a
   * Spanish player who left the email field empty was told "Enter your email
   * address." — the same defect the home screen had with
   * "3 de 4 probadas. Última partida 2 hours ago", and the reason `Message`
   * exists. The screen turns it into words at render time, in the language being
   * read now rather than the one active when the mistake was made.
   */
  message: Message;
}

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

/**
 * Written out rather than built as `signIn.rule.${id}`, so every value is a real
 * `StringKey` the compiler can check. A template literal would type as `string`
 * and a renamed key would surface as a raw dotted id on the screen.
 */
export const RULE_MESSAGE_KEY: Readonly<Record<PasswordRuleId, StringKey>> = {
  length: 'signIn.rule.length',
  lowercase: 'signIn.rule.lowercase',
  uppercase: 'signIn.rule.uppercase',
  number: 'signIn.rule.number',
  symbol: 'signIn.rule.symbol',
};

export function validateCredentials(input: {
  email: string;
  password: string;
  mode: 'signIn' | 'signUp';
}): CredentialProblem | null {
  const email = input.email.trim();

  if (email === '') {
    return { field: 'email', message: { key: 'signIn.problem.emailEmpty' } };
  }
  if (!EMAIL.test(email)) {
    return { field: 'email', message: { key: 'signIn.problem.emailShape' } };
  }
  if (input.password === '') {
    return { field: 'password', message: { key: 'signIn.problem.passwordEmpty' } };
  }

  /*
   * The password policy applies to sign-up only.
   *
   * At sign-in the account already exists and its password is whatever it is —
   * possibly set before the rules changed, possibly set elsewhere. Enforcing the
   * local policy there would block a valid login on a guess about server policy,
   * and tell the player their own correct password is invalid.
   */
  if (input.mode === 'signUp') {
    const report = checkPassword(input.password);
    if (report.firstUnmet !== null) {
      /*
       * Names the FIRST unmet rule rather than listing all of them. The
       * checklist under the field already shows every rule and its state; this
       * line is what a screen reader announces, so it should say the single next
       * thing to do.
       */
      return { field: 'password', message: { key: RULE_MESSAGE_KEY[report.firstUnmet] } };
    }
  }

  return null;
}
