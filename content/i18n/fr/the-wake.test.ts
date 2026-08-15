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
import { theWakeFr } from './the-wake';

/**
 * The French Wake, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than looked up through CASE_TRANSLATIONS,
 * so this keeps checking whether or not the registry knows about the pack.
 */
const english = getCase('the-wake')!;
const script: CaseScript = applyCaseText(english, theWakeFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const beat = (id: string) => script.confrontation?.beats.find((b) => b.id === id);

const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/**
 * Wrapped. Every window in this pack is tens of thousands of minutes past the
 * case epoch — funeral day is day 43 — so an unwrapped divide renders 16:00 as
 * 1024:00 and reports every correct chip as a mismatch.
 */
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

const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

/* --------------------------------------------------------------- the contract */

describe('La veillée (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theWakeFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theWakeFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theWakeFr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
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

  /**
   * Every place name has to be a word the prose actually says, not only a word
   * on a chip — matching a chip to a sentence is the move the whole game is made
   * of. The Spanish Deep Field named a place `el exterior` while its prose said
   * `fuera` throughout, and the chip matched nothing.
   */
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
   * Derived from the English rather than asserted flat. A player can already know
   * who a thread is with in several ways — named in the gate, named earlier in
   * the same conversation, or because they sent the opening message — so the
   * English decides whether each gate is checked. The invariant that belongs to a
   * translation is only that it does not DROP a name the English used.
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
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 5 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------- the collective alibi */

describe('La veillée (fr) — the sentence forty-one people said', () => {
  /**
   * The lie is a recitation, so it has to be the same words in every mouth. If
   * each speaker phrases it their own way it stops reading as something the
   * family agreed on in a hallway and becomes four people who happen to agree,
   * which is a different case entirely.
   */
  it('says the collective alibi in identical words everywhere', () => {
    // Case-insensitive on purpose. The sentence is the same words in every
    // mouth, but f6 opens on it and so capitalises it while f4 and u2 carry it
    // mid-message. Requiring the lowercase form would force Maureen to start a
    // message in lower case, which is the one thing her voice never does.
    for (const [where, text] of [
      ['f4 (Donal)', body('f4')],
      ['f6 (Maureen)', body('f6')],
      ['u2 (Maureen explaining)', body('u2')],
    ] as const) {
      expect(text.toLowerCase(), `${where} no longer recites the sentence`).toContain(
        'on était tous dans le salon',
      );
    }
    // The player throws it back, and Eileen answers for it.
    expect(body('r5')).toContain('tout le monde était dans le salon');
    expect(body('r8')).toContain('on a dit le salon');
    // And the confession says who actually built it.
    expect(script.confrontation?.confession).toContain('on était tous dans le salon');
  });

  /** The reason it was built, which is the whole inversion of the pack. */
  it('keeps the shield pointed at Cass, not at Donal', () => {
    expect(body('r7')).toContain('quatre cents livres');
    expect(body('r8')).toContain('C’était pour elle');
    expect(body('k11')).toContain('ils étaient gentils avec moi');
    expect(revelation('x-cass-return')).toContain('passage latéral');
  });
});

/* ------------------------------------------------------------------ the times */

describe('La veillée (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      f4: ['quatre heures'], // the speeches, from four
      r3: ['quatre heures dix'], // Eileen in her kitchen
      k4: ['quatre heures'], // Cass out the side from four
      k5: ['quatre heures dix'], // Donal comes out
      u4: ['onze heures dix'], // the last prescription, the Tuesday
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-donal-garden')).toContain('quatre heures dix');
    expect(revelation('x-donal-glasses')).toContain('quatre heures dix');
    expect(beat('w-garden')?.press).toContain('quatre heures dix');
    expect(beat('w-glasses')?.press).toContain('quatre heures dix');
    expect(script.briefing?.opening).toContain('cinq heures');
  });

  /**
   * Nobody at this funeral types a timestamp. The chips carry the digits and the
   * family speaks in words, which is most of what keeps the prose sounding like
   * grief rather than a report.
   */
  it('lets no message carry a digit clock', () => {
    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual([]);
    // But the chips do, and they agree with the engine.
    expect(label('c-donal-front')).toContain('16:00–16:30');
    expect(label('c-donal-garden')).toContain('16:10–16:20');
    expect(label('c-donal-collected')).toContain('10:00–12:00');
  });

  /** The dose is the motive and it is one phrasing in all four places. */
  it('keeps the morphine arithmetic identical wherever it appears', () => {
    for (const text of [
      body('y4'),
      body('u6'),
      revelation('x-donal-scripts'),
      beat('w-why')?.press ?? '',
    ]) {
      expect(text, 'the hundred and eighty lost its wording').toContain('ent quatre-vingts millilitres');
    }
    expect(body('y4')).toContain('5 mg');
    expect(revelation('x-donal-scripts')).toContain('cinq millilitres');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La veillée (fr) — the voices', () => {
  /**
   * Six people. Eileen finishes every sentence; Maureen capitalises and then
   * never punctuates the end, the way somebody types a long message on a phone.
   * Tony, Donal, Cass and the player run lowercase throughout — and Cass does not
   * capitalise names, which is the line between her and her mother.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'bridie') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else if (m.senderId === 'nuala') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        // f12 is the exception, and it is the point of f12: a full stop used as
        // a rebuke, on one word, to her husband.
        if (m.id !== 'f12') {
          expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
        }
      } else {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }

    expect(body('f12')).toBe('Donal.');
    // Cass does not capitalise anybody, including the man she is accusing.
    expect(body('k5')).toContain('donal');
    expect(body('k5')).not.toContain('Donal');
    expect(body('k8')).toContain('tonton tony');
  });

  /**
   * The player's gender is never stated. `tu es venu` in Eileen's opening line or
   * `je t'ai vue` in Tony's would decide it in the first message of a thread.
   */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      body('y1'),
      body('y10'),
      body('r1'),
      body('k1'),
    ].join('\n');
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(atPlayer).not.toMatch(/\bje t’ai (vue?|aperçue?|repérée?)\b/i);
    // And the two rephrases that avoid it are the ones actually shipped.
    expect(body('r1')).toContain('Tu as fait le déplacement');
    expect(body('y10')).toContain('tu étais au fond de l’église');
  });
});
