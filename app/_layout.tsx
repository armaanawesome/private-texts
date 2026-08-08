import { Stack } from 'expo-router';
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

const rootStyle = { flex: 1, backgroundColor: theme.color.bg } as const;

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={rootStyle}>
      <StatusBar style="light" />
      <Stack screenOptions={rootScreenOptions}>
        {/* Presentation belongs to the navigator, not to the screen component. */}
        <Stack.Screen name="paywall" options={paywallOptions} />
        <Stack.Screen name="debug" options={debugOptions} />
      </Stack>
    </GestureHandlerRootView>
  );
}
