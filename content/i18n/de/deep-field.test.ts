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
import { deepFieldDe } from './deep-field';

/**
 * The German Deep Field, checked on the things a player reasons over.
 *
 * Imported directly and applied here rather than looked up through
 * CASE_TRANSLATIONS, so registration is never the moment this pack first gets
 * checked.
 */
const english = getCase('deep-field')!;
const script = applyCaseText(english, deepFieldDe);

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

/** Minutes past the case epoch, wrapped into a wall clock. */
function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

describeCaseContract(script);

describe('Deep Field (de)', () => {
  /* --------------------------------------------------------- completeness */

  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(deepFieldDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, deepFieldDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(deepFieldDe)];

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

  /* ---------------------------------------------------------- which clock */

  /**
   * The whole case. The platform log is in UTC, the station runs UTC+3, and the
   * entry everybody treated as Mal-s alibi therefore covers three hours after
   * Laura was already dead. Both words have to stay sharp and neither may drift
   * into the other.
   */
  it('keeps UTC and station time as two different clocks', () => {
    expect(body('p2')).toContain('UTC');
    expect(body('p3')).toContain('Stationszeit ist UTC plus drei');
    // The converted entry, in words, three hours after the porch.
    expect(body('p3')).toContain('21:45');
    expect(body('p3').toLowerCase()).toContain('viertel vor eins');
    expect(body('p4')).toContain('nicht sein Alibi');
    // And Erik is the one who tells the player to ask which clock it keeps.
    expect(body('n6').toLowerCase()).toContain('welche uhr');
  });

  /**
   * `c-mal-log` runs past midnight, so anything reading these chips has to wrap
   * at 1440 or it prints 24:45 and calls a correct chip wrong.
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
    expect(chip('c-mal-log')).toContain('00:45–01:30');
  });

  /* ------------------------------------------------------------- the clock */

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      w1: ['02:10'], // Maria records the finding, machine-precise
      w4: ['viertel vor zehn'], // Mal puts himself on the platform, 21:45
      w6: ['zehn nach'], // Theo sees him in the block, 22:00
      h2: ['von neun bis elf'], // Theo in the mess, 21:40–23:00
      h4: ['viertel nach zehn'], // Laura through the porch, 22:10
      n1: ['zehn nach zwei'], // Erik finds her
      n4: ['zehn vor zehn', 'halb elf'], // the radio call, 21:50–22:30
      p3: ['21:45'],
      p6: ['22:35', '22:44'], // the card readings
      p9: ['halb zehn'], // Maria in the block from 21:30
      v2: ['zweiundzwanzig Uhr elf'], // the camera, read aloud by a person
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-mal-porch')).toContain('22:11');
    expect(revelation('x-mal-surgery')).toContain('22:35');
    expect(revelation('x-mal-surgery')).toContain('22:44');
  });

  /**
   * Machines write digits and people say words, and the gap between those two
   * registers is what the case is about. Theo reading the camera clock aloud at
   * v2 says it in words on purpose — he is a person reading a machine.
   */
  it('keeps digit clock times to the machine records', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock.sort(), 'a clock time leaked into somebody speaking').toEqual([
      'p3',
      'p6',
      'w1',
    ]);
    expect(body('v2'), 'the camera time stopped being read aloud').not.toMatch(/\d{2}:\d{2}/);
  });

  /* ------------------------------------------------------------- the words */

  it('calls each place the same thing on the chip and in the prose', () => {
    for (const [placeId, spoken] of Object.entries({
      station: 'Station',
      block: 'Wohntrakt',
      mess: 'Messe',
      surgery: 'Ambulanz',
      coldporch: 'Kälteschleuse',
      outside: 'Draußen',
      telescope: 'Instrumentenplattform',
      metmast: 'Wettermast',
    })) {
      expect(script.places.find((p) => p.id === placeId)?.name, placeId).toBe(spoken);
      expect(spokenProse.toLowerCase(), `${placeId} is never said in the prose`).toContain(
        spoken.toLowerCase(),
      );
    }
  });

  /** Theo names Erik before Erik is reachable. */
  it('still names Erik in the message that finds him', () => {
    expect(body('h8')).toContain('Erik');
  });

  /* ----------------------------------------------------------- the voices */

  it('keeps the voices apart', () => {
    // Erik never types. Every message he sends is a voice note, and the prefix
    // is doing the work three other markers would.
    for (const m of from('rune')) {
      if (m.senderId !== 'rune') continue;
      expect(m.body.startsWith('[Sprachnachricht,'), `${m.id} stopped being a voice note`).toBe(
        true,
      );
    }

    // The player lowercases everything, names included.
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }

    // Laura and Theo lowercase the sentence start and never land a full stop.
    for (const m of [...from('orla'), ...from('theo')]) {
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }

    // Mal and Maria write standard prose and punctuate it.
    for (const m of [...from('mal'), ...from('pilar')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} stopped punctuating`).toBe(true);
    }
  });

  /** Laura reasons and Theo notices; that is what separates two identical casings. */
  it('keeps Laura clinical and Theo concrete', () => {
    expect(from('orla').map((m) => m.body).join('\n')).toContain('vorhofflimmern');
    const theo = from('theo').map((m) => m.body).join('\n');
    expect(theo).toContain('Innenstiefel');
    expect(theo).toContain('Brot');
  });

  /**
   * The English confrontation opens `a radio link and a man in Cambridge`, which
   * is Mal describing the player. Third person, so playerNeutral.test.ts does
   * not catch it; German says `jemand in Cambridge` instead.
   */
  it('never genders the player', () => {
    expect(script.confrontation?.opening).toContain('jemand in Cambridge');
    expect(script.confrontation?.opening).not.toMatch(/ein Mann in Cambridge/);
    expect(script.briefing?.opening).not.toMatch(/\b(Sachbearbeiter|Sachbearbeiterin)\b/);
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
