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
import { theReunionDe } from './the-reunion';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Reunion, checked on the things a player reasons over.
 *
 * A reunion is a room where every single person can tell you who they were
 * standing with, and the engine refuses all of it — co-presence never excludes
 * anything. The four `with_person` claims are deliberate dead ends. What does
 * fire is time, and the lie is that he did not falsify a clock, he became one.
 */
const english = getCase('the-reunion')!;
const script = applyCaseText(english, theReunionDe);

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
const spokenProse = [...caseTranslationEntries(theReunionDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Das Klassentreffen (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theReunionDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theReunionDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theReunionDe)];

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

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Das Klassentreffen (de) — co-presence proves nothing', () => {
  /**
   * Four claims say who somebody was standing with, and every one of them is a
   * dead end: the engine cannot fire on `with_person`, because being with one
   * person does not exclude being with another. That refusal is the emotional
   * content of the setting enforced by a rule instead of narrated, so the chips
   * have to read plainly and must not imply exclusivity.
   */
  it('keeps every with_person chip plain, and there are as many as the English has', () => {
    const withPerson = messages
      .flatMap((m) => m.claims ?? [])
      .filter((c) => c.predicate.kind === 'with_person');
    const englishWithPerson = english.threads
      .flatMap((t) => t.messages)
      .flatMap((m) => m.claims ?? [])
      .filter((c) => c.predicate.kind === 'with_person');

    expect(withPerson).toHaveLength(englishWithPerson.length);
    for (const c of withPerson) {
      expect(c.label, `${c.id} claims more than co-presence`).not.toMatch(
        /\ballein\b|\bnur\b|\bausschließlich\b/i,
      );
    }
  });

  /**
   * The pair that does fire overlaps only partially — 20:55–21:15 against
   * 21:00–21:20 — which is a third shape after the nested and identical pairs
   * in earlier packs. Overlap is the property to assert; neither nesting nor
   * sameness holds here.
   */
  it('overlaps the speech and the phone call partially', () => {
    const outside = claim('c-rafe-outside')!.window;
    const speech = claim('c-rafe-speech')!.window;

    expect(outside.start).toBeLessThan(speech.end);
    expect(speech.start).toBeLessThan(outside.end);
    // Genuinely partial: neither contains the other.
    expect(outside.start < speech.start && outside.end > speech.end).toBe(false);
    expect(speech.start < outside.start && speech.end > outside.end).toBe(false);
  });
});

describe('Das Klassentreffen (de) — he became the clock', () => {
  /**
   * The programme says nine and he spoke at quarter past eight, so every
   * witness dating the evening off the speech is inside a sequence he wrote.
   * Both halves have to stay exactly as far apart in German as in English, and
   * the invoice is the one number that settles it.
   */
  it('keeps the programme and the speech forty-five minutes apart', () => {
    expect(body('k6').toLowerCase()).toContain('neun');
    expect(body('k6').toLowerCase()).toContain('viertel nach acht');
    expect(body('r4').toLowerCase()).toContain('neun uhr');
    expect(revelation('x-rafe-speech').toLowerCase()).toContain('viertel nach acht');
    expect(press('a-speech').toLowerCase()).toContain('fünfundvierzig minuten');
  });

  /** The invoice is the only number Michelle has, and it is the hinge. */
  it('keeps the catering invoice time', () => {
    expect(body('k7')).toContain('20:55');
    expect(revelation('x-rafe-speech')).toContain('20:55');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      n10: ['zehn nach acht'], // the letter is already posted
      k4: ['viertel vor neun'], // Michelle in the hall
      r2: ['viertel vor neun', 'halb zehn'], // and Mark claiming the same span
      c3: ['nach neun'], // Vale finds him in the corridor
      c6: ['21:08', '21:19'], // the barrier log
      c8: ['halb neun'], // Nia thanking the caretaker
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-rafe-gate')).toContain('21:08');
    expect(revelation('x-rafe-gate')).toContain('21:19');
    expect(press('a-gate')).toContain('21:08');
  });

  /**
   * `Klasse 4` keeps its digit. The English says `Year 4` and spelling it as a
   * word is exactly the edit the numbers rule catches — it cost Spanish a
   * failure on `cuarto`.
   */
  it('keeps the year group as a digit', () => {
    expect(script.briefing?.opening).toContain('Klasse 4');
  });

  /** Only the invoice and the barrier print a clock. Everyone else remembers. */
  it('keeps digit clock times to the invoice and the barrier', () => {
    const withClock = (s: typeof script) =>
      s.threads
        .flatMap((t) => t.messages)
        .filter((m) => /\d{2}:\d{2}/.test(m.body))
        .map((m) => m.id)
        .sort();
    expect(withClock(script)).toEqual(withClock(english));
  });
});

describe('Das Klassentreffen (de) — the places', () => {
  /**
   * Every place name has to appear in the prose with its article intact, on the
   * raw string. German fuses `in der` into nothing but fuses `in dem` into `im`
   * and `an dem` into `am`, so a name carrying its own article would vanish
   * into the contraction — the defect that has now shipped three times across
   * the team. Every name here is bare.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const prose = spokenProse.toLowerCase();
    const englishSpoken = [...caseTextEntries(english)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join(' ')
      .toLowerCase();

    for (const p of script.places) {
      // Only names the English itself speaks. `Ardenshaw High` is the school
      // and no sentence in either language says it, so requiring it here would
      // invent a rule the source does not meet — and the English would fail it
      // too, which is the tell that the rule is wrong rather than the pack.
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

  it('uses one word for the hall on the chip and in the prose', () => {
    for (const id of ['c-nia-hall', 'c-marika-hall', 'c-rafe-hall', 'c-tobi-hall']) {
      expect(chip(id)).toContain('in der Aula');
    }
    expect(chip('c-rafe-music')).toContain('Musiktrakt');
    expect(chip('c-rafe-carpark')).toContain('Lehrerparkplatz');
    expect(chip('c-nia-riverpath')).toContain('Flussweg');
  });

  /** Tobi is found by reading, and Mark names him in the message that opens him. */
  it('still names Tobi in the message that finds him', () => {
    expect(body('r7')).toContain('Tobi Marchetti');
  });
});

describe('Das Klassentreffen (de) — the voices', () => {
  /** Four of the six write standard prose and close every sentence. */
  it('keeps Nia, Mark, Tobi and Vale capitalised and closed', () => {
    for (const who of ['nia', 'rafe', 'tobi', 'corin'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(/[.?]$/.test(m.body), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /** Michelle is lowercase throughout and never closes. */
  it('keeps Michelle lowercase and unclosed', () => {
    for (const m of from('marika')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
  });

  /** The player is lowercase too, and separated from Michelle by length. */
  it('keeps the player shorter than Michelle', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
    const words = (s: string) => s.split(/\s+/).length;
    const playerLongest = Math.max(...from('you').map((m) => words(m.body)));
    const michelleLongest = Math.max(...from('marika').map((m) => words(m.body)));
    expect(playerLongest).toBeLessThan(michelleLongest);
  });

  /**
   * Vale is the only person who uses titles, and that is not decoration — he
   * goes by his round rather than by the party, which is exactly why he can
   * date the evening when ninety guests cannot.
   */
  it('keeps Vale on titles and on his round', () => {
    const vale = corpus('corin');
    expect(vale).toContain('Herr Ellory');
    expect(vale).toContain('Frau Selkirk');
    expect(vale).toContain('Frau Boateng');
    expect(vale).toContain('Rundgang');

    // Nobody else uses a title for anybody.
    for (const who of ['nia', 'rafe', 'tobi', 'marika'] as const) {
      expect(corpus(who), `${who} started using titles`).not.toMatch(/\b(Herr|Frau) [A-Z]/);
    }
  });

  /** And the other three are separated by what each does with a fact. */
  it('separates Nia, Mark and Tobi by register', () => {
    expect(corpus('nia')).toContain('neunmal angefangen');
    expect(corpus('rafe')).toContain('Schulleiter');
    expect(corpus('tobi')).toContain('Es ist nichts Seltenes');
  });
});

describe('Das Klassentreffen (de) — the ending', () => {
  /** The last line of the confession has to land flat, with no softening. */
  it('keeps the letter never having carried his name', () => {
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('Sie wollte mich nicht nennen.');
    expect(confession.trimEnd().endsWith('nie darin stehen.')).toBe(true);
  });

  /** Pack 13 is standalone. Nothing here may start the arc early. */
  it('introduces no arc alias where the English has none', () => {
    const germanProse = [...caseTextEntries(script).values()].join('\n');
    expect([...caseTextEntries(english).values()].join('\n')).not.toContain('Keeper');
    expect(germanProse).not.toContain('Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });

  it('never genders the player', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});
