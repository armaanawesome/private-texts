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
import { theNightRoundPtBr } from './the-night-round';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The Brazilian Portuguese Night Round, checked on the things a player reasons over.
 *
 * Deliberately not routed through CASE_TRANSLATIONS. The orchestrator registers
 * translations, several packs are in flight at once, and a translation that only
 * starts being checked on the day somebody edits a registry is a translation
 * nobody checked. So the object is imported and applied directly, and the generic
 * contract is re-run here against it.
 *
 * The rest is what no generic test can see. This case is one paper record against
 * one machine record, it states nearly all of its times in words, and it carries
 * the first arc connection — which only works if the alias appears exactly once,
 * in the confession, after the case is already solved.
 *
 * Deliberately brittle. Rewording one of these lines should break a test, because
 * rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-night-round')!;
const script = applyCaseText(english, theNightRoundPtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

/** Prose the player reads, minus the bare entity names — those are the subject. */
const proseOf = (s: typeof script): string => {
  const kept: string[] = [];
  for (const [path, value] of caseTextEntries(s)) {
    if (/^(character|place|object)\./.test(path)) continue;
    kept.push(value);
  }
  return fold(kept.join('\n'));
};

/* --------------------------------------------- the contract, checked up front */

// And the case is still a case: every engine guarantee, on the translated script
// rather than the English one. This is what caseText.test.ts runs the day the
// orchestrator registers this pack.
describeCaseContract(script);

describe('A Ronda da Noite (pt-BR) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightRoundPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightRoundPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightRoundPtBr)];

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

/* ------------------------------------------------------------ the arc clue */

describe('A Ronda da Noite (pt-BR) — the arc', () => {
  /**
   * Pack 3 is the first arc connection, and the payoff is recognition: the player
   * met this name in Pack 1 and is meant to feel the floor move here. So the word
   * is identical to the one in the-lighthouse.ts, and it is never translated.
   */
  it('keeps the Keeper in English, exactly as often as the English says it', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    expect(count(prose(script)), 'the pt-BR alias count has drifted from the English').toBe(
      count(prose(english)),
    );
    expect(count(prose(script))).toBe(1);

    expect(script.confrontation?.confession).toContain('se dizia o Keeper');
    // Never the translated form, in any casing. `o Guardião` would read as a
    // different man from the one in Pack 1 and the arc would stop existing.
    expect(prose(script)).not.toMatch(/guardi[ãa]o|zelador|vigia/i);
  });

  /**
   * Per docs/arc-design.md the reveal happens only in the confrontation, after the
   * case is already solved. A player who meets the name in a message meets it as a
   * clue instead of as the floor moving, so nothing before the confession may say
   * it — not the coda, which is the same man, and not the epilogue.
   */
  it('says it only in the confession, and nowhere before it', () => {
    const confession = script.confrontation?.confession ?? '';
    const beforeTheEnd = [...caseTextEntries(script)]
      .filter(([path]) => path !== 'confrontation.confession')
      .map(([, value]) => value)
      .join('\n');

    expect(confession).toContain('Keeper');
    expect(beforeTheEnd).not.toContain('Keeper');
    // The coda is him, and it still does not name him.
    expect((script.coda?.messages ?? []).join('\n')).not.toContain('Keeper');
  });

  /** The detail that makes the call cold rather than convenient. */
  it('keeps the September prognosis he could not have had', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('oito a quatorze meses');
    expect(confession).toContain('setembro');
    expect(body('t10')).toContain('setembro'); // Ivy told Teddy, and told nobody else
    expect(script.coda?.messages[2]).toContain('número de setembro');
  });
});

/* ------------------------------------------------------------- the records */

describe('A Ronda da Noite (pt-BR) — the three records', () => {
  /**
   * One paper record against one machine record. Each gets exactly one name and
   * never a second: two names for the night book is two books, and the case stops
   * working. The medicines book is deliberately a different book, as in the English.
   */
  it('gives the night book, the round and the fob one name each', () => {
    for (const text of [
      script.blurb,
      script.briefing?.opening ?? '',
      body('m3'),
      body('s2'),
      revelation('x-fen-carpark'),
      script.solution.epilogue,
    ]) {
      expect(text).toContain('livro da noite');
    }

    expect(label('c-margo-round')).toContain('a ronda');
    expect(revelation('x-margo-round')).toContain('assinou a ronda das onze');
    expect(revelation('x-margo-round')).toContain('não fez a ronda');

    expect(body('s2')).toContain('crachás de acesso');
    expect(body('s3')).toContain('crachá de visitante');
    expect(revelation('x-fen-carpark')).toContain('crachá de acesso');
    expect(pressOf('r-carpark')).toContain('crachá');
    expect(label('c-fen-carpark')).toContain('registro do crachá');

    // A different book, and it has to stay different.
    expect(body('m9')).toContain('livro de medicação');
    expect(body('m9')).not.toContain('livro da noite');
  });

  /**
   * Margo is the red herring, and she is genuinely guilty of something. The
   * revelation has to say both halves or the player convicts the wrong woman.
   */
  it('keeps Margo guilty of the right thing', () => {
    const text = revelation('x-margo-round');
    expect(text).toContain('motivo de demissão');
    expect(text).toContain('não é assassinato');
    expect(text).toContain('Lagos');
  });
});

/* ------------------------------------------------------------------ the times */

describe('A Ronda da Noite (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      g4: ['dez e dez'], // Ivy alive and texting
      g6: ['vinte pras dez', 'dez e quinze', 'dez e meia'], // the alibi she signs for
      g7: ['dez e meia'], // asleep, phone on the landing
      m3: ['das onze', 'das duas'], // the two rounds she signs
      t3: ['dez pras dez'], // the last Teddy saw of Ivy
      t6: ['cinco pras onze', 'onze e vinte'], // the pair that breaks Margo
      t8: ['vinte pras doze', 'Onze e meia'], // the daughter on the corridor
      s3: ['23:47'], // the one fact nobody can call a memory
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('vinte pras dez');
    expect(script.briefing?.opening).toContain('às sete da manhã');

    expect(revelation('x-fen-corridor')).toContain('vinte pras dez');
    expect(revelation('x-fen-corridor')).toContain('onze e meia');
    expect(revelation('x-fen-asleep')).toContain('dez e meia');
    expect(revelation('x-fen-carpark')).toContain('23:47');

    expect(pressOf('r-corridor')).toContain('vinte pras dez');
    expect(pressOf('r-corridor')).toContain('onze e meia');
    expect(pressOf('r-asleep')).toContain('dez e meia');
    expect(pressOf('r-carpark')).toContain('23:47');
  });

  /**
   * Only the fob reading and the year of the power of attorney are written in
   * digits. Everyone in the building speaks their times, which is exactly why the
   * machine wins the argument.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['s3', 's5']);
    expect(body('s5')).toContain('2021');

    // Ivy wrote the last ledger entry by hand and it is quoted, so the 7 stays a 7
    // rather than becoming 19h.
    expect(script.solution.epilogue).toContain('7 da noite');
  });
});

/* ----------------------------------------------------------------- the motive */

describe('A Ronda da Noite (pt-BR) — the motive', () => {
  /** Both halves, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('i6')).toContain('desde março'); // Ivy has stopped signing
    expect(body('s5')).toContain('procuração'); // Claire says what Ali holds
    expect(body('s5')).toContain('2021');
    expect(script.motives[0]?.summary).toContain('procuração');
    expect(script.motives[0]?.summary).toContain('2021');
  });

  /** The letter is the clock the whole motive runs on. */
  it('keeps the letter and the referral joined up', () => {
    expect(body('s5')).toContain('quatro meses');
    expect(body('s6')).toContain('na segunda');
    expect(body('s6')).toContain('terça');
    expect(pressOf('r-why')).toContain('na segunda');
    expect(pressOf('r-why')).toContain('na terça');
  });
});

/* --------------------------------------------------------------- the voices */

describe('A Ronda da Noite (pt-BR) — the voices', () => {
  const IVY = ['i1', 'i3', 'i4', 'i6', 'i7', 'i8', 'i9'];
  const MARGO = ['g2', 'g9', 'm1', 'm3', 'm4', 'm6', 'm8', 'm9'];
  const TEDDY = ['t1', 't2', 't3', 't5', 't6', 't7', 't8', 't9', 't10'];
  const ALI = ['g3', 'g5', 'g6', 'g7'];
  const CLAIRE = ['g1', 'g8', 's1', 's2', 's3', 's5', 's6', 's7'];
  const YOU = ['i2', 'i5', 'i10', 'g4', 'm2', 'm5', 'm7', 't4', 's4'];

  /** Four of them write like adults with a pen, and they finish their sentences. */
  it('keeps Ivy, Teddy, Ali and Claire writing in sentences', () => {
    for (const id of [...IVY, ...TEDDY, ...ALI, ...CLAIRE]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // Ivy is eighty four and lets understatement do the work.
    expect(body('i6')).toContain('É justamente esse o problema.');
    // Teddy does not estimate, and says so.
    expect(body('t2')).toContain('não chuto horário');
  });

  /**
   * Margo starts like a letter and then forgets to land it, which is the whole of
   * her: warm, running on, and never quite finishing. The English does this too.
   */
  it('keeps Margo warm and unfinished', () => {
    for (const id of MARGO) {
      expect(body(id)[0], `${id} does not open like a letter`).toBe(body(id)[0]?.toUpperCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('g2')).toContain('!!');
    expect(body('m1').endsWith('!')).toBe(true);
  });

  /** The player is thumbing a phone: lowercase, short, unfinished. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });

  /**
   * The player has no gender, in this case as in every other.
   *
   * This asserted the opposite until the English changed, and was right to: the
   * English had Margo call the player Ivy's godson, so the pack agreed with that
   * rather than dodging, and the agreement had to stay internally consistent or
   * `querido` and `afilhada` would read as two different people.
   *
   * Flagging it is what got it fixed at the source. It was the only line in
   * fifteen packs that stated what the player is, and it forced Portuguese,
   * Spanish and French into a choice the game makes nowhere else. Margo now
   * names the relationship from Ivy's side, which carries the identical fact and
   * marks nobody.
   *
   * So the assertion inverts, and covers all three places the agreement used to
   * land rather than only the one that caused it.
   */
  it('leaves the player ungendered, as every other case does', () => {
    expect(body('m1')).toContain('sua madrinha');
    expect(body('i1')).toContain('meu bem');
    expect(script.coda?.messages[0]).toContain('levou menos tempo');

    const all = prose(script);
    for (const agreeing of ['afilhado', 'afilhada', 'mais rápido', 'mais rápida', 'querido']) {
      expect(all, `${agreeing} genders the player`).not.toContain(agreeing);
    }
  });
});

/* ---------------------------------------------------------------- the names */

describe('A Ronda da Noite (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('marchbank')).toBe('Marchbank House');
    expect(place('ivyroom')).toBe('o quarto da Ivy');
    expect(place('corridor')).toBe('o corredor do primeiro andar');
    expect(place('dayroom')).toBe('a sala de convivência');
    expect(place('desk')).toBe('o posto de enfermagem');
    expect(place('carpark')).toBe('o estacionamento');
    expect(place('fenhouse')).toBe('a casa da Ali');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('ivy')).toBe('Ivy');
    expect(character('fen')).toBe('Ali');
    expect(character('margo')).toBe('Margo');
    expect(character('teddy')).toBe('Teddy');
    expect(character('saoirse')).toBe('Claire');

    // Ali is Alison in the prose, exactly as in the English.
    expect(body('i4')).toContain('Alison');
    expect(body('s3')).toContain('Alison Reid');
    expect(script.confrontation?.confession).toContain('Alison');
  });

  /**
   * Teddy sees the night desk from the day room doorway, and that sightline is his
   * entire testimony. If the two rooms drift into different words the player
   * cannot tell that he could see her.
   */
  it('keeps Teddy able to see the desk from the doorway', () => {
    expect(body('t5')).toContain('a sala de convivência');
    expect(body('t5')).toContain('o posto de enfermagem');
    expect(label('c-teddy-dayroom')).toContain('sala de convivência');
    expect(label('c-margo-desk')).toContain('posto de enfermagem');
  });

  /**
   * The naming rule from caseText.test.ts, run here rather than at registration —
   * that generic test only covers translations the orchestrator has registered.
   */
  it('says its own names for people and places somewhere in the prose', () => {
    const translatedProse = proseOf(script);
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
        translatedProse.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  /** Teddy is found by reading: Margo points at him before he is reachable. */
  it('names Teddy in the message that opens his thread', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const bodyOf = new Map(
      script.threads.flatMap((t) => t.messages).map((m) => [m.id, fold(m.body)]),
    );

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;

      const names = thread.participantIds
        .filter((id) => id !== 'you')
        .map((id) => nameOf.get(id) ?? '');
      const named = gates.some((id) => {
        const gate = bodyOf.get(id) ?? '';
        return names.some((n) => n !== '' && gate.includes(n));
      });
      expect(named, `nothing names anyone in ${thread.id} before it opens`).toBe(true);
    }

    expect(body('g9')).toContain('Teddy');
  });
});
