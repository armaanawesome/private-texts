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
import { sundayServiceFr } from './sunday-service';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Sunday Service, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS, so
 * it keeps checking whether or not the registry knows about the pack.
 *
 * This pack has no casing axis — five of six voices write standard prose and land
 * a full stop — so the voice test below pins a *behavioural* marker per person
 * rather than a capital letter. See the header of ./sunday-service.ts.
 */
const english = getCase('sunday-service')!;
const script: CaseScript = applyCaseText(english, sundayServiceFr);

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

describe('L’office du dimanche (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(sundayServiceFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, sundayServiceFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(sundayServiceFr)];

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
   * The raw-article check, compared unfolded because folding is lossy in exactly
   * the way that hides this: French contracts `à le` into `au` and `de le` into
   * `du`, so a chip reading `le clocher` beside a sentence reading `du clocher`
   * leaves the full name unspoken.
   *
   * Gated on places the English actually names, the way the generic rule is.
   * `Pam's house` and `the church car park` are defined here but never spoken in
   * any sentence, so an unconditional check would fail `sunday-service · en` —
   * the pack, not the translation.
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
    // The gate must not swallow everything and pass vacuously.
    expect(checked).toContain('tower');
    expect(checked).toContain('nave');
    expect(checked).toContain('vestry');
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
    expect(nameIn(english, 't-jack')).toBe(true);
    expect(body('e8')).toContain('Jack');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 8 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the register */

describe('L’office du dimanche (fr) — the register', () => {
  /**
   * The exclusive pair. Their windows overlap — one nested inside the other —
   * because the engine cannot see the collision otherwise, so the window is
   * machinery and each label names what was asserted instead.
   */
  it('keeps the two register chips naming their assertions', () => {
    expect(label('c-cordy-signed-out')).toContain('le 11 mars');
    expect(label('c-cordy-never-register')).toContain('n’a jamais touché aux registres');

    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const out = claimOf('c-cordy-signed-out').window;
    const never = claimOf('c-cordy-never-register').window;
    expect(
      out.start < never.end && never.start < out.end,
      'the exclusive pair must overlap or the engine cannot see the collision',
    ).toBe(true);
  });

  /** The forged entry is the case, and it is one number everywhere. */
  it('keeps entry 114 and the roofless August intact', () => {
    for (const text of [body('a3'), body('a11'), pressOf('v-why'), script.solution.epilogue]) {
      expect(text, 'the entry lost its number').toContain('114');
    }
    expect(body('a8')).toContain('pas de toit');
    expect(body('j2')).toContain('août 1974');
    expect(pressOf('v-why')).toContain('août 1974');
  });

  /** Nobody in this village types a timestamp; the digits live on the chips. */
  it('lets no message carry a digit clock', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual([]);
  });
});

/* ------------------------------------------------------------------ the times */

describe('L’office du dimanche (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      e3: ['De sept heures à huit heures dix'], // Denise shut in the tower
      e4: ['huit heures dix'], // and let out
      j7: ['Huit heures dix'], // by Jack, who agrees
      j9: ['vers huit heures moins vingt'], // Pam into the vestry
      i6: ['huit heures vingt'], // her car under the yew
      i8: ['à partir de sept heures'], // Avril in the vestry from seven
      p1: ['neuf heures et demie'], // and found at half nine
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-cordy-vestry')).toContain('huit heures moins vingt');
    expect(revelation('x-cordy-carpark')).toContain('huit heures vingt');
    expect(pressOf('v-vestry')).toContain('huit heures moins vingt');
    expect(pressOf('v-carpark')).toContain('huit heures vingt');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('a8')).toContain('1974'); // Jack via Avril: no roof
    expect(body('i9')).toContain('quarante ans'); // Grace: what it all rests on
    expect(body('i9')).toContain('plaque');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('L’office du dimanche (fr) — the voices', () => {
  /**
   * Casing separates only the player here, so the axis is what each person does
   * with a fact. Each marker below is that person's habit, not their punctuation.
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

  it('keeps each voice doing its own thing with a fact', () => {
    // Avril describes the page and hands the conclusion over — a1 is a question.
    expect(body('a1').endsWith('?')).toBe(true);
    expect(body('a3')).toContain('réglure');
    // Jack states where she was and refuses to say what it means.
    expect(body('j10')).toContain('Je ne dis pas ce que ça veut dire');
    expect(body('j10')).toContain('Je dis où elle était');
    // Dates anchored to his own life rather than to any record. The certainty
    // itself is impersonal in both languages — the English is "the way you are
    // certain", so French takes `on ... son propre nom`, not `mon`.
    expect(body('j4')).toContain('Mon père est mort en février 1975');
    expect(body('j4')).toContain('son propre nom');
    // Denise attaches her standing to the fact.
    expect(body('e1')).toContain('quatre ans');
    expect(body('e1')).toContain('trente-six ans');
    expect(body('e1')).toContain('pas d’ici');
    // Pam answers with length of service. It is her argument and her motive.
    expect(body('p3')).toContain('Vingt-deux ans');
    expect(script.confrontation?.opening).toContain('depuis 1985');
    expect(script.confrontation?.confession).toContain('quarante ans');
    // Grace answers with the rule, and with what she could not do.
    expect(body('i1')).toContain('je le fais mal');
    // Lowercased: the clause opens a sentence, so French capitalises it.
    expect(body('i2').toLowerCase()).toContain('ce n’est pas une règle que j’ai inventée');
    expect(body('i2')).toContain('dans le règlement');
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
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?)\b/i,
    );
    expect(script.confrontation?.deflections[1]).toContain('Toi, tu travailles sur du papier');
  });
});
