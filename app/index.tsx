import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Link, Redirect, useFocusEffect } from 'expo-router';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { CaseArt } from '@/ui/CaseArt';
import { CaseGridSkeleton } from '@/ui/Skeleton';
import { ContinueCard } from '@/ui/ContinueCard';
import { getLocalisedCase } from '@content/i18n';
import { useLocalisedCases } from '@/i18n/useCase';
import { useSettingsStore } from '@/settings/settingsStore';
import { useEntitlements } from '@/entitlements/useEntitlements';
import { readResume, readSolvedCaseIds } from '@/state/persistence';
import { decideCaseGate, gateIsLocked, type CaseGate } from '@/state/progression';
import { offerResume, type ResumeOffer } from '@/state/resume';
import { isCaseUnlocked } from '@/entitlements/access';
import type { CaseScript } from '@/engine';

/*
 * The lock rule is imported, not restated.
 *
 * It lived here as a local const, which is precisely how the paywall came to be
 * enforced on the tile instead of on the case. Now `src/entitlements/access.ts`
 * owns it, this screen uses it to draw lock state, and
 * `app/case/[caseId]/_layout.tsx` uses the same function to enforce it. A grid
 * that disagrees with the route is the bug either way round.
 */

interface Resume {
  offer: ResumeOffer;
  script: CaseScript;
  /** Captured with the read, so "12 minutes ago" cannot drift mid-render. */
  now: number;
}

export default function CaseSelectScreen() {
  const t = useTranslator();
  const cases = useLocalisedCases();
  const localeTag = useSettingsStore((s) => s.settings.localeTag);
  const hasSeenHowToPlay = useSettingsStore((s) => s.settings.hasSeenHowToPlay);
  const settingsHydrated = useSettingsStore((s) => s.hydrated);
  const {
    entitlementIds,
    loading: entitlementsLoading,
    error: entitlementsError,
    refresh: refreshEntitlements,
  } = useEntitlements();
  const [resume, setResume] = useState<Resume | null>(null);
  /**
   * Null until the saves have been read, which is NOT the same as an empty
   * set. Empty means "nothing solved", and every case after the first would
   * draw locked on that — so the distinction is what stops the grid flashing.
   */
  const [solvedIds, setSolvedIds] = useState<ReadonlySet<string> | null>(null);

  /**
   * On focus, not on mount: the player arrives back here every time they leave
   * a case, and the card has to show where they got to, not where they were
   * when the app started.
   */
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      void (async () => {
        const [stored, solved] = await Promise.all([readResume(), readSolvedCaseIds()]);
        if (!alive) return;
        setSolvedIds(solved);
        const script = stored ? getLocalisedCase(stored.last.caseId, localeTag) : undefined;
        const offer = offerResume({
          last: stored?.last ?? null,
          save: stored?.save ?? null,
          script,
          unlocked: script !== undefined && isCaseUnlocked(script, entitlementIds),
        });
        setResume(offer && script ? { offer, script, now: Date.now() } : null);
      })();
      return () => {
        alive = false;
      };
      // localeTag is a dependency because the card shows the case title and the
      // thread name: changing language must retitle the Continue card, not leave
      // the previous language sitting on the first screen.
    }, [entitlementIds, localeTag]),
  );

  /*
   * The controls, before the game asks anyone to use them.
   *
   * Gated on `settingsHydrated`, which is the whole reason that flag exists.
   * Preferences start at their defaults and are replaced wholesale once storage
   * has been read, and the default is `false` - so redirecting before the read
   * lands would show the walkthrough to a returning player every launch.
   *
   * Redirect rather than a modal: this is the first thing that happens, and it
   * should not leave a home screen sitting behind it that the player can see
   * but not reach.
   */
  if (settingsHydrated && !hasSeenHowToPlay) return <Redirect href="/how-to-play" />;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.masthead}>
        <Text style={styles.title}>Private Texts</Text>
        {/* The pitch is for someone who has not played. A returning player has
            already bought it, and leaving it here would push Continue down the
            screen to make room for an argument they have accepted. */}
        {resume ? null : <Text style={styles.sub}>{t('home.pitch')}</Text>}
      </View>

      {resume ? (
        <ContinueCard offer={resume.offer} script={resume.script} now={resume.now} />
      ) : null}

      {/*
        A store outage used to be silent here: useEntitlements caught the error
        and the grid simply drew every paid case as locked, which reads as "you
        do not own these" rather than "we could not ask". Inline and cleared by
        retrying, never a full-screen blocker - the whole game is bundled and
        plays offline, so blocking it on a network failure would be a worse bug
        than the one being reported.
      */}
      {entitlementsError ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{t('home.storeUnreachable')}</Text>
          <Pressable
            onPress={refreshEntitlements}
            accessibilityRole="button"
            hitSlop={theme.hit.slop}
          >
            <Text style={styles.noticeAction}>{t('common.retry')}</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.section}>
        {/* Only earns its place once there are two zones to tell apart. */}
        {resume ? (
          <View style={styles.sectionHead}>
            <Text style={styles.sectionLabel}>{t('home.cases.title')}</Text>
          </View>
        ) : null}

        {/*
          The skeleton is not decoration - it fixes a defect. `entitlementIds`
          starts empty while RevenueCat is asked, so drawing the grid straight
          away rendered all twelve paid cases as LOCKED and then popped them open
          a moment later. A paying customer watched their own library re-lock
          itself on every launch.
        */}
        {entitlementsLoading || solvedIds === null ? (
          <CaseGridSkeleton count={cases.length} />
        ) : (
          <View style={styles.grid}>
            {cases.map((c) => {
              const gate = decideCaseGate({
                script: c,
                order: cases,
                solvedIds,
                entitlementIds,
                entitlementsLoading,
                progressLoaded: true,
              });
              const blockedBy =
                gate.kind === 'locked-progression'
                  ? (cases.find((x) => x.id === gate.blockedByCaseId)?.title ?? '')
                  : '';
              return <CaseTile key={c.id} script={c} gate={gate} blockedByTitle={blockedBy} />;
            })}
          </View>
        )}
      </View>

      {/* Dev-only. A "Test Store harness" link on the first screen is workshop
          debris, and this is the screen a judge opens first. */}
      {__DEV__ ? (
        <Link href="/debug" style={styles.debug}>
          Test Store harness
        </Link>
      ) : null}
    </ScrollView>
  );
}

function CaseTile({
  script,
  gate,
  blockedByTitle,
}: {
  script: CaseScript;
  gate: CaseGate;
  blockedByTitle: string;
}) {
  const t = useTranslator();
  const count = script.contradictions.length;
  const locked = gateIsLocked(gate);
  const byProgress = gate.kind === 'locked-progression';

  /*
   * A progression lock is NOT a link.
   *
   * The paywall is somewhere to go; "finish the earlier case" is not, and
   * routing to a screen that only says no would cost a push and a back press
   * to deliver one sentence. Said in place instead, naming the case that is in
   * the way — the useful part is WHICH case, and the tile alone cannot fit it.
   */
  if (byProgress) {
    return (
      <View style={styles.tile}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          accessibilityLabel={t('home.locked.body', { title: blockedByTitle })}
          onPress={() =>
            Alert.alert(t('home.locked.title'), t('home.locked.body', { title: blockedByTitle }))
          }
          style={({ pressed }) => [styles.tileInner, pressed && styles.pressed]}
        >
          <CaseArt script={script} locked />
          <Text style={styles.name} numberOfLines={2}>
            {script.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{t('home.tile.lockedByProgress')}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  /*
   * The width lives on this View, NOT on the Pressable inside it.
   *
   * `<Link asChild>` clones its child and supplies its own props, and the
   * tile's sizing did not survive that: measured in a browser, the rendered
   * element computed to `flex-basis: auto; flex-grow: 0; max-width: none` -
   * none of the three values this file sets. The tiles were being sized by
   * their contents, which is why they came out unequal, and why on a device
   * they came out full width: content-sizing a subtree whose first child is a
   * bare `aspectRatio` box with no width of its own has no reason to stop.
   *
   * A plain View outside the Link cannot have its style swallowed, so the
   * column width is stated somewhere that is guaranteed to keep it.
   */
  return (
    <View style={styles.tile}>
    <Link href={locked ? '/paywall' : `/case/${script.id}/threads`} asChild>
      <Pressable
        accessibilityRole="button"
        // The case title stays as authored — it is case content, not chrome.
        accessibilityLabel={t(
          locked
            ? count === 1
              ? 'home.tile.lockedLabelOne'
              : 'home.tile.lockedLabel'
            : count === 1
              ? 'home.tile.openLabelOne'
              : 'home.tile.openLabel',
          { title: script.title, count },
        )}
        style={({ pressed }) => [styles.tileInner, pressed && styles.pressed]}
      >
        <CaseArt script={script} locked={locked} />
        <Text style={styles.name} numberOfLines={2}>
          {script.title}
        </Text>
        <View style={styles.meta}>
          {/* One mark per contradiction the case hides — the same bar the
              comparison sheet draws, so the motif introduces itself here. */}
          <View style={styles.marks}>
            {Array.from({ length: count }).map((_, i) => (
              <View key={i} style={[styles.mark, locked && styles.markLocked]} />
            ))}
          </View>
          <Text style={styles.metaText}>
            {locked ? t('home.tile.sealed') : t('home.tile.toProve', { count })}
          </Text>
        </View>
      </Pressable>
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.xl, paddingBottom: theme.space.xl },

  masthead: { gap: theme.space.sm },
  title: { ...theme.type.title, color: theme.color.text, fontSize: 32, lineHeight: 38 },
  sub: { ...theme.type.body, color: theme.color.textDim },

  section: { gap: theme.space.md },
  sectionHead: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.rule,
    paddingTop: theme.space.md,
  },
  sectionLabel: { ...theme.type.meta, color: theme.color.textDim, letterSpacing: 0.4 },

  /*
   * space-between rather than a column gap, paired with a plain percentage
   * width below. Percentage `flexBasis` with `flexGrow` and a percentage
   * `maxWidth` is the combination that broke: three interacting values, only
   * reliable if all three survive to the element, and one of them did not.
   * Two 48% columns and the gap is whatever is left.
   */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.space.lg,
  },
  /** Two up. The column, and the only place the width is stated. */
  tile: { width: '48%' },
  /** Inside the Link, so it may lose its style without costing the layout. */
  tileInner: { gap: theme.space.sm },
  pressed: { opacity: 0.7 },

  name: { ...theme.type.body, color: theme.color.text, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  marks: { flexDirection: 'row', gap: 3 },
  mark: { width: 2, height: 12, borderRadius: 1, backgroundColor: theme.color.danger },
  markLocked: { backgroundColor: theme.color.rail },
  metaText: { ...theme.type.meta, color: theme.color.textDim, fontSize: 11 },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    padding: theme.space.md,
    borderRadius: theme.radius.chip,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.rule,
    backgroundColor: theme.color.surface,
  },
  noticeText: { ...theme.type.meta, color: theme.color.textDim, flex: 1 },
  noticeAction: {
    ...theme.type.meta,
    color: theme.color.accent,
    textDecorationLine: 'underline',
  },

  debug: { ...theme.type.meta, color: theme.color.textDim },
});
