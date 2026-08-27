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
import { theReunionFr } from './the-reunion';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Reunion, checked on the things a player reasons over.
 *
 * Applied with `applyCaseText` rather than routed through CASE_TRANSLATIONS.
 *
 * The lie is that he became the clock. Everything below protects the gap between
 * the time on the programme and the time he actually spoke, because collapsing
 * it makes every witness statement in the pack consistent again.
 */
const english = getCase('the-reunion')!;
const script: CaseScript = applyCaseText(english, theReunionFr);

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

const spokenProse = (s: CaseScript): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

/* ------------------------------------------------------- the article, first */

describe('Les retrouvailles (fr) — the article', () => {
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
    // The three `du`-exposed ones must actually be under test.
    expect(checked).toContain('musicblock');
    expect(checked).toContain('carpark');
    expect(checked).toContain('riverpath');
  });
});

/* --------------------------------------------------------------- the contract */

describe('Les retrouvailles (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theReunionFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theReunionFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theReunionFr)];

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
    expect(nameIn(english, 't-tobi')).toBe(true);
    expect(body('r7')).toContain('Tobi');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  /** Pack 13 is standalone: no Listener, no coda, nothing that starts an arc. */
  it('carries none of the campaign arc', () => {
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/keeper|gardien|numéro inconnu/i);
    expect(script.coda).toBeUndefined();
  });

  describeCaseContract(script);
});

/* ------------------------------------------------------------ the time lie */

describe('Les retrouvailles (fr) — the clock he became', () => {
  /**
   * The gap is the case. The programme says nine, he spoke at quarter past
   * eight, and ninety people have been dating the evening off the wrong one
   * since Saturday. Both times are pinned in every place they appear, because
   * collapsing either into the other makes the whole room consistent again.
   */
  it('keeps the two speech times apart everywhere', () => {
    expect(body('r4')).toContain('Neuf heures'); // what he says
    expect(body('k6')).toContain('neuf heures'); // what the programme said
    expect(body('k6')).toContain('huit heures et quart'); // and when he actually spoke
    expect(revelation('x-rafe-speech')).toContain('neuf heures');
    expect(revelation('x-rafe-speech')).toContain('huit heures et quart');
    expect(body('k7')).toContain('huit heures et quart');
    expect(body('k7')).toContain('neuf heures');
    // And the consequence, stated once in full.
    expect(pressOf('a-speech')).toContain('quarante-cinq minutes');
  });

  /**
   * Two machine records, and they are the only messages with a digit clock.
   * Everybody else speaks in words, because nobody at a reunion looks at a
   * watch — which is the sentence the pack turns on.
   */
  it('lets only the invoice and the barrier log carry a digit clock', () => {
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual([
      'k7',
      'c6',
    ]);
    expect(body('k7')).toContain('20:55');
    expect(body('c6')).toContain('21:08');
    expect(body('c6')).toContain('21:19');
    expect(revelation('x-rafe-gate')).toContain('21:08');
    expect(pressOf('a-gate')).toContain('21:19');
    // Vale keeps his round in words, because the round is not a machine.
    expect(body('c5')).toContain('Neuf heures c’est neuf heures');
    expect(digitTimes(body('c5'))).toEqual([]);
  });

  /**
   * Co-presence is never proof — the engine cannot fire on `with_person`, so
   * these four are authored dead ends. Their labels must read as ordinary
   * evidence, or a player will not pin them and will never be told why.
   */
  it('keeps the four co-presence chips looking like evidence', () => {
    const withPerson = messages
      .flatMap((m) => m.claims ?? [])
      .filter((c) => c.predicate.kind === 'with_person');
    expect(withPerson).toHaveLength(4);
    for (const c of withPerson) {
      expect(c.label, `${c.id} does not read as a co-presence claim`).toMatch(/\bavec\b/);
    }
    expect(label('c-marika-with-nia')).toContain('Michelle : avec Nia');
    expect(label('c-nia-with-rafe')).toContain('Nia : avec Mark');
  });
});

/* ------------------------------------------------------------------ the times */

describe('Les retrouvailles (fr) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n10: ['huit heures dix', 'sept heures'], // the letter posted, doors open
      k4: ['neuf heures moins le quart'], // Michelle in the hall
      r2: ['neuf heures moins le quart', 'neuf heures et demie'], // Mark's account
      c2: ['neuf heures'], // the round that does not move
      c3: ['Neuf heures deux ou trois'], // and where he actually was
      c8: ['huit heures et demie'], // Nia thanking the caretaker
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(pressOf('a-music')).toContain('neuf heures trois');
    expect(script.confrontation?.confession).toContain('huit heures dix');
    expect(script.briefing?.opening).toContain('neuf heures et demie');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('n7')).toContain('huit pages'); // Nia: the letter
    expect(body('n7')).toContain('quatre sur cette berge');
    expect(body('k9')).toContain('avant que l’ambulance arrive'); // Michelle: who built it
    expect(body('k8')).toContain('vingt minutes');
  });

  /** The twenty minutes is the whole of 2005 and it is one phrase throughout. */
  it('keeps the twenty minutes intact', () => {
    for (const text of [
      body('k8'),
      script.motives[0]?.summary ?? '',
      pressOf('a-why'),
      script.solution.epilogue,
    ]) {
      expect(text, 'the twenty minutes lost its wording').toContain('vingt minutes');
    }
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Les retrouvailles (fr) — the voices', () => {
  /**
   * Michelle and the player run lowercase and never finish a sentence. That is
   * not decoration: she is the one who never learned to perform, and she is the
   * one telling the truth the whole way through. Nia, Mark, Tobi and Vale all
   * capitalise and finish — Mark most carefully of anyone, which is the thing he
   * has built a career on.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'you' || m.senderId === 'marika') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      }
    }
    // Michelle does not capitalise the man she is accusing either.
    expect(body('g6')).toContain('mark');
    expect(body('k9')).toContain('mark');
  });

  /**
   * Vale holds himself apart from the party by title, which is how a caretaker of
   * thirty-six years talks about people he has known since they were eleven.
   */
  it('keeps Mr Vale on titles', () => {
    expect(body('c3')).toContain('M. Ellory');
    expect(body('c7')).toContain('Mlle Selkirk');
    expect(body('c8')).toContain('Mlle Boateng');
    expect(script.characters.find((c) => c.id === 'corin')?.name).toBe('M. Vale');
  });

  /** The player's gender is never stated. */
  it('keeps the player unmarked', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      body('n1'),
      body('n10'),
    ].join('\n');

    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?|assise?)\b/i,
    );
    expect(script.briefing?.opening).toContain('tu n’as jamais été dans ce groupe');
  });
});
