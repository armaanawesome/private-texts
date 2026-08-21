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
import { theCutFr } from './the-cut';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Cut, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS, so
 * it keeps checking whether or not the registry knows about the pack.
 *
 * The lie here is movement, and the whole village reasons in miles and locks. So
 * the units are pinned, the one machine timestamp is pinned, and the alias is
 * pinned to the one place it is allowed to appear.
 */
const english = getCase('the-cut')!;
const script: CaseScript = applyCaseText(english, theCutFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const englishBody = (id: string): string =>
  english.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
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

const countOf = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1;

/* --------------------------------------------------------------- the contract */

describe('Le canal (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theCutFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theCutFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theCutFr)];

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

  /** A chip may name its window, or a single moment inside it. Both are correct. */
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
        const momentInside = at >= 0 && at >= c.window.start % 1440 && at <= c.window.end % 1440;

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
   * The raw-article check, unfolded, because folding hides exactly this: French
   * contracts `à le` into `au`, `de le` into `du` and `à les` into `aux`, so a
   * chip reading `le Junction` beside a sentence reading `au Junction` leaves the
   * full name unspoken. Spanish shipped `al camino` against `el camino de Carr
   * Bank` and its own copy of this rule caught it.
   *
   * Five names in this pack begin with an article the contraction would eat, so
   * each is written somewhere it survives whole. Gated on places the English
   * actually names, the way the generic rule is.
   */
  it('never lets a contracted preposition eat a place name', () => {
    const englishProse = proseOf(english);
    const spoken = [...caseTextEntries(script)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n');

    const checked: string[] = [];
    for (const place of script.places) {
      const englishName = fold(english.places.find((e) => e.id === place.id)?.name ?? '');
      if (englishName === '' || !englishProse.includes(englishName)) continue;
      checked.push(place.id);
      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact — check for au/du/aux swallowing it`,
      ).toBe(true);
    }
    // The gate must not swallow everything and pass vacuously.
    expect(checked).toContain('cut');
    expect(checked).toContain('towpath');
    expect(checked).toContain('pub');
    expect(checked).toContain('tyrleylocks');
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
    expect(nameIn(english, 't-bo')).toBe(true);
    expect(body('m7')).toContain('Sam');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the arc clue */

describe('Le canal (fr) — the arc clue', () => {
  /**
   * Third arc connection. The alias belongs in the confession and nowhere a
   * player can reach before the case is solved. The coda circles the follow-up
   * call without naming him, which is the point of it.
   */
  it('keeps the Keeper a name a French player can carry forward', () => {
    expect(script.confrontation?.confession).toContain('se faisait appeler le Keeper');
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/gardien/i);
  });

  it('says it as many times as the English does, and never before the end', () => {
    // Derived, never hardcoded: if the arc is reworked out of this pack the
    // English count moves and this moves with it.
    const englishCount = countOf([...caseTextEntries(english).values()].join('\n'), 'Keeper');
    expect(englishCount, 'the English fixture stopped saying it').toBeGreaterThan(0);
    expect(countOf([...caseTextEntries(script).values()].join('\n'), 'Keeper')).toBe(englishCount);

    const beforeTheEnd = [
      script.title,
      script.blurb,
      script.briefing?.opening ?? '',
      ...messages.map((m) => m.body),
      ...script.contradictions.map((x) => x.revelation),
      ...script.motives.map((m) => m.summary),
      ...(script.coda?.messages ?? []),
    ].join('\n');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /** He rings back afterwards. That is clue 4 and it is the only careless thing he does. */
  it('keeps the follow-up call and what it costs him', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('le dimanche il a rappelé');
    expect(script.coda?.messages[3]).toContain('Je le fais toujours');
    expect(script.coda?.messages[3]).toContain('imprudente');
    expect(script.coda?.from).toBe('Numéro inconnu');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('v7')).toContain('samedi'); // Julie: Effie is coming
    expect(body('v7')).toContain('amarrages');
    expect(body('g8')).toContain('Effie'); // Alan: and the whole snug heard it
    expect(body('g8')).toContain('deux heures');
  });
});

/* ------------------------------------------------------------- the arithmetic */

describe('Le canal (fr) — miles, locks and the one machine', () => {
  /**
   * The units are the alibi. Everybody reasons in miles and locks, so a boat
   * cannot have moved — and nobody asks about the man. Converting to kilometres
   * would leave the sum intact but stop it being the sum the village did.
   */
  it('keeps the distance in miles and the barrier in locks', () => {
    for (const text of [body('k3'), body('m6'), body('b8'), revelation('x-nate-bike')]) {
      expect(text, 'the six miles stopped being miles').toContain('milles');
    }
    expect(body('k3')).toContain('cinq écluses');
    expect(body('m6')).toContain('Cinq écluses');
    expect(script.blurb).toContain('trois milles à l’heure');
    // And the answer to it.
    expect(body('b8')).toContain('quarante minutes à vélo');
    expect(pressOf('c-bike')).toContain('Quarante minutes');
  });

  /**
   * Derived rather than hardcoded. b8 repeats the boat to make the point that
   * the question never moved either, and the count is the joke.
   */
  it('repeats the boat exactly as often as the English does', () => {
    expect(countOf(body('b8'), 'le bateau')).toBe(countOf(englishBody('b8'), 'the boat'));
  });

  /**
   * One machine in the whole pack, and it is the only message with a digit clock.
   * Everything else is somebody remembering.
   */
  it('lets only the key log carry a digit clock', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual(['g6']);
    expect(body('g6')).toContain('20:44');
    expect(revelation('x-nate-wharf')).toContain('20:44');
    expect(pressOf('c-wharf')).toContain('20:44');
    expect(label('c-nate-wharf')).toContain('20:44');
  });

  /** The bicycle is the answer, and it is one object everywhere. */
  it('keeps the bicycle one thing wherever the player meets it', () => {
    expect(body('b7')).toContain('Dawes');
    expect(revelation('x-nate-bike')).toContain('Dawes');
    expect(pressOf('c-bike')).toContain('Dawes');
    expect(script.coda?.messages[1]).toContain('vélo');
  });
});

/* ------------------------------------------------------------------ the times */

describe('Le canal (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      b2: ['de huit heures à neuf heures quarante'], // Sam and the dog, every night
      b4: ['Huit heures et demie'], // and the sighting that breaks him
      m2: ['sept heures et demie', 'huit heures', 'deux heures vingt'], // Tam at the hospital
      g7: ['de six heures à sept heures'], // Julie in the pub, happy
      k1: ['onze heures'], // Sam finds her
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-nate-norbury')).toContain('huit heures et demie');
    expect(pressOf('c-norbury')).toContain('huit heures et demie');
    expect(revelation('x-tam-hospital')).toContain('deux heures vingt');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Le canal (fr) — the voices', () => {
  /**
   * The player is lowercase and never terminates. Julie, Sam and Alan write in
   * full sentences and finish them. Nate capitalises like them and then trails
   * off without a stop every time he volunteers something nobody asked for, which
   * is the whole of what he is doing. Tam splits by audience — casual in the
   * group, careful one to one.
   */
  it('keeps the player the only one who does not capitalise', () => {
    for (const m of messages) {
      if (m.senderId === 'you') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else if (m.senderId === 'tam' && m.threadId === 't-cut') {
        expect(m.body[0], `${m.id} is not lowercase in the group`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
      }
    }
  });

  it('keeps Nate trailing off exactly where the English does', () => {
    // Derived: whichever of his messages the English leaves unfinished, French
    // leaves unfinished too. He finishes k3, the account he prepared, and trails
    // off on everything he volunteers after it.
    for (const m of messages.filter((x) => x.senderId === 'nate')) {
      const source = englishBody(m.id);
      expect(m.body.endsWith('.'), `${m.id} does not match the English ending`).toBe(
        source.endsWith('.'),
      );
    }
    // Alan and Sam always finish, which is what makes Nate audible.
    for (const m of messages.filter((x) => x.senderId === 'gwyn' || x.senderId === 'bo')) {
      expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
    }
  });

  /** The player's gender is never stated. */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
    ].join('\n');
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (installée?|venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(script.briefing?.opening).toContain('tu vis à terre depuis quatre ans');
  });
});
