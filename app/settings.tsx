import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { theme } from '@/ui/theme';
import { SUPPORTED_LOCALES } from '@/i18n/locales';
import { useSettingsStore } from '@/settings/settingsStore';
import { clearAllProgress, hydrateSettings } from '@/settings/persistence';
import { feedback } from '@/settings/feedback';
import { VolumeRail } from '@/settings/VolumeRail';
import {
  ActionRow,
  CustomRow,
  DisclosureRow,
  ExpandableRow,
  Section,
  ToggleRow,
  ValueRow,
} from '@/settings/SettingsList';
import { LICENCES, PRIVACY_POINTS, versionLine } from '@/settings/about';
import { restoreErrorMessage, restoreIsBusy, restoreStatusLine, type RestoreState } from '@/settings/restore';
import { restorePurchases } from '@/entitlements/revenuecat';
import { useEntitlements } from '@/entitlements/useEntitlements';
import { useCaseStore } from '@/state/caseStore';

/**
 * Declared at module scope, NOT inline — see the comment in app/_layout.tsx.
 * An inline literal here is a fresh object every render and loops setOptions
 * until React throws "Maximum update depth exceeded".
 */
const screenOptions = { title: 'Settings' } as const;

/**
 * Preferences, purchases, and the things a player needs when something has gone
 * wrong: restore a purchase they already made, and erase progress they want back.
 *
 * The screen is deliberately thin. Every decision it makes — what a volume step
 * means, what the restore row should say, how a version with no build number
 * formats — is a tested function in src/settings, because none of that is
 * testable once it is inside a component this project has no renderer for.
 */
export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const settings = useSettingsStore((s) => s.settings);
  const update = useSettingsStore((s) => s.update);

  const { unavailableReason, refresh } = useEntitlements();
  const [restore, setRestore] = useState<RestoreState>({ kind: 'idle' });
  const [erased, setErased] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<'privacy' | 'licences' | null>(null);

  // Safe to call from more than one screen; the second caller awaits the first read.
  useEffect(() => {
    void hydrateSettings();
  }, []);

  const language =
    SUPPORTED_LOCALES.find((l) => l.tag === settings.localeTag)?.endonym ?? settings.localeTag;

  const onRestore = useCallback(async () => {
    // A build with purchases switched off must say why rather than spin and fail.
    if (unavailableReason !== null) {
      setRestore({ kind: 'unavailable', reason: unavailableReason });
      return;
    }
    setRestore({ kind: 'working' });
    try {
      const entitlementIds = await restorePurchases();
      setRestore({ kind: 'restored', entitlementIds });
      // The CustomerInfo listener is what actually unlocks gated UI, but the
      // player may have arrived here from a locked case; refresh so going back
      // shows it open.
      await refresh();
      feedback.notify('success');
    } catch (e) {
      setRestore({ kind: 'failed', message: restoreErrorMessage(e) });
      feedback.notify('warning');
    }
  }, [unavailableReason, refresh]);

  const onReset = useCallback(() => {
    /**
     * Alert, not an inline confirm. This is the one irreversible thing on the
     * screen, and it is the same protected-focus pattern the accusation already
     * uses — a native alert cannot be dismissed by the mis-tap that follows the
     * first one.
     */
    Alert.alert(
      'Erase all progress?',
      'Every case goes back to unread, and every contradiction you proved is forgotten. Purchases are not affected. This cannot be undone.',
      [
        { text: 'Keep it', style: 'cancel' },
        {
          text: 'Erase',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              try {
                const count = await clearAllProgress();
                // The in-memory case has to go too, or the screen the player
                // returns to still shows the progress they just erased.
                useCaseStore.getState().reset();
                setErased(
                  count === 0
                    ? 'There was no saved progress to erase.'
                    : count === 1
                      ? 'Erased 1 saved case.'
                      : `Erased ${count} saved cases.`,
                );
                feedback.notify('success');
              } catch {
                setErased('Could not erase progress. Try again.');
                feedback.notify('warning');
              }
            })();
          },
        },
      ],
    );
  }, []);

  const restoreLine = restoreStatusLine(restore);
  const build =
    Platform.OS === 'ios'
      ? Constants.expoConfig?.ios?.buildNumber
      : Constants.expoConfig?.android?.versionCode;

  return (
    <>
      <Stack.Screen options={screenOptions} />
      <ScrollView
        style={styles.root}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + theme.space.xl }]}
      >
        {/* The one identity moment on the screen: the same tick row the briefing
            sheet opens with, so this reads as part of the same file. */}
        <View style={styles.ticks} pointerEvents="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <View key={i} style={[styles.tick, i % 4 === 0 && styles.tickMajor]} />
          ))}
        </View>

        <Section title="Sound">
          <ToggleRow
            label="Sound effects"
            detail="Short cues when a message lands and when a contradiction breaks."
            value={settings.soundEnabled}
            onValueChange={(soundEnabled) => {
              update({ soundEnabled });
              feedback.selection();
            }}
          />
          <CustomRow label="Volume">
            <VolumeRail
              volume={settings.soundVolume}
              disabled={!settings.soundEnabled}
              onChange={(soundVolume) => {
                update({ soundVolume });
                feedback.selection();
                // Preview at the level just chosen, so the control is judged by
                // ear rather than by counting bars.
                feedback.cue('pin');
              }}
            />
          </CustomRow>
        </Section>

        <Section title="Feel">
          <ToggleRow
            label="Haptics"
            detail="Taps you can feel when you pin a statement or land a fact."
            value={settings.hapticsEnabled}
            onValueChange={(hapticsEnabled) => {
              // Fire before writing: turning it off should still confirm the tap
              // that turned it off.
              feedback.selection();
              update({ hapticsEnabled });
            }}
          />
          <ToggleRow
            label="Reduce motion"
            detail="Messages appear instantly and decorative sounds stay quiet."
            value={settings.reduceMotion}
            onValueChange={(reduceMotion) => {
              update({ reduceMotion });
              feedback.selection();
            }}
          />
        </Section>

        <Section
          title="Language"
          footnote="Case files are written in English and are not translated."
        >
          <DisclosureRow
            label="Language"
            value={language}
            accessibilityHint="Opens the list of languages"
            onPress={() => router.push('/language')}
          />
        </Section>

        <Section title="Purchases" footnote={restoreLine ?? undefined}>
          <ActionRow
            label="Restore purchases"
            detail="Already bought the case pack? Get it back on this device."
            busy={restoreIsBusy(restore)}
            onPress={() => void onRestore()}
          />
        </Section>

        <Section title="Progress" footnote={erased ?? undefined}>
          <ActionRow
            label="Reset all progress"
            detail="Erases every case save. Purchases are kept."
            destructive
            onPress={onReset}
          />
        </Section>

        <Section title="About">
          <ExpandableRow
            label="What this app stores"
            expanded={openPanel === 'privacy'}
            onPress={() => setOpenPanel((p) => (p === 'privacy' ? null : 'privacy'))}
          >
            {PRIVACY_POINTS.map((point) => (
              <Text key={point} style={styles.prose}>
                {point}
              </Text>
            ))}
          </ExpandableRow>

          <ExpandableRow
            label="Open-source licences"
            expanded={openPanel === 'licences'}
            onPress={() => setOpenPanel((p) => (p === 'licences' ? null : 'licences'))}
          >
            {LICENCES.map((l) => (
              <View key={l.name} style={styles.licence}>
                <Text style={styles.licenceName}>{l.name}</Text>
                <Text style={styles.licenceKind}>{l.licence}</Text>
              </View>
            ))}
          </ExpandableRow>

          <ValueRow label="Version" value={versionLine(Constants.expoConfig?.version, build)} />
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.lg, gap: theme.space.xl },

  ticks: { flexDirection: 'row', justifyContent: 'space-between', height: 6 },
  tick: { width: StyleSheet.hairlineWidth, height: 3, backgroundColor: theme.color.rule },
  tickMajor: { height: 6, backgroundColor: theme.color.textDim },

  prose: { ...theme.type.meta, color: theme.color.textDim, lineHeight: 18 },

  licence: { flexDirection: 'row', alignItems: 'baseline', gap: theme.space.sm },
  licenceName: { ...theme.type.meta, color: theme.color.textDim, flex: 1 },
  licenceKind: { ...theme.type.claim, fontSize: 11, color: theme.color.textDim },
});
