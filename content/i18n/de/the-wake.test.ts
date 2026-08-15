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
import { theWakeDe } from './the-wake';

/**
 * The German Wake, checked on the things a player reasons over.
 *
 * Imported directly and applied here rather than looked up through
 * CASE_TRANSLATIONS, so registration is never the moment this pack first gets
 * checked.
 */
const english = getCase('the-wake')!;
const script = applyCaseText(english, theWakeDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((c) => c.id === id)?.revelation ?? '';

const spokenProse = [...caseTextEntries(script)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

/**
 * Minutes past the case epoch, wrapped into a wall clock.
 *
 * This epoch is weeks long — funeral day is day 43, so 16:00 is minute 61440,
 * and the two chemist claims sit three weeks before that. Without the wrap
 * every chip in the pack reads as a mismatch.
 */
function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

describeCaseContract(script);

describe('Die Totenwache (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theWakeDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theWakeDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theWakeDe)];

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

  /* ------------------------------------------------------- the one sentence */

  /**
   * The shield is one sentence, rehearsed, and the player is meant to notice
   * that four people say the identical thing. If German varied the phrasing for
   * elegance it would read as four opinions instead of one agreement, and the
   * whole shape of the case would go.
   */
  it('says the collective alibi in the same words every time', () => {
    for (const id of ['f4', 'f6', 'r8', 'u2']) {
      expect(body(id).toLowerCase(), `${id} paraphrased the shield`).toContain('im vorderzimmer');
    }
    expect(body('f6').toLowerCase()).toContain('wir waren alle im vorderzimmer');
    expect(body('u2').toLowerCase()).toContain('wir waren alle im vorderzimmer');
    // And Donal repeats it back to himself when he confesses.
    expect(script.confrontation?.confession.toLowerCase()).toContain('wir waren alle im vorderzimmer');
  });

  /* ------------------------------------------------------------- the clock */

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      f4: ['ab vier'], // the speeches, 16:00
      r3: ['zehn nach vier'], // Eileen goes for glasses, 16:10
      k4: ['ab vier'], // Cass out the side from 16:00
      k5: ['zehn nach'], // Donal comes out, 16:10
      u4: ['zehn nach elf'], // the last prescription
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-donal-garden').toLowerCase()).toContain('zehn nach vier');
    expect(revelation('x-donal-glasses').toLowerCase()).toContain('zehn nach vier');
    // The step, and the only year in the case.
    expect(script.confrontation?.confession).toContain('1994');
  });

  /** The epoch is weeks long, so every one of these needs the wrap. */
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
    // The two that sit three weeks earlier, at the chemist.
    expect(chip('c-donal-collected')).toContain('10:00–12:00');
    expect(chip('c-donal-scripts')).toContain('09:00–13:00');
  });

  it('keeps digits out of the spoken prose', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a clock time leaked into the prose').toEqual([]);
    // The only digits anybody says out loud are the dose and the year.
    expect(body('y4')).toContain('5mg');
  });

  /* ------------------------------------------------------------- the words */

  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      house: 'Haus',
      frontroom: 'Vorderzimmer',
      kitchen: 'Küche',
      gardenroom: 'Gartenzimmer',
      sidereturn: 'Seitengang',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toBe(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }
  });

  /** Cass is found by reading. Eileen names her three messages before the gate. */
  it('names Cass in the conversation that finds her', () => {
    expect(body('r7')).toContain('Cassie');
    expect(body('r10').toLowerCase()).toContain('rede mit ihr');
  });

  /* ----------------------------------------------------------- the voices */

  /**
   * Six voices, and in German the axis is punctuation, because everybody
   * capitalises their nouns. Eileen closes every message with a full stop and
   * Maureen never does — same generation, same manners, one character apart.
   */
  it('keeps the voices apart', () => {
    for (const m of from('bridie')) {
      expect(m.body.endsWith('.'), `${m.id} stopped closing its sentence`).toBe(true);
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
    }

    // Maureen writes properly and never lands the full stop. f12 is her one
    // one-word rebuke and the English punctuates that too.
    for (const m of from('nuala')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      if (m.id === 'f12') continue;
      expect(m.body.endsWith('.'), `${m.id} lands a full stop like Eileen`).toBe(false);
    }

    // Tony and Donal lowercase the sentence start and do not close it.
    for (const m of [...from('tony'), ...from('donal')]) {
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }

    // Cass and the player are both lowercase throughout, including their nouns.
    for (const m of [...from('cass'), ...from('you')]) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
  });

  /**
   * Cass at k1 is four words long, so length cannot separate her from the
   * player. Clipping and family words do: she is the only one who says `oma`,
   * `onkel` and `opa`, and the only one who clips.
   */
  it('keeps Cass clipped and the player plain', () => {
    const cass = from('cass').map((m) => m.body).join('\n');
    expect(cass).toContain('oma');
    expect(cass).toContain('onkel');
    expect(cass).toMatch(/\bne\b|\bhab\b/);

    const you = from('you').map((m) => m.body).join('\n');
    expect(you, 'the player picked up Cass-s clipping').not.toMatch(/\boma\b|\bonkel\b|\bopa\b/);
  });

  /**
   * `Answer him, Donal` at f9 genders the player in the English. German drops
   * the pronoun and keeps the directedness.
   */
  it('never genders the player', () => {
    expect(body('f9')).toBe('Antworte auf die Frage, Donal.');
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
