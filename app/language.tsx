import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/ui/theme';
import { SUPPORTED_LOCALES, type LocaleTag } from '@/i18n/locales';
import { useSettingsStore } from '@/settings/settingsStore';
import { feedback } from '@/settings/feedback';
import { Section, Tick } from '@/settings/SettingsList';

/**
 * Declared at module scope, NOT inline — see the comment in app/_layout.tsx.
 * An inline literal here is a fresh object every render and loops setOptions
 * until React throws "Maximum update depth exceeded".
 */
const screenOptions = { title: 'Language' } as const;

/**
 * The language list, pushed from the Language row in Settings rather than shown
 * inline there.
 *
 * A picker inline in a settings list either truncates the list or pushes every
 * row below it off the screen, and this list only grows. Its own screen also
 * gives each language room for both its names.
 */
function LocaleRow({
  endonym,
  english,
  selected,
  onPress,
}: {
  endonym: string;
  english: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      // The endonym is the label a reader of that language recognises; the
      // English name is what a screen reader set to English can actually say.
      accessibilityLabel={endonym === english ? endonym : `${endonym}, ${english}`}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowText}>
        <Text style={styles.label}>{endonym}</Text>
        {endonym === english ? null : <Text style={styles.detail}>{english}</Text>}
      </View>
      {selected ? <Tick /> : null}
    </Pressable>
  );
}

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const localeTag = useSettingsStore((s) => s.settings.localeTag);
  const update = useSettingsStore((s) => s.update);

  const choose = (tag: LocaleTag) => {
    if (tag !== localeTag) update({ localeTag: tag });
    feedback.selection();
    // Straight back, so the Settings row shows the new value immediately. There
    // is no Save — the choice is the commit, which is what every settings list
    // on the platform does.
    router.back();
  };

  return (
    <>
      <Stack.Screen options={screenOptions} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
      >
        <Section
          title="Language"
          footnote="Changing this translates the app. Case files are translated separately, and any case that has not been translated yet stays in English."
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <LocaleRow
              key={locale.tag}
              endonym={locale.endonym}
              english={locale.english}
              selected={locale.tag === localeTag}
              onPress={() => choose(locale.tag)}
            />
          ))}
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 56,
  },
  rowPressed: { opacity: 0.6 },
  rowText: { flex: 1, paddingRight: 12 },
  label: { color: theme.color.text, fontSize: 16 },
  detail: { color: theme.color.textDim, fontSize: 13, marginTop: 2 },
});
