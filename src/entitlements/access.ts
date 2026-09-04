/**
 * Whether a case may be opened, as a pure decision.
 *
 * Pure, and its only import is the zero-import ids.ts - the property that
 * matters is keeping react-native-purchases out of the graph, not the literal
 * absence of an import line. Same reason `keyPolicy.ts` and `ids.ts` are: it
 * has to be testable in the Node suite, and it must stay reachable from a route
 * guard without dragging react-native-purchases into the import graph.
 *
 * ## Why this is a module and not an inline expression
 *
 * It used to be a one-line const inside `app/index.tsx`, and that placement was
 * the entire vulnerability. The case list decided lock state in order to choose
 * a link target — `<Link href={locked ? '/paywall' : '/case/…'}>` — so the rule
 * only ever ran on the screen a player *came from*, never on the screen they
 * arrived at. Nothing at the destination re-asked the question.
 *
 * `app.json` sets `"scheme": "privatetexts"`, and expo-router derives a deep
 * link for every file in `app/` with no allowlist. So every paid case answered
 * to a URL that skipped the tile entirely:
 *
 *     privatetexts://case/the-wake/threads
 *
 * Twelve of sixteen cases — the whole paid catalogue — opened in full from a
 * link anyone could type, with no rooting, no patched bundle, no proxy. The
 * content is all bundled locally, so there was no server round trip left to
 * fail and nothing else to stop it.
 *
 * The rule now lives here and is enforced at `app/case/[caseId]/_layout.tsx`,
 * the one component every case tab and the thread screen route through. A gate
 * at the destination cannot be walked around by arriving a different way.
 */
import { CASE_PACK_ENTITLEMENT, LEGACY_PACK_ENTITLEMENTS } from './ids';

/**
 * The one field gating needs. Structural rather than importing `CaseScript`, so
 * this module keeps zero imports and `content/` can stay loadable in plain Node.
 */
export interface GateableCase {
  readonly id: string;
  readonly requiredEntitlementId?: string | undefined;
}

/**
 * The entitlement that unlocks ONE case on its own.
 *
 * Derived from the case id rather than written down per case, so a seventeenth
 * case is sellable the day it is authored with nothing to add here. RevenueCat
 * entitlement identifiers do not take hyphens comfortably, hence the underscore.
 *
 * `ids.ts` carries the story of what happens when an identifier here and one in
 * the dashboard disagree: `purchase()` still succeeds, the receipt is still
 * valid, and the player pays for nothing. So the dashboard entitlement for a
 * single case MUST be exactly this string — `single_case_the_wake` for
 * `the-wake` — and `diagnoseEntitlements()` proves which is actually granted.
 *
 * ## The prefix is `single_case_`, and that is a security boundary
 *
 * It was `case_`, which a test caught colliding: a case with the id `pack-1`
 * produced `case_pack_1`, **exactly** `CASE_PACK_ENTITLEMENT`. Buying that one
 * case for a pound would have unlocked all twelve. `single_case_` cannot collide
 * with `case_pack_1` for any input at all, because the two prefixes are
 * disjoint — the guarantee is structural rather than a promise about which case
 * ids somebody will choose later.
 */
export const SINGLE_CASE_PREFIX = 'single_case_';

export function singleCaseEntitlement(caseId: string): string {
  return `${SINGLE_CASE_PREFIX}${caseId.replace(/-/g, '_')}`;
}

/**
 * Free cases carry no `requiredEntitlementId` at all, so absence means open.
 *
 * Stated positively — the case names what unlocks it and the player must hold
 * exactly that — rather than as a list of locked ids. A denylist would have to
 * be updated every time a pack ships, and forgetting once ships it for free.
 */
export function isCaseUnlocked(
  script: GateableCase,
  entitlementIds: readonly string[],
): boolean {
  const required = script.requiredEntitlementId;
  if (required === undefined) return true;
  /*
   * Three ways in, and deliberately an OR with no precedence:
   *
   *  - the pack on sale now (`all_cases`),
   *  - a pack that used to be on sale (`case_pack_1`), because renaming a string
   *    is not a reason to revoke twelve cases somebody paid for,
   *  - this one case, bought on its own.
   *
   * Owning the pack must never be *worse* than owning a single case, whichever
   * arrived first, which is why none of these shadows another.
   */
  if (entitlementIds.includes(required)) return true;
  if (LEGACY_PACK_ENTITLEMENTS.some((id) => entitlementIds.includes(id))) return true;
  return entitlementIds.includes(singleCaseEntitlement(script.id));
}

/**
 * Whether they hold the pack — the one on sale now, or one that used to be.
 *
 * For the caller that has no case in hand: the paywall reached without a
 * `caseId` is selling the pack and nothing else, so the pack is what closes it.
 *
 * It exists so that caller does not write `requiredEntitlementId` itself.
 * `routeGuards.test.ts` fails any file under `app/` that mentions the field,
 * because a route reasoning about it is a second definition of the lock rule,
 * and a second definition is exactly how the grid and the route came to
 * disagree the first time.
 */
export function holdsCasePack(entitlementIds: readonly string[]): boolean {
  if (entitlementIds.includes(CASE_PACK_ENTITLEMENT)) return true;
  return LEGACY_PACK_ENTITLEMENTS.some((id) => entitlementIds.includes(id));
}

export type CaseAccess =
  /** Open it. Either the case is free or the player holds the entitlement. */
  | { kind: 'allowed' }
  /** RevenueCat has not answered yet. Render nothing; do not decide. */
  | { kind: 'checking' }
  /** Paid case, no entitlement. Send them somewhere they can buy it. */
  | { kind: 'blocked' };

/**
 * The guard's decision, including the state that makes a naive guard wrong.
 *
 * `useEntitlements` starts at `entitlementIds: []` with `loading: true`, so a
 * guard that redirects the moment it sees an empty array would bounce a paying
 * player out of a case they own, every time, in the window before the store
 * answers. That is not a hypothetical race — it is the guaranteed first render.
 *
 * So `checking` is a distinct outcome from `blocked`. It fails CLOSED: the case
 * is not rendered while the answer is unknown, it is simply not decided yet.
 *
 * When purchases are switched off for the build — a Test Store key in a release
 * binary, which `keyPolicy.ts` deliberately allows — `loading` still settles to
 * false with no entitlements, so paid cases resolve to `blocked`. That matches
 * what the case list already shows in the same build, and the two must agree:
 * a grid that draws a case locked while the route lets it open is the same bug
 * in the other direction.
 */
export function decideCaseAccess(input: {
  script: GateableCase;
  entitlementIds: readonly string[];
  loading: boolean;
}): CaseAccess {
  if (isCaseUnlocked(input.script, input.entitlementIds)) return { kind: 'allowed' };
  // Order matters: an owned case is allowed even mid-load, so a player who
  // already has the entitlement never sees a blank frame on the way in.
  return input.loading ? { kind: 'checking' } : { kind: 'blocked' };
}
