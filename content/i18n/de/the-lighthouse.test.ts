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
import { theLighthouseDe } from './the-lighthouse';

/**
 * The German Lighthouse, checked on the things a player reasons over.
 *
 * The translation is imported directly and applied here rather than looked up
 * through `CASE_TRANSLATIONS`. Registration lives in ../index.ts, which the
 * orchestrator owns and several translators touch at once; a pack that is
 * written but not yet registered would otherwise be a file nobody is checking,
 * and every generic suite — caseText.test.ts, arcAlias.test.ts — skips exactly
 * those. "It passed" would mean "it was skipped".
 *
 * So the generic guarantees are re-asserted here against the file itself, and
 * then the half that lives in words is pinned line by line. Most of this case is
 * spoken time: `zwanzig vor zehn` from Callum at the ramp, `halb neun bis elf`
 * from Mairi behind the counter. A German line that says `neun Uhr` where the
 * English says half eight leaves every structural test green and the case
 * unsolvable by reading, which is the only way anybody solves it.
 */
const english = getCase('the-lighthouse')!;
const script = applyCaseText(english, theLighthouseDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';

/** Everything a player can read, as one blob — the same view arcAlias takes. */
const prose = [...caseTextEntries(script).values()].join('\n');

/**
 * The same, minus the bare entity names. A place proves nothing about the prose
 * by appearing in the table the prose is supposed to agree with.
 */
const spokenProse = [...caseTextEntries(script)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

/**
 * Every engine guarantee, on the translated script rather than the English one.
 * caseText.test.ts runs this over each *registered* translation; running it here
 * means registration cannot be the moment this pack first gets checked.
 */
describeCaseContract(script);

describe('Der Leuchtturm (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLighthouseDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theLighthouseDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLighthouseDe)];

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

  /* ---------------------------------------------------------- the alias */

  /**
   * The one word that has to survive translation, and the one German makes
   * hardest. `der Keeper` is already German for a goalkeeper, so the article
   * has to stay English or the line turns comic; `der Wärter`, `der Hüter` and
   * above all `der Leuchtturmwärter` throw the arc away entirely, and the last
   * of those is tempting precisely because Ruth kept the light.
   *
   * arcAlias.test.ts counts mentions per case and skips anything unregistered,
   * so the count is asserted here too, against the same English it will be
   * compared to later.
   */
  it('leaves the arc alias in English, in both places, exactly as often', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');

    expect(count(englishProse), 'the English stopped using the alias').toBe(2);
    expect(count(prose), 'the German has a different number of alias mentions').toBe(
      count(englishProse),
    );

    // Both of them, named: the caller Mairi describes, and the proof he lied.
    expect(body('n9')).toContain('the Keeper');
    expect(
      script.contradictions.find((c) => c.id === 'x-papers-lie')?.revelation,
    ).toContain('the Keeper');
  });

  it('never reaches for the German words that would kill the arc', () => {
    expect(prose, 'the alias was translated after all').not.toMatch(/wärter|hüter/i);
  });

  /* ------------------------------------------------------------ the clock */

  /**
   * Every load-bearing time, in the message that states it.
   *
   * The pairs the case is won on: Callum at the ramp against Mairi putting him
   * in the café, and Mairi behind the counter against Fiona passing her on the
   * path. Both halves of both pairs are spoken times, so both halves are pinned.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g10: ['um acht'], // the last boat in, 19:00–20:00
      g12: ['zwanzig vor zehn', 'viertel nach'], // the slipway, 21:40–22:15
      m6: ['halb neun', 'um elf'], // the café alibi she gives twice
      m8: ['von neun'], // and the half of it she hangs on Callum
      m11: ['Viertel nach neun'], // the player in the café, 21:05–21:30
      m13: ['zwanzig vor elf'], // cashing up, 22:35–23:00
      m15: ['nach elf'], // the cottage light, 23:00–24:00
      e5: ['von sieben bis halb zehn'], // Fiona in the cottage, 19:00–21:30
      e7: ['21:40', '22:00'], // the lamp, logged in digits
      e10: ['21:47'], // the sighting that breaks her
      k5: ['viertel nach zehn'], // Callum finishes the line
      k6: ['zehn nach zehn'], // Mairi at the door, 22:05–22:15
      k9: ['nach elf'], // and home, washing a coat
      n9: ['Halb zehn'], // the telephone call
    };

    // Case-insensitive: German capitalises a time fragment or not depending on
    // where the sentence breaks, and that is not the fact being pinned here.
    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    // The proofs and the confrontation have to name the same minutes the
    // messages named, or the player is comparing two different stories.
    const revelation = (id: string) =>
      script.contradictions.find((c) => c.id === id)?.revelation ?? '';
    expect(revelation('x-mairi-path')).toContain('21:47');
    expect(revelation('x-mairi-path')).toContain('halb neun bis elf');
    expect(revelation('x-mairi-door')).toContain('zehn nach zehn');

    const beat = (id: string) => script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
    expect(beat('b-path')).toContain('21:47');
    expect(beat('b-door')).toContain('zehn nach zehn');
    expect(script.confrontation?.confession).toContain('halb zehn');
  });

  /**
   * The split that decides the case.
   *
   * Fiona is the only person in Ardnoe who writes a clock down. She beats Mairi
   * because she has a number and everybody else has a memory, and a translation
   * that tidies the village into digits hands the player the answer on the first
   * read. So: digits in Fiona's messages, nowhere else.
   */
  it('lets only Fiona write a clock time in digits', () => {
    for (const message of messages) {
      if (message.senderId === 'esme') continue;
      expect(message.body, `${message.id} prints a clock time`).not.toMatch(/\d{1,2}:\d{2}/);
    }
    expect(body('e7')).toMatch(/\d{2}:\d{2}/);
    expect(body('e10')).toMatch(/\d{2}:\d{2}/);
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

  /* ------------------------------------------------------------ the words */

  /**
   * A chip and a sentence that name a place differently are two places to a
   * player. German declines the article with the case, which is why these are
   * bare compounds: `Bootsrampe` survives `an der Bootsrampe`, where `die
   * Bootsrampe` would not.
   */
  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      slip: 'Bootsrampe',
      path: 'Klippenpfad',
      cottage: 'Häuschen',
      lighthouse: 'Leuchtturm',
      point: 'Ardnoe Point',
      cafe: 'Café',
      ferry: 'Fähre',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toContain(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }

    // The Trust is one stem everywhere, or the motive cannot be assembled from
    // a chip, a message and a confrontation beat that disagree about its name.
    // The motive carries the full institution, `Leuchtturmstiftung Ardnoe`, so
    // the match is on the stem German compounds it into rather than the word.
    for (const text of [
      body('g18'),
      body('g17'),
      script.motives[0]?.summary ?? '',
      script.confrontation?.beats.find((b) => b.id === 'b-why')?.press ?? '',
      chip('c-papers-kept'),
    ]) {
      expect(text.toLowerCase(), 'the Trust is named something else here').toContain('stiftung');
    }
  });

  /**
   * Three notebooks stay three objects. English calls two of them "the
   * notebook"; collapsing them in German would have Fiona writing Ruth's
   * confession, and the epilogue turns on whose hand it was in.
   */
  it('keeps Ruth’s log, Fiona’s log and the officer’s notebook apart', () => {
    expect(body('g17')).toContain('Logbuch'); // Ruth's, still up the tower
    expect(script.solution.epilogue).toContain('Logbuch'); // and what was written in it
    expect(body('e4')).toContain('Beobachtungsprotokoll'); // Fiona's
    expect(body('e13')).toContain('Notizbuch'); // the officer's
  });

  /* ----------------------------------------------------------- the voices */

  /**
   * Five people who text differently, in a language that capitalises every noun.
   *
   * English separates them mostly on capitals and three of these five are
   * lowercase, so lowercase alone cannot carry it here. What separates them:
   * Ruth lowercases common nouns but capitalises people and never lands a full
   * stop; Callum capitalises nothing at all, not even his own mother; the player
   * is lowercase and short.
   */
  it('keeps the voices apart', () => {
    // Callum capitalises nobody. That is the line between him and Ruth.
    for (const m of from('callum')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }

    // Ruth is lowercase and unpunctuated at the end, but people get their capital.
    for (const m of from('ruth')) {
      expect(m.body[0], `${m.id} starts like a written sentence`).toBe(m.body[0]?.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('r3')).toContain('Callum');
    expect(body('r3')).toContain('Mairi');

    // Mairi and Fiona write like adults with a pen.
    for (const m of [...from('mairi'), ...from('esme')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
    }

    // The player is lowercase and short. The shouted WEM is the one exception,
    // and the English shouts it too.
    for (const m of from('you')) {
      expect(m.body[0], `${m.id} is not the player typing`).toBe(m.body[0]?.toLowerCase());
    }
    expect(body('r11')).toContain('WEM');
  });

  /**
   * The player's gender is never stated, and German would state it by accident.
   * Mairi has a son and says so; nothing may attach a gendered noun to the seat
   * the player is sitting in.
   */
  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(
        /\b(Sohn|Tochter|Junge|Mädchen)\b/i,
      );
    }
    // And the seat itself is a pronoun, not a name.
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
