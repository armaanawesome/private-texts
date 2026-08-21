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
import { theBothyDe } from './the-bothy';
import { clock, digitTimes } from '../testkit';

/**
 * The German Bothy, checked on the things a player reasons over.
 *
 * Imported and applied directly rather than routed through CASE_TRANSLATIONS,
 * so the pack is checked on its own account rather than on the day somebody
 * edits a registry.
 *
 * The rest is what no generic test can see. This pack is about *order* rather
 * than clock — nobody in that building owns a watch that agrees with anybody
 * else-s — so the times are deliberately approximate and the approximation is
 * load-bearing. Firming `gegen zehn vor sieben` into a bare hour leaves every
 * id, number and paragraph check green while quietly handing five people a
 * precision the story says twice that they do not have.
 */
const english = getCase('the-bothy')!;
const script = applyCaseText(english, theBothyDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const chip = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
/** Prose only — the entity name tables prove nothing about the sentences. */
const spokenProse = [...caseTranslationEntries(theBothyDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Die Schutzhütte (de) — the contract', () => {
  it('translates exactly the ids the English case has, and all of them', () => {
    const englishKeys = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theBothyDe).keys());

    expect([...englishKeys].filter((k) => !translated.has(k)), 'missing').toEqual([]);
    expect([...translated].filter((k) => !englishKeys.has(k)), 'extra').toEqual([]);
    expect(caseTextCoverage(english, theBothyDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theBothyDe)];

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

  /**
   * A chip may state the window it covers, or a single moment inside it.
   *
   * `c-keir-book-late` is the second kind: he signed at 21:40 and the engine
   * holds 20:00–22:00, because it shares that window with `c-keir-book-early`
   * and an exclusive group needs overlapping windows for the engine to see the
   * collision. The window is machinery; each label names what was asserted, and
   * `um 21:40` against `um 20:00` *is* the contradiction. A stricter draft of
   * this rule demanded the window bounds and failed `the-bothy` in English too,
   * which is how it was established that the rule was wrong and not the pack.
   */
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

  /** And the pair that convicts him states two different minutes, not one window. */
  it('lets the two book chips name their two different minutes', () => {
    expect(chip('c-keir-book-late')).toContain('21:40');
    expect(chip('c-keir-book-early')).toContain('20:00');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Die Schutzhütte (de) — order, not clock', () => {
  /**
   * The building has no clock, and Anne says so. If that line goes, the player
   * has no reason to treat five contradictory accounts as anything but sloppy.
   */
  it('keeps the line that tells the player there is no clock', () => {
    expect(body('m2')).toContain('keine Uhr');
    expect(body('m2')).toContain('du weißt nicht, wie spät es ist');
    expect(script.briefing?.opening).toContain('eine Uhr, die mit der von irgendwem sonst');
  });

  /**
   * Every time in this pack is hedged, because every time is somebody guessing.
   * These are the hedges themselves rather than the hours — an edit that firms
   * `gegen zehn vor sieben` into `um zehn vor sieben` passes every generic check
   * and silently gives the witnesses a precision the case denies them twice.
   */
  it('keeps the approximation on the times that are guesses', () => {
    expect(body('p4')).toContain('ab ungefähr zwanzig vor sieben');
    expect(body('m3')).toContain('gegen sechs');
    expect(body('m6')).toContain('gegen zehn vor sieben');
    expect(body('h6')).toContain('gegen viertel nach sieben');
    expect(body('p5')).toContain('gegen elf');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p3: ['zwanzig vor zehn'], // Iain-s claimed arrival
      p4: ['zwanzig vor sieben'], // and the three hours he claims on the path
      p5: ['ab sechs'], // Anne in the main room from 18:00
      m6: ['zehn vor sieben'], // the crossing, 18:50
      m9: ['zwanzig vor zehn'], // and he did arrive then, which is the problem
      h2: ['um acht Uhr'], // Hamish reads the book
      h3: ['Um acht Uhr'],
      h4: ['Um zwanzig vor zehn'],
      h6: ['viertel nach sieben'], // the back room, 19:15
      r4: ['von sieben bis acht'], // Sandra in the porch
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-keir-mainroom').toLowerCase()).toContain('zehn vor sieben');
    expect(revelation('x-keir-backroom').toLowerCase()).toContain('viertel nach sieben');
    expect(press('b-backroom').toLowerCase()).toContain('viertel nach sieben');
  });

  /** Nobody in this building writes a clock. The digits live on the chips. */
  it('keeps digit clock times out of every message', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'somebody in a bothy started reading a clock').toEqual([]);
  });
});

describe('Die Schutzhütte (de) — the book', () => {
  /**
   * One word for two books, exactly as the English does it. The bothy log and
   * Struan-s climbing book are both `das Buch`, and the verb separates them:
   * you *eintragen* yourself in the log, and the other one is at the printers.
   */
  it('keeps one word for both books and lets the verb separate them', () => {
    for (const text of [body('p3'), body('h4'), revelation('x-keir-book'), press('b-book')]) {
      expect(text, 'the log stopped being called das Buch').toMatch(/Buch/);
    }
    expect(body('p3')).toContain('ins Buch eingetragen');
    expect(chip('c-keir-book-late')).toContain('ins Buch eingetragen');
    expect(chip('c-keir-book-early')).toContain('eingetragen');

    // The other book: at the printers, and ended by giving the route back.
    expect(body('s1')).toContain('Das Buch ist in der Druckerei');
    expect(body('s9')).toContain('buch');
  });

  /** The page is the proof, and it says the same thing in all four places. */
  it('keeps the two signatures and the dry ink', () => {
    expect(revelation('x-keir-book')).toContain('die Tinte war trocken');
    expect(revelation('x-keir-book')).toContain('zwei K. Lamonts');
    expect(press('b-book')).toContain('zwei K. Lamonts');
    expect(body('h4')).toContain('Zwei K. Lamonts');
    expect(script.solution.epilogue).toContain('K. Lamont zweimal');
  });
});

describe('Die Schutzhütte (de) — the rooms', () => {
  /**
   * Every place name has to appear in the prose with its article intact, tested
   * on the raw string rather than the accent-folded one.
   *
   * German fuses `in dem` into `im` and `an dem` into `am`, so a room named
   * `der Hauptraum` would be reachable only as `im Hauptraum` and the full name
   * would appear in no sentence at all — the same defect that hid inside the
   * French `au bar du club`. Every name in this pack is a bare noun for exactly
   * that reason, and this test is what keeps it that way.
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

  /** A chip and a sentence have to use the same words or they are two rooms. */
  it('uses one word for each room on the chip and in the prose', () => {
    for (const id of ['c-struan-mainroom', 'c-morven-mainroom', 'c-keir-mainroom']) {
      expect(chip(id)).toContain('im Hauptraum');
    }
    for (const id of ['c-pris-backroom', 'c-keir-backroom']) {
      expect(chip(id)).toContain('im Hinterraum');
    }
    expect(chip('c-pris-porch')).toContain('im Vorraum');
    expect(chip('c-keir-hill')).toContain('Bergweg');
  });
});

describe('Die Schutzhütte (de) — the voices', () => {
  /**
   * Six people in three pairs, each pair sharing a casing signature, so each
   * pair needed a second axis. German capitalises every noun, so the
   * lowercase-versus-capitals line the English leans on carries only one of the
   * three distinctions and the other two are punctuation and register.
   */
  it('keeps Hamish and Sandra closing every sentence', () => {
    for (const m of [...from('hamish'), ...from('pris')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} stopped punctuating`).toBe(true);
    }
  });

  it('keeps Struan and Iain capitalised and unclosed', () => {
    for (const m of [...from('struan'), ...from('keir')]) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
  });

  /**
   * Anne and the player are the two lowercase voices. Anne capitalises people
   * at the start of a sentence and the player never does — the same axis that
   * separated these two roles in Packs 1, 2 and 5.
   */
  it('keeps Anne and the player apart on the names', () => {
    const NAMES = /^(Struan|Iain|Anne|Sandra|Hamish|Frau)\b/;
    for (const m of from('morven')) {
      const startsLower = m.body[0] === m.body[0]?.toLowerCase();
      expect(startsLower || NAMES.test(m.body), `${m.id} starts oddly`).toBe(true);
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('m3')).toContain('Struan zuerst');
    expect(body('m10')).toContain('Sandra war die ganze Stunde');

    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
    expect(body('m4')).toContain('iain');
    expect(body('r3')).toContain('iain');
  });

  /** Sandra argues where Hamish counts. That is what separates one punctuation. */
  it('keeps Hamish counting and Sandra arguing', () => {
    const hamish = from('hamish').map((m) => m.body).join('\n');
    expect(hamish).toContain('siebenundzwanzig Jahren');
    expect(hamish).toContain('fünf Namen');

    const sandra = from('pris').map((m) => m.body).join('\n');
    expect(sandra).toContain('Das ist kein Motiv');
    expect(sandra).toContain('beide Tatsachen gleichzeitig');
  });
});

describe('Die Schutzhütte (de) — what the source says', () => {
  /**
   * Sandra is called `Priscilla Nkemelu` in the epilogue and Iain signs the book
   * `K. Lamont`. Both are reproduced rather than corrected, because a locale
   * that fixes the English on its own diverges from every other locale while the
   * English stays as it was. Pinned here so the decision cannot drift into a
   * silent divergence later.
   *
   * `renameLeak.test.ts` cannot see either: it matches `\bPris\b`, and
   * `Priscilla` runs on past the boundary, while `K.` is an initial rather than
   * a name.
   */
  it('reproduces the source names rather than quietly correcting them', () => {
    expect(script.solution.epilogue).toContain('Priscilla Nkemelu');
    expect(body('h3')).toContain('K. Lamont');
    expect(body('h11')).toContain('Iain Lamont');
  });

  /** Pack 7 is standalone. Nothing here may start the arc early. */
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
