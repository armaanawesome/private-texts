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
import { theWakePtBr } from './the-wake';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The Brazilian Portuguese Wake, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText rather than routed through
 * CASE_TRANSLATIONS: an unregistered pack is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". The generic contract is re-run here.
 *
 * The rest is what no generic test can see. The lie in this pack is collective and
 * it only reads as rehearsed if five people say the same sentence in the same
 * words, and every time in the house is spoken rather than written.
 */
const english = getCase('the-wake')!;
const script = applyCaseText(english, theWakePtBr);
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

const proseOf = (s: typeof script): string => {
  const kept: string[] = [];
  for (const [path, value] of caseTextEntries(s)) {
    if (/^(character|place|object)\./.test(path)) continue;
    kept.push(value);
  }
  return fold(kept.join('\n'));
};

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('O Velório (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theWakePtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theWakePtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theWakePtBr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
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

/* --------------------------------------------------------- the collective lie */

describe('O Velório (pt-BR) — the sentence forty-one people said', () => {
  /**
   * The lie is collective and it only reads as rehearsed if it is one sentence
   * rather than five people agreeing loosely. Donal says it, Maureen says it,
   * Eileen admits saying it, Maureen explains why she said it, and the confession
   * describes the family inventing it in four seconds in the hall.
   */
  it('keeps one wording for the alibi everybody gave', () => {
    for (const id of ['f4', 'f6', 'r8', 'u2']) {
      expect(body(id), `${id} no longer says the family sentence`).toContain('sala da frente');
    }
    expect(script.confrontation?.confession).toContain('sala da frente');
    expect(revelation('x-donal-garden')).toContain('a mesma frase');

    // And the two who said it first, in the order the confession gives them.
    const confession = script.confrontation?.confession ?? '';
    expect(confession.indexOf('Eileen')).toBeLessThan(confession.indexOf('Maureen'));
  });

  /**
   * The shield was built for Cass over four hundred pounds, and the whole point of
   * the pack is that Donal simply stepped inside it. Both halves have to stay
   * sayable or the family reads as accomplices instead of as decent people.
   */
  it('keeps the reason the shield was built', () => {
    expect(body('r7')).toContain('quatrocentas libras');
    expect(body('r8')).toContain('Foi por ela.');
    expect(body('k11')).toContain('sendo bonzinhos comigo');
    expect(script.confrontation?.confession).toContain('Eu não construí nada daquilo.');
    expect(script.confrontation?.confession).toContain('feita para uma menina');
  });
});

/* ------------------------------------------------------------------ the times */

describe('O Velório (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      f3: ['desde as onze'], // the drink, which is what the ruling rests on
      f4: ['desde as quatro'], // everybody in the front room
      r3: ['quatro e dez'], // Eileen goes for glasses
      k4: ['desde as quatro'], // Cass out the side the whole time
      k5: ['quatro e dez'], // Donal comes out
      u4: ['onze e dez'], // the last prescription, three weeks earlier
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Ten past four is the minute the case turns on, and it has to be the same
    // three words in both witnesses, both proofs and both presses.
    expect(revelation('x-donal-garden')).toContain('quatro e dez');
    expect(revelation('x-donal-glasses')).toContain('quatro e dez');
    expect(pressOf('w-garden')).toContain('uatro e dez');
    expect(pressOf('w-glasses')).toContain('quatro e dez');
  });

  /**
   * Nobody in this house writes a clock. The only digits anywhere in the messages
   * are the dose on Gerald's prescription, which is the one fact that came off a
   * label rather than out of somebody's memory.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['y4']);
    expect(body('y4')).toContain('5mg');

    // And no message renders a 24-hour clock time; those live on the chips only.
    for (const t of script.threads) {
      for (const m of t.messages) {
        expect(digitTimes(m.body), `${m.id} has grown a digit clock`).toEqual([]);
      }
    }
  });
});

/* ----------------------------------------------------------------- the motive */

describe('O Velório (pt-BR) — the motive', () => {
  /** Both halves, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('y4')).toContain('cento e oitenta ml'); // Tony finds the number
    expect(body('y4')).toContain('alguém retirando');
    expect(body('u7')).toContain('casa de repouso'); // Maureen says what the money was for
    expect(script.motives[0]?.summary).toContain('cento e oitenta ml');
    expect(script.motives[0]?.summary).toContain('cinco ml');
  });

  /** The dose against the total is the whole arithmetic, and it recurs four times. */
  it('keeps the dose and the total together everywhere they appear', () => {
    for (const text of [
      body('u6'),
      revelation('x-donal-scripts'),
      pressOf('w-why'),
      script.motives[0]?.summary ?? '',
    ]) {
      expect(text).toContain('ento e oitenta ml');
    }
    expect(revelation('x-donal-scripts')).toContain('cinco ml');
    expect(pressOf('w-why')).toContain('cinco ml');
  });

  /** Pack 5 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('O Velório (pt-BR) — the voices', () => {
  const EILEEN = ['f2', 'f9', 'f13', 'r1', 'r3', 'r4', 'r6', 'r7', 'r8', 'r9', 'r10'];
  const MAUREEN_TRAILS = ['f1', 'f6', 'u1', 'u2', 'u4', 'u5', 'u6', 'u7', 'u8'];
  const TONY = ['y1', 'y3', 'y4', 'y6', 'y7', 'y9', 'y10', 'y11'];
  const DONAL = ['f3', 'f4', 'f5', 'f8', 'f10', 'f11'];
  const CASS = ['k1', 'k2', 'k4', 'k5', 'k7', 'k8', 'k10', 'k11'];
  const YOU = ['y2', 'y5', 'y8', 'f7', 'r2', 'r5', 'k3', 'k6', 'k9', 'u3'];

  /**
   * Eileen is eighty one and lands a full stop on every message she sends. She is
   * the only person in the pack who finishes, which is the whole of her.
   */
  it('keeps Eileen finishing every sentence', () => {
    for (const id of EILEEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Maureen opens like a letter and then trails off without a full stop, every
   * time but one. `Donal.` is a single word with a stop on it and it is the hardest
   * thing she says all case.
   */
  it('keeps Maureen opening like a letter and trailing off', () => {
    for (const id of MAUREEN_TRAILS) {
      expect(body(id)[0], `${id} does not open like a letter`).toBe(body(id)[0]?.toUpperCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('f12')).toBe('Donal.');
  });

  /** The three lowercase voices, separated by what they do rather than by casing. */
  it('keeps Tony, Donal, Cass and the player typing', () => {
    for (const id of [...TONY, ...DONAL, ...CASS, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // Tony keeps saying he will do it properly, and it is what gets him killed.
    expect(body('y9')).toContain('faço direito');
    // Donal answers a question with a question about somebody else, twice.
    expect(body('f8')).toContain('primeira pergunta');
    expect(body('f11')).toContain('Cass');
    // Cass accuses herself before anybody asks her anything.
    expect(body('k2')).toContain('eu peguei o dinheiro');
  });

  /**
   * The player has no gender. One rephrase was forced: `You do not get to arrive
   * and be right`, where certo/certa both agree, rebuilt around `ter razão`.
   */
  it('never assigns the player a gender', () => {
    expect(script.confrontation?.deflections[1]).toContain('chegar e ter razão');
    expect(body('y1')).toContain('a cara dele'); // agreement lands on `cara`

    /*
     * Deliberately narrow, for the reason playerNeutral.test.ts gives: a rule that
     * cries wolf on ordinary prose gets switched off. Only lines where an agreeing
     * adjective would attach to the PLAYER are swept.
     *
     * r1 is excluded on purpose and it is the case in point. It addresses the
     * player — `Você veio` — but it also has Eileen saying `estou cansada demais`
     * about herself, and she is female and known. An earlier draft included it and
     * flagged her own self-description as a gendered player reference.
     */
    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      body('y1'),
    ].join('\n');
    expect(addressed).not.toMatch(/\b(cert|segur|cansad|prepar[ae]d|sozinh|bem-vind)[oa]\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('O Velório (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('house')).toBe('a casa');
    expect(place('frontroom')).toBe('a sala da frente');
    expect(place('kitchen')).toBe('a cozinha');
    expect(place('gardenroom')).toBe('a sala do jardim');
    expect(place('sidereturn')).toBe('o corredor lateral');
    expect(place('chemist')).toBe('a farmácia da Ballybough Road');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('tony')).toBe('Tony');
    expect(character('donal')).toBe('Donal');
    expect(character('nuala')).toBe('Maureen');
    expect(character('bridie')).toBe('Eileen');
    expect(character('cass')).toBe('Cass');
  });

  /**
   * The side return is where three of the four proofs live, so the chip and every
   * sentence about it have to use one phrase. `corredor` is doing no other job in
   * this pack, which is why it was safe to take.
   */
  it('uses one phrase for the side return', () => {
    expect(label('c-cass-return')).toContain('no corredor lateral');
    expect(label('c-donal-outside')).toContain('no corredor lateral');
    expect(body('r4')).toContain('o corredor lateral');
    expect(body('r9')).toContain('no corredor lateral');
    expect(body('k10')).toContain('o corredor lateral');
    expect(revelation('x-cass-return')).toContain('no corredor lateral');
  });

  /**
   * This did its job on the second day it existed.
   *
   * The English epilogue used to call Eileen `Bridie Mulvey` while the screen
   * and the rest of the prose called her Eileen — one of six stale names left
   * behind by renames across three packs. Rather than quietly correcting it,
   * this translation reproduced the English and asserted *against* the English,
   * on the reasoning that the day the source was fixed this would fail and
   * force the Portuguese to move in the same commit instead of drifting.
   *
   * That is exactly what happened: the source was fixed, this went red, and the
   * Portuguese was corrected alongside it. `content/cases/renameLeak.test.ts`
   * now stops the whole class at the source.
   *
   * Keeping the assertion, minus the dead name. Tying the two prose sets
   * together is worth having for its own sake — it is what catches the next
   * name that moves in only one of them.
   */
  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of ['Eileen Mulvey', 'Donal Fahey', 'Anthony', 'Cassie']) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

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

  /**
   * Cass's thread opens on r10, which neither names her nor comes from her — it
   * works because Eileen named Cassie three messages earlier in the same
   * conversation, and threads play in order. That is the third of the three ways a
   * player can already know who a thread is with.
   */
  it('opens no thread with a stranger', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const messages = script.threads.flatMap((t) => t.messages);
    const senderOf = new Map(messages.map((m) => [m.id, m.senderId]));
    const messageById = new Map(messages.map((m) => [m.id, m]));

    const readBy = (id: string): string => {
      const gate = messageById.get(id);
      if (gate === undefined) return '';
      const thread = script.threads.find((t) => t.id === gate.threadId);
      if (thread === undefined) return '';
      return thread.messages
        .filter((m) => m.sentAt <= gate.sentAt)
        .map((m) => fold(m.body))
        .join('\n');
    };

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;

      const others = thread.participantIds.filter((id) => id !== 'you');
      const names = others.map((id) => nameOf.get(id) ?? '');
      const introduced = gates.some((id) => {
        const seen = readBy(id);
        if (names.some((n) => n !== '' && seen.includes(n))) return true;
        const sender = senderOf.get(id);
        return sender !== undefined && others.includes(sender);
      });
      expect(introduced, `${thread.id} opens with a stranger`).toBe(true);
    }

    // The specific line that does it, since it is the only thing standing between
    // the player and a conversation with somebody they have never heard of.
    expect(body('r7')).toContain('Cassie');
  });
});
