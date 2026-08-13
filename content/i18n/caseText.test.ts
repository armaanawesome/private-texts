import { describe, it, expect } from 'vitest';
import { loadCase, type CaseScript } from '@/engine';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type LocaleTag } from '@/i18n/locales';
import { getCase } from '../cases/index';
import { describeCaseContract } from '../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTranslationEntries,
  type CaseTranslation,
} from './caseText';
import { CASE_TRANSLATIONS, caseCoverage, localiseCase, translatedCaseIds } from './index';

/**
 * What makes a translated case safe.
 *
 * The engine matches on ids and structured predicates, so no translation can
 * break the *logic* — every engine test passes on a case translated into
 * nonsense. The tests that matter are therefore not about the engine at all.
 * They are about the player, who solves this case by holding two sentences next
 * to each other and noticing that both cannot be true.
 *
 * Three failures do that damage, and none of them is visible to any existing
 * test:
 *
 *   1. A claim chip that says a different time from the message it came from.
 *      The player compares the chip against the story and the story stops
 *      adding up, so they conclude the game is broken rather than that Roza is.
 *   2. A place or a person renamed in the prose but not on the chip, or the
 *      reverse. Two names for one thing is two things, to a player.
 *   3. A thread found by reading a message that names somebody — where the
 *      translation stopped naming them. The conversation then arrives out of
 *      nowhere and reads as a bug.
 *
 * Everything below exists to catch one of those, plus the structural guarantees
 * that let the rest of the app treat a localised case as the same case.
 */

/* ------------------------------------------------------------------ helpers */

/** Accent- and punctuation-blind, so `Vardy’s` matches `vardys` in a message. */
function fold(text: string): string {
  return text
    .normalize('NFD')
    // NFD split every accent into its own combining mark, which is \p{M} and so
    // falls to the class below along with the punctuation. One pass does both:
    // "Vardy’s" becomes "vardys", "atrás" becomes "atras".
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

const clockTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

/** Prose the player reads, minus the bare entity names — those are the subject. */
function proseOf(script: CaseScript): string {
  const kept: string[] = [];
  for (const [path, value] of caseTextEntries(script)) {
    if (/^(character|place|object)\./.test(path)) continue;
    kept.push(value);
  }
  return fold(kept.join('\n'));
}

function englishCase(caseId: string): CaseScript {
  const script = getCase(caseId);
  if (!script) throw new Error(`no case "${caseId}"`);
  return script;
}

/** Every (locale, case) pair that ships a translation. */
const REGISTERED: readonly { tag: LocaleTag; caseId: string; text: CaseTranslation }[] =
  SUPPORTED_LOCALES.flatMap(({ tag }) =>
    Object.entries(CASE_TRANSLATIONS[tag]).map(([caseId, text]) => ({ tag, caseId, text })),
  );

const TRANSLATED_CASE_IDS = [...new Set(REGISTERED.map((r) => r.caseId))];

/** The locales one case can be read in: English, plus whoever has translated it. */
const localesFor = (caseId: string): LocaleTag[] => [
  DEFAULT_LOCALE,
  ...REGISTERED.filter((r) => r.caseId === caseId).map((r) => r.tag),
];

/**
 * Ids, windows, predicates and order — everything a translation must not be able
 * to touch. Compared before and after localisation.
 */
function structureOf(s: CaseScript) {
  return {
    id: s.id,
    requiredEntitlementId: s.requiredEntitlementId,
    characters: s.characters.map((c) => ({ id: c.id, avatarColor: c.avatarColor })),
    places: s.places.map((p) => ({ id: p.id, parentId: p.parentId })),
    objects: s.objects.map((o) => ({ id: o.id, unique: o.unique })),
    threads: s.threads.map((t) => ({
      id: t.id,
      participantIds: [...t.participantIds],
      requiresContradictionIds: [...t.requiresContradictionIds],
      requiresReadMessageIds: [...(t.requiresReadMessageIds ?? [])],
      requiresMotiveIds: [...(t.requiresMotiveIds ?? [])],
      messages: t.messages.map((m) => ({
        id: m.id,
        threadId: m.threadId,
        senderId: m.senderId,
        sentAt: m.sentAt,
        unlocksThreadIds: [...(m.unlocksThreadIds ?? [])],
        claims: (m.claims ?? []).map((c) => ({
          id: c.id,
          subject: c.subject,
          assertedBy: c.assertedBy,
          predicate: c.predicate,
          window: c.window,
          sourceMessageId: c.sourceMessageId,
        })),
      })),
    })),
    contradictions: s.contradictions.map((c) => ({
      id: c.id,
      claimIdA: c.claimIdA,
      claimIdB: c.claimIdB,
    })),
    motives: s.motives.map((m) => ({
      id: m.id,
      characterId: m.characterId,
      establishedByMessageIds: [...m.establishedByMessageIds],
    })),
    briefing: s.briefing && {
      victimId: s.briefing.victimId,
      foundAt: s.briefing.foundAt,
      recoveredObjectIds: [...(s.briefing.recoveredObjectIds ?? [])],
    },
    confrontation: s.confrontation && {
      beats: s.confrontation.beats.map((b) => ({ id: b.id, evidence: b.evidence })),
      deflectionCount: s.confrontation.deflections.length,
    },
    codaMessageCount: s.coda?.messages.length,
    solution: {
      killerId: s.solution.killerId,
      requiredContradictionIds: [...s.solution.requiredContradictionIds],
      requiredMotiveIds: [...s.solution.requiredMotiveIds],
    },
  };
}

/* ---------------------------------------------------------------- mechanism */

describe('case text: the mechanism', () => {
  const tutorial = englishCase('tutorial');

  it('returns the English case untouched when there is no translation', () => {
    // By reference: this is the path every untranslated case and every
    // untranslated locale takes, which is nearly all of them.
    expect(applyCaseText(tutorial, undefined)).toBe(tutorial);
    expect(localiseCase(tutorial, 'fr')).toBe(tutorial);
    expect(localiseCase(englishCase('the-lighthouse'), 'es')).toBe(englishCase('the-lighthouse'));
  });

  it('falls back to English field by field, exactly as the UI catalogue does', () => {
    const partial: CaseTranslation = {
      messages: { t1: 'Hornos encendidos.', t2: '', t5: '   ' },
    };
    const out = applyCaseText(tutorial, partial);
    const body = (id: string) =>
      out.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body;
    const english = (id: string) =>
      tutorial.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body;

    expect(body('t1')).toBe('Hornos encendidos.');
    // Empty and whitespace-only are absent, not translated. A blank message
    // bubble is a piece of missing evidence, which is worse than English.
    expect(body('t2')).toBe(english('t2'));
    expect(body('t5')).toBe(english('t5'));
    expect(body('t3')).toBe(english('t3'));
    expect(out.title).toBe(tutorial.title);
    expect(out.solution.epilogue).toBe(tutorial.solution.epilogue);
  });

  it('cannot introduce an id, because ids are keys and never values', () => {
    const invented: CaseTranslation = {
      messages: { 'no-such-message': 'prose for a message that does not exist' },
      claims: { 'no-such-claim': 'a chip for nothing' },
      places: { 'no-such-place': 'nowhere' },
      contradictions: { 'no-such-contradiction': 'a proof that is not in the case' },
    };
    expect(applyCaseText(tutorial, invented)).toEqual(tutorial);
  });

  it('cannot omit an id, because a missing key means English', () => {
    expect(applyCaseText(tutorial, { messages: {}, claims: {}, places: {} })).toEqual(tutorial);
  });

  it('cannot shorten or lengthen the killer’s bag of deflections', () => {
    const c = tutorial.confrontation!;
    const short = applyCaseText(tutorial, {
      confrontation: { deflections: ['Eso no demuestra nada.'] },
    });
    const long = applyCaseText(tutorial, {
      confrontation: { deflections: ['a', 'b', 'c', 'd', 'e', 'f'] },
    });
    expect(short.confrontation!.deflections).toHaveLength(c.deflections.length);
    expect(long.confrontation!.deflections).toHaveLength(c.deflections.length);
    // Index 0 translated, the rest still English.
    expect(short.confrontation!.deflections[0]).toBe('Eso no demuestra nada.');
    expect(short.confrontation!.deflections[1]).toBe(c.deflections[1]);
  });

  it('leaves prose out of the structure and structure out of the prose', () => {
    // The CaseTranslation type has nowhere to write a window, a sentAt or a
    // predicate. This proves the consequence: nothing structural moves.
    for (const { tag, caseId } of REGISTERED) {
      const english = englishCase(caseId);
      expect(structureOf(localiseCase(english, tag)), `${caseId} in ${tag}`).toEqual(
        structureOf(english),
      );
    }
  });
});

/* ----------------------------------------------------------------- registry */

describe('case text: what is registered to ship', () => {
  it('has at least one case translated, or none of this is being checked', () => {
    expect(REGISTERED.length).toBeGreaterThan(0);
  });

  it('keeps English out of the translation registry', () => {
    // content/cases IS the English. A second copy here is a second place to fix
    // a typo, and one of them gets forgotten.
    expect(Object.keys(CASE_TRANSLATIONS.en)).toEqual([]);
    expect(translatedCaseIds(DEFAULT_LOCALE)).toEqual([]);
  });

  for (const { tag, caseId, text } of REGISTERED) {
    it(`${caseId} · ${tag} has exactly the ids the English case has`, () => {
      const english = new Set(caseTextEntries(englishCase(caseId)).keys());
      const translated = new Set(caseTranslationEntries(text).keys());

      const missing = [...english].filter((k) => !translated.has(k));
      const extra = [...translated].filter((k) => !english.has(k));

      // Missing is not a fallback here. Fallback is for a locale with no file at
      // all; a half-translated case makes the player wonder whether the English
      // lines mean something.
      expect(missing, `${caseId} (${tag}) is missing translations`).toEqual([]);
      // Extra is a typo in an id, or a line written for something the English
      // deliberately leaves silent. Both drop the prose on the floor.
      expect(extra, `${caseId} (${tag}) translates ids the case does not have`).toEqual([]);
      expect(caseCoverage(englishCase(caseId), tag)).toBe(1);
    });

    it(`${caseId} · ${tag} has no blank, duplicated or build-breaking prose`, () => {
      const entries = [...caseTranslationEntries(text)];

      for (const [path, value] of entries) {
        expect(value.trim(), `${path} is blank`).not.toBe('');
        // A straight apostrophe inside a single-quoted TypeScript string has
        // broken this build twice. The curly one is the house character.
        expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
      }

      // Two ids sharing a translated line is a copy-paste, and it puts one
      // character's words in another character's mouth.
      const prose = entries.filter(
        ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
      );
      const seen = new Map<string, string>();
      for (const [path, value] of prose) {
        const previous = seen.get(value);
        expect(previous, `${path} repeats the prose at ${previous ?? ''}`).toBeUndefined();
        seen.set(value, path);
      }
    });
  }
});

/* -------------------------------------------------------------- solvability */

for (const caseId of TRANSLATED_CASE_IDS) {
  const english = englishCase(caseId);
  const englishEntries = caseTextEntries(english);

  for (const tag of localesFor(caseId)) {
    const script = localiseCase(english, tag);
    const entries = caseTextEntries(script);

    describe(`${caseId} · ${tag}`, () => {
      it('still loads, so no cross-reference was disturbed', () => {
        expect(() => loadCase(script)).not.toThrow();
      });

      /**
       * The one that matters most.
       *
       * A claim chip is what the player pins on the board and reads back
       * against the messages. If the chip says 03:20 and the window the engine
       * reasons over is 03:15–03:30, every deduction the player makes by
       * reading is wrong while every deduction the engine makes is right, and
       * the case becomes unreasonable without a single test failing.
       */
      it('gives every claim chip the times the engine actually holds', () => {
        for (const t of script.threads) {
          for (const m of t.messages) {
            for (const c of m.claims ?? []) {
              const times = clockTimes(c.label);
              if (times.length === 0) continue; // not every claim is about a clock
              expect(times, `claim ${c.id} label disagrees with its window`).toEqual([
                clock(c.window.start),
                clock(c.window.end),
              ]);
            }
          }
        }
      });

      /**
       * A thread found by reading has to be found in the prose too. Roza names
       * Ivy and Ivy becomes reachable; a translation that says "the girl from
       * the counter" instead opens a conversation with a stranger.
       */
      it('keeps naming the people whose threads are found by reading', () => {
        const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
        const bodyOf = new Map(
          script.threads.flatMap((t) => t.messages).map((m) => [m.id, fold(m.body)]),
        );

        for (const thread of script.threads) {
          const gates = thread.requiresReadMessageIds ?? [];
          if (gates.length === 0) continue;

          const names = thread.participantIds
            .filter((id) => id !== 'you')
            .map((id) => nameOf.get(id) ?? '');
          const named = gates.some((id) => {
            const body = bodyOf.get(id) ?? '';
            return names.some((n) => n !== '' && body.includes(n));
          });
          expect(named, `nothing names anyone in ${thread.id} before it opens`).toBe(true);
        }
      });

      /**
       * A name on a chip and a different name in a sentence is two things to a
       * player. Whichever way a translator decides — keep `Vardy’s`, translate
       * "the back yard" — the prose has to make the same decision.
       */
      it('uses its own names for people and places in the prose', () => {
        const prose = proseOf(script);
        const englishProse = proseOf(english);
        const named: { id: string; english: string; rendered: string }[] = [
          ...script.characters
            .filter((c) => c.id !== 'you') // the player's seat is a pronoun, not a name
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
          // Only names the English prose actually says. A place never mentioned
          // by name in a message constrains nothing.
          if (entity.english === '' || !englishProse.includes(entity.english)) continue;
          expect(
            prose.includes(entity.rendered),
            `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
          ).toBe(true);
        }
      });

      it('keeps every number the English states', () => {
        for (const [path, source] of englishEntries) {
          const value = entries.get(path) ?? '';
          // Clock times, ages, years. A translator writing "las tres y media"
          // where the English says ten past three is the same bug as a wrong
          // chip, and digits are the half of it a machine can see.
          expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
        }
      });

      it('keeps every paragraph and every placeholder', () => {
        for (const [path, source] of englishEntries) {
          const value = entries.get(path) ?? '';
          // Messages are written in paragraphs and a dropped one is a dropped
          // fact — r4 loses "I was back before half two" if the second half of
          // it goes missing.
          expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
          expect(placeholders(value), `${path} changes its placeholders`).toEqual(
            placeholders(source),
          );
        }
      });

      // And the case is still a case: every engine guarantee, on the translated
      // script rather than the English one.
      describeCaseContract(script);
    });
  }
}
