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
import { theLighthouseFr } from './the-lighthouse';

/**
 * The French Lighthouse, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically. This file is deliberately not routed through
 * CASE_TRANSLATIONS: the orchestrator registers translations, several packs are
 * in flight at once, and a translation that only starts being checked on the day
 * somebody edits a registry is a translation nobody checked. So the object is
 * imported and applied directly, and the generic contract is re-run here against
 * it — cheap, because it calls the same exported functions caseText.test.ts does.
 *
 * The rest is what no generic test can ever see. This case states nearly all of
 * its times in words — `twenty to ten`, not 21:40 — and a French line reading
 * `dix heures et demie` there leaves every id, number and paragraph check green
 * and the case unsolvable by reading, which is the only way anybody solves it.
 *
 * Deliberately brittle. Rewording one of these lines should break a test,
 * because rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-lighthouse')!;
const script: CaseScript = applyCaseText(english, theLighthouseFr);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const clock = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
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

/* --------------------------------------------- the contract, checked up front */

describe('Le phare (fr) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLighthouseFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLighthouseFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLighthouseFr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has broken
      // this build twice. French needs apostrophes constantly, so this is the
      // rule most likely to be broken here of anywhere in the repo.
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
    for (const t of script.threads) {
      for (const m of t.messages) {
        for (const c of m.claims ?? []) {
          const times = digitTimes(c.label);
          if (times.length === 0) continue;
          const end = c.window.end % 1440 === 0 ? '24:00' : clock(c.window.end);
          const acceptable = [[clock(c.window.start)], [clock(c.window.start), end]];
          expect(
            acceptable.some((form) => form.join('|') === times.join('|')),
            `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
              `${clock(c.window.start)}–${clock(c.window.end)}`,
          ).toBe(true);
        }
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

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  // And it is still a case: every engine guarantee, on the French script.
  describeCaseContract(script);
});

/* ------------------------------------------------------------------ the times */

describe('Le phare (fr) — the times', () => {
  /**
   * Every time the case turns on, in the message that states it.
   *
   * Two chains have to survive intact or the case cannot be reasoned about.
   * Mairi puts herself in the café from half eight until eleven (m6) and Fiona
   * puts her on the cliff path at 21:47 (e10) — that pair is contradiction two.
   * Mairi turns at the gate (n3) and Callum puts her at the door at ten past ten
   * (k6) — that pair is contradiction three, and it is the one that convicts her.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g10: ['à huit heures'], // the last boat in, 19:00–20:00
      g12: ['dix heures moins vingt', 'dix heures et quart'], // the slipway, 21:40–22:15
      m6: ['huit heures et demie', 'onze heures'], // the café alibi she gives twice
      m8: ['neuf heures'], // Callum put in the café with her, 21:00–23:00
      m11: ['Neuf heures et quart'], // the player in the café, 21:05–21:30
      m13: ['onze heures moins vingt'], // cashing up, 22:35–23:00
      m15: ['après onze heures'], // Fiona's light on, 23:00–24:00
      e5: ['sept heures', 'neuf heures et demie'], // the cottage, 19:00–21:30
      e6: ['une demi-heure'], // the lull that puts her on the path
      k5: ['dix heures et quart'], // finished the line, then up the back way
      k6: ['dix heures dix'], // the door. the sighting that convicts her
      k9: ['après onze heures'], // home, and the coat into the machine
      n9: ['Neuf heures et demie'], // the call from the Keeper
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The proofs and the endgame have to name the same minutes the messages did,
    // or the player is reading two different stories about one night.
    expect(revelation('x-mairi-path')).toContain('huit heures et demie jusqu’à onze heures');
    expect(revelation('x-mairi-door')).toContain('dix heures dix');
    expect(revelation('x-papers-lie')).toContain('neuf heures et demie');

    expect(press('b-path')).toContain('huit heures et demie jusqu’à onze heures');
    expect(press('b-door')).toContain('dix heures dix');
    expect(script.confrontation?.confession).toContain('neuf heures et demie du soir');
  });

  /**
   * The split that makes the case work.
   *
   * Fiona is the only person in Ardnoe who writes a clock down, and that is
   * exactly why she is believed over a woman with forty years of goodwill. If a
   * translator tidies the village into digits — Callum saying 22:10 instead of
   * `dix heures dix` — everyone sounds equally precise and the player has no
   * reason to prefer the log.
   */
  it('lets only Fiona write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['e7', 'e10']);
    expect(body('e7')).toContain('21:40');
    expect(body('e7')).toContain('22:00');
    expect(body('e10')).toContain('21:47');
  });
});

/* -------------------------------------------------------------- the arc clue */

describe('Le phare (fr) — the arc clue', () => {
  /**
   * The first thing the Listener ever leaves behind, and it has to stay legible
   * fourteen cases later.
   *
   * `le Gardien` is the obvious French reading and it is wrong. He gives this
   * name in a care home, a rowing club, a canal and a crisis line, none of which
   * has a lighthouse in it, and it pre-empts what the finale pays off: eleven box
   * files in a wardrobe, one per person, and `I have kept all of them`. He is the
   * keeper of records. Pack 1 only looks like it is about a lighthouse.
   *
   * The word stays English in every locale, enforced across all of them by
   * content/i18n/arcAlias.test.ts — which counts mentions rather than merely
   * finding one, because keeping the first and paraphrasing the second breaks
   * recognition at exactly the moment the arc is handed over. That count is
   * asserted here too, since French is not registered yet and arcAlias.test.ts
   * only walks the registry.
   */
  it('keeps the Keeper a name a French player can carry forward', () => {
    expect(body('n9')).toContain('se faisait appeler le Keeper');
    expect(revelation('x-papers-lie')).toContain('le Keeper');
    // Never the translated form, in any casing.
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/gardien/i);
    // Mention for mention with the English, not just present somewhere.
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    expect(count(englishProse), 'the English fixture stopped saying it').toBe(2);
    expect(count(prose), 'French has a different number of alias mentions').toBe(
      count(englishProse),
    );
  });

  /**
   * And the lie itself: the auditors never had the papers, so the call was not a
   * mistake. Without this sentence the contradiction proves nothing chilling.
   */
  it('keeps the papers lie provable', () => {
    expect(revelation('x-papers-lie')).toContain('Les auditeurs n’ont jamais eu ces papiers');
    expect(revelation('x-papers-lie')).toContain('n’était pas une erreur');
    expect(body('n10')).toContain('les auditeurs');
    expect(body('g17')).toContain('carnet de relevés');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('r7')).toContain('deux ans de comptes'); // Ruth names the hole
    expect(body('r7')).toContain('trou');
    expect(body('k11')).toContain('l’argent c’était le mien'); // Callum says whose it was
    expect(body('k11')).toContain('les comptes de ruth');
  });

  /**
   * The player finds Mairi by matching a pronoun to a job. Ruth says "she" is
   * coming tonight; Mairi says she keeps the books. If the two lines stop using
   * the same words the deduction stops being available in French.
   */
  it('keeps the she-who-keeps-the-books step readable', () => {
    expect(body('r10')).toContain('elle doit venir me voir ce soir');
    expect(body('m2')).toContain('elle doit venir me voir ce soir');
    expect(body('m3')).toContain('c’est toi qui tiens les comptes');
    expect(body('g18')).toContain('les comptes de la Fondation');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Le phare (fr) — the voices', () => {
  const RUTH = ['r1', 'r3', 'r4', 'r6', 'r7', 'r9', 'r10', 'r12', 'r13'];
  const CALLUM = [
    'g3', 'g8', 'g10', 'g12', 'g13', 'g15',
    'k1', 'k2', 'k4', 'k5', 'k6', 'k7', 'k9', 'k10', 'k11', 'k12',
  ];
  const MAIRI = [
    'g1', 'g2', 'g7', 'g14', 'g16', 'g18', 'g20',
    'm1', 'm4', 'm5', 'm6', 'm8', 'm10', 'm11', 'm13', 'm14', 'm15', 'm16',
    'n1', 'n2', 'n3', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11',
  ];
  const FIONA = [
    'g4', 'g9', 'g17',
    'e1', 'e2', 'e4', 'e5', 'e6', 'e7', 'e9', 'e10', 'e12', 'e13', 'e14',
  ];
  const YOU = [
    'r2', 'r5', 'r8', 'r11', 'r14', 'r15',
    'g5', 'g6', 'g11', 'g19',
    'm2', 'm3', 'm7', 'm9', 'm12',
    'e3', 'e8', 'e11', 'k3', 'k8', 'n4',
  ];

  it('accounts for every message in the case exactly once', () => {
    const all = script.threads.flatMap((t) => t.messages.map((m) => m.id)).sort();
    expect([...RUTH, ...CALLUM, ...MAIRI, ...FIONA, ...YOU].sort()).toEqual(all);
    expect(all).toHaveLength(88);
  });

  /** Ruth: lowercase, and she never lands a full stop at the end of a message. */
  it('keeps Ruth typing the way a woman alone in a tower types', () => {
    for (const id of RUTH) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // But she capitalises the people. That is the whole distance between her and
    // her neighbour's son, who types the same way and does not.
    expect(body('r3')).toContain('Callum');
    expect(body('r3')).toContain('Mairi');
  });

  /** Callum: lowercase all the way down, including the names. */
  it('keeps Callum blunt and uncapitalised', () => {
    for (const id of CALLUM) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('k11')).not.toContain('Ruth');
    expect(body('k9')).not.toContain('Mère');
  });

  /** Mairi and Fiona write like adults with a pen: capitals, and they finish. */
  it('keeps Mairi and Fiona writing in sentences', () => {
    for (const id of [...MAIRI, ...FIONA]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // Mairi asks a question with a full stop on it. She is not really asking.
    expect(body('m11')).toContain('Tu t’en souviens.');
  });

  /** The player is thumbing a phone: lowercase and short. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
    }
    // Except once. The only shout in the case, and the English shouts here too.
    expect(body('r11')).toContain('QUI');
  });

  /**
   * The player's gender is never stated, so no participle addressed to them may
   * agree. `tu es arrivée` in the briefing or `tu es partie` in a deflection is
   * the easy way to lose this, and it reads as the game having decided.
   */
  it('keeps the player genderless', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      body('r3'),
      body('g7'),
      body('m11'),
      body('m16'),
      body('e1'),
    ].join('\n');
    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais|seras) (venue?|allée?|partie?|arrivée?|restée?|entrée?)\b/i,
    );
    expect(atPlayer).not.toMatch(/\bt’aurait (emportée|jetée|poussée)\b/i);
  });
});

/* ------------------------------------------------------------------ the names */

describe('Le phare (fr) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('point')).toBe('la pointe d’Ardnoe');
    expect(place('lighthouse')).toBe('le phare');
    expect(place('path')).toBe('le chemin de la falaise');
    expect(place('cafe')).toBe('le café');
    expect(place('slip')).toBe('la rampe');
    expect(place('cottage')).toBe('la maisonnette');
    expect(place('ferry')).toBe('le ferry');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('ruth')).toBe('Ruth');
    expect(character('mairi')).toBe('Mairi');
    expect(character('callum')).toBe('Callum');
    expect(character('esme')).toBe('Fiona');

    // Ardnoe itself survives: it is the group thread title and the first word
    // the Listener says in the coda.
    expect(script.threads.find((t) => t.id === 't-group')?.title).toBe('Ardnoe');
    expect(script.coda?.messages[0]).toContain('Ardnoe');
  });

  /**
   * A chip and a sentence have to use the same words or they are two things to a
   * player. The slipway is the one that matters most: `la rampe` on Callum's chip
   * against `le café` on Mairi's is contradiction one, and he says it himself in
   * the group before she contradicts him.
   */
  it('uses one word for the slipway on the chip and in the prose', () => {
    expect(label('c-callum-slip')).toContain('sur la rampe');
    expect(body('g12')).toContain('sur la rampe');
    expect(body('g8')).toContain('sur la rampe');
    expect(body('k2')).toContain('sur la rampe');
    expect(press('b-alibi')).toContain('sur la rampe');
    expect(label('c-mairi-door')).toContain('à la porte du phare');
    expect(body('k6')).toContain('à la porte du phare');
  });
});
