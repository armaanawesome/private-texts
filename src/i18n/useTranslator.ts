import { useMemo } from 'react';
import { useSettingsStore } from '@/settings/settingsStore';
import { makeTranslator, type Translator } from './translate';

/**
 * The catalogue, bound to the language the player actually chose.
 *
 * A screen calls `const t = useTranslator()` and re-renders when the language
 * changes, because the selector subscribes to `localeTag` alone — picking a new
 * language on the Language screen repaints every mounted screen behind it,
 * which is the entire point of routing translation through the store rather
 * than through a module-level translator.
 *
 * The `useMemo` is not a micro-optimisation. `t` is a dependency of every
 * `useMemo`/`useCallback` that builds a translated value — most sharply the
 * `Stack.Screen` options object, which loops setOptions forever if its identity
 * changes on every render. Memoising on the tag makes `t` stable for as long as
 * the language is, so those guards hold.
 */
export function useTranslator(): Translator {
  const tag = useSettingsStore((s) => s.settings.localeTag);
  return useMemo(() => makeTranslator(tag), [tag]);
}
