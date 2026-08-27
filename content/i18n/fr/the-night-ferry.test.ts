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
import { theNightFerryFr } from './the-night-ferry';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Night Ferry, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS.
 *
 * The lie is a document rather than a memory — he read out the timetable — so
 * what is pinned below is the gap between what should have happened and what the
 * ship's records say did.
 */
const english = getCase('the-night-ferry')!;
const script: CaseScript = applyCaseText(english, theNightFerryFr);

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

/* ------------------------------------------------------- the article, first */

describe('Le ferry de nuit (fr) — the article', () => {
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
    expect(checked).toContain('afterdeck');
    expect(checked).toContain('bar');
  });
});

/* --------------------------------------------------------------- the contract */

describe('Le ferry de nuit (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightFerryFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightFerryFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightFerryFr)];

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
    expect(nameIn(english, 't-eck')).toBe(true);
    expect(body('m10')).toContain('eck');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 14 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------------- the port call */

describe('Le ferry de nuit (fr) — the call that never happened', () => {
  /**
   * The crux. He accounts for an hour ashore at a port the ship never reached,
   * and the place he claims shares no ancestry with anywhere aboard, which is
   * what makes the alibi fall over rather than merely look thin.
   */
  it('keeps the dropped call and the missing gangway', () => {
    expect(body('s2')).toContain('annulée à 21:00');
    expect(body('s3')).toContain('passerelle');
    expect(revelation('x-dougie-kirkwall')).toContain('Aucune passerelle');
    expect(revelation('x-dougie-kirkwall')).toContain('six milles');
    // The rampe is the linkspan he says he stood on. Two different things, and
    // the case needs them to stay two different things.
    expect(body('d5')).toContain('rampe');
    expect(body('e8')).toContain('Rampe en panne');
    expect(pressOf('a-kirkwall')).toContain('rampe');
  });

  /**
   * Only Senga writes a clock in digits, because only Senga is reading records.
   * Hannah's `1730` and `2106` are bare ship's time in a purser's own hand and
   * are not clocks in prose, which is why they do not count here.
   */
  it('lets only the ship’s records carry a digit clock', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual([
      's2',
      's5',
      's7',
    ]);
    expect(body('n4')).toContain('1730');
    expect(body('n10')).toContain('2106');
    expect(digitTimes(body('n10'))).toEqual([]);
    expect(body('s5')).toContain('21:04');
    expect(body('s5')).toContain('23:40');
  });

  /** One phone, one name, on both chips, or the locked object stops being one. */
  it('calls the phone one thing on both chips', () => {
    const name = 'le téléphone de Hannah';
    expect(script.objects.find((o) => o.id === 'phone')?.name).toContain(name);
    expect(label('c-phone-dougie')).toContain(name);
    expect(label('c-phone-marisa')).toContain(name);
    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const a = claimOf('c-phone-dougie').window;
    const b = claimOf('c-phone-marisa').window;
    expect(a.start < b.end && b.start < a.end).toBe(true);
    // The green case is how it is identified in three places.
    expect(body('d8')).toContain('coque verte');
    expect(body('s5')).toContain('coque verte');
    expect(revelation('x-phone')).toContain('coque verte');
  });

  /**
   * The rank is the motive. `capitaine au long cours` against `agent du service
   * général` is a fact rather than a tone, and both are the real French terms.
   */
  it('keeps the rank he claimed apart from the job he did', () => {
    expect(body('m3')).toContain('capitaine au long cours');
    expect(body('s9')).toContain('agent du service général');
    expect(body('s9')).toContain('brevet');
    expect(body('n8')).toContain('Garçon de carré');
    expect(script.confrontation?.confession).toContain('capitaine au long cours');
    expect(script.confrontation?.confession).toContain('Je faisais le carré');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('n8')).toContain('carré'); // Hannah: what he actually was
    expect(body('m3')).toContain('trente et un ans'); // Sheila: what he had been saying
  });
});

/* ------------------------------------------------------------------ the times */

describe('Le ferry de nuit (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      d3: ['huit heures et demie'], // Dougie into the bar
      d5: ['neuf heures et demie', 'onze heures moins le quart'], // the invented hour
      d8: ['dix heures dix'], // and the phone he never handed in
      m2: ['huit heures et demie'], // Hannah into the bar
      m6: ['neuf heures cinq'], // and out for air
      m7: ['neuf heures vingt'], // followed, twenty minutes before he says
      e5: ['neuf heures cinq', 'dix heures vingt-cinq'], // Eck with the nurse
      g5: ['neuf heures et demie'], // Sheila in the group
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-dougie-deck')).toContain('neuf heures vingt');
    expect(pressOf('a-deck')).toContain('neuf heures et demie');
    expect(pressOf('a-phone')).toContain('neuf heures quatre');
    expect(script.briefing?.opening).toContain('onze heures dix');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Le ferry de nuit (fr) — the voices', () => {
  /**
   * Sheila and the player run lowercase and never land a full stop. Everyone else
   * capitalises. Terminal punctuation is derived from the English rather than
   * asserted flat, because Hannah signs off with a kiss rather than a stop and
   * that is hers, not a slip.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'you' || m.senderId === 'marisa') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} does not end as the English does`).toBe(
          englishBody(m.id).endsWith('.'),
        );
      }
    }
    // Sheila does not capitalise the man she is describing.
    expect(body('m3')).toContain('dougie yarrow');
    expect(body('m4')).toContain('RAVIE'); // and shouts exactly once, as the English does
  });

  /**
   * Eck closes on a confirming tic, in the same two messages the English does.
   * His Scots is carried by bluntness rather than by inventing a French dialect,
   * which would turn a specific man from Shetland into a generic rustic.
   */
  it('keeps Eck’s tic where the English puts it', () => {
    const tickedInEnglish = english.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.body.endsWith('Aye.'))
      .map((m) => m.id);
    const tickedInFrench = messages.filter((m) => m.body.endsWith('Voilà.')).map((m) => m.id);
    expect(tickedInFrench).toEqual(tickedInEnglish);
    expect(tickedInFrench.length).toBeGreaterThan(0);
  });

  /**
   * The player's gender is never stated. s1 names the relationship from Hannah's
   * side, which carries the identical fact and marks nobody.
   */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      body('s1'),
      body('d1'),
      body('n10'),
    ].join('\n');

    expect(atPlayer).not.toMatch(/\btu es (son|sa) (fils|fille)\b/i);
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(body('s1')).toContain('elle était ta mère');
  });
});
