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
import { theHelplineFr } from './the-helpline';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Helpline, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS.
 *
 * This is the pack where register carries the weight, so the voice test below
 * checks a behavioural marker per person rather than casing — casing separates
 * only the player here, because everybody else is trained to write carefully.
 */
const english = getCase('the-helpline')!;
const script: CaseScript = applyCaseText(english, theHelplineFr);

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

const spokenProse = (s: CaseScript): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

const countOf = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/* ------------------------------------------------------- the article, first */

describe('La ligne d’écoute (fr) — the article', () => {
  /**
   * Unfolded, because folding cannot put an article back. `le bureau` is the
   * exposed name here — `au bureau` and `du bureau` both swallow it — and the
   * office is where she died, so a chip that matches no sentence is the worst
   * possible one to lose.
   */
  it('never lets a contracted preposition eat a place name', () => {
    const englishProse = proseOf(english);
    const spoken = spokenProse(script);

    const checked: string[] = [];
    for (const place of script.places) {
      const englishName = fold(english.places.find((e) => e.id === place.id)?.name ?? '');
      if (englishName === '' || !englishProse.includes(englishName)) continue;
      checked.push(place.id);
      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact`,
      ).toBe(true);
    }
    expect(checked).toContain('office');
    expect(checked).toContain('callroom');
    expect(checked).toContain('branch');
  });
});

/* --------------------------------------------------------------- the contract */

describe('La ligne d’écoute (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theHelplineFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theHelplineFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theHelplineFr)];

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
    expect(nameIn(english, 't-sunny')).toBe(true);
    expect(body('y9')).toContain('Sunny');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the arc clue */

describe('La ligne d’écoute (fr) — the arc clue', () => {
  /**
   * Fourth arc connection. Clue 5 — that he is one of them — lands in the
   * confession only, and the coda confirms it. Nothing a player can reach before
   * solving may say the word.
   */
  it('keeps the Keeper a name a French player can carry forward', () => {
    expect(script.confrontation?.confession).toContain('se faisait appeler le Keeper');
    expect(script.coda?.messages[1]).toContain('le Keeper');
    expect([...caseTextEntries(script).values()].join('\n')).not.toMatch(/gardien/i);
  });

  it('says it as many times as the English does, and never before the end', () => {
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
    ].join('\n');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /**
   * The clue itself: he recognised the technique while it was being used on him.
   * `la reformulation` is the actual counselling term, which is what makes it a
   * thing a trained listener would name rather than describe.
   */
  it('keeps the technique he recognised', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('reformulation');
    expect(confession).toContain('il est des nôtres');
    expect(script.coda?.messages[1]).toContain('à sa manière d’être');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('c6')).toContain('2011'); // Connie: what he has been doing
    expect(body('p7')).toContain('2011'); // Prem: and that she was taking it up
    expect(body('p7')).toContain('quatorze');
  });
});

/* ------------------------------------------------------------ the two records */

describe('La ligne d’écoute (fr) — the book and the panel', () => {
  /**
   * Only Prem writes a clock in digits, because only Prem is reading from the two
   * written records. Everyone else says the same minutes out loud in words. That
   * split is the case: one record is handwriting and one is a machine.
   */
  it('lets only the written records carry digit times', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual([
      'p2',
      'p5',
    ]);
    expect(body('p2')).toContain('02:10');
    expect(body('p2')).toContain('03:40');
    expect(body('p5')).toContain('02:55');
    expect(body('p5')).toContain('03:05');
    // Alun says his own ninety minutes in words, which is what the book records.
    expect(body('b4')).toContain('deux heures dix');
    expect(body('b4')).toContain('quatre heures moins vingt');
    expect(label('c-alun-oncall')).toContain('02:10–03:40');
  });

  /** The lamps are the thing a new volunteer could not have misread. */
  it('keeps the unlit lamps and what they mean', () => {
    expect(body('y4')).toContain('voyants');
    expect(body('y5')).toContain('voyants éteints');
    expect(revelation('x-alun-call')).toContain('voyants éteints');
    expect(pressOf('p-call')).toContain('voyants éteints');
    // Derived: y5 counts them as often as the English does.
    expect(countOf(body('y5'), 'quatre')).toBe(countOf(englishBody('y5'), 'four'));
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      y2: ['de deux heures à quatre heures'], // Yusuf in the call room
      y5: ['deux heures et demie', 'trois heures et demie'], // the unlit hour
      y7: ['deux heures et demie'], // Alun through to the office
      y8: ['minuit'], // Connie in there from midnight
      b7: ['deux heures et demie'], // and what Alun says he heard
      p3: ['deux heures', 'quatre heures'], // the telecoms bill
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-alun-office')).toContain('deux heures et demie');
    expect(pressOf('p-office')).toContain('deux heures et demie');
    // The panel time, spoken aloud in the press rather than printed.
    expect(pressOf('p-stairs')).toContain('trois heures moins cinq');
    expect(digitTimes(pressOf('p-stairs'))).toEqual([]);
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La ligne d’écoute (fr) — the voices', () => {
  /**
   * Register is the point of this pack. Everybody except the player writes in
   * full sentences and finishes them, because they are trained to, so the
   * separation has to be behavioural.
   */
  it('keeps the player the only one who does not finish a sentence', () => {
    for (const m of messages) {
      if (m.senderId === 'you') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(
          m.body.endsWith('.') || m.body.endsWith('?'),
          `${m.id} does not finish its sentence`,
        ).toBe(true);
      }
    }
  });

  it('keeps each voice doing its own thing under pressure', () => {
    // Alun is the only one who trails off, and he does it exactly where the
    // English does. Derived, because the ellipsis is his tell and not a style.
    const trailsInEnglish = english.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.body.includes('...'))
      .map((m) => m.id);
    const trailsInFrench = messages.filter((m) => m.body.includes('...')).map((m) => m.id);
    expect(trailsInFrench).toEqual(trailsInEnglish);
    // And his first deflection hands the silence back rather than denying.
    expect(script.confrontation?.deflections[0]).toContain('?');

    // Connie names the cost to other people before her own.
    expect(body('c11')).toContain('qui m’empêche de dormir');
    // Yusuf counts his own inexperience into the answer.
    expect(body('y1')).toContain('quatre permanences');
    expect(body('y7')).toContain('quatre fois');
    // Sunny says the thing nobody joined up, and that she liked him anyway.
    expect(body('s1')).toContain('cinq mois');
    expect(body('s7')).toContain('je l’aimais bien');
    // Prem cites the rule, then what he has had to do against it.
    expect(body('p1')).toContain('le contraire');
  });

  /**
   * The player's gender is never stated. French agreement pushes hard here —
   * `formé`, `réveillé`, `assis` — so all three are built around it.
   */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      body('c1'),
      body('p8'),
    ].join('\n');

    expect(atPlayer).not.toMatch(/\bt’a formée?\b/i);
    expect(atPlayer).not.toMatch(/\btu es (réveillée?|assise?|venue?|allée?|restée?)\b/i);
    expect(atPlayer).not.toMatch(/\boù tu es assise?\b/i);
  });
});
