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
import { theBothyPtBr } from './the-bothy';

/**
 * The Brazilian Portuguese Bothy, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText rather than routed through
 * CASE_TRANSLATIONS: an unregistered pack is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". The generic contract is re-run here.
 *
 * The rest is what no generic test can see. Nobody in this building knows what
 * time anything happened, only what happened before what, so the case is carried
 * by two spoken times ten minutes apart and by a signature written twice.
 */
const english = getCase('the-bothy')!;
const script = applyCaseText(english, theBothyPtBr);
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

/** Wraps mod 1440, per privatetexts/i18n/clock-wrapping. */
const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const proseOf = (s: typeof script): string => {
  const kept: string[] = [];
  for (const [path, value] of caseTextEntries(s)) {
    if (/^(character|place|object)\./.test(path)) continue;
    kept.push(value);
  }
  return fold(kept.join('\n'));
};

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('O Refugio (pt-BR) - the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theBothyPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theBothyPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theBothyPtBr)];

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
   * A chip may state the window it covers, or a single moment inside it.
   *
   * This started as an exemption. `c-keir-book-late` is labelled `assinou o livro
   * ao chegar as 21:40` and the engine holds 20:00-22:00, and a first draft of
   * this rule read that as a defect in the source, exempted the chip by id, and
   * asserted the mismatch was still there so the exemption could not outlive it.
   *
   * That was the wrong diagnosis, and the giveaway was available without leaving
   * the file: the draft rule fails `the-bothy` in **English** too. When a rule
   * fails the source as well as the translation, the rule is wrong.
   *
   * What is actually there is a pair. `c-keir-book-late` and `c-keir-book-early`
   * share one window on purpose - they are the two halves of an exclusive group,
   * and an exclusive group needs its windows to overlap for the engine to see the
   * collision at all. The window is machinery. Each label names what was
   * *asserted*, `as 21:40` against `ate as 20:00`, and that pair of numbers is the
   * entire contradiction the player is meant to spot. Label the window instead and
   * both chips read 20:00-22:00 and the case stops being solvable by reading.
   *
   * So: a point inside the window is legitimate. The rule still catches the thing
   * that matters, which is a chip stating a time the engine does not cover at all
   * - the single edit that leaves a case unsolvable with the suite green.
   */
  it('gives every claim chip a time the engine actually holds', () => {
    const toMinutes = (hhmm: string): number => {
      const [h, m] = hhmm.split(':').map(Number);
      return (h ?? 0) * 60 + (m ?? 0);
    };

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
        toMinutes(times[0] ?? '') >= c.window.start % 1440 &&
        toMinutes(times[0] ?? '') <= c.window.end % 1440;

      expect(
        spansWindow || pointInside,
        `claim ${c.id} chip says ${times.join('-')} but the engine holds ` +
          `${clock(c.window.start)}-${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  /**
   * The pair above, pinned, because it is the case's spine. If either window
   * moves off the other the exclusive group stops overlapping, the engine stops
   * seeing the collision, and `the-bothy` becomes unsolvable while every other
   * test in this file still passes.
   */
  it('keeps the book pair sharing one window in both languages', () => {
    const englishClaims = english.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? []);
    for (const id of ['c-keir-book-late', 'c-keir-book-early']) {
      const here = claimOf(id);
      const there = englishClaims.find((c) => c.id === id);
      expect(here, `${id} has gone`).toBeDefined();
      expect(clock(here!.window.start)).toBe('20:00');
      expect(clock(here!.window.end)).toBe('22:00');
      expect(here!.window.start).toBe(there?.window.start);
      expect(here!.window.end).toBe(there?.window.end);
    }
    expect(digitTimes(claimOf('c-keir-book-late')!.label)).toEqual(['21:40']);
    expect(digitTimes(claimOf('c-keir-book-early')!.label)).toEqual(['20:00']);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------------ the order */

describe('O Refúgio (pt-BR) — order, not clock', () => {
  /**
   * The bothy has no clock, so the case is a sequence. Anne lists it in one
   * message and the whole pack is the player noticing one of those arrivals
   * happened twice.
   */
  it('keeps the arrival order countable', () => {
    expect(body('m3')).toContain('primeiro');
    expect(body('m3')).toContain('segunda');
    expect(body('m3')).toContain('por último');
    expect(body('m2')).toContain('não tem relógio');
    expect(body('p3')).toContain('por último');
  });

  /**
   * Ten minutes and two different men. `vinte pras sete` is when Iain says he
   * started walking; `dez pras sete` is when somebody crossed the main room with
   * the torch off. They are the easiest pair in the pack to smudge together, so
   * each is asserted present where it belongs and absent where it does not.
   */
  it('keeps twenty-to and ten-to seven apart', () => {
    expect(body('p4')).toContain('vinte pras sete');
    expect(body('p4')).not.toContain('dez pras sete');
    expect(body('m6')).toContain('dez pras sete');
    expect(body('m6')).not.toContain('vinte pras sete');

    expect(revelation('x-keir-mainroom')).toContain('vinte pras sete');
    expect(revelation('x-keir-mainroom')).toContain('dez pras sete');
    expect(pressOf('b-mainroom')).toContain('ez pras sete');
  });

  /**
   * The signature written twice. It is the proof the whole pack is built to
   * deliver, so the two entries have to read as two entries in every place they
   * are described.
   */
  it('keeps the name in the book twice', () => {
    expect(body('h3')).toContain('K. Lamont');
    expect(body('h4')).toContain('Dois K. Lamont');
    expect(revelation('x-keir-book')).toContain('dois K. Lamont');
    expect(pressOf('b-book')).toContain('dois K. Lamont');
    expect(script.solution.epilogue).toContain('K. Lamont');
    expect(script.confrontation?.confession).toContain('embaixo do meu próprio nome');
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Refúgio (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p3: ['Vinte pras dez'], // the arrival everybody remembers
      p5: ['das seis'], // Anne in the main room, not moving
      m3: ['lá pelas seis'],
      m9: ['vinte pras dez'], // and he did come in then, which is the problem
      r4: ['das sete até as oito'], // Sandra in the porch, with the pack open
      h2: ['oito horas'], // Hamish reads the book
      h4: ['Vinte pras dez'], // and watches him sign it again
      h6: ['sete e quinze'], // the gas, and the man crouched down
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-keir-book')).toContain('vinte pras dez');
    expect(revelation('x-keir-book')).toContain('oito horas');
    expect(revelation('x-keir-backroom')).toContain('Sete e quinze');
    expect(pressOf('b-backroom')).toContain('Sete e quinze');
  });

  /**
   * Nobody in a bothy writes a clock, and the English agrees: the only digits in
   * any message are the two years the route was climbed and claimed, and the year
   * Hamish took the bothy on.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['s7', 'h1']);

    for (const t of script.threads) {
      for (const m of t.messages) {
        expect(digitTimes(m.body), `${m.id} has grown a digit clock`).toEqual([]);
      }
    }
  });
});

/* ----------------------------------------------------------------- the motive */

describe('O Refúgio (pt-BR) — the motive', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('s7')).toContain('2016'); // Struan names what he took
    expect(body('s7')).toContain('2018');
    expect(body('r6')).toContain('Raven'); // Sandra has the letter that proves he meant it
    expect(body('r7')).toContain('Ele tinha decidido.');
    expect(script.motives[0]?.summary).toContain('2016');
    expect(script.motives[0]?.summary).toContain('2018');
  });

  /**
   * The thing that makes it a murder rather than a grievance: he was giving it
   * back, and the giving back would have been his too. Both halves are in the
   * confession and both have to survive.
   */
  it('keeps the reason the giving back was unbearable', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Ele ia devolver.');
    expect(confession).toContain('não era gratidão');
    expect(confession).toContain('Até a devolução ia ser dele.');
  });

  /** Pack 7 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Refúgio (pt-BR) — the voices', () => {
  const SANDRA = ['r1', 'r2', 'r4', 'r5', 'r6', 'r7'];
  const HAMISH = ['p2', 'p7', 'h1', 'h2', 'h3', 'h4', 'h6', 'h7', 'h9', 'h10', 'h11'];
  const STRUAN = ['s1', 's3', 's5', 's7', 's8', 's10', 's11'];
  const IAIN = ['p3', 'p4', 'p6'];
  const ANNE = ['p1', 'p5', 'p8', 'm1', 'm2', 'm3', 'm5', 'm6', 'm7', 'm9', 'm10'];
  const YOU = ['s2', 's4', 's6', 's9', 'm4', 'm8', 'r3', 'h5', 'h8'];

  /** Sandra and Hamish are being careful for the record, and they finish. */
  it('keeps Sandra and Hamish finishing their sentences', () => {
    for (const id of [...SANDRA, ...HAMISH]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Struan and Iain both capitalise and neither ever lands a full stop, so the tell
   * between them is content: Struan talks himself towards the thing he dreads, Iain
   * moves every question onto somebody else.
   */
  it('keeps Struan and Iain capitalised and unfinished', () => {
    for (const id of [...STRUAN, ...IAIN]) {
      expect(body(id)[0], `${id} does not open like a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('s8')).toContain('Isso não basta'); // Struan, towards it
    expect(body('p6')).toContain('a mulher que limpa a casa dele'); // Iain, away from it
  });

  /** Anne is lowercase throughout and capitalises only the names. */
  it('keeps Anne lowercase', () => {
    for (const id of [...ANNE, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('m3')).toContain('Struan');
    expect(body('m10')).toContain('Sandra');
  });

  /**
   * The player is unmarked. No rephrase was forced: every line addressed to them
   * runs on a verb rather than a participle, so nothing agrees. An earlier draft of
   * the confrontation opening had `ficou sentado em casa`, which agrees, and it is
   * now `ficou em casa`.
   */
  it('never assigns the player a gender', () => {
    expect(script.confrontation?.opening).toContain('ficou em casa');
    expect(script.briefing?.opening).toContain('Você quebrou o tornozelo');

    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      body('m1'),
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(sentad|cert|segur|cansad|prepar[ae]d|sozinh|bem-vind)[oa]\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Refúgio (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('bothy')).toBe('o refúgio');
    expect(place('mainroom')).toBe('a sala principal');
    expect(place('backroom')).toBe('o quarto dos fundos');
    expect(place('porch')).toBe('o vestíbulo');
    expect(place('hill')).toBe('a montanha');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('struan')).toBe('Struan');
    expect(character('keir')).toBe('Iain');
    expect(character('morven')).toBe('Anne');
    expect(character('pris')).toBe('Sandra');
    expect(character('hamish')).toBe('Hamish');

    // The route and the book keep their name, which is already Gaelic-shaped.
    expect(body('s1')).toContain('Raven’s Line');
    expect(script.motives[0]?.summary).toContain('Raven’s Line');
  });

  /**
   * The three rooms are what the whole sequence is made of, and the chips have to
   * use the same words the witnesses use or the player cannot follow anybody
   * through the building.
   */
  it('uses one phrase for each room', () => {
    expect(label('c-keir-mainroom')).toContain('na sala principal');
    expect(label('c-morven-mainroom')).toContain('na sala principal');
    expect(body('m6')).toContain('a sala principal');
    expect(label('c-keir-backroom')).toContain('no quarto dos fundos');
    expect(label('c-pris-backroom')).toContain('no quarto dos fundos');
    expect(script.briefing?.opening).toContain('no quarto dos fundos');
    expect(label('c-pris-porch')).toContain('no vestíbulo');
    expect(body('r4')).toContain('no vestíbulo');
  });

  /**
   * Two names the English uses that do not match the people on screen, reproduced
   * rather than quietly corrected, and asserted against the English so a source fix
   * forces this file to move in the same commit.
   *
   * `Priscilla Nkemelu` in the epilogue is Sandra, whose id is `pris`;
   * renameLeak.test.ts misses it because its pattern is `\bPris\b` and `Priscilla`
   * runs past the boundary. `K. Lamont` in the book is Iain, whose id is `keir` —
   * and that one is load-bearing, because the contradiction is the player matching
   * a signature to a man.
   */
  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Priscilla Nkemelu',
      'K. Lamont',
      'Iain Lamont',
      'Struan Baillie',
      'Hamish Dunnet',
      'Nkemelu',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  it('says its own names for people and places somewhere in the prose', () => {
    const translatedProse = proseOf(script);
    const englishProse = proseOf(english);
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

  /** Sandra's thread opens because Anne names her in the message that gates it. */
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

    expect(body('m10')).toContain('Sandra');
  });
});
