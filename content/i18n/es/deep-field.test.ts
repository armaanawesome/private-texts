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
import { deepFieldEs } from './deep-field';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The Spanish Deep Field, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS. Registration is the coordinator's job and several packs are
 * in flight at once, so a translation that only starts being checked on the day
 * somebody edits a registry is a translation nobody checked. The generic
 * contract is re-run here against the localised script — cheap, because it calls
 * the same exported functions caseText.test.ts does.
 *
 * The rest is what no generic test can ever see. This pack states nearly every
 * time in words — `quarter to ten`, not 21:45 — and a Spanish line reading `las
 * diez y media` there leaves every id, number and paragraph check green and the
 * case unsolvable by reading, which is the only way anybody solves it. The two
 * player-gender rephrases are pinned for the same reason: the literal
 * translation picks a gender and nothing else in the build would notice.
 *
 * Deliberately brittle. Rewording one of these lines should break a test,
 * because rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('deep-field')!;
const script = applyCaseText(english, deepFieldEs);

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
const allProse = [...caseTranslationEntries(deepFieldEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('Campo profundo (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(deepFieldEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, deepFieldEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(deepFieldEs)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has
      // broken this build twice. The curly one is the house character.
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

describe('Campo profundo (es) — the times', () => {
  /**
   * Every time the case turns on, in the message that states it.
   *
   * Mal puts himself two hundred metres away from a quarter to ten until eleven
   * (w4). Theo has him in the corridor at ten past (w6) and the camera has a
   * sleeve at the hooks at twenty two eleven (v2). That trio is the case. The
   * log converting from 21:45 to a quarter to one (p3) is the teaching move —
   * it is why the alibi looked like an alibi for a fortnight.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      w1: ['02:10'], // found, station time
      w4: ['las diez menos cuarto', 'las once'], // the alibi, 21:45–23:00
      w6: ['las diez y diez'], // Theo puts him in the corridor, 22:10
      h2: ['las nueve', 'las once'], // the mess hatch, 21:00–23:00
      h4: ['las diez y cuarto'], // Laura through the porch
      n1: ['Las dos diez'], // Erik finds her
      n4: ['las diez menos diez', 'las diez y media'], // the ship call, 21:50–22:30
      p3: ['21:45', 'la una menos cuarto de la madrugada'], // the conversion
      p6: ['22:35', '22:44'], // card access
      p9: ['las nueve y media', 'medianoche'], // Maria, 21:30–24:00
      v2: ['las veintidós once'], // the camera, spoken
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('las dos de la mañana');

    // The same minutes have to survive from the message to the chip to the
    // revelation to the press, or the player is reading four different stories.
    expect(revelation('x-mal-block')).toContain('las diez menos cuarto');
    expect(revelation('x-mal-block')).toContain('las diez y diez');
    expect(press('f-block')).toContain('las diez menos cuarto');
    expect(press('f-block')).toContain('las diez y diez');

    for (const text of [revelation('x-mal-porch'), press('f-porch')]) {
      expect(text).toContain('22:11');
    }
    for (const text of [revelation('x-mal-surgery'), press('f-surgery')]) {
      expect(text).toContain('22:35');
      expect(text).toContain('22:44');
    }
    expect(chip('c-mal-surgery')).toContain('22:35');
    expect(chip('c-mal-log')).toContain('00:45');
  });

  /**
   * The split that makes the case work.
   *
   * Only the machines write digits, and only Maria quotes them: the found time
   * (w1), the log entry (p3) and the card reader (p6). Everybody else speaks a
   * time in words, Theo included — he reads the camera clock aloud as `las
   * veintidós once` rather than 22:11, exactly as the English has him say
   * `twenty two eleven`. If a translator tidies the station into digits, the
   * records stop being distinguishable from the people who are remembering, and
   * the player has no reason to trust one over the other.
   */
  it('lets only the quoted machines write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['w1', 'p3', 'p6']);
    expect(digitTimes(body('v2'))).toEqual([]);
    expect(digitTimes(body('n1'))).toEqual([]);
  });
});

/* ----------------------------------------------------------------- the clocks */

describe('Campo profundo (es) — the clocks', () => {
  /**
   * One Spanish name per record. The case is one machine record kept in a
   * different clock from the people reading it, so a second word for the log
   * reads as a second document and the deduction stops being available.
   */
  it('gives the log, the card reader and the camera one name each', () => {
    for (const text of [body('w5'), body('p2'), body('n6'), chip('c-mal-log')]) {
      expect(text).toContain('registro de la plataforma');
    }
    for (const text of [body('p6'), chip('c-mal-surgery')]) {
      expect(text).toContain('ontrol de acceso');
    }
    for (const text of [body('v1'), chip('c-mal-coldporch'), revelation('x-mal-porch')]) {
      expect(text).toContain('ámara');
    }

    // No second name for the log anywhere.
    for (const rival of [/\bel diario\b/, /\bel parte de la plataforma\b/, /\bla bitácora\b/]) {
      expect(allProse, `a second name for the log: ${rival}`).not.toMatch(rival);
    }
  });

  /** The two sentences that are the whole deduction. */
  it('keeps the conversion sayable in one place', () => {
    expect(body('p3')).toContain('La hora de la estación es UTC más tres');
    expect(body('p2')).toContain('escribe en UTC');
    expect(body('n6')).toContain('qué reloj lleva');
    expect(body('w1')).toContain('hora de la estación');
    expect(script.briefing?.opening).toContain('La hora de la estación para las personas');
    // And the line that tells the player what the log is not.
    expect(body('p4')).toContain('no es su coartada');
  });
});

/* ------------------------------------------------------------------ the names */

describe('Campo profundo (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('station')).toBe('la estación');
    expect(place('block')).toBe('el módulo de dormitorios');
    expect(place('mess')).toBe('el comedor');
    expect(place('surgery')).toBe('la consulta');
    expect(place('coldporch')).toBe('el vestíbulo frío');
    expect(place('outside')).toBe('fuera');
    expect(place('telescope')).toBe('la plataforma de instrumentos');
    expect(place('metmast')).toBe('la torre meteorológica');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('orla')).toBe('Laura');
    expect(character('mal')).toBe('Mal');
    expect(character('rune')).toBe('Erik');
    expect(character('pilar')).toBe('Maria');
    expect(character('theo')).toBe('Theo');
  });

  /**
   * Every place name has to be a word the case actually says. A place called
   * `el exterior` in a pack whose prose says `fuera` is a chip that matches no
   * sentence, and matching a chip to a sentence is the move the whole game is
   * made of. This caught the first draft of this file.
   */
  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(deepFieldEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const bare = p.name.replace(/^(el|la|los|las) /, '').toLowerCase();
      expect(prose.includes(bare), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * A chip and a sentence have to use the same words or they are two things to
   * a player. The block is the one that matters: Theo's sighting against Mal's
   * platform alibi is contradiction one.
   */
  it('uses one word for the block and the porch on the chip and in the prose', () => {
    expect(chip('c-mal-block')).toContain('en el módulo de dormitorios');
    expect(chip('c-pilar-block')).toContain('en el módulo de dormitorios');
    expect(body('w6')).toContain('en el módulo');
    expect(body('p9')).toContain('en el módulo');
    expect(revelation('x-mal-block')).toContain('pasillo de los dormitorios');
    expect(press('f-block')).toContain('pasillo de los dormitorios');

    expect(chip('c-orla-coldporch')).toContain('en el vestíbulo frío');
    expect(chip('c-mal-coldporch')).toContain('en el vestíbulo frío');
    expect(body('h4')).toContain('el vestíbulo');
    expect(body('v1')).toContain('en el vestíbulo');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('Campo profundo (es) — the player has no gender', () => {
  /**
   * Two lines in this pack would have forced one, and both were rebuilt rather
   * than resolved. Nothing else in the build would notice if either were
   * reverted to the literal translation, which is the entire reason this test
   * exists.
   */
  it('keeps the confrontation opening from naming the player a man', () => {
    const opening = script.confrontation?.opening ?? '';
    expect(opening).toContain('alguien en Cambridge');
    // The English says `a man in Cambridge`. Following it would gender the
    // player, who has no gender anywhere else in fifteen packs.
    expect(opening).not.toMatch(/un hombre en Cambridge/);
  });

  it('keeps the third deflection from agreeing with the player', () => {
    const deflections = script.confrontation?.deflections ?? [];
    expect(deflections[2]).toContain('no tienes ninguna duda');
    // `muy seguro` / `muy segura` is the literal translation and picks a gender.
    expect(deflections[2]).not.toMatch(/segur[oa]\b/);
    // The distance is the sting and it survives the rebuild.
    expect(deflections[2]).toContain('once mil millas');
  });

  it('describes the player only by what they do, in the briefing', () => {
    const opening = script.briefing?.opening ?? '';
    expect(opening).toContain('su contacto en Cambridge');
    // Feminine by `persona`, not by the reader — this one is safe as written.
    expect(opening).toContain('la última persona a la que escribió');
  });

  /** The press lines address a man who is one, and never reach back at the player. */
  it('leaves the press lines free of agreement with whoever is holding the phone', () => {
    expect(press('f-block')).toContain('Te situaste');
    expect(press('f-block')).toContain('te reconoció');
    expect(press('f-surgery')).toContain('no has tenido nunca');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Campo profundo (es) — the voices', () => {
  const LAURA = ['o1', 'o3', 'o4', 'o6', 'o7', 'o9', 'o10', 'o11'];
  const THEO = ['w3', 'w6', 'h1', 'h2', 'h4', 'h5', 'h7', 'h8', 'v1', 'v2', 'v3', 'v5'];
  const MARIA = ['w1', 'w2', 'w9', 'p1', 'p2', 'p3', 'p4', 'p6', 'p7', 'p8', 'p9'];
  const MAL = ['w4', 'w5', 'w7', 'w8'];
  const ERIK = ['n1', 'n2', 'n4', 'n5', 'n6'];
  const YOU = ['o2', 'o5', 'o8', 'h3', 'h6', 'n3', 'p5', 'v4'];

  /** Laura types fast at the end of a shift: lowercase in, and never finishes. */
  it('keeps Laura opening lowercase and never landing the full stop', () => {
    for (const id of LAURA) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a tidy full stop`).toBe(false);
    }
    // She is a doctor and the nouns stay clinical even at that hour.
    expect(body('o4')).toContain('fibrilación auricular');
    expect(body('o3')).toContain('resultado de cribado');
  });

  /**
   * Theo the same, with one deliberate exception and one deliberate rule.
   *
   * The exception: h7 opens with a capitalised Erik. The rule: he capitalises a
   * person when he is talking *about* them and not when he is talking *to*
   * them, which is why Mal is `mal` in the group chat and `Mal` everywhere
   * else. That distance is the character.
   */
  it('keeps Theo lowercase, unfinished, and capitalising only the absent', () => {
    for (const id of THEO) {
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of THEO.filter((x) => x !== 'h7')) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
    }
    expect(body('h7')[0]).toBe('E');

    expect(body('w6')).toContain('mal te vi'); // to his face, lowercase
    expect(body('h5')).toContain('Mal'); // behind his back, capital
    expect(body('v3')).toContain('Mal');
    expect(body('h8')).toContain('Erik');
  });

  /** Maria and Mal write like adults with a pen: capitals, and they finish. */
  it('keeps Maria and Mal writing in sentences', () => {
    for (const id of [...MARIA, ...MAL]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Erik cannot read well and sends voice notes, so every line of his is a
   * transcription — and therefore the cleanest prose in the pack. That is the
   * joke and it only lands if the tag survives and the sentences stay finished.
   */
  it('keeps every one of Erik s messages a voice note', () => {
    const speaks = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.senderId === 'rune');
    expect(speaks.length).toBe(ERIK.length);
    for (const m of speaks) {
      expect(m.body, `${m.id} is not a voice note`).toMatch(/^\[nota de voz, \d+:\d+\]/);
      expect(m.body.endsWith('.'), `${m.id} does not finish its sentence`).toBe(true);
    }
    expect(body('n2')).toContain('no leo bien');
  });

  /**
   * The player is thumbing a phone: lowercase, short, no opening ¿, and they do
   * not capitalise anybody. That last one is the difference between them and
   * Theo, who types just as fast and does.
   */
  it('keeps the player terse and uncapitalised', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('h3')).toContain('laura');
    expect(body('h6')).toContain('erik');
    expect(body('n3')).toContain('mal');
  });
});

/* -------------------------------------------------------------------- the arc */

describe('Campo profundo (es) — the arc', () => {
  /** Pack 4 is standalone. The silence is what makes Pack 6 land. */
  it('carries no arc content, and nothing was added to fill the silence', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
    expect(allProse).not.toMatch(/número desconocido/i);
    expect(allProse).not.toMatch(/telefone/i);
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('o4')).toContain('fibrilación auricular'); // Laura names the finding
    expect(body('o6')).toContain('lo voy a presentar por la mañana'); // and that she will file it
    expect(body('p8')).toContain('diecinueve campañas'); // Maria supplies why it kills him
    expect(script.motives[0]?.summary).toContain('evacuación médica');
    expect(script.motives[0]?.summary).toContain('vigésima');
  });

  /**
   * Erik is the red herring and has to be provably innocent, humanely. Mal puts
   * him at the one place nobody can see; the ship's radio room is what clears
   * him, and the case must not require proving it.
   */
  it('clears the man who never types, in words the player can match', () => {
    expect(chip('c-rune-outside')).toContain('torre meteorológica');
    expect(chip('c-rune-radio')).toContain('a la radio con el barco');
    expect(body('n4')).toContain('Shackleton');
    expect(body('h7')).toContain('Shackleton');
    expect(revelation('x-rune-mast')).toContain('el único sitio de esa estación que no ve nadie');
    expect(script.solution.requiredContradictionIds).not.toContain('x-rune-mast');
  });

  /** Theo names Erik, which is the only reason Erik s thread opens. */
  it('still names Erik in the message that finds him', () => {
    expect(body('h8')).toContain('Erik');
  });
});
