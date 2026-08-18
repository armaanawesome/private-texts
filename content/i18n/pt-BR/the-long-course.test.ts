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
import { theLongCoursePtBr } from './the-long-course';

/**
 * The Brazilian Portuguese Long Course, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText rather than routed through
 * CASE_TRANSLATIONS: an unregistered pack is skipped by every generic suite, so
 * "it passed" would mean "it was skipped". The generic contract is re-run here.
 *
 * The rest is what no generic test can see. The lie in this pack is identity —
 * eight people in identical kit — so the kit words and the one burned-in timecode
 * are what the whole case rests on.
 */
const english = getCase('the-long-course')!;
const script = applyCaseText(english, theLongCoursePtBr);
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

/** Wraps mod 1440, per privatetexts/i18n/clock-wrapping. */
const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

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

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('A Prova Longa (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theLongCoursePtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theLongCoursePtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theLongCoursePtBr)];

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

/* ------------------------------------------------------------ eight identical */

describe('A Prova Longa (pt-BR) — the kit that hides eight people', () => {
  /**
   * The lie is identity, so the kit has one set of words. Graham hands over the
   * macaquinho and the touca, Warren sees a man with the touca off, and Carol says
   * everybody wears the same two things. If these drift the player loses the only
   * reason eight people can be seven.
   */
  it('keeps one set of words for the kit', () => {
    expect(body('g5')).toContain('macaquinho');
    expect(body('g5')).toContain('touca');
    expect(body('w4')).toContain('macaquinho de sênior');
    expect(body('w4')).toContain('touca fora');
    expect(body('d9')).toContain('o mesmo macaquinho e a mesma touca');
    expect(revelation('x-imo-seat')).toContain('macaquinho dele e a touca dele');
    expect(pressOf('l-seat')).toContain('macaquinho');
  });

  /** The sentence the whole pack turns on, and it has to stay a countable claim. */
  it('keeps nobody counting which eight', () => {
    expect(body('c3')).toContain('Oito de nós');
    expect(body('g8')).toContain('ninguém ia contar a gente');
    expect(revelation('x-imo-seat')).toContain('Ninguém nunca conta quais oito');
    expect(script.blurb).toContain('quais oito');
  });
});

/* ------------------------------------------------------------------ the times */

describe('A Prova Longa (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      x11: ['Nove horas'], // Pauline, with the book in her bag
      c3: ['dez e cinquenta', 'onze e vinte'], // the crew alibi everyone wears
      c6: ['vinte pras onze', 'quase meio-dia'], // Carol on the towpath
      c7: ['nove e meia'], // the row at the trestles
      d5: ['antes das onze'], // Pauline goes in and does not come out
      d7: ['onze e três'], // Graham goes in
      d10: ['dez e meia'], // Em in senior kit in the changing room
      g4: ['dez e vinte'], // Graham asks her, by the trestles
      w4: ['onze e oito'], // spoken, because Warren is a person
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(revelation('x-saul-boathouse')).toContain('onze e três');
    expect(revelation('x-imo-seat')).toContain('dez e vinte');
    expect(pressOf('l-boathouse')).toContain('onze e três');
  });

  /**
   * The split that convicts him. Warren SPEAKS the minute and the video WRITES it:
   * a man saying a time is a memory, a burned-in timecode is not. The English keeps
   * `eleven oh eight` in his mouth and `11:08` in the revelation and on the chip,
   * and both forms have to survive or the video stops being different in kind from
   * everybody else's account.
   */
  it('keeps the spoken minute and the burned-in timecode apart', () => {
    expect(body('w4')).toContain('onze e oito');
    expect(digitTimes(body('w4'))).toEqual([]);
    expect(pressOf('l-slipway')).toContain('Onze e oito');

    expect(revelation('x-saul-slipway')).toContain('11:08');
    expect(label('c-saul-slipway')).toContain('11:08–11:14');
    expect(revelation('x-saul-slipway')).toContain('timecode');
    expect(body('w5')).toContain('timecode');
  });

  /**
   * Nobody in the club writes a clock. The only digits in the messages are years:
   * the club dinner, Ken Wardle's stroke and death, and the year Warren started.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['x1', 'x6', 'w8']);

    for (const t of script.threads) {
      for (const m of t.messages) {
        expect(digitTimes(m.body), `${m.id} has grown a digit clock`).toEqual([]);
      }
    }
  });
});

/* ----------------------------------------------------------------- the motive */

describe('A Prova Longa (pt-BR) — the motive and the arc', () => {
  /** Both halves, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('x7')).toContain('S. Brightwell'); // Pauline reads the duty column
    expect(body('x7')).toContain('coluna do responsável');
    expect(body('w9')).toContain('robbie nance'); // Warren looks him up
    expect(script.motives[0]?.summary).toContain('S. Brightwell');
    expect(script.motives[0]?.summary).toContain('2009');
  });

  /**
   * The second arc connection. `o Keeper` stays in English and appears exactly
   * twice, as the English does — once in the confession and once in the coda, where
   * he asks the player to notice what he could not have known.
   */
  it('keeps the Keeper in English, exactly as often as the English says it', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    expect(count(prose(script)), 'the pt-BR alias count has drifted from the English').toBe(
      count(prose(english)),
    );
    expect(count(prose(script))).toBe(2);

    expect(script.confrontation?.confession).toContain('se dizia o Keeper');
    expect(script.coda?.messages[2]).toContain('o Keeper');
    expect(prose(script)).not.toMatch(/guardi[ãa]o|zelador|vigia/i);
  });

  /**
   * The clue itself: he knew a thing said on a raft that was never in the inquest
   * and never in the paper. Both the confession and the coda have to state it, or
   * the player has no reason to feel the floor move.
   */
  it('keeps the detail he could not have had', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('nunca esteve no inquérito');
    expect(confession).toContain('Dois meninos ouviram');
    expect(script.coda?.messages[2]).toContain('Dois meninos ouviram');
  });
});

/* --------------------------------------------------------------- the voices */

describe('A Prova Longa (pt-BR) — the voices', () => {
  const PAULINE = ['x1', 'x3', 'x4', 'x6', 'x7', 'x9', 'x11'];
  const CAROL = ['c1', 'c6', 'c9', 'd1', 'd2', 'd4', 'd5', 'd7', 'd9', 'd10'];
  const GRAHAM = ['c3', 'c5', 'c7'];
  const WARREN = ['c2', 'c4', 'c8', 'w1', 'w3', 'w4', 'w5', 'w7', 'w8', 'w9'];
  const EM = ['g1', 'g2', 'g4', 'g5', 'g7', 'g8', 'g9', 'g10'];
  const YOU = ['x2', 'x5', 'x8', 'x10', 'd3', 'd6', 'd8', 'g3', 'g6', 'w2', 'w6'];

  /** Pauline and Carol write in full sentences and finish them. */
  it('keeps Pauline and Carol finishing their sentences', () => {
    for (const id of [...PAULINE, ...CAROL]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Graham capitalises exactly like them and never lands a full stop. He is always
   * mid-argument, and that is the whole tell — the grammar does not separate him
   * from the two women, the unfinishedness does.
   */
  it('keeps Graham capitalised and never finished', () => {
    for (const id of GRAHAM) {
      expect(body(id)[0], `${id} does not open like a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });

  /**
   * Warren and Em are both lowercase and unfinished, so they are separated by what
   * they say: Warren is exact to the second, Em apologises before anybody accuses
   * her of anything.
   */
  it('keeps Warren technical and Em nineteen', () => {
    for (const id of [...WARREN, ...EM, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('w3')).toContain('contagem de ritmo');
    expect(body('w9')).toContain('parciais');
    expect(body('g1')).toContain('desculpa');
    expect(body('g7')).toContain('isso não é desculpa');

    // Both of them lowercase the names, which is what keeps them apart from Graham.
    expect(body('c8')).toContain('graham');
    expect(body('g4')).toContain('o graham');
  });

  /**
   * The player has no gender. No rephrase was forced here: every player-addressed
   * line runs on a verb or on a fixed-gender noun — `as piores mãos`, `a melhor
   * cabeça`, and `gentil`, which is invariable. Swept so it stays that way.
   */
  it('never assigns the player a gender', () => {
    expect(body('d1')).toContain('as piores mãos');
    expect(body('d1')).toContain('a melhor cabeça');
    expect(script.coda?.messages[1]).toContain('gentil');

    const addressed = [
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      body('d1'),
      script.blurb,
    ].join('\n');
    expect(addressed).not.toMatch(/\b(cert|segur|cansad|prepar[ae]d|sozinh|bem-vind)[oa]\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('A Prova Longa (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('club')).toBe('o clube');
    expect(place('boathouse')).toBe('o galpão dos barcos');
    expect(place('bank')).toBe('a margem');
    expect(place('slipway')).toBe('a rampa');
    expect(place('bar')).toBe('o bar do clube');
    expect(place('river')).toBe('o rio');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('hester')).toBe('Pauline');
    expect(character('saul')).toBe('Graham');
    expect(character('imo')).toBe('Em');
    expect(character('warren')).toBe('Warren');
    expect(character('dilys')).toBe('Carol');
  });

  /**
   * The towpath and the slipway are two different places on the same water, and
   * three of the four proofs depend on telling them apart: Carol stands at the top
   * of one and watches the other, Warren is on one while Graham is on the other.
   */
  it('keeps the towpath and the slipway two different places', () => {
    expect(label('c-dilys-bank')).toContain('na margem');
    expect(label('c-warren-bank')).toContain('na margem');
    expect(label('c-saul-slipway')).toContain('na rampa');
    expect(body('d2')).toContain('no alto da rampa');
    expect(body('d4')).toContain('na margem');
    expect(body('w4')).toContain('na rampa');
    expect(revelation('x-warren-bank')).toContain('margem');
    expect(revelation('x-saul-slipway')).toContain('rampa');
  });

  /**
   * `a margem` is also the ordinary Portuguese word for the margin of a page, and
   * the epilogue has Pauline writing in one. That would have put the towpath chip's
   * words on a sheet of paper, so the epilogue says `na lateral da folha` instead —
   * the hazard privatetexts/i18n/place-names-in-prose warns about, where a place
   * name is already doing another job in the same pack.
   */
  it('does not let the towpath word do a second job', () => {
    expect(script.solution.epilogue).toContain('na lateral da folha');
    expect(script.solution.epilogue).not.toContain('na margem da');
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

  /** Whatever form of each name the English uses, the Portuguese uses too. */
  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Pauline Vaine',
      'Graham Brightwell',
      'Warren Ako',
      'Carol Prentice',
      'Emma Kerr',
      'Dorothy Nance',
      'Ken Wardle',
      'S. Brightwell',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Em's thread opens because Carol names Emma Kerr in the message that gates it. */
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

    expect(body('d10')).toContain('Emma Kerr');
  });
});
