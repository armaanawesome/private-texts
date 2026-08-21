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
import { theCutPtBr } from './the-cut';

/**
 * The Brazilian Portuguese Cut, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-cut')!;
const script = applyCaseText(english, theCutPtBr);
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

describe('O Canal (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theCutPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theCutPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theCutPtBr)];

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

/* ------------------------------------------------------------ the arithmetic */

describe('O Canal (pt-BR) — forty minutes on a bicycle', () => {
  /**
   * The fact that breaks the case, in the three places it appears: Sam says it,
   * the proof states it, the press throws it at him. Compared lowercased, because
   * it opens a sentence in two of the three and casing is where a match breaks
   * rather than the fact.
   */
  it('reads identically in the mouth, the proof and the press', () => {
    const sites = [body('b8'), revelation('x-nate-bike'), pressOf('c-bike')];
    for (const text of sites) {
      expect(text.toLowerCase()).toContain('seis milhas de caminho de sirga plano');
      expect(text.toLowerCase()).toContain('quarenta minutos');
    }

    // The boat really did sit still, and that has to stay true in his mouth and in
    // the proof, or the trick stops being a trick.
    expect(body('k4')).toContain('Nunca saí do lugar');
    expect(pressOf('c-bike')).toContain('nunca saiu do lugar e isso é verdade');
    expect(revelation('x-nate-bike')).toContain('o barco não é a coisa que desceu');
  });

  /** The key log is the one fact with his name on it, and it is a machine. */
  it('keeps the key log exact', () => {
    expect(body('g6')).toContain('20:44');
    expect(revelation('x-nate-wharf')).toContain('20:44');
    expect(pressOf('c-wharf')).toContain('20:44');
    expect(label('c-nate-wharf')).toContain('20:44–20:50');
    expect(label('c-nate-wharf')).toContain('registro da chave');
  });
});

/* --------------------------------------------------------------- Sam's gender */

describe('O Canal (pt-BR) — Sam has no gender', () => {
  /**
   * The English never assigns Sam one: it repeats the name where a pronoun would
   * go, and uses `them` once in Nate's rebuttal. Portuguese wants an article before
   * a first name and either choice picks a side, so Sam takes no article anywhere
   * and the rebuttal drops the pronoun instead of choosing.
   */
  it('never puts an article or an agreeing word on Sam', () => {
    const all = prose(script);
    expect(all).not.toMatch(/\b[oa] Sam\b/);
    expect(all).not.toMatch(/\bdo Sam\b|\bda Sam\b|\bao Sam\b|\bà Sam\b/);
    expect(all).not.toMatch(/Sam,? (ele|ela)\b/);

    // The rebuttal that carried `them` in the English.
    expect(pressOf('c-norbury')).toContain('Sam falou');
    expect(script.confrontation?.beats.find((b) => b.id === 'c-norbury')?.rebuttal).toContain(
      'acha que isso já é ser daqui',
    );

    // And Alan repeats the name rather than reaching for a pronoun, as many
    // times as the English does — which is the whole point of the line, since a
    // pronoun is exactly where Portuguese would have to pick a gender.
    //
    // Derived rather than hardcoded. This asserted `3`, and the English says it
    // four times: `Talk to Sam. Sam was on the towpath... and Sam does not miss
    // anything... you do not moor next to Sam.` The translation was faithful and
    // the literal number was wrong, which is the failure a hardcoded count
    // invites — it pins the counter's reading rather than the source.
    const englishK9 = english.threads.flatMap((t) => t.messages).find((m) => m.id === 'k9')?.body;
    expect(englishK9, 'k9 has gone').toBeDefined();
    expect((body('k9').match(/Sam/g) ?? []).length).toBe((englishK9!.match(/Sam/g) ?? []).length);
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Canal (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      k1: ['onze horas'], // Sam finds her
      k3: ['Seis milhas e cinco eclusas'], // the alibi everybody could do the sums on
      k8: ['das oito até as duas da manhã'], // Tam, in public
      m2: ['sete e meia', 'duas e vinte'], // Tam, in private, with the times
      b2: ['das oito até umas nove e quarenta'], // the walk, three years the same
      b4: ['Oito e meia'], // and the man on the offside path
      g7: ['das seis até as sete'], // Julie in the pub, happier than in fifteen years
      g8: ['sábado às duas'], // when Effie was coming
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-nate-norbury').toLowerCase()).toContain('oito e meia');
    expect(revelation('x-tam-hospital').toLowerCase()).toContain('das oito até as duas e vinte');
    expect(pressOf('c-norbury').toLowerCase()).toContain('oito e meia');
    expect(pressOf('c-why')).toContain('sábado às duas');
  });

  /**
   * Nobody on the cut writes a clock except the machine. The only digits in the
   * messages are the bridge number twice and the key log once.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['k2', 'b2', 'g6']);

    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['g6']);
  });
});

/* ----------------------------------------------------------------- the motive */

describe('O Canal (pt-BR) — the motive and the arc', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('v7')).toContain('na frente de todo mundo'); // Julie, what Saturday is
    expect(body('g8')).toContain('Effie'); // Alan, that the whole snug heard it
    expect(script.motives[0]?.summary).toContain('conselho tutelar');
    expect(script.motives[0]?.summary).toContain('2009');
  });

  /**
   * Clue 4: he rings back afterwards to ask how it went. `o Keeper` stays in
   * English and appears exactly as often as the English says it — once, in the
   * confession. The coda is him and does not name him.
   */
  it('keeps the Keeper in English, exactly as often as the English says it', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    expect(count(prose(script))).toBe(count(prose(english)));
    expect(count(prose(script))).toBe(1);

    expect(script.confrontation?.confession).toContain('se dizia o Keeper');
    expect((script.coda?.messages ?? []).join('\n')).not.toContain('Keeper');
    expect(prose(script)).not.toMatch(/guardi[ãa]o|zelador|vigia/i);

    // The follow-up call itself, which is the clue rather than the name.
    expect(script.confrontation?.confession).toContain('ligou de novo');
    expect(script.coda?.messages[3]).toContain('Eu sempre ligo.');
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Canal (pt-BR) — the voices', () => {
  const FINISHERS = [
    'v1', 'v2', 'v4', 'v6', 'v7', 'v9', 'v10', 'v11',
    'b1', 'b2', 'b4', 'b6', 'b7', 'b8', 'b9',
    'k1', 'k5', 'k9', 'g1', 'g2', 'g3', 'g5', 'g6', 'g7', 'g8', 'g9',
    'm1', 'm2', 'm4', 'm5', 'm6', 'm7',
  ];
  const YOU = ['v3', 'v5', 'v8', 'm3', 'b3', 'b5', 'g4'];

  it('keeps Julie, Sam and Alan writing in sentences', () => {
    for (const id of FINISHERS) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Tam is guarded in the group thread and careful in his own: lowercase and
   * unfinished in front of the moorings, capitalised and complete when it is just
   * the two of you. The pack states it without comment and so does this.
   */
  it('keeps Tam different in public and in private', () => {
    for (const id of ['k2', 'k8']) {
      expect(body(id)[0], `${id} is not lowercase in the group`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} finishes, in the group`).toBe(false);
    }
    for (const id of ['m1', 'm5']) {
      expect(body(id)[0]).toBe(body(id)[0]?.toUpperCase());
      expect(/[.?!]$/.test(body(id))).toBe(true);
    }
  });

  /** Nate capitalises and trails off. The one he finishes is the alibi. */
  it('keeps Nate trailing off, except on the alibi', () => {
    for (const id of ['k3', 'k4', 'k6', 'k7']) {
      expect(body(id)[0], `${id} does not open like a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
    }
    for (const id of ['k4', 'k6', 'k7']) {
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
    expect(/[.?!]$/.test(body('k3')), 'the alibi should be the one he finishes').toBe(true);
  });

  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });

  /** The player is unmarked; every line addressed to them runs on verbs. */
  it('never assigns the player a gender', () => {
    expect(script.briefing?.opening).toContain('Você largou o seu barco');
    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      script.blurb,
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(cert|segur|cansad|prepar[ae]d|sozinh|sentad|bem-vind)[oa]\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Canal (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('cut')).toBe('o canal');
    expect(place('norbury')).toBe('Norbury');
    expect(place('norburywharf')).toBe('o cais de Norbury');
    expect(place('veritysboat')).toBe('o barco da Julie');
    expect(place('pub')).toBe('o Junction');
    expect(place('tyrleylocks')).toBe('as eclusas de Tyrley');
    expect(place('towpath')).toBe('o caminho de sirga');
    expect(place('hospital')).toBe('o Royal Shrewsbury');
  });

  /**
   * The raw check, on the unfolded name, gated on the places the English actually
   * names — an unconditional version fails for the English too on any place that
   * is defined and never spoken.
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
      'Julie Cusk',
      'Nate Ogilvy',
      'Effie Ogilvy',
      'Sam Ferreira',
      'Alan Pryce',
      'Tam Oyelaran',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Sam's thread opens because Tam names Sam in the message that gates it. */
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

    expect(body('m7')).toContain('Sam');
  });
});
