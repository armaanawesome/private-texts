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
import { theWakeEs } from './the-wake';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The Spanish Wake, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS. Registration is the coordinator's job and several packs are
 * in flight at once, so a translation that only starts being checked on the day
 * somebody edits a registry is a translation nobody checked. The generic
 * contract is re-run here against the localised script.
 *
 * The rest is what no generic test can see. Two things carry this pack and
 * neither is a number: the rehearsed sentence forty-one people all say, and the
 * ten minutes between `desde las cuatro` and `las cuatro y diez`. Reword either
 * and every id, number and paragraph check stays green while the case stops
 * being solvable by reading, which is the only way anybody solves it.
 */
const english = getCase('the-wake')!;
const script = applyCaseText(english, theWakeEs);

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

/** Written accents only. The tilde on ñ is a letter, not an accent, and stays. */
const ACCENTED = /[áéíóúü]/;

const allProse = [...caseTranslationEntries(theWakeEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('El velatorio (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theWakeEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theWakeEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theWakeEs)];

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

/* ------------------------------------------------------------- the formula */

describe('El velatorio (es) — the sentence they all say', () => {
  /**
   * The blurb promises `palabra por palabra`, so the sentence has to be word
   * for word. One Spanish form, in every mouth that says it: Donal claiming it,
   * Maureen repeating it, Eileen explaining why she said it, and Donal in the
   * confession saying he did not build it. A translator who varies it for
   * rhythm turns a rehearsed alibi into six people who happen to agree, and the
   * case loses the thing it is about.
   */
  it('uses one Spanish form of the collective alibi everywhere', () => {
    for (const text of [body('f4'), body('f6'), body('u2')]) {
      expect(text.toLowerCase()).toContain('estábamos todos en el salón');
    }
    expect(script.confrontation?.confession).toContain('estábamos todos en el salón');

    // The third-person report of the same sentence, in the player's mouth and
    // in the press line, keeps the same words either side of the verb.
    expect(body('r5')).toContain('todos en el salón');
    expect(press('w-garden')).toContain('todos en el salón');

    // Eileen names it as a decision rather than a fact, and the room keeps its
    // one name there too.
    expect(body('r8')).toContain('dijimos el salón, todos, juntos');
    expect(script.confrontation?.confession).toContain('El salón. Todos juntos.');

    // And no second name for the room anywhere.
    for (const rival of [/\bsala de delante\b/, /\bsala de estar\b/, /\bcuarto de delante\b/]) {
      expect(allProse, `a second name for the front room: ${rival}`).not.toMatch(rival);
    }
  });

  /** The shield was built for Cass, and the pack only works if that is legible. */
  it('keeps the reason the shield was built sayable', () => {
    expect(body('r7')).toContain('cuatrocientas libras');
    expect(body('r7')).toContain('no era el día');
    expect(body('r8')).toContain('Fue por ella');
    expect(body('k11')).toContain('estaban siendo buenos conmigo');
    expect(script.confrontation?.confession).toContain('Robé una cosa que era para una cría');
  });
});

/* ------------------------------------------------------------------ the times */

describe('El velatorio (es) — the times', () => {
  /**
   * The whole case is ten minutes wide. `desde las cuatro` is what everybody
   * says; `las cuatro y diez` is where it comes apart, and it has to be the
   * same phrase in Eileen's kitchen, behind Cass's wheelie bin, in both
   * revelations and in both press lines.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      f3: ['desde las once'], // the drink, which is why a fall was believed
      f4: ['desde las cuatro'], // the alibi window, 16:00–16:30
      r3: ['las cuatro y diez'], // Eileen goes for glasses
      k4: ['desde las cuatro'], // Cass out the side for the whole of it
      k5: ['las cuatro y diez'], // Donal comes out
      u4: ['las once y diez'], // the chemist counter, three weeks earlier
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('a las cinco');
    expect(script.briefing?.ruling).toContain('desde las once');

    for (const text of [revelation('x-donal-garden'), press('w-garden')]) {
      expect(text).toContain('las cuatro y diez');
    }
    expect(press('w-garden')).toContain('desde las cuatro');
    for (const text of [revelation('x-donal-glasses'), press('w-glasses')]) {
      expect(text).toContain('las cuatro y diez');
    }
  });

  /**
   * Nobody in this family writes a clock. Every time in every message is
   * spoken, and the only digits on screen are on the chips. A translator who
   * tidies one line into 16:10 gives the player a precision the house does not
   * have, and the case is about how badly people remember a bad afternoon.
   *
   * Spanish cannot say a bare `at ten past` the way English can, so w-glasses
   * restores the hour. That adds a word and moves no minute.
   */
  it('lets nobody in the house write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual([]);
    expect(press('w-glasses')).toContain('a las cuatro y diez');
  });
});

/* ------------------------------------------------------------------ the names */

describe('El velatorio (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('house')).toBe('la casa');
    expect(place('frontroom')).toBe('el salón');
    expect(place('kitchen')).toBe('la cocina');
    expect(place('gardenroom')).toBe('la sala del jardín');
    expect(place('sidereturn')).toBe('el patio lateral');
    expect(place('chemist')).toBe('la farmacia de Ballybough Road');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('tony')).toBe('Tony');
    expect(character('donal')).toBe('Donal');
    expect(character('nuala')).toBe('Maureen');
    expect(character('bridie')).toBe('Eileen');
    expect(character('cass')).toBe('Cass');
  });

  /**
   * Every place name has to be a word the case actually says, or its chip
   * matches no sentence. Matched on the head noun, because `la farmacia de
   * Ballybough Road` is a signpost name the prose shortens to `la farmacia`,
   * exactly as the English shortens `the chemist on Ballybough Road`.
   */
  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theWakeEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /** A chip and a sentence have to use the same words or they are two things. */
  it('uses one word for the side return and the garden room, on the chip and in the prose', () => {
    for (const id of ['c-donal-outside', 'c-cass-return']) {
      expect(chip(id)).toContain('el patio lateral');
    }
    expect(body('r4')).toContain('el patio lateral');
    expect(body('r9')).toContain('el patio lateral');
    expect(body('k10')).toContain('el patio lateral');
    // Bare, once it has been named — the English drops `side` the same way.
    expect(body('k4')).toContain('en el patio todo el rato');

    for (const id of ['c-cass-gardenroom', 'c-donal-garden']) {
      expect(chip(id)).toContain('la sala del jardín');
    }
    expect(script.briefing?.ruling).toContain('la sala del jardín');
    expect(revelation('x-donal-garden')).toContain('la sala del jardín');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('El velatorio (es) — the player has no gender', () => {
  /**
   * The pack's very first message would have picked one. `you are the image of
   * him` translates literally as `eres clavado a él`, which agrees with the
   * reader; `eres su vivo retrato` is the idiom, agrees with `retrato`, and
   * marks nobody. Nothing else in the build would notice if it were reverted.
   */
  it('keeps the first message from telling the player what they are', () => {
    expect(body('y1')).toContain('eres su vivo retrato');
    expect(body('y1')).not.toMatch(/clavad[oa]\b/);
  });

  it('keeps the participles off the player everywhere else', () => {
    // `somebody not in this family up to their neck` — the literal reaches for
    // an agreeing participle, so the verb carries it instead.
    expect(body('y3')).toContain('alguien que no esté en esta familia hasta el cuello');
    expect(body('y3')).not.toMatch(/metid[oa]\b/);

    // The briefing, the wake's own greeting, and the confrontation all address
    // the player without agreeing with them.
    expect(script.briefing?.opening).toContain('No habías estado en esa casa');
    expect(body('r1')).toContain('Viniste. Nueve años y viniste');
    expect(script.confrontation?.opening).toContain('Nueve años fuera');
    expect(script.confrontation?.deflections[1]).toContain('No puedes llegar y tener razón');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('El velatorio (es) — the voices', () => {
  const TONY = ['y1', 'y3', 'y4', 'y6', 'y7', 'y9', 'y10', 'y11'];
  const DONAL = ['f3', 'f4', 'f5', 'f8', 'f10', 'f11'];
  const MAUREEN = ['f1', 'f6', 'f12', 'u1', 'u2', 'u4', 'u5', 'u6', 'u7', 'u8'];
  const EILEEN = ['f2', 'f9', 'f13', 'r1', 'r3', 'r4', 'r6', 'r7', 'r8', 'r9', 'r10'];
  const CASS = ['k1', 'k2', 'k4', 'k5', 'k7', 'k8', 'k10', 'k11'];
  const YOU = ['y2', 'y5', 'y8', 'f7', 'r2', 'r5', 'k3', 'k6', 'k9', 'u3'];

  /**
   * The axis Spanish had to replace.
   *
   * In the English, who drops an apostrophe is the character: Cass never writes
   * one, Donal drops them in exactly two messages, Tony in one, and the two
   * older women never do. Spanish has no apostrophe, so the accent takes the
   * job — dropping accents is the same gesture, and it is what people actually
   * do typing fast. Both halves are asserted, because an axis that only records
   * who is sloppy is not an axis: it also has to show who is not.
   */
  it('moves the dropped apostrophe onto the dropped accent', () => {
    for (const id of CASS) {
      expect(ACCENTED.test(body(id)), `${id} has grown an accent Cass would not type`).toBe(false);
    }

    // Donal drops them in exactly the two messages the English drops them in.
    for (const id of ['f8', 'f10']) {
      expect(ACCENTED.test(body(id)), `${id} should be typed carelessly`).toBe(false);
    }
    for (const id of ['f3', 'f4', 'f5', 'f11']) {
      expect(ACCENTED.test(body(id)), `${id} should keep its accents`).toBe(true);
    }
    // Tony, once, in the message where the English drops one.
    expect(ACCENTED.test(body('y10'))).toBe(false);
    expect(body('y10')).toContain('alla');

    // And the two older women never drop one. f12 is a single name and a full
    // stop, and has no accent to keep.
    for (const id of [...MAUREEN.filter((x) => x !== 'f12'), ...EILEEN]) {
      expect(ACCENTED.test(body(id)), `${id} lost an accent it is owed`).toBe(true);
    }
  });

  /** Cass and Donal type the same way otherwise, which is why the accents matter. */
  it('keeps Cass and Donal lowercase and unfinished', () => {
    for (const id of [...CASS, ...DONAL]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a tidy full stop`).toBe(false);
    }
    expect(body('k2')).toContain('cogi el dinero');
  });

  /** Tony writes like Cass and thinks like Maureen. Lowercase, never finished. */
  it('keeps Tony lowercase and unfinished', () => {
    for (const id of TONY) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('y7')).toContain('tú cuídate');
  });

  /**
   * Maureen writes in capitals and trails off without terminal punctuation.
   * Every message except f12, which is one word and a full stop, and is her
   * stopping her husband talking in front of the whole family.
   */
  it('keeps Maureen capitalised and trailing off', () => {
    for (const id of MAUREEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
    }
    for (const id of MAUREEN.filter((x) => x !== 'f12')) {
      expect(body(id).endsWith('.'), `${id} has grown a terminal full stop`).toBe(false);
    }
    expect(body('f12')).toBe('Donal.');
  });

  /** Eileen is eighty-one and finishes every sentence she starts. */
  it('keeps Eileen finishing her sentences', () => {
    for (const id of EILEEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * The player is thumbing a phone: lowercase, short, never a closing full stop
   * and never an opening ¿. They keep their accents, which is the small thing
   * separating them from Cass, who types the same length of line.
   */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('y8')).toContain('tony'); // and they lowercase the names too
    expect(body('k6')).toContain('qué');
    expect(body('k9')).toContain('por qué');
  });
});

/* -------------------------------------------------------------------- the arc */

describe('El velatorio (es) — the arc and the motive', () => {
  /** Pack 5 is standalone. Nothing was added to fill the silence. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
    expect(allProse).not.toMatch(/número desconocido/i);
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('y4')).toContain('ciento ochenta mililitros'); // Tony names the amount
    expect(body('y4')).toContain('5mg'); // against the dose
    expect(body('u7')).toContain('residencia'); // Maureen supplies what it was for
    expect(script.motives[0]?.summary).toContain('ciento ochenta mililitros');
    expect(script.motives[0]?.summary).toContain('cinco mililitros');
    expect(script.motives[0]?.summary).toContain('el viernes');
  });

  /**
   * One name for the printout and one for the chemist, or the player is holding
   * two documents. The printout is the object that gets Tony killed and it is
   * named in four places.
   */
  it('gives the printout and the chemist one name each', () => {
    for (const text of [
      body('y6'),
      script.motives[0]?.summary ?? '',
      revelation('x-donal-scripts'),
      press('w-why'),
    ]) {
      expect(text).toContain('listado');
    }
    for (const text of [body('y4'), body('u4'), script.motives[0]?.summary ?? '']) {
      expect(text).toContain('farmacia');
    }
    for (const rival of [/\bimpresión del\b/, /\bticket\b/, /\bbotica\b/]) {
      expect(allProse, `a second name for a record: ${rival}`).not.toMatch(rival);
    }
  });

  /** Eileen names Cass, which is the only reason Cass s thread opens. */
  it('still points at Cass in the message that finds her', () => {
    expect(body('r10')).toContain('Habla con ella');
  });

  /** The Garda are one force with one name, said eleven times. */
  it('keeps the guards one word', () => {
    for (const id of ['y8', 'f3', 'r5', 'u2', 'u5']) {
      expect(body(id)).toMatch(/guardias?/);
    }
    expect(allProse).not.toMatch(/\bla policía\b/);
  });
});
