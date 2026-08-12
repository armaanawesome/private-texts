/**
 * The languages the game ships in.
 *
 * Deliberately tiny and dependency-free. Two very different consumers need this
 * same list — the settings picker, which renders it, and the i18n layer, which
 * loads translations for it — and if either owned the list the other would have
 * to import a module far heavier than the six facts it actually wanted.
 *
 * Labels are endonyms. A language picker that names languages in English is
 * useless to the one person guaranteed to be using it: someone who cannot read
 * English and is hunting for their own language.
 */

export interface Locale {
  /** BCP 47 tag. Matches the translation file name. */
  readonly tag: string;
  /** The language's name in that language. This is what the picker shows. */
  readonly endonym: string;
  /** The language's name in English, for accessibility labels and support mail. */
  readonly english: string;
}

export const SUPPORTED_LOCALES = [
  { tag: 'en', endonym: 'English', english: 'English' },
  { tag: 'es', endonym: 'Español', english: 'Spanish' },
  { tag: 'fr', endonym: 'Français', english: 'French' },
  { tag: 'de', endonym: 'Deutsch', english: 'German' },
  { tag: 'pt-BR', endonym: 'Português (Brasil)', english: 'Portuguese (Brazil)' },
  { tag: 'ja', endonym: '日本語', english: 'Japanese' },
] as const satisfies readonly Locale[];

export type LocaleTag = (typeof SUPPORTED_LOCALES)[number]['tag'];

/** The cases are written in English, so English is what everything falls back to. */
export const DEFAULT_LOCALE: LocaleTag = 'en';
