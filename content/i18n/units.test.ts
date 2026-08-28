import { describe, it, expect } from 'vitest';
import { CASES } from '../cases/index';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type LocaleTag } from '@/i18n/locales';
import { localiseCase, caseTextEntries } from './index';

/**
 * A translation may not convert the units the case states.
 *
 * Six of these shipped across three locales before anyone noticed. `forty feet`
 * became `doce metros` and `doze metros`; `four feet away from me` became `un
 * metro` and `un mètre`; `twenty feet from her` became `seis metros`; and the
 * canal being `four feet deep` became `um metro e vinte`.
 *
 * **No existing rule could see any of them.** The number-parity check compares
 * digits, and every one of these numbers is spelled out as a word in both
 * languages — `forty` against `doce`, `twenty` against `seis`. There is no digit
 * in the sentence for the rule to disagree about.
 *
 * They matter for the reason the numbers rule exists at all. `identify that fork
 * at forty feet` is the deduction in Pack 11 — the distance is the evidence.
 * `my son was dying twenty feet from her` is the accusation in Pack 5, and the
 * distance is the whole of it. Converting is not translating: it restates a fact
 * the case asserts, and it does so in prose that reads perfectly.
 *
 * The French translator of Pack 5 got this right unprompted and wrote down why:
 * `vingt pieds` stays in feet — converting to metres would change a stated fact
 * rather than translate it. One locale had the rule and three did not, which is
 * exactly the situation an executable rule exists to end.
 *
 * Deliberately asymmetric. It does not require imperial words to appear — a
 * translation may say `a cuarenta pies` or rephrase around the measurement
 * entirely. It forbids only **metric arriving where the English had none**,
 * which is the shape a conversion always takes and which no faithful
 * translation of an imperial-only pack ever needs.
 */

/**
 * Metric a translation might reach for, per locale.
 *
 * Unicode-aware boundaries rather than \b, and this is not fussiness. JavaScript's
 * \b is ASCII-only, so in `milímetros` and `centímetro` the accented `í` counts as
 * a NON-word character and \b happily opens a boundary right before `metros`. The
 * first version of this rule flagged three packs for saying `dois milímetros`
 * where the English says `two millimetres`. Python's \b is Unicode-aware, which
 * is why the audit that found the real six never showed those three.
 */
const METRIC: Readonly<Record<string, RegExp>> = {
  es: /(?<!\p{L})(?:kil[óo]metros?|quil[óo]metros?|metros?|litros?)(?!\p{L})/iu,
  fr: /(?<!\p{L})(?:kilom[èe]tres?|m[èe]tres?|litres?)(?!\p{L})/iu,
  de: /(?<!\p{L})(?:Kilometer|Meter|Liter)(?!\p{L})/iu,
  'pt-BR': /(?<!\p{L})(?:quil[óo]metros?|metros?|litros?)(?!\p{L})/iu,
};

/**
 * Metric in the English, which makes metric in a translation legitimate.
 *
 * Millimetres and centimetres are listed because a pack that measures in them
 * is already a metric pack — `sunday-service` turns on an entry sitting `two
 * millimetres proud of the line`, and every locale is right to say so.
 */
const METRIC_EN =
  /(?<!\p{L})(?:kilometres?|metres?|litres?|millimetres?|centimetres?)(?!\p{L})/iu;

const prose = (entries: ReadonlyMap<string, string>): string => [...entries.values()].join('\n');

describe('a translation states the units the case states', () => {
  const locales = SUPPORTED_LOCALES.map((l) => l.tag).filter(
    (tag): tag is LocaleTag => tag !== DEFAULT_LOCALE,
  );

  for (const script of CASES) {
    const english = prose(caseTextEntries(script));
    // Only packs that measure in imperial and never in metric constrain
    // anything. Where the English itself says `metres`, metric in a translation
    // is the faithful choice and this rule has nothing to say about it.
    if (METRIC_EN.test(english)) continue;

    for (const tag of locales) {
      const pattern = METRIC[tag];
      if (pattern === undefined) continue;

      it(`${script.id} · ${tag} does not convert to metric`, () => {
        const translated = prose(caseTextEntries(localiseCase(script, tag)));
        const hit = pattern.exec(translated);
        expect(
          hit?.[0],
          `${script.id} · ${tag} says "${hit?.[0] ?? ''}" where the English measures only in ` +
            'imperial — converting restates a fact rather than translating it',
        ).toBeUndefined();
      });
    }
  }

  /**
   * Guards the guard with the real lines that shipped. Without it a later
   * tightening could stop matching anything and the suite would stay green,
   * which is the state this class spent eleven packs in.
   */
  it('would have caught the six that shipped, and passes the restored versions', () => {
    expect(METRIC['es']!.test('identificar esa horca a doce metros')).toBe(true);
    expect(METRIC['pt-BR']!.test('meu filho estava morrendo a seis metros dela')).toBe(true);
    expect(METRIC['fr']!.test('assis à un mètre de moi')).toBe(true);

    expect(METRIC['es']!.test('identificar esa horca a cuarenta pies')).toBe(false);
    expect(METRIC['pt-BR']!.test('morrendo a vinte pés dela')).toBe(false);
    expect(METRIC['fr']!.test('assis à quatre pieds de moi')).toBe(false);
  });
});
