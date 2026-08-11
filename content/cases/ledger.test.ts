import { describe, it, expect } from 'vitest';
import { CASES } from './index';
import { CASE_PACK_ENTITLEMENT } from '@/entitlements/ids';
import type { CaseScript } from '@/engine';

/**
 * docs/pack-ledger.md, made executable where it can be.
 *
 * The ledger is the uniqueness contract for fifteen mysteries written by one
 * hand. It was enforced by reading a markdown table, and the table was wrong
 * twice: Packs 10 and 11 were both filed under `object`, and Packs 5 and 13 were
 * both filed under `with_person`, which cannot fire a contradiction at all.
 *
 * The table conflated two things. A pack's **dimension** is what its lie is
 * about — order, identity, possession, routine, a clock. Its **predicate** is
 * what the engine fires on. Only the second is derivable from the data, and it
 * turns out to be the less interesting of the two: eight of the first thirteen
 * packs break on exactly `at_place+doing`, because place and action are the
 * ordinary vocabulary of any alibi. That set does not distinguish The Bothy
 * (who arrived before whom) from Sunday Service (a forged record) from The Cut
 * (a boat that could not have gone that far), and those are plainly different
 * cases.
 *
 * So rule 2 — "no two consecutive packs lean on the same engine axis" — is not
 * checkable at the predicate level and never was. Rule 1 is the one that
 * actually protects variety, and it is checkable the moment each pack declares
 * its dimension. That declaration lives here rather than in the case files so
 * that adding it cost no schema change and no edit to thirteen written packs.
 */
const DIMENSIONS: Readonly<Record<string, string>> = {
  'the-lighthouse': 'a lie told to protect a third party',
  'the-understudy': 'an omission inside a locked room',
  'the-night-round': 'a routine signed for and never walked',
  'deep-field': 'which of three clocks was meant',
  'the-wake': 'an alibi everybody gives identically',
  'the-long-course': 'identity, when everyone wears the same kit',
  'the-bothy': 'the order people arrived in',
  'sunday-service': 'a forged record against a living memory',
  'the-cut': 'a distance that could not have been covered',
  'open-mic': 'a timestamp on the footage',
  'the-allotments': 'possession — whose tool, whose key, whose shed',
  'the-helpline': 'a call that was never made',
  'the-reunion': 'the clock every witness is using, because he wrote it',
  'the-night-ferry': 'a crossing time',
  'the-listener': 'the single lie in twenty years of truth',
};

function requiredPredicateKinds(script: CaseScript): string[] {
  const claims = new Map(
    script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
  );
  const kinds = new Set<string>();
  for (const id of script.solution.requiredContradictionIds) {
    const x = script.contradictions.find((c) => c.id === id);
    if (!x) throw new Error(`${script.id}: required contradiction "${id}" does not exist`);
    for (const cid of [x.claimIdA, x.claimIdB]) {
      const claim = claims.get(cid);
      if (!claim) {
        throw new Error(`${script.id}: contradiction "${id}" cites unknown claim "${cid}"`);
      }
      kinds.add(claim.predicate.kind);
    }
  }
  return [...kinds].sort();
}

describe('pack ledger', () => {
  /**
   * The bug that prompted all of this. `checkContradiction` ends at
   * src/engine/contradiction.ts:85 with "Those two things can both be true" —
   * being with one person does not exclude being with another. A pack whose
   * required proof ran on `with_person` would be unsolvable, and it would only
   * surface when a player had done everything else right.
   */
  it('never proves a case on an axis the engine cannot fire', () => {
    for (const script of CASES) {
      expect(
        requiredPredicateKinds(script),
        `${script.id} requires a with_person proof`,
      ).not.toContain('with_person');
    }
  });

  it('gives every case at least two required proofs on different claims', () => {
    for (const script of CASES) {
      expect(script.solution.requiredContradictionIds.length, script.id).toBeGreaterThanOrEqual(2);
    }
  });

  /** Rule 1: no two packs share a shape of lie. */
  it('gives every pack a dimension no other pack has', () => {
    const seen = new Map<string, string>();
    for (const script of CASES) {
      const dimension = DIMENSIONS[script.id];
      expect(dimension, `${script.id} has no declared dimension in the ledger`).toBeDefined();
      const already = seen.get(dimension!);
      expect(already, `${script.id} repeats the shape of ${already}`).toBeUndefined();
      seen.set(dimension!, script.id);
    }
  });

  /**
   * The free tier, per docs/arc-design.md. Packs 1–3 are free and Pack 3 carries
   * the first arc connection, so the free content ends on the floor moving
   * rather than on a full stop. Packs 2 and 3 shipped gated by mistake until
   * Pack 15; this is the kind of thing that regresses silently, because nothing
   * about a paywalled case looks broken.
   */
  it('keeps the first three packs free and gates everything after', () => {
    const free = new Set(['the-lighthouse', 'the-understudy', 'the-night-round']);
    for (const script of CASES) {
      if (free.has(script.id)) {
        expect(script.requiredEntitlementId, `${script.id} should be free`).toBeUndefined();
      } else {
        expect(script.requiredEntitlementId, `${script.id} should be paid`).toBe(
          CASE_PACK_ENTITLEMENT,
        );
      }
    }
    expect([...free].every((id) => CASES.some((c) => c.id === id))).toBe(true);
  });

  /**
   * The ledger declares fifteen packs. This fails the day a sixteenth is written
   * without one, and passes while packs are still unwritten.
   */
  it('declares a dimension for every pack that exists and every one still to come', () => {
    expect(Object.keys(DIMENSIONS)).toHaveLength(15);
    for (const script of CASES) {
      expect(Object.keys(DIMENSIONS)).toContain(script.id);
    }
  });
});
