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
import { openMicFr } from './open-mic';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Open Mic, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS.
 *
 * Two things carry this case and both are pinned below: the running order beats
 * the video because one is a record and the other is a man remembering, and the
 * clip is real but from the wrong week, which only the callback dates.
 */
const english = getCase('open-mic')!;
const script: CaseScript = applyCaseText(english, openMicFr);

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

const countOf = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/* --------------------------------------------------------------- the contract */

describe('Scène ouverte (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(openMicFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, openMicFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(openMicFr)];

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

  /**
   * Raw, unfolded: `au Hatch` and `au bar` would swallow the article and leave
   * the name unspoken. Gated on places the English actually names.
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
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact — check for au/du swallowing it`,
      ).toBe(true);
    }
    expect(checked).toContain('club');
    expect(checked).toContain('bar');
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
    expect(nameIn(english, 't-ferdy')).toBe(true);
    expect(body('k8')).toContain('Kevin');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 10 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------------- the vocative */

describe('Scène ouverte (fr) — the vocative', () => {
  /**
   * A gendered vocative is fine when it lands on another character and a defect
   * when it lands on the player. The thread decides which: in a group, `Fiston`
   * is aimed at whoever is being answered; in a two-person thread the only
   * person to aim it at is the player, whose gender the game never states.
   *
   * So the rule is structural rather than a list of message ids — it holds for
   * any vocative anyone adds later, in any thread.
   */
  /**
   * A vocative, not merely a gendered noun.
   *
   * The first version matched the bare words and flagged f1, where Kevin has
   * had the Nokia `depuis le mariage de ma fille`. That is Kevin's own
   * daughter, faithful to `since my daughter got married`, and it marks nobody
   * — the English passes its own neutrality rule on that line for the same
   * reason.
   *
   * What separates the two is punctuation and a determiner, as
   * `content/cases/playerNeutral.test.ts` sets out: an address is set off by a
   * comma and carries no possessive. `Fiston, ...` or `..., fiston.` is aimed
   * at somebody; `ma fille` inside a noun phrase is a fact about Kevin.
   */
  const TERMS = 'fiston|mon garçon|mon gars|ma grande|mon grand';
  const GENDERED_VOCATIVE = new RegExp(
    String.raw`(?:^|\n|[.?!]\s+)(?:${TERMS}),\s` + '|' + String.raw`,\s*(?:${TERMS})\s*[.,?!]`,
    'i',
  );

  it('allows a gendered vocative only where it can land on somebody else', () => {
    for (const thread of script.threads) {
      if (thread.participantIds.length > 2) continue;
      for (const m of thread.messages) {
        expect(
          GENDERED_VOCATIVE.test(m.body),
          `${m.id} uses a gendered vocative in a two-person thread, so it lands on the player`,
        ).toBe(false);
      }
    }
  });

  it('keeps Kevin putting Dave in his place in the group', () => {
    const club = script.threads.find((t) => t.id === 't-club')!;
    expect(club.participantIds.length).toBeGreaterThan(2);
    expect(body('h8')).toContain('Fiston');
    expect(body('h8')).toContain('au micro');
  });
});

/* -------------------------------------------------- the record and the clip */

describe('Scène ouverte (fr) — the running order and the clip', () => {
  /**
   * Only Kit writes a clock in digits, because Kit wrote it down in biro. That
   * split is why the float sheet beats the video, and if the room starts talking
   * in timestamps the record stops being the hard thing in the case.
   */
  it('lets only Kit state a time in digits', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual([
      'k2',
      'k5',
    ]);
    expect(body('k2')).toContain('21:30');
    expect(body('k2')).toContain('21:55');
    expect(body('k5')).toContain('21:28');
    // And everyone else says the same minutes in words.
    expect(body('h4')).toContain('neuf heures et demie');
    expect(body('f6')).toContain('dix heures moins vingt-cinq');
    expect(body('n9')).toContain('dix heures moins cinq');
  });

  /** One card, one camera, one night — so one name for it on both chips. */
  it('calls the card one thing on both chips and in the object list', () => {
    expect(script.objects.find((o) => o.id === 'card')?.name).toBe('la carte de la caméra');
    expect(label('c-card-gil')).toContain('la carte de la caméra');
    expect(label('c-card-roz')).toContain('la carte de la caméra');
    // The pair must overlap or the engine cannot see the collision.
    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const a = claimOf('c-card-gil').window;
    const b = claimOf('c-card-roz').window;
    expect(a.start < b.end && b.start < a.end).toBe(true);
  });

  /**
   * The callback is the only thing that dates the clip. Priya dropped the swan,
   * so a swan means the week before — one word, everywhere the player meets it.
   */
  it('keeps the swan the thing that dates the footage', () => {
    expect(body('f8')).toContain('cygne');
    expect(revelation('x-marnie-bar')).toContain('cygne');
    expect(pressOf('o-bar')).toContain('cygne');
    // Derived: f8 names it as often as the English does, because the repetition
    // is the argument — there is no swan on Tuesday, the swan is Priya, and the
    // swan bit is from the week before.
    expect(countOf(body('f8'), 'cygne')).toBe(countOf(englishBody('f8'), 'swan'));
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('n5')).toContain('2009'); // Debbie: same month, same list
    expect(body('n5')).toContain('même mois');
    expect(body('r8')).toContain('même mois'); // Roz: and who felt bad about it
    expect(body('r8')).toContain('tournée');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Scène ouverte (fr) — the voices', () => {
  /**
   * Debbie and the player run lowercase. Roz, Kevin and Kit capitalise and
   * finish. Dave capitalises like them and never lands a final full stop in any
   * of his four messages, because he is always mid-pitch: being useful, getting
   * in front of it, trying.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'gil') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else if (m.senderId === 'roz' || m.senderId === 'ferdy' || m.senderId === 'kit') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else {
        // Debbie and the player, lowercase — except the one shout the English
        // also makes, which stays capitals in both languages.
        if (m.body !== m.body.toUpperCase()) {
          expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        }
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }
    // The shout, derived: whichever message the English shouts, French shouts.
    const shoutedInEnglish = english.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.body === m.body.toUpperCase())
      .map((m) => m.id);
    expect(shoutedInEnglish).toEqual(['n2']);
    expect(body('n2')).toBe(body('n2').toUpperCase());
  });

  /** The player's gender is never stated. */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
    ].join('\n');
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (montée?|venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(script.confrontation?.deflections[1]).toContain('mis un pied sur une scène');
  });
});
