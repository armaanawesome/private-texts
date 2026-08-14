import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextCoverage,
  caseTextEntries,
  caseTranslationEntries,
} from '../caseText';
import { theUnderstudyDe } from './the-understudy';

/**
 * The German Understudy, checked on the things a player reasons over.
 *
 * The translation is imported directly and applied here rather than looked up
 * through `CASE_TRANSLATIONS`. Registration lives in ../index.ts, which the
 * orchestrator owns and several translators touch at once, and every generic
 * suite skips whatever is not registered yet — so without this file, "it
 * passed" would mean "it was skipped".
 */
const english = getCase('the-understudy')!;
const script = applyCaseText(english, theUnderstudyDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((c) => c.id === id)?.revelation ?? '';
const beat = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

/** Everything a player can read, minus the bare entity names. */
const spokenProse = [...caseTextEntries(script)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

/** Every engine guarantee, on the translated script rather than the English. */
describeCaseContract(script);

describe('Die Zweitbesetzung (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theUnderstudyDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theUnderstudyDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theUnderstudyDe)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const spoken = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of spoken) {
      expect(
        seen.get(value),
        `${path} repeats the prose at ${seen.get(value) ?? ''}`,
      ).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number and every paragraph the English states', () => {
    const numbers = (t: string) => (t.match(/\d+/g) ?? []).sort();
    const paragraphs = (t: string) => t.split(/\n{2,}/).length;
    const translated = caseTextEntries(script);

    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /* ---------------------------------------------------------------- the key */

  /**
   * The locked room rests on one object having exactly one name. Two names for
   * one key is two keys to a player, and the room stops being locked.
   */
  it('gives the key one name on both chips and in the proof', () => {
    expect(script.objects.find((o) => o.id === 'key1')?.name).toBe('Garderobenschlüssel');
    for (const id of ['c-key-dev', 'c-key-bea']) {
      expect(chip(id), `${id} names the key something else`).toContain('Garderobenschlüssel');
    }
    expect(revelation('x-key')).toContain('Garderobenschlüssel');

    // The red tag is how Nell knows which key it is, so it survives everywhere
    // the English carries it.
    for (const text of [body('e7'), revelation('x-key'), beat('u-key'), script.solution.epilogue]) {
      expect(text, 'the red tag is missing').toContain('Anhänger');
    }
  });

  /* ------------------------------------------------------------- the clock */

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      q4: ['halb acht'], // Nell is called for 19:30
      q11: ['um sieben'], // Diane texted at seven
      q14: ['zehn nach acht'], // where Nell was stood, 20:10
      d3: ['20:12'], // the train Dev went down for
      d4: ['20:12', '20:51', 'vierzig Minuten'], // and the train that actually came
      d5: ['fünf nach acht'], // Nell in the corridor, 20:05
      d7: ['zwölf nach acht', 'zwanzig nach acht'], // Beatrice down and back, 20:12–20:22
      d8: ['zehn nach acht'], // Diane goes down, 20:10
      d9: ['zwanzig nach acht'],
      e4: ['fünf nach acht', 'zwölf nach acht'], // Nell's own window, 20:05–20:12
      e5: ['zwanzig vor neun'], // on stage, 20:40
      e7: ['zehn nach acht'], // Beatrice with the key, 20:10
      b2: ['fünf nach acht', 'J14'], // the seat she puts herself in
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-bea-corridor').toLowerCase()).toContain('zwölf nach acht');
    expect(revelation('x-bea-corridor').toLowerCase()).toContain('zwanzig nach acht');
    expect(revelation('x-bea-corridor')).toContain('J14');
    expect(revelation('x-dev-train')).toContain('20:12');
    expect(revelation('x-dev-train')).toContain('20:51');
    expect(beat('u-corridor')).toContain('J14');
  });

  /**
   * German cannot leave the hour implicit the way English can, so "ten past"
   * had to become `zehn nach acht`. That is the same minute said in full — but
   * it must not become 20:10, because the only digits in this village are the
   * two train times and a seat number, and those three are what Dev is cleared
   * by and what Beatrice is caught by.
   */
  it('keeps digits to the two trains, and words everywhere else', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a clock time leaked into the spoken prose').toEqual(['d3', 'd4']);
  });

  /** Every chip carries the window the engine actually reasons over. */
  it('gives every claim chip the times the engine holds', () => {
    const clock = (m: number) =>
      `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

    for (const claim of messages.flatMap((m) => m.claims ?? [])) {
      const found = claim.label.match(/\b\d{2}:\d{2}\b/g) ?? [];
      if (found.length === 0) continue;
      const end = claim.window.end % 1440 === 0 ? '24:00' : clock(claim.window.end);
      const acceptable = [[clock(claim.window.start)], [clock(claim.window.start), end]];
      expect(
        acceptable.some((form) => form.join('|') === found.join('|')),
        `chip ${claim.id} says ${found.join('–')} but the engine holds ` +
          `${clock(claim.window.start)}–${clock(claim.window.end)}`,
      ).toBe(true);
    }
  });

  /* ------------------------------------------------------------- the places */

  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      stage: 'Bühne',
      auditorium: 'Zuschauerraum',
      corridor: 'Garderobengang',
      stagedoor: 'Bühneneingang',
      station: 'Bahnhof',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toBe(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }
  });

  /**
   * Nell is found by reading, not by proving. Dev names her twice before her
   * thread opens; a translation that stopped naming her would open a
   * conversation with a stranger.
   */
  it('still names Nell in the messages that find her', () => {
    expect(body('q14')).toContain('Nell');
    expect(body('d5')).toContain('Nell');
  });

  /* ------------------------------------------------------------- the voices */

  /**
   * Five voices, and this pack needed a different axis from The Lighthouse.
   *
   * There, three voices were lowercase and I split them on whether they
   * capitalise people. That does not work here: the English gives Diane, Dev and
   * Nell identical casing and separates them only by a capital I, which German
   * does not have. So the load moved to two other places.
   *
   * The casing rule that survives: Beatrice is the only voice in standard
   * orthography, and she is the only one who ends a message with a full stop.
   * The player is the only voice that lowercases its *nouns*, which in German
   * breaks a rule the other four keep.
   */
  it('keeps the voices apart', () => {
    const NAMES = /^(Diane|Beatrice|Bea|Dev|Nell|Joel)\b/;

    // The player lowercases everything, nouns included. Unmistakable in German.
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }

    // Diane, Dev and Nell lowercase the sentence start but keep their nouns —
    // and start with a capital only when the first word is somebody's name.
    for (const m of [...from('coral'), ...from('dev'), ...from('nell')]) {
      const startsLower = m.body[0] === m.body[0]?.toLowerCase();
      expect(
        startsLower || NAMES.test(m.body),
        `${m.id} starts like a written sentence`,
      ).toBe(true);
    }

    // Beatrice writes like a director dictating a letter, and is the only one
    // who punctuates the end of a message.
    for (const m of from('bea')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} stopped landing its full stop`).toBe(true);
    }
    for (const m of [...from('coral'), ...from('dev'), ...from('nell'), ...from('you')]) {
      expect(m.body.endsWith('.'), `${m.id} lands a full stop like Beatrice`).toBe(false);
    }
  });

  /**
   * And the three casual voices are separated from each other by register
   * rather than casing: Dev is the Inspizient and types like one, Nell hedges.
   */
  it('keeps Dev technical and Nell hedging', () => {
    const dev = from('dev').map((m) => m.body).join('\n');
    expect(dev, 'Dev stopped sounding like the man who calls the show').toContain(
      'Inspizientenpult',
    );
    expect(dev).toContain('Einsätze');

    const nell = from('nell').map((m) => m.body).join('\n');
    expect(nell, 'Nell stopped hedging').toContain('ich weiß nicht');
    expect(nell).toContain('irgend');
  });

  /** The player's gender is never stated, and German would state it by accident. */
  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
