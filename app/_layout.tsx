import { useEffect } from 'react';
import { Stack, Link } from 'expo-router';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTranslator } from '@/i18n/useTranslator';
import { hydrateSettings } from '@/settings/persistence';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '@/ui/theme';

/**
 * Declared at module scope, NOT inline in the JSX.
 *
 * An inline object literal is a fresh reference every render, so `Stack.Screen`
 * calls setOptions, the navigator re-renders, a new literal is created, and it
 * loops until React throws "Maximum update depth exceeded". That is exactly what
 * a `<Stack.Screen options={{ ... }} />` inside the paywall screen did.
 */
const rootScreenOptions = {
  headerStyle: { backgroundColor: theme.color.bg },
  headerTintColor: theme.color.text,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: theme.color.bg },
} as const;

const paywallOptions = {
  title: '',
  presentation: 'modal',
  headerShown: false,
} as const;

const debugOptions = { title: 'Test Store harness' } as const;

/**
 * The only way into Settings, and for a while there was none at all.
 *
 * `app/settings.tsx`, `app/language.tsx` and `app/sign-in.tsx` were all built
 * and all unreachable - nothing in the app linked to any of them, so on a
 * device the game had no settings, no language picker and no account. They were
 * only ever opened by typing a route during development, which is exactly why
 * nobody noticed.
 */
function SettingsLink() {
  const t = useTranslator();
  return (
    <Link href="/settings" asChild>
      <Pressable accessibilityRole="button" hitSlop={theme.hit.slop}>
        <Text style={styles.headerLink}>{t('settings.title')}</Text>
      </Pressable>
    </Link>
  );
}

/**
 * Empty title, deliberately.
 *
 * Unconfigured, expo-router titles a route after its FILE, so this bar read
 * `index` on the first screen of the game - and a child's back button then read
 * `< index` too, because iOS takes the back label from the parent's title.
 *
 * Empty rather than 'Private Texts': the screen already carries that as a
 * masthead, and saying it twice in forty points of vertical space is worse than
 * not saying it. The bar still earns its place - it owns the safe area and it
 * holds the settings link - and an empty parent title makes the back label fall
 * back to the system word for Back, in the reader's own language.
 */
const indexOptions = {
  title: '',
  headerRight: () => <SettingsLink />,
} as const;

const rootStyle = { flex: 1, backgroundColor: theme.color.bg } as const;

const styles = StyleSheet.create({
  headerLink: { ...theme.type.body, color: theme.color.accent },
});

export default function RootLayout() {
  /*
   * Read stored preferences once, at the root, before any screen renders.
   *
   * This used to be called from app/settings.tsx and nowhere else, which meant
   * the store sat on DEFAULT_SETTINGS until the player happened to open
   * Settings. Every preference was therefore ignored at launch - including
   * `localeTag`, so somebody who had chosen German got an English home screen
   * every time and only saw their own language after visiting a screen that
   * had nothing to do with it.
   *
   * It also silently disabled the first-run walkthrough, which waits for
   * `hydrated` before deciding anything: the flag never flipped, so the check
   * never ran. A screen that reads a preference cannot be the screen
   * responsible for loading it.
   */
  useEffect(() => {
    void hydrateSettings();
  }, []);

  return (
    <GestureHandlerRootView style={rootStyle}>
      <StatusBar style="light" />
      <Stack screenOptions={rootScreenOptions}>
        {/* Presentation belongs to the navigator, not to the screen component. */}
        <Stack.Screen name="index" options={indexOptions} />
        <Stack.Screen name="paywall" options={paywallOptions} />
        <Stack.Screen name="debug" options={debugOptions} />
      </Stack>
    </GestureHandlerRootView>
  );
}
