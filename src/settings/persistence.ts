import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveKeysIn } from '@/state/saveKeys';
import { DEFAULT_SETTINGS, parseStoredSettings, settingsEqual } from './schema';
import { useSettingsStore } from './settingsStore';

/**
 * The AsyncStorage side of settings. A thin adapter, for the same reason
 * src/state/persistence.ts is one: it cannot execute under the Node test
 * environment, so everything worth testing was moved out of it.
 */

/**
 * Versioned from the start. Settings gain fields, and a v2 that cannot be read
 * by a v1 build needs somewhere to go that does not corrupt the v1 key.
 */
const SETTINGS_KEY = 'settings:v1';

/** Memoised so concurrent callers await the same read instead of racing it. */
let hydration: Promise<void> | null = null;

async function runHydration(): Promise<void> {
  let stored = DEFAULT_SETTINGS;
  try {
    stored = parseStoredSettings(await AsyncStorage.getItem(SETTINGS_KEY));
  } catch {
    // Storage itself unreadable, not just its contents. Defaults still work.
  }
  useSettingsStore.getState().replaceAll(stored);

  /**
   * Autosave, registered only after the first read.
   *
   * Subscribing earlier would race: the store still holds defaults, and any
   * unrelated update would write those defaults over the player's real settings
   * before we had finished reading them.
   */
  useSettingsStore.subscribe((state, prev) => {
    if (settingsEqual(state.settings, prev.settings)) return;
    void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)).catch(() => {
      // A failed write loses one preference change, which the player can redo.
      // Throwing here would take down whatever screen they were on.
    });
  });
}

/**
 * Reads stored settings and starts persisting changes. Idempotent.
 *
 * Safe to call from more than one screen: the second call awaits the first read
 * rather than starting another one or registering a second subscription.
 */
export function hydrateSettings(): Promise<void> {
  hydration ??= runHydration();
  return hydration;
}

/**
 * Erases every case save, and nothing else.
 *
 * AsyncStorage is one flat namespace shared with Supabase's session key and this
 * module's own settings, so it walks the keys through `saveKeysIn` rather than
 * calling `clear()`. `clear()` here would sign the player out and reset their
 * preferences as a side effect of a button that promised to reset progress.
 *
 * Returns how many cases were erased, so the screen can say so.
 */
export async function clearAllProgress(): Promise<number> {
  const keys = saveKeysIn(await AsyncStorage.getAllKeys());
  if (keys.length === 0) return 0;
  await AsyncStorage.multiRemove(keys);
  return keys.length;
}
