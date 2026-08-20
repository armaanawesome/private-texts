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
import { openMicEs } from './open-mic';

/**
 * The Spanish Open Mic, checked on the things a player reasons over.
 *
 * The translation is imported and applied directly rather than routed through
 * CASE_TRANSLATIONS, so it is checked on its own account rather than on the day
 * somebody edits a registry. The generic contract is re-run here against the
 * localised script.
 *
 * The rest is what no generic test can see. Two things carry this pack: a time
 * the briefing itself gets wrong, and the fact that exactly one man writes his
 * times down. Reword either and every id, number and paragraph check stays green
 * while the case stops being solvable by reading.
 */
const english = getCase('open-mic')!;
const script = applyCaseText(english, openMicEs);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const chip = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';

/** Raw minutes past the case zero, wrapped. */
const clock = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  return h * 60 + m;
};
const digitTimes = (text: string): string[] => text.match(/\b\d{2}:\d{2}\b/g) ?? [];
const numbers = (text: string): string[] => (text.match(/\d+/g) ?? []).sort();
const paragraphs = (text: string): number => text.split(/\n{2,}/).length;

const allProse = [...caseTranslationEntries(openMicEs).values()].join('\n');

/* ----------------------------------------------- the contract, on the Spanish */

describeCaseContract(script);

describe('Micro abierto (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(openMicEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, openMicEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(openMicEs)];

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

  /** A chip may name its window, or a single moment inside it, or its assertion. */
  it('gives every claim chip a time the engine actually holds', () => {
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
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

/* -------------------------------------------------- the time the case gets wrong */

describe('Micro abierto (es) — the wrong five minutes', () => {
  /**
   * The briefing itself carries the lie, which is unusual and is the pack.
   *
   * It says Debbie did seven minutes `a las diez menos cinco`, and she did not.
   * Kit refuses it in k2 with the running order, and that refusal is the case.
   * The phrase has to be identical in all three places — the briefing, Debbie
   * saying it about herself in n9, and Kit throwing it out — or a player has
   * nothing to catch. Compared lowercased, because one of them opens a sentence.
   */
  it('keeps the wrong time identical in all three places that state it', () => {
    const wrong = 'las diez menos cinco';
    expect(script.briefing?.opening?.toLowerCase()).toContain(wrong);
    expect(body('n9').toLowerCase()).toContain(wrong);
    expect(body('k2').toLowerCase()).toContain(wrong);

    // And Kit's correction, which is the whole deduction.
    expect(body('k2')).toContain('Debbie salió a las 21:30');
    expect(body('k2')).toContain('No a las 21:55');
    expect(body('k2')).toContain('se bajó a las diez menos diez');
    expect(chip('c-marnie-stage')).toContain('21:30');
  });

  /**
   * One man writes his times down, and that is why a notebook beats a video.
   *
   * Kit is the only person in the building whose messages carry digits, because
   * he writes the running order in biro at the time. Everybody else speaks
   * their times. Tidying one spoken line into digits would put the whole room
   * on the same footing as the drawer, and the drawer is what wins.
   */
  it('lets only Kit write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['k2', 'k5']);
    expect(digitTimes(body('k5'))).toEqual(['21:28']);
    expect(body('k1')).toContain('bolígrafo');
    expect(body('k7')).toContain('a bolígrafo en una hoja de caja');
  });

  it('states every other load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      h4: ['las nueve y media'], // Dave's clip, which is from the wrong week
      k3: ['las nueve y media'], // the player quoting it back
      k4: ['las nueve y media'], // Kit putting her on stage at that minute
      f6: ['las diez menos veinticinco'], // Dave out of the fire door
      r4: ['las nueve'], // Roz pulls the card
      r5: ['las nueve y veinte'], // and puts it back
    };

    for (const [id, fragments] of Object.entries(times)) {
      for (const fragment of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${fragment}"`).toContain(fragment);
      }
    }

    expect(script.briefing?.opening).toContain('las once y veinte');
    for (const text of [revelation('x-gil-alley'), press('o-alley')]) {
      expect(text.toLowerCase()).toContain('las diez menos veinticinco');
    }
    for (const text of [revelation('x-card'), press('o-card')]) {
      expect(text.toLowerCase()).toContain('las nueve');
      expect(text.toLowerCase()).toContain('las nueve y veinte');
    }
  });
});

/* --------------------------------------------------------------- the machinery */

describe('Micro abierto (es) — the card and the clip', () => {
  /**
   * One camera, one card, one night. The object is `unique` in the engine, so
   * two people cannot both have had it — which is the entire force of the
   * contradiction — and it therefore has exactly one Spanish name.
   */
  it('gives the card one name and keeps the drive a different thing', () => {
    expect(script.objects.find((o) => o.id === 'card')?.name).toBe('la tarjeta de la cámara');
    for (const id of ['c-card-gil', 'c-card-roz']) {
      expect(chip(id)).toContain('la tarjeta de la cámara');
    }
    expect(body('r2')).toContain('Una cámara, una tarjeta, una noche');
    expect(revelation('x-card')).toContain('Una cámara, una tarjeta, una noche');
    expect(press('o-card')).toContain('Una cámara, una tarjeta');

    // The drive is where the clip ends up and is deliberately not the card.
    expect(body('h4')).toContain('al disco');
    expect(body('r3')).toContain('al disco');
    expect(body('f7')).toContain('al disco');

    for (const rival of [/\bmemoria de la cámara\b/, /\btarjeta de memoria\b/, /\bla SD\b/]) {
      expect(allProse, `a second name for the card: ${rival}`).not.toMatch(rival);
    }
  });

  /**
   * The swan is the tell. It is the only reason anybody can date the footage,
   * so the callback has to be nameable in the same words in Kevin's mouth and
   * in the press line, and the reason it is impossible has to survive.
   */
  it('keeps the swan datable', () => {
    expect(body('f8')).toContain('lo del cisne');
    expect(body('f8')).toContain('El martes no hay cisne');
    expect(body('f8')).toContain('es del martes anterior');
    expect(body('f8')).toContain('porque ella lo quitó');
    expect(press('o-bar')).toContain('lo del cisne');
    expect(press('o-bar')).toContain('Priya quitó lo del cisne');
    expect(revelation('x-marnie-bar')).toContain('la única semana en que Priya hizo lo del cisne');
    expect(script.blurb).toContain('Es del martes anterior');
  });

  /** The clip is real, which is the thing that makes it work. */
  it('keeps the clip genuine and only from the wrong night', () => {
    expect(revelation('x-marnie-bar')).toContain('El clip es real');
    expect(body('f7')).toContain('Es un clip precioso');
    expect(body('f9')).toContain('los mismos cinco minutos idénticos');
    expect(script.confrontation?.confession).toContain('La misma camisa');
    expect(script.confrontation?.confession).toContain('La misma risa en el mismo sitio');
  });
});

/* ------------------------------------------------------------------ the names */

describe('Micro abierto (es) — the names', () => {
  it('translates the places that are descriptions and keeps the venue a name', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('club')).toBe('el Hatch');
    expect(place('stage')).toBe('el escenario');
    expect(place('bar')).toBe('la barra');
    expect(place('greenroom')).toBe('el camerino');
    expect(place('box')).toBe('la cabina de sonido');
    expect(place('alley')).toBe('el callejón');

    const character = (id: string) => script.characters.find((c) => c.id === id)?.name;
    expect(character('marnie')).toBe('Debbie');
    expect(character('gil')).toBe('Dave');
    expect(character('roz')).toBe('Roz');
    expect(character('ferdy')).toBe('Kevin');
    expect(character('kit')).toBe('Kit');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(openMicEs)]
      .filter(([path]) => !/^(character|place|object|thread)\./.test(path))
      .map(([, value]) => value)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(' ')[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * Spanish `del` and `al` swallow a masculine article, so the three masculine
   * places a player has to match against a chip are each said in full.
   */
  it('says the venue, the stage and the alley in full at least once', () => {
    expect(script.briefing?.opening).toContain('El Hatch');
    expect(body('h1')).toContain('El Hatch');
    expect(body('h3')).toContain('en el escenario');
    expect(body('k4')).toContain('en el escenario');
    expect(script.briefing?.opening).toContain('en el callejón');
    expect(body('h1')).toContain('en el callejón');
  });

  /** A chip and a sentence have to use the same words or they are two places. */
  it('uses one word for the stage, the bar and the alley on the chip and in the prose', () => {
    for (const id of ['c-marnie-stage', 'c-gil-stage', 'c-ferdy-stage']) {
      expect(chip(id)).toContain('en el escenario');
    }
    expect(chip('c-marnie-bar')).toContain('en la barra');
    expect(body('h4')).toContain('en la barra');
    expect(body('k3')).toContain('en la barra');

    for (const id of ['c-ferdy-alley', 'c-gil-alley']) {
      expect(chip(id)).toContain('en el callejón');
    }
    expect(body('n9')).toContain('en el callejón');
    expect(press('o-why')).toContain('al callejón');
  });

  /**
   * The victim is Debbie in every field. Both places that used to say MARNIE
   * were a stale rename that renameLeak.test.ts missed because the occurrences
   * were in capitals; the English has since been corrected and this file with
   * it. Pinned here so a future edit cannot quietly reintroduce a name that
   * belongs to nobody.
   */
  it('never calls the victim by the name she was written under', () => {
    expect(allProse).not.toMatch(/marnie/i);
    expect(body('n2')).toBe('DEBBIE');
    expect(script.solution.epilogue).toContain('DEBBIE FOR TOUR PPL');
  });
});

/* ------------------------------------------------------- the unmarked player */

describe('Micro abierto (es) — the player has no gender', () => {
  /**
   * One line would have forced one. The English f4 ends `for the whole of that
   * section, son`, addressed to the player rather than to Dave, which states
   * the player is a man. The vocative is rebuilt as `Mira,` at the front — the
   * same avuncular condescension, marking nobody.
   *
   * h8 keeps `Hijo` on purpose. Dave is a man and is the addressee there, and
   * neutralising it would delete real characterisation to satisfy a rule that
   * cannot tell who is being spoken to.
   */
  it('keeps Kevin from calling the player son, and keeps him calling Dave one', () => {
    expect(body('f4')).toContain('Mira, yo estuve sujetando un micrófono');
    expect(body('f4')).not.toMatch(/\bhij[oa]\b/i);
    expect(body('h8')).toBe('Hijo, yo estaba al micrófono.');
  });

  it('describes the player only by what they do', () => {
    expect(script.briefing?.opening).toContain('Haces un podcast');
    expect(script.briefing?.opening).toContain('Te mandaba notas de voz');
    expect(script.confrontation?.opening).toContain('Hablas con gente');
    // A reflexive perfect does not agree in Spanish, which is why this one is safe.
    expect(script.confrontation?.deflections[1]).toContain('no te has subido a un escenario');
  });
});

/* ----------------------------------------------------------------- the voices */

describe('Micro abierto (es) — the voices', () => {
  const DEBBIE = ['n1', 'n3', 'n5', 'n6', 'n8', 'n9', 'n10'];
  const DAVE = ['h3', 'h4', 'h6', 'h7'];
  const ROZ = ['h1', 'h5', 'h9', 'r1', 'r2', 'r3', 'r4', 'r5', 'r7', 'r8'];
  const KEVIN = ['h2', 'h8', 'f1', 'f2', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'];
  const KIT = ['k1', 'k2', 'k4', 'k5', 'k7', 'k8'];
  const YOU_QUIET = ['n4', 'n7', 'k3', 'k6', 'f3', 'r6'];

  /**
   * The two people who started the same month, separated by one thing.
   *
   * Debbie is lowercase and never lands a full stop. Dave is capitalised and
   * never lands one either. That single difference is all there is between
   * them, which is worth keeping precisely because the pack is about how little
   * separated them.
   */
  it('keeps Debbie lowercase and Dave capitalised, and neither of them closing', () => {
    for (const id of DEBBIE) {
      expect(body(id)[0], `${id} does not open lowercase`).toBe(body(id)[0]?.toLowerCase());
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of DAVE) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // She lowercases him, too, which is the same fact from her side.
    expect(body('n3')).toContain('gil');
    expect(body('n6')).toContain('el set de gil');
  });

  /** Roz, Kevin and Kit write in capitals and finish every sentence. */
  it('keeps the three who run the room writing in sentences', () => {
    for (const id of [...ROZ, ...KEVIN, ...KIT]) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  /**
   * The player is lowercase and never closes, except once. n2 is one word in
   * capitals and it is the only shout in the pack, at the only good news in it.
   */
  it('keeps the player terse, and lets them shout exactly once', () => {
    for (const id of YOU_QUIET) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    expect(body('n2')).toBe(body('n2').toUpperCase());
    expect(body('n2').split(' ')).toHaveLength(1);

    const shouts = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => m.senderId === 'you' && m.body === m.body.toUpperCase())
      .map((m) => m.id);
    expect(shouts).toEqual(['n2']);
  });
});

/* ------------------------------------------------------- the arc and the motive */

describe('Micro abierto (es) — the arc and the motive', () => {
  /** Pack 10 is standalone. Nothing was added to fill the silence. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
    expect(allProse).not.toMatch(/número desconocido/i);
  });

  /**
   * The motive is the kindness, not the tour. Both halves live in different
   * threads and the pack is unreadable if it lands as jealousy about money.
   */
  it('keeps both halves of the motive sayable, and keeps it about the kindness', () => {
    expect(body('n5')).toContain('empezamos el mismo mes');
    expect(body('n5')).toContain('2009');
    expect(body('r8')).toContain('Empezaron el mismo mes');
    expect(body('r8')).toContain('era ella la que se sentía mal');
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('nueve días');
    expect(motive).toContain('con cariño');
    expect(press('o-why')).toContain('con cariño');
    // The line that actually did it, and it has to stay small.
    expect(script.confrontation?.confession).toContain('yo te meto');
  });

  /**
   * Kevin is the red herring and has to be provably innocent. Dave puts him in
   * the alley; he is compering on the very recording Dave wants everybody to
   * watch, and the case must not require proving it.
   */
  it('clears the compere Dave named', () => {
    expect(chip('c-ferdy-alley')).toContain('según Dave');
    expect(body('f4')).toContain('Es la misma grabación que él quiere que veas');
    expect(revelation('x-ferdy-stage')).toContain('la misma grabación');
    expect(script.solution.requiredContradictionIds).not.toContain('x-ferdy-stage');
    expect(script.solution.killerId).not.toBe('ferdy');
  });

  /** Kit names Kevin, which is the only reason Kevin s thread opens. */
  it('still names Kevin in the message that finds him', () => {
    expect(body('k8')).toContain('Kevin');
  });
});
