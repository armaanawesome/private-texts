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
import { theListenerDe } from './the-listener';
import { theLighthouseDe } from './the-lighthouse';
import { clock, digitTimes, numbers, paragraphs } from '../testkit';

/**
 * The German Listener, checked on the things a player reasons over.
 *
 * The finale of fifteen packs, and the proof is the first clue in the game. For
 * fourteen cases he has asserted nothing, so the case works by making him
 * correct you: he is a critic, and a critic cannot let a wrong account of his
 * own work stand. Everything below protects one of the three things that
 * carries — the alias in both registers, Ruth quoted exactly as Pack 1 shipped
 * her, and a player who still has no gender on the last page.
 */
const english = getCase('the-listener')!;
const script = applyCaseText(english, theListenerDe);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const from = (senderId: string) => messages.filter((m) => m.senderId === senderId);
const claim = (id: string) => messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id);
const chip = (id: string): string => claim(id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const confession = script.confrontation?.confession ?? '';

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const germanProse = [...caseTextEntries(script).values()].join('\n');
const englishProse = [...caseTextEntries(english).values()].join('\n');
const spokenProse = [...caseTranslationEntries(theListenerDe)]
  .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
  .map(([, value]) => value)
  .join(' ');
const englishSpoken = [...caseTextEntries(english)]
  .filter(([path]) => !/^(character|place|object)\./.test(path))
  .map(([, value]) => value)
  .join(' ')
  .toLowerCase();

describeCaseContract(script);

describe('Der Zuhörer (de) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theListenerDe).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theListenerDe)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theListenerDe)];

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

describe('Der Zuhörer (de) — the alias, in both registers', () => {
  /**
   * The trap every locale hits. `the Keeper` is capitalised exactly twice —
   * Mairi at m9 and the confession — and `the keeper` is lowercase twice more,
   * at l6 and m3, because the player types lowercase in all fifteen packs.
   * `arcAlias.test.ts` counts the capitalised string, so capitalising the
   * player-s two makes four and fails, and lowercasing Mairi-s makes one and
   * fails. Both counts are derived from the English rather than hardcoded.
   */
  it('keeps the capitalised and lowercase counts the English has', () => {
    const count = (s: string, needle: string) => s.split(needle).length - 1;

    expect(count(germanProse, 'Keeper'), 'capitalised alias count drifted').toBe(
      count(englishProse, 'Keeper'),
    );
    expect(count(germanProse, 'keeper'), 'lowercase alias count drifted').toBe(
      count(englishProse, 'keeper'),
    );
  });

  it('puts each register where the English puts it', () => {
    expect(body('m9')).toContain('the Keeper');
    expect(confession).toContain('the Keeper');
    expect(body('l6')).toContain('the keeper');
    expect(body('m3')).toContain('the keeper');
  });

  /** And the German words that would end the arc never appear. */
  it('never reaches for the German words that would kill the arc', () => {
    expect(germanProse, 'a goalkeeper wandered in').not.toMatch(
      /wärter|hüter|torwart|torhüter/i,
    );
  });

  /** He is never named in the nameplate. That is the point of him. */
  it('keeps the Listener nameless', () => {
    expect(script.characters.find((c) => c.id === 'listener')?.name).toBe('Unbekannte Nummer');
    // DS Nkemdi says the name out loud in a message, which is where it belongs.
    expect(body('k7')).toContain('John Fettes');
  });
});

describe('Der Zuhörer (de) — Ruth, quoted from Pack 1', () => {
  /**
   * `r6` is word for word her last message in The Lighthouse, so it is copied
   * from the shipped German rather than retranslated. A player who did Pack 1
   * hears it before they read it, and any drift would break that — which is
   * exactly the kind of thing no generic check can see.
   */
  it('quotes her Pack 1 line character for character', () => {
    expect(body('r6')).toBe(theLighthouseDe.messages?.r12);
  });

  /**
   * Her voice here is her Pack 1 voice, not this locale-s general rule:
   * lowercase including her common nouns, capitalising only people, and no full
   * stop at the end. `r5` opens on a capital because it opens on a person-s
   * initial, so the opening case is derived from the English message by message.
   */
  it('matches her Pack 1 voice rather than a locale-wide rule', () => {
    for (const m of from('ruth')) {
      const source = english.threads
        .flatMap((t) => t.messages)
        .find((e) => e.id === m.id)?.body ?? '';
      const sourceStartsUpper = source[0] === source[0]?.toUpperCase();
      expect(
        m.body[0] === m.body[0]?.toUpperCase(),
        `${m.id} does not open the way the English opens it`,
      ).toBe(sourceStartsUpper);
      expect(m.body.endsWith('.'), `${m.id} lands a full stop Ruth never lands`).toBe(false);
    }
    // r5 is the one that opens on a capital, because it opens on an initial.
    expect(body('r5').startsWith('M ')).toBe(true);
  });

  /** And her notebook is the same object it was in Pack 1. */
  it('keeps the survey log the same word Pack 1 used', () => {
    for (const text of [body('r3'), body('r4'), body('k2'), revelation('x-papers')]) {
      expect(text.toLowerCase(), 'the log got a second name').toContain('logbuch');
    }
    expect(theLighthouseDe.messages?.g17).toContain('Logbuch');
  });
});

describe('Der Zuhörer (de) — the player still has no gender', () => {
  /**
   * Two lines would give the player a gender if translated straight, and
   * `playerNeutral.test.ts` cannot see either because both are third person.
   * Both are rebuilt so the agreement lands on a noun instead of on the reader.
   */
  it('agrees with a noun rather than with the reader', () => {
    // l3: `sie` agrees with `Version`, not with the player.
    expect(body('l3')).toContain('eine Version von dir');
    expect(body('l3')).toContain('ich habe sie kennengelernt');

    // The confession: `er` agrees with `Spürsinn`, not with the player.
    expect(confession).toContain('Spürsinn');
    expect(confession).toContain('er hat mich kein einziges Mal enttäuscht');

    // And the neuter, because `der Beste` and `die Beste` both pick a side.
    expect(confession).toContain('Du bist das Beste, was es gibt');
  });

  it('never genders the player anywhere', () => {
    for (const m of from('you')) {
      expect(m.body, `${m.id} genders the player`).not.toMatch(/\b(sohn|tochter|junge|mädchen)\b/i);
    }
    expect(confession, 'the confession genders the detective').not.toMatch(
      /\b(der beste Detektiv|die beste Detektivin|einen sehr großen Detektiv)\b/i,
    );
    expect(script.characters.find((c) => c.id === 'you')?.name).toBe('Du');
  });
});

describe('Der Zuhörer (de) — the correction that convicts him', () => {
  /**
   * He never asserts anything, so the case makes him correct you. The
   * distinction between the two words is the craft, and the craft is the only
   * thing he has — so `abgeschickt` and `bei den Prüfern` have to stay two
   * different sentences in German, in all four places they appear.
   */
  it('keeps the two words apart wherever the distinction is made', () => {
    expect(body('l11').toLowerCase()).toContain('abgeschickt');
    expect(body('l12').toLowerCase()).toContain('abgeschickt');
    expect(body('l12').toLowerCase()).toContain('bei den prüfern');
    expect(revelation('x-ardnoe').toLowerCase()).toContain('abgeschickt');
    expect(press('z-ardnoe').toLowerCase()).toContain('abgeschickt');
    // And what the wrong sentence actually did to her.
    expect(body('l12').toLowerCase()).toContain('nimmt ihr den morgen');
  });

  /**
   * The two `ruth-papers` claims are the first clue in the game, re-recorded
   * here because claims cannot cross case scripts. They carry the identical
   * window, which is what lets the engine see the collision.
   */
  it('holds the first clue on identical windows', () => {
    const kept = claim('c-papers-kept')!.window;
    const sent = claim('c-papers-sent')!.window;
    expect(kept.start).toBe(sent.start);
    expect(kept.end).toBe(sent.end);
    expect(chip('c-papers-kept')).toContain('Logbuch');
    expect(chip('c-papers-sent')).toContain('abgeschickt');
  });

  /** Ninety-four seconds is spoken everywhere, never printed as a figure. */
  it('keeps the duration in words, as the English does', () => {
    for (const text of [body('l12'), body('k5'), body('k6'), revelation('x-box'), press('z-box')]) {
      expect(text.toLowerCase(), 'the duration became a figure').toContain('vierundneunzig');
    }
    expect(numbers(body('k6'))).toEqual(numbers(
      english.threads.flatMap((t) => t.messages).find((m) => m.id === 'k6')?.body ?? '',
    ));
  });

  it('states every load-bearing time exactly where the English does', () => {
    expect(body('k5')).toContain('21:31');
    expect(revelation('x-box')).toContain('21:31');
    expect(press('z-box')).toContain('21:31');
    expect(body('m9').toLowerCase()).toContain('halb zehn');
    expect(revelation('x-box').toLowerCase()).toContain('halb zehn');
  });
});

describe('Der Zuhörer (de) — the places and the voices', () => {
  /**
   * This pack sends the player back to read their own first case, so the places
   * that recur have to be the same words `de/the-lighthouse.ts` uses.
   */
  it('agrees with Pack 1 on the places they share', () => {
    expect(script.places.find((p) => p.id === 'tower')?.name).toBe(theLighthouseDe.places?.lighthouse);
    expect(script.places.find((p) => p.id === 'cafe')?.name).toBe(theLighthouseDe.places?.cafe);
  });

  /**
   * The rule is that a place the English says out loud must be sayable in
   * German too, so a player can match the chip to the sentence. What it is
   * really catching is `im`/`am`/`zum` swallowing the name.
   *
   * A possessive determiner is the one part that cannot survive intact: `his
   * flat in Kirkcaldy` keeps `his` in every English sentence, but German
   * declines, so `seine Wohnung` is `in seiner Wohnung` the moment a
   * preposition reaches it. The nominative form is not missing from the prose,
   * it is ungrammatical in it — so the determiner is allowed its endings and
   * the rest of the name still has to appear whole.
   */
  it('speaks every place name in full, uncontracted, somewhere in the prose', () => {
    const declinable = /^(mein|dein|sein|ihr|unser|euer)[a-zäöüß]*/i;
    const spoken = (name: string): RegExp =>
      new RegExp(
        name
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(declinable, (_m, stem: string) => `${stem}[a-zäöüß]*`),
        'i',
      );

    for (const p of script.places) {
      const source = english.places.find((e) => e.id === p.id)?.name ?? '';
      if (source === '' || !englishSpoken.includes(source.toLowerCase())) continue;
      expect(
        spoken(p.name).test(spokenProse),
        `no sentence says "${p.name}" — a contraction may have eaten it`,
      ).toBe(true);
    }
  });

  /** He writes standard prose and closes every sentence; the player does not. */
  it('keeps him written and the player lowercase', () => {
    for (const m of from('listener')) {
      expect(m.body[0], `${m.id} does not start as a written sentence`).toBe(
        m.body[0]?.toUpperCase(),
      );
      expect(/[.?]$/.test(m.body), `${m.id} stopped closing its sentence`).toBe(true);
    }
    for (const m of from('you')) {
      expect(m.body, `${m.id} has a capital in it`).toBe(m.body.toLowerCase());
    }
  });

  /** Mairi is found by reading, and Nkemdi names her in the message that opens her. */
  it('still names Mairi in the message that finds her', () => {
    expect(body('k11')).toContain('Mairi Bell');
  });

  /**
   * The last voice in fifteen packs is the first killer, and the coda is hers.
   * A coda from a caught man would take the finale-s promise back.
   */
  it('gives the last word to Mairi', () => {
    expect(script.coda?.from).toBe('Mairi Bell');
    expect((script.coda?.messages ?? []).length).toBe(english.coda?.messages.length);
    expect((script.coda?.messages ?? []).join('\n')).toContain('Danke, dass du gefragt hast.');
  });
});
