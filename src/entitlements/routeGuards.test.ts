import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

/**
 * The paywall must be enforced at the case ROUTE, not on the tile that links to
 * it — and it must stay that way.
 *
 * This reads source rather than rendering, for the same reason
 * `src/engine/boundary.test.ts` does: the property being defended is structural,
 * the components need a renderer the Node suite does not have, and a comment
 * asking the next person not to undo it has already been proven insufficient.
 *
 * ## The bug this exists to prevent recurring
 *
 * Lock state was computed in `app/index.tsx` purely to choose a link target:
 * `<Link href={locked ? '/paywall' : '/case/…'}>`. That decides what a tile
 * does. It does not decide what a route does. `app.json` registers
 * `"scheme": "privatetexts"` and expo-router derives a deep link for every file
 * under `app/` with no allowlist, so all twelve paid cases opened in full from a
 * URL anyone could type:
 *
 *     privatetexts://case/the-wake/threads
 *
 * No rooting, no patched bundle, no proxy. Every case's prose is bundled into
 * the app, so once the route rendered there was nothing left to say no.
 *
 * `src/entitlements/access.test.ts` proves the RULE is right. This file proves
 * the rule is APPLIED, which is the half that was actually missing.
 */

const APP = join(process.cwd(), 'app');
const read = (...parts: string[]) => readFileSync(join(APP, ...parts), 'utf8');

function routeFilesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...routeFilesUnder(full));
    else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) out.push(full);
  }
  return out;
}

describe('the case route enforces entitlement', () => {
  const layout = read('case', '[caseId]', '_layout.tsx');

  it('asks the shared rule, rather than restating it', () => {
    expect(layout).toMatch(/import\s*\{[^}]*decideCaseAccess[^}]*\}\s*from\s*'@\/entitlements\/access'/);
    expect(layout).toContain('decideCaseAccess({');
  });

  it('refuses to render a blocked case', () => {
    expect(layout).toMatch(/access\.kind === 'blocked'/);
    expect(layout).toMatch(/access\.kind === 'blocked'[\s\S]{0,80}Redirect/);
  });

  /**
   * Failing closed is the whole point, but it must not fail closed on the
   * paying customer. `useEntitlements` opens at `[]` with `loading: true`, so a
   * guard that only checked for a blocked verdict would eject an owner from
   * their own case on the first render.
   */
  it('holds rather than decides while the store is still answering', () => {
    expect(layout).toMatch(/access\.kind === 'checking'/);
  });

  /**
   * The subtle half.
   *
   * This layout is the only thing that loads a script into `useCaseStore`, and
   * `app/thread/[threadId].tsx` renders whatever the store holds. Guarding only
   * the render path would still let the effect populate the store on the way
   * out, leaving the paid case readable at a second URL after the first
   * bounced. So the load itself has to be gated, not just the output.
   */
  it('gates the script load, not only the render', () => {
    // Located by the loadScript call rather than by taking the first useEffect
    // in the file. The naive version broke the moment a second effect was added
    // above this one, which is a false alarm on a real change - the worst kind
    // of test, because the next person's instinct is to loosen the assertion.
    const load = layout.indexOf('loadScript(script)');
    const effect = layout.slice(layout.lastIndexOf('useEffect(', load), load);
    expect(effect).toContain('mayLoad');
  });

  /**
   * The same bypass, one gate later.
   *
   * Linear progression is enforced on the tile, and a tile decides what a TAP
   * does and nothing more. Without a check here, `privatetexts://case/<id>/threads`
   * walks straight past the order the whole feature exists to impose.
   */
  it('enforces linear progression at the route, not only on the grid', () => {
    expect(layout).toContain('firstUnsolvedBefore');
    expect(layout).toContain("if (blockedBy !== null) return <Redirect");
  });
});

describe('the lock rule has exactly one definition', () => {
  /**
   * The vulnerability was a local copy of the rule living next to the thing that
   * wanted a link target. Any route that reads `requiredEntitlementId` directly
   * is re-deriving the rule, and a second derivation is how the grid and the
   * route come to disagree again.
   */
  it.each(routeFilesUnder(APP).map((f) => [f.slice(APP.length + 1).split(sep).join('/'), f]))(
    'app/%s does not reason about requiredEntitlementId itself',
    (_name, file) => {
      expect(readFileSync(file, 'utf8')).not.toContain('requiredEntitlementId');
    },
  );
});

describe('the Test Store harness is not shipped', () => {
  const debug = read('debug.tsx');

  /**
   * `app/index.tsx` wraps the link to this screen in `__DEV__`, which hides the
   * entrance and nothing else: the route is still a file under `app/`, so
   * expo-router still published it and `app/_layout.tsx` still registered its
   * screen. `privatetexts://debug` therefore opened a live purchase-and-restore
   * harness, plus internal entitlement diagnostics, in a release build.
   *
   * The guard has to be in the screen, because the screen is what the URL
   * reaches.
   */
  it('redirects out of itself in a release build', () => {
    expect(debug).toMatch(/if\s*\(\s*!__DEV__\s*\)\s*return\s*<Redirect/);
  });

  it('still hides its entrance on the case list', () => {
    expect(read('index.tsx')).toMatch(/__DEV__\s*\?[\s\S]{0,200}href="\/debug"/);
  });
});
