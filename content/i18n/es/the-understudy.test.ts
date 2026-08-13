import { describe, it, expect } from 'vitest';
import { getCase } from '../../cases/index';
import { applyCaseText, caseTextEntries, caseTranslationEntries } from '../caseText';
import { theUnderstudyEs } from './the-understudy';

/**
 * The Spanish Understudy, checked on the things a player reasons over.
 *
 * caseText.test.ts holds every *registered* translation to the rules that can be
 * stated generically: same ids, same numbers, same paragraphs, chips that agree
 * with their windows. Two reasons this file exists anyway.
 *
 * First, registration. The orchestrator adds this pack to CASE_TRANSLATIONS, and
 * until it does, `localiseCase` returns the English and every generic check
 * silently passes over a file it cannot see. So the translation is applied
 * directly here. `applyCaseText` is exactly what `localiseCase` calls once the
 * registry knows about the pack, so nothing about this changes on the day it is
 * registered; it only stops being the only thing looking.
 *
 * Second, words. The generic tests cannot read Spanish. This case states nearly
 * every time in prose — "ten past", not 20:10 — and a line saying `las ocho y
 * media` there leaves every generic test green and the case unsolvable by
 * reading, which is the only way anybody solves it. It also turns on a single
 * physical object, and an object with two names is two objects.
 *
 * Deliberately brittle: rewording one of these lines should break a test,
 * because rewording one of these lines is how the case quietly stops working.
 */
const english = getCase('the-understudy')!;
const script = applyCaseText(english, theUnderstudyEs);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const beat = (id: string) => script.confrontation?.beats.find((b) => b.id === id);

describe('The Understudy — La suplente (es)', () => {
  /**
   * The completeness rule, run here until the pack is registered.
   *
   * A half-translated case is worse than an English one: the player reads six
   * messages in Spanish, hits one in English, and cannot tell whether the switch
   * means something. This is the same key-set comparison caseText.test.ts makes,
   * and it is the check most likely to catch a real mistake in this file.
   */
  it('translates every id the English case has, and no id it does not', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theUnderstudyEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'translates ids that do not exist').toEqual(
      [],
    );
  });

  /**
   * The locked room. One object, one name, everywhere the player meets it: both
   * chips, the revelation that breaks the room, the line that presses her with
   * it. Two names in Spanish would be two keys, and a case with two keys has no
   * locked room in it.
   */
  it('calls the key one thing on both chips and in the object list', () => {
    expect(script.objects.find((o) => o.id === 'key1')?.name).toBe('la llave del camerino');
    expect(label('c-key-dev')).toContain('la llave del camerino');
    expect(label('c-key-bea')).toContain('la llave del camerino');
  });

  /** The red tag is how Nell knows which key it is. It is the same tag every time. */
  it('keeps the red tag on the key wherever the player meets it', () => {
    for (const text of [
      body('e7'),
      revelation('x-key'),
      beat('u-key')?.press ?? '',
      script.solution.epilogue,
    ]) {
      expect(text, 'the red tag lost its name').toContain('la etiqueta roja');
    }
  });

  /**
   * Every clock time the case turns on, in the line that states it. The interval
   * is 20:05–20:40 and the English writes it in words, so the Spanish does too —
   * Spanish cannot leave the hour implicit the way "ten past" can, so the hour is
   * said. Dev at twelve past against Beatrice in J14 is the whole case.
   */
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      q4: ['las siete y media'], // tomorrow night, 19:30
      q11: ['las siete'], // Diane texts at curtain up
      q14: ['las ocho y diez'], // where Nell was stood, 20:10
      d5: ['las ocho y cinco'], // Nell in the corridor from 20:05
      d7: ['las ocho y doce', 'las ocho y veinte'], // Beatrice down and back, 20:12–20:22
      d8: ['las ocho y diez'], // Diane goes down and does not come back
      d9: ['las ocho y veinte'], // the twenty past Dev cannot stop thinking about
      e4: ['las ocho y cinco', 'las ocho y doce'], // Nell's own window, 20:05–20:12
      e5: ['las nueve menos veinte'], // on stage at 20:40, in front of four hundred
      e7: ['las ocho y diez'], // Beatrice carrying the key, 20:10
      b2: ['las ocho y cinco'], // her own alibi, 20:05
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // The corridor sighting has to name the same two minutes in all three places
    // the player reads it, or it is three different sightings.
    expect(revelation('x-bea-corridor')).toContain('las ocho y doce');
    expect(revelation('x-bea-corridor')).toContain('las ocho y veinte');
    expect(beat('u-corridor')?.press).toContain('las ocho y doce');
    expect(beat('u-corridor')?.press).toContain('las ocho y veinte');
  });

  /**
   * The train, which is the only reason Dev is innocent, and the seat, which is
   * the only reason Beatrice is not. Both stay digits in both languages.
   */
  it('keeps the train times and the seat number as digits', () => {
    expect(body('d3')).toContain('20:12');
    expect(body('d4')).toContain('20:12');
    expect(body('d4')).toContain('20:51');
    expect(revelation('x-dev-train')).toContain('20:12');
    expect(revelation('x-dev-train')).toContain('20:51');

    expect(body('b2')).toContain('J14');
    expect(revelation('x-bea-corridor')).toContain('J14');
    expect(beat('u-corridor')?.press).toContain('J14');
  });

  /**
   * Descriptive places are translated, so the chip and the sentence have to make
   * the same choice — the player matches one against the other by eye.
   */
  it('uses one Spanish name per place, on the chip and in the prose', () => {
    expect(revelation('x-bea-corridor')).toContain('el pasillo de los camerinos');
    expect(body('d4')).toContain('la puerta de artistas');
    expect(label('c-dev-stagedoor')).toContain('la puerta de artistas');
    expect(revelation('x-dev-train')).toContain('la puerta de artistas');
    // The auditorium is the whole room, not the stalls, because Nell puts her at
    // the back of the circle and that has to stay inside the place she claimed.
    expect(body('b2')).toContain('la sala');
    expect(body('cl3')).toContain('la sala');
    expect(label('c-bea-auditorium')).toContain('la sala');
    expect(body('e8c')).toContain('el anfiteatro');
  });

  /** Real theatre words, and the same one every time or the register wobbles. */
  it('uses the Spanish theatre vocabulary consistently', () => {
    expect(body('cl9'), 'beginners is the call, not a literal translation').toContain('a escena');
    expect(body('q7'), 'the prompt corner is where the key lives').toContain('regiduría');
    expect(body('e4'), 'the wings').toContain('las cajas');
    // One word for the interval, in the message, on the chip and in the proof.
    for (const text of [body('q7'), body('b3'), label('c-bea-notes'), revelation('x-bea-notes')]) {
      expect(text).toContain('entreacto');
    }
  });

  /** Dev names Nell twice, which is the only reason her thread ever appears. */
  it('still names Nell in the messages that find her', () => {
    expect(body('q14')).toContain('Nell');
    expect(body('d5')).toContain('Nell');
  });

  /** Both halves of the motive, in two different threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('cl7')).toContain('once mil'); // what Diane took this year
    expect(body('cl7')).toContain('Joel Petrie');
    expect(body('b6')).toContain('Sheffield'); // and what she was taking it for
    expect(body('b6')).toContain('once años');
  });

  /**
   * Four people who text differently. The register is the characterisation, and
   * it is the first thing a translation flattens.
   *
   * Beatrice is the only one who writes like a letter. Spanish has no capitalised
   * first person pronoun, so the other three are lowercase all the way down in a
   * way the English cannot quite manage — the exception is a message that opens
   * on somebody's name, which they all capitalise, exactly as the English does.
   */
  it('keeps the voices apart', () => {
    // Plus "Bea", which is what the company calls her to her face and behind it.
    // She signs herself Beatrice; nobody else writes that.
    const names = [...script.characters.map((c) => c.name), 'Bea'];
    const opensOnAName = (text: string): boolean => names.some((n) => text.startsWith(n));

    for (const m of messages) {
      if (m.senderId === 'bea') {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      } else {
        if (!opensOnAName(m.body)) {
          expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        }
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
        expect(m.body, `${m.id} has grown punctuation`).not.toContain('¿');
      }
    }

    // Nell hedges. It is the difference between her and Dev, who is lowercase
    // for speed rather than fear.
    expect(body('e8c')).toContain('es que');
    expect(body('e10')).toContain('no sé');
  });
});
