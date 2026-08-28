import { describe, it, expect } from 'vitest';
import { isCaseUnlocked, decideCaseAccess } from './access';
import { CASE_PACK_ENTITLEMENT } from './ids';

/**
 * These tests guard a paywall bypass that shipped.
 *
 * Lock state was computed on the case list, purely to choose a link target, and
 * nothing re-checked it at the destination. Because expo-router derives a deep
 * link for every route under `app/` and `app.json` registers the
 * `privatetexts://` scheme, all twelve paid cases opened in full from a typed
 * URL — `privatetexts://case/the-wake/threads` — with no tooling of any kind.
 *
 * The rule below is now the single definition, and the case route enforces it.
 * What these tests actually protect is the pair of properties that make the
 * guard usable: it must fail closed while the store is still answering, and it
 * must not strand a paying player in that same window.
 */

const FREE = {} as const;
const PAID = { requiredEntitlementId: CASE_PACK_ENTITLEMENT } as const;

describe('isCaseUnlocked', () => {
  it('opens a case that names no entitlement', () => {
    expect(isCaseUnlocked(FREE, [])).toBe(true);
  });

  it('opens a paid case for a holder of exactly that entitlement', () => {
    expect(isCaseUnlocked(PAID, [CASE_PACK_ENTITLEMENT])).toBe(true);
  });

  it('keeps a paid case shut for someone holding nothing', () => {
    expect(isCaseUnlocked(PAID, [])).toBe(false);
  });

  /**
   * The failure mode that made `case_pack_01` vs `case_pack_1` cost a real
   * purchase: a near-miss id is not a match, and must not be treated as one.
   */
  it('does not accept an entitlement id that merely looks similar', () => {
    expect(isCaseUnlocked(PAID, ['case_pack_01'])).toBe(false);
    expect(isCaseUnlocked(PAID, ['case_pack'])).toBe(false);
    expect(isCaseUnlocked(PAID, ['CASE_PACK_1'])).toBe(false);
  });

  it('finds the entitlement among others', () => {
    expect(isCaseUnlocked(PAID, ['something_else', CASE_PACK_ENTITLEMENT])).toBe(true);
  });
});

describe('decideCaseAccess', () => {
  it('allows a free case without waiting for the store', () => {
    expect(decideCaseAccess({ script: FREE, entitlementIds: [], loading: true })).toEqual({
      kind: 'allowed',
    });
  });

  /**
   * The whole reason `checking` exists.
   *
   * `useEntitlements` opens at `[]` with `loading: true`, so a guard that
   * redirected on an empty array would eject a paying player from a case they
   * own on the very first render — every single time, not as a race.
   */
  it('withholds a paid case while the store is still answering, without blocking it', () => {
    expect(decideCaseAccess({ script: PAID, entitlementIds: [], loading: true })).toEqual({
      kind: 'checking',
    });
  });

  it('does not strand a player who already holds the entitlement mid-load', () => {
    expect(
      decideCaseAccess({ script: PAID, entitlementIds: [CASE_PACK_ENTITLEMENT], loading: true }),
    ).toEqual({ kind: 'allowed' });
  });

  it('blocks a paid case once the store has answered with nothing', () => {
    expect(decideCaseAccess({ script: PAID, entitlementIds: [], loading: false })).toEqual({
      kind: 'blocked',
    });
  });

  /**
   * Purchases can be switched off for a whole build — a Test Store key in a
   * release binary, which keyPolicy.ts allows on purpose so the app launches at
   * all. Entitlements then settle empty, and paid cases must read as blocked,
   * because that is exactly what the case grid draws in the same build. A grid
   * that shows a case locked while the route opens it is the same defect
   * pointing the other way.
   */
  it('blocks paid cases when the store is unavailable for the build', () => {
    expect(decideCaseAccess({ script: PAID, entitlementIds: [], loading: false })).toEqual({
      kind: 'blocked',
    });
  });

  it('never returns checking once loading has settled', () => {
    for (const script of [FREE, PAID]) {
      for (const ids of [[], [CASE_PACK_ENTITLEMENT]]) {
        const access = decideCaseAccess({ script, entitlementIds: ids, loading: false });
        expect(access.kind).not.toBe('checking');
      }
    }
  });
});
