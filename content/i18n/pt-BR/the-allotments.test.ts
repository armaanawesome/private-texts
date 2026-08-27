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
import { clock, digitTimes, fold, numbers, paragraphs } from '../testkit';
import { theAllotmentsPtBr } from './the-allotments';

/**
 * The Brazilian Portuguese Allotments, checked on the things a player reasons over.
 *
 * Imported directly and applied with applyCaseText: an unregistered pack is
 * skipped by every generic suite, so "it passed" would mean "it was skipped".
 */
const english = getCase('the-allotments')!;
const script = applyCaseText(english, theAllotmentsPtBr);
const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const label = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const pressOf = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const prose = (s: typeof script): string => [...caseTextEntries(s).values()].join('\n');

/** Varies per pack, so it stays local: everything read, minus the bare names. */
const spokenOf = (s: typeof script): string =>
  [...caseTextEntries(s)]
    .filter(([path]) => !/^(character|place|object)\./.test(path))
    .map(([, value]) => value)
    .join('\n');

const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
};

/* --------------------------------------------- the contract, checked up front */

describeCaseContract(script);

describe('As Hortas (pt-BR) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theAllotmentsPtBr).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theAllotmentsPtBr)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theAllotmentsPtBr)];

    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const proseEntries = entries.filter(
      ([path]) => !/^(character|place|object|thread)\./.test(path) && path !== 'title',
    );
    const seen = new Map<string, string>();
    for (const [path, value] of proseEntries) {
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

  /** A chip may name its window, or a single moment inside it. */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const t of script.threads) {
      for (const m of t.messages) {
        for (const c of m.claims ?? []) {
          const times = digitTimes(c.label);
          if (times.length === 0) continue;

          const start = clock(c.window.start);
          const end = c.window.end % 1440 === 0 ? '24:00' : clock(c.window.end);
          const namesTheWindow =
            times.join('|') === start || times.join('|') === [start, end].join('|');
          const namesAMomentInside =
            times.length === 1 &&
            toMinutes(times[0] ?? '') >= c.window.start % 1440 &&
            toMinutes(times[0] ?? '') <= c.window.end % 1440;

          expect(
            namesTheWindow || namesAMomentInside,
            `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${end}`,
          ).toBe(true);
        }
      }
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

/* -------------------------------------------------------------- possession */

describe('As Hortas (pt-BR) — whose fork, whose shed', () => {
  /**
   * Everybody can name the fork at forty feet, which is why nobody asked where it
   * had been standing. One name on both chips, and the ten days inside Wilf's door
   * stated in the borrowing, the witness and the proof.
   */
  it('keeps one name for the fork and the ten days it stood in his shed', () => {
    expect(script.objects.find((o) => o.id === 'fork')?.name).toBe(
      'o garfo de jardinagem com fita no cabo',
    );
    expect(label('c-fork-nev')).toContain('o garfo enfitado');
    expect(label('c-fork-wilf')).toContain('o garfo enfitado');

    expect(body('v4')).toContain('no galpão dele'); // Nev lent it
    expect(body('j5')).toContain('atrás da porta dele'); // Joyce watched him carry it
    expect(revelation('x-fork')).toContain('atrás da porta dele');
  });

  /**
   * And the fork convicts nobody. It is the optional proof and it only says who was
   * close enough to reach it, which is the sentence that has to survive.
   */
  it('keeps the fork proving proximity rather than guilt', () => {
    expect(body('j6')).toContain('perto o bastante para alcançar');
    expect(revelation('x-fork')).toContain('não é prova sobre Nev Ashworth');
    expect(revelation('x-fork')).toContain('estar de pé onde ele estava de pé');
  });

  /** The fire that was never lit, in her mouth, in Sami's and in the proof. */
  it('keeps the fire unlit in every account of it', () => {
    expect(body('s4')).toContain('Queimando o tempo todo');
    expect(label('c-deb-burning')).toContain('queimando a poda');
    expect(body('m4')).toContain('não estava acesa');
    expect(revelation('x-deb-burning')).toContain('nunca foi acesa');
    expect(pressOf('a-burning')).toContain('nunca foi acesa');

    // The only smoke on the site, named the same way in both places.
    expect(body('m4')).toContain('Ted Harrap no 40');
    expect(revelation('x-deb-burning')).toContain('Ted Harrap no 40');
  });
});

/* ------------------------------------------------------------------ the times */

describe('As Hortas (pt-BR) — the times', () => {
  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      s3: ['das seis até sete e meia'], // the alibi she gives in the group
      v5: ['desde as seis'], // Nev on plot 3 with a torch
      m7: ['Seis e meia'], // and Sami watching her go up the shed row
      j7: ['desde as cinco'], // Wilf on the padlocks, an hour and a half of them
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    // Compared lowercased, since these open a sentence in some of their sites.
    expect(revelation('x-deb-shedrow').toLowerCase()).toContain('das seis até sete e meia');
    expect(revelation('x-deb-shedrow').toLowerCase()).toContain('seis e meia');
    expect(pressOf('a-shedrow').toLowerCase()).toContain('seis e meia');
  });

  /**
   * Only the scrapyard camera writes a clock in digits, and it is the only witness
   * on that site with no opinion about the hedge.
   */
  it('lets only the camera write a time in digits', () => {
    const withClock = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(withClock).toEqual(['j3']);

    expect(body('j3')).toContain('19:02');
    expect(body('j3')).toContain('19:11');
    expect(revelation('x-deb-lane')).toContain('19:02');
    expect(revelation('x-deb-lane')).toContain('19:11');
    // The press says the same two minutes in words, as the English does.
    expect(pressOf('a-lane')).toContain('dois minutos depois das sete');
    expect(pressOf('a-lane')).toContain('onze minutos depois das sete');
    expect(digitTimes(pressOf('a-lane'))).toEqual([]);
  });

  it('leaves the digits where the English left them', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\d/.test(m.body))
      .map((m) => m.id);
    expect(digitsIn).toEqual(['w6', 's3', 'v1', 'v5', 'm1', 'm2', 'm4', 'j3']);
  });
});

/* ----------------------------------------------------------------- the motive */

describe('As Hortas (pt-BR) — the motive she was wrong about', () => {
  it('keeps both halves of the motive sayable', () => {
    expect(body('w6')).toContain('1998'); // Ray built the shed
    expect(body('w6')).toContain('galpão do Ray');
    expect(body('j8')).toContain('quatro lotes'); // the council letter reached her too
    expect(script.motives[0]?.summary).toContain('lote 14');
    expect(script.motives[0]?.summary).toContain('1998');
  });

  /**
   * The inversion the whole pack rests on: he had already decided in her favour and
   * had the letter in his pocket. Both the confession and the epilogue have to keep
   * it, or she is just a woman who lost an argument.
   */
  it('keeps the letter that was already written', () => {
    expect(body('w8')).toContain('isenção por motivo humanitário');
    expect(body('w8')).toContain('um lote não é só um lote');
    expect(script.solution.epilogue).toContain('isenção por motivo humanitário');
    expect(script.solution.epilogue).toContain('um lote não é só um lote');
    expect(script.confrontation?.confession).toContain('só existia uma coisa que aquilo ia ser');
  });

  /** Pack 11 is standalone: no Keeper, no coda. */
  it('carries none of the arc', () => {
    expect(script.coda).toBeUndefined();
    expect(prose(script)).not.toMatch(/keeper|listener|número desconhecido/i);
  });
});

/* --------------------------------------------------------------- the voices */

describe('As Hortas (pt-BR) — the voices', () => {
  const FINISHERS = [
    'w1', 'w3', 'w5', 'w6', 'w8', 'w9', 'w10',
    's1', 's3', 's4', 's5', 's7',
    'm1', 'm2', 'm4', 'm5', 'm7', 'm8',
    'j1', 'j2', 'j3', 'j5', 'j6', 'j7', 'j8', 'j9',
  ];
  const NEV = ['s2', 's6', 'v1', 'v3', 'v4', 'v5', 'v6', 'v7'];
  const YOU = ['w2', 'w4', 'w7', 'v2', 'm3', 'm6', 'j4'];

  it('keeps Wilf, Joyce, Deb and Sami finishing their sentences', () => {
    for (const id of FINISHERS) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(/[.?!]$/.test(body(id)), `${id} does not finish its sentence`).toBe(true);
    }
    // Deb has three messages, all in the group, all polished, because she is
    // building something rather than saying something.
    for (const id of ['s3', 's4', 's5']) {
      expect(/[.?!]$/.test(body(id))).toBe(true);
    }
  });

  /**
   * Nev is lowercase all the way down and lowercases the people too, which is what
   * separates him from the player — also lowercase, but with almost nothing to say.
   */
  it('keeps Nev lowercase, names included', () => {
    for (const id of [...NEV, ...YOU]) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(/[.?!]$/.test(body(id)), `${id} has grown terminal punctuation`).toBe(false);
    }
    expect(body('v6')).toContain('deb threlfall');
    expect(body('v7')).toContain('sami');
  });

  /**
   * The player is unmarked. The English names the relationship from Wilf's side —
   * `He was your father`, never `you are his daughter` — and the Portuguese keeps
   * that shape, so nothing agrees with the player.
   */
  it('never assigns the player a gender', () => {
    expect(script.briefing?.opening).toContain('Ele era o seu pai');
    expect(script.confrontation?.opening).toContain('Ele era o seu pai');

    const addressed = [
      script.briefing?.opening ?? '',
      script.confrontation?.opening ?? '',
      ...(script.confrontation?.deflections ?? []),
      script.blurb,
    ].join('\n');
    expect(addressed).not.toMatch(
      /\b(filh[oa]|cert|segur|cansad|prepar[ae]d|sozinh|sentad|bem-vind)[oa]?\b/i,
    );
  });
});

/* ---------------------------------------------------------------- the names */

describe('As Hortas (pt-BR) — the names', () => {
  it('translates the places that are descriptions and keeps the ones that are names', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('site')).toBe('as hortas de Carr Bank');
    expect(place('plot14')).toBe('o lote 14');
    expect(place('plot3')).toBe('o lote 3');
    expect(place('shedrow')).toBe('a fileira dos galpões');
    expect(place('tank')).toBe('o tanque de água');
    expect(place('lane')).toBe('a viela de Carr Bank');
  });

  /**
   * Every place name here begins with an article and Portuguese fuses it into no,
   * na, do, da, pelo, pela. A chip reading `o lote 14` beside prose that only ever
   * says `no 14` leaves the full name unspoken, and to a player the chip and the
   * message are two different places. This is the same mechanism that took a gender
   * in `do Sam` over in The Cut; here it would take an article.
   *
   * Asserted on the raw, unfolded name, gated on the places the English itself
   * names — an unconditional version fails for the English too on any place that is
   * defined and never spoken.
   */
  it('never lets a contracted preposition eat a place name', () => {
    const spoken = spokenOf(script);
    const englishSpoken = fold(spokenOf(english));

    for (const place of script.places) {
      const englishName = fold(english.places.find((p) => p.id === place.id)?.name ?? '');
      if (englishName === '' || !englishSpoken.includes(englishName)) continue;
      expect(
        spoken.includes(place.name),
        `place.${place.id} is "${place.name}" but no sentence says it with the article intact`,
      ).toBe(true);
    }
  });

  it('uses whichever form of each name the English uses', () => {
    const here = prose(script);
    const there = prose(english);
    for (const name of [
      'Wilf Sankey',
      'Deborah Threlfall',
      'Nev Ashworth',
      'Joyce Ubani',
      'Sami Rahimi',
      'Ray Threlfall',
      'Ted Harrap',
    ]) {
      expect(here.includes(name), `English and pt-BR disagree about "${name}"`).toBe(
        there.includes(name),
      );
    }
  });

  /** Sami's thread opens because Nev names him in the message that gates it. */
  it('opens no thread with a stranger', () => {
    const nameOf = new Map(script.characters.map((c) => [c.id, fold(c.name)]));
    const messages = script.threads.flatMap((t) => t.messages);
    const senderOf = new Map(messages.map((m) => [m.id, m.senderId]));
    const messageById = new Map(messages.map((m) => [m.id, m]));

    const readBy = (id: string): string => {
      const gate = messageById.get(id);
      if (gate === undefined) return '';
      const thread = script.threads.find((t) => t.id === gate.threadId);
      if (thread === undefined) return '';
      return thread.messages
        .filter((m) => m.sentAt <= gate.sentAt)
        .map((m) => fold(m.body))
        .join('\n');
    };

    for (const thread of script.threads) {
      const gates = thread.requiresReadMessageIds ?? [];
      if (gates.length === 0) continue;
      const others = thread.participantIds.filter((id) => id !== 'you');
      const names = others.map((id) => nameOf.get(id) ?? '');
      const introduced = gates.some((id) => {
        const seen = readBy(id);
        if (names.some((n) => n !== '' && seen.includes(n))) return true;
        const sender = senderOf.get(id);
        return sender !== undefined && others.includes(sender);
      });
      expect(introduced, `${thread.id} opens with a stranger`).toBe(true);
    }

    expect(body('v7')).toContain('sami');
  });
});
