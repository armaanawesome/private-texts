import { describe, it, expect } from 'vitest';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type LocaleTag } from '@/i18n/locales';
import { CASES } from '../cases/index';
import { caseTextEntries } from './caseText';
import { CASE_TRANSLATIONS, localiseCase } from './index';

/**
 * The one word that has to survive translation.
 *
 * The killer of every pack is an ordinary guilty person with ordinary reasons.
 * Behind five of them is a man who telephones people already standing at the
 * edge, and the only thing that ties those five packs together is that he gives
 * the same name every time. A player meets it in Pack 1 and is supposed to feel
 * the floor move in Pack 3.
 *
 * That is entirely carried by recognition, so the alias is the single most
 * fragile string in the game under translation — and it broke immediately. Two
 * agents translating two packs into Spanish on the same afternoon produced `el
 * Farero` and `el Keeper`, which a Spanish player would read as two different
 * people, and the arc would simply not exist for them.
 *
 * So it stays in English in every locale. It is a name somebody gave himself,
 * which is a thing that plausibly survives untranslated, and it costs nothing
 * next to the alternative.
 */
const ALIAS = 'Keeper';

/** Everything a player can read in a case, as one blob. */
function prose(script: Parameters<typeof caseTextEntries>[0]): string {
  return [...caseTextEntries(script).values()].join('\n');
}

const TRANSLATED_LOCALES = SUPPORTED_LOCALES.map((l) => l.tag).filter(
  (tag) => tag !== DEFAULT_LOCALE,
);

describe('the arc alias', () => {
  /**
   * Guards the guard. If the English ever stops using the word — renamed, or
   * the arc reworked — every assertion below would pass vacuously while proving
   * nothing, so the fixture asserts itself first.
   */
  it('appears in the English of more than one case', () => {
    const carriers = CASES.filter((c) => prose(c).includes(ALIAS)).map((c) => c.id);
    expect(carriers.length, 'no English case mentions the alias any more').toBeGreaterThan(1);
  });

  it('survives untranslated in every locale that has the case', () => {
    for (const tag of TRANSLATED_LOCALES) {
      for (const script of CASES) {
        if (CASE_TRANSLATIONS[tag]?.[script.id] === undefined) continue;
        if (!prose(script).includes(ALIAS)) continue;

        const localised = prose(localiseCase(script, tag as LocaleTag));
        expect(
          localised.includes(ALIAS),
          `${tag}/${script.id} translated the alias away — the arc stops being recognisable`,
        ).toBe(true);
      }
    }
  });

  /**
   * Counting, not just presence. A translation that keeps one mention and
   * paraphrases the other two still breaks recognition at exactly the moments
   * the arc is being handed to the player.
   */
  it('keeps every mention, not just the first', () => {
    const count = (s: string) => s.split(ALIAS).length - 1;

    for (const tag of TRANSLATED_LOCALES) {
      for (const script of CASES) {
        if (CASE_TRANSLATIONS[tag]?.[script.id] === undefined) continue;

        const english = count(prose(script));
        if (english === 0) continue;

        expect(
          count(prose(localiseCase(script, tag as LocaleTag))),
          `${tag}/${script.id} has a different number of alias mentions than the English`,
        ).toBe(english);
      }
    }
  });
});
