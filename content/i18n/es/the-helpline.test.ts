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
import { theHelplineEs } from './the-helpline';

/**
 * The Spanish Helpline, checked on the things a player reasons over.
 *
 * Applied directly rather than through CASE_TRANSLATIONS. What no generic test
 * can see: a pause that is the whole characterisation, ninety minutes that only
 * exist in handwriting, and three mentions of a name that must stay English.
 */
const english = getCase('the-helpline')!;
const script = applyCaseText(english, theHelplineEs);

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

const allProse = [...caseTranslationEntries(theHelplineEs).values()].join('\n');

describeCaseContract(script);

describe('La línea de escucha (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theHelplineEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theHelplineEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theHelplineEs)];
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

  /**
   * A chip may name its window or a single moment inside it. This is a night
   * shift, so the engine holds 02:10 as 1570 minutes past a zero the evening
   * before — `clock` wraps, which is the whole reason it lives in testkit.
   */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (f) => f.join('|') === times.join('|'),
      );
      const inside = times.length === 1 && times[0]! >= start && times[0]! <= clock(c.window.end);

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

describe('La línea de escucha (es) — the call that was never made', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      b4: ['las dos y diez', 'las cuatro menos veinte'], // Alun speaks his ninety minutes
      b7: ['las dos y media'], // and puts somebody on the back stairs
      y2: ['de dos a cuatro'], // Yusuf in the call room all night
      y5: ['las dos y media', 'las tres y media'], // four unlit lamps
      y7: ['las dos y media'], // and Alun going through to the office
      y8: ['desde medianoche'], // Connie in the office with the door open
      p2: ['02:10', '03:40'], // the duty book, read back
      p3: ['entre las dos y las cuatro'], // and the bill that empties it
      p5: ['02:55', '03:05'], // the alarm panel
    };
    for (const [id, fragments] of Object.entries(times)) {
      for (const f of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${f}"`).toContain(f.toLowerCase());
      }
    }

    expect(script.briefing?.opening).toContain('las siete de la mañana');
    for (const t of [revelation('x-alun-office'), press('p-office')]) {
      expect(t.toLowerCase()).toContain('dos y media');
    }
    expect(revelation('x-alun-stairs')).toContain('02:55');
    expect(revelation('x-alun-stairs')).toContain('03:05');
    // The player quoting a panel is not the panel, so the press line speaks it.
    expect(press('p-stairs')).toContain('las tres menos cinco');
    expect(press('p-stairs')).toContain('las tres y cinco');
  });

  /**
   * Only the records carry digits, and both belong to Prem reading a document
   * back. Alun speaks his own ninety minutes, which is the point: the handwriting
   * and the machine disagree, and only one of them is in digits.
   */
  it('lets only the quoted records write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['p2', 'p5']);
    expect(digitTimes(body('b4'))).toEqual([]);
  });

  /** The promise the alibi is built on has to be stated, or the lie is not clever. */
  it('keeps the untraceability that makes the alibi possible', () => {
    expect(script.briefing?.opening).toContain('No se graba nada');
    expect(script.briefing?.opening).toContain('las escribe a mano después quien las ha cogido');
    expect(body('p3')).toContain('No dice quién llamó ni qué se dijo, porque no puede');
    expect(revelation('x-alun-call')).toContain('no se graba ni se rastrea nada');
    expect(script.blurb).toContain('se anotan a mano');
  });

  /** One name per record, or the player is holding several documents. */
  it('gives the duty book, the lamps and the fob one name each', () => {
    for (const t of [body('p2'), revelation('x-alun-call'), script.briefing?.ruling ?? '']) {
      expect(t).toContain('libro de guardia');
    }
    for (const t of [body('y4'), body('y5'), revelation('x-alun-call'), press('p-call')]) {
      expect(t).toContain('pilotos');
    }
    for (const t of [body('b6'), body('s5'), body('p5'), revelation('x-alun-stairs')]) {
      expect(t).toContain('llavero');
    }
    for (const rival of [/\btarjeta de acceso\b/, /\bbitácora\b/, /\bregistro de llamadas\b/]) {
      expect(allProse, `a second name for a record: ${rival}`).not.toMatch(rival);
    }
  });
});

describe('La línea de escucha (es) — the names', () => {
  it('translates the places that are descriptions', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('branch')).toBe('la sede');
    expect(place('callroom')).toBe('la sala de llamadas');
    expect(place('office')).toBe('el despacho');
    expect(place('kitchen')).toBe('la cocina');
    expect(place('backstairs')).toBe('la escalera de atrás');
    expect(place('sunnyhome')).toBe('el piso de Sunny');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theHelplineEs)]
      .filter(([p]) => !/^(character|place|object|thread)\./.test(p))
      .map(([, v]) => v)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * `el despacho` is the room she dies in and is named on three chips, and
   * Spanish `al` and `del` would swallow its article. Said in full at least
   * once, or the chip names a room no sentence contains.
   */
  it('says the office in full, uncontracted', () => {
    expect(script.briefing?.opening).toContain('en el despacho');
    expect(body('b1')).toContain('en el despacho');
    for (const id of ['c-alun-office', 'c-connie-office']) {
      expect(chip(id)).toContain('en el despacho');
    }
    expect(chip('c-alun-callroom')).toContain('en la sala de llamadas');
    expect(chip('c-alun-backstairs')).toContain('en la escalera de atrás');
    expect(body('b7')).toContain('la escalera de atrás');
  });
});

describe('La línea de escucha (es) — the player has no gender', () => {
  /**
   * Two lines would have forced one, and both were rebuilt rather than
   * resolved. Nothing else in the build would notice if either were reverted.
   */
  it('opens the case without gendering the player', () => {
    // `¿Estás despierto?` picks a gender in the pack's first message. `en pie`
    // is invariable and means the same thing.
    expect(body('c1')).toContain('Estás en pie');
    expect(body('c1')).not.toMatch(/despiert[oa]\b/);
  });

  it('seats the player without gendering them', () => {
    // `donde estás sentado` agrees; the chair does not.
    expect(body('p8')).toContain('Se sentó en esa misma silla');
    expect(body('p8')).not.toMatch(/sentad[oa]\b/);
  });

  it('describes the player only by what they did', () => {
    expect(script.briefing?.opening).toContain('Hiciste cuatro años en esa línea');
    expect(script.briefing?.opening).toContain('te formó ella');
    expect(script.confrontation?.opening).toContain('dejarte hablar');
    expect(script.confrontation?.deflections[1]).toContain('Te estás esforzando muchísimo');
  });
});

describe('La línea de escucha (es) — the voices', () => {
  const ALUN = ['b3', 'b4', 'b5', 'b7'];
  const WRITTEN = [
    'c1', 'c3', 'c5', 'c6', 'c8', 'c9', 'c11', 'c12', 'c13',
    ...ALUN,
    'y1', 'y2', 'y4', 'y5', 'y7', 'y8', 'y9',
    'b6', 'b8', 's1', 's2', 's4', 's5', 's6', 's7', 's8',
    'b1', 'b2', 'b9', 'p1', 'p2', 'p3', 'p5', 'p6', 'p7', 'p8', 'p9',
  ];
  const YOU = ['c2', 'c4', 'c7', 'c10', 'y3', 'y6', 's3', 'p4'];

  /**
   * The pause is the pack.
   *
   * Alun trails off with an ellipsis in b3, b7 and the p-office rebuttal, and
   * nobody else does it once. It is the technique the confession then describes
   * the Keeper using on him — `Hacía las pausas` — so flattening it into a full
   * stop would delete the thing the fourth arc clue is made of. The orthographic
   * field is otherwise flat here, as in Packs 8 and 9, so this is the axis.
   */
  it('gives the trailing pause to Alun and to nobody else', () => {
    for (const id of ALUN.filter((x) => x === 'b3' || x === 'b7')) {
      expect(body(id), `${id} lost the pause`).toContain('...');
    }
    const rebuttal =
      script.confrontation?.beats.find((b) => b.id === 'p-office')?.rebuttal ?? '';
    expect(rebuttal).toContain('...');

    for (const id of WRITTEN.filter((x) => x !== 'b3' && x !== 'b7')) {
      expect(body(id), `${id} has grown a pause that belongs to Alun`).not.toContain('...');
    }
    // And the confession names the technique, which is what makes it legible.
    expect(script.confrontation?.confession).toContain('Hacía las pausas');
    expect(script.confrontation?.confession).toContain('Hacía el reflejo');
  });

  it('keeps every volunteer writing in finished sentences', () => {
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
    // Alun asks the one real question in the pack, in full Spanish punctuation,
    // and it is a counselling move rather than a question.
    expect(script.confrontation?.deflections[0]).toContain('¿Y qué te gustaría que pasara');
  });
});

describe('La línea de escucha (es) — the arc', () => {
  /**
   * Three mentions in the English, and arcAlias.test.ts counts rather than
   * checks presence, so paraphrasing any one of them breaks recognition at the
   * moment the arc narrows to a person.
   */
  it('keeps all three mentions of the Keeper, in English', () => {
    expect(allProse.split('Keeper').length - 1).toBe(3);
    expect(script.confrontation?.confession).toContain('se hacía llamar el Keeper');
    expect(script.confrontation?.confession).toContain('escuché al Keeper usar mi propia formación');
    expect(script.coda?.messages[1]).toContain('buscar al Keeper');
  });

  it('keeps the arc out of every message', () => {
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /** Clue 5 is that he is one of them, and it has to survive exactly. */
  it('keeps the clue that narrows him to a person', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('es de los nuestros, o lo fue');
    expect(confession).toContain('No dijo ni una palabra de Connie');
    expect(script.coda?.messages[1]).toContain('Es donde lo aprendí');
    expect(script.coda?.messages[1]).toContain('Nueve años de jueves');
    expect(script.coda?.messages[2]).toContain('Ya tienes cinco');
    expect(script.coda?.messages[3]).toContain('no he tenido que decir la cosa yo ni una sola vez');
  });

  /** Both halves of the motive, in two threads, and it stays about not knowing. */
  it('keeps both halves of the motive sayable, and keeps it kind', () => {
    expect(body('c6')).toContain('2011');
    expect(body('p7')).toContain('2011');
    expect(body('p7')).toContain('el día catorce');
    expect(script.motives[0]?.summary).toContain('no te enteras nunca');
    // The reason has to be the same words in Connie's account and in the press.
    expect(body('p8')).toContain('no soportaba no saber');
    expect(press('p-why')).toContain('no soportabas no saber');
    expect(body('c8')).toContain('queriendo saber');
  });

  /**
   * Sunny is the red herring. Alun puts her in the building; a deactivated fob
   * and two witnesses clear her, and the case must not require proving it.
   */
  it('clears the woman everybody decided was difficult', () => {
    expect(chip('c-sunny-branch')).toContain('según Alun');
    expect(body('s5')).toContain('el tres de marzo');
    expect(body('p6')).toContain('se desactivó el tres de marzo');
    expect(revelation('x-sunny-fob')).toContain('Ella le tenía cariño');
    expect(script.solution.requiredContradictionIds).not.toContain('x-sunny-fob');
  });

  /** Yusuf names Sunny, which is the only reason her thread opens. */
  it('still names Sunny in the message that finds her', () => {
    expect(body('y9')).toContain('Sunny Halvorsen');
  });
});
