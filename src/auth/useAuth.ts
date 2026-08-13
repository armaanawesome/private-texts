import { useCallback, useEffect, useReducer } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import type { User } from '@supabase/supabase-js';
import { getSupabase } from './client';
import {
  reduceAuth,
  initialAuthStatus,
  describeAuthError,
  classifySignUp,
  type AuthStatus,
  type AuthUser,
  type SignUpOutcome,
} from './session';
import { normaliseEmail } from './credentials';

/**
 * The auth session, wired to the Supabase client.
 *
 * All the decisions live in session.ts, which is pure and tested. This file is
 * only subscriptions and their teardown — the part that cannot run in the Node
 * suite, kept as thin as possible for exactly that reason.
 */

export type AuthAttempt = { ok: true } | { ok: false; message: string };
export type SignUpAttempt = { ok: true; outcome: SignUpOutcome } | { ok: false; message: string };

export interface AuthApi {
  status: AuthStatus;
  signIn: (email: string, password: string) => Promise<AuthAttempt>;
  signUp: (email: string, password: string) => Promise<SignUpAttempt>;
  signOut: () => Promise<void>;
}

const toAuthUser = (user: User | null | undefined): AuthUser | null =>
  user ? { id: user.id, email: user.email ?? null } : null;

export function useAuth(): AuthApi {
  const [status, dispatch] = useReducer(reduceAuth, initialAuthStatus);

  useEffect(() => {
    const handle = getSupabase();
    if (handle.kind === 'unavailable') {
      dispatch({ type: 'unavailable', reason: handle.reason });
      return;
    }
    const { client } = handle;
    let active = true;

    // The stored session. Until this resolves the status is `restoring`, which
    // is what stops a sign-in prompt flashing at someone who is already signed
    // in on every launch.
    void client.auth
      .getSession()
      .then(({ data }) => {
        if (active) dispatch({ type: 'session', user: toAuthUser(data.session?.user) });
      })
      .catch(() => {
        // A failed read is not a crash and not a signed-in state. Treat it as
        // signed out; the player can sign in again, and nothing local is lost.
        if (active) dispatch({ type: 'session', user: null });
      });

    /*
     * The listener, not the sign-in call, is what flips the UI — the same shape
     * as the entitlements listener, and for the same reason. It also catches
     * changes this screen never initiated: a token refresh, a revoked session,
     * or a sign-out triggered from another tab of the same app.
     */
    const { data: authSubscription } = client.auth.onAuthStateChange((_event, session) => {
      if (active) dispatch({ type: 'session', user: toAuthUser(session?.user) });
    });

    /*
     * supabase-js refreshes the access token on a timer, and that timer keeps
     * firing in the background where the request cannot complete — which
     * eventually rotates the refresh token against a dead connection and signs
     * the player out for no reason. Driving it from AppState is the documented
     * fix for React Native.
     */
    const onAppStateChange = (next: AppStateStatus) => {
      if (next === 'active') void client.auth.startAutoRefresh();
      else void client.auth.stopAutoRefresh();
    };
    onAppStateChange(AppState.currentState);
    const appStateSubscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      active = false;
      authSubscription.subscription.unsubscribe();
      appStateSubscription.remove();
      void client.auth.stopAutoRefresh();
    };
    // Empty on purpose. `getSupabase` is a process-wide singleton and `dispatch`
    // is stable, so there is nothing here that can change and re-run this — the
    // condition that produced "Maximum update depth exceeded" twice already.
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthAttempt> => {
    const handle = getSupabase();
    if (handle.kind === 'unavailable') return { ok: false, message: handle.reason };
    const { error } = await handle.client.auth.signInWithPassword({
      email: normaliseEmail(email),
      password,
    });
    if (error) return { ok: false, message: describeAuthError(error.message) };
    // No dispatch here. The listener above delivers the session, so purchase
    // and restore converge on one path — see the entitlements module.
    return { ok: true };
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<SignUpAttempt> => {
    const handle = getSupabase();
    if (handle.kind === 'unavailable') return { ok: false, message: handle.reason };
    const { data, error } = await handle.client.auth.signUp({
      email: normaliseEmail(email),
      password,
    });
    if (error) return { ok: false, message: describeAuthError(error.message) };
    return {
      ok: true,
      outcome: classifySignUp({
        hasSession: data.session !== null,
        // `identities` is optional in the type and absent on some responses;
        // null means "no evidence", which classifySignUp handles separately
        // from an empty array.
        identityCount: data.user?.identities?.length ?? null,
      }),
    };
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    const handle = getSupabase();
    if (handle.kind === 'unavailable') return;
    /*
     * Signing out clears the Supabase session only. Case saves stay on the
     * device untouched, because the game is fully playable signed out and
     * wiping progress at sign-out would punish someone for leaving an optional
     * account. Their rows also stay on the server, ready for the next sign-in.
     */
    await handle.client.auth.signOut();
  }, []);

  return { status, signIn, signUp, signOut };
}
