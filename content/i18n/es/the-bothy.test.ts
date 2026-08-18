import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theBothyEs } from './the-bothy';

/**
 * The Spanish Bothy, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry. The generic contract is re-run here against the
 * localised script.
 *
 * The rest is what no generic test can see. This pack is about order rather
 * than clock — nobody in that building owns a watch that agrees with anybody
 * else's — so the times are deliberately approximate and the approximation is
 * load-bearing. Firming `sobre las siete menos diez` into a bare hour leaves
 * every id, number and paragraph check green and quietly hands five people a
 * precision the story says twice that they do not have.
 */
const english = getCase('the-bothy')!;
const script = applyCaseText(english, theBothyEs);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const chip = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';

/** Raw minutes past the case zero, wrapped. */
const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

const allProse = [...caseTranslationEntries(theBothyEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('El refugio (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theBothyEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theBothyEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theBothyEs)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
      expect(
        seen.get(value),
        `${path} repeats the prose at ${seen.get(value) ?? ''}`,
      ).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number and every paragraph the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
    }
  });

  /**
   * A chip may state the window it covers, or a single moment inside it.
   *
   * `c-keir-book-late` is the second kind: he signed at 21:40 and the engine
   * holds 20:00–22:00, because nobody in a bothy knows the hour and the window
   * is the uncertainty. An earlier draft of this rule demanded the window
   * bounds and would have failed the English too, which means the rule was
   * wrong rather than the pack. It still catches the thing that matters — a
   * chip time the engine does not cover at all.
   */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (form) => form.join('|') === times.join('|'),
      );
      const pointInside =
        times.length === 1 &&
        toMinutes(times[0]!) >= c.window.start % 1440 &&
        toMinutes(times[0]!) <= c.window.end % 1440;

      expect(
        spansWindow || pointInside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------------ the times */

describe('El refugio (es) — order, not clock', () => {
  /**
   * The pack's own instruction manual, in Anne's mouth. If this sentence goes,
   * a player has no reason to distrust any of the times they are about to be
   * given, and the case is built entirely on distrusting them.
   */
  it('keeps the sentence that tells the player times are worthless here', () => {
    expect(body('m2')).toContain('no hay reloj');
    expect(body('m2')).toContain('no sabes qué hora es, sabes qué ha pasado ya');
    expect(script.briefing?.opening).toContain('ninguna de ellas tiene un reloj que coincida');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p3: ['Las diez menos veinte'], // Iain says he got in last
      p4: ['las siete menos veinte'], // and was on the path from then
      p5: ['desde las seis', 'las once'], // Anne in the main room all evening
      m3: ['sobre las seis'], // the order she remembers
      m6: ['sobre las siete menos diez'], // the crossing that breaks him
      m9: ['las diez menos veinte'], // and he did come in then, which is the problem
      h2: ['a las ocho'], // Hamish reads the book
      h3: ['A las ocho'], // five names, his already dry
      h4: ['A las diez menos veinte'], // and he signs it a second time
      h6: ['las siete y cuarto'], // the back room
      r4: ['de siete a ocho'], // Sandra in the porch, which clears her
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    for (const text of [revelation('x-keir-mainroom'), press('b-mainroom')]) {
      expect(text).toContain('las siete menos diez');
    }
    expect(revelation('x-keir-mainroom')).toContain('las siete menos veinte');
    for (const text of [revelation('x-keir-book'), press('b-book')]) {
      expect(text).toContain('las diez menos veinte');
      expect(text).toContain('a las ocho');
    }
    for (const text of [revelation('x-keir-backroom'), press('b-backroom')]) {
      expect(text).toContain('las siete y cuarto');
    }
    expect(revelation('x-pris-porch')).toContain('de siete a ocho');
    expect(script.confrontation?.confession).toContain('antes de las seis');
    expect(script.confrontation?.confession).toContain('las diez menos veinte');
  });

  /**
   * Nobody in this building writes a clock, and nobody could. Every time in
   * every message is spoken and hedged; the only digits are on the chips, which
   * are the player's own notes rather than anybody's testimony.
   */
  it('lets nobody in the bothy write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual([]);

    // And the hedges survive, because they are the reason the times are safe to
    // doubt: an unhedged Spanish time makes a witness sound certain.
    expect(body('p4')).toContain('más o menos');
    expect(body('m6')).toContain('sobre las');
    expect(body('h6')).toContain('a eso de');
  });
});

/* ------------------------------------------------------------------- the book */

describe('El refugio (es) — the book', () => {
  /**
   * One word for two books, exactly as the English does it. The bothy log and
   * Struan's climbing book are both `el libro`, separated by the verb: you sign
   * one and you send the other to the printers. It pays off in the confession,
   * where `ya lo he dejado escrito en el libro` is his book and the player has
   * spent the whole case signing the other one.
   */
  it('keeps one word for both books and lets the verb separate them', () => {
    // The log: signed, read, taken away.
    for (const text of [body('p3'), body('h4'), revelation('x-keir-book'), press('b-book')]) {
      expect(text).toContain('libro');
    }
    expect(body('p2')).toContain('Se llevaron el libro');
    expect(chip('c-keir-book-late')).toContain('firmó el libro');
    expect(chip('c-keir-book-early')).toContain('firmado el libro');

    // The other book: at the printers, and ended by giving the route back.
    expect(body('s1')).toContain('El libro está en la imprenta');
    expect(body('s9')).toContain('eso te acaba el libro');
    expect(press('b-why')).toContain('su propio libro');
    expect(script.confrontation?.confession).toContain('ya lo he dejado escrito en el libro');

    // No second name for the log, which would split it into two documents.
    for (const rival of [/\blibro de registro\b/, /\bcuaderno del refugio\b/, /\bregistro de firmas\b/]) {
      expect(allProse, `a second name for the log: ${rival}`).not.toMatch(rival);
    }
  });

  /** Two signatures on one page is the proof. Both halves have to be sayable. */
  it('keeps the double signature provable in words', () => {
    expect(body('h3')).toContain('ya estaba seco');
    expect(body('h4')).toContain('Dos K. Lamont, uno debajo del otro');
    expect(revelation('x-keir-book')).toContain('la tinta estaba seca');
    expect(revelation('x-keir-book')).toContain('dos K. Lamont');
    expect(press('b-book')).toContain('dos K. Lamont');
    expect(script.confrontation?.confession).toContain(
      'firmé mi nombre debajo de mi propio nombre',
    );
    // Hamish names why a second signature is a performance rather than a habit.
    expect(body('h10')).toContain('necesita que te acuerdes de verlo llegar');
  });
});

/* ------------------------------------------------------------------ the names */

describe('El refugio (es) — the names', () => {
  it('translates the places that are descriptions', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('bothy')).toBe('el refugio');
    expect(place('mainroom')).toBe('la sala principal');
    expect(place('backroom')).toBe('la sala de atrás');
    expect(place('porch')).toBe('el zaguán');
    expect(place('hill')).toBe('el monte');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('struan')).toBe('Struan');
    expect(character('keir')).toBe('Iain');
    expect(character('morven')).toBe('Anne');
    expect(character('pris')).toBe('Sandra');
    expect(character('hamish')).toBe('Hamish');
  });

  /**
   * Every place name has to appear in the prose with its article intact.
   *
   * Spanish `al` and `del` swallow the article, so a room that is only ever
   * reached `del refugio` or `al monte` never appears under the name its chip
   * carries, and to a player the chip and the message are two different places.
   * This is the same defect shape as a place name the prose never says at all.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theBothyEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      expect(
        prose.includes(p.name.toLowerCase()),
        `no sentence says "${p.name}" with its article — a contraction may have eaten it`,
      ).toBe(true);
    }
  });

  /** A chip and a sentence have to use the same words or they are two rooms. */
  it('uses one word for each room on the chip and in the prose', () => {
    for (const id of ['c-struan-mainroom', 'c-morven-mainroom', 'c-keir-mainroom']) {
      expect(chip(id)).toContain('la sala principal');
    }
    expect(body('p5')).toContain('sala principal');
    expect(body('m6')).toContain('la sala principal');
    expect(press('b-mainroom')).toContain('sala principal');

    for (const id of ['c-pris-backroom', 'c-keir-backroom']) {
      expect(chip(id)).toContain('la sala de atrás');
    }
    expect(body('p1')).toContain('la sala de atrás');
    expect(body('p6')).toContain('sala de atrás');

    expect(chip('c-pris-porch')).toContain('en el zaguán');
    expect(body('m10')).toContain('en el zaguán');
    expect(body('r4')).toContain('en el zaguán');
    expect(revelation('x-pris-porch')).toContain('en el zaguán');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('El refugio (es) — the player has no gender', () => {
  /**
   * One line would have forced one. `you sat at home` translates literally as
   * `te quedaste sentado`, which agrees with the reader; the participle goes
   * and the briefing's own wording stands in. Nothing else in the build would
   * notice if it were reverted.
   */
  it('keeps the confrontation opening from agreeing with the player', () => {
    const opening = script.confrontation?.opening ?? '';
    expect(opening).toContain('te quedaste en casa');
    expect(opening).not.toMatch(/sentad[oa]\b/);
    expect(opening).toContain('No estuviste allí');
  });

  it('describes the player only by what they did', () => {
    expect(script.briefing?.opening).toContain('Tú organizaste el fin de semana');
    expect(script.briefing?.opening).toContain('Te rompiste un tobillo');
    expect(body('m1')).toContain('tú lo organizaste y no estuviste allí');
    expect(script.confrontation?.deflections[1]).toContain('No estuviste en ese monte');
    expect(press('b-mainroom')).toContain('Te situaste');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('El refugio (es) — the voices', () => {
  const STRUAN = ['s1', 's3', 's5', 's7', 's8', 's10', 's11'];
  const IAIN = ['p3', 'p4', 'p6'];
  const ANNE = ['p1', 'p5', 'p8', 'm1', 'm2', 'm3', 'm5', 'm6', 'm7', 'm9', 'm10'];
  const HAMISH = ['p2', 'p7', 'h1', 'h2', 'h3', 'h4', 'h6', 'h7', 'h9', 'h10', 'h11'];
  const SANDRA = ['r1', 'r2', 'r4', 'r5', 'r6', 'r7'];
  const YOU = ['s2', 's4', 's6', 's9', 'm4', 'm8', 'r3', 'h5', 'h8'];

  /**
   * This pack drops no apostrophes anywhere in the English, so unlike Packs 5
   * and 6 there is no dropped-accent axis to substitute. The axes here are
   * capitalisation and whether a person finishes a sentence, and both survive
   * translation unchanged — which is worth asserting precisely because nothing
   * had to be invented.
   */
  it('keeps Hamish and Sandra finishing every sentence', () => {
    for (const id of [...HAMISH, ...SANDRA]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Struan and Iain write identically — capitals, and never a closing full
   * stop. That is the English's own choice and it is mirrored rather than
   * improved: they are the two men in the argument and they sound like each
   * other. Struan is separated by exclamation, which nobody else uses.
   */
  it('keeps Struan and Iain capitalised and never closing', () => {
    for (const id of [...STRUAN, ...IAIN]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a tidy full stop`).toBe(false);
    }
    // Struan takes full Spanish exclamation. Nobody else in the pack does.
    expect(body('s1')).toContain('¡¡');
    expect(body('s1')).toContain('!!');
    for (const id of [...IAIN, ...ANNE, ...HAMISH, ...SANDRA]) {
      expect(body(id), `${id} has grown an exclamation Struan owns`).not.toMatch(/[¡!]/);
    }
  });

  /**
   * Anne is lowercase, and never closes, except where a sentence opens on
   * somebody's name. She is remembering rather than testifying, and the two
   * capitals are the two people she is sure about.
   */
  it('keeps Anne lowercase except where a name starts the line', () => {
    for (const id of ANNE) {
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of ANNE.filter((x) => x !== 'm3' && x !== 'm10')) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
    }
    expect(body('m3').startsWith('Struan')).toBe(true);
    expect(body('m10').startsWith('Sandra')).toBe(true);
  });

  /**
   * The player is thumbing a phone: lowercase, short, no closing full stop,
   * lowercases other people's names, and never opens a question with ¿ — they
   * keep the closing ? in s4, which is exactly how a thumb types it.
   */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('s4')).toContain('?');
    expect(body('m4')).toContain('iain');
    expect(body('r3')).toContain('iain');
  });
});

/* ------------------------------------------------------- the arc and the motive */

describe('El refugio (es) — the arc and the motive', () => {
  /** Pack 7 is standalone. Nothing was added to fill the silence. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
    expect(allProse).not.toMatch(/número desconocido/i);
  });

  /**
   * Both halves of the motive, in two threads. Struan says what he took and
   * Sandra proves he had decided to give it back, and the route keeps its
   * English name in both because it is a name.
   */
  it('keeps both halves of the motive sayable', () => {
    expect(body('s7')).toContain('en solitario en 2016');
    expect(body('s7')).toContain('2018');
    expect(body('r6')).toContain('la verdad sobre la Raven');
    expect(body('r7')).toContain('Lo había decidido');
    expect(script.motives[0]?.summary).toContain('Raven’s Line');
    expect(script.motives[0]?.summary).toContain('delante de testigos');
    // The route is a name; `la vía` is the common noun, exactly as in English.
    expect(body('s6')).toContain('la vía');
  });

  /**
   * Sandra is the red herring and has to be provably innocent for a reason the
   * player can hold. Iain puts her in the back room; Anne and Hamish put her in
   * the porch, and the case must not require proving it.
   */
  it('clears the woman everybody decided was the cleaner', () => {
    expect(chip('c-pris-backroom')).toContain('según Iain');
    expect(chip('c-pris-porch')).toContain('según Anne');
    expect(body('r1')).toContain('Eso no es un móvil, eso es un martes cualquiera');
    expect(body('r4')).toContain('Hamish me pasó por encima dos veces');
    expect(revelation('x-pris-porch')).toContain('decidió que era la limpiadora');
    expect(script.solution.requiredContradictionIds).not.toContain('x-pris-porch');
  });

  /** Anne names Sandra, which is the only reason Sandra s thread opens. */
  it('still names Sandra in the message that finds her', () => {
    expect(body('m10')).toContain('Sandra');
    expect(body('m10')).toContain('habla con ella');
  });
});
