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
import { sundayServicePtBr } from './sunday-service';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The Brazilian Portuguese Sunday Service, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText rather than routed through
 * CASE_TRANSLATIONS: an unregistered pack is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". The generic contract is re-run here.
 *
 * The rest is what no generic test can see. This case is a forged document against
 * a living memory, so it turns on an entry number, a year, and one old man who
 * refuses to say what anything means.
 */
const english = getCase('sunday-service')!;
const script = applyCaseText(english, sundayServicePtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const claimOf = (id: string) =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id);
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
};
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

/** Everything the player reads, minus the bare entity names — those are the subject. */
const spokenOf = (s: typeof script): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('O Culto de Domingo (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(sundayServicePtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, sundayServicePtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(sundayServicePtBr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const proseEntries = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of proseEntries) {
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
   * A chip may name the window it covers, or a single moment inside it.
   *
   * The second form is not sloppiness: where two claims share overlapping windows
   * because they are an exclusive group, the window is machinery the engine needs
   * to see the collision, and each label names what was *asserted* instead. What
   * the rule still catches is a time that falls outside the window altogether,
   * which is the edit that makes a case unreasonable while every other test stays
   * green.
   */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const t of script.threads) {
      for (const m of t.messages) {
        for (const c of m.claims ?? []) {
          const times = digitTimes(c.label);
          if (times.length === 0) continue;

          const start = clock(c.window.start);
          const end = c.window.end % 1440 === 0 ? '24:00' : clock(c.window.end);
          const namesTheWindow =
            times.join('|') === start || times.join('|') === [start, end].join('|');
          const namesAMomentInside =
            times.length === 1 &&
            toMinutes(times[0] ?? '') >= c.window.start % 1440 &&
            toMinutes(times[0] ?? '') <= c.window.end % 1440;

          expect(
            namesTheWindow || namesAMomentInside,
            `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${end}`,
          ).toBe(true);
        }
      }
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* -------------------------------------------------------------- the register */

describe('O Culto de Domingo (pt-BR) — the forged entry', () => {
  /**
   * The two register claims are an exclusive group, and their windows overlap
   * rather than match — 10:00–12:00 sits inside 09:00–13:00. The overlap is the
   * thing that cannot move: pull either window off the other and the engine stops
   * seeing the collision, and the case becomes unsolvable while every other test
   * stays green. Neither label names a window, because each names what was
   * asserted, and that pair of assertions is the contradiction.
   */
  it('keeps the two register claims overlapping in both languages', () => {
    const signed = claimOf('c-cordy-signed-out');
    const never = claimOf('c-cordy-never-register');
    expect(signed, 'c-cordy-signed-out has gone').toBeDefined();
    expect(never, 'c-cordy-never-register has gone').toBeDefined();

    expect(clock(signed!.window.start)).toBe('10:00');
    expect(clock(signed!.window.end)).toBe('12:00');
    expect(clock(never!.window.start)).toBe('09:00');
    expect(clock(never!.window.end)).toBe('13:00');

    // Overlap, which is what an exclusive group needs.
    expect(signed!.window.start).toBeLessThan(never!.window.end);
    expect(never!.window.start).toBeLessThan(signed!.window.end);

    // And the windows are the English windows, untouched by translation.
    const there = english.threads
      .flatMap((t) => t.messages)
      .flatMap((m) => m.claims ?? []);
    const theirSigned = there.find((c) => c.id === 'c-cordy-signed-out');
    expect(signed!.window.start).toBe(theirSigned?.window.start);
    expect(signed!.window.end).toBe(theirSigned?.window.end);

    // Each label names the assertion, not the window.
    expect(label('c-cordy-signed-out')).toContain('11 de março');
    expect(label('c-cordy-never-register')).toContain('nunca mexeu nos livros');
    expect(digitTimes(label('c-cordy-signed-out'))).toEqual([]);
  });

  /**
   * The entry number and the year are what the player holds against Jack. They
   * recur in Avril's question, the motive, the press and the epilogue, and if any
   * one of them drifts the arithmetic stops being checkable.
   */
  it('keeps the entry number and the year everywhere they appear', () => {
    expect(body('a3')).toContain('114');
    expect(body('a3')).toContain('115');
    expect(body('a11')).toContain('114');
    expect(script.motives[0]?.summary).toContain('114');
    expect(pressOf('v-why')).toContain('114');
    expect(script.solution.epilogue).toContain('114');

    for (const text of [body('a4'), body('a8'), body('j2'), pressOf('v-why')]) {
      expect(text).toContain('1974');
    }
    // Jack is certain about the year because of his father, and that is the anchor.
    expect(body('j4')).toContain('1975');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('a8')).toContain('não havia telhado'); // Jack, via Avril
    expect(body('i9')).toContain('quarenta anos'); // Grace, on what it rests on
    expect(body('i9')).toContain('placa');
    expect(script.motives[0]?.summary).toContain('quatro linhas');
  });

  /** Pack 8 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Culto de Domingo (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p1: ['nove e meia'], // Grace finds her
      p4: ['desde as sete'], // Denise tuning
      e3: ['oito e dez'], // shut in the tower until Jack lets her out
      e4: ['oito e dez'],
      j7: ['Oito e dez'], // and Jack says the same minute
      j9: ['vinte pras oito'], // Pam goes into the vestry
      i6: ['oito e vinte'], // her car under the yew
      i8: ['desde as sete'], // Avril in there the whole evening
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('nove e meia');

    // Compared lowercased, because these phrases open a sentence in some of the
    // places they appear and casing is where the match breaks, not the fact.
    const said = (text: string, fragment: string) =>
      expect(text.toLowerCase(), `lost "${fragment}"`).toContain(fragment.toLowerCase());

    said(revelation('x-cordy-vestry'), 'vinte pras oito');
    said(revelation('x-cordy-vestry'), 'das sete até as nove');
    said(revelation('x-cordy-carpark'), 'oito e vinte');
    said(revelation('x-petra-tower'), 'oito e dez');
    said(pressOf('v-vestry'), 'vinte pras oito');
    said(pressOf('v-carpark'), 'oito e vinte');
  });

  /**
   * Nobody in this parish writes a clock. Every digit in the messages is a year or
   * an entry number — the document — and every time is spoken, which is the split
   * the case is built on.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['a3', 'a4', 'a7', 'a8', 'a11', 'j1', 'j2', 'j4', 'i3']);

    for (const t of script.threads) {
      for (const m of t.messages) {
        expect(digitTimes(m.body), `${m.id} has grown a digit clock`).toEqual([]);
      }
    }
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Culto de Domingo (pt-BR) — the voices', () => {
  const YOU = ['a2', 'a5', 'a9', 'e2', 'e5', 'i5', 'j3', 'j6'];
  const EVERYBODY_ELSE = [
    'a1', 'a3', 'a4', 'a6', 'a7', 'a8', 'a10', 'a11',
    'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7',
    'e1', 'e3', 'e4', 'e6', 'e7', 'e8',
    'j1', 'j2', 'j4', 'j5', 'j7', 'j8', 'j9', 'j10',
    'i1', 'i2', 'i3', 'i4', 'i6', 'i7', 'i8', 'i9',
  ];

  /**
   * This pack needed a different axis from every other one.
   *
   * Every non-player character here writes in complete sentences and lands a full
   * stop — churchwarden, vicar, organist, builder and Pam alike — so casing and
   * punctuation separate nobody, and the usual test would pass while the five of
   * them collapsed into one careful narrator. The axis is what each does with a
   * fact, and that is what is asserted below.
   */
  it('keeps the whole parish writing in sentences, and the player not', () => {
    for (const id of EVERYBODY_ELSE) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });

  it('separates them by what each one does with a fact', () => {
    // Avril states the evidence and stops short of the conclusion.
    expect(body('a3')).toContain('Alguém abriu espaço.');
    // Grace keeps volunteering how new she is, because it is two years and it shows.
    expect(body('i1')).toContain('há dois anos');
    expect(body('p1')).toContain('Prezados');
    // Pam counts years of service at people.
    expect(body('p3')).toContain('Vinte e dois anos ela deu');
    // Denise is not from here and says so plainly.
    expect(body('e1')).toContain('não sou daqui');
    // And Jack refuses to interpret, which is the whole man.
    expect(body('j10')).toContain('Estou dizendo onde ela estava.');
    expect(body('e8')).toContain('em vez de dizer o que aquilo significa');
  });

  /**
   * The player is unmarked. No rephrase was forced in this pack: every line
   * addressed to them runs on verbs — `Você dirige`, `Você está nesta vila`,
   * `Você lida com papel`.
   *
   * Deliberately narrow, per playerNeutral.test.ts: only lines where an agreeing
   * adjective would attach to the PLAYER are swept, because a wider net flags
   * characters describing themselves and a rule that cries wolf gets switched off.
   */
  it('never assigns the player a gender', () => {
    expect(script.briefing?.opening).toContain('Você dirige o arquivo diocesano');
    expect(script.confrontation?.opening).toContain('Você está nesta vila');

    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(cert|segur|cansad|prepar[ae]d|sozinh|sentad|bem-vind)[oa]\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Culto de Domingo (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('church')).toBe('St Ninian’s');
    expect(place('nave')).toBe('a nave');
    expect(place('vestry')).toBe('a sacristia');
    expect(place('tower')).toBe('a torre');
    expect(place('carpark')).toBe('o estacionamento da igreja');
    expect(place('cordyhome')).toBe('a casa da Pam');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('avril')).toBe('Avril');
    expect(character('cordy')).toBe('Pam');
    expect(character('ines')).toBe('Grace');
    expect(character('jack')).toBe('Jack');
    expect(character('petra')).toBe('Denise');
  });

  /**
   * The contraction trap, checked on the RAW name rather than the folded one.
   *
   * caseText.test.ts folds accents and punctuation before comparing, which is how
   * the French `au bar du club` passed its own eye and failed only on the full
   * name. Portuguese contracts too — no, na, do, da — though it keeps the article
   * letter inside the contraction, so `na sacristia` still contains `a sacristia`.
   * Asserting the unfolded string is strictly stronger and fails on exactly the
   * edit that causes the bug.
   *
   * Gated on the places the English actually names, which is what the generic rule
   * does. An unconditional version fails `sunday-service · en`: `Pam’s house` is
   * defined as a place and never spoken in a single sentence of the English, so
   * requiring the Portuguese to say it would be inventing a line the source has
   * not got.
   */
  it('never lets a contracted preposition eat a place name', () => {
    const spoken = spokenOf(script);
    const englishSpoken = fold(spokenOf(english));

    for (const place of script.places) {
      const englishName = fold(english.places.find((p) => p.id === place.id)?.name ?? '');
      if (englishName === '' || !englishSpoken.includes(englishName)) continue;

      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact`,
      ).toBe(true);
    }
  });

  /**
   * The car park is the one that needed the care: the English place is `the church
   * car park` but its own prose only ever says "the car park", so a literal
   * translation risked a chip nobody could match to a sentence. i6 says the full
   * name.
   */
  it('says the full name of the car park somewhere', () => {
    expect(body('i6')).toContain('no estacionamento da igreja');
    expect(label('c-cordy-carpark')).toContain('no estacionamento');
    expect(label('c-ines-carpark')).toContain('no estacionamento');
  });

  it('says its own names for people and places somewhere in the prose', () => {
    const translatedProse = fold(spokenOf(script));
    const englishProse = fold(spokenOf(english));
    const named = [
      ...script.characters
        .filter((c) => c.id !== 'you')
        .map((c) => ({
          id: `character.${c.id}`,
          english: fold(english.characters.find((e) => e.id === c.id)?.name ?? ''),
          rendered: fold(c.name),
        })),
      ...script.places.map((p) => ({
        id: `place.${p.id}`,
        english: fold(english.places.find((e) => e.id === p.id)?.name ?? ''),
        rendered: fold(p.name),
      })),
    ];

    for (const entity of named) {
      if (entity.english === '' || !englishProse.includes(entity.english)) continue;
      expect(
        translatedProse.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  /** Whatever form of each name the English uses, the Portuguese uses too. */
  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Avril Dacre',
      'Pam Hale',
      'Jack Tenby',
      'Denise Voss',
      'St Cuthbert’s',
      'Sowerby',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Jack's thread opens because Denise names him in the message that gates it. */
  it('opens no thread with a stranger', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const messages = script.threads.flatMap((t) => t.messages);
    const senderOf = new Map(messages.map((m) => [m.id, m.senderId]));
    const messageById = new Map(messages.map((m) => [m.id, m]));

    const readBy = (id: string): string => {
      const gate = messageById.get(id);
      if (gate === undefined) return '';
      const thread = script.threads.find((t) => t.id === gate.threadId);
      if (thread === undefined) return '';
      return thread.messages
        .filter((m) => m.sentAt <= gate.sentAt)
        .map((m) => fold(m.body))
        .join('\n');
    };

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;

      const others = thread.participantIds.filter((id) => id !== 'you');
      const names = others.map((id) => nameOf.get(id) ?? '');
      const introduced = gates.some((id) => {
        const seen = readBy(id);
        if (names.some((n) => n !== '' && seen.includes(n))) return true;
        const sender = senderOf.get(id);
        return sender !== undefined && others.includes(sender);
      });
      expect(introduced, `${thread.id} opens with a stranger`).toBe(true);
    }

    expect(body('e8')).toContain('Jack');
  });
});
