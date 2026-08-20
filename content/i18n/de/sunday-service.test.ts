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
import { sundayServiceDe } from './sunday-service';

/**
 * The German Sunday Service, checked on the things a player reasons over.
 *
 * Imported and applied directly rather than routed through CASE_TRANSLATIONS,
 * so the pack is checked on its own account rather than on the day somebody
 * edits a registry.
 *
 * What no generic test can see here is the voice problem, and this pack inverts
 * the one The Lighthouse had. There, three voices shared lowercase and German
 * noun capitalisation flattened them. Here **five of the six write standard
 * prose and close every sentence with a full stop** — only the player is
 * lowercase. So casing separates exactly one voice out of six and the other
 * five had to be separated on something else entirely.
 *
 * The axis chosen is *domain vocabulary*: what each person is expert in leaks
 * into every sentence they write, and it is the thing a translation flattens
 * first because a translator reaches for the same neutral register for
 * everybody. Avril has the archivist-s nouns (`Nummerierung`, `Linierung`,
 * `Tinte`, `Handschrift`), Grace the institutional ones (`Kirchenordnung`,
 * `Gemeinderat`), Denise the musical ones (`Schwellwerk`, `Klang`), Jack has
 * dates and materials and no interpretation at all, and Pam counts what she has
 * given. The Spanish and Portuguese packs reached a related answer from the
 * other side — what each person *does with a fact* rather than what they know —
 * and either separates the five; this file pins the vocabulary because that is
 * what the German actually carries.
 */
const english = getCase('sunday-service')!;
const script = applyCaseText(english, sundayServiceDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const corpus = (senderId: string) => from(senderId).map((m) => m.body).join('\n');
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];

const spokenProse = [...caseTranslationEntries(sundayServiceDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Der Sonntagsgottesdienst (de) — the contract', () => {
  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(sundayServiceDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, sundayServiceDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(sundayServiceDe)];

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

  /** A chip may name its window, or a single moment inside it. */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of messages.flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends =
        c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (form) => form.join('|') === times.join('|'),
      );
      const pointInside =
        times.length === 1 &&
        toMinutes(times[0]!) >= c.window.start % 1440 &&
        toMinutes(times[0]!) <= c.window.end % 1440;

      expect(
        spansWindow || pointInside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  /**
   * The two register chips carry a date and no clock, on purpose: they sit on a
   * day in March rather than the night of the death. A wall clock on either of
   * them would be inventing a precision the case never claims.
   */
  it('dates the register chips instead of clocking them', () => {
    expect(chip('c-cordy-signed-out')).toContain('11. März');
    expect(digitTimes(chip('c-cordy-signed-out'))).toEqual([]);
    expect(digitTimes(chip('c-cordy-never-register'))).toEqual([]);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Der Sonntagsgottesdienst (de) — one word for the record', () => {
  /**
   * The case is a forged record against a living memory, so the record has one
   * name. German inflects it — `Kirchenbuch` singular, `Kirchenbücher` plural,
   * with the umlaut — so this matches the stem rather than the exact string.
   * Two different words for it would be two documents, and the contradiction is
   * precisely that Pam denied touching the thing she signed out.
   */
  const STEM = /Kirchenb(u|ü)ch/;

  it('calls the register the same thing in every place it matters', () => {
    for (const text of [
      script.blurb,
      body('a1'),
      body('i2'),
      body('i4'),
      chip('c-cordy-signed-out'),
      chip('c-cordy-never-register'),
      revelation('x-cordy-register'),
      press('v-register'),
    ]) {
      expect(text, 'the register got a second name').toMatch(STEM);
    }
  });

  /** And the one volume in question is narrowed inside the same word. */
  it('narrows to the 1974 volume without renaming the record', () => {
    expect(script.briefing?.opening).toContain('Trauungsbuch von 1974');
    expect(script.motives[0]?.summary).toContain('Trauungsbuch von 1974');
    expect(body('i3')).toContain('Band von 1974');
    expect(revelation('x-cordy-register')).toContain('Band von 1974');
  });

  /** The forgery is an entry number and a redrawn line, in all four places. */
  it('keeps the entry number and the redrawn ruling', () => {
    expect(body('a3')).toContain('Eintrag 114');
    expect(body('a3')).toContain('Linierung');
    expect(script.motives[0]?.summary).toContain('114');
    expect(press('v-why')).toContain('114');
    expect(script.solution.epilogue).toContain('Linierung');
  });
});

describe('Der Sonntagsgottesdienst (de) — the clock and the calendar', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p1: ['halb zehn'], // Grace finds her
      p4: ['ab sieben'], // Denise starts tuning
      e3: ['von sieben bis zehn nach acht'], // and is shut in for all of it
      e4: ['zehn nach acht'], // Jack lets her out
      j7: ['zehn nach acht'],
      j9: ['gegen zwanzig vor acht'], // Pam into the vestry
      i3: ['elften märz'], // the volume signed out
      i6: ['zwanzig nach acht'], // the car under the yew
      i8: ['ab sieben'], // Avril in the vestry
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(script.briefing?.opening).toContain('halb zehn');
    expect(revelation('x-cordy-vestry').toLowerCase()).toContain('zwanzig vor acht');
    expect(revelation('x-cordy-carpark').toLowerCase()).toContain('zwanzig nach acht');
    expect(revelation('x-cordy-register').toLowerCase()).toContain('elften märz');
    expect(press('v-vestry').toLowerCase()).toContain('zwanzig vor acht');
  });

  /**
   * Every digit in this case is a year or an entry number. The hours are all
   * spoken, because a village remembers hours and writes down years.
   */
  it('keeps digit clock times out of every message', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a wall clock leaked into the prose').toEqual([]);
  });

  it('keeps the four years that carry the case', () => {
    expect(body('a4')).toContain('1974'); // the wedding that never happened
    expect(body('j4')).toContain('1975'); // and how Jack is sure of the year
    expect(script.confrontation?.confession).toContain('1976'); // when it was really written
    expect(script.confrontation?.opening).toContain('1985'); // and Pam-s forty years
  });
});

describe('Der Sonntagsgottesdienst (de) — the church', () => {
  /**
   * Every place name has to appear in the prose with its article intact, on the
   * raw string rather than the accent-folded one. German fuses `in dem` into
   * `im`, so a place named `das Kirchenschiff` would be reachable only as `im
   * Kirchenschiff` and its full name would appear in no sentence — the defect
   * that hid inside the French `au bar du club`. Every name here is a bare noun
   * for exactly that reason.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const prose = spokenProse.toLowerCase();
    for (const p of script.places) {
      expect(
        prose.includes(p.name.toLowerCase()),
        `no sentence says "${p.name}" — a contraction may have eaten it`,
      ).toBe(true);
    }
  });

  /**
   * `Pams Haus` is named on its own chip rather than left as a bare `zu Hause`.
   * A place whose name appears nowhere is a chip the player cannot match to any
   * sentence, which is the same defect one step earlier.
   */
  it('names Pam-s house on the chip that claims it', () => {
    expect(chip('c-cordy-home')).toContain('Pams Haus');
  });

  it('uses one word for each room on the chip and in the prose', () => {
    for (const id of ['c-avril-nave', 'c-petra-nave', 'c-jack-nave']) {
      expect(chip(id)).toContain('im Kirchenschiff');
    }
    for (const id of ['c-cordy-vestry', 'c-avril-vestry']) {
      expect(chip(id)).toContain('in der Sakristei');
    }
    for (const id of ['c-cordy-carpark', 'c-ines-carpark']) {
      expect(chip(id)).toContain('Kirchenparkplatz');
    }
    expect(chip('c-petra-tower')).toContain('Turm');
  });

  /** Jack is found by reading, and Denise names him in the message that opens him. */
  it('still names Jack in the message that finds him', () => {
    expect(body('e8')).toContain('Jack');
  });
});

describe('Der Sonntagsgottesdienst (de) — the voices', () => {
  const WRITERS = ['avril', 'cordy', 'ines', 'jack', 'petra'] as const;

  /**
   * Five of the six write standard prose and close every sentence. Avril-s
   * opening message is a question and ends on one, which the English does too.
   */
  it('keeps all five adult voices capitalised and closed', () => {
    for (const who of WRITERS) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(/[.?]$/.test(m.body), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /** And the player is the only lowercase voice, nouns included. */
  it('keeps the player lowercase and unclosed', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('a5')).toContain('pam hale');
    expect(body('a9')).toContain('avril');
  });

  /**
   * So the five are separated by what they are expert in. This is the load
   * these tests actually carry: casing tells you the player from everybody
   * else, and nothing else, and a translation that reached for one neutral
   * register would pass every other check in this file.
   */
  it('gives Avril the archivist-s vocabulary', () => {
    const avril = corpus('avril');
    expect(avril).toContain('Nummerierung');
    expect(avril).toContain('Linierung');
    expect(avril).toContain('Handschrift');
    expect(avril).toContain('Tinte');
  });

  it('gives Grace the institutional vocabulary', () => {
    const grace = corpus('ines');
    expect(grace).toContain('Kirchenordnung');
    expect(grace).toContain('Gemeinderat');
  });

  it('gives Denise the musician-s vocabulary', () => {
    const denise = corpus('petra');
    expect(denise).toContain('Schwellwerk');
    expect(denise).toContain('Klang');
    expect(denise).toContain('Organistin');
  });

  /**
   * Jack has the shortest sentences in the pack and refuses interpretation on
   * purpose. That refusal is his whole function — he is the only witness who
   * reports rather than explains, which is why the case can rest on him.
   */
  it('keeps Jack concrete and non-interpreting', () => {
    const jack = corpus('jack');
    expect(jack).toContain('Ich sage nicht, was es bedeutet. Ich sage, wo sie war.');
    expect(jack).toContain('Juniwoche');
    expect(jack).toContain('geregnet');
  });

  it('keeps Pam counting what she is owed', () => {
    const pam = corpus('cordy');
    expect(pam).toContain('Zweiundzwanzig Jahre hat sie dieser Kirche gegeben');
    // She is also the only one who puts somebody else somewhere.
    expect(pam).toContain('Du warst den größten Teil dieses Abends im Kirchenschiff');
  });

  /**
   * Grace is a woman and the English calls her `the vicar` twice. German has to
   * choose, and the masculine would quietly change who was standing beside Pam
   * when she lied to the police.
   */
  it('keeps the vicar female', () => {
    expect(revelation('x-cordy-register')).toContain('Pfarrerin');
    expect(press('v-register')).toContain('Pfarrerin');
  });
});

describe('Der Sonntagsgottesdienst (de) — the arc', () => {
  /** Pack 8 is standalone. Nothing here may start the arc early. */
  it('introduces no arc alias where the English has none', () => {
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    const germanProse = [...caseTextEntries(script).values()].join('\n');
    expect(englishProse).not.toContain('Keeper');
    expect(germanProse).not.toContain('Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });

  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
