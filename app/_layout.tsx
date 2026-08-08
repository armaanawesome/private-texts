import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '@/ui/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.color.bg },
          headerTintColor: theme.color.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.color.bg },
        }}
      />
    </GestureHandlerRootView>
  );
}
