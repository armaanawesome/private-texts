import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import {
  applyCaseText,
  caseTextCoverage,
  caseTextEntries,
  caseTranslationEntries,
} from '../caseText';
import { tutorialDe } from './tutorial';

/**
 * The German tutorial, checked on the things a player reasons over.
 *
 * The translation is imported directly and applied here rather than looked up
 * through `CASE_TRANSLATIONS`. Registration happens in ../index.ts, which the
 * orchestrator owns and several translators touch at once; a pack that is
 * written but not yet registered would otherwise be a file nobody is checking,
 * and "it passed" would mean "it was skipped".
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically. It cannot check the half of the problem that lives in
 * words. The tutorial states most of its times in prose — "ten past three", not
 * 03:10 — and a German line saying `halb vier` there would leave every generic
 * test green and the case unsolvable by reading, which is the only way anybody
 * solves it.
 *
 * So the load-bearing facts are listed. This is deliberately brittle: rewording
 * one of these lines should break a test, because rewording one of these lines
 * is how the case quietly stops working.
 */
const english = getCase('tutorial')!;
const script = applyCaseText(english, tutorialDe);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

describe('Tutorial — Die Backstube (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(tutorialDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, tutorialDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(tutorialDe)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has
      // broken this build twice. The curly one is the house character.
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

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /* ------------------------------------------------------------ the clock */

  /**
   * Every clock time the case turns on, in the message that states it. Roza
   * puts herself on the ovens 03:00–04:00 and Ivy puts her on the square at
   * 03:20; that pair is the whole tutorial. The near-misses need their times
   * too, or they stop being near.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      t3: ['zwei Uhr nachts', 'um drei'], // ovens until the three o clock drop
      r4: ['zwanzig nach zwei', 'vor halb drei'], // the garage run, 02:20–02:45
      r5: ['zwischen drei und vier'], // the alibi she gives twice
      r6: ['zehn nach drei', 'eine halbe Stunde'], // the smoke break, 03:10–03:40
      iv2: ['um fünf'],
      iv4: ['von drei uhr', 'bis nach vier'], // the extractor, 03:00–04:00
      iv5: ['zehn nach drei'], // the near-miss put to Ivy in the player's voice
      iv7: ['zwanzig nach drei'], // the sighting that breaks her
      iv8: ['zwischen drei und vier'],
    };

    // Case-insensitive: a German time fragment is capitalised or not depending
    // on where the sentence breaks, and `Zwischen drei und vier` at the head of
    // a sentence is the same fact as `zwischen drei und vier` inside one. The
    // voice tests below are what hold the capitalisation.
    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    // The confession has to name the same minute Roza's own account named, or
    // the player is reading two different stories about one cigarette.
    expect(script.confrontation?.confession).toContain('zehn nach drei');
    expect(script.contradictions[0]?.revelation).toContain('zwanzig nach drei');
    expect(script.briefing?.opening).toContain('zehn nach vier');
  });

  /**
   * German would happily turn "ten past three" into 03:10 and read better for
   * it. It must not: the tutorial teaches the player to match a spoken time
   * against a printed chip, and a case that prints both has nothing to teach.
   */
  it('keeps the spoken clock out of digits everywhere but the chips', () => {
    for (const thread of script.threads) {
      for (const message of thread.messages) {
        expect(message.body, `${message.id} prints a 24-hour time`).not.toMatch(/\d{1,2}:\d{2}/);
      }
    }

    // And the chips are the only place the digits live, or there is nothing for
    // the spoken times to be matched against.
    const chips = script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? []);
    expect(chips.filter((c) => /\d{2}:\d{2}/.test(c.label))).toHaveLength(chips.length);
  });

  /* ----------------------------------------------------------- the lesson */

  /**
   * The lesson a tutorial usually skips, taught inside the fiction so a player
   * who never pins the pair still meets the rule. tutorial.test.ts asserts the
   * English of this; if the German drops it, German players learn nothing about
   * nested places and read the refusal as a broken board.
   */
  it('has Ivy give the nested-place answer in her own words', () => {
    expect(body('iv6')).toContain('hinterhof is doch die bäckerei');
    // And the player has to have asked the question that provokes it.
    expect(body('iv5')).toContain('die bäckerei nie verlassen');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('t4')).toContain('Umgehungsstraße'); // the corner, from Tom
    expect(body('t4')).toContain('drei Jahre');
    expect(body('iv10')).toContain('stellt'); // handing yourself in, from Ivy
    expect(body('iv10')).toContain('roza');
  });

  /** Roza names Ivy, which is the only reason Ivy's thread appears. */
  it('still names Ivy in the message that finds her', () => {
    expect(body('r8')).toContain('Ivy');
  });

  /* ------------------------------------------------------------- the voices */

  /**
   * Four people who text differently. The register is the characterisation, and
   * it is the first thing a translation flattens.
   *
   * German capitalises every noun, so lowercase is a *louder* signal here than
   * in English rather than a weaker one — but it no longer separates Ivy from
   * the player, because both of them use it. Length does that instead: Ivy runs
   * on for forty words without a comma, the player stops after a handful.
   */
  it('keeps the voices apart', () => {
    // Ivy is nineteen: lowercase against the noun rule, and no commas at all.
    for (const id of ['iv1', 'iv3', 'iv6', 'iv7', 'iv9', 'iv10']) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown adult punctuation`).not.toContain(',');
    }

    // Papa and Roza write in full sentences, capitalised, like adults with a pen.
    for (const id of ['t1', 't3', 't6', 'r1', 'r4', 'r6']) {
      expect(body(id)?.[0], `${id} does not start as a written sentence`).toBe(
        body(id)?.[0]?.toUpperCase(),
      );
    }

    // The player is lowercase like Ivy and short unlike her. Ivy's shortest
    // message is longer than the player's longest, which is what keeps two
    // lowercase voices from reading as one person.
    const words = (id: string) => body(id).split(/\s+/).length;
    const playerLongest = Math.max(...['t2', 't5', 't8', 'r3', 'r7', 'iv2', 'iv8'].map(words));
    const ivyShortest = Math.min(...['iv1', 'iv3', 'iv4', 'iv7', 'iv9', 'iv10'].map(words));
    expect(playerLongest).toBeLessThan(ivyShortest);

    for (const id of ['t2', 't5', 't8', 'r3', 'r7', 'iv2', 'iv8']) {
      expect(body(id), `${id} is not the player typing in the dark`).toBe(body(id).toLowerCase());
    }
  });

  /**
   * The player's gender is never stated in this case, and German is a language
   * that would state it by accident. `Kind` is the neuter address Tom uses; the
   * gendered options a father has for a grown child are all wrong here.
   */
  it('never genders the player', () => {
    expect(body('t3')).toContain('Kind');
    const prose = [
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
      script.briefing?.opening ?? '',
      script.solution.epilogue,
    ].join('\n');
    expect(prose).not.toMatch(/\b(Sohn|Tochter|mein Junge|mein Mädchen)\b/);
  });
});
