import { describe, it, expect } from 'vitest';
import { getCase } from '../../cases/index';
import { localiseCase } from '../index';

/**
 * The Spanish tutorial, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every translated case to the rules that can be stated
 * generically: same ids, same numbers, same paragraphs, chips that agree with
 * their windows. It cannot check the half of the problem that lives in words.
 * The tutorial states most of its times in prose — "ten past three", not 03:10 —
 * and a Spanish line saying `las tres y media` there would leave every generic
 * test green and the case unsolvable by reading, which is the only way anybody
 * solves it.
 *
 * So the load-bearing facts are listed. This is deliberately brittle: rewording
 * one of these lines should break a test, because rewording one of these lines
 * is how the case quietly stops working.
 */
const script = localiseCase(getCase('tutorial')!, 'es');
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';

describe('Tutorial — El obrador (es)', () => {
  /**
   * Every clock time the case turns on, in the message that states it. Roza
   * puts herself on the ovens 03:00–04:00 and Ivy puts her on the square at
   * 03:20; that pair is the whole tutorial. The near-misses need their times
   * too, or they stop being near.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      t3: ['las dos de la mañana', 'las tres'], // ovens until the three o clock drop
      r4: ['las dos y veinte', 'las dos y media'], // the garage run, 02:20–02:45
      r5: ['entre las tres y las cuatro'], // the alibi she gives twice
      r6: ['las tres y diez', 'media hora'], // the smoke break, 03:10–03:40
      iv2: ['las cinco'],
      iv4: ['las tres', 'pasadas las cuatro'], // the extractor, 03:00–04:00
      iv5: ['las tres y diez'], // the near-miss put to Ivy in the player's voice
      iv7: ['las tres y veinte'], // the sighting that breaks her
      iv8: ['entre las tres y las cuatro'],
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The confession has to name the same minute Roza's own account named, or
    // the player is reading two different stories about one cigarette.
    expect(script.confrontation?.confession).toContain('las tres y diez');
    expect(script.contradictions[0]?.revelation).toContain('las tres y veinte');
    expect(script.briefing?.opening).toContain('las cuatro y diez');
  });

  /**
   * The lesson a tutorial usually skips, taught inside the fiction so a player
   * who never pins the pair still meets the rule. tutorial.test.ts asserts the
   * English of this; if the Spanish drops it, Spanish players learn nothing
   * about nested places and read the refusal as a broken board.
   */
  it('has Ivy give the nested-place answer in her own words', () => {
    expect(body('iv6')).toContain('el patio es la panadería');
    // And the player has to have asked the question that provokes it.
    expect(body('iv5')).toContain('no salió de la panadería');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('t4')).toContain('la variante'); // the corner, from Tom
    expect(body('t4')).toContain('tres años');
    expect(body('iv10')).toContain('te entregas'); // handing yourself in, from Ivy
    expect(body('iv10')).toContain('roza');
  });

  /** Roza names Ivy, which is the only reason Ivy's thread appears. */
  it('still names Ivy in the message that finds her', () => {
    expect(body('r8')).toContain('Ivy');
  });

  /**
   * Four people who text differently. The register is the characterisation, and
   * it is the first thing a translation flattens.
   */
  it('keeps the voices apart', () => {
    // Ivy is nineteen: lowercase, no opening question marks, accents dropped.
    for (const id of ['iv1', 'iv3', 'iv7', 'iv9', 'iv10']) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toContain('¿');
    }
    // Tom and Roza write in full sentences, capitalised, like adults with a pen.
    for (const id of ['t1', 't3', 't6', 'r1', 'r4', 'r6']) {
      expect(body(id)?.[0], `${id} does not start as a written sentence`).toBe(
        body(id)?.[0]?.toUpperCase(),
      );
    }
  });
});
