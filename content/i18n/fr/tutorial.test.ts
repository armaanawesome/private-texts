import { describe, it, expect } from 'vitest';
import { loadCase, type CaseScript } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import { applyCaseText, caseTextEntries, caseTranslationEntries } from '../caseText';
import { tutorialFr } from './tutorial';

/**
 * The French tutorial, checked twice over.
 *
 * The pack is imported directly and applied with `applyCaseText` rather than
 * looked up through `CASE_TRANSLATIONS`, because it is not registered yet — the
 * orchestrator owns index.ts. Going through `localiseCase` here would silently
 * assert against the English and pass no matter what this file says, which is
 * the exact failure this file exists to prevent.
 *
 * That also means none of the generic rules in caseText.test.ts run on French:
 * that suite iterates the registry. So the first half below re-states them
 * against this pack, and the second half checks the part no generic rule can
 * see — the load-bearing facts that live in words.
 *
 * The tutorial states nearly every time in prose ("ten past three", not 03:10),
 * and a French line saying `trois heures et demie` there would leave every
 * generic test green and the case unsolvable by reading, which is the only way
 * anybody solves it. So those lines are listed. This is deliberately brittle:
 * rewording one of them should break a test, because rewording one of them is
 * how the case quietly stops working.
 */
const english = getCase('tutorial')!;
const script: CaseScript = applyCaseText(english, tutorialFr);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

/** Accent- and punctuation-blind, matching the helper in caseText.test.ts. */
const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const endForms = (minutes: number): string[] =>
  minutes % 1440 === 0 ? [clock(minutes), '24:00'] : [clock(minutes)];

const clockTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

/** Prose the player reads, minus the bare entity names — those are the subject. */
const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

const englishEntries = caseTextEntries(english);
const entries = caseTextEntries(script);

/* ------------------------------------------------- the generic rules, re-run */

describe('Tutorial — Le fournil (fr) · the rules caseText.test.ts cannot reach', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const want = new Set(englishEntries.keys());
    const got = new Set(caseTranslationEntries(tutorialFr).keys());

    expect([...want].filter((k) => !got.has(k)), 'missing translations').toEqual([]);
    expect([...got].filter((k) => !want.has(k)), 'translates ids the case does not have').toEqual(
      [],
    );
  });

  it('has no blank prose and no build-breaking apostrophe', () => {
    for (const [path, value] of caseTranslationEntries(tutorialFr)) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has
      // broken this build twice. French needs apostrophes constantly, so this
      // is the rule most likely to be broken here of anywhere in the repo.
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }
  });

  it('never puts one character’s words in another character’s mouth', () => {
    const seen = new Map<string, string>();
    for (const [path, value] of caseTranslationEntries(tutorialFr)) {
      if (/^(character|place|object|thread)\./.test(path) || path === 'title') continue;
      const previous = seen.get(value);
      expect(previous, `${path} repeats the prose at ${previous ?? ''}`).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  it('gives every claim chip the times the engine actually holds', () => {
    for (const t of script.threads) {
      for (const m of t.messages) {
        for (const c of m.claims ?? []) {
          const times = clockTimes(c.label);
          if (times.length === 0) continue;
          const allowed = endForms(c.window.end).map((end) => [clock(c.window.start), end]);
          const acceptable = [[clock(c.window.start)], ...allowed];
          expect(
            acceptable.some((form) => form.join('|') === times.join('|')),
            `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
              `${clock(c.window.start)}–${clock(c.window.end)}`,
          ).toBe(true);
        }
      }
    }
  });

  it('keeps every number, paragraph and placeholder the English states', () => {
    for (const [path, source] of englishEntries) {
      const value = entries.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
      expect(placeholders(value), `${path} changes its placeholders`).toEqual(placeholders(source));
    }
  });

  it('uses its own names for people and places in the prose', () => {
    const prose = proseOf(script);
    const englishProse = proseOf(english);
    const named = [
      ...script.characters
        .filter((c) => c.id !== 'you')
        .map((c) => ({
          id: `character.${c.id}`,
          english: fold(english.characters.find((e) => e.id === c.id)?.name ?? ''),
          rendered: fold(c.name),
        })),
      ...script.places.map((p) => ({
        id: `place.${p.id}`,
        english: fold(english.places.find((e) => e.id === p.id)?.name ?? ''),
        rendered: fold(p.name),
      })),
    ];

    for (const entity of named) {
      if (entity.english === '' || !englishProse.includes(entity.english)) continue;
      expect(
        prose.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  it('keeps naming the people whose threads are found by reading', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const bodyOf = new Map(script.threads.flatMap((t) => t.messages).map((m) => [m.id, fold(m.body)]));

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;
      const names = thread.participantIds
        .filter((id) => id !== 'you')
        .map((id) => nameOf.get(id) ?? '');
      const named = gates.some((id) => {
        const gateBody = bodyOf.get(id) ?? '';
        return names.some((n) => n !== '' && gateBody.includes(n));
      });
      expect(named, `nothing names anyone in ${thread.id} before it opens`).toBe(true);
    }
  });

  /**
   * The tutorial is free and carries none of the arc. content/cases/tutorial.test.ts
   * asserts this of the English; a translator reaching for "gardien" as a word
   * for a caretaker would hand a Pack 1 spoiler to French players only.
   */
  it('carries none of the campaign arc', () => {
    const prose = [...entries.values()].join('\n');
    expect(prose).not.toMatch(/keeper|listener|unknown number/i);
  });

  // And it is still a case: every engine guarantee, on the French script.
  describeCaseContract(script);
});

/* ------------------------------------------------- the half that lives in words */

describe('Tutorial — Le fournil (fr)', () => {
  /**
   * Every clock time the case turns on, in the message that states it. Roza puts
   * herself on the ovens 03:00–04:00 and Ivy puts her on the square at 03:20;
   * that pair is the whole tutorial. The near-misses need their times too, or
   * they stop being near.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      t3: ['deux heures du matin', 'trois heures'], // ovens until the three o clock drop
      r4: ['deux heures vingt', 'deux heures et demie'], // the garage run, 02:20–02:45
      r5: ['entre trois heures et quatre heures'], // the alibi she gives twice
      r6: ['trois heures dix', 'une demi-heure'], // the smoke break, 03:10–03:40
      iv2: ['cinq heures'],
      iv4: ['trois heures', 'quatre heures'], // the extractor, 03:00–04:00
      iv5: ['trois heures dix'], // the near-miss put to Ivy in the player's voice
      iv7: ['trois heures vingt'], // the sighting that breaks her
      iv8: ['entre trois heures et quatre heures'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The confession has to name the same minute Roza's own account named, or
    // the player is reading two different stories about one cigarette.
    expect(script.confrontation?.confession).toContain('trois heures dix');
    expect(script.contradictions[0]?.revelation).toContain('trois heures vingt');
    expect(script.briefing?.opening).toContain('quatre heures dix');
  });

  /**
   * The lesson a tutorial usually skips, taught inside the fiction so a player
   * who never pins the pair still meets the rule. If the French drops it, French
   * players learn nothing about nested places and read the refusal as a broken
   * board.
   */
  it('has Ivy give the nested-place answer in her own words', () => {
    expect(body('iv6')).toContain('la cour c’est la boulangerie');
    // And the player has to have asked the question that provokes it.
    expect(body('iv5')).toContain('n’a jamais quitté la boulangerie');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('t4')).toContain('la rocade'); // the corner, from Tom
    expect(body('t4')).toContain('trois ans');
    expect(body('iv10')).toContain('se livre'); // handing yourself in, from Ivy
    expect(body('iv10')).toContain('roza');
  });

  /** Roza names Ivy, which is the only reason Ivy's thread appears. */
  it('still names Ivy in the message that finds her', () => {
    expect(body('r8')).toContain('Ivy');
  });

  /**
   * Four people who text differently. The register is the characterisation, and
   * it is the first thing a translation flattens.
   */
  it('keeps the voices apart', () => {
    // Ivy is nineteen: lowercase, and she drops her accents.
    for (const id of ['iv1', 'iv3', 'iv4', 'iv6', 'iv7', 'iv9', 'iv10']) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown accents Ivy does not type`).not.toMatch(/[éèêàùâîôûç]/);
    }
    // The player is lowercase too, but keeps accents on — that is the only
    // thing separating their thumb-typing from Ivy's.
    for (const id of ['t2', 't5', 't8', 'r3', 'r7', 'iv2', 'iv5', 'iv8']) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
    }
    expect(body('iv5')).toMatch(/[éèêà]/);
    // Tom and Roza write in full sentences, capitalised, like adults with a pen,
    // and they keep the `ne` of their negations where the young ones drop it.
    for (const id of ['t1', 't3', 't6', 'r1', 'r4', 'r6']) {
      expect(body(id)?.[0], `${id} does not start as a written sentence`).toBe(
        body(id)?.[0]?.toUpperCase(),
      );
    }
    for (const id of ['t6', 'r5', 'r6']) {
      expect(body(id), `${id} has lost the ne of a written negation`).toMatch(/\bne\b|\bn’/);
    }
  });

  /**
   * The player's gender is never stated, so nothing addressed to them may agree.
   * `venu`/`venue` in a deflection is the easy way to lose this.
   */
  it('keeps the player genderless', () => {
    const atPlayer = [
      script.blurb,
      ...(script.confrontation?.deflections ?? []),
      script.solution.epilogue,
      body('t3'),
      body('iv1'),
      body('iv10'),
    ].join('\n');
    expect(atPlayer).not.toMatch(/tu (es|étais|serais) (venue?|allée?|resté?e?|partie?)\b/);
    expect(atPlayer).not.toMatch(/\b(mon grand|ma grande|mon petit|ma petite)\b/);
  });
});
