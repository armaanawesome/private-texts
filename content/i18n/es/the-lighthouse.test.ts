import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theLighthouseEs } from './the-lighthouse';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The Spanish Lighthouse, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically. This file is deliberately not routed through
 * CASE_TRANSLATIONS: the orchestrator registers translations, several packs are
 * in flight at once, and a translation that only starts being checked on the day
 * somebody edits a registry is a translation nobody checked. So the object is
 * imported and applied directly, and the generic contract is re-run here against
 * it — cheap, because it calls the same exported functions caseText.test.ts does.
 *
 * The rest is what no generic test can ever see. This case states nearly all of
 * its times in words — `twenty to ten`, not 21:40 — and a Spanish line reading
 * `las diez y media` there leaves every id, number and paragraph check green and
 * the case unsolvable by reading, which is the only way anybody solves it.
 *
 * Deliberately brittle. Rewording one of these lines should break a test,
 * because rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-lighthouse')!;
const script = applyCaseText(english, theLighthouseEs);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

/* --------------------------------------------- the contract, checked up front */

describe('El faro (es) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLighthouseEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLighthouseEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLighthouseEs)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has broken
      // this build twice. The curly one is the house character.
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
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

  it('gives every claim chip the times the engine actually holds', () => {
    for (const t of script.threads) {
      for (const m of t.messages) {
        for (const c of m.claims ?? []) {
          const times = digitTimes(c.label);
          if (times.length === 0) continue;
          const end = c.window.end % 1440 === 0 ? '24:00' : clock(c.window.end);
          const acceptable = [[clock(c.window.start)], [clock(c.window.start), end]];
          expect(
            acceptable.some((form) => form.join('|') === times.join('|')),
            `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
              `${clock(c.window.start)}–${clock(c.window.end)}`,
          ).toBe(true);
        }
      }
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------ the times */

describe('El faro (es) — the times', () => {
  /**
   * Every time the case turns on, in the message that states it.
   *
   * Two chains have to survive intact or the case cannot be reasoned about.
   * Mairi puts herself in the café from half eight until eleven (m6) and Fiona
   * puts her on the cliff path at 21:47 (e10) — that pair is contradiction two.
   * Mairi turns at the gate (n3) and Callum puts her at the door at ten past ten
   * (k6) — that pair is contradiction three, and it is the one that convicts her.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g10: ['a las ocho'], // the last boat in, 19:00–20:00
      g12: ['las diez menos veinte', 'las diez y cuarto'], // the slipway, 21:40–22:15
      m6: ['las ocho y media', 'las once'], // the café alibi she gives twice
      m8: ['las nueve'], // Callum put in the café with her, 21:00–23:00
      m11: ['Las nueve y cuarto'], // the player in the café, 21:05–21:30
      m13: ['las once menos veinte'], // cashing up, 22:35–23:00
      m15: ['pasadas las once'], // Fiona's light on, 23:00–24:00
      e5: ['las siete', 'las nueve y media'], // the cottage, 19:00–21:30
      e6: ['una media hora'], // the lull that puts her on the path
      k5: ['las diez y cuarto'], // finished the line, then up the back way
      k6: ['las diez y diez'], // the door. the sighting that convicts her
      k9: ['pasadas las once'], // home, and the coat into the machine
      n9: ['Las nueve y media'], // the call from the Keeper
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The proofs and the endgame have to name the same minutes the messages did,
    // or the player is reading two different stories about one night.
    const revelation = (id: string) =>
      script.contradictions.find((x) => x.id === id)?.revelation ?? '';
    expect(revelation('x-mairi-path')).toContain('las ocho y media hasta las once');
    expect(revelation('x-mairi-door')).toContain('las diez y diez');
    expect(revelation('x-papers-lie')).toContain('las nueve y media');

    const press = (id: string) =>
      script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
    expect(press('b-path')).toContain('las ocho y media hasta las once');
    expect(press('b-door')).toContain('las diez y diez');
    expect(script.confrontation?.confession).toContain('las nueve y media de la noche');
  });

  /**
   * The split that makes the case work.
   *
   * Fiona is the only person in Ardnoe who writes a clock down, and that is
   * exactly why she is believed over a woman with forty years of goodwill. If a
   * translator tidies the village into digits — Callum saying 22:10 instead of
   * `las diez y diez` — everyone sounds equally precise and the player has no
   * reason to prefer the log.
   */
  it('lets only Fiona write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['e7', 'e10']);
    expect(body('e7')).toContain('21:40');
    expect(body('e7')).toContain('22:00');
    expect(body('e10')).toContain('21:47');
  });
});

/* ------------------------------------------------------------ the arc clue */

describe('El faro (es) — the arc clue', () => {
  /**
   * The first thing the Listener ever leaves behind, and it has to stay legible
   * fourteen cases later.
   *
   * This test used to require `el Farero`, on the reasoning that the caller
   * picked the dead woman's title and so the title should be translated. That
   * was wrong twice over. `Farero` means the keeper of a *lighthouse*, and he
   * gives this name in a care home, a rowing club, a canal and a crisis line;
   * and it pre-empts what the finale actually pays off, which is eleven box
   * files in a wardrobe, one per person, and `I have kept all of them`. Pack 1
   * only looks like it is about a lighthouse.
   *
   * The word stays English in every locale now, enforced across all of them by
   * `content/i18n/arcAlias.test.ts`. This assertion stays anyway, pinned to the
   * two places a Spanish player meets it first.
   */
  it('keeps the Keeper a name a Spanish player can carry forward', () => {
    expect(body('n9')).toContain('se hacía llamar el Keeper');
    const revelation = script.contradictions.find((x) => x.id === 'x-papers-lie')?.revelation ?? '';
    expect(revelation).toContain('el Keeper');
    // And the lie itself: the auditors never had the papers, so the call was not
    // a mistake. Without this sentence the contradiction proves nothing chilling.
    expect(revelation).toContain('Los auditores nunca tuvieron esos papeles');
    expect(revelation).toContain('no fue una equivocación');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('r7')).toContain('dos años de cuentas'); // Ruth names the hole
    expect(body('r7')).toContain('agujero');
    expect(body('k11')).toContain('el dinero era mío'); // Callum says whose it was
    expect(body('k11')).toContain('las cuentas de ruth');
  });

  /**
   * The player finds Mairi by matching a pronoun to a job. Ruth says "she" is
   * coming tonight; Mairi says she keeps the books. If the two lines stop using
   * the same words the deduction stops being available in Spanish.
   */
  it('keeps the she-who-keeps-the-books step readable', () => {
    expect(body('r10')).toContain('va a venir a verme esta noche');
    expect(body('m2')).toContain('va a venir a verme esta noche');
    expect(body('m3')).toContain('ella. tú llevas las cuentas');
    expect(body('g18')).toContain('Las cuentas del Patronato las llevo yo');
  });
});

/* --------------------------------------------------------------- the voices */

describe('El faro (es) — the voices', () => {
  const RUTH = ['r1', 'r3', 'r4', 'r6', 'r7', 'r9', 'r10', 'r12', 'r13'];
  const CALLUM = [
    'g3', 'g8', 'g10', 'g12', 'g13', 'g15',
    'k1', 'k2', 'k4', 'k5', 'k6', 'k7', 'k9', 'k10', 'k11', 'k12',
  ];
  const MAIRI = [
    'g1', 'g2', 'g7', 'g14', 'g16', 'g18', 'g20',
    'm1', 'm4', 'm5', 'm6', 'm8', 'm10', 'm11', 'm13', 'm14', 'm15', 'm16',
    'n1', 'n2', 'n3', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11',
  ];
  const FIONA = ['g4', 'g9', 'g17', 'e1', 'e2', 'e4', 'e5', 'e6', 'e7', 'e9', 'e10', 'e12', 'e13', 'e14'];
  const YOU = [
    'r2', 'r5', 'r8', 'r11', 'r14', 'r15',
    'g5', 'g6', 'g11', 'g19',
    'm2', 'm3', 'm7', 'm9', 'm12',
    'e3', 'e8', 'e11', 'k3', 'k8', 'n4',
  ];

  /** Ruth: lowercase, and she never lands a full stop at the end of a message. */
  it('keeps Ruth typing the way a woman alone in a tower types', () => {
    for (const id of RUTH) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // But she capitalises the people. That is the whole distance between her and
    // her neighbour's son, who types the same way and does not.
    expect(body('r3')).toContain('Callum');
    expect(body('r3')).toContain('Mairi');
  });

  /** Callum: lowercase all the way down, including the names. */
  it('keeps Callum blunt and uncapitalised', () => {
    for (const id of CALLUM) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('k11')).not.toContain('Ruth');
  });

  /** Mairi and Fiona write like adults with a pen: capitals, and they finish. */
  it('keeps Mairi and Fiona writing in sentences', () => {
    for (const id of [...MAIRI, ...FIONA]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // Mairi asks a question with a full stop on it. She is not really asking.
    expect(body('m11')).toContain('Te acuerdas.');
  });

  /** The player is thumbing a phone: lowercase, short, and never an opening ¿. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toContain('¿');
    }
    // Except once. The only shout in the case, and the English shouts here too.
    expect(body('r11')).toContain('QUIÉN');
  });
});

/* ---------------------------------------------------------------- the names */

describe('El faro (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('point')).toBe('Punta Ardnoe');
    expect(place('lighthouse')).toBe('el faro');
    expect(place('path')).toBe('el camino del acantilado');
    expect(place('cafe')).toBe('el café');
    expect(place('slip')).toBe('la rampa');
    expect(place('cottage')).toBe('la casita');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('ruth')).toBe('Ruth');
    expect(character('mairi')).toBe('Mairi');
    expect(character('callum')).toBe('Callum');
    expect(character('esme')).toBe('Fiona');
  });

  /**
   * A chip and a sentence have to use the same words or they are two things to a
   * player. The slipway is the one that matters most: `la rampa` on Callum's chip
   * against `el café` on Mairi's is contradiction one, and he says it himself in
   * the group before she contradicts him.
   */
  it('uses one word for the slipway on the chip and in the prose', () => {
    const label = (id: string) =>
      script.threads
        .flatMap((t) => t.messages)
        .flatMap((m) => m.claims ?? [])
        .find((c) => c.id === id)?.label ?? '';
    expect(label('c-callum-slip')).toContain('en la rampa');
    expect(body('g12')).toContain('en la rampa');
    expect(body('g8')).toContain('en la rampa');
    expect(body('k2')).toContain('en la rampa');
    expect(label('c-mairi-door')).toContain('en la puerta del faro');
    expect(body('k6')).toContain('en la puerta del faro');
  });
});
