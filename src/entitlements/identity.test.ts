import { describe, it, expect } from 'vitest';
import { decideIdentityAction, isAnonymousId, ANONYMOUS_ID_PREFIX } from './identity';

/**
 * The transition these pin is the one that costs money to get wrong.
 *
 * Calling `logIn` with a second id while the first is still active does not
 * fail — RevenueCat aliases the two accounts together, permanently, and two
 * people who shared a phone then share their purchases. So 'switch' has to be a
 * distinct outcome from 'identify', because only 'switch' obliges the caller to
 * log out first.
 */

const A = '9f2c4d61-0000-4000-8000-000000000001';
const B = '9f2c4d61-0000-4000-8000-000000000002';

describe('decideIdentityAction', () => {
  it('does nothing when nothing changed', () => {
    expect(decideIdentityAction(null, null)).toBe('none');
    expect(decideIdentityAction(A, A)).toBe('none');
  });

  it('identifies on sign-in', () => {
    expect(decideIdentityAction(null, A)).toBe('identify');
  });

  it('forgets on sign-out', () => {
    expect(decideIdentityAction(A, null)).toBe('forget');
  });

  /** Never 'identify'. A second logIn over a live id is the aliasing bug. */
  it('reports a different account as a switch, which is not an identify', () => {
    expect(decideIdentityAction(A, B)).toBe('switch');
    expect(decideIdentityAction(A, B)).not.toBe('identify');
  });

  it('is exhaustive over every combination of two ids and null', () => {
    const seen = new Set(
      [null, A, B].flatMap((prev) => [null, A, B].map((next) => decideIdentityAction(prev, next))),
    );
    expect(seen).toEqual(new Set(['none', 'identify', 'forget', 'switch']));
  });
});

describe('isAnonymousId', () => {
  /**
   * `logOut` rejects when the SDK is already anonymous, so this guard is the
   * difference between a clean sign-out and a warning on every guest sign-out.
   */
  it('recognises the id RevenueCat generates for an unidentified install', () => {
    expect(isAnonymousId(`${ANONYMOUS_ID_PREFIX}a1b2c3`)).toBe(true);
  });

  it('does not mistake a real user id for an anonymous one', () => {
    expect(isAnonymousId(A)).toBe(false);
    expect(isAnonymousId('')).toBe(false);
    // The prefix has to lead. An id merely containing it belongs to somebody else.
    expect(isAnonymousId(`user_${ANONYMOUS_ID_PREFIX}x`)).toBe(false);
  });
});
