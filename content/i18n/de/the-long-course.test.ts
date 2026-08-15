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
import { theLongCourseDe } from './the-long-course';

/**
 * The German Long Course, checked on the things a player reasons over.
 *
 * Imported directly and applied here rather than looked up through
 * CASE_TRANSLATIONS, so registration is never the moment this pack first gets
 * checked.
 */
const english = getCase('the-long-course')!;
const script = applyCaseText(english, theLongCourseDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((c) => c.id === id)?.revelation ?? '';

const prose = [...caseTextEntries(script).values()].join('\n');
const spokenProse = [...caseTextEntries(script)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

describeCaseContract(script);

describe('Die Langstrecke (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLongCourseDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theLongCourseDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLongCourseDe)];

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
   * Second arc connection, and two mentions this time: the confession where
   * Graham describes the call, and the coda where the caller dares the player to
   * ask how he knew. `der Keeper` alone is German for a goalkeeper, so the
   * English article stays on.
   */
  it('leaves the arc alias in English, exactly as often as the source', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');

    expect(count(englishProse), 'the English stopped using the alias').toBe(2);
    expect(count(prose), 'the German has a different number of alias mentions').toBe(
      count(englishProse),
    );
    expect(script.confrontation?.confession).toContain('the Keeper');
    expect((script.coda?.messages ?? []).join('\n')).toContain('the Keeper');
  });

  it('never reaches for the German words that would kill the arc', () => {
    expect(prose, 'the alias was translated after all').not.toMatch(
      /wärter|hüter|torwart|torhüter/i,
    );
  });

  /* ------------------------------------------------------------- the clock */

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      c3: ['zehn uhr fünfzig', 'zwanzig nach elf'], // the eight boated and back
      c6: ['zwanzig vor elf'], // Carol on the towpath from 10:40
      c7: ['halb zehn'], // the row at the trestles
      d5: ['kurz vor elf'], // Pauline into the boathouse
      d7: ['drei nach'], // Graham into the boathouse, 11:03
      d10: ['halb elf'], // Em in senior kit in the changing room
      g4: ['zwanzig nach zehn'], // Graham asks her, by the trestles
      w4: ['elf uhr acht'], // the four seconds of slipway, said aloud
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-saul-boathouse').toLowerCase()).toContain('drei nach');
    expect(revelation('x-imo-seat').toLowerCase()).toContain('zwanzig nach zehn');
    expect(revelation('x-saul-slipway')).toContain('11:08');
  });

  /**
   * Warren reads a burned-in timecode aloud and says it in words, exactly as the
   * English does. The single digit form belongs to the proof, not the telling —
   * a man saying 11:08 out loud is a machine, and this case turns on the
   * difference between what a machine recorded and what people remember.
   */
  it('keeps the spoken timecode in words and the proof in digits', () => {
    expect(body('w4'), 'Warren started reading digits aloud').not.toMatch(/\d{2}:\d{2}/);
    expect(script.confrontation?.beats.find((b) => b.id === 'l-slipway')?.press).not.toMatch(
      /\d{2}:\d{2}/,
    );
    expect(revelation('x-saul-slipway')).toContain('11:08');

    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a clock time leaked into the prose').toEqual([]);
  });

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

  /**
   * Two people claim the same seat in the same boat for the same twenty two
   * minutes. If those two chips ever stop reading identically the case stops
   * being about identity.
   */
  it('gives Graham and Em the same window in the same boat', () => {
    expect(chip('c-saul-river')).toContain('11:00–11:22');
    expect(chip('c-imo-river')).toContain('11:00–11:22');
    expect(revelation('x-imo-seat').toLowerCase()).toContain('welche acht');
  });

  /* ------------------------------------------------------------- the words */

  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      club: 'Verein',
      boathouse: 'Bootshaus',
      bank: 'Uferweg',
      slipway: 'Slipanlage',
      bar: 'Bar im Vereinsheim',
      river: 'Fluss',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toBe(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }
  });

  /** Em is found by reading, and Carol names her in the message that opens her. */
  it('still names Em in the message that finds her', () => {
    expect(body('d10')).toContain('Emma Kerr');
  });

  /* ----------------------------------------------------------- the voices */

  /**
   * Six voices, three of them lowercase, so casing cannot carry it. Pauline and
   * Carol both write standard prose and are separated by subject; Warren and Em
   * are both lowercase and are separated by vocabulary.
   */
  it('keeps the voices apart', () => {
    // Pauline and Carol write properly and close their sentences.
    for (const m of [...from('hester'), ...from('dilys')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} stopped punctuating`).toBe(true);
    }

    // Graham writes properly and never lands the full stop. c9 is Carol, not him.
    for (const m of from('saul')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }

    // Warren, Em and the player are lowercase and never close a message either.
    for (const m of [...from('warren'), ...from('imo'), ...from('you')]) {
      expect(m.body[0], `${m.id} starts like a written sentence`).toBe(m.body[0]?.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }

    // And the player lowercases its nouns, which the other two do not.
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
  });

  /** Warren thinks in equipment; Em apologises. That is what separates them. */
  it('keeps Warren technical and Em apologetic', () => {
    const warren = from('warren').map((m) => m.body).join('\n');
    expect(warren, 'Warren stopped sounding like the man with the camera').toContain('Timecode');
    expect(warren).toContain('Schlagzahl');

    const em = from('imo').map((m) => m.body).join('\n');
    expect(em, 'Em stopped apologising').toContain('sorry');
  });

  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
