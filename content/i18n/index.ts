import type { CaseScript } from '@/engine';
import { DEFAULT_LOCALE, type LocaleTag } from '@/i18n/locales';
import { getCase } from '../cases/index';
import { applyCaseText, caseTextCoverage, type CaseTranslation } from './caseText';
import { tutorialEs } from './es/tutorial';
import { theLighthouseEs } from './es/the-lighthouse';
import { theUnderstudyEs } from './es/the-understudy';
import { theNightRoundEs } from './es/the-night-round';
import { tutorialDe } from './de/tutorial';
import { tutorialPtBr } from './pt-BR/tutorial';
import { theLighthousePtBr } from './pt-BR/the-lighthouse';
import { theLighthouseDe } from './de/the-lighthouse';
import { tutorialFr } from './fr/tutorial';
import { theLighthouseFr } from './fr/the-lighthouse';
import { theUnderstudyFr } from './fr/the-understudy';
import { theNightRoundFr } from './fr/the-night-round';
import { theUnderstudyDe } from './de/the-understudy';
import { theNightRoundDe } from './de/the-night-round';
import { deepFieldDe } from './de/deep-field';
import { deepFieldFr } from './fr/deep-field';
import { deepFieldPtBr } from './pt-BR/deep-field';
import { deepFieldEs } from './es/deep-field';
import { theWakeDe } from './de/the-wake';
import { theUnderstudyPtBr } from './pt-BR/the-understudy';
import { theNightRoundPtBr } from './pt-BR/the-night-round';

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
  /*
   * Locales fill in at different rates and that is fine — an untranslated case
   * falls back to English down the same path a partly translated one takes for
   * a missing field, so the boundary can sit anywhere without a special case.
   *
   * The tutorial plus packs 1–3 is the one meaningful line: it is everything a
   * player reaches without paying, and all four locales are past it. Anything
   * beyond that is paid content, and which locale is furthest along reflects
   * only how far its agent got before a session limit — no locale is
   * deliberately behind.
   *
   * Do not read the order of these entries as priority. Add to whichever locale
   * has a finished pack sitting on disk.
   */
  es: {
    tutorial: tutorialEs,
    'the-lighthouse': theLighthouseEs,
    'the-understudy': theUnderstudyEs,
    'the-night-round': theNightRoundEs,
    'deep-field': deepFieldEs,
  },
  fr: {
    tutorial: tutorialFr,
    'the-lighthouse': theLighthouseFr,
    'the-understudy': theUnderstudyFr,
    'the-night-round': theNightRoundFr,
    'deep-field': deepFieldFr,
  },
  de: {
    tutorial: tutorialDe,
    'the-lighthouse': theLighthouseDe,
    'the-understudy': theUnderstudyDe,
    'the-night-round': theNightRoundDe,
    'deep-field': deepFieldDe,
    'the-wake': theWakeDe,
  },
  'pt-BR': {
    tutorial: tutorialPtBr,
    'the-lighthouse': theLighthousePtBr,
    'the-understudy': theUnderstudyPtBr,
    'the-night-round': theNightRoundPtBr,
    'deep-field': deepFieldPtBr,
  },
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
