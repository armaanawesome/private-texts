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
import { theLongCourseFr } from './the-long-course';

/**
 * The French Long Course, checked on the things a player reasons over.
 *
 * Imported directly and applied with `applyCaseText` rather than routed through
 * CASE_TRANSLATIONS, so it keeps checking whether or not the registry knows about
 * the pack. The generic contract is re-run here for the same reason.
 *
 * The rest is what no generic test can see. The lie is identity — eight people in
 * identical kit — so the kit words and the single burned-in timecode are what the
 * case rests on, and pack 6 is the second arc connection, so the alias has to land
 * exactly twice and exactly late.
 */
const english = getCase('the-long-course')!;
const script: CaseScript = applyCaseText(english, theLongCourseFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

/** Wraps mod 1440, per privatetexts/i18n/clock-wrapping. */
const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const endForms = (minutes: number): string[] =>
  minutes % 1440 === 0 ? [clock(minutes), '24:00'] : [clock(minutes)];

const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

/* --------------------------------------------------------------- the contract */

describe('La longue course (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLongCourseFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLongCourseFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLongCourseFr)];

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

  it('gives every claim chip the times the engine actually holds', () => {
    for (const m of messages) {
      for (const c of m.claims ?? []) {
        const times = digitTimes(c.label);
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
   * The contraction trap, which is how this pack failed on registration.
   *
   * Every place name here begins with an article, and French swallows it: `au` is
   * a+le, `du` is de+le. A chip reading `le bar du club` beside a sentence reading
   * `au bar du club` leaves the full name unspoken, and to a player the chip and
   * the message are two different rooms. Each place is therefore asserted with its
   * article intact, which is stricter than the folded check above and fails on
   * exactly the edit that broke this pack.
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

  /**
   * Derived from the English. A player can already know who a thread is with in
   * several ways, so the English decides whether a gate is checked; the invariant
   * belonging to a translation is only that it does not drop a name the English
   * used.
   */
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
    // d10 is the one that carries it, so the rule above is not passing vacuously.
    expect(nameIn(english, 't-imo')).toBe(true);
    expect(body('d10')).toContain('Emma Kerr');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the arc clue */

describe('La longue course (fr) — the arc clue', () => {
  /**
   * Pack 6 is the second arc connection and it only works if the alias lands
   * late. It belongs in the confession and in coda message three, and nowhere a
   * player can reach before the case is solved.
   */
  it('keeps the Keeper a name a French player can carry forward', () => {
    expect(script.confrontation?.confession).toContain('se faisait appeler le Keeper');
    expect(script.coda?.messages[2]).toContain('le Keeper');
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/gardien/i);
  });

  it('says it exactly twice, and never before the end', () => {
    const count = (s: string) => s.split('Keeper').length - 1;

    // The English fixture asserts itself first, so this cannot pass vacuously.
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    expect(count(englishProse), 'the English fixture stopped saying it').toBe(2);
    expect(count([...caseTextEntries(script).values()].join('\n'))).toBe(2);

    const beforeTheEnd = [
      script.title,
      script.blurb,
      script.briefing?.opening ?? '',
      ...messages.map((m) => m.body),
      ...script.contradictions.map((x) => x.revelation),
      ...script.motives.map((m) => m.summary),
    ].join('\n');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /**
   * The thing that makes the call sinister rather than sad: he knew what a fifteen
   * year old said on a raft, which was never in the inquest and never in the
   * paper. Without it the confession is a man blaming a stranger.
   */
  it('keeps the thing the caller could not have known', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Robbie avait demandé à ne pas sortir');
    expect(confession).toContain('jamais été dans l’enquête');
    expect(script.coda?.messages[2]).toContain('quinze ans');
    expect(script.coda?.from).toBe('Numéro inconnu');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('x7')).toContain('S. Brightwell'); // Pauline finds the duty column
    expect(body('x7')).toContain('colonne de permanence');
    expect(body('w9')).toContain('robbie nance'); // Warren supplies who drowned
  });
});

/* --------------------------------------------------------------- the uniform */

describe('La longue course (fr) — the uniform and the timecode', () => {
  /**
   * The lie is identity, so the kit is one pair of words everywhere. Described
   * three different ways it stops being a uniform, and the alibi stops being made
   * of sameness.
   */
  it('keeps the kit one pair of words everywhere', () => {
    for (const text of [body('g5'), body('d9'), body('w4'), revelation('x-imo-seat')]) {
      expect(text, 'the suit lost its name').toContain('combinaison');
    }
    for (const text of [body('g5'), body('d9'), body('w4'), revelation('x-saul-slipway')]) {
      expect(text, 'the hat lost its name').toContain('bonnet');
    }
    expect(pressOf('l-seat')).toContain('combinaison');
  });

  /**
   * Exactly one digit clock in the whole pack, and it is a burned-in camera
   * timecode rather than somebody remembering. The difference between those two is
   * the case, so no message may carry one — Warren says the same minute aloud in
   * w4 as `onze heures zéro huit`.
   */
  it('lets only the burned-in timecode be a digit clock', () => {
    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual([]);
    expect(revelation('x-saul-slipway')).toContain('11:08');
    expect(body('w4')).toContain('onze heures zéro huit');
    expect(pressOf('l-slipway')).toContain('Onze heures zéro huit');
    // And the machine-ness of it survives in both places.
    expect(revelation('x-saul-slipway')).toContain('incrusté par la caméra');
    expect(pressOf('l-slipway')).toContain('incrusté par la caméra');
  });
});

/* ------------------------------------------------------------------ the times */

describe('La longue course (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      c3: ['dix heures cinquante', 'onze heures vingt'], // the eight boated and back
      c6: ['onze heures moins vingt'], // Carol on the towpath
      c7: ['neuf heures et demie'], // the row at the trestles
      d5: ['un peu avant onze heures'], // Pauline into the boathouse
      d7: ['onze heures trois'], // Graham in after her
      d10: ['dix heures et demie'], // Em in senior kit in the changing room
      g4: ['dix heures vingt'], // Graham asks her at the trestles
      x11: ['Neuf heures'], // Pauline in the bar
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-saul-boathouse')).toContain('onze heures trois');
    expect(pressOf('l-boathouse')).toContain('onze heures trois');
    expect(revelation('x-imo-seat')).toContain('dix heures vingt');
    expect(script.briefing?.opening).toContain('onze heures vingt');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La longue course (fr) — the voices', () => {
  /**
   * Pauline and Carol write in complete sentences and finish them. Graham
   * capitalises properly and then never lands a final full stop, which is the
   * whole of him: correct on the surface, unfinished underneath. Warren, Em and
   * the player run lowercase, and neither Warren nor Em capitalises a name.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'hester' || m.senderId === 'dilys') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else if (m.senderId === 'saul') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }

    // Neither of the lowercase pair capitalises the man they are talking about.
    expect(body('c8')).toContain('graham');
    expect(body('c8')).not.toContain('Graham');
    expect(body('g4')).toContain('graham');
    expect(body('g4')).not.toContain('Graham');
  });

  /**
   * The player has no gender, so nothing addressed to them may agree. `tu es
   * venu·e dire` in the opening and `tu as été gentil·le` in the coda are the two
   * this pack offers, and both are built around it instead.
   */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      body('d1'),
    ].join('\n');

    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?|redescendue?)\b/i,
    );
    expect(atPlayer).not.toMatch(/\btu as été (gentille?|correcte?)\b/i);
    // And the rephrases actually shipped.
    expect(script.confrontation?.opening).toContain('Dis ce que tu as à dire');
    expect(script.coda?.messages[1]).toContain('Tu as fait preuve de gentillesse');
  });
});
