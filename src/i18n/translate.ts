import { CATALOGUES, EN, type StringKey } from './strings';
import { DEFAULT_LOCALE, type LocaleTag } from './locales';

export type Params = Readonly<Record<string, string | number>>;

/**
 * `{name}` placeholders, filled from `params`.
 *
 * A placeholder with no matching param is left in the string rather than
 * replaced with "undefined". Both are bugs, but `{count} unread` on screen names
 * the key that is missing, while `undefined unread` sends whoever sees it
 * looking in the wrong place.
 */
export function interpolate(template: string, params?: Params): string {
  if (params === undefined) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = params[name];
    return value === undefined ? whole : String(value);
  });
}

/**
 * Resolve one key for one locale.
 *
 * Three steps, in order: the locale's catalogue, then English, then the key
 * itself. The last step should be unreachable — `StringKey` is derived from the
 * English catalogue, so a key that does not exist will not compile — but a
 * string arriving from stored settings or a server can still be wrong at
 * runtime, and returning the key makes that visible instead of blank.
 */
export function lookup(tag: LocaleTag, key: StringKey): string {
  const localised = CATALOGUES[tag]?.[key];
  if (localised !== undefined && localised !== '') return localised;
  return EN[key] ?? key;
}

export type Translator = (key: StringKey, params?: Params) => string;

/** A translator bound to one locale, for a screen to call as `t('settings.title')`. */
export function makeTranslator(tag: LocaleTag = DEFAULT_LOCALE): Translator {
  return (key, params) => interpolate(lookup(tag, key), params);
}

/**
 * How much of a locale is done, for the language picker and for release checks.
 *
 * Reported rather than enforced. Shipping a partly translated language is a
 * legitimate choice — the untranslated keys fall back to English and the screen
 * still works — so this is information, not a gate.
 */
export function coverage(tag: LocaleTag): number {
  const keys = Object.keys(EN) as StringKey[];
  if (keys.length === 0) return 1;
  const done = keys.filter((k) => {
    const value = CATALOGUES[tag]?.[k];
    return value !== undefined && value !== '';
  }).length;
  return done / keys.length;
}
