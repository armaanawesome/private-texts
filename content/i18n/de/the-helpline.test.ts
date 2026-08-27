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
import { theHelplineDe } from './the-helpline';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Helpline, checked on the things a player reasons over.
 *
 * The charity-s greatest virtue is the alibi: nothing on that line is recorded,
 * nothing is traceable, and every call is written up by hand afterwards by the
 * person who took it. That is exactly what makes it safe to ring and exactly
 * what makes ninety minutes in a duty book impossible to check — so the pack
 * turns on two machine records against one handwritten one, and on a register
 * that must never sound flippant.
 */
const english = getCase('the-helpline')!;
const script = applyCaseText(english, theHelplineDe);

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
const spokenProse = [...caseTranslationEntries(theHelplineDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');
const withClock = (s: typeof script) =>
  s.threads
    .flatMap((t) => t.messages)
    .filter((m) => /\d{2}:\d{2}/.test(m.body))
    .map((m) => m.id)
    .sort();

describeCaseContract(script);

describe('Die Telefonseelsorge (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theHelplineDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theHelplineDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theHelplineDe)];

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

  /**
   * This is an overnight shift, so every window is minutes past the case-s own
   * zero and the chips only read correctly wrapped at 1440 — Connie in the
   * office is 1440–1620, which is 00:00–03:00 and not 24:00–27:00.
   */
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
    expect(chip('c-connie-office')).toContain('00:00–03:00');
  });

  /** The exclusive pair overlaps by nesting rather than matching. */
  it('nests the off-the-phones window inside the call he claims', () => {
    const oncall = claim('c-alun-oncall')!.window;
    const off = claim('c-alun-offphones')!.window;

    expect(oncall.start).toBeLessThan(off.end);
    expect(off.start).toBeLessThan(oncall.end);
    expect(oncall.start === off.start && oncall.end === off.end).toBe(false);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Die Telefonseelsorge (de) — the arc', () => {
  /**
   * Fourth arc connection, and the pack where he stops being a voice and
   * becomes a person: Alun recognised the technique while it was being used on
   * him. Three mentions, count derived from the English so a source edit shows
   * up here as a failure rather than a silent divergence.
   */
  it('leaves the arc alias in English, exactly as often as the source', () => {
    const count = (s: string) => s.split('Keeper').length - 1;
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    const germanProse = [...caseTextEntries(script).values()].join('\n');

    expect(count(englishProse), 'the English stopped using the alias').toBeGreaterThan(0);
    expect(count(germanProse)).toBe(count(englishProse));
    expect(script.confrontation?.confession).toContain('the Keeper');
    expect((script.coda?.messages ?? []).join('\n')).toContain('the Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });

  /** The clue that narrows him: he was trained on a line like this one. */
  it('keeps the recognition that makes him a person', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Er hat gespiegelt');
    expect(confession).toContain('meine eigene Ausbildung an mir');
    expect(confession).toContain('er ist einer von uns');
    expect((script.coda?.messages ?? []).join('\n')).toContain('Dort habe ich es gelernt');
  });
});

describe('Die Telefonseelsorge (de) — the register', () => {
  /**
   * The pack is written with care and German has to hold it. The sentence the
   * whole motive rests on says plainly what the job is, and the confession says
   * plainly what the discipline is. Neither may be softened into a slogan or
   * sharpened into a joke.
   */
  it('keeps the sentence the motive rests on', () => {
    expect(body('c8')).toContain('am Ende eines Gesprächs auflegt und es nie erfährt');
    expect(script.motives[0]?.summary).toContain('auflegt und es nie erfährt');
    expect(body('c9')).toBe('Er wollte es wissen. Also hat er aufgehört aufzulegen.');
  });

  /**
   * Alun-s deflections are listening moves rather than evasions — a trained
   * listener turning the question round — and they have to read as skill. The
   * ellipsis is his and nobody else-s.
   */
  it('keeps Alun listening rather than sneering', () => {
    const deflections = (script.confrontation?.deflections ?? []).join('\n');
    expect(deflections).toContain('Und was würdest du dir wünschen, wenn das so wäre?');
    expect(deflections).toContain('zweimal die Woche, umsonst');

    const alun = corpus('alun');
    expect(alun, 'Alun lost his pauses').toContain('...');
    for (const who of ['connie', 'prem', 'sunny', 'yusuf'] as const) {
      expect(corpus(who), `${who} picked up Alun-s ellipsis`).not.toContain('...');
    }
  });

  /** Callers stay off the page and unnamed, in German as in English. */
  it('keeps the callers unnamed', () => {
    expect(body('c3')).toContain('Eine Anruferin');
    expect(body('s2')).toContain('einer Anruferin');
    expect(script.solution.epilogue).toContain('Vier der elf');
  });
});

describe('Die Telefonseelsorge (de) — the clock', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      b4: ['zehn nach zwei', 'zwanzig vor vier'], // the ninety minutes he claims
      b7: ['halb drei'], // and the stairs he says he heard
      y5: ['halb drei', 'halb vier'], // the hour of unlit lamps
      y7: ['halb drei'], // when he went through to the office
      y8: ['ab mitternacht'], // Connie already in there
      p2: ['02:10', '03:40'], // the duty book
      p5: ['02:55', '03:05'], // the alarm panel
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-alun-stairs')).toContain('02:55');
    expect(revelation('x-alun-stairs')).toContain('03:05');
    // The press line says the same two minutes in words, as the English does.
    expect(press('p-stairs').toLowerCase()).toContain('fünf vor drei');
    expect(press('p-stairs').toLowerCase()).toContain('fünf nach');
  });

  /**
   * Only the two machine records print a clock: the duty book Alun wrote and
   * the alarm panel he did not. Everybody else is remembering a night shift.
   * The set is derived from the English rather than hardcoded.
   */
  it('keeps digit clock times to the records', () => {
    expect(withClock(script)).toEqual(withClock(english));
    expect(withClock(script)).toEqual(['p2', 'p5']);
  });
});

describe('Die Telefonseelsorge (de) — the places', () => {
  /**
   * Every place name has to appear in the prose with its article intact, tested
   * on the raw string rather than the folded one. German fuses `in dem` into
   * `im`, `an dem` into `am` and `bei dem` into `beim`, so a place carrying its
   * own article would vanish into the contraction and the chip would match no
   * sentence — the defect that has now shipped three times across the team.
   * Every name in this pack is a bare noun for exactly that reason.
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

  /** And no place name starts with an article, which is what makes that safe. */
  it('gives no place name a leading article', () => {
    for (const p of script.places) {
      expect(p.name, `${p.id} carries an article a contraction can eat`).not.toMatch(
        /^(der|die|das|dem|den)\b/i,
      );
    }
  });

  it('uses one word for each room on the chip and in the prose', () => {
    for (const id of ['c-alun-callroom', 'c-yusuf-callroom']) {
      expect(chip(id)).toContain('im Telefonraum');
    }
    for (const id of ['c-alun-office', 'c-connie-office']) {
      expect(chip(id)).toContain('im Büro');
    }
    expect(chip('c-alun-backstairs')).toContain('auf der Hintertreppe');
    expect(chip('c-connie-kitchen')).toContain('in der Küche');
  });

  /** Sunny is found by reading, and Yusuf names her in the message that opens her. */
  it('still names Sunny in the message that finds her', () => {
    expect(body('y9')).toContain('Sunny Halvorsen');
  });
});

describe('Die Telefonseelsorge (de) — the voices', () => {
  /** Five of the six write standard prose and close every sentence. */
  it('keeps the five adult voices capitalised and closed', () => {
    for (const who of ['connie', 'alun', 'yusuf', 'sunny', 'prem'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(/[.?]$/.test(m.body), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  it('keeps the player lowercase and short', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
  });

  /** Each of the five carries what they are holding, which is what separates them. */
  it('separates the five by what each is holding', () => {
    expect(corpus('connie')).toContain('Das ist der Teil, der mich wach hält');
    expect(corpus('prem')).toContain('Formular');
    expect(corpus('sunny')).toContain('Sag es richtig oder sag es gar nicht');
    expect(corpus('yusuf')).toContain('vierte Schicht');
    expect(corpus('alun')).toContain('Headsets');
  });

  /**
   * A gendered noun is only a defect when it is an address. Prem and Sunny are
   * named in the vocative and that is fine; nothing here is addressed to the
   * player with a gendered noun.
   */
  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
