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
import { theUnderstudyPtBr } from './the-understudy';

/**
 * The Brazilian Portuguese Understudy, checked on the things a player reasons over.
 *
 * Deliberately not routed through CASE_TRANSLATIONS. The orchestrator registers
 * translations, several packs are in flight at once, and a translation that only
 * starts being checked on the day somebody edits a registry is a translation
 * nobody checked. So the object is imported and applied directly, and the generic
 * contract is re-run here against it.
 *
 * The rest is what no generic test can see. This case is a locked room resting on
 * one object, and it states nearly all of its times in words — `oito e doze`, not
 * 20:12 — so a Portuguese line that gives the key a second name, or that says
 * `oito e meia` where the English says twelve minutes past, leaves every id,
 * number and paragraph check green and the case unsolvable by reading.
 *
 * Deliberately brittle. Rewording one of these lines should break a test, because
 * rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-understudy')!;
const script = applyCaseText(english, theUnderstudyPtBr);
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

const clock = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

/** Accent- and punctuation-blind, so `Diane’s` matches `dianes` in a message. */
const fold = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

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

describe('A Suplente (pt-BR) — the contract, before anybody registers it', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theUnderstudyPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theUnderstudyPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theUnderstudyPtBr)];

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

/* -------------------------------------------------------------------- the key */

describe('A Suplente (pt-BR) — the locked room', () => {
  /**
   * One object, one name. Two people claim the same key at overlapping minutes and
   * that pair is the first contradiction; if the chip and the prose call it two
   * different things, the player is holding two keys and the locked room has a way
   * out of it.
   */
  it('gives the key exactly one name, on both chips and in the prose', () => {
    expect(script.objects.find((o) => o.id === 'key1')?.name).toBe('a chave do camarim');
    expect(label('c-key-dev')).toContain('a chave do camarim');
    expect(label('c-key-bea')).toContain('a chave do camarim');

    // The red tag is how Nell knows which key it is, so it has to survive into
    // both the revelation and the press she is disbelieved over.
    expect(body('e7')).toContain('a etiqueta vermelha');
    expect(revelation('x-key')).toContain('etiqueta vermelha');
    expect(press('u-key')).toContain('etiqueta vermelha');
    expect(revelation('x-key')).toContain('uma só chave');
  });

  /** Dev is exonerated by a late train, and only the digits do that. */
  it('keeps the train that clears Dev', () => {
    expect(body('d3')).toContain('20:12');
    expect(body('d4')).toContain('20:12');
    expect(body('d4')).toContain('20:51');
    expect(revelation('x-dev-train')).toContain('20:12');
    expect(revelation('x-dev-train')).toContain('20:51');
  });
});

/* ------------------------------------------------------------------ the times */

describe('A Suplente (pt-BR) — the times', () => {
  /**
   * Every time the case turns on, in the message that states it. The interval runs
   * 20:05–20:40, and the minute that convicts Beatrice is twelve past — Dev watches
   * her go down the corridor while she is putting herself in J14.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      q4: ['sete e meia'], // Nell called for the half
      q11: ['às sete'], // the text that starts the case
      q14: ['oito e dez'], // where Nell was stood
      d5: ['oito e cinco'], // Nell in the corridor, 20:05–20:12
      d7: ['oito e doze', 'oito e vinte'], // Beatrice down and back, 20:12–20:22
      d8: ['oito e dez'], // Diane goes down and is never seen again
      d9: ['oito e vinte'],
      e4: ['oito e cinco', 'oito e doze'], // Nell, in her own words
      e5: ['vinte pras nove'], // on stage in front of four hundred people
      e7: ['oito e dez'], // the key going past her
      b2: ['oito e cinco', 'J14'], // the seat she puts herself in
      b3: ['vinte minutos'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The proof and the press have to name the same minutes Dev named.
    expect(revelation('x-bea-corridor')).toContain('oito e doze');
    expect(revelation('x-bea-corridor')).toContain('oito e vinte');
    expect(press('u-corridor')).toContain('oito e doze');
    expect(press('u-corridor')).toContain('oito e vinte');
  });

  /**
   * Only three things in this case are written in digits, and all three are
   * mechanical: the train Dev went to meet, the train that actually arrived, and
   * the seat number. Everyone else speaks their times, so a translator tidying the
   * company into digits would make the timetable stop being the only hard fact.
   */
  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['d3', 'd4', 'b2']);
  });
});

/* ----------------------------------------------------------------- the motive */

describe('A Suplente (pt-BR) — the motive and the silence', () => {
  /** Both halves, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('cl7')).toContain('onze mil'); // Diane names the amount
    expect(body('cl7')).toContain('Joel Petrie');
    expect(body('b6')).toContain('Sheffield'); // Beatrice says who was driving
    expect(body('b6')).toContain('dirigindo era eu');
  });

  /**
   * The phrase the whole case hangs off. Diane says it, the player repeats it back
   * to the company, the player puts it to Beatrice, and Beatrice tells you what it
   * meant. Four messages, one wording, or the player cannot follow it across three
   * threads.
   */
  it('keeps "de um jeito ou de outro" identical in all four places', () => {
    for (const id of ['cl9', 'q11', 'b8']) {
      expect(body(id), `${id} no longer says it the same way`).toContain(
        'de um jeito ou de outro',
      );
    }
    expect(body('b9')).toContain('Acabava no sentido de que ela ia falar.');
  });

  /**
   * Pack 2 is deliberately standalone. Per docs/arc-design.md the silence is
   * load-bearing: if every pack connects, players stop reading cases and start
   * scanning for the arc. So no Keeper, no Listener, no coda.
   */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    const all = [...caseTextEntries(script).values()].join('\n');
    expect(all).not.toMatch(/keeper|listener|número desconhecido|unknown number/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('A Suplente (pt-BR) — the voices', () => {
  const DIANE = ['cl1', 'cl3', 'cl4', 'cl6', 'cl7', 'cl9'];
  const BEA = [
    'q1', 'q2', 'q4', 'q8', 'q9', 'q12',
    'b1', 'b2', 'b3', 'b5', 'b6', 'b7', 'b9', 'b10',
  ];
  const DEV = ['q5', 'q6', 'q7', 'q14', 'd1', 'd3', 'd4', 'd5', 'd7', 'd8', 'd9'];
  const NELL = ['q3', 'q10', 'q13', 'e1', 'e2', 'e4', 'e5', 'e7', 'e8', 'e8c', 'e10'];
  const YOU = ['cl2', 'cl5', 'cl8', 'cl10', 'q11', 'd2', 'd6', 'e3', 'e6', 'e8b', 'e9', 'b4', 'b8'];

  /** Beatrice writes like a woman dictating a letter. She always finishes. */
  it('keeps Beatrice writing in sentences', () => {
    for (const id of BEA) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /** Everybody else thumbs a phone: lowercase, and no full stop at the end. */
  it('keeps the other four typing rather than writing', () => {
    for (const id of [...DIANE, ...DEV, ...NELL, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });

  /**
   * Dev and Nell both open lowercase and both capitalise the names, so the whole
   * distance between them is vocabulary. Dev has called the show for twenty two
   * years and uses the words for it; Nell is nineteen and hedges everything. Lose
   * that and two of the five characters collapse into one.
   */
  it('keeps Dev technical and Nell hedging', () => {
    expect(body('q7')).toContain('contrarregra'); // where the key lives
    expect(body('d1')).toContain('aviso'); // he calls the show
    expect(body('d8')).toContain('aviso');

    // Nell hedges even the sighting that convicts Beatrice, which is exactly why
    // she is easy to disbelieve.
    expect(body('e7')).toContain('mais ou menos');
    expect(body('e8c')).toContain('é que');
    expect(body('e10')).toContain('não sei');

    // And they still capitalise each other, the way the English does.
    expect(body('d5')).toContain('Nell');
    expect(body('e1')).toContain('Dev');
  });

  /**
   * The player's gender is never stated. b1 is the one line that forced a rephrase:
   * "You have been busy." wants `ocupado`/`ocupada` and both agree, so Beatrice
   * opens on what the player did instead of what the player is.
   */
  it('never assigns the player a gender', () => {
    expect(body('b1')).toContain('Você não parou.');
    const addressed = [
      body('b1'),
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
      script.briefing?.opening ?? '',
    ].join('\n');
    expect(addressed).not.toMatch(/\b(ocupad|cansad|prepar[ae]d|segur|bem-vind)[oa]\b/i);
  });
});

/* ---------------------------------------------------------------- the names */

describe('A Suplente (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('theatre')).toBe('o Alhambra');
    expect(place('stage')).toBe('o palco');
    expect(place('auditorium')).toBe('a sala');
    expect(place('corridor')).toBe('o corredor dos camarins');
    expect(place('dressing1')).toBe('o camarim da Diane');
    expect(place('stagedoor')).toBe('a porta de artistas');
    expect(place('station')).toBe('a estação de trem');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('coral')).toBe('Diane');
    expect(character('bea')).toBe('Beatrice');
    expect(character('dev')).toBe('Dev');
    expect(character('nell')).toBe('Nell');
  });

  /**
   * `a sala` is the auditorium as a whole, and the choice is load-bearing rather
   * than stylistic. Beatrice claims it from J14; Nell puts her at the back of the
   * circle, which sits inside it. Naming it `a plateia` would have made those two
   * places different and invented a contradiction the engine does not hold.
   */
  it('keeps the circle inside the auditorium', () => {
    expect(body('b2')).toContain('na sala');
    expect(label('c-bea-auditorium')).toContain('na sala');
    expect(body('e8c')).toContain('balcão');
    expect(revelation('x-bea-notes')).toContain('fundo do balcão');
  });

  /**
   * The naming rule from caseText.test.ts, run here rather than at registration —
   * that generic test only covers translations the orchestrator has registered.
   */
  it('says its own names for people, places and the key somewhere in the prose', () => {
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
      ...script.objects.map((o) => ({
        id: `object.${o.id}`,
        english: fold(english.objects.find((e) => e.id === o.id)?.name ?? ''),
        rendered: fold(o.name),
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
   * Nell is found by reading, not by proving: Dev names her twice and only then
   * does she become reachable. If both messages stop naming her the thread arrives
   * out of nowhere.
   */
  it('names Nell in the messages that open her thread', () => {
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

    // Both of Dev's pointers, not just the one the gate happens to check first.
    expect(body('q14')).toContain('Nell');
    expect(body('d5')).toContain('Nell');
  });
});
