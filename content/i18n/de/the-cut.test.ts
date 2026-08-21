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
import { theCutDe } from './the-cut';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Cut, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry.
 *
 * This case is arithmetic: three miles an hour, six miles, five locks, three
 * hours up and three back. Every one of those numbers is true, and they are
 * what hides him. The one number that breaks it — forty minutes on a bicycle —
 * has to survive in the three places it is stated, and no id, number or
 * paragraph check can tell whether it did.
 */
const english = getCase('the-cut')!;
const script = applyCaseText(english, theCutDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const claim = (id: string) => messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id);
const chip = (id: string): string => claim(id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const spokenProse = [...caseTranslationEntries(theCutDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Der Kanal (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theCutDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theCutDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theCutDe)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
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
   * The exclusive group needs its two windows to OVERLAP, not to match. Here
   * `c-nate-bike` (20:20–21:00) is nested inside `c-nate-moored` (19:00–22:00),
   * which is what lets the engine see the collision — a man cannot be moored
   * all evening and on the towpath during it. Asserting they were identical
   * would be asserting a coincidence that this pack does not have.
   */
  it('overlaps the two nate-evening claims rather than matching them', () => {
    const moored = claim('c-nate-moored')!.window;
    const bike = claim('c-nate-bike')!.window;

    expect(moored.start).toBeLessThan(bike.end);
    expect(bike.start).toBeLessThan(moored.end);
    expect(moored.start === bike.start && moored.end === bike.end).toBe(false);

    // The moored claim asserts a state across the whole evening, so it carries
    // no clock at all and the chip rule above skips it.
    expect(digitTimes(chip('c-nate-moored'))).toEqual([]);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Der Kanal (de) — the forty minutes', () => {
  /**
   * The whole case turns on one unit change. Everybody on the water reasons in
   * miles and locks, correctly, and the boat really did sit at Tyrley — so the
   * player gets exactly one chance to notice that a bicycle answers a different
   * question. It is stated three times: Sam says it, the proof repeats it, and
   * the press line puts it to him.
   *
   * Compared lowercased because German declines around it — the press line has
   * `sechs Meilen flachen Treidelpfad` in the accusative and opens the sentence
   * with `Vierzig Minuten` — so the pinned fragments are the two numbers, which
   * survive the declension.
   */
  it('states six miles and forty minutes in all three places', () => {
    const sites: Readonly<Record<string, string>> = {
      'b8 (Sam says it)': body('b8'),
      'x-nate-bike (the proof)': revelation('x-nate-bike'),
      'c-bike (the press line)': press('c-bike'),
    };

    for (const [where, text] of Object.entries(sites)) {
      expect(text.toLowerCase(), `${where} lost the distance`).toContain('sechs meilen');
      expect(text.toLowerCase(), `${where} lost the forty minutes`).toContain('vierzig minuten');
    }
  });

  /** And Sam and the proof say it in the identical sentence, as the English does. */
  it('keeps the sentence itself identical between the witness and the proof', () => {
    const sentence = 'Sechs Meilen flacher Treidelpfad sind vierzig Minuten mit dem Rad.';
    expect(body('b8')).toContain(sentence);
    expect(revelation('x-nate-bike')).toContain(sentence);
  });

  /** The arithmetic everybody else did, and which is true, has to stay true. */
  it('keeps the boat arithmetic that hides him', () => {
    expect(script.blurb).toContain('drei Meilen in der Stunde');
    expect(body('k3').toLowerCase()).toContain('sechs meilen und fünf schleusen');
    expect(body('m6')).toContain('Sechs Meilen. Fünf Schleusen. Drei Stunden hin und drei zurück');
  });
});

describe('Der Kanal (de) — the clock and the machine', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      b2: ['von acht bis ungefähr zwanzig vor zehn'], // Sam-s walk
      b4: ['halb neun'], // Nate on the offside path
      m2: ['halb acht', 'zwanzig nach zwei'], // Tam at the hospital
      g6: ['20:44'], // the key log, the only machine time
      g7: ['von sechs bis sieben'], // Julie in the Junction
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-nate-norbury').toLowerCase()).toContain('halb neun');
    expect(revelation('x-nate-wharf')).toContain('20:44');
    expect(press('c-wharf')).toContain('20:44');
  });

  /**
   * One machine-written time in the pack, and it is the one that convicts him.
   * Everything a person says is spoken, because a canal remembers in halves and
   * quarters and only the gate lock writes a number down.
   */
  it('keeps digits to the key log, the bridge and the years', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a wall clock leaked into somebody speaking').toEqual(['g6']);

    expect(body('k2')).toContain('brücke 39');
    expect(body('b2')).toContain('Brücke 39');
    expect(script.motives[0]?.summary).toContain('2009');
    expect(revelation('x-nate-bike')).toContain('2011');
  });
});

describe('Der Kanal (de) — the places', () => {
  /**
   * Every place name has to appear in the prose with its article intact, on the
   * raw string rather than the folded one. German fuses `an dem` into `am`, so
   * a place named `der Anleger Norbury` would be reachable only as `am Anleger
   * Norbury` and its full name would appear in no sentence — the defect that
   * hid inside the French `au bar du club`. Every name here is a bare noun.
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

  it('uses one word for the towpath on the chip and in the prose', () => {
    for (const id of ['c-bo-towpath', 'c-nate-bike']) {
      expect(chip(id)).toContain('Treidelpfad');
    }
    for (const text of [body('k9'), body('m7'), body('b8'), revelation('x-nate-bike')]) {
      expect(text).toContain('Treidelpfad');
    }
  });

  /** Julie-s boat is named on its own chip, or the chip matches no sentence. */
  it('names Julie-s boat on the chip that claims it', () => {
    expect(chip('c-verity-boat')).toContain('Julies Boot');
  });

  /** Sam is found by reading, and Tam names them in the message that opens it. */
  it('still names Sam in the message that finds them', () => {
    expect(body('m7')).toContain('Sam');
  });
});

describe('Der Kanal (de) — the voices', () => {
  /** The player is the only fully lowercase voice, names included. */
  it('keeps the player lowercase and short', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('v8')).toContain('nate');
    expect(body('b5')).toContain('tyrley');
  });

  /** Julie, Alan and Sam write standard prose and close every sentence. */
  it('keeps Julie, Alan and Sam capitalised and closed', () => {
    for (const who of ['verity', 'gwyn', 'bo'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /**
   * Tam types differently in front of the moorings than one to one. `k2` and
   * `k8` are all lowercase in the group; every message in his own thread is
   * properly written. That is a man being guarded in public and careful in
   * private, and it is the English-s own pattern rather than sloppiness.
   */
  it('keeps Tam guarded in the group and careful in private', () => {
    for (const id of ['k2', 'k8']) {
      expect(body(id), `${id} lost its public register`).toBe(body(id).toLowerCase());
    }
    for (const id of ['m1', 'm2', 'm4', 'm5', 'm6', 'm7']) {
      expect(body(id)[0], `${id} lost its private register`).toBe(body(id)[0]?.toUpperCase());
      expect(body(id).endsWith('.')).toBe(true);
    }
  });

  /**
   * Nate stops closing his sentences the moment he starts defending himself.
   * k3 is the account he has prepared and it lands its full stop; k4, k6 and k7
   * are him getting in front of it and none of them do.
   */
  it('frays Nate-s punctuation exactly where he starts defending himself', () => {
    expect(body('k3').endsWith('.')).toBe(true);
    for (const id of ['k4', 'k6', 'k7']) {
      expect(body(id).endsWith('.'), `${id} closed a sentence Nate leaves open`).toBe(false);
    }
  });

  /** Tam does the sums out loud; Alan testifies; Sam observes a routine. */
  it('separates the three by what each is expert in', () => {
    expect(from('tam').map((m) => m.body).join('\n')).toContain('durchgerechnet');
    const alan = from('gwyn').map((m) => m.body).join('\n');
    expect(alan).toContain('Lizenz');
    expect(alan).toContain('Papierkram');
    expect(from('bo').map((m) => m.body).join('\n')).toContain('derselbe Weg');
  });
});

describe('Der Kanal (de) — the arc', () => {
  /**
   * Third arc connection, one mention, English article intact. Bare `der
   * Keeper` is German for a goalkeeper, which is why the article rides along.
   */
  it('leaves the arc alias in English, exactly as often as the source', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    const germanProse = [...caseTextEntries(script).values()].join('\n');

    expect(count(englishProse), 'the English stopped using the alias').toBe(1);
    expect(count(germanProse)).toBe(count(englishProse));
    expect(script.confrontation?.confession).toContain('the Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });

  /** The new fact this pack adds: he rings back afterwards to ask how it went. */
  it('keeps the follow-up call in both the confession and the coda', () => {
    expect(script.confrontation?.confession).toContain('am Sonntag hat er wieder angerufen');
    expect((script.coda?.messages ?? []).join('\n')).toContain('Ich habe ihn danach angerufen');
  });

  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
