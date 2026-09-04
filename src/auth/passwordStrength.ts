/**
 * What makes a new password acceptable, and how to show that while it is typed.
 *
 * Pure and import-free so the Node suite covers it, and so the same rules serve
 * two places that must not disagree: the live checklist under the field, and the
 * check that blocks the submit.
 *
 * ## These rules MIRROR the Supabase dashboard. They do not invent policy.
 *
 * Authentication → Policies is set to **minimum 8** and **"Lowercase, uppercase
 * letters, digits and symbols"**, so those are the five rules below. The server
 * is the authority; this file exists so somebody learns what is missing while
 * they can still see the field, rather than after a round trip.
 *
 * **When the dashboard changes, this file changes with it.** A checklist showing
 * green ticks against a server that then refuses is worse than no checklist at
 * all — it turns a small correction into a mystery. Not hypothetical: this file
 * asked for a letter and a digit while the dashboard asked for four character
 * classes, so `bakehouse1` passed here and would have been rejected there.
 *
 * Leaked-password protection is on in the same panel, checking Have I Been
 * Pwned. Nothing here duplicates it — a word list maintained in the client would
 * be a worse version of something the platform already does properly — and it is
 * one reason a sign-up can still fail with every rule below satisfied.
 */

/** Matches "Minimum password length" in the dashboard. */
export const MIN_PASSWORD_LENGTH = 8;

/** The length at which a password stops being merely long enough. */
const COMFORTABLE_LENGTH = 12;

/** Each is a line in the checklist under the field, in this order. */
export type PasswordRuleId = 'length' | 'lowercase' | 'uppercase' | 'number' | 'symbol';

export interface PasswordRule {
  readonly id: PasswordRuleId;
  readonly met: boolean;
}

export type PasswordStrength = 'weak' | 'fair' | 'strong';

export interface PasswordReport {
  readonly rules: readonly PasswordRule[];
  /** Every required rule is met. This is what the submit asks. */
  readonly meetsPolicy: boolean;
  /** Advisory only. A `fair` password is allowed; the meter is encouragement. */
  readonly strength: PasswordStrength;
  /** The first unmet rule, for the message beside the field. Null when it passes. */
  readonly firstUnmet: PasswordRuleId | null;
}

/*
 * Unicode-aware on purpose.
 *
 * The game ships in five languages, and `[a-z]` would tell somebody typing
 * `contraseña` that their password has no lowercase letters. `\p{Ll}` and
 * `\p{Lu}` are the Unicode cased-letter classes and `\p{Nd}` every decimal
 * digit, which is the only behaviour correct in all five.
 *
 * A symbol is defined by exclusion — anything that is not a letter, a digit or
 * whitespace — rather than as a list of punctuation, because a list would have
 * to guess which marks the server counts.
 */
const HAS_LOWER = /\p{Ll}/u;
const HAS_UPPER = /\p{Lu}/u;
const HAS_NUMBER = /\p{Nd}/u;
const HAS_SYMBOL = /[^\p{L}\p{Nd}\s]/u;

export function checkPassword(password: string): PasswordReport {
  const rules: readonly PasswordRule[] = [
    { id: 'length', met: password.length >= MIN_PASSWORD_LENGTH },
    { id: 'lowercase', met: HAS_LOWER.test(password) },
    { id: 'uppercase', met: HAS_UPPER.test(password) },
    { id: 'number', met: HAS_NUMBER.test(password) },
    { id: 'symbol', met: HAS_SYMBOL.test(password) },
  ];

  const meetsPolicy = rules.every((rule) => rule.met);
  const firstUnmet = rules.find((rule) => !rule.met)?.id ?? null;

  /*
   * Length is the only axis the policy does not already require, and it is the
   * one that still matters once four character classes are mandatory. Anything
   * the form would reject stays weak, so the meter can never encourage a
   * password that will not be accepted.
   */
  const strength: PasswordStrength = !meetsPolicy
    ? 'weak'
    : password.length >= COMFORTABLE_LENGTH
      ? 'strong'
      : 'fair';

  return { rules, meetsPolicy, strength, firstUnmet };
}
