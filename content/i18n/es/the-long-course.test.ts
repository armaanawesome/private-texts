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
import { theLongCourseEs } from './the-long-course';

/**
 * The Spanish Long Course, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry. The generic contract is re-run here against the
 * localised script.
 *
 * The rest is what no generic test can see. This pack is solvable only because
 * eight people are dressed identically, so the kit vocabulary has to hold still;
 * and it turns on a twenty-two minute window in which one man is briefly
 * elsewhere, so the spoken times have to survive to the minute. Both are
 * invisible to every id, number and paragraph check.
 */
const english = getCase('the-long-course')!;
const script = applyCaseText(english, theLongCourseEs);

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
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

/** Written accents only. The tilde on ñ is a letter, not an accent, and stays. */
const ACCENTED = /[áéíóúü]/;

const allProse = [...caseTranslationEntries(theLongCourseEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('La regata larga (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLongCourseEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLongCourseEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLongCourseEs)];

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

  it('gives every claim chip the times the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const acceptable = [[clock(c.window.start)], ...ends.map((e) => [clock(c.window.start), e])];
      expect(
        acceptable.some((form) => form.join('|') === times.join('|')),
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
          `${clock(c.window.start)}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------------ the times */

describe('La regata larga (es) — the times', () => {
  /**
   * The window is twenty-two minutes wide and the case is who left it. The crew
   * alibi has to read the same in Graham's mouth, in the briefing and in both
   * places the proof is stated; `las once y tres` is Carol watching him go in.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      c3: ['las once menos diez', 'las once y veinte'], // boated 10:50, off at 11:20
      c6: ['las once menos veinte', 'casi mediodía'], // Carol on the towpath, 10:40–11:40
      c7: ['las nueve y media'], // the row at the trestles
      d5: ['un poco antes de las once'], // Pauline goes in with the bag
      d7: ['las once y tres'], // Graham goes in. the sighting that convicts him
      d10: ['las diez y media'], // Em in senior kit in the changing room
      g4: ['las diez y veinte'], // Graham asks her, at the trestles
      w4: ['las once cero ocho'], // Warren reading his own timecode aloud
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('a las doce y diez');
    expect(script.briefing?.opening).toContain('desde las once hasta las once y veinte');

    for (const text of [revelation('x-saul-boathouse'), press('l-boathouse')]) {
      expect(text).toContain('las once y tres');
    }
    expect(revelation('x-saul-boathouse')).toContain('desde las once hasta las once y veinte');
    expect(press('l-boathouse')).toContain('desde las once');
    expect(revelation('x-imo-seat')).toContain('las diez y veinte');
    expect(revelation('x-saul-slipway')).toContain('11:08');
    expect(press('l-slipway')).toContain('Las once cero ocho');
  });

  /**
   * The split that makes the video believable.
   *
   * Nobody in this club writes a clock. Warren says his timecode out loud —
   * `las once cero ocho`, exactly as the English says `eleven oh eight` — and
   * the only digits in the whole pack are in the x-saul-slipway revelation,
   * where the camera is quoted rather than the man. That gap is why a burned-in
   * timecode outranks eight people in identical kit, and tidying one message
   * into 11:08 hands the player a precision the club does not have.
   */
  it('lets only the camera write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual([]);
    expect(digitTimes(revelation('x-saul-slipway'))).toEqual(['11:08']);
    expect(body('w5')).toContain('el codigo de tiempo lo graba la camara');
    expect(revelation('x-saul-slipway')).toContain('El código de tiempo lo graba la cámara');
  });
});

/* -------------------------------------------------------------- the sport */

describe('La regata larga (es) — the kit and the book', () => {
  /**
   * The sport's own uniformity is the alibi, so the kit words have to hold
   * still. `el mono` is the one-piece suit Graham hands over, `la equipación`
   * is what Carol sees him wearing, and the English keeps those two apart for a
   * reason: one is an object that changes hands and the other is a look.
   */
  it('keeps one Spanish word for each piece of the crew uniform', () => {
    for (const text of [body('d9'), body('g5'), press('l-seat')]) {
      expect(text).toContain('mono');
    }
    expect(body('w4')).toContain('un mono senior'); // Warren, accents dropped
    expect(revelation('x-saul-slipway')).toContain('un mono sénior');

    for (const text of [body('d7'), body('d10'), script.blurb]) {
      expect(text).toContain('equipación');
    }
    for (const text of [body('d9'), body('g5')]) {
      expect(text).toContain('gorro');
    }
    expect(body('g2')).toContain('puesto cinco');
    expect(revelation('x-imo-seat')).toContain('puesto cinco');
  });

  /**
   * One record, one name. The launch book is what gets Pauline killed and it is
   * named in six places. The marshalling board is deliberately `el panel` and
   * not `el tablero de salidas`, so that nothing else in the pack shares a word
   * with it — two documents called salidas is two documents to a player.
   */
  it('gives the launch book one name and nothing else that name', () => {
    for (const text of [
      body('x4'),
      script.motives[0]?.summary ?? '',
      press('l-why'),
      script.solution.epilogue,
    ]) {
      expect(text).toContain('libro de salidas');
    }
    expect(body('x7')).toContain('columna de responsable');
    expect(press('l-why')).toContain('columna de responsable');

    // The board is not a book, and does not borrow its word.
    expect(body('c6')).toContain('con el panel');
    expect(body('d2')).toContain('donde está el panel');
    expect(allProse).not.toMatch(/tablero de salidas/);

    for (const rival of [/\blibro de registro\b/, /\bcuaderno de salidas\b/, /\bparte de salidas\b/]) {
      expect(allProse, `a second name for the launch book: ${rival}`).not.toMatch(rival);
    }
  });

  /** The count that is the whole case, in the words a player has to match. */
  it('keeps the eight-in-a-boat deduction sayable', () => {
    expect(script.blurb).toContain('qué ocho');
    expect(revelation('x-imo-seat')).toContain('Nadie cuenta nunca qué ocho');
    expect(body('c3')).toContain('el ocho sénior');
    expect(body('g2')).toContain('ocho senior'); // Em, accents dropped
    expect(body('g8')).toContain('nadie nos iba a contar');
    // The chip and the message have to agree on where Graham said she was.
    expect(chip('c-imo-bank')).toContain('con los suplentes');
    expect(body('g9')).toContain('con los suplentes');
    expect(press('l-seat')).toContain('con los suplentes');
  });
});

/* ------------------------------------------------------------------ the names */

describe('La regata larga (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('club')).toBe('el club');
    expect(place('boathouse')).toBe('el hangar');
    expect(place('bank')).toBe('el camino de sirga');
    expect(place('slipway')).toBe('la rampa');
    expect(place('bar')).toBe('el bar del club');
    expect(place('river')).toBe('el río');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('hester')).toBe('Pauline');
    expect(character('saul')).toBe('Graham');
    expect(character('imo')).toBe('Em');
    expect(character('warren')).toBe('Warren');
    expect(character('dilys')).toBe('Carol');
  });

  /** Every place name has to be a word the case actually says. */
  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theLongCourseEs)]
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
   * The English keeps a formal name for the strip of path on its chips and an
   * informal one in the prose, and Spanish mirrors it rather than tidying it.
   * What makes it navigable either way is that the chip and the message share
   * the phrase that matters.
   */
  it('keeps the towpath formal on the chips and informal in the mouth', () => {
    for (const id of ['c-dilys-bank', 'c-warren-bank', 'c-imo-bank']) {
      expect(chip(id)).toContain('camino de sirga');
    }
    expect(body('c6')).toContain('camino de sirga');
    expect(body('d4')).toContain('camino de sirga');
    // And the informal word where the English says `the bank`.
    expect(body('c4')).toContain('desde la orilla');
    expect(body('g9')).toContain('en la orilla');
    expect(press('l-seat')).toContain('en la orilla');
  });

  /** The boathouse is where she dies and is named on three chips. */
  it('uses one word for the boathouse on the chip and in the prose', () => {
    for (const id of ['c-warren-boathouse', 'c-hester-boathouse', 'c-saul-boathouse']) {
      expect(chip(id)).toContain('en el hangar');
    }
    expect(script.briefing?.opening).toContain('en el hangar');
    expect(body('d5')).toContain('en el hangar');
    expect(body('w1')).toContain('en ese hangar');
    expect(revelation('x-saul-boathouse')).toContain('ese hangar');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('La regata larga (es) — the player has no gender', () => {
  /**
   * Nothing in this pack forced a gender, and that is worth pinning as much as
   * a rephrase would be. Carol is the one who would have made a translator
   * reach for an agreeing adjective — she is remembering the player as a rower
   * — and the sentence agrees with `manos` and `cabeza` instead. The English
   * tag question `did you not.` becomes `si no me falla la memoria` rather than
   * an invented ¿verdad?, which would also have made Carol ask something she is
   * not asking.
   */
  it('keeps Carol remembering the player without gendering them', () => {
    expect(body('d1')).toContain('Tú remaste aquí, si no me falla la memoria');
    expect(body('d1')).toContain('tenías las peores manos');
    expect(body('d1')).not.toMatch(/\b(bueno|buena|rápido|rápida|fuerte)\b/);
  });

  it('keeps the confrontation and the coda free of agreement with the player', () => {
    expect(script.confrontation?.opening).toContain('Di lo que has venido a decir');
    expect(script.confrontation?.deflections[1]).toContain('No has bajado por aquí');
    expect(script.confrontation?.deflections[1]).toContain('No sabes lo que es este sitio');
    // `amable` is epicene, which is why the Keeper can use it about the player.
    expect(script.coda?.messages[1]).toContain('Fuiste amable con la chica');
    expect(script.coda?.messages[3]).toContain('Te estás acercando');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La regata larga (es) — the voices', () => {
  const PAULINE = ['x1', 'x3', 'x4', 'x6', 'x7', 'x9', 'x11'];
  const CAROL = ['c1', 'c6', 'c9', 'd1', 'd2', 'd4', 'd5', 'd7', 'd9', 'd10'];
  const GRAHAM = ['c3', 'c5', 'c7'];
  const WARREN = ['c2', 'c4', 'c8', 'w1', 'w3', 'w4', 'w5', 'w7', 'w8', 'w9'];
  const EM = ['g1', 'g2', 'g4', 'g5', 'g7', 'g8', 'g9', 'g10'];
  const YOU = ['x2', 'x5', 'x8', 'x10', 'd3', 'd6', 'd8', 'g3', 'g6', 'w2', 'w6'];

  /**
   * The axis Spanish had to replace, carried over from Pack 5.
   *
   * Em drops every apostrophe in the English and Warren drops them in exactly
   * three messages. Spanish has none to drop, so the written accent takes the
   * job. Both halves are asserted: an axis that only records who is sloppy is
   * not an axis, it also has to show who is not.
   */
  it('moves the dropped apostrophe onto the dropped accent', () => {
    for (const id of EM) {
      expect(ACCENTED.test(body(id)), `${id} has grown an accent Em would not type`).toBe(false);
    }

    // Warren drops them in exactly the three the English drops them in.
    for (const id of ['w4', 'w5', 'w7']) {
      expect(ACCENTED.test(body(id)), `${id} should be typed carelessly`).toBe(false);
    }
    for (const id of ['c2', 'c4', 'c8', 'w1', 'w3', 'w8', 'w9']) {
      expect(ACCENTED.test(body(id)), `${id} should keep its accents`).toBe(true);
    }

    // And the three people who write like adults with a pen never drop one.
    for (const id of [...PAULINE, ...CAROL, ...GRAHAM]) {
      expect(ACCENTED.test(body(id)), `${id} lost an accent it is owed`).toBe(true);
    }
  });

  /**
   * Graham writes in capitals and never lands a final full stop. That is the
   * only orthographic thing between him and the two women he is lying to, and
   * it is a captain asserting rather than finishing.
   */
  it('keeps Graham asserting and never closing', () => {
    for (const id of GRAHAM) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('c3')).toContain('Ocho.');
  });

  /** Pauline and Carol write in capitals and finish every sentence. */
  it('keeps Pauline and Carol writing in sentences', () => {
    for (const id of [...PAULINE, ...CAROL]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /** Warren and Em are lowercase all the way down, names included. */
  it('keeps Warren and Em lowercase and unfinished', () => {
    for (const id of [...WARREN, ...EM]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('c8')).toContain('graham');
    expect(body('g4')).toContain('graham');
  });

  /**
   * The player is thumbing a phone: lowercase, short, no closing full stop and
   * never an opening ¿. Carol uses one, which is part of the same distance.
   */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('x2')).toContain('robbie');
    expect(body('w6')).toContain('pauline');
  });
});

/* -------------------------------------------------------------------- the arc */

describe('La regata larga (es) — the arc', () => {
  /**
   * Pack 6 carries the second arc connection, and the alias is the single most
   * fragile string in the game under translation. It stays English, article
   * included, and the count has to match the English exactly — arcAlias.test.ts
   * counts mentions, and keeping one while paraphrasing the other breaks
   * recognition at the moment the arc is handed over.
   */
  it('keeps both mentions of the Keeper, in English', () => {
    expect(allProse.split('Keeper').length - 1).toBe(2);
    expect(script.confrontation?.confession).toContain('se hacía llamar el Keeper');
    expect(script.coda?.messages[2]).toContain('el Keeper');
  });

  /** And none of it leaks before the end. */
  it('keeps the arc out of every message', () => {
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /**
   * Clue 3 is the detail that was never printed. It has to stay exact in the
   * confession and the coda has to point at the same fact, or the player has
   * nothing to notice.
   */
  it('keeps the detail that was never printed exact', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Sabía que Robbie pidió no salir');
    expect(confession).toContain('No salió nunca en el periódico');
    expect(confession).toContain('Lo oyeron dos chavales');
    expect(script.coda?.messages[2]).toContain('Lo oyeron dos chavales');
    expect(script.coda?.messages[2]).toContain('2009');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('x7')).toContain('S. Brightwell'); // Pauline names the column
    expect(body('x7')).toContain('columna de responsable');
    expect(body('w9')).toContain('robbie nance'); // Warren supplies who that was
    expect(body('w9')).toContain('quince años');
    expect(script.motives[0]?.summary).toContain('2009');
    expect(script.motives[0]?.summary).toContain('juzgado');
  });

  /** Carol names Emma Kerr, which is the only reason Em s thread opens. */
  it('still names Emma Kerr in the message that finds her', () => {
    expect(body('d10')).toContain('Emma Kerr');
  });
});
