import { describe, it, expect, beforeEach } from 'vitest';
import { currentSettings, useSettingsStore } from './settingsStore';
import { DEFAULT_SETTINGS } from './schema';

beforeEach(() => {
  // The store is a module singleton, so each test has to put it back.
  useSettingsStore.setState({ settings: DEFAULT_SETTINGS, hydrated: false });
});

describe('the settings store', () => {
  it('starts on the defaults and admits it has not read storage yet', () => {
    expect(useSettingsStore.getState().settings).toEqual(DEFAULT_SETTINGS);
    expect(useSettingsStore.getState().hydrated).toBe(false);
  });

  it('changes only the field in the patch', () => {
    useSettingsStore.getState().update({ soundEnabled: false });
    const { settings } = useSettingsStore.getState();
    expect(settings.soundEnabled).toBe(false);
    expect(settings.hapticsEnabled).toBe(DEFAULT_SETTINGS.hapticsEnabled);
    expect(settings.localeTag).toBe(DEFAULT_SETTINGS.localeTag);
  });

  it('accumulates successive patches', () => {
    const { update } = useSettingsStore.getState();
    update({ soundVolume: 0.5 });
    update({ reduceMotion: true });
    const { settings } = useSettingsStore.getState();
    expect(settings.soundVolume).toBe(0.5);
    expect(settings.reduceMotion).toBe(true);
  });

  it('replaces the settings object rather than mutating it', () => {
    // The autosave subscription compares the previous object to the next one, so
    // an in-place mutation would make every change invisible to it.
    const before = useSettingsStore.getState().settings;
    useSettingsStore.getState().update({ soundEnabled: false });
    expect(useSettingsStore.getState().settings).not.toBe(before);
    expect(before.soundEnabled).toBe(true);
  });

  it('marks itself hydrated when storage has been read', () => {
    useSettingsStore.getState().replaceAll({ ...DEFAULT_SETTINGS, localeTag: 'ja' });
    expect(useSettingsStore.getState().hydrated).toBe(true);
    expect(useSettingsStore.getState().settings.localeTag).toBe('ja');
  });

  it('puts every field back on reset', () => {
    const { update } = useSettingsStore.getState();
    update({ soundEnabled: false, soundVolume: 0.1, reduceMotion: true, localeTag: 'de' });
    useSettingsStore.getState().resetToDefaults();
    expect(useSettingsStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('stays hydrated across a reset', () => {
    // Reset restores preferences, it does not un-read the disk. Clearing this
    // would make the autosave subscription treat the next write as first-load.
    useSettingsStore.getState().replaceAll(DEFAULT_SETTINGS);
    useSettingsStore.getState().resetToDefaults();
    expect(useSettingsStore.getState().hydrated).toBe(true);
  });
});

describe('currentSettings', () => {
  it('reads the value at the moment it is called, not at import time', () => {
    // The feedback facade calls this inside tap handlers. If it captured a
    // snapshot the haptics switch would only take effect after a reload.
    expect(currentSettings().hapticsEnabled).toBe(true);
    useSettingsStore.getState().update({ hapticsEnabled: false });
    expect(currentSettings().hapticsEnabled).toBe(false);
  });
});
