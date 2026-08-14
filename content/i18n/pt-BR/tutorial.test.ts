import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { tutorialPtBr } from './tutorial';

/**
 * The Brazilian Portuguese tutorial, checked on the things a player reasons over.
 *
 * Deliberately not routed through CASE_TRANSLATIONS. The orchestrator registers
 * translations, several packs are in flight at once, and a translation that only
 * starts being checked on the day somebody edits a registry is a translation
 * nobody checked. So the object is imported and applied directly, and the generic
 * contract is re-run here against it — cheap, because it calls the same exported
 * functions caseText.test.ts does.
 *
 * The rest is what no generic test can ever see. This case states every one of
 * its times in words — `três e dez`, not 03:10 — so a line reading `três e meia`
 * leaves every id, number and paragraph check green and the case unsolvable by
 * reading, which is the only way anybody solves it.
 *
 * Deliberately brittle. Rewording one of these lines should break a test, because
 * rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('tutorial')!;
const script = applyCaseText(english, tutorialPtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

const clock = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

/* --------------------------------------------- the contract, checked up front */

describe('Os Fornos (pt-BR) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(tutorialPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, tutorialPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(tutorialPtBr)];

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

/* ------------------------------------------------------------------ the times */

describe('Os Fornos (pt-BR) — the times', () => {
  /**
   * Every clock time the case turns on, in the message that states it. Roza puts
   * herself on the ovens 03:00–04:00 and Ivy puts her on the square at 03:20;
   * that pair is the whole tutorial. The near-misses need their times too, or
   * they stop being near.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      t3: ['duas da manhã', 'entrega das três'], // ovens until the three o clock drop
      r4: ['duas e vinte', 'duas e meia'], // the garage run, 02:20–02:45
      r5: ['entre três e quatro'], // the alibi she gives twice
      r6: ['três e dez', 'meia hora'], // the smoke break, 03:10–03:40
      iv2: ['às cinco'],
      iv4: ['das tres', 'depois das quatro'], // the extractor, 03:00–04:00
      iv5: ['três e dez'], // the near-miss put to Ivy in the player's voice
      iv7: ['as tres e vinte'], // the sighting that breaks her
      iv8: ['entre três e quatro'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The confession has to name the same minute Roza's own account named, or the
    // player is reading two different stories about one cigarette.
    expect(script.confrontation?.confession).toContain('três e dez');
    expect(script.contradictions[0]?.revelation).toContain('três e vinte');
    expect(script.briefing?.opening).toContain('quatro e dez');

    // And the press has to name the minute Ivy named, or the endgame stops
    // matching the evidence the player pinned to get there.
    const press = (id: string) => script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
    expect(press('b-square')).toContain('três e vinte');
    expect(press('b-square')).toContain('entre três e quatro');
  });

  /**
   * Nobody in this case writes a clock in digits. Every time is spoken, and the
   * only digits in the whole pack are Tom's `2` at 02:03 and the six claim chips.
   * A translator tidying the village into digits would make the chips stop being
   * the one precise thing on the screen.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['t2']);
    expect(body('t2')).toContain('2');
  });
});

/* ------------------------------------------------------------ what it teaches */

describe('Os Fornos (pt-BR) — the lesson', () => {
  /**
   * The lesson a tutorial usually skips, taught inside the fiction so a player who
   * never pins the pair still meets the rule. cases/tutorial.test.ts asserts the
   * English of this; if the Portuguese drops it, Brazilian players learn nothing
   * about nested places and read the refusal as a broken board.
   */
  it('has Ivy give the nested-place answer in her own words', () => {
    expect(body('iv6')).toContain('o patio e a padaria');
    // And the player has to have asked the question that provokes it.
    expect(body('iv5')).toContain('não saiu da padaria');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('t4')).toContain('contorno'); // the corner, from Tom
    expect(body('t4')).toContain('três anos');
    expect(body('iv10')).toContain('se entrega'); // handing yourself in, from Ivy
    expect(body('iv10')).toContain('roza');
  });

  /** Roza names Ivy, which is the only reason Ivy's thread appears at all. */
  it('still names Ivy in the message that finds her', () => {
    expect(body('r8')).toContain('Ivy');
  });

  /**
   * The tutorial is free and carries none of the campaign arc. A name-drop here
   * would spoil Pack 1 for a player who has not started it, and `Keeper` in
   * particular is the one word the whole arc is carried by.
   */
  it('carries none of the arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|listener|número desconhecido|unknown number/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('Os Fornos (pt-BR) — the voices', () => {
  const TOM = ['t1', 't3', 't4', 't6', 't7'];
  const ROZA = ['r1', 'r2', 'r4', 'r5', 'r6', 'r8'];
  const IVY = ['iv1', 'iv3', 'iv4', 'iv6', 'iv7', 'iv9', 'iv10'];
  const YOU = ['t2', 't5', 't8', 'r3', 'r7', 'iv2', 'iv5', 'iv8'];

  /** Tom and Roza write like adults with a pen: capitals, and they finish. */
  it('keeps Tom and Roza writing in sentences', () => {
    for (const id of [...TOM, ...ROZA]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // Roza learned the language as an adult and is proud of it, so she gets none
    // of the clipping the other three use.
    for (const id of ROZA) {
      expect(body(id), `${id} has picked up slang Roza would not use`).not.toMatch(
        /\b(vc|pq|tá|tô|pra|q)\b/,
      );
    }
  });

  /**
   * Ivy is nineteen and types like it: lowercase, accents dropped entirely, and
   * she never lands a full stop at the end. The dropped accents are the whole
   * distance between her and the player, who types lowercase but spells properly.
   */
  it('keeps Ivy nineteen', () => {
    for (const id of IVY) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown an accent Ivy would not type`).not.toMatch(
        /[áàâãéêíóôõúüç]/,
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // The two messages she is frightened to send, and the sign-off she puts on
    // exactly those two. The English has an `x` in the same two places.
    expect(body('iv1').endsWith('bjs')).toBe(true);
    expect(body('iv10').endsWith('bjs')).toBe(true);
    expect(body('iv3').endsWith('bjs')).toBe(false);
  });

  /** The player is thumbing a phone in the dark: lowercase, short, unfinished. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // But they spell properly, which Ivy does not. If the player loses their
    // accents the two of them collapse into one voice.
    expect(body('iv2')).toContain('você');
    expect(body('iv5')).toContain('três');
  });

  /**
   * The player's gender is never stated anywhere in this case, and Portuguese
   * makes that harder than Spanish. `meu bem` is the one endearment a father has
   * for a grown child that inflects for nothing — filho, querido and meu velho
   * all pick a gender for a player who has not got one.
   */
  it('never assigns the player a gender', () => {
    expect(body('t3')).toContain('meu bem');
    const addressed = [
      ...script.threads.flatMap((t) => t.messages).map((m) => m.body),
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.briefing?.opening ?? '',
      script.solution.epilogue,
    ].join('\n');
    expect(addressed).not.toMatch(/\b(filho|filha|querido|querida|bem-vind[oa]|sozinh[oa])\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('Os Fornos (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the one that is a name', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('bakery')).toBe('Vardy’s'); // a business, so it stays
    expect(place('ovens')).toBe('os fornos');
    expect(place('yard')).toBe('o pátio dos fundos');
    expect(place('square')).toBe('a praça do mercado');
    expect(place('station')).toBe('o posto do contorno');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('tom')).toBe('Pai');
    expect(character('roza')).toBe('Roza');
    expect(character('ivy')).toBe('Ivy');
  });

  /**
   * A chip and a sentence have to use the same words or they are two things to a
   * player. The ovens matter most: `nos fornos` on Roza's chip against `na praça
   * do mercado` on Ivy's is the only contradiction in the case, and Roza says the
   * words herself twice before Ivy contradicts her.
   */
  it('uses one set of words for a place on the chip and in the prose', () => {
    const label = (id: string) =>
      script.threads
        .flatMap((t) => t.messages)
        .flatMap((m) => m.claims ?? [])
        .find((c) => c.id === id)?.label ?? '';

    expect(label('c-roza-ovens')).toContain('nos fornos');
    expect(body('r5')).toContain('dos fornos');
    expect(body('iv8')).toContain('dos fornos');

    expect(label('c-roza-square')).toContain('na praça do mercado');
    expect(label('c-roza-station')).toContain('no posto do contorno');
    expect(body('r4')).toContain('no posto do contorno');
    expect(label('c-tom-yard')).toContain('no pátio dos fundos');
    expect(script.briefing?.opening).toContain('no pátio dos fundos');
  });

  /**
   * One word for the road, in all four places it appears. It is the road the
   * garage stands on and the road Peter Osei died on, and the player is meant to
   * hear that those are the same road.
   */
  it('uses one word for the bypass everywhere it appears', () => {
    expect(body('t4')).toContain('do contorno'); // Tom, the corner with the flowers
    expect(body('r4')).toContain('do contorno'); // Roza, the milk run
    expect(script.motives[0]?.summary).toContain('no contorno');
    expect(script.solution.epilogue).toContain('do contorno');
  });
});
