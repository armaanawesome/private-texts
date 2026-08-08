import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Engine and state tests run in plain Node, not a React Native environment.
 * That is the point of the src/engine boundary: it imports nothing from
 * react-native, expo, or react, so the suite runs in milliseconds.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  test: {
    include: [
      'src/engine/**/*.test.ts',
      'src/state/**/*.test.ts',
      'content/**/*.test.ts',
      'plugins/**/*.test.ts',
    ],
    environment: 'node',
    coverage: {
      include: ['src/engine/**', 'src/state/**'],
      // persistence.ts is a thin AsyncStorage adapter — it cannot execute under
      // the Node environment, and mocking the module would only assert that the
      // mock was called. The logic worth testing lives in caseStore.
      exclude: ['src/state/persistence.ts'],
      reporter: ['text', 'html'],
    },
  },
});
