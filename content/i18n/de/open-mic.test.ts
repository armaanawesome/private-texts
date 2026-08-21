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
import { openMicDe } from './open-mic';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Open Mic, checked on the things a player reasons over.
 *
 * The alibi is a video, and it is real — same shirt, same order, same laugh in
 * the same place. It is simply from the wrong week. That means the repetitions
 * are load-bearing: sixteen years of never changing anything is what makes the
 * clip usable, so the phrases that describe the set have to repeat *exactly*
 * rather than be varied for elegance.
 */
const english = getCase('open-mic')!;
const script = applyCaseText(english, openMicDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
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
const spokenProse = [...caseTranslationEntries(openMicDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join('\n');

describeCaseContract(script);

describe('Open Mic (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(openMicDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, openMicDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(openMicDe)];

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
   * One camera, one card, one night. The two card claims are the exclusive
   * pair and their windows overlap rather than match — Roz had it 21:00–21:20,
   * inside the 21:00–22:30 Dave claims — which is what lets the engine see that
   * two people cannot both have held a unique object.
   */
  it('overlaps the two camera-card claims rather than matching them', () => {
    const dave = claim('c-card-gil')!.window;
    const roz = claim('c-card-roz')!.window;

    expect(dave.start).toBeLessThan(roz.end);
    expect(roz.start).toBeLessThan(dave.end);
    expect(dave.start === roz.start && dave.end === roz.end).toBe(false);
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('Open Mic (de) — the vocative', () => {
  /**
   * Kevin uses a paternal vocative once, and the thread decides whether it is
   * allowed. At h8 there are four people in `t-club` and he is answering Dave,
   * who has just put him in the alley in front of everybody — so `Junge` is a
   * sixty-one year old compere putting a younger man back in his place, and it
   * is right.
   *
   * `t-ferdy` has two participants. The only person he could address there is
   * the player, so any paternal vocative would state a gender the game does not
   * have. The English drops it there and so does this. The rule is the thread,
   * not the phrase.
   */
  it('lets Kevin be paternal to Dave and never to the player', () => {
    expect(body('h8')).toBe('Junge, ich hatte das Mikrofon in der Hand.');

    const ferdyThread = script.threads.find((t) => t.id === 't-ferdy')!;
    expect(ferdyThread.participantIds).toHaveLength(2);
    for (const m of ferdyThread.messages) {
      expect(m.body, `${m.id} genders the player with a vocative`).not.toMatch(
        /\b(junge|mein sohn|söhnchen)\b/i,
      );
    }
  });

  it('never genders the player anywhere else either', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});

describe('Open Mic (de) — the identical five minutes', () => {
  /**
   * The alibi only works because nothing about the set ever changes, so the
   * three descriptors repeat word for word between the blurb and the
   * confession. Varying them would turn sixteen years of sameness into ordinary
   * description, and the clip would stop being obviously reusable.
   */
  it('repeats the set descriptors word for word', () => {
    for (const text of [script.blurb, script.confrontation?.confession ?? '']) {
      expect(text).toMatch(/[Dd]asselbe Hemd/);
      expect(text).toMatch(/[Dd]ieselbe Reihenfolge|dieselben fünf Minuten/);
      expect(text).toMatch(/[Dd]erselbe Lacher an derselben Stelle/);
    }
  });

  it('keeps the swan, which is the thing that dates the clip', () => {
    expect(body('f8')).toContain('Schwan');
    expect(body('f8')).toContain('vom Dienstag davor');
    expect(revelation('x-marnie-bar')).toContain('Schwan');
    expect(press('o-bar')).toContain('Schwan');
  });
});

describe('Open Mic (de) — the clock', () => {
  /**
   * Kit is the only person who says a clock in digits, and that is the point of
   * Kit: the running order is in biro on a float sheet and everybody else is
   * remembering. The count is derived from the English rather than hardcoded.
   */
  it('lets only Kit print a clock time, exactly as the English does', () => {
    const withClock = (s: typeof script) =>
      s.threads
        .flatMap((t) => t.messages)
        .filter((m) => /\d{2}:\d{2}/.test(m.body))
        .map((m) => m.id)
        .sort();

    expect(withClock(script)).toEqual(withClock(english));
    for (const id of withClock(script)) {
      expect(messages.find((m) => m.id === id)?.senderId, `${id} is not Kit`).toBe('kit');
    }
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      k2: ['21:30', '21:55', 'fünf vor zehn'], // the running order, in biro
      k4: ['halb zehn'], // Debbie on stage, not at the bar
      k5: ['21:28'], // Dave off before her
      f6: ['fünf nach halb zehn'], // out the fire door, 21:35
      h4: ['halb zehn'], // and his clip claims the same minute
      r4: ['um neun'], // Roz pulls the card
      r5: ['zwanzig nach'], // and puts it back
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(
          fragment.toLowerCase(),
        );
      }
    }

    expect(revelation('x-gil-alley').toLowerCase()).toContain('fünf nach halb zehn');
    expect(press('o-alley').toLowerCase()).toContain('fünf nach halb zehn');
    expect(script.solution.epilogue).toContain('21:35');
  });
});

describe('Open Mic (de) — the places and the card', () => {
  /**
   * Every place name has to appear in the prose with its article intact, tested
   * on the raw string. German fuses `in dem` into `im` and `an dem` into `am`,
   * so a place named `die Bühne` would be reachable only as `auf der Bühne` and
   * a name with a leading article would vanish into the contraction entirely.
   * Every name in this pack is a bare noun for that reason.
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

  /**
   * A unique object with two names is two objects, which is what x-card denies.
   * Where the object is named it is `Kamerakarte`; where the English shortens
   * to `one card` inside its own triple, German shortens to `eine Karte` the
   * same way. That is a short form of one name, not a second name — the same
   * distinction the dressing room key needed in Pack 2.
   */
  it('gives the camera card one name everywhere', () => {
    expect(script.objects.find((o) => o.id === 'card')?.name).toBe('Kamerakarte');
    for (const text of [chip('c-card-gil'), chip('c-card-roz'), body('r3')]) {
      expect(text, 'the card got a second name').toContain('Kamerakarte');
    }
    expect(revelation('x-card')).toContain('Eine Kamera, eine Karte, ein Abend');
    expect(press('o-card')).toContain('Eine Kamera, eine Karte');
  });

  it('uses one word for each room on the chip and in the prose', () => {
    for (const id of ['c-marnie-stage', 'c-gil-stage', 'c-ferdy-stage']) {
      expect(chip(id)).toContain('Bühne');
    }
    for (const id of ['c-ferdy-alley', 'c-gil-alley']) {
      expect(chip(id)).toContain('in der Gasse');
    }
    expect(chip('c-marnie-bar')).toContain('am Tresen');
    expect(chip('c-roz-box')).toContain('in der Tonkabine');
  });

  /** Kevin is found by reading, and Kit names him in the message that opens him. */
  it('still names Kevin in the message that finds him', () => {
    expect(body('k8')).toContain('Kevin');
  });
});

describe('Open Mic (de) — the voices', () => {
  /** Roz, Kevin and Kit write standard prose and close every sentence. */
  it('keeps the three written voices capitalised and closed', () => {
    for (const who of ['roz', 'ferdy', 'kit'] as const) {
      for (const m of from(who)) {
        expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} stopped closing its sentence`).toBe(true);
      }
    }
  });

  /** Dave writes in capitals and never closes a message. A man staying ahead of a question. */
  it('leaves every one of Dave-s messages unclosed', () => {
    for (const m of from('gil')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(m.body.endsWith('.'), `${m.id} closed a sentence Dave leaves open`).toBe(false);
    }
  });

  /** Debbie is lowercase and unclosed; the player is lowercase and shouts once. */
  it('keeps Debbie and the player lowercase', () => {
    for (const m of from('marnie')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
      expect(m.body.endsWith('.'), `${m.id} lands a full stop`).toBe(false);
    }
    expect(body('n2')).toBe('DEBBIE');
    for (const m of from('you').filter((m) => m.id !== 'n2')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
  });

  /** Roz owns the room, Kevin has the decades, Kit has the paperwork. */
  it('separates the three by what each is expert in', () => {
    expect(from('roz').map((m) => m.body).join('\n')).toContain('kein Geld dafür ausgebe');
    expect(from('ferdy').map((m) => m.body).join('\n')).toContain('Einunddreißig Jahre');
    const kit = from('kit').map((m) => m.body).join('\n');
    expect(kit).toContain('Kugelschreiber');
    expect(kit).toContain('Auftrittsreihenfolge');
  });
});

describe('Open Mic (de) — what the source says', () => {
  /**
   * n6 says `gils set` twice, and the character is called Dave. `gil` is his id
   * and the old first name, so this is the rename-leak class — hidden twice
   * over from `renameLeak.test.ts`, which matches a capitalised id on a word
   * boundary: this one is lowercase and carries a possessive `s`.
   *
   * Reproduced rather than corrected, because a locale that repairs the English
   * on its own diverges from every other locale while the English stays as it
   * is. The count is derived from the English so a later fix there shows up
   * here as a failure rather than a silent divergence.
   */
  /**
   * This began as a self-cleaning exemption and it did its job.
   *
   * n6 said `gils set` twice, for a character called Dave, and this file
   * reproduced it rather than quietly correcting it — then asserted the English
   * still had the fault, so the exemption could not outlive it. The English has
   * since been fixed and that assertion went red, which is exactly what it was
   * for. What replaces it is the ordinary check: neither side says the old name.
   *
   * `renameLeak.test.ts` owns the class now. It had missed this one because
   * `gil` needs a boundary after the name and `gils` has none — the voice
   * drops apostrophes, so the possessive is bare.
   */
  it('says the current name on both sides', () => {
    const englishN6 =
      english.threads.flatMap((t) => t.messages).find((m) => m.id === 'n6')?.body ?? '';

    for (const [label, text] of [
      ['English', englishN6],
      ['German', body('n6')],
    ] as const) {
      expect(/gils?/i.test(text), `${label} n6 still carries the old name`).toBe(false);
      expect(text.toLowerCase(), `${label} n6 lost the name`).toContain('daves');
    }
  });

  /** Pack 10 is standalone. Nothing here may start the arc early. */
  it('introduces no arc alias where the English has none', () => {
    const germanProse = [...caseTextEntries(script).values()].join('\n');
    expect([...caseTextEntries(english).values()].join('\n')).not.toContain('Keeper');
    expect(germanProse).not.toContain('Keeper');
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(/wärter|hüter|torwart|torhüter/i);
  });
});
