import { describe, it, expect } from 'vitest';
import { loadCase } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextCoverage,
  caseTextEntries,
  caseTranslationEntries,
} from '../caseText';
import { theNightFerryDe } from './the-night-ferry';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Night Ferry, checked on the things a player reasons over.
 *
 * The alibi failure is the character. He built an account of two hours out of
 * the document that says what should have been true — a timetable with a
 * Kirkwall call on it — the same way he built a rank out of nine years in a
 * messroom. Both halves have to stay sharp in German or the case becomes a man
 * who simply lied, rather than a man who only knows one way to be.
 */
const english = getCase('the-night-ferry')!;
const script = applyCaseText(english, theNightFerryDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const corpus = (senderId: string) => from(senderId).map((m) => m.body).join('\n');
const claim = (id: string) => messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id);
const chip = (id: string): string => claim(id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const spokenProse = [...caseTranslationEntries(theNightFerryDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join(' ');
const englishSpoken = [...caseTextEntries(english)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join(' ')
  .toLowerCase();

describeCaseContract(script);

describe('Die Nachtfähre (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightFerryDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightFerryDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightFerryDe)];

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

  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of messages.flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends =
        c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
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

  /** The phone is a unique object and the two claims overlap by nesting. */
  it('overlaps the two phone claims rather than matching them', () => {
    const his = claim('c-phone-dougie')!.window;
    const hers = claim('c-phone-marisa')!.window;

    expect(his.start).toBeLessThan(hers.end);
    expect(hers.start).toBeLessThan(his.end);
    expect(his.start === hers.start && his.end === hers.end).toBe(false);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Die Nachtfähre (de) — the call that never happened', () => {
  /**
   * Kirkwall is the crux: a place the ship never reached, so it shares no
   * ancestry with anywhere aboard. The dropped call has one time and it is the
   * same time everywhere it appears.
   */
  it('drops the Kirkwall call at the same minute everywhere', () => {
    expect(body('s2')).toContain('21:00');
    expect(revelation('x-dougie-kirkwall')).toContain('21:00');
    expect(chip('c-dougie-aboard')).toContain('21:00–23:00');
    // And the passenger who was awake heard it too.
    expect(body('e8').toLowerCase()).toContain('um neun');
  });

  /** He is ashore at a terminal that never took a gangway. */
  it('keeps the alibi built out of the timetable', () => {
    expect(chip('c-dougie-kirkwall')).toContain('Kirkwall');
    expect(body('d5').toLowerCase()).toContain('halb zehn');
    expect(revelation('x-dougie-kirkwall').toLowerCase()).toContain('gangway');
    expect(press('a-kirkwall').toLowerCase()).toContain('sechs meilen');
    // The confession names the document he read from.
    expect(script.confrontation?.confession).toContain('Fahrplan');
  });
});

describe('Die Nachtfähre (de) — the rank and the messroom', () => {
  /**
   * Two words are the whole case: what he told the bar he was, and what he
   * actually did for nine years. Neither may drift between the places it
   * appears, or the confession stops rhyming with the motive.
   */
  it('keeps one word for the rank he grew and one for the job he did', () => {
    for (const text of [body('m3'), script.motives[0]?.summary ?? '']) {
      expect(text.toLowerCase(), 'the invented rank drifted').toContain(
        'kapitän auf großer fahrt',
      );
    }
    expect(script.confrontation?.confession.toLowerCase()).toContain('kapitän auf großer fahrt');

    for (const text of [body('n8'), body('m4'), press('a-why')]) {
      expect(text.toLowerCase(), 'the messroom drifted').toMatch(/messesteward|die messe/);
    }
    expect(script.confrontation?.confession).toContain('Ich habe die Messe gemacht.');
  });

  /** Nobody laughed, and that is the fact the motive rests on. */
  it('keeps nobody having laughed', () => {
    expect(body('m5').toLowerCase()).toContain('niemand hat gelacht');
    expect(script.motives[0]?.summary.toLowerCase()).toContain('nicht grausam');
    expect(press('a-why').toLowerCase()).toContain('gelacht');
  });
});

describe('Die Nachtfähre (de) — the ship writes everything down', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n10: ['2106'], // Hannah writes a time the way a sailor does
      d3: ['halb neun'], // Dougie in the bar
      d5: ['halb zehn', 'viertel vor elf'], // and his hour ashore
      d8: ['zehn nach zehn'], // the phone he says he handed in
      m6: ['fünf nach neun'], // Hannah goes out for air
      m7: ['zwanzig nach'], // and he follows
      e5: ['fünf nach neun'], // Eck signed into the hospital cabin
      s5: ['21:04', '23:40'], // the lost property book
      s7: ['21:05', '22:25'], // and the nurse who signed him in and out
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-phone')).toContain('21:04');
    expect(revelation('x-phone')).toContain('23:40');
    expect(revelation('x-eck')).toContain('21:05');
    // The press line says the book time in words, as the English does.
    expect(press('a-phone').toLowerCase()).toContain('vier nach neun');
  });

  /** Sailors write four-digit times; passengers speak them. */
  it('keeps the sailor times as the English writes them', () => {
    expect(body('n4')).toContain('1730');
    expect(body('n10')).toContain('2106');
  });
});

describe('Die Nachtfähre (de) — the places', () => {
  /**
   * Every place name the English itself speaks has to appear in the German
   * prose with its article intact, on the raw string. German fuses `an dem`
   * into `am` and `in dem` into `im`, so a name carrying its own article would
   * vanish into the contraction. Every name here is bare.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const prose = spokenProse.toLowerCase();
    for (const p of script.places) {
      const source = english.places.find((e) => e.id === p.id)?.name ?? '';
      if (source === '' || !englishSpoken.includes(source.toLowerCase())) continue;
      expect(
        prose.includes(p.name.toLowerCase()),
        `no sentence says "${p.name}" — a contraction may have eaten it`,
      ).toBe(true);
    }
  });

  it('gives no place name a leading article', () => {
    for (const p of script.places) {
      expect(p.name, `${p.id} carries an article a contraction can eat`).not.toMatch(
        /^(der|die|das|dem|den)\b/i,
      );
    }
  });

  it('uses one word for each place on the chip and in the prose', () => {
    for (const id of ['c-hannah-afterdeck', 'c-dougie-afterdeck', 'c-eck-afterdeck']) {
      expect(chip(id)).toContain('auf dem Achterdeck');
    }
    for (const id of ['c-dougie-bar', 'c-hannah-bar']) {
      expect(chip(id)).toContain('Magnus Bar');
    }
    expect(chip('c-eck-hospital')).toContain('Bordhospital');
  });

  /** Eck is found by reading, and Sheila names him in the message that opens him. */
  it('still names Eck in the message that finds him', () => {
    expect(body('m10').toLowerCase()).toContain('eck tulloch');
  });
});

describe('Die Nachtfähre (de) — the voices', () => {
  /** Four write standard prose and close every sentence. */
  it('keeps the four written voices capitalised and closed', () => {
    for (const who of ['hannah', 'dougie', 'eck', 'senga'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(/[.?x]$/.test(m.body), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /** Sheila is lowercase throughout and never closes; so is the player. */
  it('keeps Sheila and the player lowercase', () => {
    for (const m of [...from('marisa'), ...from('you')]) {
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
      expect(m.body[0], `${m.id} starts like a written sentence`).toBe(m.body[0]?.toLowerCase());
    }
  });

  /**
   * Eck closes with a one-word sentence twice, the way the English closes with
   * `Aye.` It is the whole of his register and nobody else uses it.
   */
  it('keeps Eck-s closing tag and nobody else-s', () => {
    const eckTagged = from('eck').filter((m) => m.body.trimEnd().endsWith('Ja.'));
    const englishTagged = english.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.senderId === 'eck' && m.body.trimEnd().endsWith('Aye.'));
    expect(eckTagged).toHaveLength(englishTagged.length);

    for (const who of ['hannah', 'dougie', 'senga', 'marisa'] as const) {
      expect(corpus(who), `${who} picked up Eck-s tag`).not.toMatch(/\bJa\.$/m);
    }
  });

  /** Dougie reaches for his years at sea, which is the tic that gives him away. */
  it('keeps Dougie reaching for his years at sea', () => {
    expect(corpus('dougie').toLowerCase()).toContain('einunddreißig jahre');
    expect(corpus('senga')).toContain('Befähigungszeugnis');
    expect(corpus('marisa')).toContain('fundbuch');
  });
});

describe('Die Nachtfähre (de) — the player and the arc', () => {
  /**
   * `weil sie deine Mutter war` genders Hannah, who is dead and known. The
   * English used to say `because you are her son` and was changed for exactly
   * that reason, so the German must not put it back.
   */
  it('genders the victim and not the player', () => {
    expect(body('s1')).toContain('weil sie deine Mutter war');
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });

  /** Pack 14 is standalone. The finale is Pack 15. */
  it('introduces no arc alias where the English has none', () => {
    const germanProse = [...caseTextEntries(script).values()].join('\n');
    expect([...caseTextEntries(english).values()].join('\n')).not.toContain('Keeper');
    expect(germanProse).not.toContain('Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });
});
