import { describe, it, expect } from 'vitest';
import { isCaseUnlocked, decideCaseAccess, singleCaseEntitlement, holdsCasePack } from './access';
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

const FREE = { id: 'the-lighthouse' } as const;
const PAID = { id: 'the-wake', requiredEntitlementId: CASE_PACK_ENTITLEMENT } as const;

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

  /**
   * A case can now be bought two ways: the pack, or that one case on its own.
   * Both must work, and neither may shadow the other — somebody who owns the
   * pack must never be locked out of a case because they did not also buy it
   * singly, and the reverse.
   */
  it('opens a paid case for someone who bought only that case', () => {
    expect(isCaseUnlocked(PAID, [singleCaseEntitlement('the-wake')])).toBe(true);
  });

  /**
   * The pack entitlement moved from `case_pack_1` to `all_cases`, because the
   * Test Store would not let the original's price change. Anyone who bought the
   * old one keeps what they paid for — revoking twelve cases because a string
   * was renamed is the worst outcome available here, and it would be completely
   * silent.
   */
  it('still honours the retired pack entitlement', () => {
    expect(isCaseUnlocked(PAID, ['case_pack_1'])).toBe(true);
  });

  it('honours the pack entitlement that is on sale now', () => {
    expect(isCaseUnlocked(PAID, ['all_cases'])).toBe(true);
  });

  it('does not open a case with a DIFFERENT case bought singly', () => {
    expect(isCaseUnlocked(PAID, [singleCaseEntitlement('the-bothy')])).toBe(false);
  });

  it('opens for either route, and for both at once', () => {
    expect(isCaseUnlocked(PAID, [CASE_PACK_ENTITLEMENT])).toBe(true);
    expect(isCaseUnlocked(PAID, [singleCaseEntitlement('the-wake')])).toBe(true);
    expect(isCaseUnlocked(PAID, [CASE_PACK_ENTITLEMENT, singleCaseEntitlement('the-wake')])).toBe(
      true,
    );
  });
});

describe('holdsCasePack', () => {
  /**
   * The paywall's own question when it was opened with no case in hand. It must
   * agree with `isCaseUnlocked` on the pack, or the screen either closes on
   * somebody who bought nothing or stays open on somebody who bought everything.
   */
  it('accepts the pack on sale now and the one that used to be', () => {
    expect(holdsCasePack(['all_cases'])).toBe(true);
    expect(holdsCasePack(['case_pack_1'])).toBe(true);
    expect(holdsCasePack(['nothing', 'all_cases'])).toBe(true);
  });

  it('is not satisfied by one case, or by nothing', () => {
    expect(holdsCasePack([])).toBe(false);
    expect(holdsCasePack([singleCaseEntitlement('the-wake')])).toBe(false);
    expect(holdsCasePack(['case_pack_01'])).toBe(false);
  });

  it('agrees with isCaseUnlocked wherever the pack is what grants a case', () => {
    for (const ids of [[], ['all_cases'], ['case_pack_1'], ['unrelated']]) {
      expect(holdsCasePack(ids)).toBe(isCaseUnlocked(PAID, ids));
    }
  });
});

describe('singleCaseEntitlement', () => {
  /**
   * The identifier is a contract with the RevenueCat dashboard, and a near miss
   * there is the exact failure `ids.ts` documents: the purchase succeeds, the
   * receipt is valid, and the player is granted something this app does not
   * recognise. So the shape is pinned, not merely described.
   */
  it('is single_case_<id> with underscores, matching what the dashboard must declare', () => {
    expect(singleCaseEntitlement('the-wake')).toBe('single_case_the_wake');
    expect(singleCaseEntitlement('sunday-service')).toBe('single_case_sunday_service');
    expect(singleCaseEntitlement('tutorial')).toBe('single_case_tutorial');
  });

  it('never collides between two different cases', () => {
    const ids = ['the-wake', 'the-bothy', 'the-cut', 'open-mic', 'the-reunion'];
    expect(new Set(ids.map(singleCaseEntitlement)).size).toBe(ids.length);
  });

  /** It must never accidentally equal the pack entitlement, which grants everything. */
  it('is never the pack entitlement', () => {
    for (const id of ['pack-1', 'case-pack-1', 'the-wake']) {
      expect(singleCaseEntitlement(id)).not.toBe(CASE_PACK_ENTITLEMENT);
    }
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
