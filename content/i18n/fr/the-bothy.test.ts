import { describe, it, expect } from 'vitest';
import { loadCase, type CaseScript } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theBothyFr } from './the-bothy';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Bothy, checked on the things a player reasons over.
 *
 * Imported directly and applied with `applyCaseText` rather than routed through
 * CASE_TRANSLATIONS, so it keeps checking whether or not the registry knows about
 * the pack.
 *
 * The shape of this case is order rather than clock — a bothy has no clock, and
 * nobody in the room knows what time anything happened, only what happened before
 * what. So the checks below are about sequence words and about the one pair of
 * chips that carries the whole contradiction.
 */
const english = getCase('the-bothy')!;
const script: CaseScript = applyCaseText(english, theBothyFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const endForms = (minutes: number): string[] =>
  minutes % 1440 === 0 ? [clock(minutes), '24:00'] : [clock(minutes)];

const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

/* --------------------------------------------------------------- the contract */

describe('Le refuge (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theBothyFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theBothyFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theBothyFr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const proseEntries = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of proseEntries) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number, paragraph and placeholder the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
      expect(placeholders(value), `${path} changes its placeholders`).toEqual(placeholders(source));
    }
  });

  /**
   * A chip may name its window, or a single moment inside it. Both are correct,
   * and this pack is the reason the generic rule now says so: `c-keir-book-late`
   * and `c-keir-book-early` share one window because they are an exclusive group
   * and the engine needs overlapping windows to see the collision at all.
   */
  it('gives every claim chip the times the engine actually holds', () => {
    for (const m of messages) {
      for (const c of m.claims ?? []) {
        const times = digitTimes(c.label);
        if (times.length === 0) continue;

        const allowed = endForms(c.window.end).map((end) => [clock(c.window.start), end]);
        const acceptable = [[clock(c.window.start)], ...allowed];
        const namesTheWindow = acceptable.some((f) => f.join('|') === times.join('|'));

        const minutes = (hhmm: string): number => {
          const [h, m2] = hhmm.split(':').map(Number);
          return (h ?? 0) * 60 + (m2 ?? 0);
        };
        const at = times.length === 1 ? minutes(times[0] ?? '') : -1;
        const momentInside =
          at >= 0 && at >= c.window.start % 1440 && at <= c.window.end % 1440;

        expect(
          namesTheWindow || momentInside,
          `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
            `${clock(c.window.start)}–${clock(c.window.end)}`,
        ).toBe(true);
      }
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

  /**
   * The raw-article check. French contracts `à le` into `au` and `de le` into
   * `du`, so a chip reading `le refuge` beside a sentence reading `au refuge`
   * leaves the full name unspoken — the folded check above cannot see it, because
   * folding accents and punctuation is not the same as restoring an article. This
   * compares the exact string, and `le refuge` and `le porche` are the two
   * exposed names in this pack.
   */
  it('never lets a contracted preposition eat a place name', () => {
    const spoken = [...caseTextEntries(script)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n');

    for (const place of script.places) {
      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact — check for au/du swallowing it`,
      ).toBe(true);
    }
  });

  it('keeps naming whoever the English named in a discovery gate', () => {
    const nameIn = (s: CaseScript, threadId: string): boolean => {
      const thread = s.threads.find((t) => t.id === threadId)!;
      const nameOf = new Map(s.characters.map((c) => [c.id, fold(c.name)]));
      const bodyOf = new Map(s.threads.flatMap((t) => t.messages).map((m) => [m.id, fold(m.body)]));
      const names = thread.participantIds
        .filter((id) => id !== 'you')
        .map((id) => nameOf.get(id) ?? '');
      return (thread.requiresReadMessageIds ?? []).some((id) => {
        const gateBody = bodyOf.get(id) ?? '';
        return names.some((n) => n !== '' && gateBody.includes(n));
      });
    };

    for (const thread of script.threads) {
      if ((thread.requiresReadMessageIds ?? []).length === 0) continue;
      if (!nameIn(english, thread.id)) continue;
      expect(nameIn(script, thread.id), `${thread.id} lost the name that finds it`).toBe(true);
    }
    // m10 is the one that carries it, so the rule above is not passing vacuously.
    expect(nameIn(english, 't-pris')).toBe(true);
    expect(body('m10')).toContain('Sandra');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 7 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------------- the two chips */

describe('Le refuge (fr) — the register', () => {
  /**
   * The pair that is the case. Two claims, one shared window, and each label
   * naming what was asserted rather than the window: `à 21:40` against `avant
   * 20:00`. Those two numbers sitting side by side on the board are the whole
   * contradiction, so both are pinned exactly.
   */
  it('keeps the two register chips naming their assertions, not their window', () => {
    expect(label('c-keir-book-late')).toContain('à 21:40');
    expect(label('c-keir-book-early')).toContain('avant 20:00');
    // The windows underneath are machinery rather than something to state, and
    // what the engine actually needs is that they OVERLAP — it cannot see an
    // exclusive-group collision otherwise. They happen to be identical in this
    // pack, but asserting sameness would be pinning a coincidence: sunday-service
    // has the same shape with one window nested inside the other.
    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const late = claimOf('c-keir-book-late').window;
    const early = claimOf('c-keir-book-early').window;
    expect(
      late.start < early.end && early.start < late.end,
      'the exclusive pair must overlap or the engine cannot see the collision',
    ).toBe(true);
  });

  /**
   * Two different books, kept apart. The English says "the book" for both the
   * bothy log and Struan's published one; French would blur them, so the log is
   * `le registre` and the published one is `le livre`. If they merge, s9 reads as
   * a threat against a visitors' book and the contradiction loses its object.
   */
  it('keeps the log and the published book as two different words', () => {
    // h1, h4, h10 and p3 name it; h2 deliberately does not, because the English
    // says "I check it when I arrive" — a pronoun pointing back at h1. Naming the
    // register there would be less faithful, not more.
    for (const text of [body('p3'), body('h1'), body('h4'), body('h10'), revelation('x-keir-book')]) {
      expect(text, 'the log lost its name').toContain('registre');
    }
    expect(body('h2')).toContain('Je le regarde en arrivant');
    expect(body('s1')).toContain('livre'); // the published one
    expect(body('s9')).toContain('ton livre');
    expect(script.solution.epilogue).toContain('le registre');
    // And the double signature, which is what the log proves.
    expect(revelation('x-keir-book')).toContain('deux K. Lamont');
    expect(pressOf('b-book')).toContain('deux K. Lamont');
  });

  /**
   * A bothy has no clock. Everybody speaks in words and the digits live on the
   * chips, which are the board rather than the room — Anne says so herself in m2.
   */
  it('lets no message carry a digit clock', () => {
    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual([]);
    expect(body('m2')).toContain('il n’y a pas d’horloge');
    expect(body('m2')).toContain('tu sais ce qui est déjà arrivé');
  });
});

/* ------------------------------------------------------------------ the order */

describe('Le refuge (fr) — the order', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      p3: ['Dix heures moins vingt'], // Iain arrives, the performance
      p4: ['sept heures moins vingt'], // and puts himself on the path from
      p5: ['six heures', 'onze heures'], // Anne in the main room all evening
      m3: ['vers six heures'], // the order she remembers
      m6: ['vers sept heures moins dix'], // the crossing that breaks him
      m9: ['dix heures moins vingt'], // and the arrival that is also true
      r4: ['de sept heures à huit heures'], // Sandra in the porch
      h2: ['à huit heures'], // Hamish reads the register
      h6: ['vers sept heures et quart'], // and goes through for the gas
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-keir-mainroom')).toContain('sept heures moins dix');
    expect(revelation('x-keir-backroom')).toContain('sept heures et quart');
    expect(pressOf('b-mainroom')).toContain('sept heures moins dix');
    expect(pressOf('b-backroom')).toContain('sept heures et quart');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('s7')).toContain('en solo en 2016'); // Struan admits whose it was
    expect(body('s7')).toContain('2018');
    expect(body('r6')).toContain('Raven'); // Sandra supplies that he had decided
    expect(body('r7')).toContain('Il avait décidé');
  });

  /** The jacket is the only thing that identifies the man in the dark. */
  it('keeps the jacket one thing wherever the player meets it', () => {
    expect(body('m7')).toContain('veste');
    expect(body('h9')).toContain('veste bleue');
    expect(revelation('x-keir-backroom')).toContain('veste bleue');
    expect(pressOf('b-mainroom')).toContain('veste');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Le refuge (fr) — the voices', () => {
  /**
   * Hamish and Sandra write in complete sentences and finish every one with a
   * full stop — they are the two who expect to be quoted. Struan and Iain
   * capitalise properly and never land a final stop. Anne and the player run
   * lowercase, except where a message opens on somebody's name.
   */
  it('keeps the voices apart', () => {
    const names = script.characters.map((c) => c.name);
    const opensOnAName = (text: string): boolean => names.some((n) => text.startsWith(n));

    for (const m of messages) {
      if (m.senderId === 'hamish' || m.senderId === 'pris') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else if (m.senderId === 'struan' || m.senderId === 'keir') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        if (!opensOnAName(m.body)) {
          expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        }
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }

    // Sandra is the one who will not be reduced to the job, and says so.
    expect(body('r1')).toContain('c’est un mardi');
    // The player types lowercase even on a name.
    expect(body('r3')).toContain('iain');
  });

  /**
   * The player's gender is never stated, and this pack offers the trap twice:
   * the briefing and the confrontation both want to say the player stayed at
   * home. Both are built around it instead.
   */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      body('m1'),
    ].join('\n');

    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (resté|restée|venue?|allée?|arrivée?|partie?)\b/i,
    );
    expect(script.briefing?.opening).toContain('tu n’as pas bougé de chez toi');
    expect(script.confrontation?.opening).toContain('tu n’as pas bougé de chez toi');
    expect(script.confrontation?.deflections[1]).toContain('mis les pieds');
  });
});
