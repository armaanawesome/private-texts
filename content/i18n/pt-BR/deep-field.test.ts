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
import { deepFieldPtBr } from './deep-field';

/**
 * The Brazilian Portuguese Deep Field, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText rather than routed through
 * CASE_TRANSLATIONS: an unregistered pack is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". The generic contract is re-run here.
 *
 * The rest is what no generic test can see. This case is one alibi measured in the
 * wrong clock, and nearly every other time in it is spoken rather than written, so
 * a line reading `dez e meia` where the English says quarter to ten leaves every
 * id, number and paragraph check green and the case unsolvable by reading.
 */
const english = getCase('deep-field')!;
const script = applyCaseText(english, deepFieldPtBr);
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

/**
 * Wraps mod 1440. The engine holds claim windows as raw minutes past the case
 * zero, so a window after midnight is stored above 1440 — `c-mal-log` is
 * 1485–1530, which is 00:45–01:30 and not 24:45–25:30. A helper that divides by
 * 60 without wrapping reports every post-midnight claim as a mismatch, which is
 * exactly how the Portuguese Night Round broke on `c-margo-office`.
 */
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

describe('Campo Profundo (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(deepFieldPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, deepFieldPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(deepFieldPtBr)];

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

/* ------------------------------------------------------------- which clock */

describe('Campo Profundo (pt-BR) — the wrong clock', () => {
  /**
   * The teaching move of the whole pack. `c-mal-log` exists to be REJECTED: the
   * player pins it against Theo expecting it to fire and the engine answers that
   * the two describe different times. So the chip has to read 00:45–01:30 while
   * Maria says the log itself reads 21:45, and the sentence that converts one into
   * the other has to survive intact — it is the only place the conversion is
   * stated.
   */
  it('keeps the conversion that turns the log into a confession', () => {
    expect(body('p2')).toContain('UTC');
    expect(body('p3')).toContain('UTC mais três');
    expect(body('p3')).toContain('21:45');
    expect(body('p3')).toContain('quinze pra uma da manhã');
    expect(body('p3')).toContain('hora da estação');
    expect(label('c-mal-log')).toContain('00:45–01:30');
    // And the line that says out loud what the log actually is.
    expect(body('p4')).toContain('não é o álibi dele');
  });

  /** Erik points at the clock before Maria explains it, or nobody asks her. */
  it('has Erik ask which clock the log keeps', () => {
    expect(body('n6')).toContain('registro da plataforma');
    expect(body('n6')).toContain('em que relógio');
  });
});

/* ------------------------------------------------------------------ the times */

describe('Campo Profundo (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      w4: ['quinze pras dez', 'as onze'], // Mal puts himself on the platform
      w6: ['dez e dez'], // Theo puts him in the corridor
      h2: ['das nove até as onze'], // Theo in the mess, with the sightline
      h4: ['dez e quinze'], // the last time anybody sees Laura
      n4: ['dez pras dez', 'dez e meia'], // Erik on the radio, logged at the ship
      p9: ['nove e meia', 'meia-noite'], // Maria, the least useful alibi anybody has had
      n1: ['Duas e dez'], // Erik finds her
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Fifteen minutes apart, two different men, and the easiest pair in the pack
    // to smudge into each other.
    expect(body('w4')).not.toContain('dez pras dez');
    expect(body('n4')).not.toContain('quinze pras dez');

    expect(revelation('x-mal-block')).toContain('quinze pras dez');
    expect(revelation('x-mal-block')).toContain('dez e dez');
    expect(pressOf('f-block')).toContain('quinze pras dez');
    expect(pressOf('f-block')).toContain('dez e dez');
  });

  /**
   * Only the machines write a clock in digits: Maria quoting the time of death,
   * the platform log, and the card reader. Everybody else speaks their times, which
   * is why the card reader is the beat he has no answer for.
   */
  it('lets only the machines write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['w1', 'p3', 'p6']);

    expect(body('w1')).toContain('02:10');
    expect(body('p6')).toContain('22:35');
    expect(body('p6')).toContain('22:44');
    expect(revelation('x-mal-surgery')).toContain('22:35');
    expect(revelation('x-mal-surgery')).toContain('22:44');
    expect(revelation('x-mal-porch')).toContain('22:11');
    expect(pressOf('f-porch')).toContain('22:11');

    // Theo reads the camera stamp aloud, so it stays spoken even though it is a
    // machine that produced it.
    expect(body('v2')).toContain('vinte e duas e onze');
    expect(digitTimes(body('v2'))).toEqual([]);
  });
});

/* ----------------------------------------------------------------- the motive */

describe('Campo Profundo (pt-BR) — the motive and the red herring', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('o4')).toContain('fibrilação atrial'); // Laura names the finding
    expect(body('p8')).toContain('dezenove temporadas'); // Maria names what it costs him
    expect(script.motives[0]?.summary).toContain('fibrilação atrial');
    expect(script.motives[0]?.summary).toContain('primeiro voo');
  });

  /**
   * Erik is the red herring, and his innocence is provable by the same tools. The
   * revelation has to keep both the ship log and the reason Mal picked him.
   */
  it('clears Erik on the ship log, and says why he was picked', () => {
    const text = revelation('x-rune-mast');
    expect(text).toContain('Shackleton');
    expect(text).toContain('torre meteorológica');
    expect(text).toContain('ninguém enxerga');
    expect(body('h7')).toContain('o navio registra');
  });

  /** Pack 4 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('Campo Profundo (pt-BR) — the voices', () => {
  const LAURA = ['o1', 'o3', 'o4', 'o6', 'o7', 'o9', 'o10', 'o11'];
  const THEO = ['w3', 'w6', 'h1', 'h2', 'h4', 'h5', 'h7', 'h8', 'v1', 'v2', 'v3', 'v5'];
  const MARIA = ['w1', 'w2', 'w9', 'p1', 'p2', 'p3', 'p4', 'p6', 'p7', 'p8', 'p9'];
  const MAL = ['w4', 'w5', 'w7', 'w8'];
  const ERIK = ['n1', 'n2', 'n4', 'n5', 'n6'];
  const YOU = ['o2', 'o5', 'o8', 'h3', 'h6', 'n3', 'p5', 'v4'];

  /** Laura and Theo thumb a phone: lowercase, and they never land the full stop. */
  it('keeps Laura and Theo typing rather than writing', () => {
    for (const id of [...LAURA, ...THEO]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // Theo capitalises the people, which is the whole distance between him and Laura.
    expect(body('h5')).toContain('Mal');
    expect(body('h8')).toContain('Erik');
  });

  /**
   * Maria and Mal write equally correctly, and that is the point: the difference
   * between them is not grammar, it is that every message of his moves the question
   * onto somebody else.
   */
  it('keeps Maria and Mal writing for the record, and Mal deflecting', () => {
    for (const id of [...MARIA, ...MAL]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    expect(body('w1')).toContain('Estou registrando'); // Maria writes it down
    expect(body('p1')).toContain('Quero isso registrado');
    expect(body('w7')).toContain('quatro parcas vermelhas'); // Mal moves it onto Theo
    expect(body('w8')).toContain('Erik'); // and then onto Erik
  });

  /** Erik answers in voice notes, transcribed, and composes better than anybody. */
  it('keeps Erik on voice notes', () => {
    for (const id of ERIK) {
      expect(body(id).startsWith('[áudio,'), `${id} lost its voice note stamp`).toBe(true);
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // He says why himself, once, and nobody else in the case mentions it.
    expect(body('n2')).toContain('não leio bem');
    expect(body('h8')).toContain('não vai digitar');
  });

  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });

  /**
   * The player has no gender, per content/cases/playerNeutral.test.ts. Two lines
   * forced a rephrase and both are pinned, because the literal translation picks a
   * gender and nothing else in the build would notice.
   */
  it('never assigns the player a gender', () => {
    // "You are her desk officer in Cambridge" — every Portuguese noun for the job
    // takes an agreeing article, so the agreement lands on `pessoa` instead.
    expect(script.briefing?.opening).toContain('a pessoa que responde pelo caso dela');
    // "you are very sure" — seguro/segura both agree.
    expect(script.confrontation?.deflections[2]).toContain('tem muita certeza');

    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
    ].join('\n');
    expect(addressed).not.toMatch(/\b(segur|cansad|prepar[ae]d|sozinh|bem-vind)[oa]\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('Campo Profundo (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('station')).toBe('a estação');
    expect(place('block')).toBe('o bloco de alojamento');
    expect(place('mess')).toBe('o refeitório');
    expect(place('surgery')).toBe('o consultório');
    expect(place('coldporch')).toBe('a antecâmara');
    expect(place('outside')).toBe('lá fora');
    expect(place('telescope')).toBe('a plataforma de instrumentos');
    expect(place('metmast')).toBe('a torre meteorológica');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('orla')).toBe('Laura');
    expect(character('mal')).toBe('Mal');
    expect(character('rune')).toBe('Erik');
    expect(character('pilar')).toBe('Maria');
    expect(character('theo')).toBe('Theo');
  });

  /**
   * The call that got the source fixed.
   *
   * The English briefing and epilogue used to call three of these people by
   * names that appear nowhere on screen — Orla Byrne for Laura, Pilar Otxoa for
   * Maria, Rune Sandved for Erik. This translation reproduced them exactly
   * rather than quietly correcting them, and asserted against the English so
   * that fixing the source would force the Portuguese to move in the same
   * commit instead of the two drifting apart.
   *
   * It worked. Six stale names across three packs were found and fixed, and
   * `content/cases/renameLeak.test.ts` now catches the class at the source —
   * a character's id is the name it was written under, so an id that is not
   * part of the current display name, appearing capitalised in the prose, is an
   * old name surfacing.
   *
   * Keeping the assertion with the dead names removed: tying the two prose sets
   * together is what catches the next name that changes in only one of them.
   */
  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of ['Laura Byrne', 'Maria Otxoa', 'Erik Sandved']) {
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

  /**
   * Nothing opens with a stranger, and this pack is the one that proves both halves
   * of that rule. Erik's thread is gated on h8, where Theo names him. The porch
   * camera thread is gated on h4, which Theo sent himself — the player has been
   * reading him for an hour by the time it opens, so nobody needs to name him.
   */
  it('opens no thread with a stranger', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const messages = script.threads.flatMap((t) => t.messages);
    const bodyOf = new Map(messages.map((m) => [m.id, fold(m.body)]));
    const senderOf = new Map(messages.map((m) => [m.id, m.senderId]));

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;

      const others = thread.participantIds.filter((id) => id !== 'you');
      const names = others.map((id) => nameOf.get(id) ?? '');
      const introduced = gates.some((id) => {
        const gate = bodyOf.get(id) ?? '';
        if (names.some((n) => n !== '' && gate.includes(n))) return true;
        const sender = senderOf.get(id);
        return sender !== undefined && others.includes(sender);
      });
      expect(introduced, `${thread.id} opens with a stranger`).toBe(true);
    }

    // Named, specifically, for the one that depends on it.
    expect(body('h8')).toContain('Erik');
  });
});
