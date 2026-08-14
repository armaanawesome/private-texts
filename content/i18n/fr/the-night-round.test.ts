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
import { theNightRoundFr } from './the-night-round';

/**
 * The French Night Round, checked on the things a player reasons over.
 *
 * The pack is imported and applied with `applyCaseText` rather than looked up
 * through CASE_TRANSLATIONS, because the orchestrator owns the registry. Until
 * French is registered, `localiseCase` returns the English and every generic
 * check in caseText.test.ts passes over a file it cannot see.
 *
 * Pack 3 carries the first arc connection, so it has one obligation the other two
 * free packs do not: the alias has to survive, exactly once, in exactly the place
 * the English puts it.
 */
const english = getCase('the-night-round')!;
const script: CaseScript = applyCaseText(english, theNightRoundFr);

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
 * Modulo, not a bare divide. `c-margo-office` runs 01:00–02:00 on the next day,
 * which is minute 1500 to 1560 — a naive `Math.floor(m / 60)` renders that as
 * 25:00 and the chip check fails on a chip that is perfectly correct.
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

/* --------------------------------------------- the contract, checked up front */

describe('La ronde de nuit (fr) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightRoundFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightRoundFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightRoundFr)];

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

  it('keeps naming the people whose threads are found by reading', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const bodyOf = new Map(messages.map((m) => [m.id, fold(m.body)]));

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;
      const names = thread.participantIds
        .filter((id) => id !== 'you')
        .map((id) => nameOf.get(id) ?? '');
      const named = gates.some((id) => {
        const gateBody = bodyOf.get(id) ?? '';
        return names.some((n) => n !== '' && gateBody.includes(n));
      });
      expect(named, `nothing names anyone in ${thread.id} before it opens`).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  describeCaseContract(script);
});

/* -------------------------------------------------------------- the arc clue */

describe('La ronde de nuit (fr) — the arc clue', () => {
  /**
   * Pack 3 is where the arc first pays off, and the whole design of it is that
   * the reveal arrives after the case is already solved. The alias lives in the
   * confession and nowhere else — not in a message, not in a revelation, not in
   * the briefing, and not in the coda that follows.
   *
   * A player who met the name in Pack 1 is supposed to feel the floor move here,
   * and that is carried entirely by it being the same word. `le Gardien` would
   * break the arc for French players and nothing else in the suite would fail.
   */
  it('keeps the Keeper a name a French player can carry forward', () => {
    expect(script.confrontation?.confession).toContain('se faisait appeler le Keeper');
    // Never the translated form, in any casing, anywhere in the case.
    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(prose).not.toMatch(/gardien/i);
  });

  it('says it exactly once, and only in the confession', () => {
    const count = (s: string) => s.split('Keeper').length - 1;

    // The English fixture asserts itself first: if the arc is ever reworked out
    // of this pack, every assertion below would pass while proving nothing.
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    expect(count(englishProse), 'the English fixture stopped saying it').toBe(1);

    const prose = [...caseTextEntries(script).values()].join('\n');
    expect(count(prose), 'French has a different number of alias mentions').toBe(1);

    // And it has not leaked forward of the confrontation. Everything the player
    // can read before they have already solved the case stays clean.
    const beforeTheEnd = [
      script.title,
      script.blurb,
      script.briefing?.opening ?? '',
      ...messages.map((m) => m.body),
      ...script.contradictions.map((x) => x.revelation),
      ...script.motives.map((m) => m.summary),
      ...(script.coda?.messages ?? []),
      script.solution.epilogue,
    ].join('\n');
    expect(beforeTheEnd).not.toContain('Keeper');
  });

  /**
   * The line that makes the call sinister rather than sad: he knew a prognosis
   * that was in no record Ali could reach. Without the September number the
   * confession is a woman blaming a stranger.
   */
  it('keeps the thing the caller could not have known', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('de huit à quatorze mois en septembre');
    expect(confession).toContain('Je ne le savais pas');
    // And the coda asks the question the player has not asked yet.
    expect(script.coda?.messages[2]).toContain('le chiffre de septembre');
    expect(script.coda?.from).toBe('Numéro inconnu');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('i6')).toContain('Je n’ai rien signé depuis mars'); // Ivy will not sign
    expect(body('s5')).toContain('procuration'); // and what signing was for
    expect(body('s5')).toContain('2021');
  });
});

/* ----------------------------------------------------------------- the records */

describe('La ronde de nuit (fr) — the two records', () => {
  /**
   * One paper record against one machine record. Each has exactly one name
   * everywhere the player meets it — a second name for the night book would be a
   * second book, and the case is the disagreement between these two.
   */
  it('calls the night book one thing everywhere', () => {
    for (const text of [
      script.blurb,
      script.briefing?.opening ?? '',
      body('m3'),
      body('s2'),
      revelation('x-fen-carpark'),
      script.solution.epilogue,
    ]) {
      expect(text, 'the night book lost its name').toContain('cahier de nuit');
    }
    // The medicines book is deliberately a different book.
    expect(body('m9')).toContain('cahier des médicaments');
  });

  it('calls the fob one thing everywhere', () => {
    expect(body('s2')).toContain('badge');
    expect(body('s3')).toContain('badge visiteur');
    expect(revelation('x-fen-carpark')).toContain('badge');
    expect(beat('r-carpark')?.press).toContain('badge');
    expect(label('c-fen-carpark')).toContain('badge');
  });

  /**
   * 23:47 is the one fact nobody can call a memory, so it stays digits in all
   * four places, and nobody else in the case writes a clock in digits.
   */
  it('keeps the fob reading as digits and lets nothing else carry one', () => {
    expect(body('s3')).toContain('23:47');
    expect(revelation('x-fen-carpark')).toContain('23:47');
    expect(beat('r-carpark')?.press).toContain('23:47');
    expect(label('c-fen-carpark')).toContain('23:47');

    const digitsIn = messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id);
    expect(digitsIn).toEqual(['s3']);
  });

  /** The round is one word, and Margo signing it is the red herring. */
  it('keeps the round one word, so the red herring is provable', () => {
    expect(body('m3')).toContain('la ronde');
    expect(label('c-margo-round')).toContain('la ronde');
    expect(revelation('x-margo-round')).toContain('la ronde de onze heures');
    // Guilty of something, and not of this. Both halves have to survive.
    expect(revelation('x-margo-round')).toContain('licenciement');
    expect(revelation('x-margo-round')).toContain('ce n’est pas un meurtre');
  });
});

/* ------------------------------------------------------------------ the times */

describe('La ronde de nuit (fr) — the times', () => {
  /**
   * Every clock time the case turns on, in the line that states it. Ali signs out
   * at twenty to ten and puts herself home from quarter past; Teddy has her on
   * the corridor at half eleven. That pair is the case.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      i4: ['sept heures'], // Alison arrives, 19:00
      g4: ['dix heures dix'], // Ivy texting, alive, 22:10
      g5: ['dix heures', 'minuit'], // fine at ten and gone at midnight
      g6: ['dix heures moins vingt', 'dix heures et quart', 'dix heures et demie'],
      g7: ['dix heures et demie'], // asleep from half ten
      g9: ['six heures'], // Teddy in the day room from six
      m3: ['onze heures', 'deux heures'], // the rounds she signs for
      m9: ['une heure'], // the medicines book, 01:00
      t3: ['dix heures moins dix'], // Ivy leaves the day room, 21:50
      t6: ['onze heures moins cinq', 'onze heures vingt'], // the pair that breaks Margo
      t8: ['minuit moins vingt', 'onze heures et demie'], // the daughter on the corridor
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The proofs and the endgame have to name the same minutes the messages did.
    expect(revelation('x-fen-corridor')).toContain('dix heures moins vingt');
    expect(revelation('x-fen-corridor')).toContain('onze heures et demie');
    expect(revelation('x-fen-asleep')).toContain('dix heures et demie');
    expect(beat('r-corridor')?.press).toContain('dix heures moins vingt');
    expect(beat('r-corridor')?.press).toContain('onze heures et demie');
    expect(beat('r-asleep')?.press).toContain('dix heures et demie');
    expect(script.briefing?.opening).toContain('dix heures moins vingt');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('La ronde de nuit (fr) — the voices', () => {
  /**
   * Five people who write differently, plus the player. Margo is the one who runs
   * on and does not land a full stop; everybody else who writes in sentences
   * finishes them. The player is lowercase and short.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'you') {
        expect(m.body[0], `${m.id} does not open lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else if (m.senderId === 'margo') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        // She runs on and never quite finishes. The English does this too.
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} does not finish its sentence`).toBe(true);
      }
    }

    // Ivy is dry and lands it in understatement rather than volume.
    expect(body('i6')).toContain('C’est précisément là qu’est l’ennui.');
    // Teddy never estimates, and says so.
    expect(body('t2')).toContain('c’est une heure');
    // Margo exclaims. Nobody else in the case does.
    expect(body('g2')).toContain('!!');
  });

  /**
   * The player has no gender, in this case as in every other.
   *
   * This test used to assert the opposite, and was right to: the English had
   * Margo call the player `Ivy's godson`, so `le filleul` was the English
   * talking rather than an assumption, and pinning it stopped a later pass
   * quietly dropping a stated fact.
   *
   * Flagging it is what got it fixed. It was the only line in fifteen packs
   * that told you what the player is, and it forced French, Spanish and
   * Portuguese to pick a gender for someone the rest of the game keeps blank.
   * The English now names the relationship from Ivy's side — she is dead,
   * female and known — which carries the identical fact and leaves the player
   * unmarked in every language.
   *
   * So the assertion inverts: nothing addressed to the player may agree.
   */
  it('leaves the player ungendered, as every other case does', () => {
    expect(body('m1')).toContain('ta marraine');
    // `mon trésor`, not `mon cher`: the noun's own gender is fixed, so it says
    // nothing about who is being addressed. Same reason the tutorial uses it.
    expect(body('i1')).toContain('mon trésor');

    const all = proseOf(script);
    for (const agreeing of ['filleul', 'filleule', 'mon cher', 'ma chère']) {
      expect(all, `${agreeing} genders the player`).not.toContain(agreeing);
    }
  });
});
