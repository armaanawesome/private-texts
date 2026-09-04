/**
 * What makes a new password acceptable, and how to show that while it is typed.
 *
 * Pure and import-free so the Node suite covers it, and so the same rules serve
 * two places that must not disagree: the live checklist under the field, and the
 * check that blocks the submit. A screen showing three green ticks that then
 * refuses to submit is worse than no checklist at all.
 *
 * ## This is a usability control, not a security control
 *
 * Nothing here is trusted. Supabase enforces the real minimum server-side, and
 * anybody can bypass this file by talking to the API directly. Its job is to stop
 * somebody choosing `dog` and finding out only after a round trip, and to say
 * what is missing while they can still see the field.
 *
 * **The stronger protection is server-side and belongs in the dashboard**:
 * Authentication → Policies carries a minimum length and a leaked-password check
 * against Have I Been Pwned. A list of banned passwords maintained here would be
 * a worse version of something the platform already does properly, so there is
 * not one.
 *
 * ## Why the minimum is 8 and not Supabase's default 6
 *
 * Six characters with no other requirement admits `abcdef`. Eight with a letter
 * and a digit is the floor most people already expect and costs a player nothing
 * they will notice. It applies to NEW passwords only — see credentials.ts for why
 * enforcing it at sign-in would lock people out of their own accounts.
 */

export const MIN_PASSWORD_LENGTH = 8;

/** The length at which a password stops being merely long enough. */
const COMFORTABLE_LENGTH = 12;

/** Each is a line in the checklist under the field, in this order. */
export type PasswordRuleId = 'length' | 'letter' | 'number';

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

const HAS_LETTER = /\p{L}/u;
const HAS_NUMBER = /\p{Nd}/u;
/** Anything that is not a letter, a digit, or whitespace. Bonus, never required. */
const HAS_SYMBOL = /[^\p{L}\p{Nd}\s]/u;

/**
 * Unicode-aware on purpose.
 *
 * The game ships in five languages, and `[a-zA-Z]` would tell somebody typing
 * `contraseña` or `paßwort` that their password contains no letters. `\p{L}` and
 * `\p{Nd}` cover every alphabet and every decimal digit, which is the only
 * behaviour that is correct in all five.
 */
export function checkPassword(password: string): PasswordReport {
  const rules: readonly PasswordRule[] = [
    { id: 'length', met: password.length >= MIN_PASSWORD_LENGTH },
    { id: 'letter', met: HAS_LETTER.test(password) },
    { id: 'number', met: HAS_NUMBER.test(password) },
  ];

  const meetsPolicy = rules.every((rule) => rule.met);
  const firstUnmet = rules.find((rule) => !rule.met)?.id ?? null;

  // Two ways past the floor, so the meter has somewhere to go for people who
  // prefer a long passphrase to a short one with punctuation in it. Neither is
  // required; both are worth showing.
  const bonus =
    (HAS_SYMBOL.test(password) ? 1 : 0) + (password.length >= COMFORTABLE_LENGTH ? 1 : 0);

  const strength: PasswordStrength = !meetsPolicy ? 'weak' : bonus >= 2 ? 'strong' : 'fair';

  return { rules, meetsPolicy, strength, firstUnmet };
}
