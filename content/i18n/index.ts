import type { CaseScript } from '@/engine';
import { DEFAULT_LOCALE, type LocaleTag } from '@/i18n/locales';
import { getCase } from '../cases/index';
import { applyCaseText, caseTextCoverage, type CaseTranslation } from './caseText';
import { tutorialEs } from './es/tutorial';
import { theLighthouseEs } from './es/the-lighthouse';
import { theUnderstudyEs } from './es/the-understudy';
import { theNightRoundEs } from './es/the-night-round';

export {
  applyCaseText,
  caseTextCoverage,
  caseTextEntries,
  caseTranslationEntries,
  type CaseTranslation,
} from './caseText';

/**
 * Every case translation, by locale and then by case id.
 *
 * Shaped exactly like CATALOGUES in src/i18n/strings.ts, and empty for the same
 * reason: a locale with no entry resolves to English down the identical code
 * path a partly translated locale takes for its missing fields. One path, not
 * two, so the fallback cannot rot in the locale nobody is looking at.
 *
 * English is deliberately empty and always will be. The cases in content/cases
 * *are* the English, and a second English here would be a second source of
 * truth — two places to fix a typo, one of which somebody forgets.
 */
export const CASE_TRANSLATIONS: Readonly<
  Record<LocaleTag, Readonly<Record<string, CaseTranslation>>>
> = {
  en: {},
  // The tutorial plus the three free packs — everything a player can reach
  // without paying. A paid case in English behind a Spanish free tier is a
  // deliberate boundary, not an oversight.
  es: {
    tutorial: tutorialEs,
    'the-lighthouse': theLighthouseEs,
    'the-understudy': theUnderstudyEs,
    'the-night-round': theNightRoundEs,
  },
  fr: {},
  de: {},
  'pt-BR': {},
  ja: {},
};

/** The translation to use for one case in one locale, if there is one. */
export function caseTextFor(caseId: string, tag: LocaleTag): CaseTranslation | undefined {
  if (tag === DEFAULT_LOCALE) return undefined;
  return CASE_TRANSLATIONS[tag]?.[caseId];
}

/**
 * A case in the player's language.
 *
 * Structurally identical to the English in every locale — same ids, same
 * windows, same predicates, same order — so the engine, saved progress and
 * anything already holding a claim id keep working across a language change
 * mid-case.
 */
export function localiseCase(script: CaseScript, tag: LocaleTag): CaseScript {
  return applyCaseText(script, caseTextFor(script.id, tag));
}

/** Load and localise in one step, for a screen that has a case id and a locale. */
export function getLocalisedCase(caseId: string, tag: LocaleTag): CaseScript | undefined {
  const script = getCase(caseId);
  return script === undefined ? undefined : localiseCase(script, tag);
}

/** Case ids with a translation in this locale. English counts as all of them. */
export function translatedCaseIds(tag: LocaleTag): readonly string[] {
  if (tag === DEFAULT_LOCALE) return [];
  return Object.keys(CASE_TRANSLATIONS[tag] ?? {});
}

/**
 * How much of a case is translated, 0 to 1, for the case-select screen and for
 * release checks. English is 1 by definition.
 */
export function caseCoverage(script: CaseScript, tag: LocaleTag): number {
  if (tag === DEFAULT_LOCALE) return 1;
  return caseTextCoverage(script, caseTextFor(script.id, tag));
}
