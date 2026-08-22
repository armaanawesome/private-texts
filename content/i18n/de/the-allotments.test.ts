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
import { theAllotmentsDe } from './the-allotments';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Allotments, checked on the things a player reasons over.
 *
 * The theme is possession — whose fork, whose key, whose shed — but the three
 * proofs run on action and place, and the fork convicts nobody. What it proves
 * is that the fork was inside Wilf-s own door, so picking it up meant standing
 * where he stood. That is why the object has one name and the short form has to
 * stay a short form.
 */
const english = getCase('the-allotments')!;
const script = applyCaseText(english, theAllotmentsDe);

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
const spokenProse = [...caseTranslationEntries(theAllotmentsDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Die Kleingärten (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theAllotmentsDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theAllotmentsDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theAllotmentsDe)];

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

  /**
   * This pack has both shapes of exclusive pair, which is why the assertion is
   * overlap rather than sameness. `deb-evening` overlaps by nesting — the tank
   * window sits inside the burning window — while the two fork claims cover the
   * identical window, because they are two people claiming one object across
   * the same evening. Asserting identity would fail the first; asserting
   * overlap covers both.
   */
  it('overlaps both exclusive pairs without requiring them to match', () => {
    const overlaps = (a: string, b: string) => {
      const x = claim(a)!.window;
      const y = claim(b)!.window;
      return x.start < y.end && y.start < x.end;
    };

    expect(overlaps('c-deb-burning', 'c-deb-tank'), 'deb-evening stopped overlapping').toBe(true);
    expect(overlaps('c-fork-nev', 'c-fork-wilf'), 'the fork pair stopped overlapping').toBe(true);

    // And they are genuinely different shapes, which is the point of the rule.
    const burning = claim('c-deb-burning')!.window;
    const tank = claim('c-deb-tank')!.window;
    expect(burning.start === tank.start && burning.end === tank.end).toBe(false);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Die Kleingärten (de) — the fork', () => {
  /**
   * One object, one name. `die Gabel` is what everybody calls it and is a short
   * form of the same name, not a second one — the distinction the dressing room
   * key needed in Pack 2. Both chips carry `die umwickelte Gabel`, because the
   * whole of `x-fork` is two people claiming the identical thing.
   */
  it('gives the fork one name on both chips', () => {
    expect(script.objects.find((o) => o.id === 'fork')?.name).toBe(
      'Grabegabel mit dem umwickelten Griff',
    );
    for (const id of ['c-fork-nev', 'c-fork-wilf']) {
      expect(chip(id), `${id} renamed the fork`).toContain('umwickelte Gabel');
    }
  });

  /** And what it actually proves is proximity, not ownership. */
  it('keeps the fork proving where somebody stood rather than whose it is', () => {
    expect(revelation('x-fork')).toContain('kein Beweis über Nev Ashworth');
    expect(body('j6')).toContain('wer nah genug dran war');
    expect(body('j5')).toContain('innen an seiner Tür');
  });
});

describe('Die Kleingärten (de) — the clock and the plots', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      s3: ['von sechs bis halb acht'], // Deb on 14
      m7: ['halb sieben'], // and going up the shed row instead
      j3: ['19:02', '19:11'], // the camera, the only machine time
      j7: ['ab fünf'], // Wilf on the padlocks
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-deb-shedrow').toLowerCase()).toContain('halb sieben');
    expect(revelation('x-deb-lane')).toContain('19:02');
    expect(revelation('x-deb-lane')).toContain('19:11');
    // The press line says the same two minutes in words, as the English does.
    expect(press('a-lane').toLowerCase()).toContain('zwei nach sieben');
    expect(press('a-lane').toLowerCase()).toContain('elf nach');
  });

  /**
   * Only the scrapyard camera writes a clock. Everybody else is remembering an
   * October evening, and the plot numbers are the other digits in the pack.
   */
  it('keeps digit clock times to the camera', () => {
    const withClock = messages.filter((m) => /\d{2}:\d{2}/.test(m.body)).map((m) => m.id);
    expect(withClock, 'a wall clock leaked into somebody remembering').toEqual(['j3']);

    expect(body('s3')).toContain('14');
    expect(body('v5')).toContain('3');
    expect(body('m1')).toContain('22');
    expect(body('m4')).toContain('40');
  });
});

describe('Die Kleingärten (de) — the site', () => {
  /**
   * Every place name has to appear in the prose with its article intact, on the
   * raw string. German fuses `in der` and `an dem`, so a name carrying its own
   * article would vanish into the contraction and the chip would match no
   * sentence. Every name here is bare.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const prose = spokenProse.toLowerCase();
    for (const p of script.places) {
      expect(
        prose.includes(p.name.toLowerCase()),
        `no sentence says "${p.name}" — a contraction may have eaten it`,
      ).toBe(true);
    }
  });

  it('uses one word for the shed row and the tank on the chip and in the prose', () => {
    for (const id of ['c-deb-shedrow', 'c-wilf-shed']) {
      expect(chip(id)).toContain('in der Schuppenreihe');
    }
    for (const id of ['c-wilf-tank', 'c-sami-tank']) {
      expect(chip(id)).toContain('am Wassertank');
    }
    expect(chip('c-deb-lane')).toContain('Carr Bank Lane');
  });

  /** Sami is found by reading, and Nev names him in the message that opens him. */
  it('still names Sami in the message that finds him', () => {
    expect(body('v7').toLowerCase()).toContain('sami');
  });
});

describe('Die Kleingärten (de) — the voices', () => {
  /** Four of the six write standard prose and close every sentence. */
  it('keeps Wilf, Joyce, Deb and Sami capitalised and closed', () => {
    for (const who of ['wilf', 'joyce', 'deb', 'sami'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /**
   * Nev lowercases the sentence start and, crucially, lowercases people —
   * `deb`, `joyce`, `sami`. That is what separates him from the player, who is
   * lowercase throughout and short. Both are lowercase; only one of them still
   * capitalises its nouns.
   */
  it('keeps Nev and the player apart', () => {
    for (const m of from('nev')) {
      expect(m.body[0], `${m.id} starts like a written sentence`).toBe(m.body[0]?.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('v4')).toContain('joyce hat gesehen');
    expect(body('v7')).toContain('red mit sami');
    // Nev still capitalises his nouns; the player does not.
    expect(corpus('nev')).not.toBe(corpus('nev').toLowerCase());
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
  });

  /** Each of the four written voices carries what they are responsible for. */
  it('separates the four by what each is responsible for', () => {
    expect(corpus('wilf')).toContain('Pachtvertrag');
    expect(corpus('joyce')).toContain('Kassenwartin');
    expect(corpus('sami')).toContain('vier Gänge');
    expect(corpus('deb')).toContain('Nevs Gabel');
  });
});

describe('Die Kleingärten (de) — the player and the arc', () => {
  /**
   * `Er war dein Vater` genders Wilf, who is dead and male, and marks the
   * player with nothing. This line used to be the third place the game told the
   * player what they were, and it disagreed with the other two.
   */
  it('genders the victim and not the player', () => {
    expect(script.briefing?.opening).toContain('Er war dein Vater');
    expect(script.confrontation?.opening).toContain('Er war dein Vater');
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });

  /** Pack 11 is standalone. Nothing here may start the arc early. */
  it('introduces no arc alias where the English has none', () => {
    const germanProse = [...caseTextEntries(script).values()].join('\n');
    expect([...caseTextEntries(english).values()].join('\n')).not.toContain('Keeper');
    expect(germanProse).not.toContain('Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });
});
