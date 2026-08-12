import { create } from 'zustand';
import { DEFAULT_SETTINGS, type Settings } from './schema';

/**
 * Player preferences, live.
 *
 * Imports no AsyncStorage on purpose — the same boundary caseStore.ts keeps from
 * persistence.ts. That is what lets the whole thing run in the Node test suite,
 * and it is why the storage adapter lives next door rather than here.
 *
 * Preferences start at their defaults and are replaced once, wholesale, when
 * storage has been read. A screen that renders before that shows working
 * defaults rather than an empty or half-populated form.
 */
interface SettingsState {
  settings: Settings;
  /**
   * False until AsyncStorage has been read. The screen uses it to avoid writing
   * a default over a stored value the user has not seen yet.
   */
  hydrated: boolean;
  /**
   * A patch rather than a typed key/value pair: the generic version needs a cast
   * to convince TypeScript that a computed key still produces a `Settings`, and
   * spreading a partial needs none.
   */
  update: (patch: Partial<Settings>) => void;
  /** Replaces everything and marks the store hydrated. For the storage adapter. */
  replaceAll: (next: Settings) => void;
  resetToDefaults: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULT_SETTINGS,
  hydrated: false,

  update: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
  replaceAll: (next) => set({ settings: next, hydrated: true }),
  resetToDefaults: () => set({ settings: DEFAULT_SETTINGS }),
}));

/**
 * The current preferences for callers that are not React components.
 *
 * The haptics and sound facade runs inside event handlers, not renders, so it
 * cannot use a hook — and it must read the value at the moment of the tap rather
 * than close over one from an earlier render.
 */
export function currentSettings(): Settings {
  return useSettingsStore.getState().settings;
}
