import { describe, it, expect } from 'vitest';
import { loadCase, type CaseScript } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theUnderstudyFr } from './the-understudy';

/**
 * The French Understudy, checked on the things a player reasons over.
 *
 * The pack is imported and applied with `applyCaseText` rather than looked up
 * through CASE_TRANSLATIONS, because the orchestrator owns the registry and
 * several packs are in flight at once. Until French is registered, `localiseCase`
 * returns the English and every generic check in caseText.test.ts silently passes
 * over a file it cannot see. `applyCaseText` is exactly what `localiseCase` calls
 * once the registry knows about the pack, so nothing here changes on the day it
 * is registered; it only stops being the only thing looking.
 *
 * The rest is what no generic test can read. This case states nearly every time
 * in prose — "ten past", not 20:10 — and a French line saying `huit heures et
 * demie` there leaves every id, number and paragraph check green and the case
 * unsolvable by reading. It also turns on a single physical object, and an object
 * with two names is two objects.
 *
 * Deliberately brittle: rewording one of these lines should break a test, because
 * rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-understudy')!;
const script: CaseScript = applyCaseText(english, theUnderstudyFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const beat = (id: string) => script.confrontation?.beats.find((b) => b.id === id);

const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const clock = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

/* --------------------------------------------- the contract, checked up front */

describe('La doublure (fr) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theUnderstudyFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theUnderstudyFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theUnderstudyFr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has broken
      // this build twice. French needs apostrophes constantly.
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number, paragraph and placeholder the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
      expect(placeholders(value), `${path} changes its placeholders`).toEqual(placeholders(source));
    }
  });

  it('gives every claim chip the times the engine actually holds', () => {
    for (const m of messages) {
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
  });

  it('uses its own names for people and places in the prose', () => {
    const prose = proseOf(script);
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
        prose.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /**
   * Pack 2 is deliberately standalone — no Listener, no arc clue, no coda. A
   * French translator reaching for `gardien` as a word for a caretaker would
   * start an arc this pack is designed not to have.
   */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|listener|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the locked room */

describe('La doublure (fr) — the locked room', () => {
  /**
   * One object, one name, everywhere the player meets it: both chips, the
   * revelation that breaks the room, the line that presses her with it. Two names
   * in French would be two keys, and a case with two keys has no locked room.
   */
  it('calls the key one thing on both chips and in the object list', () => {
    expect(script.objects.find((o) => o.id === 'key1')?.name).toBe('la clé de la loge');
    expect(label('c-key-dev')).toContain('la clé de la loge');
    expect(label('c-key-bea')).toContain('la clé de la loge');
  });

  /** The red tag is how Nell knows which key it is. It is the same tag every time. */
  it('keeps the red tag on the key wherever the player meets it', () => {
    for (const text of [
      body('e7'),
      revelation('x-key'),
      beat('u-key')?.press ?? '',
      script.solution.epilogue,
    ]) {
      expect(text, 'the red tag lost its name').toContain('l’étiquette rouge');
    }
  });

  /**
   * The train, which is the only reason Dev is innocent, and the seat, which is
   * the only reason Beatrice is not. Both stay digits in both languages.
   */
  it('keeps the train times and the seat number as digits', () => {
    expect(body('d3')).toContain('20:12');
    expect(body('d4')).toContain('20:12');
    expect(body('d4')).toContain('20:51');
    expect(revelation('x-dev-train')).toContain('20:12');
    expect(revelation('x-dev-train')).toContain('20:51');

    expect(body('b2')).toContain('J14');
    expect(revelation('x-bea-corridor')).toContain('J14');
    expect(beat('u-corridor')?.press).toContain('J14');
  });

  /**
   * And nobody else writes a clock in digits. If the company starts talking in
   * 20:12s, the train stops being the one hard fact in the case.
   */
  it('lets only the train and the seat carry digits', () => {
    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual(['d3', 'd4']);
  });
});

/* ------------------------------------------------------------------ the times */

describe('La doublure (fr) — the times', () => {
  /**
   * Every clock time the case turns on, in the line that states it. The interval
   * is 20:05–20:40 and the English writes it in words, so the French does too —
   * French cannot leave the hour implicit the way "ten past" can, so the hour is
   * said. Dev at twelve past against Beatrice in J14 is the whole case.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      q4: ['sept heures et demie'], // tomorrow night, 19:30
      q11: ['sept heures'], // Diane texts at curtain up
      q14: ['huit heures dix'], // where Nell was stood, 20:10
      d5: ['huit heures cinq'], // Nell in the corridor from 20:05
      d7: ['huit heures douze', 'huit heures vingt'], // Beatrice down and back, 20:12–20:22
      d8: ['huit heures dix'], // Diane goes down and does not come back
      d9: ['huit heures vingt'], // the twenty past Dev cannot stop thinking about
      e4: ['huit heures cinq', 'huit heures douze'], // Nell's own window, 20:05–20:12
      e5: ['neuf heures moins vingt'], // on stage at 20:40, before four hundred people
      e7: ['huit heures dix'], // Beatrice carrying the key, 20:10
      b2: ['huit heures cinq'], // her own alibi, 20:05
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The corridor sighting has to name the same two minutes in all three places
    // the player reads it, or it is three different sightings.
    expect(revelation('x-bea-corridor')).toContain('huit heures douze');
    expect(revelation('x-bea-corridor')).toContain('huit heures vingt');
    expect(beat('u-corridor')?.press).toContain('huit heures douze');
    expect(beat('u-corridor')?.press).toContain('huit heures vingt');
  });
});

/* ------------------------------------------------------------------ the names */

describe('La doublure (fr) — the names and the theatre', () => {
  /**
   * Descriptive places are translated, so the chip and the sentence have to make
   * the same choice — the player matches one against the other by eye.
   */
  it('uses one French name per place, on the chip and in the prose', () => {
    expect(revelation('x-bea-corridor')).toContain('le couloir des loges');
    expect(body('d4')).toContain('l’entrée des artistes');
    expect(label('c-dev-stagedoor')).toContain('l’entrée des artistes');
    expect(revelation('x-dev-train')).toContain('l’entrée des artistes');
    // The auditorium is the whole room, not the stalls, because Nell puts her at
    // the back of the circle and that has to stay inside the place she claimed.
    expect(body('b2')).toContain('la salle');
    expect(body('cl3')).toContain('la salle');
    expect(label('c-bea-auditorium')).toContain('la salle');
    // The circle is one word wherever it appears, and it is a part of `la salle`
    // rather than a rival to it. Asserted bare, because French contracts the
    // article — Nell goes up `du fond du balcon`, never `de le balcon`.
    expect(body('e8c')).toContain('balcon');
    expect(revelation('x-bea-notes')).toContain('balcon');
    expect(beat('u-notes')?.press).toContain('balcon');
  });

  /** Real theatre words, and the same one every time or the register wobbles. */
  it('uses the French theatre vocabulary consistently', () => {
    expect(body('cl9'), 'beginners is the call, not a literal translation').toContain('en scène');
    expect(body('q7'), 'the prompt corner is where the key lives').toContain('la régie');
    expect(body('e4'), 'the wings').toContain('coulisses');
    expect(script.title).toBe('La doublure');
    // One word for the interval, in the message, on the chip and in the proof.
    for (const text of [body('q7'), body('b3'), label('c-bea-notes'), revelation('x-bea-notes')]) {
      expect(text).toContain('entracte');
    }
  });

  /** Dev names Nell twice, which is the only reason her thread ever appears. */
  it('still names Nell in the messages that find her', () => {
    expect(body('q14')).toContain('Nell');
    expect(body('d5')).toContain('Nell');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('cl7')).toContain('onze mille'); // what Diane took this year
    expect(body('cl7')).toContain('Joel Petrie');
    expect(body('b6')).toContain('Sheffield'); // and what she was taking it for
    expect(body('b6')).toContain('onze ans');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La doublure (fr) — the voices', () => {
  /**
   * Beatrice is the only one who writes like a letter. French has no capitalised
   * first person pronoun, so the other four run lowercase all the way down in a
   * way the English cannot quite manage — the exception is a message that opens
   * on somebody's name, which they all capitalise, exactly as the English does.
   */
  it('keeps the voices apart', () => {
    // Plus "Bea", which is what the company calls her to her face and behind it.
    // She signs herself Beatrice; nobody else writes that.
    const names = [...script.characters.map((c) => c.name), 'Bea'];
    const opensOnAName = (text: string): boolean => names.some((n) => text.startsWith(n));

    for (const m of messages) {
      if (m.senderId === 'bea') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else {
        if (!opensOnAName(m.body)) {
          expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        }
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }

    // Nell hedges. It is the difference between her and Dev, who is lowercase for
    // speed rather than fear.
    expect(body('e8c')).toContain('c’est que');
    expect(body('e10')).toContain('je ne sais pas');
    // Dev is lowercase and technical, and he is the one who names the equipment.
    expect(body('d1')).toContain('conduis des spectacles');
  });

  /**
   * The player's gender is never stated, so no participle addressed to them may
   * agree. Beatrice opening b1 with `tu as été occupée` would decide it in the
   * first line of her thread.
   */
  it('keeps the player genderless', () => {
    const atPlayer = [
      script.blurb,
      body('b1'),
      body('b10'),
      body('e1'),
      body('q9'),
      ...(script.confrontation?.deflections ?? []),
      script.confrontation?.opening ?? '',
    ].join('\n');
    expect(atPlayer).not.toMatch(
      /\btu (as été|es|étais|serais) (occupée?|venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(atPlayer).not.toMatch(/\btu t’es (montrée?|assise?)\b/i);
  });
});
