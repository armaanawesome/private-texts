import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';
import { theReunionPtBr } from './the-reunion';

/**
 * The Brazilian Portuguese Reunion, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-reunion')!;
const script = applyCaseText(english, theReunionPtBr);
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
    .find((c) => c.id === id)!;
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

describe('O Reencontro (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theReunionPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theReunionPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theReunionPtBr)];

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

/* --------------------------------------------------- co-presence proves nothing */

describe('O Reencontro (pt-BR) — the dead ends', () => {
  /**
   * A reunion is a room where every single person can tell you who they were
   * standing with, and the engine refuses all of it: being with one person does
   * not exclude being with another. The four `with_person` chips exist to be
   * pinned and to do nothing, so they have to read as ordinary usable evidence in
   * Portuguese too — plain, consistent, and worth trying.
   */
  it('keeps the four co-presence chips plain and pinnable', () => {
    expect(label('c-marika-with-nia')).toContain('com Nia');
    expect(label('c-nia-with-marika')).toContain('com Michelle');
    expect(label('c-marika-with-rafe')).toContain('com Mark');
    expect(label('c-nia-with-rafe')).toContain('com Mark');
  });

  /** And the engine still refuses them, on the translated script. */
  it('still fires nothing when they are pinned against each other', () => {
    const pairs: [string, string][] = [
      ['c-marika-with-nia', 'c-marika-with-rafe'],
      ['c-nia-with-marika', 'c-nia-with-rafe'],
    ];
    for (const [a, b] of pairs) {
      expect(
        checkContradiction(script, claimOf(a), claimOf(b)).ok,
        `${a} vs ${b} should prove nothing`,
      ).toBe(false);
    }
  });
});

/* ------------------------------------------------------------- the speech lie */

describe('O Reencontro (pt-BR) — the clock he became', () => {
  /**
   * He did not falsify a clock, he became one. The programme says nine; he spoke
   * at quarter past eight. Every witness dates the night off a sequence he wrote,
   * so both times have to stay fixed and opposed everywhere they appear.
   */
  it('keeps the programme time and the real time opposed', () => {
    expect(body('r4')).toContain('Nove horas');
    expect(body('k6')).toContain('o programa dizia nove horas');
    expect(body('k6')).toContain('oito e quinze');

    // The sentence that converts one into the other, which is the whole case.
    expect(body('k7')).toContain('depois das oito e quinze');
    expect(body('k7')).toContain('depois das nove');

    expect(revelation('x-rafe-speech')).toContain('oito e quinze');
    expect(revelation('x-rafe-speech')).toContain('20:55');
    expect(pressOf('a-speech')).toContain('quarenta e cinco minutos');
  });

  /** The two machine records, and only those, in digits. */
  it('lets only the invoice and the barrier write a time in digits', () => {
    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['k7', 'c6']);

    expect(body('k7')).toContain('20:55');
    expect(body('c6')).toContain('21:08');
    expect(body('c6')).toContain('21:19');
    expect(revelation('x-rafe-gate')).toContain('21:08');
    expect(pressOf('a-gate')).toContain('21:19');
  });

  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(english.threads.flatMap((t) => t.messages).filter((m) => /[0-9]/.test(m.body)).map((m) => m.id));
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n10: ['oito e dez'], // the letter was already posted
      k4: ['quinze pras nove'], // Michelle in the hall, unable to say when
      r2: ['quinze pras nove', 'nove e meia'], // the forty-five minutes he accounts for
      c3: ['Nove e dois'], // Vale locking the music block
      c8: ['oito e meia'], // Nia coming to thank him
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }
    expect(script.confrontation?.confession).toContain('oito e dez');
  });
});

/* ----------------------------------------------------------------- the motive */

describe('O Reencontro (pt-BR) — the twenty minutes', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('n7')).toContain('oito páginas'); // Nia says what she has written
    expect(body('k9')).toContain('montou a história'); // Michelle says who assembled it
    expect(script.motives[0]?.summary).toContain('vinte minutos');
  });

  /**
   * The lie was never who. It was how long. Both statements of it have to keep the
   * number, or the pack is about a drowning rather than about twenty minutes.
   */
  it('keeps the twenty minutes in every account of it', () => {
    for (const text of [
      body('k8'),
      script.motives[0]?.summary ?? '',
      pressOf('a-why'),
      script.solution.epilogue,
    ]) {
      expect(text).toContain('vinte minutos');
    }
    expect(body('k8')).toContain('ninguém empurrou o ashley');
    expect(pressOf('a-why')).toContain('Ninguém empurrou Ashley Crewe');
  });

  /** Pack 13 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Reencontro (pt-BR) — the voices', () => {
  const MICHELLE = ['g2', 'g4', 'g6', 'k1', 'k3', 'k4', 'k6', 'k7', 'k8', 'k9', 'k10'];
  const YOU = ['n2', 'n6', 'k2', 'k5', 'r3', 'r6', 't3', 't6', 'c4'];
  const FINISHERS = [
    'n1', 'n3', 'n4', 'n5', 'n7', 'n8', 'n9', 'n10',
    'g1', 'g3', 'g5', 'g7',
    'r1', 'r2', 'r4', 'r5', 'r7', 'r8', 'r9',
    't1', 't2', 't4', 't5', 't7', 't8', 't9',
    'c1', 'c2', 'c3', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
  ];

  /**
   * Michelle is the only adult here who types lowercase and never finishes, and it
   * is not carelessness: she is the one who never got to become careful, and she
   * is also the one holding the invoice that breaks the case.
   */
  it('keeps Michelle lowercase and unfinished, alone among the adults', () => {
    for (const id of [...MICHELLE, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });

  it('keeps everybody else writing in sentences', () => {
    for (const id of FINISHERS) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    // And they divide by what each one reaches for.
    expect(body('r1')).toContain('diretor do St Cuthbert’s'); // Mark states the job first
    expect(body('t5')).toContain('Não é uma coisa rara'); // Tobi deflates himself
    expect(body('c2')).toContain('minha ronda'); // Vale goes by his rounds
    expect(body('n4')).toContain('nove vezes'); // Nia interrupts herself
  });

  /**
   * Vale calls the others by surname, which is the whole of a caretaker who taught
   * none of them anything and knows all their names.
   */
  it('keeps Mr Vale on surnames', () => {
    expect(body('c7')).toContain('senhorita Selkirk');
    expect(body('c8')).toContain('senhorita Boateng');
    expect(body('c3')).toContain('senhor Ellory');
  });

  /**
   * The player is unmarked, and this pack places them by year group rather than
   * describing them, so nothing agrees.
   */
  it('never assigns the player a gender', () => {
    expect(script.briefing?.opening).toContain('Você era daquele ano');
    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      body('n1'),
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(cert|segur|cansad|prepar[ae]d|sozinh|sentad|convidad|bem-vind)[oa]\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Reencontro (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('school')).toBe('Ardenshaw High');
    expect(place('hall')).toBe('o salão principal');
    expect(place('musicblock')).toBe('o bloco de música');
    expect(place('carpark')).toBe('o estacionamento dos funcionários');
    expect(place('riverpath')).toBe('a trilha do rio');
    expect(place('branch')).toBe('o posto de Calderside');
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

  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Nia Boateng',
      'Mark Ellory',
      'Michelle Selkirk',
      'Tobi Marchetti',
      'Colin Vale',
      'Ashley Crewe',
      'Sheila Crewe',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Tobi's thread opens because Mark names him in the message that gates it. */
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

    expect(body('r7')).toContain('Tobi Marchetti');
  });
});
