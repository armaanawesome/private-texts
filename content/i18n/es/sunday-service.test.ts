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
import { sundayServiceEs } from './sunday-service';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The Spanish Sunday Service, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry. The generic contract is re-run here against the
 * localised script.
 *
 * The rest is what no generic test can see. The case is a forged line in a book
 * against an old man's memory, so two vocabularies have to hold absolutely
 * still — the document words and the twenty minutes on the Tuesday — and
 * neither is visible to an id, number or paragraph check.
 */
const english = getCase('sunday-service')!;
const script = applyCaseText(english, sundayServiceEs);

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

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const allProse = [...caseTranslationEntries(sundayServiceEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('El oficio del domingo (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(sundayServiceEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, sundayServiceEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(sundayServiceEs)];

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
   * A chip may name its window, or a single moment inside it. The register pair
   * does neither and is right not to: those two claims share one window because
   * they are an exclusive group, and each label names what was asserted.
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

/* --------------------------------------------------------------- the register */

describe('El oficio del domingo (es) — the register', () => {
  /**
   * One name per thing, or the player is holding several documents.
   *
   * `el registro` is the record, `el tomo de 1974` is the physical volume Pam
   * signed out, and `la partida 114` is the forged line. `partida` and not
   * `asiento`: a Spanish parish entry is a partida, and `asiento` also means a
   * seat, which inside a church is a trap.
   */
  it('gives the register, the volume and the entry one name each', () => {
    for (const text of [
      script.blurb,
      body('i2'),
      body('i4'),
      revelation('x-cordy-register'),
      press('v-register'),
    ]) {
      expect(text).toMatch(/registros?\b/);
    }
    for (const text of [body('i3'), revelation('x-cordy-register'), press('v-register')]) {
      expect(text).toContain('tomo de 1974');
    }
    for (const text of [body('a3'), script.motives[0]?.summary ?? '', press('v-why')]) {
      expect(text).toContain('partida 114');
    }
    expect(script.solution.epilogue).toContain('partida 114');

    // The seat-word trap, and any second name for the record.
    for (const rival of [/\basiento\b/, /\blibro de registro\b/, /\bacta de matrimonio\b/]) {
      expect(allProse, `a second name for the record: ${rival}`).not.toMatch(rival);
    }
  });

  /** The forgery is physical, and both halves of the proof have to be sayable. */
  it('keeps the forgery legible as a physical fact', () => {
    expect(body('a1')).toContain('otra tinta y otra letra');
    expect(body('a3')).toContain('rayado de la página');
    expect(body('a3')).toContain('Alguien ha hecho sitio');
    expect(script.solution.epilogue).toContain('rayado de la página');
    expect(script.solution.epilogue).toContain('luz rasante');
    // And the memory that outranks it.
    expect(body('j2')).toContain('no hubo boda ninguna en agosto de 1974');
    expect(body('a8')).toContain('no tenía tejado');
    expect(press('v-why')).toContain('no tenía tejado');
  });

  /**
   * The exclusive pair. These two chips share a window, so the numbers on them
   * are the whole contradiction: signed it out on the eleventh, said never.
   */
  it('keeps the register pair readable as a pair', () => {
    expect(chip('c-cordy-signed-out')).toContain('11 de marzo');
    expect(chip('c-cordy-never-register')).toContain('nunca manejó los registros');
    expect(body('i3')).toContain('el once de marzo');
    expect(body('i4')).toContain('nunca, ni una sola vez');
    expect(revelation('x-cordy-register')).toContain('el once de marzo');
    expect(press('v-register')).toContain('el once de marzo');
  });
});

/* ------------------------------------------------------------------ the times */

describe('El oficio del domingo (es) — the times', () => {
  /** Twenty minutes on a Tuesday, and every one of them spoken. */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p1: ['las nueve y media'], // Grace finds her
      p4: ['desde las siete'], // Denise starts tuning
      e3: ['Desde las siete hasta las ocho y diez'], // shut in the tower
      e4: ['las ocho y diez'], // Jack lets her out
      j7: ['Las ocho y diez'], // and Jack confirms it
      j9: ['las ocho menos veinte'], // Pam into the vestry. the sighting
      i6: ['las ocho y veinte'], // her car under the yew
      i8: ['desde las siete'], // Avril in the vestry all evening
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('las nueve y media');

    for (const text of [revelation('x-cordy-vestry'), press('v-vestry')]) {
      expect(text).toContain('las ocho menos veinte');
    }
    for (const text of [revelation('x-cordy-carpark'), press('v-carpark')]) {
      expect(text).toContain('las ocho y veinte');
    }
    expect(revelation('x-petra-tower')).toContain('las ocho y diez');
    expect(revelation('x-petra-tower')).toContain('desde las siete');
    expect(revelation('x-cordy-vestry')).toContain('de siete a nueve');
  });

  /**
   * Nobody in this parish writes a clock. Every time is spoken, and the only
   * digits a player sees are on their own chips — which is what lets a burned
   * date, `el once de marzo`, land as a different kind of fact from `a eso de
   * las ocho menos veinte`.
   */
  it('lets nobody in the parish write a clock time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual([]);
    expect(body('j9')).toContain('a eso de');
  });
});

/* ------------------------------------------------------------------ the names */

describe('El oficio del domingo (es) — the names', () => {
  it('translates the places that are descriptions and keeps the church a name', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('church')).toBe('St Ninian’s');
    expect(place('nave')).toBe('la nave');
    expect(place('vestry')).toBe('la sacristía');
    expect(place('tower')).toBe('la torre');
    expect(place('carpark')).toBe('el aparcamiento de la iglesia');
    expect(place('cordyhome')).toBe('la casa de Pam');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('avril')).toBe('Avril');
    expect(character('cordy')).toBe('Pam');
    expect(character('ines')).toBe('Grace');
    expect(character('jack')).toBe('Jack');
    expect(character('petra')).toBe('Denise');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(sundayServiceEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * The car park is masculine and its chip is reached through `del`, which in
   * Spanish swallows the article. i6 therefore says it in full, so the name on
   * the chip is a name some sentence actually contains.
   */
  it('says the car park in full, uncontracted, at least once', () => {
    expect(body('i6')).toContain('el aparcamiento de la iglesia');
    for (const id of ['c-cordy-carpark', 'c-ines-carpark']) {
      expect(chip(id)).toContain('en el aparcamiento');
    }
  });

  /**
   * The nave is a place name on three chips, so the south aisle is `el lateral
   * sur` rather than `la nave lateral sur`. A second room whose name contains
   * the first is two rooms to a player looking for a match.
   */
  it('keeps the south aisle from borrowing the nave s name', () => {
    expect(body('i9')).toContain('el lateral sur');
    expect(script.confrontation?.confession).toContain('el lateral sur');
    expect(allProse).not.toMatch(/nave lateral/);

    for (const id of ['c-avril-nave', 'c-petra-nave', 'c-jack-nave']) {
      expect(chip(id)).toContain('en la nave');
    }
    expect(body('p5')).toContain('en la nave');
    expect(body('j9')).toContain('en la nave');
  });

  /** The vestry is where she dies and is named on three chips. */
  it('uses one word for the vestry on the chip and in the prose', () => {
    for (const id of ['c-cordy-vestry', 'c-avril-vestry']) {
      expect(chip(id)).toContain('en la sacristía');
    }
    expect(script.briefing?.opening).toContain('en la sacristía');
    expect(body('p1')).toContain('en la sacristía');
    expect(body('j9')).toContain('en esa sacristía');
    expect(revelation('x-cordy-vestry')).toContain('en la sacristía');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('El oficio del domingo (es) — the player has no gender', () => {
  /**
   * Nothing in this pack forced one, and that is worth pinning as precisely as
   * a rephrase would be — the trap here is the opposite mistake. j3 says
   * `estás seguro del año` and that agreement is with Jack, who is a man and is
   * the person being spoken to. Neutralising it would be wrong.
   */
  it('describes the player only by what they do', () => {
    expect(script.briefing?.opening).toContain('Tú llevas el archivo diocesano');
    expect(script.briefing?.opening).toContain('habías empezado a esperar sus correos');
    expect(script.confrontation?.opening).toContain('Llevas nueve días en este pueblo');
    expect(script.confrontation?.opening).toContain('has estado hablando');
    expect(script.confrontation?.deflections[1]).toContain('No tienes ni idea');
  });

  it('leaves the agreement that belongs to Jack alone', () => {
    // He is a man, he is the addressee, and the English says it of him.
    expect(body('j3')).toContain('estás seguro del año');
    expect(body('j4')).toContain('Estoy seguro del año');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('El oficio del domingo (es) — the voices', () => {
  const AVRIL = ['a1', 'a3', 'a4', 'a6', 'a7', 'a8', 'a10', 'a11'];
  const GRACE = ['p1', 'p2', 'p7', 'i1', 'i2', 'i3', 'i4', 'i6', 'i7', 'i8', 'i9'];
  const PAM = ['p3', 'p5'];
  const DENISE = ['p4', 'p6', 'e1', 'e3', 'e4', 'e6', 'e7', 'e8'];
  const JACK = ['j1', 'j2', 'j4', 'j5', 'j7', 'j8', 'j9', 'j10'];
  const YOU = ['a2', 'a5', 'a9', 'e2', 'e5', 'j3', 'j6', 'i5'];
  const WRITTEN = [...AVRIL, ...GRACE, ...PAM, ...DENISE, ...JACK];

  /**
   * This pack has a deliberately flat orthographic field: every adult writes in
   * capitals and finishes every sentence, and the English never varies it. So
   * unlike Packs 5 and 6 there is no apostrophe axis to substitute an accent
   * for, and inventing one would add a distinction the English does not make.
   * The axis is diction, and it is pinned line by line below.
   */
  it('keeps every adult in the parish writing in finished sentences', () => {
    for (const id of WRITTEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    // a1 is the one question anybody actually asks, and Avril asks it in full
    // Spanish punctuation. The player never does, which is the whole line
    // between a woman with an archive and a thumb on a phone.
    expect(body('a1').endsWith('?')).toBe(true);
    expect(body('a1')).toContain('¿');
  });

  /** Jack states and refuses to interpret. That refusal is the character. */
  it('keeps Jack saying what he saw and not what it means', () => {
    expect(body('j10')).toContain('No digo lo que significa. Digo dónde estaba.');
    expect(body('e8')).toContain('dice lo que vio en vez de lo que significa');
    // He dates by his father rather than by a calendar.
    expect(body('j4')).toContain('el último trabajo que hicimos juntos');
    expect(body('j9')).toContain('no lo ve nadie');
  });

  /** Avril has the vocabulary of an archive and Grace has the rule book. */
  it('keeps Avril technical and Grace institutional', () => {
    expect(body('a3')).toContain('La numeración');
    expect(body('a11')).toContain('el resto del lote');
    expect(body('i2')).toContain('está en la normativa');
    expect(body('i2')).toContain('hay un libro donde se firma');
    expect(body('i7')).toContain('prefiero no hacerlo por escrito');
  });

  /** Denise names her own outsiderness; Pam uses the second person to own the village. */
  it('keeps Denise outside and Pam proprietary', () => {
    expect(body('e1')).toContain('no soy de aquí');
    expect(body('e1')).toContain('esos tres datos son uno solo');
    expect(body('p5')).toContain('Tú estuviste en la nave');
    expect(script.confrontation?.opening).toContain('una chica que no es de aquí');
  });

  /**
   * The player is the only lowercase voice in the pack, never lands a full
   * stop, lowercases other people's names and never opens with ¿.
   */
  it('keeps the player terse and the only one typing on a phone', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('a9')).toContain('avril');
    expect(body('a5')).toContain('pam hale');
    expect(body('j6')).toContain('denise');
  });
});

/* ------------------------------------------------------- the arc and the motive */

describe('El oficio del domingo (es) — the arc and the motive', () => {
  /** Pack 8 is standalone. Nothing was added to fill the silence. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
    expect(allProse).not.toMatch(/número desconocido/i);
  });

  /**
   * The motive is not money and the pack falls apart if it reads as money.
   * Both halves live in different threads: Jack says there was no roof, Grace
   * says what forty years of standing in that parish is made of.
   */
  it('keeps both halves of the motive sayable, and keeps it about standing', () => {
    expect(body('a8')).toContain('no tenía tejado');
    expect(body('i9')).toContain('cuarenta años');
    expect(body('i9')).toContain('una placa con el nombre de su madre');
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('cuatro líneas');
    expect(motive).toContain('cuarenta años');
    expect(motive).toContain('el lunes');
    expect(script.confrontation?.confession).toContain('se apoya en esas cuatro líneas');
  });

  /**
   * Denise is the red herring and has to be provably innocent. Pam puts her in
   * the nave; Jack and a broken latch put her shut in the tower, and the case
   * must not require proving it.
   */
  it('clears the organist who is not from here', () => {
    expect(chip('c-petra-nave')).toContain('según Pam');
    expect(chip('c-petra-tower')).toContain('según Jack');
    expect(body('e4')).toContain('no pude salir');
    expect(revelation('x-petra-tower')).toContain('el pestillo está roto desde marzo');
    expect(script.solution.requiredContradictionIds).not.toContain('x-petra-tower');
  });

  /** Denise names Jack, which is the only reason Jack s thread opens. */
  it('still names Jack in the message that finds him', () => {
    expect(body('e8')).toContain('Jack');
  });
});
