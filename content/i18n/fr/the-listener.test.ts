import { describe, it, expect } from 'vitest';
import { loadCase, type CaseScript } from '@/engine';
import { getCase } from '../../cases/index';
import { describeCaseContract } from '../../cases/caseContract';
import {
  applyCaseText,
  caseTextEntries,
  caseTextCoverage,
  caseTranslationEntries,
} from '../caseText';
import { theListenerFr } from './the-listener';
import { theLighthouseFr } from './the-lighthouse';
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';

/**
 * The French Listener — the finale — checked on the things a player reasons over.
 *
 * Three traps every locale hits are pinned here: the alias count splits by
 * register, r6 is a verbatim quotation out of Pack 1, and the English refers to
 * the player twice in the third person where `playerNeutral` cannot see it.
 */
const english = getCase('the-listener')!;
const script: CaseScript = applyCaseText(english, theListenerFr);

const messages = script.threads.flatMap((t) => t.messages);
const body = (id: string): string => messages.find((m) => m.id === id)?.body ?? '';
const englishBody = (id: string): string =>
  english.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';

const endForms = (minutes: number): string[] =>
  minutes % 1440 === 0 ? [clock(minutes), '24:00'] : [clock(minutes)];

const placeholders = (text: string): string[] =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1] ?? '').sort();

const proseOf = (s: CaseScript): string =>
  fold(
    [...caseTextEntries(s)]
      .filter(([path]) => !/^(character|place|object)\./.test(path))
      .map(([, value]) => value)
      .join('\n'),
  );

const spokenProse = (s: CaseScript): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

const countOf = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/* ------------------------------------------------------------- the alias */

describe('L’écouteur (fr) — the alias, in two registers', () => {
  /**
   * `Keeper` is capitalised twice in the English — Mairi in m9, and the
   * confession — and lowercase twice more, in l6 and m3, because the player
   * types lowercase in all fifteen packs. `arcAlias` counts the capitalised
   * string, so normalising either way breaks it: capitalising the player's two
   * makes four, lowercasing Mairi's makes one.
   *
   * Both counts are derived from the English rather than written down here, so
   * the day the arc is reworked this moves with it.
   */
  it('keeps both registers, in the counts the English uses', () => {
    const englishProse = [...caseTextEntries(english).values()].join('\n');
    const frenchProse = [...caseTextEntries(script).values()].join('\n');

    const capitalised = (s: string) => countOf(s, 'the Keeper') + countOf(s, 'le Keeper');
    const lower = (s: string) => countOf(s, 'the keeper') + countOf(s, 'le keeper');

    expect(capitalised(englishProse), 'the English fixture changed').toBe(2);
    expect(lower(englishProse), 'the English fixture changed').toBe(2);
    expect(capitalised(frenchProse)).toBe(capitalised(englishProse));
    expect(lower(frenchProse)).toBe(lower(englishProse));

    // And in the right mouths: the player lowercases, Mairi and he do not.
    expect(body('l6')).toContain('le keeper');
    expect(body('m3')).toContain('le keeper');
    expect(body('m9')).toContain('le Keeper');
    expect(script.confrontation?.confession).toContain('le Keeper');
    expect(frenchProse).not.toMatch(/gardien/i);
  });

  /** He is never named in the nameplate. Nkemdi says it out loud instead. */
  it('keeps him nameless in the nameplate', () => {
    expect(script.characters.find((c) => c.id === 'listener')?.name).toBe('Numéro inconnu');
    expect(script.threads.find((t) => t.id === 't-listener')?.title).toBe('Numéro inconnu');
    expect(body('k7')).toContain('John Fettes');
  });
});

/* ------------------------------------------------------- Ruth, quoted verbatim */

describe('L’écouteur (fr) — Ruth, quoted from Pack 1', () => {
  /**
   * r6 is word for word her last message in the-lighthouse. Asserted against the
   * shipped Pack 1 string directly, so the two files cannot drift: if either is
   * edited, this fails rather than a player meeting two versions of the last
   * thing his aunt ever said.
   */
  it('quotes her Pack 1 line character for character', () => {
    expect(body('r6')).toBe(theLighthouseFr.messages?.r12);
    expect(body('r6')).toBe(englishRuthEquivalent());
    function englishRuthEquivalent(): string {
      // Sanity: the English does the same thing, so this is a real quotation and
      // not a coincidence of two similar sentences.
      const enListener = englishBody('r6');
      const enLighthouse = getCase('the-lighthouse')!
        .threads.flatMap((t) => t.messages)
        .find((m) => m.id === 'r12')?.body;
      expect(enListener).toBe(enLighthouse);
      return body('r6');
    }
  });

  /**
   * Her voice is her Pack 1 voice, not a rule applied fresh: lowercase, blunt,
   * never landing a full stop — except r5, which opens on a capital because it
   * opens on a person's initial. Opening case is taken from the English message
   * by message.
   */
  it('keeps her Pack 1 voice, including the one capital', () => {
    for (const m of messages.filter((x) => x.senderId === 'ruth')) {
      const source = englishBody(m.id);
      const startsUpper = source[0] === source[0]?.toUpperCase();
      expect(m.body[0] === m.body[0]?.toUpperCase(), `${m.id} opening case`).toBe(startsUpper);
      expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
    }
    expect(body('r5').startsWith('M')).toBe(true);
    expect(body('r2')[0]).toBe(body('r2')[0]?.toLowerCase());
  });
});

/* --------------------------------------------------------------- the contract */

describe('L’écouteur (fr) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theListenerFr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theListenerFr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theListenerFr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const proseEntries = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of proseEntries) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
      seen.set(value, path);
    }
  });

  it('keeps every number, paragraph and placeholder the English states', () => {
    const translated = caseTextEntries(script);
    for (const [path, source] of caseTextEntries(english)) {
      const value = translated.get(path) ?? '';
      expect(numbers(value), `${path} changes the numbers`).toEqual(numbers(source));
      expect(paragraphs(value), `${path} loses or gains a paragraph`).toBe(paragraphs(source));
      expect(placeholders(value), `${path} changes its placeholders`).toEqual(placeholders(source));
    }
  });

  it('gives every claim chip the times the engine actually holds', () => {
    for (const m of messages) {
      for (const c of m.claims ?? []) {
        const times = digitTimes(c.label);
        if (times.length === 0) continue;

        const allowed = endForms(c.window.end).map((end) => [clock(c.window.start), end]);
        const acceptable = [[clock(c.window.start)], ...allowed];
        const namesTheWindow = acceptable.some((f) => f.join('|') === times.join('|'));

        const minutes = (hhmm: string): number => {
          const [h, m2] = hhmm.split(':').map(Number);
          return (h ?? 0) * 60 + (m2 ?? 0);
        };
        const at = times.length === 1 ? minutes(times[0] ?? '') : -1;
        const momentInside = at >= 0 && at >= c.window.start % 1440 && at <= c.window.end % 1440;

        expect(
          namesTheWindow || momentInside,
          `claim ${c.id} chip says ${times.join('–')} but the engine holds ` +
            `${clock(c.window.start)}–${clock(c.window.end)}`,
        ).toBe(true);
      }
    }
  });

  it('uses its own names for people and places in the prose', () => {
    const prose = proseOf(script);
    const englishProse = proseOf(english);
    const named = [
      ...script.characters
        .filter((c) => c.id !== 'you')
        .map((c) => ({
          id: `character.${c.id}`,
          english: fold(english.characters.find((e) => e.id === c.id)?.name ?? ''),
          rendered: fold(c.name),
        })),
      ...script.places.map((p) => ({
        id: `place.${p.id}`,
        english: fold(english.places.find((e) => e.id === p.id)?.name ?? ''),
        rendered: fold(p.name),
      })),
    ];

    for (const entity of named) {
      if (entity.english === '' || !englishProse.includes(entity.english)) continue;
      expect(
        prose.includes(entity.rendered),
        `${entity.id} is called "${entity.rendered}" on screen but the prose never says it`,
      ).toBe(true);
    }
  });

  it('never lets a contracted preposition eat a place name', () => {
    const englishProse = proseOf(english);
    const spoken = spokenProse(script);

    const checked: string[] = [];
    for (const place of script.places) {
      const englishName = fold(english.places.find((e) => e.id === place.id)?.name ?? '');
      if (englishName === '' || !englishProse.includes(englishName)) continue;
      checked.push(place.id);
      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact`,
      ).toBe(true);
    }
    expect(checked).toContain('cafe');
  });

  it('keeps naming whoever the English named in a discovery gate', () => {
    const nameIn = (s: CaseScript, threadId: string): boolean => {
      const thread = s.threads.find((t) => t.id === threadId)!;
      const nameOf = new Map(s.characters.map((c) => [c.id, fold(c.name)]));
      const bodyOf = new Map(s.threads.flatMap((t) => t.messages).map((m) => [m.id, fold(m.body)]));
      const names = thread.participantIds
        .filter((id) => id !== 'you')
        .map((id) => nameOf.get(id) ?? '');
      return (thread.requiresReadMessageIds ?? []).some((id) => {
        const gateBody = bodyOf.get(id) ?? '';
        return names.some((n) => n !== '' && gateBody.includes(n));
      });
    };

    for (const thread of script.threads) {
      if ((thread.requiresReadMessageIds ?? []).length === 0) continue;
      if (!nameIn(english, thread.id)) continue;
      expect(nameIn(script, thread.id), `${thread.id} lost the name that finds it`).toBe(true);
    }
    expect(nameIn(english, 't-mairi')).toBe(true);
    expect(body('k11')).toContain('Mairi Bell');
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });

  describeCaseContract(script);
});

/* --------------------------------------------------------- the first clue */

describe('L’écouteur (fr) — the clue that has been there since Pack 1', () => {
  /**
   * The proof is `x-papers`, re-recorded from the Ardnoe file. The two claims
   * share Pack 1's exclusive group, so the finale breaks loudly if anybody edits
   * the first case's clue — and the French wording of both has to name the same
   * two things a player read eleven years ago.
   */
  it('keeps the papers pair pointing at Pack 1', () => {
    expect(label('c-papers-kept')).toContain('carnet');
    expect(label('c-papers-sent')).toContain('avait déjà envoyé les papiers');
    const claimOf = (id: string) =>
      messages.flatMap((m) => m.claims ?? []).find((c) => c.id === id)!;
    const kept = claimOf('c-papers-kept');
    const sent = claimOf('c-papers-sent');
    expect(kept.window.start < sent.window.end && sent.window.start < kept.window.end).toBe(true);
    expect(revelation('x-papers')).toContain('Gordon and Sime');
    expect(revelation('x-papers')).toContain('carnet de relevés');
  });

  /**
   * The distinction he cannot let stand: `envoyés` can be stopped, `déjà chez les
   * auditeurs` cannot. That pair of words is the whole confession, so both are
   * pinned in the message and in the revelation.
   */
  it('keeps the wording that makes him correct the account', () => {
    expect(body('l11')).toContain('envoyés');
    expect(body('l12')).toContain('Envoyés, c’est une chose qu’on peut arrêter');
    expect(body('l12')).toContain('déjà chez les auditeurs');
    expect(revelation('x-ardnoe')).toContain('envoyés');
    expect(pressOf('z-ardnoe')).toContain('envoyés');
  });

  /**
   * Ninety-four seconds is the number he gives away, and it is never published.
   * The only digit clock in the pack is the one Nkemdi reads off the line
   * records.
   */
  it('keeps the duration and lets only the line records carry a digit clock', () => {
    for (const text of [
      body('l12'),
      body('k5'),
      body('k6'),
      revelation('x-box'),
      pressOf('z-box'),
      script.confrontation?.confession ?? '',
    ]) {
      // Lowercased: it opens a sentence in l12 and in the confession, and the
      // number is the fact rather than the capital.
      expect(text.toLowerCase(), 'the duration lost its wording').toContain(
        'quatre-vingt-quatorze secondes',
      );
    }
    expect(messages.filter((m) => digitTimes(m.body).length > 0).map((m) => m.id)).toEqual(['k5']);
    expect(body('k5')).toContain('21:31');
    expect(revelation('x-box')).toContain('21:31');
  });

  /** Both halves of the motive, in two threads, or it cannot be assembled. */
  it('keeps both halves of the motive sayable', () => {
    expect(body('l16')).toContain('savoir est tout l’intérêt'); // he says why
    expect(body('b9')).toContain('Il vérifiait'); // and Beth supplies the proof of it
  });
});

/* ------------------------------------------------------------- the player */

describe('L’écouteur (fr) — the player stays unmarked', () => {
  /**
   * The English refers to the player in the third person twice, which
   * `playerNeutral` cannot see. Both are rebuilt by agreeing with a feminine
   * noun rather than with the reader, and the chiasmus at the end avoids `je t’ai
   * choisi` entirely.
   */
  it('agrees with a noun rather than with the reader', () => {
    expect(body('l3')).toContain('une version de toi');
    expect(body('l3')).toContain('je l’ai rencontrée'); // agrees with `version`
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toContain('une très grande intelligence policière');
    expect(confession).toContain('elle ne m’a jamais déçu'); // `elle` is the intelligence
    expect(confession).toContain('mon choix est tombé sur toi');
    expect(confession).toContain('Tu es ce qu’il y a de mieux'); // neuter, not le/la meilleur·e
  });

  it('never lets a participle agree with the player', () => {
    const atPlayer = [
      script.blurb,
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      script.confrontation?.confession ?? '',
      ...(script.confrontation?.deflections ?? []),
      ...(script.coda?.messages ?? []),
      script.solution.epilogue,
      body('l2'),
      body('l3'),
      body('l9'),
      pressOf('z-why'),
    ].join('\n');

    expect(atPlayer).not.toMatch(
      /\btu (es|étais|serais) (venue?|allée?|restée?|arrivée?|partie?|revenue?)\b/i,
    );
    expect(atPlayer).not.toMatch(/\bje t’ai (choisie?|regardée?|vue?)\b/i);
    expect(atPlayer).not.toMatch(/\btu t’étais trompée?\b/i);
    expect(atPlayer).not.toMatch(/\b(la|le) meilleure?\b/i);
  });
});

/* ----------------------------------------------------------------- the voices */

describe('L’écouteur (fr) — the voices', () => {
  /**
   * The player is lowercase and never terminates, as in all fifteen packs. He,
   * Nkemdi, Mairi and Beth all write in full sentences and finish them — he most
   * carefully of anyone, because the account is the only thing he has ever
   * cared about. Ruth is handled separately, against her Pack 1 self.
   */
  it('keeps the voices apart', () => {
    for (const m of messages) {
      if (m.senderId === 'ruth') continue; // pinned against Pack 1 above
      if (m.senderId === 'you') {
        expect(m.body[0], `${m.id} is not lowercase`).toBe(m.body[0]?.toLowerCase());
        expect(m.body.endsWith('.'), `${m.id} has grown a full stop`).toBe(false);
      } else {
        expect(m.body[0], `${m.id} does not start like a written sentence`).toBe(
          m.body[0]?.toUpperCase(),
        );
        expect(m.body.endsWith('.'), `${m.id} lost its full stop`).toBe(true);
      }
    }
  });

  /**
   * The last voice in fifteen packs is the first killer, not him. He does not get
   * the final word, because the promise of the finale is that you catch him.
   */
  it('gives the coda to Mairi Bell', () => {
    expect(script.coda?.from).toBe('Mairi Bell');
    expect(script.coda?.messages).toHaveLength(english.coda?.messages.length ?? 0);
    expect(script.coda?.messages[2]).toContain('alors tu sais déjà');
    expect(script.coda?.messages[4]).toContain('Merci d’avoir demandé');
    // And she does not take back what she did.
    expect(script.coda?.messages[1]).toContain('personne ne m’a portée');
  });
});
