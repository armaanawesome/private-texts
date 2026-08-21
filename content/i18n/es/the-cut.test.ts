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
import { theCutEs } from './the-cut';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The Spanish Cut, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry. The generic contract is re-run here against the
 * localised script.
 *
 * The rest is what no generic test can see. This case is arithmetic: three miles
 * an hour, six miles, five locks, three hours up and three back. Every one of
 * those numbers is true and they are what hides him. The single number that
 * breaks it — forty minutes on a bicycle — has to survive in the three places it
 * is stated, and no id, number or paragraph check can tell whether it did.
 */
const english = getCase('the-cut')!;
const script = applyCaseText(english, theCutEs);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const chip = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const allProse = [...caseTranslationEntries(theCutEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('El canal (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theCutEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theCutEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theCutEs)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const prose = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of prose) {
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

  /** A chip may name its window, or a single moment inside it, or its assertion. */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (form) => form.join('|') === times.join('|'),
      );
      const pointInside =
        times.length === 1 &&
        toMinutes(times[0]!) >= c.window.start % 1440 &&
        toMinutes(times[0]!) <= c.window.end % 1440;

      expect(
        spansWindow || pointInside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* ------------------------------------------------------------ the arithmetic */

describe('El canal (es) — the arithmetic that hides him', () => {
  /**
   * Every number in the alibi is true, which is why forty boats believed it.
   * If a translator rounds one of them the community stops sounding fluent and
   * the reader stops trusting the sum they are supposed to trust and then
   * discard.
   */
  it('keeps the boat arithmetic exact everywhere it is stated', () => {
    expect(script.blurb).toContain('tres millas por hora');
    expect(body('k3')).toContain('seis millas y cinco esclusas');
    expect(body('m6')).toContain('Seis millas. Cinco esclusas.');
    expect(body('m6')).toContain('Tres horas de subida y tres de bajada');
    expect(body('k4')).toContain('sabe hacer esas cuentas');
    expect(revelation('x-nate-norbury')).toContain('seis millas y cinco esclusas');
  });

  /**
   * And the one number nobody said out loud. It has to read identically in
   * Sam's mouth, in the proof and in the press line, because a player who has
   * spent the case doing lock sums only gets one chance to notice a different
   * unit has arrived.
   */
  it('keeps the forty minutes on a bicycle identical in all three places', () => {
    // Lowercased before comparing: `Seis millas` opens b8 and sits mid-sentence
    // in the other two. Casing is where the sentence breaks, not whether the
    // fact survived, and this assertion is about the fact.
    for (const text of [body('b8'), revelation('x-nate-bike'), press('c-bike')]) {
      expect(text.toLowerCase()).toContain('cuarenta minutos');
      expect(text.toLowerCase()).toContain('seis millas');
    }
    expect(body('b8')).toContain('en bici');
    expect(revelation('x-nate-bike')).toContain('en bicicleta');
    expect(body('b7')).toContain('Iba en bici');
    expect(chip('c-nate-bike')).toContain('en bici');
    // The boat really did not move, and the case has to keep saying so.
    expect(body('g2')).toContain('Su barco no se movió');
    expect(chip('c-nate-moored')).toContain('amarrado en Tyrley');
    expect(press('c-bike')).toContain('Tu barco no se movió y eso es verdad');
  });

  /** The question nobody asked, which is the whole pack in one sentence. */
  it('keeps the sentence that names the mistake', () => {
    expect(body('g3')).toContain('Nadie ha hecho una pregunta sobre el hombre');
    expect(body('b8')).toContain('la pregunta tampoco');
    expect(script.blurb).toContain('si cogió el barco');
  });
});

/* ------------------------------------------------------------------ the times */

describe('El canal (es) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      k1: ['a las once'], // Sam finds her
      k8: ['desde las ocho hasta las dos de la mañana'], // Tam in A&E
      m2: ['las siete y media', 'las ocho', 'las dos y veinte'], // the whole hospital night
      b2: ['de ocho a las diez menos veinte'], // Sam walks the dog, every night
      b4: ['Las ocho y media'], // and speaks to Nate. the sighting
      g6: ['20:44'], // the key log
      g7: ['de seis a siete'], // Julie in the pub, happy
      g8: ['el sábado a las dos'], // Effie was coming
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    for (const text of [revelation('x-nate-norbury'), press('c-norbury')]) {
      expect(text).toContain('las ocho y media');
    }
    for (const text of [revelation('x-nate-wharf'), press('c-wharf')]) {
      expect(text).toContain('20:44');
    }
    expect(chip('c-nate-wharf')).toContain('20:44');
    expect(revelation('x-tam-hospital')).toContain('desde las ocho hasta las dos y veinte');
    expect(press('c-why')).toContain('el sábado a las dos');
    expect(script.solution.epilogue).toContain('de ocho a las diez menos veinte');
  });

  /**
   * One machine in the whole case, and it is the only thing allowed digits.
   *
   * Everybody on this canal speaks their times, and the key log does not. That
   * gap is why `20:44` outranks forty boats and a man who worked the locks for
   * eleven years, and tidying any other line into digits would flatten it.
   */
  it('lets only the key log write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['g6']);
    expect(digitTimes(body('g6'))).toEqual(['20:44']);
    expect(body('g6')).toContain('Registrada a su licencia');
  });
});

/* ------------------------------------------------------------------ the names */

describe('El canal (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('cut')).toBe('el canal');
    expect(place('norbury')).toBe('Norbury');
    expect(place('norburywharf')).toBe('el muelle de Norbury');
    expect(place('veritysboat')).toBe('el barco de Julie');
    expect(place('pub')).toBe('el Junction');
    expect(place('tyrley')).toBe('Tyrley');
    expect(place('tyrleylocks')).toBe('las esclusas de Tyrley');
    expect(place('towpath')).toBe('el camino de sirga');
    expect(place('hospital')).toBe('el Royal Shrewsbury');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('verity')).toBe('Julie');
    expect(character('nate')).toBe('Nate');
    expect(character('bo')).toBe('Sam');
    expect(character('gwyn')).toBe('Alan');
    expect(character('tam')).toBe('Tam');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theCutEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * Spanish `del` and `al` swallow a masculine article, so the three place
   * names a player has to match against a chip are each said in full somewhere.
   * Otherwise the chip names a place no sentence contains, which is the same
   * defect shape as a place name the prose never says at all.
   */
  it('says the canal, the wharf and the towpath in full at least once', () => {
    expect(body('m5')).toContain('el canal');
    expect(body('g5')).toContain('el muelle de Norbury');
    expect(body('k9')).toContain('el camino de sirga');
    expect(body('m7')).toContain('el camino de sirga');
    expect(body('g7')).toContain('el Junction');
  });

  /** A chip and a sentence have to use the same words or they are two places. */
  it('uses one wording for the towpath and the wharf on the chip and in the prose', () => {
    for (const id of ['c-bo-towpath', 'c-nate-bike']) {
      expect(chip(id)).toContain('camino de sirga');
    }
    expect(body('b8')).toContain('camino de sirga');
    expect(revelation('x-nate-bike')).toContain('camino de sirga');

    expect(chip('c-nate-wharf')).toContain('el muelle de Norbury');
    expect(revelation('x-nate-wharf')).toContain('muelle de Norbury');
    expect(press('c-wharf')).toContain('cancela del muelle');
  });

  /**
   * Alan works the locks and must not read as a clue.
   *
   * The English comment on g1 records that he was a `lock keeper` until the arc
   * alias landed, and became `lock-wheeling` so that an innocent man would not
   * look like the villain. Spanish has no such collision — the alias stays
   * English and `esclusero` resembles it in nothing — but the fix is mirrored
   * anyway, because a red herring that only fails to fire in some languages is
   * not a design.
   */
  it('keeps Alan s job from reading as the alias', () => {
    expect(body('g1')).toContain('abriendo esclusas');
    expect(allProse).not.toMatch(/esclusero/i);
    expect(script.solution.killerId).not.toBe('gwyn');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('El canal (es) — the player has no gender', () => {
  /**
   * Nothing in this pack forced one. The two places a translator would reach
   * for an agreeing participle are the briefing and the second deflection,
   * where the player is described by having left — and `te mudaste` and
   * `dejaste` carry it without marking anybody.
   */
  it('describes the player only by what they did', () => {
    expect(script.briefing?.opening).toContain('Dejaste el barco y te mudaste a tierra');
    expect(script.briefing?.opening).not.toMatch(/mudad[oa]\b/);
    expect(script.confrontation?.deflections[1]).toContain('Tú dejaste el barco');
    expect(script.confrontation?.deflections[1]).toContain('No puedes volver ahora');
  });

  it('keeps the coda from describing the player at all', () => {
    expect(script.coda?.messages[0]).toContain('Lo has hecho en cinco días');
    expect(script.coda?.messages[2]).toContain('por si llevas la cuenta');
    expect(script.coda?.messages[3]).toContain('Deberías preguntarte');
    for (const m of script.coda?.messages ?? []) {
      expect(m, 'the coda has grown an adjective about the player').not.toMatch(
        /\b(listo|lista|rápido|rápida|amable|cuidadoso|cuidadosa)\b/,
      );
    }
  });
});

/* ----------------------------------------------------------------- the voices */

describe('El canal (es) — the voices', () => {
  const JULIE = ['v1', 'v2', 'v4', 'v6', 'v7', 'v9', 'v10', 'v11'];
  const NATE = ['k3', 'k4', 'k6', 'k7'];
  const TAM_GROUP = ['k2', 'k8'];
  const TAM_PRIVATE = ['m1', 'm2', 'm4', 'm5', 'm6', 'm7'];
  const SAM = ['b1', 'b2', 'b4', 'b6', 'b7', 'b8', 'b9'];
  const ALAN = ['k1', 'k5', 'k9', 'g1', 'g2', 'g3', 'g5', 'g6', 'g7', 'g8', 'g9'];
  const YOU = ['v3', 'v5', 'v8', 'm3', 'b3', 'b5', 'g4'];

  /**
   * The axis this pack actually has, and it is situational rather than
   * personal — the same rebuild Pack 8 needed, for the same reason: there is no
   * apostrophe axis here worth substituting an accent for.
   *
   * Tam types differently depending on who is reading. In the group chat he is
   * lowercase, never closes a sentence, and does not capitalise `shrewsbury`.
   * In the private thread he uses capitals and finishes everything. Same man,
   * two rooms, and the difference is that forty people are watching one of them.
   */
  it('keeps Tam writing one way in the group and another way alone', () => {
    for (const id of TAM_GROUP) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('k8')).toContain('shrewsbury');

    for (const id of TAM_PRIVATE) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * Nate loses his composure inside four messages. k3 is a prepared statement
   * and lands its full stop; k4, k6 and k7 do not, and k7 is him naming
   * somebody else. That decay is the character.
   */
  it('keeps Nate composed for exactly one message', () => {
    for (const id of NATE) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
    }
    expect(body('k3').endsWith('.'), 'k3 is the prepared statement and closes').toBe(true);
    for (const id of ['k4', 'k6', 'k7']) {
      expect(body(id).endsWith('.'), `${id} has grown a composure it should have lost`).toBe(false);
    }
    expect(body('k7')).toContain('Tam');
  });

  /** Julie, Sam and Alan write in capitals and finish every sentence. */
  it('keeps Julie, Sam and Alan writing in sentences', () => {
    for (const id of [...JULIE, ...SAM, ...ALAN]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /** The player is thumbing a phone: lowercase, short, and never opens with ¿. */
  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('v8')).toContain('nate');
    expect(body('b5')).toContain('tyrley');
  });
});

/* -------------------------------------------------------------------- the arc */

describe('El canal (es) — the arc', () => {
  /**
   * Pack 9 carries the third arc connection. The alias appears exactly once in
   * the English and must appear exactly once here — arcAlias.test.ts counts
   * mentions, and an extra helpful one is as wrong as a missing one.
   */
  it('keeps the single mention of the Keeper, in English', () => {
    expect(allProse.split('Keeper').length - 1).toBe(1);
    expect(script.confrontation?.confession).toContain('se hacía llamar el Keeper');
  });

  it('keeps the arc out of every message and out of the coda', () => {
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toContain('Keeper');
    for (const m of script.coda?.messages ?? []) {
      expect(m).not.toContain('Keeper');
    }
  });

  /**
   * Clue 4 is that he follows up. The confession has to land the second call
   * and the coda has to admit it, or the player has nothing new to carry into
   * the next pack.
   */
  it('keeps the follow-up call exact in both halves', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('el domingo volvió a llamar');
    expect(confession).toContain('Solo para preguntar qué tal había ido');
    expect(confession).toContain('Como quien te pregunta por una entrevista');
    // He knew about the Saturday, which Nate had told nobody. That is the part
    // that makes the call impossible rather than merely odd.
    expect(confession).toContain('a quién se lo iba a contar');

    expect(script.coda?.messages[3]).toContain('Sí que lo llamé después');
    expect(script.coda?.messages[3]).toContain('Siempre lo hago');
    expect(script.coda?.messages[3]).toContain('lo único descuidado que hago');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('v7')).toContain('Viene el sábado'); // Julie says she is coming
    expect(body('v7')).toContain('delante de todo el mundo');
    expect(body('g8')).toContain('Effie venía el sábado a las dos'); // Alan confirms it
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('2009');
    expect(motive).toContain('en voz alta');
  });

  /**
   * Tam is the red herring and has to be provably innocent. Nate puts him at
   * Norbury; a hospital chair and a discharge letter put him in Shrewsbury, and
   * the case must not require proving it.
   */
  it('clears the man Nate named', () => {
    expect(chip('c-tam-norbury')).toContain('según Nate');
    expect(body('k8')).toContain('informe de alta');
    expect(body('m4')).toContain('cuarenta minutos después');
    expect(script.solution.requiredContradictionIds).not.toContain('x-tam-hospital');
  });

  /** Tam names Sam, which is the only reason Sam s thread opens. */
  it('still names Sam in the message that finds them', () => {
    expect(body('m7')).toContain('Sam');
  });
});
