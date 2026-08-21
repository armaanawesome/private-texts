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
import { deepFieldFr } from './deep-field';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Deep Field, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than looked up through CASE_TRANSLATIONS:
 * a pack the registry does not know about is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". This keeps checking after
 * registration too, which is when the generic rules start running as well.
 */
const english = getCase('deep-field')!;
const script: CaseScript = applyCaseText(english, deepFieldFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const beat = (id: string) => script.confrontation?.beats.find((b) => b.id === id);

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

describe('Champ profond (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(deepFieldFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, deepFieldFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(deepFieldFr)];

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
   * Derived from the English rather than asserted flat. `t-porch` is gated on h4,
   * which is Theo talking in a thread the player already has him in — the English
   * never names him there and does not need to. The invariant that matters is
   * that French does not DROP a name the English used, so the English decides
   * whether each gate is checked.
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
    // And the one that does carry a name is really carrying it, so the rule above
    // is not passing vacuously.
    expect(nameIn(english, 't-rune')).toBe(true);
    expect(body('h8')).toContain('Erik');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 4 is standalone: no Listener, no coda, and nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------------- which clock */

describe('Champ profond (fr) — which clock', () => {
  /**
   * The case is one record kept in the wrong clock, so the conversion has to
   * survive word for word. `c-mal-log` exists to be REJECTED: a player pins it
   * expecting it to fire and the engine answers that these describe different
   * times. If p3 stops stating the offset, that rejection stops being a clue and
   * becomes a bug.
   */
  it('states the offset and both ends of the conversion', () => {
    expect(body('p3')).toContain('UTC plus trois');
    expect(body('p3')).toContain('21:45'); // the log, in the machine clock
    expect(body('p3')).toContain('une heure moins le quart du matin'); // and converted
    expect(body('p2')).toContain('UTC');
    expect(label('c-mal-log')).toContain('00:45–01:30');
    expect(label('c-mal-log')).toContain('journal de la plateforme');
    // And the point of it, in Maria's own words.
    expect(body('p4')).toContain('n’est pas son alibi');
  });

  /**
   * Only the machine records carry a clock in digits: the time of death, the
   * platform log and the card access. Everybody else speaks in words — including
   * Theo reading the camera timestamp aloud in v2, which the English also spells
   * out. If the station starts talking in digits, the records stop being the hard
   * facts and the whole shape of the case flattens.
   */
  it('lets only the three machine records carry digit times', () => {
    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual(['w1', 'p3', 'p6']);
    expect(body('w1')).toContain('02:10');
    expect(body('p6')).toContain('22:35');
    expect(body('p6')).toContain('22:44');
    // The camera time is spoken, not printed.
    expect(body('v2')).toContain('vingt-deux heures onze');
    expect(digitTimes(body('v2'))).toEqual([]);
    // But the revelation built from it is a record again.
    expect(revelation('x-mal-porch')).toContain('22:11');
  });
});

/* ------------------------------------------------------------------ the times */

describe('Champ profond (fr) — the times and the cuff', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      w4: ['dix heures moins le quart', 'onze heures'], // Mal on the platform
      w6: ['dix heures dix'], // Theo sees him in the block
      h2: ['neuf heures', 'onze heures'], // Theo in the mess
      h4: ['dix heures et quart'], // the last sight of Laura
      n1: ['Deux heures dix'], // Erik finds her
      n4: ['dix heures moins dix'], // Erik on the radio
      p9: ['neuf heures et demie', 'minuit'], // Maria's own useless alibi
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-mal-block')).toContain('dix heures moins le quart');
    expect(revelation('x-mal-block')).toContain('dix heures dix');
    expect(beat('f-block')?.press).toContain('dix heures moins le quart');
    expect(beat('f-block')?.press).toContain('dix heures dix');
  });

  /**
   * The torn cuff is the only thing that puts a name on the sleeve, so it is one
   * phrase in all four places the player meets it. Two phrasings would be two
   * different marks on two different parkas.
   */
  it('keeps the torn cuff one thing everywhere', () => {
    expect(body('v3')).toContain('manchette');
    expect(revelation('x-mal-porch')).toContain('manchette déchirée');
    expect(beat('f-porch')?.press).toContain('manchette');
    expect(beat('f-porch')?.rebuttal).toContain('manchette');
    // And the garment it is on is the same word as the four red ones.
    expect(body('w7')).toContain('parkas rouges');
    expect(body('v3')).toContain('parka');
    expect(script.confrontation?.confession).toContain('sa parka');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('o4')).toContain('fibrillation auriculaire'); // Laura finds it
    expect(body('p8')).toContain('dix-neuf saisons'); // and Maria supplies the cost
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Champ profond (fr) — the voices', () => {
  /**
   * Six people. Laura and Theo run lowercase and never land a final full stop;
   * Mal and Maria write in full sentences; Erik only ever sends voice notes, so
   * every message of his opens on a bracketed duration. The player is lowercase
   * and short.
   */
  it('keeps the voices apart', () => {
    const names = script.characters.map((c) => c.name);
    const opensOnAName = (text: string): boolean => names.some((n) => text.startsWith(n));

    for (const m of messages) {
      if (m.senderId === 'rune') {
        expect(m.body.startsWith('[note vocale,'), `${m.id} is not a voice note`).toBe(true);
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else if (m.senderId === 'mal' || m.senderId === 'pilar') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else {
        if (!opensOnAName(m.body)) {
          expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        }
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      }
    }

    // Erik's reading is stated plainly and never treated as a clue.
    expect(body('n2')).toContain('je lis mal');
    expect(body('h8')).toContain('n’en fais pas une histoire');
  });

  /**
   * The player has no gender. The English confrontation opening says "a man in
   * Cambridge", which marks them; French says `quelqu’un à Cambridge`, which
   * keeps Mal just as dismissive and marks nobody. Pinned so a later pass does
   * not "restore" it from the English.
   */
  it('keeps the player unmarked', () => {
    expect(script.confrontation?.opening).toContain('quelqu’un à Cambridge');
    const atPlayer = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      body('o11'),
    ].join('\n');
    expect(atPlayer).not.toMatch(/\b(un homme|une femme) à Cambridge\b/i);
    expect(atPlayer).not.toMatch(/\btu es (très )?(sûr|sûre|certain|certaine)\b/i);
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
  });
});
