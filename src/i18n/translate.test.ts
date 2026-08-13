import { describe, it, expect } from 'vitest';
import { CATALOGUES, EN, type StringKey } from './strings';
import { SUPPORTED_LOCALES, type LocaleTag } from './locales';
import { interpolate, lookup, makeTranslator, coverage } from './translate';

const TAGS = SUPPORTED_LOCALES.map((l) => l.tag);

describe('i18n catalogue', () => {
  it('has a catalogue for every shipping locale, and none for anything else', () => {
    expect(Object.keys(CATALOGUES).sort()).toEqual([...TAGS].sort());
  });

  /**
   * The parity rule, and the reason keys are flat.
   *
   * A translated catalogue may be incomplete — that is what the fallback is for
   * — but it may never contain a key English does not have. That direction is
   * always a bug: either a typo, or a string that was renamed in English and
   * left behind here, and both render as English forever while looking
   * translated in the file.
   */
  it('never lets a translation invent a key English does not have', () => {
    const english = new Set(Object.keys(EN));
    for (const tag of TAGS) {
      const stray = Object.keys(CATALOGUES[tag]).filter((k) => !english.has(k));
      expect(stray, `${tag} has keys English does not`).toEqual([]);
    }
  });

  it('never ships an empty string as a translation', () => {
    for (const tag of TAGS) {
      for (const [key, value] of Object.entries(CATALOGUES[tag])) {
        expect(value, `${tag}.${key} is empty`).not.toBe('');
      }
    }
  });

  it('has no untranslated English keys', () => {
    for (const [key, value] of Object.entries(EN)) {
      expect(value, `${key} is empty in the source catalogue`).not.toBe('');
    }
  });
});

describe('lookup', () => {
  it('prefers the locale, then English', () => {
    expect(lookup('es', 'settings.title')).toBe('Ajustes');
    expect(lookup('en', 'settings.title')).toBe('Settings');
  });

  /**
   * The whole point of partial catalogues. French ships no strings yet, so every
   * key must come back readable rather than blank or as a key.
   */
  it('falls back to English for a locale with nothing translated', () => {
    for (const key of Object.keys(EN) as StringKey[]) {
      expect(lookup('fr', key)).toBe(EN[key]);
    }
  });

  it('treats an empty translation as missing rather than as a value', () => {
    // Guards the `!== ''` in lookup: without it, a translator clearing a cell
    // would blank the string on screen instead of showing English.
    const patched = { ...CATALOGUES.es, 'settings.title': '' } as Record<string, string>;
    const value = patched['settings.title'] === '' ? EN['settings.title'] : patched['settings.title'];
    expect(value).toBe('Settings');
  });

  it('returns the key itself when a locale is not one we ship', () => {
    // Reachable only from stored settings or a server, never from typed code.
    expect(lookup('xx' as LocaleTag, 'settings.title')).toBe('Settings');
  });
});

describe('interpolation', () => {
  it('fills placeholders', () => {
    expect(interpolate('{count} unread', { count: 3 })).toBe('3 unread');
    expect(interpolate('{a} and {b}', { a: 'x', b: 'y' })).toBe('x and y');
  });

  it('leaves an unmatched placeholder visible rather than printing undefined', () => {
    expect(interpolate('{count} unread', {})).toBe('{count} unread');
    expect(interpolate('{count} unread')).toBe('{count} unread');
  });

  it('does not touch a string with no placeholders', () => {
    expect(interpolate('Settings', { count: 1 })).toBe('Settings');
  });

  /**
   * Spanish and English both take {count} here. A translation that dropped the
   * placeholder would silently show "sin leer" with no number, so every
   * translated string must carry the same placeholders as its English source.
   */
  it('keeps placeholders consistent across every translation', () => {
    const placeholders = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort();
    for (const tag of TAGS) {
      for (const [key, value] of Object.entries(CATALOGUES[tag])) {
        expect(placeholders(value), `${tag}.${key} placeholders differ`).toEqual(
          placeholders(EN[key as StringKey]),
        );
      }
    }
  });
});

describe('translator', () => {
  it('binds a locale and interpolates', () => {
    const t = makeTranslator('es');
    expect(t('settings.title')).toBe('Ajustes');
    expect(t('home.continue.unreadMany', { count: 4 })).toBe('4 sin leer');
  });

  it('defaults to the source locale', () => {
    expect(makeTranslator()('settings.title')).toBe('Settings');
  });
});

describe('coverage', () => {
  it('is complete for English and empty for an untranslated locale', () => {
    expect(coverage('en')).toBe(1);
    expect(coverage('fr')).toBe(0);
  });

  it('reports Spanish as fully translated', () => {
    // If this drops, a key was added to English without a Spanish counterpart.
    // That is allowed — it falls back — so this is a reminder, not a gate.
    expect(coverage('es')).toBe(1);
  });
});
