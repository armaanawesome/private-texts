/**
 * Whether a case may be opened, as a pure decision.
 *
 * Pure and import-free for the same reason `keyPolicy.ts` and `ids.ts` are: it
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

/**
 * The one field gating needs. Structural rather than importing `CaseScript`, so
 * this module keeps zero imports and `content/` can stay loadable in plain Node.
 */
export interface GateableCase {
  readonly requiredEntitlementId?: string | undefined;
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
  return required === undefined || entitlementIds.includes(required);
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
