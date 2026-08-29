import { isCaseUnlocked, type GateableCase } from '@/entitlements/access';

/**
 * Whether a case may be opened, taking both gates into account: the one the
 * player buys past, and the one they play past.
 *
 * Pure apart from the entitlement rule it composes, for the same reason
 * `access.ts` is: it has to be testable in the Node suite and reachable from a
 * route guard.
 *
 * ## Why the order of the two checks matters
 *
 * Progression is checked BEFORE entitlement, which looks backwards for a paid
 * app and is deliberate. A case five ahead of the player is both unbought and
 * unreachable; showing the paywall there sells somebody a case they still could
 * not open, and the purchase would feel broken through no fault of the store.
 *
 * Checking progression first also produces the honest funnel by accident. The
 * free cases are the first few, so the player meets the paywall at exactly the
 * moment they finish the last free case and the next one becomes reachable —
 * when the pitch is "keep going", not "buy this and wait".
 */

export interface OrderedCase extends GateableCase {
  readonly id: string;
}

export type CaseGate =
  /** Open it. */
  | { kind: 'open' }
  /** Not decided yet — entitlements or saved progress are still being read. */
  | { kind: 'checking' }
  /** Paid case, no entitlement. Send them to the paywall. */
  | { kind: 'locked-entitlement' }
  /** An earlier case is unfinished. `blockedByCaseId` is the one to finish. */
  | { kind: 'locked-progression'; blockedByCaseId: string };

/**
 * The earliest unsolved case before this one, or null if the way is clear.
 *
 * **All** preceding cases, not merely the immediate predecessor. Under linear
 * play the two are identical, so the difference only shows on a save that
 * predates ordering — where a player might have solved case five and skipped
 * four. Naming the *earliest* gap there sends them to the start of what they
 * missed rather than into the middle of it.
 *
 * A case absent from the order blocks nothing: an id this build no longer ships
 * must not wedge the rest of the list shut.
 */
export function firstUnsolvedBefore(
  caseId: string,
  order: readonly OrderedCase[],
  solvedIds: ReadonlySet<string>,
): string | null {
  const index = order.findIndex((c) => c.id === caseId);
  if (index <= 0) return null;
  for (const earlier of order.slice(0, index)) {
    if (!solvedIds.has(earlier.id)) return earlier.id;
  }
  return null;
}

export function decideCaseGate(input: {
  script: OrderedCase;
  order: readonly OrderedCase[];
  solvedIds: ReadonlySet<string>;
  entitlementIds: readonly string[];
  /** RevenueCat has not answered yet. */
  entitlementsLoading: boolean;
  /** Saved progress has not been read off disk yet. */
  progressLoaded: boolean;
}): CaseGate {
  /*
   * Fails closed while either answer is outstanding, and for the same reason
   * both times: "no entitlements yet" and "nothing solved yet" are the loading
   * state AND a real lock, and they are indistinguishable. Deciding early draws
   * every case locked on the first frame and unlocks them a moment later. That
   * flash was a real defect on this grid once already.
   */
  if (!input.progressLoaded) return { kind: 'checking' };

  const blockedBy = firstUnsolvedBefore(input.script.id, input.order, input.solvedIds);
  if (blockedBy !== null) return { kind: 'locked-progression', blockedByCaseId: blockedBy };

  if (isCaseUnlocked(input.script, input.entitlementIds)) return { kind: 'open' };
  return input.entitlementsLoading ? { kind: 'checking' } : { kind: 'locked-entitlement' };
}

/** Whether a gate should draw the tile as unavailable, whatever the reason. */
export function gateIsLocked(gate: CaseGate): boolean {
  return gate.kind === 'locked-entitlement' || gate.kind === 'locked-progression';
}
