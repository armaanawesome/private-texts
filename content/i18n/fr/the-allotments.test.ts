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
import { theAllotmentsFr } from './the-allotments';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Allotments, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS.
 *
 * The raw-article check comes first in this file on purpose. This pack shipped
 * with `secrétaire des jardins familiaux` — `des` is de + les — so the place name
 * was spoken nowhere, and it got through only because the pack was written before
 * its test. Third occurrence of that fault across the team.
 */
const english = getCase('the-allotments')!;
const script: CaseScript = applyCaseText(english, theAllotmentsFr);

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

/** Every sentence a player can read, unfolded, for rules that need the raw string. */
const spokenProse = (s: CaseScript): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

/* ------------------------------------------------------- the article, first */

describe('Les jardins familiaux (fr) — the article', () => {
  /**
   * Compared unfolded, because folding strips punctuation and case but cannot
   * put an article back. French contracts `de les` into `des`, `à les` into
   * `aux`, `de le` into `du` and `à le` into `au`, and every one of those leaves
   * the place name unspoken while the chip still carries it. To a player that is
   * two different places.
   *
   * Gated on names the English actually says, the way the generic rule is.
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
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact — check for des/aux/du/au swallowing it`,
      ).toBe(true);
    }
    // The gate must not swallow everything and pass vacuously. `site` is the one
    // that failed, so it is named explicitly.
    expect(checked).toContain('site');
    expect(checked).toContain('lane');
    expect(checked).toContain('shedrow');
  });

  /** The object has the same exposure and the same fix. */
  it('never lets a contraction eat the object name', () => {
    const spoken = spokenProse(script);
    for (const object of script.objects) {
      expect(
        spoken.includes(object.name),
        `object.${object.id} is "${object.name}" but no sentence says it whole`,
      ).toBe(true);
    }
  });
});

/* --------------------------------------------------------------- the contract */

describe('Les jardins familiaux (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theAllotmentsFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theAllotmentsFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theAllotmentsFr)];

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
    expect(nameIn(english, 't-sami')).toBe(true);
    expect(body('v7')).toContain('sami');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 11 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ---------------------------------------------------- numbers and the camera */

describe('Les jardins familiaux (fr) — plot numbers and the camera', () => {
  /**
   * Plot numbers are how this site names its geography, and the English writes
   * them as numerals inside sentences where French would happily spell them out.
   * It must not. `Year 4` rendered as `quatrième` is the mistake this guards.
   */
  it('keeps every plot number a numeral', () => {
    expect(body('s3')).toContain('la 14');
    expect(body('v5')).toContain('la parcelle 3');
    expect(body('m1')).toContain('la parcelle 22');
    expect(body('m4')).toContain('la 40');
    expect(label('c-deb-plot')).toContain('la parcelle 14');
    expect(label('c-nev-plot3')).toContain('la parcelle 3');
  });

  /**
   * One machine in the pack. The camera says 19:02 and 19:11 in digits because
   * it is a machine; a person saying the same two minutes out loud in the press
   * says them in words, exactly as the English does. Both forms are load-bearing
   * and both are pinned.
   */
  it('lets only the camera state a time in digits', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual(['j3']);
    expect(body('j3')).toContain('19:02');
    expect(body('j3')).toContain('19:11');
    expect(revelation('x-deb-lane')).toContain('19:02');
    expect(revelation('x-deb-lane')).toContain('19:11');
    // And the same minutes, spoken, in the confrontation.
    expect(pressOf('a-lane')).toContain('sept heures deux');
    expect(pressOf('a-lane')).toContain('sept heures onze');
    expect(digitTimes(pressOf('a-lane'))).toEqual([]);
  });

  /**
   * The fork is what everybody argues about and what convicts nobody, so it has
   * one name on both chips and the pair overlaps or the engine cannot see it.
   */
  it('calls the fork one thing on both chips', () => {
    const name = 'la fourche au manche entouré de ruban';
    expect(script.objects.find((o) => o.id === 'fork')?.name).toBe(name);
    expect(label('c-fork-nev')).toContain(name);
    expect(label('c-fork-wilf')).toContain(name);

    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const a = claimOf('c-fork-nev').window;
    const b = claimOf('c-fork-wilf').window;
    expect(a.start < b.end && b.start < a.end).toBe(true);
    // And what it actually proves, which is not whose it is.
    expect(revelation('x-fork')).toContain('debout là où il était debout');
  });
});

/* ------------------------------------------------------------------ the times */

describe('Les jardins familiaux (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      s3: ['de six heures à sept heures et demie'], // Deb on 14, the alibi
      v5: ['à partir de six heures'], // Nev on 3 with a torch
      m7: ['Six heures et demie'], // and the sighting that breaks her
      j7: ['à partir de cinq heures'], // Wilf on the padlocks
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-deb-shedrow')).toContain('six heures et demie');
    expect(pressOf('a-shedrow')).toContain('six heures et demie');
    expect(script.briefing?.opening).toContain('sept heures et demie');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('w6')).toContain('1998'); // Wilf: whose shed it is
    expect(body('w6')).toContain('cabane de Ray');
    expect(body('j8')).toContain('quatre parcelles'); // Joyce: and the letter
    expect(body('j9')).toContain('c’est Wilf qui décide');
  });

  /** The thing that makes it unbearable: he had already decided in her favour. */
  it('keeps the letter and what was in it', () => {
    expect(body('w8')).toContain('raisons humanitaires');
    expect(script.solution.epilogue).toContain('raisons humanitaires');
    expect(script.confrontation?.confession).toContain('poche de son manteau');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Les jardins familiaux (fr) — the voices', () => {
  /**
   * Nev and the player are the two who run lowercase and never land a full stop.
   * Nev has been feuding for fifteen years and types the way he talks. Wilf,
   * Joyce, Sami and Deb capitalise and finish — and Deb finishing hers is part of
   * the performance, since she is the only one of the four selling something.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'you' || m.senderId === 'nev') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      }
    }
    // Nev does not capitalise the people he is talking about either.
    expect(body('v4')).toContain('joyce');
    expect(body('v6')).toContain('deb threlfall');
  });

  /**
   * The player's gender is never stated. The confrontation opens from the dead
   * man's side — `C’était ton père` — which carries the identical fact and marks
   * nobody, and deflection 1 avoids the participle entirely.
   */
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
    expect(atPlayer).not.toMatch(/\btu es (son|sa) (fils|fille)\b/i);
    expect(script.confrontation?.opening).toContain('C’était ton père');
    expect(script.confrontation?.deflections[1]).toContain('remis les pieds');
  });
});
