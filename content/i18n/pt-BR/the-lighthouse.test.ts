import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theLighthousePtBr } from './the-lighthouse';

/**
 * The Brazilian Portuguese Lighthouse, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically. This file is deliberately not routed through
 * CASE_TRANSLATIONS: the orchestrator registers translations, several packs are in
 * flight at once, and a translation that only starts being checked on the day
 * somebody edits a registry is a translation nobody checked. So the object is
 * imported and applied directly, and the generic contract is re-run here against
 * it — cheap, because it calls the same exported functions caseText.test.ts does.
 *
 * The rest is what no generic test can ever see. This case states nearly all of
 * its times in words — `vinte pras dez`, not 21:40 — and a Portuguese line reading
 * `dez e meia` there leaves every id, number and paragraph check green and the
 * case unsolvable by reading, which is the only way anybody solves it.
 *
 * Deliberately brittle. Rewording one of these lines should break a test, because
 * rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-lighthouse')!;
const script = applyCaseText(english, theLighthousePtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

const clock = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

/* --------------------------------------------- the contract, checked up front */

// And the case is still a case: every engine guarantee, on the translated script
// rather than the English one. This is what caseText.test.ts runs the day the
// orchestrator registers this pack.
describeCaseContract(script);

describe('O Farol (pt-BR) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLighthousePtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLighthousePtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLighthousePtBr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      // A straight apostrophe inside a single-quoted TypeScript string has broken
      // this build twice. The curly one is the house character.
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const proseEntries = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of proseEntries) {
      expect(
        seen.get(value),
        `${path} repeats the prose at ${seen.get(value) ?? ''}`,
      ).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number and every paragraph the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
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

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Farol (pt-BR) — the times', () => {
  /**
   * Every time the case turns on, in the message that states it.
   *
   * Two chains have to survive intact or the case cannot be reasoned about. Mairi
   * puts herself in the café from half eight until eleven (m6) and Fiona puts her
   * on the cliff path at 21:47 (e10) — that pair is contradiction two. Mairi turns
   * at the gate (n3) and Callum puts her at the door at ten past ten (k6) — that
   * pair is contradiction three, and it is the one that convicts her.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g10: ['às oito'], // the last boat in, 19:00–20:00
      g12: ['vinte pras dez', 'dez e quinze'], // the slipway, 21:40–22:15
      m6: ['oito e meia', 'onze'], // the café alibi she gives twice
      m8: ['das nove'], // Callum put in the café with her, 21:00–23:00
      m11: ['Nove e quinze'], // the player in the café, 21:05–21:30
      m13: ['vinte pras onze'], // cashing up, 22:35–23:00
      m15: ['depois das onze'], // Fiona's light on, 23:00–24:00
      e5: ['das sete', 'nove e meia'], // the cottage, 19:00–21:30
      e6: ['meia hora'], // the lull that puts her on the path
      k5: ['dez e quinze'], // finished the line, then up the back way
      k6: ['dez e dez'], // the door. the sighting that convicts her
      k9: ['depois das onze'], // home, and the coat into the machine
      n9: ['Nove e meia'], // the call from the Keeper
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The proofs and the endgame have to name the same minutes the messages did,
    // or the player is reading two different stories about one night.
    const revelation = (id: string) =>
      script.contradictions.find((x) => x.id === id)?.revelation ?? '';
    expect(revelation('x-mairi-path')).toContain('das oito e meia até as onze');
    expect(revelation('x-mairi-door')).toContain('dez e dez');
    expect(revelation('x-papers-lie')).toContain('nove e meia');

    const press = (id: string) => script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
    expect(press('b-path')).toContain('das oito e meia até as onze');
    expect(press('b-door')).toContain('dez e dez');
    expect(script.confrontation?.confession).toContain('nove e meia da noite');
  });

  /**
   * The split that makes the case work.
   *
   * Fiona is the only person in Ardnoe who writes a clock down, and that is
   * exactly why she is believed over a woman with forty years of goodwill. If a
   * translator tidies the village into digits — Callum saying 22:10 instead of
   * `dez e dez` — everyone sounds equally precise and the player has no reason to
   * prefer the log.
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

/* ------------------------------------------------------------ the arc clue */

describe('O Farol (pt-BR) — the arc clue', () => {
  /**
   * The first thing the Listener ever leaves behind, and it has to stay legible
   * fourteen cases later.
   *
   * `the Keeper` is a name a man gave himself, so it stays in English in every
   * locale — the whole arc is carried by a player recognising in Pack 3 the words
   * they read here. arcAlias.test.ts counts the mentions, but only for registered
   * translations, so the count is asserted here too rather than waiting for the
   * day somebody edits the registry.
   */
  it('keeps the Keeper in English, exactly as often as the English says it', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    expect(count(prose(script)), 'the pt-BR alias count has drifted from the English').toBe(
      count(prose(english)),
    );
    expect(count(prose(script))).toBe(2);

    // A self-given codename, which is a thing that plausibly survives untranslated.
    expect(body('n9')).toContain('se dizia o Keeper');
    const revelation = script.contradictions.find((x) => x.id === 'x-papers-lie')?.revelation ?? '';
    expect(revelation).toContain('o Keeper');
    // And never the translated form, in any casing.
    expect(prose(script)).not.toMatch(/guardi[ãa]o|zelador|faroleiro/i);

    // The lie itself: the auditors never had the papers, so the call was not a
    // mistake. Without this sentence the contradiction proves nothing chilling.
    expect(revelation).toContain('Os auditores nunca tiveram esses papéis');
    expect(revelation).toContain('não foi um engano');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('r7')).toContain('dois anos de contas'); // Ruth names the hole
    expect(body('r7')).toContain('buraco');
    expect(body('k11')).toContain('o dinheiro era meu'); // Callum says whose it was
    expect(body('k11')).toContain('contas da ruth');
  });

  /**
   * The player finds Mairi by matching a pronoun to a job. Ruth says "she" is
   * coming tonight; Mairi says she keeps the books. If the two lines stop using
   * the same words the deduction stops being available in Portuguese.
   */
  it('keeps the she-who-keeps-the-books step readable', () => {
    expect(body('r10')).toContain('vem me ver hoje à noite');
    expect(body('m2')).toContain('vem me ver hoje à noite');
    expect(body('m3')).toContain('ela. você cuida das contas');
    expect(body('g18')).toContain('contas da Fundação');
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Farol (pt-BR) — the voices', () => {
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
    expect(body('k9')).not.toContain('Mairi');
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
    expect(body('m11')).toContain('Você lembra.');
  });

  /** The player is thumbing a phone: lowercase, short, and never finished. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // Except once. The only shout in the case, and the English shouts here too.
    expect(body('r11')).toContain('QUEM');
  });

  /**
   * The player's gender is never stated, and Portuguese agrees where English does
   * not. Both rephrases are asserted, because the literal translation of either
   * line picks a gender and nothing else in the build would notice.
   */
  it('never assigns the player a gender', () => {
    // m11: "You came in that night yourself" — `você mesmo`/`você mesma` both agree,
    // so the intensifier is gone and the placement survives without it.
    expect(body('m11')).toContain('Você apareceu lá naquela noite.');
    expect(body('m11')).not.toMatch(/mesm[oa]\b/);

    // confrontation.opening: "be very sure" — `seguro`/`segura` agree, so it is
    // rebuilt around the noun.
    expect(script.confrontation?.opening).toContain('tenha muita certeza');

    // Everything else addressed at the player, swept for an agreeing adjective.
    const addressed = [
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      script.blurb,
      script.briefing?.opening ?? '',
    ].join('\n');
    expect(addressed).not.toMatch(/\b(segur|cansad|sozinh|prepar[ae]d|bem-vind|cert)[oa]\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Farol (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('point')).toBe('Ponta Ardnoe');
    expect(place('lighthouse')).toBe('o farol');
    expect(place('path')).toBe('a trilha do penhasco');
    expect(place('harbour')).toBe('o porto');
    expect(place('cafe')).toBe('o café');
    expect(place('slip')).toBe('a rampa');
    expect(place('cottage')).toBe('a casinha');
    expect(place('ferry')).toBe('a balsa');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('ruth')).toBe('Ruth');
    expect(character('mairi')).toBe('Mairi');
    expect(character('callum')).toBe('Callum');
    expect(character('esme')).toBe('Fiona');

    // Ardnoe survives intact: it is the group thread title and the first word the
    // Listener says in the coda.
    expect(script.threads.find((t) => t.id === 't-group')?.title).toBe('Ardnoe');
    expect(script.coda?.messages[0]).toContain('Ardnoe');
  });

  /**
   * A chip and a sentence have to use the same words or they are two things to a
   * player. The slipway is the one that matters most: `a rampa` on Callum's chip
   * against `o café` on Mairi's is contradiction one, and he says it himself in
   * the group before she contradicts him.
   */
  it('uses one word for the slipway on the chip and in the prose', () => {
    const label = (id: string) =>
      script.threads
        .flatMap((t) => t.messages)
        .flatMap((m) => m.claims ?? [])
        .find((c) => c.id === id)?.label ?? '';
    expect(label('c-callum-slip')).toContain('na rampa');
    expect(body('g12')).toContain('na rampa');
    expect(body('g8')).toContain('na rampa');
    expect(body('k2')).toContain('na rampa');
    expect(label('c-mairi-door')).toContain('na porta do farol');
    expect(body('k6')).toContain('na porta do farol');
  });

  /**
   * The naming rule from caseText.test.ts, run here rather than at registration.
   *
   * A name on a chip and a different name in a sentence is two things to a player.
   * That generic test only runs for translations the orchestrator has registered,
   * so until then this pack would be taking the decision without anybody checking
   * the prose kept it — and the failure mode is a place the board calls `a rampa`
   * that no message ever mentions.
   */
  it('says its own names for people and places somewhere in the prose', () => {
    const fold = (text: string): string =>
      text
        .normalize('NFD')
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    const proseOf = (s: typeof script): string => {
      const kept: string[] = [];
      for (const [path, value] of caseTextEntries(s)) {
        if (/^(character|place|object)\./.test(path)) continue;
        kept.push(value);
      }
      return fold(kept.join('\n'));
    };

    const translatedProse = proseOf(script);
    const englishProse = proseOf(english);
    const named = [
      ...script.characters
        .filter((c) => c.id !== 'you') // the player's seat is a pronoun, not a name
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
      // Only names the English prose actually says. `o porto` constrains nothing,
      // because no message in the English ever says "the harbour".
      if (entity.english === '' || !englishProse.includes(entity.english)) continue;
      expect(
        translatedProse.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  /**
   * The gate against the door. Mairi concedes the walk and stops at the gate; the
   * door is the thing she cannot concede, and the two words have to stay distinct
   * or her last defence reads as a confession.
   */
  it('keeps the gate and the door two different words', () => {
    expect(body('n3')).toContain('até o portão');
    expect(body('n5')).toContain('O portão. Não a porta.');
    expect(script.confrontation?.beats.find((b) => b.id === 'b-door')?.press).toContain('portão');
  });
});
