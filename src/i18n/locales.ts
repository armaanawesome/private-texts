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

/*
 * Japanese was here and was removed on 2026-08-14.
 *
 * It was listed in the picker with an empty catalogue and no case text, so
 * choosing it did nothing except render the whole game in English. Everything
 * technically worked — that is what the fallback is for — which is precisely
 * why it was worth removing: a language a player can select and receive nothing
 * from is a promise the app does not keep, and it reads worse than a shorter
 * list.
 *
 * Adding it back means a catalogue in strings.ts and case text in
 * content/i18n/ja/, not just a row here.
 */
export const SUPPORTED_LOCALES = [
  { tag: 'en', endonym: 'English', english: 'English' },
  { tag: 'es', endonym: 'Español', english: 'Spanish' },
  { tag: 'fr', endonym: 'Français', english: 'French' },
  { tag: 'de', endonym: 'Deutsch', english: 'German' },
  { tag: 'pt-BR', endonym: 'Português (Brasil)', english: 'Portuguese (Brazil)' },
] as const satisfies readonly Locale[];

export type LocaleTag = (typeof SUPPORTED_LOCALES)[number]['tag'];

/** The cases are written in English, so English is what everything falls back to. */
export const DEFAULT_LOCALE: LocaleTag = 'en';
