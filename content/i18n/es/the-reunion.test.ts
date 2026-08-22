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
import { clock, digitTimes, numbers, paragraphs } from '../testkit';
import { theReunionEs } from './the-reunion';

/**
 * The Spanish Reunion, checked on the things a player reasons over.
 *
 * Applied directly rather than through CASE_TRANSLATIONS. What no generic test
 * can see: two times that must never blur into each other, and four claims that
 * exist to be refused.
 */
const english = getCase('the-reunion')!;
const script = applyCaseText(english, theReunionEs);

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

const allProse = [...caseTranslationEntries(theReunionEs).values()].join('\n');

describeCaseContract(script);

describe('El reencuentro (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theReunionEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theReunionEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theReunionEs)];
    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const seen = new Map<string, string>();
    for (const [path, value] of entries.filter(
      ([p]) => !/^(character|place|object|thread)\./.test(p) && p !== 'title',
    )) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
      seen.set(value, path);
    }
  });

  /**
   * The numbers rule compares digits, and spelling one out is the edit that
   * looks harmless every time. `Year 4` became `cuarto de primaria` in the first
   * draft of this file and the rule caught it; it is `4.º de primaria` now.
   */
  it('keeps every number and every paragraph the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
    }
    expect(script.briefing?.opening).toContain('4.º de primaria');
  });

  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (f) => f.join('|') === times.join('|'),
      );
      const inside = times.length === 1 && times[0]! >= start && times[0]! <= clock(c.window.end);

      expect(
        spansWindow || inside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('El reencuentro (es) — the clock nobody looked at', () => {
  /**
   * Two times, and they must never blur. `las nueve` is what the programme says
   * and what ninety people believe; `las ocho y cuarto` is when he actually
   * spoke. Michelle states both in one breath, and the revelation states both
   * again — if either drifts, the witnesses stop being wrong in the specific
   * way the case needs.
   */
  it('keeps the programme time and the real time apart, everywhere', () => {
    expect(body('k6')).toContain('el programa ponía las nueve');
    expect(body('k6')).toContain('a las ocho y cuarto');
    expect(body('r4')).toContain('A las nueve');
    expect(body('k7')).toContain('después de las ocho y cuarto');
    expect(body('k7')).toContain('después de las nueve');

    const speech = revelation('x-rafe-speech');
    expect(speech).toContain('El programa pone las nueve');
    expect(speech).toContain('a las ocho y cuarto');
    expect(speech).toContain('20:55');
    expect(press('a-speech')).toContain('cuarenta y cinco minutos');
    expect(press('a-speech')).toContain('A las nueve estabas fuera');
  });

  it('states every other load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n10: ['las ocho y diez'], // the letter is already gone
      k4: ['las nueve menos cuarto'], // Michelle in the hall
      r2: ['las nueve menos cuarto', 'las nueve y media'], // and Mark's account of it
      c2: ['las nueve'], // Vale's round, which is not the party
      c3: ['Las nueve y dos o tres minutos'], // and where he found him
      c6: ['21:08', '21:19'], // the barrier
      c8: ['las ocho y media'], // Nia thanking him
    };
    for (const [id, fragments] of Object.entries(times)) {
      for (const f of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${f}"`).toContain(f.toLowerCase());
      }
    }

    expect(script.briefing?.opening).toContain('las nueve y media');
    for (const t of [revelation('x-rafe-gate'), press('a-gate')]) {
      expect(t).toContain('21:08');
      expect(t).toContain('21:19');
    }
    expect(revelation('x-rafe-music')).toContain('a las nueve');
    expect(script.confrontation?.confession).toContain('las ocho y diez');
  });

  /**
   * Only the two documents carry digits — the caterer's invoice and the barrier
   * printout. Mr Vale's nine o'clock is a different kind of certainty and has to
   * read like one, which it cannot do if it is written 21:00.
   */
  it('lets only the invoice and the barrier write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['k7', 'c6']);
    expect(body('c5')).toContain('Las nueve son las nueve');
    expect(body('c5')).toContain('la señora Hartley');
  });
});

describe('El reencuentro (es) — the dead ends', () => {
  /**
   * Four claims are `with_person`, and the engine can never fire a contradiction
   * on them: being with one person does not exclude being with another. They
   * exist to be paired and refused, which is the emotional content of a reunion
   * enforced by a rule instead of narrated.
   *
   * So they are phrased as plainly as Spanish allows — a player has to be
   * tempted by them — and none of them is ever cited by a contradiction.
   */
  it('phrases the co-presence chips plainly and never uses them as proof', () => {
    expect(chip('c-marika-with-nia')).toBe('Michelle: con Nia, 20:45–21:30');
    expect(chip('c-nia-with-marika')).toBe('Nia: con Michelle, 20:45–21:25');
    expect(chip('c-marika-with-rafe')).toBe('Michelle: con Mark, 20:50–21:20 (según Mark)');
    expect(chip('c-nia-with-rafe')).toBe('Nia: con Mark, 20:55–21:15 (según Mark)');

    const cited = new Set(script.contradictions.flatMap((x) => [x.claimIdA, x.claimIdB]));
    for (const id of [
      'c-marika-with-nia',
      'c-nia-with-marika',
      'c-marika-with-rafe',
      'c-nia-with-rafe',
    ]) {
      expect(cited.has(id), `${id} is a dead end and must not be cited as proof`).toBe(false);
    }

    // And the line that tells the player co-presence was never going to help.
    expect(script.blurb).toContain('con quién estaban');
    expect(script.blurb).toContain('qué hora era');
    expect(body('r5')).toContain('Nadie estuvo solo ni un momento');
  });
});

describe('El reencuentro (es) — the names', () => {
  it('translates the places that are descriptions', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('school')).toBe('Ardenshaw High');
    expect(place('hall')).toBe('el salón de actos');
    expect(place('musicblock')).toBe('el pabellón de música');
    expect(place('carpark')).toBe('el aparcamiento del personal');
    expect(place('riverpath')).toBe('el camino del río');
    expect(place('branch')).toBe('la oficina de Calderside');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theReunionEs)]
      .filter(([p]) => !/^(character|place|object|thread)\./.test(p))
      .map(([, v]) => v)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * All four translated places are masculine and Spanish `al` and `del` would
   * swallow the article, so each is said in full somewhere. This is the defect
   * that shipped in `the-allotments` as `al camino de Carr Bank`.
   */
  it('says every masculine place in full, uncontracted, at least once', () => {
    expect(body('n3')).toContain('en el salón de actos');
    expect(body('c2')).toContain('el pabellón de música');
    expect(script.confrontation?.confession).toContain('el aparcamiento del personal');
    expect(script.briefing?.opening).toContain('en el camino del río');
  });
});

describe('El reencuentro (es) — the player has no gender', () => {
  it('describes the player only by what they were and were not', () => {
    expect(script.briefing?.opening).toContain('Eras de esa promoción');
    expect(script.briefing?.opening).toContain('nunca fuiste de ese grupo');
    expect(body('n1')).toContain('me pintaste el estuche');
    expect(script.confrontation?.opening).toContain('lo que te estás proponiendo desmontar');
    // The sharpest line anybody says to the player carries its contempt through
    // a verb rather than an adjective.
    expect(script.confrontation?.deflections[0]).toContain('Estabas en el aula');
    expect(script.confrontation?.deflections[0]).not.toMatch(/\b(nuevo|nueva|ajeno|ajena)\b/);
  });
});

describe('El reencuentro (es) — the voices', () => {
  const MICHELLE = ['g2', 'g4', 'g6', 'k1', 'k3', 'k4', 'k6', 'k7', 'k8', 'k9', 'k10'];
  const WRITTEN = [
    'n1', 'n3', 'n4', 'n5', 'n7', 'n8', 'n9', 'n10',
    'g1', 'g5', 'g7', 'r1', 'r2', 'r4', 'r5', 'r7', 'r8', 'r9',
    'g3', 't1', 't2', 't4', 't5', 't7', 't8', 't9',
    'c1', 'c2', 'c3', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
  ];
  const YOU = ['n2', 'n6', 'k2', 'k5', 'r3', 'r6', 't3', 't6', 'c4'];

  /**
   * The whole social content of the pack, in one orthographic difference.
   *
   * Mark is a head teacher and writes like one. Michelle is lowercase from
   * start to finish, never lands a full stop, and does not capitalise her own
   * name for herself — and she is the one telling the truth. There is no
   * apostrophe axis in this pack, so nothing had to be substituted; the casing
   * carries it exactly as the English has it.
   */
  it('keeps Michelle lowercase and unfinished, and Mark finished', () => {
    for (const id of MICHELLE) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of WRITTEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // She lowercases him to his face, in the group, in front of everybody.
    expect(body('g6')).toContain('mark');
  });

  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });
});

describe('El reencuentro (es) — the arc and the motive', () => {
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
  });

  /**
   * The lie was never who. It was how long, and the pack collapses if that
   * inverts — so the twenty minutes and the nobody-pushed-him have to be
   * sayable in the same words in Michelle's mouth, in the motive and in the
   * press line.
   */
  it('keeps the lie about how long, not about who', () => {
    expect(body('k8')).toContain('a ashley no lo empujó nadie');
    expect(body('k8')).toContain('veinte minutos');
    expect(body('k9')).toContain('montó la historia en el talud');
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('no lo tocó nadie');
    expect(motive).toContain('veinte minutos');
    expect(press('a-why')).toContain('no lo empujó nadie');
    expect(press('a-why')).toContain('veinte minutos');
    expect(body('r9')).toContain('fue un accidente');
  });

  /** Both halves of the motive, in two threads. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('n7')).toContain('ocho páginas');
    expect(body('n8')).toContain('Dice nosotros');
    expect(body('k9')).toContain('él dijo las palabras primero');
    // And the ending the letter never needed, which is the point of the pack.
    expect(script.confrontation?.confession).toContain('No iba a dar mi nombre');
    expect(script.solution.epilogue).toContain('Decía nosotros de principio a fin');
  });

  /**
   * Tobi is the red herring. Mark puts him in the hall; a rota of nine and
   * forty-one miles clear him, and the case must not require proving it.
   */
  it('clears the man Mark named', () => {
    expect(chip('c-tobi-hall')).toContain('según Mark');
    expect(body('t2')).toContain('cuarenta y una millas');
    expect(revelation('x-tobi-branch')).toContain('No es una cosa rara de ser');
    expect(script.solution.requiredContradictionIds).not.toContain('x-tobi-branch');
  });

  /** Mark names Tobi, which is the only reason Tobi s thread opens. */
  it('still names Tobi in the message that finds him', () => {
    expect(body('r7')).toContain('Tobi Marchetti');
  });
});
