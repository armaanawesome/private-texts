import { describe, it, expect } from 'vitest';
import { getCase } from '../../cases/index';
import { applyCaseText, caseTextEntries, caseTranslationEntries } from '../caseText';
import { theNightRoundEs } from './the-night-round';

/**
 * The Spanish Night Round, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically. This case turns on times that are written as words rather
 * than digits — "twenty to ten", "half eleven", "five to eleven" — and a Spanish
 * line saying `las once` where the English says half eleven leaves every generic
 * test green and the case unsolvable by reading, which is the only way anybody
 * solves it. So the load-bearing facts are listed. This is deliberately brittle:
 * rewording one of these lines should break a test, because rewording one of
 * these lines is how the case quietly stops working.
 *
 * The translation is applied directly rather than through CASE_TRANSLATIONS,
 * because the orchestrator registers translations and this file has to pass
 * before that lands.
 */
const english = getCase('the-night-round')!;
const script = applyCaseText(english, theNightRoundEs);
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

/** Every translated line the player reads, as one blob. */
const allProse = [...caseTranslationEntries(theNightRoundEs).values()].join('\n');

describe('The Night Round — La ronda de noche (es)', () => {
  /**
   * Every time the case turns on, in the line that states it. Ali puts herself
   * out of the building at twenty to ten and in bed by half ten; Teddy puts her
   * on the corridor at half eleven. That pair, plus the fob at 23:47, is the
   * whole case.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g4: ['las diez y diez'], // the player's fixed point, said twice
      g5: ['las diez', 'medianoche'],
      g6: ['las diez menos veinte', 'las diez y cuarto', 'las diez y media'], // 21:40 / 22:15 / 22:30
      g7: ['las diez y media'], // asleep from 22:30
      m3: ['las once y la de las dos'], // the rounds she signs for
      m9: ['desde la una'], // the office alibi, 01:00–02:00
      t3: ['las diez menos diez'], // Ivy leaves the day room at 21:50
      t6: ['las once menos cinco', 'las once y veinte'], // Margo sat 22:55–23:20
      t8: ['las doce menos veinte', 'las once y media'], // 23:40 down, 23:30 on the corridor
      s3: ['23:47'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The player hammers one time twice in g4, and the repetition is the point.
    expect(body('g4').match(/las diez y diez/g)).toHaveLength(2);

    // The same minute has to survive from the message to the chip to the
    // revelation to the press, or the player is reading four different stories.
    expect(chip('c-fen-carpark')).toContain('23:47');
    expect(revelation('x-fen-carpark')).toContain('23:47');
    expect(press('r-carpark')).toContain('23:47');

    for (const text of [revelation('x-fen-corridor'), press('r-corridor')]) {
      expect(text).toContain('las diez menos veinte');
      expect(text).toContain('las diez y cuarto');
      expect(text).toContain('las once y media');
    }
    for (const text of [revelation('x-fen-asleep'), press('r-asleep')]) {
      expect(text).toContain('las diez y media');
    }

    expect(script.briefing?.opening).toContain('las diez menos veinte');
    expect(script.briefing?.opening).toContain('las siete de la mañana');
  });

  /**
   * One Spanish name per record. Two names for the night book is two books, and
   * the case is one record disagreeing with another.
   */
  it('gives the night book, the round and the fob one name each', () => {
    for (const text of [
      script.blurb,
      script.briefing?.opening ?? '',
      body('m3'),
      body('s2'),
      revelation('x-fen-carpark'),
      script.solution.epilogue,
    ]) {
      expect(text).toContain('libro de noche');
    }

    for (const text of [script.title, body('m3'), revelation('x-margo-round'), chip('c-margo-round')]) {
      expect(text).toContain('ronda');
    }

    for (const text of [
      body('s2'),
      body('s3'),
      revelation('x-fen-carpark'),
      press('r-carpark'),
      chip('c-fen-carpark'),
    ]) {
      expect(text).toContain('llavero');
    }

    // The medicines book is a different book and has to stay one.
    expect(body('m9')).toContain('libro de medicación');

    // No second name for any of the three, anywhere.
    for (const rival of [
      /\bregistro nocturno\b/,
      /\bparte de noche\b/,
      /\blibro nocturno\b/,
      /\bcuaderno de noche\b/,
      /\btarjeta\b/,
      /\bmando\b/,
      /\brecorrido\b/,
    ]) {
      expect(allProse, `a second name for a record: ${rival}`).not.toMatch(rival);
    }
  });

  /** Margo signed a round she did not walk. Both halves have to be sayable. */
  it('keeps the signed-but-unwalked round provable in words', () => {
    expect(body('m3')).toContain('mis iniciales');
    expect(body('t6')).toContain('Margo no subió a las once');
    expect(revelation('x-margo-round')).toContain('firmó la ronda de las once y no la hizo');
    // Sackable, and not a murder. The red herring has to stay a red herring.
    expect(revelation('x-margo-round')).toContain('no es un asesinato');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('i6')).toContain('No he firmado nada desde marzo'); // Ivy refuses
    expect(body('s5')).toContain('poder notarial'); // Claire supplies why that matters
    expect(body('s5')).toContain('2021');
    expect(body('s5')).toContain('servicios sociales');
    expect(script.motives[0]?.summary).toContain('poder notarial');
  });

  /** Margo names Teddy, which is the only reason Teddy's thread appears. */
  it('still names Teddy in the message that finds him', () => {
    expect(body('g9')).toContain('Teddy');
  });

  /**
   * The arc. Pack 3 carries the first connection, and both halves of it are
   * load-bearing across the fifteen packs: the caller's name has to stay
   * recognisable in every language, and the prognosis has to stay exact.
   */
  it('carries the arc intact, and only after the case is solved', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('el Keeper');
    expect(confession).toContain('de ocho a catorce meses');
    expect(confession).toContain('en septiembre');
    expect(confession).toMatch(/telefone/i);

    // Teddy's September number and the coda's September number are the same
    // number, which is the question the arc leaves open.
    expect(body('t10')).toContain('en septiembre');
    expect(body('t10')).toContain('un número');
    expect(script.coda?.messages[2]).toContain('el número de septiembre');

    // And none of it leaks before the end.
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toContain('Keeper');
    expect(beforeTheEnd).not.toMatch(/ocho a catorce/);
  });

  /**
   * Five people who write differently. The register is the characterisation and
   * it is the first thing a translation flattens.
   */
  it('keeps the voices apart', () => {
    // The player types on a phone: lowercase, no opening ¿ or ¡.
    for (const id of ['i2', 'i5', 'i10', 'g4', 'm2', 'm5', 'm7', 't4', 's4']) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
    }

    // Margo is warm and runs on, and leaves the last full stop off.
    for (const id of ['g2', 'g9', 'm3', 'm4', 'm6', 'm8', 'm9']) {
      expect(body(id).endsWith('.'), `${id} has gained a tidy full stop`).toBe(false);
    }
    expect(body('g2')).toContain('!!');
    expect(body('m1')).toContain('!');

    // Ivy is eighty-four and precise, and understates.
    expect(body('i3')).toContain('Llevo un cuaderno de todo');
    expect(body('i6')).toContain('Ese es precisamente el problema');

    // Teddy does not guess at times, and says so before he gives any.
    expect(body('t2')).toContain('no calculo las horas a ojo');
    expect(body('t2')).toContain('Si te doy una hora, es una hora');

    // Everyone who is not the player writes like an adult with a pen.
    for (const id of ['i1', 'g1', 'g6', 'm1', 't2', 't8', 's1', 's5']) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
    }
  });

  /**
   * What caseText.test.ts will check the moment this is registered, checked here
   * until it is. A half-translated case is worse than none, and an unregistered
   * file has nothing else looking at it.
   */
  describe('until the orchestrator registers it', () => {
    it('has exactly the ids the English case has', () => {
      const englishKeys = new Set(caseTextEntries(english).keys());
      const translatedKeys = new Set(caseTranslationEntries(theNightRoundEs).keys());

      expect([...englishKeys].filter((k) => !translatedKeys.has(k)), 'missing').toEqual([]);
      expect([...translatedKeys].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    });

    it('gives every claim chip the times the engine actually holds', () => {
      const clock = (minutes: number): string =>
        `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

      for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
        const times = c.label.match(/\b\d{2}:\d{2}\b/g) ?? [];
        if (times.length === 0) continue;
        const ends = c.window.end % 1440 === 0 ? [clock(c.window.end), '24:00'] : [clock(c.window.end)];
        const acceptable = [[clock(c.window.start)], ...ends.map((e) => [clock(c.window.start), e])];
        expect(
          acceptable.some((form) => form.join('|') === times.join('|')),
          `chip ${c.id} says ${times.join('–')}, engine holds ${clock(c.window.start)}–${clock(c.window.end)}`,
        ).toBe(true);
      }
    });

    it('keeps every number and every paragraph the English states', () => {
      const numbers = (t: string): string[] => (t.match(/\d+/g) ?? []).sort();
      const paragraphs = (t: string): number => t.split(/\n{2,}/).length;
      const translated = caseTranslationEntries(theNightRoundEs);

      for (const [path, source] of caseTextEntries(english)) {
        const value = translated.get(path) ?? '';
        expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
        expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
      }
    });

    it('has no blank or build-breaking prose', () => {
      for (const [path, value] of caseTranslationEntries(theNightRoundEs)) {
        expect(value.trim(), `${path} is blank`).not.toBe('');
        expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
      }
    });
  });
});
