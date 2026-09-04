import { useEffect, useRef } from 'react';
import { decideIdentityAction } from './identity';
import { forgetUser, identifyUser } from './revenuecat';

/**
 * Keeps RevenueCat's idea of the player in step with Supabase's.
 *
 * Mounted once, at the root, because it has to run whether or not anybody opens
 * the sign-in screen — the whole point is the launch where a returning player is
 * already signed in on a new phone and expects their cases to be there.
 *
 * ## Why the work is queued rather than awaited in place
 *
 * A switch is two calls that must not interleave: `logOut` and then `logIn`. If a
 * second change arrives while the first pair is in flight — signing out and
 * straight back in, which is exactly what switching accounts looks like — the
 * two sequences race, and losing that race means calling `logIn` with a second
 * id while the first is still active. RevenueCat responds by **aliasing the two
 * accounts together permanently**, and the client cannot undo it.
 *
 * Chaining onto the previous promise makes the order the order the events
 * arrived in, which is the only order that is ever correct.
 *
 * `restoring` reaches this as `null`, the same as signed out — and that is right,
 * because the previous value is also null on the first render, so the transition
 * is 'none' and nothing happens until the session actually resolves. A hook that
 * read "not known yet" as "signed out" would log the player out of RevenueCat on
 * every single launch.
 */
export function useRevenueCatIdentity(userId: string | null): void {
  const previous = useRef<string | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    const next = userId;
    const action = decideIdentityAction(previous.current, next);
    if (action === 'none') return;
    // Recorded before the work runs, so a second change is compared against
    // where we are heading rather than where we were.
    previous.current = next;

    queue.current = queue.current
      .then(async () => {
        if (next === null) {
          await forgetUser();
          return;
        }
        if (action === 'switch') await forgetUser();
        await identifyUser(next);
      })
      .catch(() => {
        // identifyUser and forgetUser already swallow and log their own
        // failures. This is the belt on the braces: an unhandled rejection here
        // would break the chain and silently stop every later transition.
      });
  }, [userId]);
}
