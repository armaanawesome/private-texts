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
import { theLighthousePtBr } from './the-lighthouse';
import { theListenerPtBr } from './the-listener';

/**
 * The Brazilian Portuguese Listener — the finale, checked on the things a player
 * reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-listener')!;
const script = applyCaseText(english, theListenerPtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const englishBody = (caseId: string, id: string): string =>
  getCase(caseId)!
    .threads.flatMap((t) => t.messages)
    .find((m) => m.id === id)?.body ?? '';
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

describe('O Ouvinte (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theListenerPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theListenerPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theListenerPtBr)];

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

/* ------------------------------------------------------------------ the alias */

describe('O Ouvinte (pt-BR) — the alias', () => {
  /**
   * The alias splits by register and both halves are load-bearing. `Keeper` is
   * capitalised where Mairi and the confession say it, and lowercase where the
   * player types it, because the player has typed lowercase for fifteen packs.
   * Normalise either way and arcAlias.test.ts fails, because it counts the
   * capitalised form. Both counts derive from the English rather than being pinned
   * to a number.
   */
  it('keeps both registers of the alias, in the English proportions', () => {
    const count = (s: string, word: string) => s.split(word).length - 1;
    const here = prose(script);
    const there = prose(english);

    expect(count(here, 'Keeper'), 'capitalised alias count drifted').toBe(count(there, 'Keeper'));
    expect(count(here, 'keeper'), 'lowercase alias count drifted').toBe(count(there, 'keeper'));

    // And in the right mouths: the player lowercase, Mairi and the confession not.
    expect(body('l6')).toContain('keeper');
    expect(body('m3')).toContain('keeper');
    expect(body('m9')).toContain('Keeper');
    expect(script.confrontation?.confession).toContain('Keeper');

    expect(here).not.toMatch(/guardi[ãa]o|zelador|vigia/i);
  });

  /** He is never named on the nameplate, and named once by a police officer. */
  it('keeps him nameless except where a police officer says it', () => {
    expect(script.characters.find((c) => c.id === 'listener')?.name).toBe('Número desconhecido');
    expect(body('k7')).toContain('John Fettes');
    expect(script.solution.epilogue).toContain('John Fettes');
  });
});

/* -------------------------------------------------------- the Pack 1 quotation */

describe('O Ouvinte (pt-BR) — Ruth speaks from Pack 1', () => {
  /**
   * r6 is Ruth's last message from The Lighthouse, word for word. A player who
   * did Pack 1 has read that sentence before, and the archive thread only lands
   * if they recognise it rather than merely find it familiar.
   *
   * Asserted three ways: the two Portuguese strings are equal, the two English
   * strings are equal (so it is provably a quotation and not two similar
   * sentences), and neither has been quietly reworded on one side only.
   */
  it('quotes the Lighthouse exactly, in both languages', () => {
    expect(theListenerPtBr.messages?.r6).toBe(theLighthousePtBr.messages?.r12);
    expect(englishBody('the-listener', 'r6')).toBe(englishBody('the-lighthouse', 'r12'));
    expect(body('r6')).toBe(theLighthousePtBr.messages?.r12);
  });

  /** And her voice is Pack 1's: lowercase, blunt, never finishing. */
  it('keeps Ruth typing the way she typed in Pack 1', () => {
    // r5 opens with the initial M in both languages: it is a name, not a sentence.
    expect(body('r5')[0]).toBe(englishBody('the-listener', 'r5')[0]);
    for (const id of ['r2', 'r3', 'r4', 'r6']) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
  });
});

/* --------------------------------------------------------------- the proof */

describe('O Ouvinte (pt-BR) — the first clue in the game', () => {
  /**
   * `x-papers` is the clue that has been sitting in the Ardnoe file since Pack 1,
   * gating nothing. The two claims that make it have to keep the same words the
   * Lighthouse used, because the player is being asked to reread their own first
   * case.
   */
  it('keeps the papers pair sayable', () => {
    expect(label('c-papers-kept')).toContain('próprio caderno');
    expect(label('c-papers-sent')).toContain('já tinha mandado os papéis');
    expect(revelation('x-papers')).toContain('nunca tiveram aqueles papéis');
    expect(body('k2')).toContain('Nada nunca foi enviado a lugar nenhum.');
    expect(body('k3')).toContain('Gordon and Sime');
  });

  /**
   * The correction that convicts him: a temp would have said `enviado`, and
   * `enviado` can be stopped. The distinction is the whole of the case and it has
   * to be the same two words in his mouth and in the proof.
   */
  it('keeps the distinction he cannot let stand', () => {
    expect(body('l11')).toContain('enviados');
    expect(body('l12')).toContain('Enviado é uma coisa que pode ser interrompida');
    expect(body('l12')).toContain('já estavam com os auditores');
    expect(revelation('x-ardnoe')).toContain('enviado');
    expect(revelation('x-ardnoe')).toContain('já estavam com os auditores');
    expect(pressOf('z-ardnoe')).toContain('enviado');
  });

  /** Ninety-four seconds, which he gave away before anybody asked. */
  it('keeps the duration and the call box exact', () => {
    for (const text of [
      body('k5'),
      body('k6'),
      body('l12'),
      revelation('x-box'),
      pressOf('z-box'),
      script.confrontation?.confession ?? '',
    ]) {
      expect(text.toLowerCase()).toContain('noventa e quatro segundos');
    }
    expect(body('k5')).toContain('21:31');
    expect(revelation('x-box')).toContain('21:31');
    expect(pressOf('z-box')).toContain('21:31');
    expect(label('c-listener-box')).toContain('21:31–21:33');
  });

  it('leaves the digits where the English left them', () => {
    expect(withDigits(script)).toEqual(withDigits(english));
  });
});

/* ------------------------------------------------------------- the neutrals */

describe('O Ouvinte (pt-BR) — the player is still nobody', () => {
  /**
   * Two third-person references to the player were fixed in the English, and
   * Portuguese agreement pushes hard to re-gender both. l3 becomes `essa versão`
   * and the confession drops the subject rather than choosing `ele` or `ela`.
   */
  it('keeps the two third-person references neutral', () => {
    expect(body('l3')).toContain('essa versão');
    expect(body('l3')).not.toMatch(/\b(conheci ele|conheci ela)\b/);

    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('nunca uma vez me decepcionou');
    expect(confession).not.toMatch(/\b(ele|ela) nunca uma vez me decepcionou\b/);
  });

  /**
   * The closing line needs a neuter, because `o melhor` and `a melhor` both pick a
   * side. It is built on `o que há de melhor`, where the article agrees with the
   * relative clause and not with the person.
   */
  it('keeps the closing line neuter', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('o que há de melhor');
    expect(confession).not.toMatch(/você (é|era) [oa] melhor\b/i);
  });

  /**
   * Deliberately narrow, per playerNeutral.test.ts: only lines where an agreeing
   * adjective would attach to the PLAYER. The epilogue is excluded because it
   * describes Beth, Mairi and Fettes, all of whom have a gender.
   */
  it('never assigns the player a gender', () => {
    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      body('l3'),
      body('l4'),
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(cert|segur|cansad|prepar[ae]d|sozinh|sentad|escolhid|bem-vind)[oa]\b/i,
    );
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Ouvinte (pt-BR) — the voices', () => {
  const YOU = ['l5', 'l6', 'l7', 'l10', 'l13', 'k4', 'm3', 'm7', 'b5'];
  const FINISHERS = [
    'l1', 'l2', 'l3', 'l4', 'l8', 'l9', 'l11', 'l12', 'l14', 'l15', 'l16',
    'k1', 'k2', 'k3', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10', 'k11',
    'r1', 'm1', 'm2', 'm4', 'm5', 'm6', 'm8', 'm9',
    'b1', 'b2', 'b3', 'b4', 'b6', 'b7', 'b8', 'b9', 'b10',
  ];

  it('keeps the player lowercase and unfinished', () => {
    for (const id of YOU) {
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
  });

  /**
   * The one-word answer. In fifteen packs he has never replied without a clause,
   * and `Não.` is the only time the man is caught off balance.
   */
  it('keeps his single-word refusal', () => {
    expect(body('l8')).toBe('Não.');
  });

  it('separates the rest by what each one reaches for', () => {
    expect(body('k6')).toContain('nunca foi divulgada'); // Nkemdi reaches for a record
    expect(body('m4')).toContain('você vai receber certo'); // Mairi, the exact words
    expect(body('b7')).toContain('Internada, não em atendimento'); // Beth, the unsayable thing
  });

  /** The last voice is Mairi Bell, not him. */
  it('gives the last word to Mairi', () => {
    expect(script.coda?.from).toBe('Mairi Bell');
    expect(script.coda?.messages.at(-1)).toContain('Obrigada por perguntar.');
    expect((script.coda?.messages ?? []).join('\n')).not.toContain('Keeper');
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Ouvinte (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('ardnoe')).toBe('Ardnoe');
    expect(place('tower')).toBe('o farol');
    expect(place('cafe')).toBe('o café');
    expect(place('callbox')).toBe('o orelhão da estrada de Kilmorack');
    expect(place('home')).toBe('o apartamento dele em Kirkcaldy');
    expect(place('hospital')).toBe('o Vale of Leven, ala 6');
  });

  /**
   * The two places that carry over from Pack 1 use Pack 1's words, so a player who
   * did The Lighthouse reads the same lighthouse and the same café.
   */
  it('uses the same words as Pack 1 for the lighthouse and the café', () => {
    expect(theListenerPtBr.places?.tower).toBe(theLighthousePtBr.places?.lighthouse);
    expect(theListenerPtBr.places?.cafe).toBe(theLighthousePtBr.places?.cafe);
  });

  /**
   * Raw and unfolded, gated on the places the English itself names. French caught
   * `le café` eaten by au/du in this exact pack; Portuguese contracts harder still.
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
      'Ruth Calder',
      'Mairi Bell',
      'John Fettes',
      'Bethan Ivory',
      'Beth Ivory',
      'Gordon and Sime',
      'Corrieburn',
      'Kilmorack',
      'Kirkcaldy',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Mairi's thread opens because Nkemdi passes on her request. */
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

    expect(body('k11')).toContain('Mairi Bell');
  });
});
