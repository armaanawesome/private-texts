import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { theme } from '@/ui/theme';
import { useTranslator } from '@/i18n/useTranslator';
import { CaseArt } from '@/ui/CaseArt';
import { ContinueCard } from '@/ui/ContinueCard';
import { getLocalisedCase } from '@content/i18n';
import { useLocalisedCases } from '@/i18n/useCase';
import { useSettingsStore } from '@/settings/settingsStore';
import { useEntitlements } from '@/entitlements/useEntitlements';
import { readResume } from '@/state/persistence';
import { offerResume, type ResumeOffer } from '@/state/resume';
import type { CaseScript } from '@/engine';

const isUnlocked = (script: CaseScript, entitlementIds: readonly string[]): boolean =>
  script.requiredEntitlementId === undefined || entitlementIds.includes(script.requiredEntitlementId);

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
  const { entitlementIds } = useEntitlements();
  const [resume, setResume] = useState<Resume | null>(null);

  /**
   * On focus, not on mount: the player arrives back here every time they leave
   * a case, and the card has to show where they got to, not where they were
   * when the app started.
   */
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      void (async () => {
        const stored = await readResume();
        if (!alive) return;
        const script = stored ? getLocalisedCase(stored.last.caseId, localeTag) : undefined;
        const offer = offerResume({
          last: stored?.last ?? null,
          save: stored?.save ?? null,
          script,
          unlocked: script !== undefined && isUnlocked(script, entitlementIds),
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

      <View style={styles.section}>
        {/* Only earns its place once there are two zones to tell apart. */}
        {resume ? (
          <View style={styles.sectionHead}>
            <Text style={styles.sectionLabel}>{t('home.cases.title')}</Text>
          </View>
        ) : null}

        <View style={styles.grid}>
          {cases.map((c) => (
            <CaseTile key={c.id} script={c} locked={!isUnlocked(c, entitlementIds)} />
          ))}
        </View>
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

function CaseTile({ script, locked }: { script: CaseScript; locked: boolean }) {
  const t = useTranslator();
  const count = script.contradictions.length;

  return (
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
        style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
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

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space.md },
  /**
   * Two up. `flexBasis` with a subtracted gap rather than a fixed width, so the
   * tiles hold their proportions on a narrow phone and a tablet alike.
   */
  tile: { flexBasis: '47%', flexGrow: 1, maxWidth: '48%', gap: theme.space.sm },
  pressed: { opacity: 0.7 },

  name: { ...theme.type.body, color: theme.color.text, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  marks: { flexDirection: 'row', gap: 3 },
  mark: { width: 2, height: 12, borderRadius: 1, backgroundColor: theme.color.danger },
  markLocked: { backgroundColor: theme.color.rail },
  metaText: { ...theme.type.meta, color: theme.color.textDim, fontSize: 11 },

  debug: { ...theme.type.meta, color: theme.color.textDim },
});
