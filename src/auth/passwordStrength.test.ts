import { describe, it, expect } from 'vitest';
import { checkPassword, MIN_PASSWORD_LENGTH } from './passwordStrength';
import { RULE_MESSAGE_KEY } from './credentials';
import { EN } from '@/i18n/strings';

/**
 * The property that matters most here is not any single rule — it is that the
 * checklist and the submit ask the same question. They are the same function,
 * and these pin that they stay so: a screen showing three green ticks that then
 * refuses to submit is worse than no checklist at all.
 */

describe('checkPassword', () => {
  it('accepts a password that meets every rule', () => {
    const report = checkPassword('detective7');
    expect(report.meetsPolicy).toBe(true);
    expect(report.firstUnmet).toBeNull();
  });

  it('rejects one that is long enough but has no digit', () => {
    const report = checkPassword('a'.repeat(MIN_PASSWORD_LENGTH));
    expect(report.meetsPolicy).toBe(false);
    expect(report.firstUnmet).toBe('number');
  });

  it('rejects one that is all digits', () => {
    expect(checkPassword('12345678').firstUnmet).toBe('letter');
  });

  it('rejects one that is too short even when it has both', () => {
    expect(checkPassword('ab1').firstUnmet).toBe('length');
  });

  it('reports the FIRST unmet rule, in checklist order', () => {
    // Short, no letter, no digit: every rule fails, and the message names length
    // because that is the line the player reads first.
    expect(checkPassword('...').firstUnmet).toBe('length');
  });

  it('treats the empty password as failing rather than as neutral', () => {
    const report = checkPassword('');
    expect(report.meetsPolicy).toBe(false);
    expect(report.rules.every((rule) => !rule.met)).toBe(true);
  });

  /**
   * The game ships in five languages. `[a-zA-Z]` would tell somebody typing
   * `contraseña` that their password contains no letters.
   */
  it('counts letters and digits from any alphabet', () => {
    expect(checkPassword('contraseña7').meetsPolicy).toBe(true);
    expect(checkPassword('paßwort12').meetsPolicy).toBe(true);
    expect(checkPassword('Ermittlung9').meetsPolicy).toBe(true);
  });

  it('does not count a symbol as a letter', () => {
    expect(checkPassword('!!!!!!!!7').firstUnmet).toBe('letter');
  });
});

describe('the strength meter', () => {
  it('is weak for anything that does not meet the policy', () => {
    expect(checkPassword('').strength).toBe('weak');
    expect(checkPassword('abc').strength).toBe('weak');
    expect(checkPassword('a'.repeat(40)).strength).toBe('weak');
  });

  it('is fair once the policy is met', () => {
    expect(checkPassword('bakehouse1').strength).toBe('fair');
  });

  it('is strong for a long password with a symbol in it', () => {
    expect(checkPassword('bakehouse-lane-1974').strength).toBe('strong');
  });

  /** Never better than weak while the submit would refuse it. */
  it('never encourages a password the form would reject', () => {
    for (const candidate of ['', 'a', 'aaaaaaa', '1234567', '!!!!!!!!!!!!']) {
      const report = checkPassword(candidate);
      if (!report.meetsPolicy) expect(report.strength).toBe('weak');
    }
  });
});

describe('the rule messages', () => {
  /** Stops a rule shipping as a blank line under the field. */
  it('names a real English string for every rule', () => {
    for (const rule of checkPassword('').rules) {
      expect(EN[RULE_MESSAGE_KEY[rule.id]]).toBeTruthy();
    }
  });

  /**
   * The length line is the only one that takes the number, and it must take it
   * from the constant rather than spelling it out — the two going out of step is
   * how a form comes to demand eight characters while telling you it needs six.
   */
  it('takes the minimum from the constant rather than hardcoding it', () => {
    expect(EN[RULE_MESSAGE_KEY.length]).toContain('{count}');
    expect(EN[RULE_MESSAGE_KEY.length]).not.toContain(String(MIN_PASSWORD_LENGTH));
  });
});
