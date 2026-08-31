import { useEffect, useMemo, useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, Redirect, Stack, Link, useRouter } from 'expo-router';
import { theme } from '@/ui/theme';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { visibleThreads } from '@/engine';
import { useCaseStore } from '@/state/caseStore';
import { loadProgress, readSolvedCaseIds } from '@/state/persistence';
import { CASES } from '@content/cases';
import { firstUnsolvedBefore } from '@/state/progression';
import { useTranslator } from '@/i18n/useTranslator';
import { useLocalisedCase } from '@/i18n/useCase';
import { useEntitlements } from '@/entitlements/useEntitlements';
import { decideCaseAccess } from '@/entitlements/access';
import { ThreadListSkeleton } from '@/ui/Skeleton';
import { useBed } from '@/audio';

/**
 * `Link` rather than `router.back()`, precisely because there is nothing to go
 * back to — that is the only situation this renders in. `replace`, so it swaps
 * the case for the home screen instead of stacking one on top of it.
 */
function HomeLink({ label }: { label: string }) {
  return (
    <Link href="/" replace asChild>
      <Pressable accessibilityRole="button" hitSlop={theme.hit.slop}>
        <Text style={styles.headerLink}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  headerLink: { ...theme.type.body, color: theme.color.accent },
});

export default function CaseLayout() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const router = useRouter();
  const t = useTranslator();
  const script = useLocalisedCase(caseId);
  const loadScript = useCaseStore((s) => s.loadScript);
  const relocaliseScript = useCaseStore((s) => s.relocaliseScript);
  const loaded = useCaseStore((s) => s.script);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const { entitlementIds, loading: entitlementsLoading } = useEntitlements();

  /*
   * The progression gate, enforced HERE as well as on the tile.
   *
   * Exactly the lesson the paywall bypass taught: a rule applied only where the
   * player came from is not applied at all, because expo-router publishes a
   * deep link for every route under app/. A grid that draws a case locked while
   * `privatetexts://case/the-wake/threads` opens it is the same defect wearing
   * different clothes.
   */
  const [solvedIds, setSolvedIds] = useState<ReadonlySet<string> | null>(null);
  useEffect(() => {
    let alive = true;
    void readSolvedCaseIds().then((s) => {
      if (alive) setSolvedIds(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  const blockedBy =
    script && solvedIds ? firstUnsolvedBefore(script.id, CASES, solvedIds) : null;


  /*
   * The case's own name in the bar.
   *
   * Unset, expo-router falls back to the route pattern, so this screen was
   * titled `case/[caseId]` on a device - and the conversation screen's back
   * button read `< case/[caseId]` with it, because iOS takes the back label from
   * the parent's title. Two bugs, one cause.
   *
   * Memoised for the reason app/_layout.tsx documents: an inline literal is a
   * new reference every render, so the navigator calls setOptions, re-renders,
   * and loops until React throws.
   */
  /*
   * A way out, even when there is no history to go back through.
   *
   * The navigator draws a back button from the stack, so a case that is the only
   * entry on it gets none — which is how the first build stranded a player
   * inside the demo case: onboarding redirected rather than pushed, consuming
   * the home screen on the way past. The navigation is fixed at its source, and
   * this is the guard for the routes that can still arrive with an empty stack
   * whatever onboarding does: `privatetexts://case/the-bakehouse/threads`, and
   * every other deep link expo-router publishes for free.
   *
   * Read ONCE, into state, and the dependency below is the resulting boolean —
   * never the router object. Every other screenOptions memo in this app depends
   * on `t` and a title and nothing else, deliberately: if the options object's
   * identity changes on any render, `Stack.Screen` calls setOptions, the
   * navigator re-renders, and it loops until React throws "Maximum update depth
   * exceeded". app/_layout.tsx documents that crash. Putting a router object in
   * this dep array would bet the whole case screen on its identity being stable;
   * a boolean costs nothing and cannot lose that bet.
   *
   * Once is also correct on its own terms: the history beneath a screen is fixed
   * at the moment it is pushed, so there is nothing here to re-read.
   */
  // Each case gets its own room tone. Null while the script resolves, which
  // the player reads as silence rather than as the menu bed leaking in.
  useBed(script?.id ?? null);

  const [canGoBack] = useState(() => router.canGoBack());
  const screenOptions = useMemo(
    () => ({
      title: script?.title ?? '',
      ...(canGoBack ? null : { headerLeft: () => <HomeLink label={t('case.allCases')} /> }),
    }),
    [script?.title, canGoBack, t],
  );

  /*
   * The paywall, enforced where the player ARRIVES.
   *
   * It used to be enforced only where they came from: the case grid picked
   * `/paywall` or `/case/...` as a link target, which decides what a TILE does
   * and nothing more. `app.json` registers the `privatetexts://` scheme and
   * expo-router derives a deep link for every file under `app/`, with no
   * allowlist, so every paid case also answered to a URL that never passed the
   * grid at all:
   *
   *     privatetexts://case/the-wake/threads
   *
   * Twelve of sixteen cases open that way. All case prose is bundled locally,
   * so there was no server round trip left to fail and nothing else to say no.
   *
   * This layout is the right place to say it once: all three case tabs are its
   * children, and it is the only thing that loads a script into the store, so
   * `/thread/[threadId]` is covered too - that screen reads the store and
   * bounces when it is empty.
   */
  const access = script
    ? decideCaseAccess({ script, entitlementIds, loading: entitlementsLoading })
    : ({ kind: 'blocked' } as const);
  const allowed = access.kind === 'allowed';
  /*
   * BOTH gates, and this is what the effect below is allowed to load on.
   *
   * Gating the load on the entitlement alone was the first version of this and
   * it was wrong for the new gate in exactly the way it had already been wrong
   * for the old one: the effect would put a progression-blocked script into the
   * store on its way to the redirect, and /thread/[threadId] renders whatever
   * the store holds. Held open until the saves have been read, because "nothing
   * solved yet" and "still reading" are the same value.
   */
  const mayLoad = allowed && solvedIds !== null && blockedBy === null;

  useEffect(() => {
    // `allowed` is load-bearing, not belt-and-braces. Redirecting from the
    // render path alone would still let this effect put the paid script in the
    // store on the way out - and `/thread/[threadId]` reads the store, so the
    // case would stay open at a second URL after the first one bounced.
    if (!script || !mayLoad || loaded === script) return;

    if (loaded?.id === script.id) {
      // Same case, different language. Swap the prose and keep the session —
      // loadScript would clear every message read and every contradiction
      // proved, so changing language mid-case would erase the playthrough.
      relocaliseScript(script);
      return;
    }

    loadScript(script);
    void loadProgress(script.id);
    // Deliberately does NOT stamp this case as "last played". Opening a case is
    // not playing it: a player who taps into a fresh case, reads the briefing
    // and backs out would otherwise move the pointer to a case with no save at
    // all, and lose the Continue offer for the case they were really in the
    // middle of. saveProgress moves the pointer, and only real progress saves.
  }, [script, mayLoad, loaded, loadScript, relocaliseScript]);

  if (!script) return <Redirect href="/" />;

  // Fails closed while RevenueCat is still answering. `useEntitlements` opens
  // at [] with loading true, so treating "no entitlements yet" as "blocked"
  // would eject a paying player from a case they own on the first render.
  // A skeleton, not null. This is the frame a deep link lands on, and on a slow
  // connection RevenueCat can take a second or two to answer - a blank screen
  // for that long is indistinguishable from a crash.
  if (access.kind === 'checking' || solvedIds === null) return <ThreadListSkeleton />;

  // Out of order. Home, where the tile explains which case is in the way.
  if (blockedBy !== null) return <Redirect href="/" />;

  // Home, not `/paywall`. The paywall is a modal that dismisses with
  // `router.back()`, and a deep link arrives with no history behind it, so
  // redirecting into it would strand the player in a modal with no way out.
  // Home always exists, and the locked tile there is the honest route to buy.
  if (access.kind === 'blocked') return <Redirect href="/" />;

  // Only counts threads the player can actually open — a gated thread is not
  // "unread", it does not exist yet as far as they are concerned.
  const progress = { confirmedContradictionIds: confirmedIds, readMessageIds };
  const unread = visibleThreads(script, progress)
    .flatMap((t) => t.messages)
    .filter((m) => !readMessageIds.includes(m.id)).length;

  // Nothing else in the game says "you have enough now". Without this the player
  // has to keep guessing at the accusation screen to discover they are ready,
  // and a wrong guess there is the one move the game treats as final.
  const ready = script.solution.requiredContradictionIds.every((id) => confirmedIds.includes(id));

  return (
    <>
      <Stack.Screen options={screenOptions} />
      <NativeTabs>
        <NativeTabs.Trigger name="threads">
          <NativeTabs.Trigger.Icon sf="bubble.left.and.bubble.right" md="chat" />
          <NativeTabs.Trigger.Label>{t('case.tab.threads')}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Badge hidden={unread === 0}>{String(unread)}</NativeTabs.Trigger.Badge>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="board">
          <NativeTabs.Trigger.Icon sf="pin" md="push_pin" />
          <NativeTabs.Trigger.Label>{t('case.tab.board')}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="accuse">
          <NativeTabs.Trigger.Icon sf="exclamationmark.bubble" md="gavel" />
          <NativeTabs.Trigger.Label>{t('case.tab.accuse')}</NativeTabs.Trigger.Label>
          {/* A space can render as an empty pill on Android; a character is safe. */}
          <NativeTabs.Trigger.Badge hidden={!ready}>!</NativeTabs.Trigger.Badge>
        </NativeTabs.Trigger>
      </NativeTabs>
    </>
  );
}
