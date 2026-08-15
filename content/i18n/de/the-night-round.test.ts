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
import { theNightRoundDe } from './the-night-round';

/**
 * The German Night Round, checked on the things a player reasons over.
 *
 * The translation is imported directly and applied here rather than looked up
 * through `CASE_TRANSLATIONS`, so that registration is never the moment this
 * pack first gets checked.
 */
const english = getCase('the-night-round')!;
const script = applyCaseText(english, theNightRoundDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const revelation = (id: string): string =>
  script.contradictions.find((c) => c.id === id)?.revelation ?? '';
const beat = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

/** Everything a player can read, as one blob — the same view arcAlias takes. */
const prose = [...caseTextEntries(script).values()].join('\n');

/** The same, minus the bare entity names. */
const spokenProse = [...caseTextEntries(script)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

/**
 * Minutes past the case epoch, wrapped into a wall clock.
 *
 * The wrap is the whole point in this pack. This is a night shift and the
 * engine holds these windows as raw minutes past the case-s zero, so Margo at
 * the night desk is 1500–1560 rather than 60–120. Dividing by 60 without the
 * modulo prints `25:00` and every post-midnight chip reads as a mismatch
 * against a chip that is perfectly correct.
 */
function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** Every engine guarantee, on the translated script rather than the English. */
describeCaseContract(script);

describe('Die Nachtrunde (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightRoundDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theNightRoundDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightRoundDe)];

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

  /* ----------------------------------------------------------------- arc */

  /**
   * Pack 3 is where the arc first pays off, so this is the mention that has to
   * land. `der Keeper` is German for a goalkeeper, which is why the English
   * article stays on: it marks the phrase as a foreign name instead of a noun
   * the language already owns.
   */
  it('leaves the arc alias in English, exactly as often as the source', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');

    expect(count(englishProse), 'the English stopped using the alias').toBe(1);
    expect(count(prose), 'the German has a different number of alias mentions').toBe(
      count(englishProse),
    );
    expect(script.confrontation?.confession).toContain('the Keeper');
  });

  it('never reaches for the German words that would kill the arc', () => {
    expect(prose, 'the alias was translated after all').not.toMatch(
      /wärter|hüter|torwart|torhüter/i,
    );
  });

  /**
   * He is running a disguise, and in German the disguise is audible. A stranger
   * claiming to be from the continuing care team says `Sie`; if he said `du`,
   * the reason Ali believed him would stop existing. It is the one deliberate
   * `Sie` in the pack.
   */
  it('has the caller address Ali formally, and the player informally', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession, 'the caller dropped into du and stopped sounding official').toContain(
      'Sie haben darüber nachgedacht',
    );

    // The coda is the same man with the disguise off, texting the player direct.
    const coda = (script.coda?.messages ?? []).join('\n');
    expect(coda).toContain('du');
    expect(coda, 'the coda went formal').not.toMatch(/\bSie\b/);
  });

  /* ------------------------------------------------------------- the clock */

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      i4: ['um sieben'], // Alison arrives, 19:00
      g4: ['zehn nach zehn'], // the last message Ivy ever sent
      g6: ['zwanzig vor zehn', 'viertel nach', 'halb elf'], // signed out, home, bed
      g7: ['halb elf'], // asleep from 22:30
      m3: ['elf und zwei'], // the two rounds she signs for
      m9: ['von eins'], // the medicines book, 01:00
      t3: ['zehn vor zehn'], // Ivy leaves the day room, 21:50
      t6: ['fünf vor elf', 'zwanzig nach elf'], // Margo at the desk, not upstairs
      t8: ['zwanzig vor zwölf', 'halb zwölf'], // the daughter, and Ivy-s door
      s3: ['23:47'], // the fob, which is a machine
      s5: ['2021'], // the power of attorney
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-fen-corridor').toLowerCase()).toContain('zwanzig vor zehn');
    expect(revelation('x-fen-corridor').toLowerCase()).toContain('halb zwölf');
    expect(revelation('x-fen-asleep').toLowerCase()).toContain('halb elf');
    expect(revelation('x-fen-carpark')).toContain('23:47');
    expect(beat('r-carpark')).toContain('23:47');
    expect(beat('r-corridor').toLowerCase()).toContain('halb zwölf');
  });

  /**
   * British `half ten` is 22:30 and German `halb elf` is the same minute, so the
   * idiom moves and the minute does not. Getting this backwards is the single
   * easiest way to make the case unsolvable while every engine test stays green:
   * `halb zehn` would put Ali in bed an hour early and quietly clear her.
   */
  it('moves the half-past idiom without moving the minute', () => {
    for (const id of ['g6', 'g7']) {
      expect(body(id).toLowerCase(), `${id} shifted Ali to bed an hour early`).not.toContain(
        'halb zehn',
      );
    }
    expect(body('t8').toLowerCase(), 't8 shifted Ivy-s door an hour early').not.toContain(
      'halb elf',
    );
  });

  /** Only machines and records carry digits. Everything a person remembers is words. */
  it('keeps digits to the fob, the year and Ivy-s last ledger line', () => {
    const withDigits = messages.filter((m) => /\d/.test(m.body)).map((m) => m.id);
    expect(withDigits.sort(), 'a digit leaked into somebody-s memory').toEqual(['s3', 's5']);
    expect(script.solution.epilogue).toContain('7 Uhr abends');
  });

  /**
   * Every chip carries the window the engine actually holds — including the two
   * that run past midnight, which is what the wrapping clock above is for.
   */
  it('gives every claim chip the times the engine holds', () => {
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

  /** And the post-midnight chips specifically, since those are the ones that rot. */
  it('reads the after-midnight windows as after midnight', () => {
    const chipFor = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
    expect(chipFor('c-margo-office')).toContain('01:00–02:00');
    expect(chipFor('c-teddy-dayroom')).toContain('23:00–00:30');
  });

  /* ------------------------------------------------------------- the words */

  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      dayroom: 'Aufenthaltsraum',
      desk: 'Nachtdienstplatz',
      carpark: 'Parkplatz',
      corridor: 'Flur im ersten Stock',
      marchbank: 'Marchbank House',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toBe(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }

    // The fob is the proof that is a machine rather than a person, so it has one
    // name in the message, the proof and the beat that presses it.
    for (const text of [body('s2'), body('s3'), revelation('x-fen-carpark'), beat('r-carpark')]) {
      expect(text, 'the fob is called something else here').toContain('ransponder');
    }
  });

  /** Teddy is found by reading, so Margo has to go on naming him. */
  it('still names Teddy in the message that finds him', () => {
    expect(body('g9')).toContain('Teddy');
  });

  /* ----------------------------------------------------------- the voices */

  /**
   * Pack 3 inverts Pack 1. There, three voices shared lowercase and German noun
   * capitalisation flattened the difference. Here four of the six write standard
   * prose and only the player is lowercase, so the casing axis was never doing
   * the work and loses nothing in German.
   *
   * Margo is the one who needs a marker, and hers is punctuation rather than
   * capitals: she never lands a full stop at the end of a message. That crosses
   * into German untouched.
   */
  it('keeps the voices apart', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }

    for (const m of from('margo')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} lands a full stop like the others`).toBe(false);
    }

    // Ivy, Ali, Teddy and Claire all write properly and all punctuate the end.
    for (const m of [...from('ivy'), ...from('fen'), ...from('teddy'), ...from('saoirse')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} stopped punctuating`).toBe(true);
    }
  });

  /** Teddy gives times without being asked; Claire talks like a registration. */
  it('keeps Teddy exact and Claire institutional', () => {
    const teddy = from('teddy').map((m) => m.body).join('\n');
    expect(teddy, 'Teddy stopped being the man who does not guess').toContain('Uhrzeit');

    const claire = from('saoirse').map((m) => m.body).join('\n');
    expect(claire).toContain('Zulassung');
    expect(claire).toContain('Gefährdungsmeldung');
  });

  /**
   * The player is unmarked. The English used to say `Ivy-s godson` here and was
   * changed to name the relationship from Ivy-s side; the German follows it.
   */
  it('never genders the player', () => {
    expect(body('m1')).toContain('Ivy war deine Patentante');
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(
        /\b(sohn|tochter|patensohn|patentochter|junge|mädchen)\b/i,
      );
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
