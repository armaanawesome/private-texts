import { describe, it, expect } from 'vitest';
import { validateCredentials, normaliseEmail, MIN_PASSWORD_LENGTH } from './credentials';

const signIn = (email: string, password: string) =>
  validateCredentials({ email, password, mode: 'signIn' });
const signUp = (email: string, password: string) =>
  validateCredentials({ email, password, mode: 'signUp' });

describe('validateCredentials', () => {
  it('accepts a filled-in form', () => {
    expect(signIn('alex@example.com', 'hunter22')).toBeNull();
    expect(signUp('alex@example.com', 'hunter22')).toBeNull();
  });

  describe('email', () => {
    it('asks for an address when the field is empty', () => {
      expect(signIn('', 'hunter22')).toEqual({
        field: 'email',
        message: 'Enter your email address.',
      });
    });

    it('treats a whitespace-only field as empty', () => {
      expect(signIn('   ', 'hunter22')?.field).toBe('email');
    });

    it('catches an address with no @', () => {
      expect(signIn('alex.example.com', 'hunter22')?.field).toBe('email');
    });

    it('catches an address with no domain dot', () => {
      expect(signIn('alex@example', 'hunter22')?.field).toBe('email');
    });

    it('ignores surrounding whitespace rather than failing on it', () => {
      // Autofill and paste both bring spaces along.
      expect(signIn('  alex@example.com  ', 'hunter22')).toBeNull();
    });

    it('reports the email before the password', () => {
      // Both are wrong here. Reporting the password first would move focus past
      // the field that actually needs fixing.
      expect(signIn('nonsense', '')?.field).toBe('email');
    });
  });

  describe('password', () => {
    it('asks for a password when the field is empty', () => {
      expect(signIn('alex@example.com', '')).toEqual({
        field: 'password',
        message: 'Enter your password.',
      });
    });

    it('requires the minimum length when creating an account', () => {
      const problem = signUp('alex@example.com', 'abc');
      expect(problem?.field).toBe('password');
      expect(problem?.message).toContain(String(MIN_PASSWORD_LENGTH));
    });

    it('does NOT apply the length rule when signing in', () => {
      /*
       * The distinction that matters. At sign-in the account already exists and
       * its password is whatever it is — possibly set before this minimum, or
       * set from another client. Enforcing a local guess about server policy
       * here tells a player their own correct password is invalid, and there is
       * no way for them to get past it.
       */
      expect(signIn('alex@example.com', 'abc')).toBeNull();
    });

    it('accepts a password of exactly the minimum length', () => {
      expect(signUp('alex@example.com', 'a'.repeat(MIN_PASSWORD_LENGTH))).toBeNull();
    });

    it('does not trim the password', () => {
      // Spaces are legal password characters and trimming them would silently
      // send something other than what was typed.
      expect(signUp('alex@example.com', '  abcd  ')).toBeNull();
    });
  });
});

describe('normaliseEmail', () => {
  it('lowercases and trims', () => {
    // Supabase stores addresses lowercased. Without this, signing up as
    // alex@example.com and back in as Alex@Example.com looks to the player like
    // the same address being rejected.
    expect(normaliseEmail('  Alex@Example.COM ')).toBe('alex@example.com');
  });

  it('leaves an already-clean address alone', () => {
    expect(normaliseEmail('alex@example.com')).toBe('alex@example.com');
  });
});
