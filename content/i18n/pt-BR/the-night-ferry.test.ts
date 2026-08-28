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
import { theNightFerryPtBr } from './the-night-ferry';

/**
 * The Brazilian Portuguese Night Ferry, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-night-ferry')!;
const script = applyCaseText(english, theNightFerryPtBr);
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

/** Message ids carrying any digit, derived rather than pinned. */
const withDigits = (s: typeof script): string[] =>
  s.threads
    .flatMap((t) => t.messages)
    .filter((m) => /[0-9]/.test(m.body))
    .map((m) => m.id);

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
};

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('O Ferry Noturno (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightFerryPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightFerryPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightFerryPtBr)];

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

/* ------------------------------------------------------- the call never made */

describe('O Ferry Noturno (pt-BR) — the port the ship never reached', () => {
  /**
   * The alibi is built out of the timetable rather than out of anything that
   * happened. So the dropped call has to stay exact in all four places it is
   * stated: the passenger who was awake, the officer with the log, the proof and
   * the press.
   */
  it('keeps the dropped Kirkwall call exact', () => {
    expect(body('e8')).toContain('Rampa quebrada');
    expect(body('s2')).toContain('21:00');
    expect(body('s3')).toContain('seis milhas');
    expect(revelation('x-dougie-kirkwall')).toContain('21:00');
    expect(revelation('x-dougie-kirkwall')).toContain('seis milhas');
    expect(pressOf('a-kirkwall')).toContain('seis milhas');

    // The line that makes it unmissable to anybody awake, and missable to anybody
    // asleep behind a shut door — which is the whole mechanism.
    expect(body('e9')).toContain('dormindo numa cabine de porta fechada');
  });

  /**
   * `Kirkwall, atracado` is the place, and it is a state rather than a town: the
   * ship being alongside. Keeping the comma-form is what stops it reading as an
   * ordinary destination the ship merely passed.
   */
  it('keeps alongside-Kirkwall a separate place from the ship', () => {
    expect(script.places.find((p) => p.id === 'kirkwall')?.name).toBe('Kirkwall, atracado');
    expect(label('c-dougie-kirkwall')).toContain('em terra em Kirkwall');
    expect(label('c-dougie-aboard')).toContain('a bordo do Roost');
  });

  /** The phone, and the object he picked wrong. */
  it('keeps the phone one object with one history', () => {
    expect(script.objects.find((o) => o.id === 'phone')?.name).toContain('capa verde');
    expect(label('c-phone-dougie')).toContain('o celular da Hannah');
    expect(label('c-phone-marisa')).toContain('o celular da Hannah');
    expect(body('s5')).toContain('21:04');
    expect(body('s5')).toContain('23:40');
    expect(revelation('x-phone')).toContain('21:04');
    expect(revelation('x-phone')).toContain('23:40');
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Ferry Noturno (pt-BR) — the times', () => {
  /**
   * Hannah writes ship time without a colon, because she was a purser for
   * twenty-six years and that is how she has written a time her whole working
   * life. Nobody else in the pack does it, and it is the only place her profession
   * shows in her voice rather than in what she says about it.
   */
  it('keeps Hannah writing ship time without a colon', () => {
    expect(body('n4')).toContain('1730');
    expect(body('n10')).toContain('2106');
    expect(digitTimes(body('n4'))).toEqual([]);
    expect(digitTimes(body('n10'))).toEqual([]);
  });

  /** Only the officer with the log writes a clock in digits. */
  it('lets only Senga write a digit clock', () => {
    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['s2', 's5', 's7']);
  });

  it('leaves the digits where the English left them', () => {
    expect(withDigits(script)).toEqual(withDigits(english));
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      d3: ['oito e meia'], // when he says he took a drink
      d5: ['nove e meia', 'quinze pras onze'], // the hour ashore that never happened
      d8: ['dez e dez'], // the phone he says he handed in
      m2: ['oito e meia'], // Hannah arriving after dinner
      m6: ['nove e cinco'], // and going out for air
      m7: ['nove e vinte'], // twenty minutes before he says he left
      e5: ['nove e cinco', 'dez e vinte e cinco'], // Eck signed in and out
      g5: ['nove e meia'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Compared lowercased, since these open a sentence in some of their sites.
    expect(revelation('x-dougie-deck').toLowerCase()).toContain('nove e meia');
    expect(revelation('x-dougie-deck').toLowerCase()).toContain('nove e vinte');
    expect(pressOf('a-deck').toLowerCase()).toContain('nove e meia');
    expect(pressOf('a-phone').toLowerCase()).toContain('dez e dez');
  });
});

/* ----------------------------------------------------------------- the motive */

describe('O Ferry Noturno (pt-BR) — the motive out of all proportion', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('n8')).toContain('refeitório'); // Hannah says what he did on the Rona
    expect(body('m3')).toContain('capitão de longo curso'); // Sheila says what he tells the bar
    expect(script.motives[0]?.summary).toContain('capitão de longo curso');
    expect(script.motives[0]?.summary).toContain('2003');
  });

  /**
   * She was pleased, and nobody laughed. Both are stated twice and both have to
   * survive, because the pack is about a man who could not bear being met kindly.
   */
  it('keeps her kindness and the room not laughing', () => {
    expect(body('m5')).toContain('ninguém riu');
    expect(script.motives[0]?.summary).toContain('Ela estava contente.');
    expect(pressOf('a-why')).toContain('Ninguém naquele bar riu.');

    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Ninguém riu.');
    expect(confession).toContain('Eu era do refeitório.');
  });

  /** Pack 14 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Ferry Noturno (pt-BR) — the voices', () => {
  const LOWERCASE = [
    'g2', 'g5', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm9', 'm10',
    'n2', 'n7', 'd2', 'd4', 'd7', 'm8', 'e3', 'e7', 's4', 's8',
  ];
  const FINISHERS = [
    'n1', 'n3', 'n4', 'n5', 'n6', 'n8', 'n9',
    'g1', 'g3', 'g4', 'g6',
    'd1', 'd3', 'd5', 'd6', 'd8', 'd9',
    'e1', 'e2', 'e4', 'e5', 'e6', 'e8', 'e9',
    's1', 's2', 's3', 's5', 's6', 's7', 's9', 's10',
  ];

  it('keeps Sheila and the player lowercase and unfinished', () => {
    for (const id of LOWERCASE) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });

  it('keeps the rest writing in sentences', () => {
    for (const id of FINISHERS) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    // Hannah signs off to her child rather than finishing a sentence, once.
    expect(/[.?!]$/.test(body('n10'))).toBe(false);
  });

  /**
   * The four who write properly divide by what they reach for: Dougie claims a
   * rank, Eck discloses the worst thing first and closes on the same word twice,
   * Senga reaches for a log or a time, Hannah is simply warm.
   */
  it('separates them by what each one reaches for', () => {
    expect(body('d6').toLowerCase()).toContain('trinta e um anos');
    expect(body('e1')).toContain('Pois é.');
    expect(body('e8')).toContain('Pois é.');
    expect(body('s2')).toContain('diário de bordo');
    expect(body('m9')).toContain('senga moar não chuta nada');
  });

  /**
   * The player is unmarked, and the English fixed this at source: the relationship
   * is named from the side of the person who has a gender.
   */
  it('never assigns the player a gender', () => {
    expect(body('s1')).toContain('porque ela era sua mãe');
    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      body('s1'),
      // epilogue excluded on purpose: it says Eck was made "ficar sentado", and he has a gender.
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(filh[oa]|cert|segur|cansad|prepar[ae]d|sozinh|sentad|bem-vind)[oa]?\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Ferry Noturno (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('ship')).toBe('o MV Roost');
    expect(place('bar')).toBe('o Magnus Bar');
    expect(place('afterdeck')).toBe('o convés de ré');
    expect(place('cabins')).toBe('o corredor de cabines do convés 6');
    expect(place('hospital')).toBe('a enfermaria do navio');
    expect(place('kirkwall')).toBe('Kirkwall, atracado');
  });

  /** Raw and unfolded, gated on the places the English itself names. */
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

  /** Units stay as the English has them; converting one changes a fact. */
  it('keeps the English units', () => {
    const all = prose(script);
    expect(all).toContain('força seis');
    expect(all).toContain('seis milhas');
    expect(all).toContain('quatro pés');
    expect(all).not.toMatch(/quil[oô]metros|metros por segundo/);
  });

  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Hannah Pirie',
      'Dougie Yarrow',
      'Douglas Yarrow',
      'Sheila Kinnaird',
      'Eck Tulloch',
      'Senga Moar',
      'Bhatti',
      'Rona',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Eck's thread opens because Sheila names him in the message that gates it. */
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

    expect(body('m10')).toContain('eck tulloch');
  });
});
