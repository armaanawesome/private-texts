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
import { openMicPtBr } from './open-mic';

/**
 * The Brazilian Portuguese Open Mic, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('open-mic')!;
const script = applyCaseText(english, openMicPtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const englishBody = (id: string): string =>
  english.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const threadOf = (id: string) => script.threads.find((t) => t.id === id);
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

describe('Open Mic (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(openMicPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, openMicPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(openMicPtBr)];

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

/* ------------------------------------------------------------ the wrong week */

describe('Open Mic (pt-BR) — the clip is from the wrong week', () => {
  /**
   * One clock, and it is correct. The lie is in the calendar, so the three things
   * that date the footage have to stay exact — and the swan is the one that
   * actually breaks him, in Kevin's mouth, the proof and the press.
   */
  it('keeps the swan dating the footage', () => {
    expect(body('f8')).toContain('Não tem cisne na terça');
    expect(body('f8')).toContain('a terça anterior');
    expect(revelation('x-marnie-bar').toLowerCase()).toContain('terça anterior');
    expect(revelation('x-marnie-bar').toLowerCase()).toContain('cisne');
    expect(pressOf('o-bar').toLowerCase()).toContain('cisne');
    expect(script.blurb).toContain('da terça anterior');
  });

  /** The clip is real, which is the part that makes it work. */
  it('keeps the clip real and the man really in it', () => {
    expect(revelation('x-marnie-bar')).toContain('O clipe é real');
    expect(body('f7')).toContain('clipe adorável');
  });

  /** One camera, one card, one night — and two people who both had it. */
  it('keeps the card a single object', () => {
    expect(script.objects.find((o) => o.id === 'card')?.name).toBe('o cartão da câmera');
    expect(label('c-card-gil')).toContain('o cartão da câmera');
    expect(label('c-card-roz')).toContain('o cartão da câmera');
    expect(body('r2')).toContain('Uma câmera, um cartão, uma noite');
    expect(revelation('x-card')).toContain('Uma câmera, um cartão, uma noite');
    expect(pressOf('o-card')).toContain('Uma câmera, um cartão');
  });
});

/* ---------------------------------------------------------------- the times */

describe('Open Mic (pt-BR) — the times', () => {
  /**
   * Kit is the only person in the pack who writes a clock in digits, because Kit
   * does sound and door and writes the running order in biro. Everyone else speaks
   * their times. That split is why a float sheet outranks a man with a camera.
   */
  it('lets only Kit write a time in digits', () => {
    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['k2', 'k5']);

    expect(body('k2')).toContain('21:30');
    expect(body('k2')).toContain('21:55');
    expect(body('k5')).toContain('21:28');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n9: ['cinco pras dez'], // Debbie, on at five to ten
      h4: ['nove e meia'], // the clip Dave says is that night
      k2: ['cinco pras dez', 'dez pras dez'], // Kit, correcting the running order
      k4: ['nove e meia'], // she was on the stage at that minute
      f6: ['vinte e cinco pras dez'], // the fire door
      r4: ['às nove'], // Roz pulls the card
      r5: ['nove e vinte'], // and puts it back
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Compared lowercased, since these open a sentence in some of their sites.
    expect(revelation('x-gil-alley').toLowerCase()).toContain('vinte e cinco pras dez');
    expect(pressOf('o-alley').toLowerCase()).toContain('vinte e cinco pras dez');
    expect(revelation('x-card').toLowerCase()).toContain('nove e vinte');
    expect(pressOf('o-card').toLowerCase()).toContain('nove e vinte');
  });
});

/* -------------------------------------------------------------- the vocative */

describe('Open Mic (pt-BR) — the vocative', () => {
  /**
   * Kevin says `Filho` once, in h8, and it is correct there: t-club has four
   * people in it and he is answering Dave, so it lands on Dave. It is absent from
   * the whole of t-ferdy, where the only participants are Kevin and the player and
   * the same word would tell the player they are a man.
   *
   * Both halves are asserted, because removing the right one is as wrong as
   * keeping the wrong one.
   */
  it('lands the paternal vocative on Dave and never on the player', () => {
    expect(body('h8')).toContain('Filho');
    expect(threadOf('t-club')?.participantIds.length).toBe(4);

    const kevinsOwnThread = (threadOf('t-ferdy')?.messages ?? []).map((m) => m.body).join('\n');
    expect(threadOf('t-ferdy')?.participantIds.length).toBe(2);
    // The shape of an address, not the bare noun. This matched `\bfilh[oa]\b`
    // and flagged f1, where Kevin has had the Nokia `desde que a minha filha
    // casou` — his own daughter, faithful to `since my daughter got married`,
    // marking nobody. A determiner is what separates a possessive from an
    // address, the same line `playerNeutral.test.ts` draws in English.
    const TERMS = 'filho|filha|meu jovem|meu rapaz|meu garoto';
    const VOCATIVE = new RegExp(
      String.raw`(?:^|\n|[.?!]\s+)(?:${TERMS}),\s` + '|' + String.raw`,\s*(?:${TERMS})\s*[.,?!]`,
      'i',
    );
    expect(VOCATIVE.test(kevinsOwnThread), 't-ferdy addresses the player by gender').toBe(false);
    // The possessive stays allowed, because it is a fact about Kevin.
    expect(kevinsOwnThread).toMatch(/minha filha/i);
  });

  /** And the player is unmarked everywhere else too. */
  it('never assigns the player a gender', () => {
    expect(script.briefing?.opening).toContain('Você faz um podcast');
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

/* ----------------------------------------------------------------- the motive */

describe('Open Mic (pt-BR) — the motive', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('n5')).toContain('mesmo mês'); // Debbie, on why it is hard
    expect(body('n5')).toContain('2009');
    expect(body('r8')).toContain('mesmo mês'); // Roz, on which of them felt bad
    expect(script.motives[0]?.summary).toContain('2009');
    expect(script.motives[0]?.summary).toContain('oito semanas');
  });

  /** The line he cannot get past, and it has to be the same line twice. */
  it('keeps the kind sentence that did it', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('eu te coloco no show');
    expect(confession).toContain('Eu te coloco no show.');
  });

  /** Pack 10 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('Open Mic (pt-BR) — the voices', () => {
  const LOWERCASE = ['n1', 'n3', 'n5', 'n6', 'n8', 'n9', 'n10', 'n4', 'n7', 'k3', 'k6', 'f3', 'r6'];
  const DAVE = ['h3', 'h4', 'h6', 'h7'];
  const FINISHERS = [
    'h1', 'h2', 'h5', 'h8', 'h9',
    'k1', 'k2', 'k4', 'k5', 'k7', 'k8',
    'f1', 'f2', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9',
    'r1', 'r2', 'r3', 'r4', 'r5', 'r7', 'r8',
  ];

  it('keeps Debbie and the player lowercase and unfinished', () => {
    for (const id of LOWERCASE) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
    // Except the one shout, which is a shout in both languages.
    expect(body('n2')).toBe(body('n2').toUpperCase());
    expect(body('n2')).toBe(englishBody('n2'));
  });

  /** Dave capitalises and never finishes. Every message he sends is unprompted. */
  it('keeps Dave mid-explanation', () => {
    for (const id of DAVE) {
      expect(body(id)[0], `${id} does not open like a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });

  it('keeps Roz, Kevin and Kit finishing their sentences', () => {
    for (const id of FINISHERS) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    // And they are separated by content, not casing.
    expect(body('h9')).toContain('chega disso'); // Roz closes it down
    expect(body('f1')).toContain('Nokia'); // Kevin, thirty-one years and a Nokia
    expect(body('k1')).toContain('folha de caixa'); // Kit, in biro
  });
});

/* ---------------------------------------------------------------- the names */

describe('Open Mic (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('club')).toBe('o Hatch');
    expect(place('stage')).toBe('o palco');
    expect(place('bar')).toBe('o bar');
    expect(place('greenroom')).toBe('o camarim');
    expect(place('box')).toBe('a cabine de som');
    expect(place('alley')).toBe('o beco');
  });

  /** Raw, unfolded, gated on the places the English actually names. */
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
   * Derived from the English rather than hardcoded. A literal count pins whoever
   * counted; deriving pins the source, which is the thing that has to match.
   */
  it('names Dave in n6 as often as the English does', () => {
    const count = (s: string, name: string) => s.toLowerCase().split(name).length - 1;
    expect(count(body('n6'), 'dave')).toBe(count(englishBody('n6'), 'dave'));
    // And the id never surfaces as a name, which is what renameLeak now catches.
    expect(prose(script).toLowerCase()).not.toMatch(/\bgil\b|\bgils\b|\bmarnie\b/);
  });

  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of ['Debbie Vaux', 'Kevin Boyce', 'Roz Antrim', 'Kit Nwachukwu', 'Priya']) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Kevin's thread opens because Kit names him in the message that gates it. */
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

    expect(body('k8')).toContain('Kevin');
  });
});
