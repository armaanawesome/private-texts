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
import { clock, digitTimes, numbers, paragraphs } from '../testkit';
import { theAllotmentsEs } from './the-allotments';

/**
 * The Spanish Allotments, checked on the things a player reasons over.
 *
 * Applied directly rather than through CASE_TRANSLATIONS, so it is checked on
 * its own account rather than on the day somebody edits a registry.
 *
 * What no generic test can see: a remembered sentence that has to be word for
 * word in three mouths, and a fork whose identifying detail is the only reason
 * nobody looked for it.
 */
const english = getCase('the-allotments')!;
const script = applyCaseText(english, theAllotmentsEs);

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

/** Written accents only — the tilde on ñ is a letter and stays. */
const hasAccent = (text: string): boolean => /[áéíóúü]/.test(text);
const allProse = [...caseTranslationEntries(theAllotmentsEs).values()].join('\n');

describeCaseContract(script);

describe('Los huertos (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theAllotmentsEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theAllotmentsEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theAllotmentsEs)];
    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const seen = new Map<string, string>();
    for (const [path, value] of entries.filter(
      ([p]) => !/^(character|place|object|thread)\./.test(p) && p !== 'title',
    )) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
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

  /** A chip may name its window, or a single moment inside it, or its assertion. */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (f) => f.join('|') === times.join('|'),
      );
      const inside =
        times.length === 1 &&
        times[0]! >= start &&
        times[0]! <= clock(c.window.end);

      expect(
        spansWindow || inside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Los huertos (es) — the sentence and the times', () => {
  /**
   * `Wilf decide` is what Joyce said to be kind, what Deb built a murder on,
   * and what gets thrown back at her. Three mouths, one wording — a player has
   * to recognise it the third time, so it does not get varied for rhythm.
   */
  it('keeps Wilf decide word for word in all three places', () => {
    expect(body('j9')).toContain('Wilf decide');
    expect(script.confrontation?.confession).toContain('Wilf decide, dijo');
    expect(press('a-why')).toContain('Wilf decide');
    expect(body('j9')).toContain('Esas fueron mis palabras');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      s3: ['de seis a siete y media'], // Deb puts herself down the far end
      v5: ['desde las seis'], // Nev on plot 3, with Sami two down
      m7: ['las seis y media'], // Sami watches her go up the shed row
      j3: ['19:02', '19:11'], // the scrapyard camera
      j7: ['desde las cinco'], // Wilf on the padlocks
    };
    for (const [id, fragments] of Object.entries(times)) {
      for (const f of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${f}"`).toContain(f.toLowerCase());
      }
    }

    expect(script.briefing?.opening).toContain('las siete y media');
    for (const t of [revelation('x-deb-shedrow'), press('a-shedrow')]) {
      expect(t.toLowerCase()).toContain('seis y media');
    }
    expect(revelation('x-deb-lane')).toContain('19:02');
    expect(revelation('x-deb-lane')).toContain('19:11');
    // The player quoting a camera is not the camera, so the press line speaks it.
    expect(press('a-lane')).toContain('las siete y dos');
    expect(press('a-lane')).toContain('las siete y once');
  });

  /** One machine on the site, and it is the only thing allowed digits. */
  it('lets only the scrapyard camera write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['j3']);
  });
});

describe('Los huertos (es) — the fork', () => {
  /**
   * Everybody can identify it, which is why nobody located it. The tape is the
   * identification, so it stays attached in every mention or the deduction
   * loses the thing it turns on.
   */
  it('keeps one name for the fork and the tape attached to it', () => {
    expect(script.objects.find((o) => o.id === 'fork')?.name).toBe(
      'la horca de borduras con el mango encintado',
    );
    for (const id of ['c-fork-nev', 'c-fork-wilf']) {
      expect(chip(id)).toContain('la horca encintada');
    }
    expect(body('s5')).toContain('la horca de Nev');
    expect(body('s5')).toContain('esa cinta');
    expect(body('v3')).toContain('cinta en el mango');
    expect(revelation('x-fork')).toContain('No es una prueba sobre Nev Ashworth');
    expect(revelation('x-fork')).toContain('estar de pie donde él estaba de pie');
    // The fork is the optional proof, never a required one.
    expect(script.solution.requiredContradictionIds).not.toContain('x-fork');
  });
});

describe('Los huertos (es) — the names', () => {
  it('translates the places that are descriptions', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('site')).toBe('los huertos de Carr Bank');
    expect(place('plot14')).toBe('la parcela 14');
    expect(place('plot3')).toBe('la parcela 3');
    expect(place('shedrow')).toBe('la fila de casetas');
    expect(place('tank')).toBe('el depósito de agua');
    expect(place('lane')).toBe('el camino de Carr Bank');
  });

  /**
   * Spanish `del` and `al` swallow a masculine article, so the two masculine
   * places are each said in full somewhere, or their chips name places no
   * sentence contains.
   */
  it('says the tank and the lane in full, uncontracted', () => {
    expect(body('m2')).toContain('el depósito de agua');
    expect(body('j3')).toContain('el camino de Carr Bank');
    expect(chip('c-deb-lane')).toContain('en el camino de Carr Bank');
    expect(chip('c-sami-tank')).toContain('en el depósito de agua');
  });

  it('uses one word for the shed row on the chip and in the prose', () => {
    for (const id of ['c-deb-shedrow', 'c-wilf-shed']) {
      expect(chip(id)).toContain('en la fila de casetas');
    }
    expect(script.briefing?.opening).toContain('en la fila de casetas');
    expect(body('m7')).toContain('la fila de casetas');
    // Ray's shed is a character in this case and keeps its own word.
    expect(body('w6')).toContain('la caseta de Ray');
    expect(script.solution.epilogue).toContain('la caseta');
  });
});

describe('Los huertos (es) — the player has no gender', () => {
  /**
   * The English carries a comment recording that the confrontation opening used
   * to say `You are his daughter` and disagreed with two other packs. It names
   * the relationship from Wilf's side now, and the Spanish follows.
   */
  it('names the relationship from the dead man s side', () => {
    expect(script.briefing?.opening).toContain('Era tu padre');
    expect(script.confrontation?.opening).toContain('Era tu padre');
    expect(allProse).not.toMatch(/eres su (hijo|hija)/i);
  });

  it('describes the player only by what they did', () => {
    expect(script.confrontation?.opening).toContain('has subido aquí');
    expect(script.confrontation?.deflections[1]).toContain('No has subido por aquí');
    expect(script.confrontation?.deflections[1]).toContain('No conoces este sitio');
  });
});

describe('Los huertos (es) — the voices', () => {
  const NEV = ['s2', 's6', 'v1', 'v3', 'v4', 'v5', 'v6', 'v7'];
  const WRITTEN = [
    'w1', 'w3', 'w5', 'w6', 'w8', 'w9', 'w10',
    's1', 's3', 's4', 's5', 's7',
    'j1', 'j2', 'j3', 'j5', 'j6', 'j7', 'j8', 'j9',
    'm1', 'm2', 'm4', 'm5', 'm7', 'm8',
  ];
  const YOU = ['w2', 'w4', 'w7', 'v2', 'm3', 'm6', 'j4'];

  /**
   * Nev is the only person in this pack who drops apostrophes in the English —
   * `youre` in v4, `hes` in v7 — so he is the only one who drops accents here.
   * Both halves asserted: an axis that only records who is sloppy is not an axis.
   */
  it('gives Nev the dropped accent and nobody else', () => {
    for (const id of NEV) {
      expect(hasAccent(body(id)), `${id} has grown an accent Nev would not type`).toBe(false);
    }
    for (const id of ['w3', 's3', 'j1', 'm1']) {
      expect(hasAccent(body(id)), `${id} lost an accent it is owed`).toBe(true);
    }
    // He lowercases people and weekdays, and capitalises the site. That is the
    // one thing he is formal about.
    expect(body('v4')).toContain('joyce');
    expect(body('v4')).toContain('viernes');
    expect(body('v7')).toContain('Carr Bank');
  });

  it('keeps Nev lowercase and never closing, and everybody else in sentences', () => {
    for (const id of NEV) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of WRITTEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // One word, once, and they keep the accent that Nev would have dropped.
    expect(body('w7')).toBe('papá');
  });
});

describe('Los huertos (es) — the arc and the motive', () => {
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
  });

  /**
   * She was wrong, and the pack only lands if that is legible. Both halves of
   * the motive live in different threads, and the letter has to say what it
   * says in the epilogue.
   */
  it('keeps both halves of the motive sayable, and keeps her wrong', () => {
    expect(body('w6')).toContain('1998');
    expect(body('j8')).toContain('cuatro parcelas');
    expect(script.motives[0]?.summary).toContain('La parcela 14 era la parcela de Ray');
    expect(body('w8')).toContain('exención por motivos humanitarios');
    expect(script.solution.epilogue).toContain('exención por motivos humanitarios');
    expect(script.solution.epilogue).toContain('una parcela no es solo una parcela');
    expect(body('w8')).toContain('una parcela no es solo una parcela');
  });

  /** Nev names Sami, which is the only reason Sami s thread opens. */
  it('still names Sami in the message that finds him', () => {
    expect(body('v7')).toContain('sami');
  });
});
