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
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';
import { theHelplinePtBr } from './the-helpline';

/**
 * The Brazilian Portuguese Helpline, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-helpline')!;
const script = applyCaseText(english, theHelplinePtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

/** Varies per pack, so it stays local: everything read, minus the bare names. */
const spokenOf = (s: typeof script): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
};

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('A Linha de Escuta (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theHelplinePtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theHelplinePtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theHelplinePtBr)];

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

  /** A chip may name its window, or a single moment inside it. */
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

/* --------------------------------------------------- the call never made */

describe('A Linha de Escuta (pt-BR) — the ninety minutes', () => {
  /**
   * The charity's greatest virtue is the alibi: nothing is recorded and nothing is
   * traceable, which is the promise the whole thing rests on and the reason ninety
   * minutes in a duty book cannot be checked. So the three things that disprove it
   * have to survive whole — the book, the lamps, and the bill.
   */
  it('keeps the ninety minutes and the three things that break them', () => {
    expect(body('b4')).toContain('Duas e dez até vinte pras quatro');
    expect(label('c-alun-oncall')).toContain('02:10–03:40');
    expect(body('p2')).toContain('noventa minutos');
    expect(revelation('x-alun-call')).toContain('noventa minutos');
    expect(pressOf('p-call')).toContain('Noventa minutos');

    // The lamps, in Yusuf's mouth and in the proof.
    expect(body('y5')).toContain('lâmpadas apagadas');
    expect(revelation('x-alun-call')).toContain('lâmpadas apagadas');
    expect(pressOf('p-call')).toContain('lâmpadas apagadas');

    // And the bill, which cannot say who rang and does not need to.
    expect(body('p3')).toContain('não carregaram absolutamente nada');
  });

  /** The promise itself, which is what makes the alibi possible. */
  it('keeps the promise the charity rests on', () => {
    expect(script.briefing?.opening).toContain('Nada é gravado, nada é rastreável');
    expect(revelation('x-alun-call')).toContain('nada naquela linha é gravado ou rastreável');
  });

  /** The fob log: one open, his crachá, and he told forty people he heard someone. */
  it('keeps the one door opening', () => {
    expect(body('p5')).toContain('02:55');
    expect(body('p5')).toContain('03:05');
    expect(revelation('x-alun-stairs')).toContain('02:55');
    expect(revelation('x-alun-stairs')).toContain('03:05');
    // The press says the same two minutes in words, as the English does.
    expect(pressOf('p-stairs')).toContain('cinco pras três');
    expect(digitTimes(pressOf('p-stairs'))).toEqual([]);
    expect(body('b7')).toContain('escada dos fundos');
  });
});

/* ------------------------------------------------------------------ the times */

describe('A Linha de Escuta (pt-BR) — the times', () => {
  /**
   * Only Prem writes a clock in digits, because he is the one holding the duty
   * book and the alarm panel. Everybody else speaks their times, which is why a
   * fob log outranks twenty-two years of trust.
   */
  it('lets only Prem write a time in digits', () => {
    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['p2', 'p5']);
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      c13: ['lá pelas duas'], // when Connie means to say it
      b4: ['vinte pras quatro'], // the call he books himself for
      b7: ['duas e meia'], // the stairs he says he heard
      y2: ['das duas até as quatro'], // Yusuf in the call room, taking nothing
      y5: ['duas e meia', 'três e meia'], // the hour of unlit lamps
      y7: ['duas e meia'], // and Alun going through to the office
      y8: ['desde a meia-noite'], // Connie in there with the door open
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Compared lowercased, since these open a sentence in some of their sites.
    expect(revelation('x-alun-office').toLowerCase()).toContain('duas e meia');
    expect(pressOf('p-office').toLowerCase()).toContain('duas e meia');
  });

  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['c6', 'y4', 'p2', 'p5', 'p7']);
  });
});

/* ------------------------------------------------------------------- the arc */

describe('A Linha de Escuta (pt-BR) — the arc', () => {
  /**
   * Clue 5, and the one that narrows him to a person: Alun recognised the
   * technique while it was being used on him, because he taught it. The alias
   * count is derived from the English rather than pinned, so a change at source
   * moves both together.
   */
  it('keeps the Keeper in English, exactly as often as the English says it', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    expect(count(prose(script))).toBe(count(prose(english)));
    expect(prose(script)).not.toMatch(/guardi[ãa]o|zelador|vigia/i);

    expect(script.confrontation?.confession).toContain('se dizia o Keeper');
    expect((script.coda?.messages ?? []).join('\n')).toContain('o Keeper');
  });

  /** The recognition itself, which is the clue rather than the name. */
  it('keeps him recognising his own training', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('as pausas');
    expect(confession).toContain('Eu ensinei aquilo.');
    expect(confession).toContain('esperou a resposta');
    // And the coda confirming where he learned it.
    expect(script.coda?.messages[1]).toContain('É ali que eu aprendi.');
  });

  it('keeps both halves of the motive sayable', () => {
    expect(body('c6')).toContain('2011'); // Connie works out how long
    expect(body('p7')).toContain('2011'); // Prem has the two names and the date
    expect(body('p7')).toContain('catorze');
    expect(script.motives[0]?.summary).toContain('2011');
  });
});

/* --------------------------------------------------------------- the voices */

describe('A Linha de Escuta (pt-BR) — the voices', () => {
  const YOU = ['c2', 'c4', 'c7', 'c10', 'y3', 'y6', 's3', 'p4'];
  const EVERYBODY_ELSE = [
    'c1', 'c3', 'c5', 'c6', 'c8', 'c9', 'c11', 'c12', 'c13',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9',
    'y1', 'y2', 'y4', 'y5', 'y7', 'y8', 'y9',
    's1', 's2', 's4', 's5', 's6', 's7', 's8',
    'p1', 'p2', 'p3', 'p5', 'p6', 'p7', 'p8', 'p9',
  ];

  /**
   * Every non-player character here writes in complete sentences and lands a full
   * stop, so casing separates nobody and the axis has to be what each of them
   * reaches for.
   */
  it('keeps the branch writing in sentences, and the player not', () => {
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

  /**
   * Alun is a trained listener and he listens at people in writing: the ellipsis
   * is the pause, and his first deflection is a `Mm.` before a question. Lose that
   * and the most dangerous voice in the pack becomes an ordinary defensive one.
   */
  it('keeps Alun doing the pause', () => {
    expect(body('b3')).toContain('...');
    expect(body('b7')).toContain('...');
    expect(script.confrontation?.deflections[0]).toContain('Mm.');
    expect(script.confrontation?.deflections[0]).toContain('?');
    expect(script.confrontation?.beats.find((b) => b.id === 'p-office')?.rebuttal).toContain('...');
  });

  it('separates the others by what each one reaches for', () => {
    expect(body('c11')).toContain('me tira o sono'); // Connie names the cost and does not soften it
    expect(body('s6')).toContain('qual das duas'); // Sunny says the actual thing out loud
    expect(body('y1')).toContain('quatro plantões'); // Yusuf keeps saying it was his fourth
    expect(body('p6')).toContain('formulário'); // Prem reaches for a document
  });

  /**
   * The player is unmarked. One rephrase was forced: `Are you awake` wants
   * `acordado`/`acordada`, so Connie asks whether they are still `de pé`, which
   * inflects for nothing.
   */
  it('never assigns the player a gender', () => {
    expect(body('c1')).toContain('Você ainda está de pé');
    expect(body('c1')).not.toMatch(/acordad[oa]/);

    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      script.blurb,
      body('c1'),
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(acordad|cert|segur|cansad|prepar[ae]d|sozinh|sentad|bem-vind)[oa]\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('A Linha de Escuta (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('branch')).toBe('o posto');
    expect(place('callroom')).toBe('a sala de atendimento');
    expect(place('office')).toBe('o escritório');
    expect(place('kitchen')).toBe('a cozinha');
    expect(place('backstairs')).toBe('a escada dos fundos');
    expect(place('sunnyhome')).toBe('o apartamento da Sunny');
  });

  /**
   * Every place name here begins with an article and Portuguese fuses it into no,
   * na, do, da, pelo, pela, ao, à. French caught exactly this in this pack, where
   * only `au café` and `du café` appeared and the full `le café` never did.
   * Asserted on the raw, unfolded name, gated on the places the English itself
   * names.
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

  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Constance Bawa',
      'Alun Meredith',
      'Yusuf Kaya',
      'Sunniva Halvorsen',
      'Prem Chandrasekaran',
      'Beacon',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Sunny's thread opens because Yusuf names her in the message that gates it. */
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

    expect(body('y9')).toContain('Sunny');
  });
});
