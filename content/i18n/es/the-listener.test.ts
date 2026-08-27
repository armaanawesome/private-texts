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
import { clock, digitTimes, numbers, paragraphs } from '../testkit';
import { theListenerEs } from './the-listener';

/**
 * The Spanish Listener, checked on the things a player reasons over.
 *
 * The finale, so three things matter more here than in any other pack: the alias
 * count, the two verbs the whole arc turns on, and the fact that this case
 * quotes Pack 1 back at a player who played it eleven cases ago.
 *
 * Counts are derived from the English rather than pinned to a chosen phrasing —
 * three assertions this month failed because they asserted the translator's
 * wording instead of the source's fact.
 */
const english = getCase('the-listener')!;
const script = applyCaseText(english, theListenerEs);

const body = (id: string): string =>
  script.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const englishBody = (id: string): string =>
  english.threads.flatMap((t) => t.messages).find((m) => m.id === id)?.body ?? '';
const revelation = (id: string): string =>
  script.contradictions.find((x) => x.id === id)?.revelation ?? '';
const press = (id: string): string =>
  script.confrontation?.beats.find((b) => b.id === id)?.press ?? '';
const chip = (id: string): string =>
  script.threads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.claims ?? [])
    .find((c) => c.id === id)?.label ?? '';

const englishProse = [...caseTextEntries(english).values()].join('\n');
const allProse = [...caseTranslationEntries(theListenerEs).values()].join('\n');
const occurrences = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1;

describeCaseContract(script);

describe('El escuchante (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theListenerEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theListenerEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theListenerEs)];
    for (const [path, value] of entries) {
      expect(value.trim(), `${path} is blank`).not.toBe('');
      expect(value.includes("'"), `${path} uses a straight apostrophe`).toBe(false);
    }

    const seen = new Map<string, string>();
    for (const [path, value] of entries.filter(
      ([p]) => !/^(character|place|object|thread)\./.test(p) && p !== 'title',
    )) {
      expect(seen.get(value), `${path} repeats the prose at ${seen.get(value) ?? ''}`).toBeUndefined();
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
    for (const c of script.threads.flatMap((t) => t.messages).flatMap((m) => m.claims ?? [])) {
      const times = digitTimes(c.label);
      if (times.length === 0) continue;

      const start = clock(c.window.start);
      const ends = c.window.end % 1440 === 0 ? ['24:00', clock(c.window.end)] : [clock(c.window.end)];
      const spansWindow = [[start], ...ends.map((e) => [start, e])].some(
        (f) => f.join('|') === times.join('|'),
      );
      const inside = times.length === 1 && times[0]! >= start && times[0]! <= clock(c.window.end);

      expect(
        spansWindow || inside,
        `claim ${c.id} chip says ${times.join('–')} but the engine holds ${start}–${clock(c.window.end)}`,
      ).toBe(true);
    }
  });

  it('still loads, so no cross-reference was disturbed', () => {
    expect(() => loadCase(script)).not.toThrow();
  });
});

describe('El escuchante (es) — the alias, at the moment it lands', () => {
  /**
   * The count is the whole arc.
   *
   * `Keeper` appears capitalised exactly twice in the English — Mairi in m9 and
   * the confession — and twice more in lowercase, because the player types in
   * lowercase and has for fifteen packs. arcAlias.test.ts counts the capitalised
   * string, so capitalising the player's two would make four and lowercasing
   * Mairi's would make one. Both registers are derived from the English rather
   * than chosen.
   */
  it('keeps the capitalised alias count identical to the English', () => {
    expect(occurrences(allProse, 'Keeper')).toBe(occurrences(englishProse, 'Keeper'));
    expect(occurrences(allProse, 'Keeper')).toBe(2);
  });

  it('keeps the player s lowercase alias lowercase, which is what makes the count work', () => {
    expect(occurrences(allProse, 'keeper')).toBe(occurrences(englishProse, 'keeper'));
    expect(body('l6')).toContain('el keeper');
    expect(body('m3')).toContain('el keeper');
    expect(body('m9')).toContain('el Keeper');
    expect(script.confrontation?.confession).toContain('el Keeper');
  });

  /**
   * He has no name and does not get one. `Número desconocido` is the same string
   * the coda `from` uses in Packs 6, 9 and 12, so fifteen packs of a new number
   * every time reads as one continuous absence. DS Nkemdi says the name out
   * loud, once, which is where it belongs.
   */
  it('leaves him nameless everywhere except the one message that names him', () => {
    expect(script.characters.find((c) => c.id === 'listener')?.name).toBe('Número desconocido');
    expect(script.threads.find((t) => t.id === 't-listener')?.title).toBe('Número desconocido');
    expect(body('k7')).toContain('John Fettes');
    expect(script.solution.epilogue).toContain('John Fettes');

    // Nobody addresses him by name, and no chip carries one.
    for (const id of ['c-listener-never', 'c-listener-wording', 'c-listener-home']) {
      expect(chip(id)).not.toContain('Fettes');
    }
    expect(chip('c-listener-box')).toContain('El que llamó');
  });
});

describe('El escuchante (es) — the two verbs', () => {
  /**
   * The arc turns on one word against another, and a player is being asked to
   * notice nothing else. `mandados` is what a temp would have said; `ya los
   * tenían los auditores` is what she was actually told. Both have to be the
   * same words in Mairi's memory, in his correction, and in the proof.
   */
  it('keeps the sent-versus-already-with-them distinction in every place it is made', () => {
    expect(body('m4')).toContain('ya les había mandado los papeles');
    expect(body('l11')).toContain('mandados');
    expect(body('l12')).toContain('Mandados es una cosa que se puede parar');
    expect(body('l12')).toContain('ya los tenían los auditores');

    const ardnoe = revelation('x-ardnoe');
    expect(ardnoe).toContain('mandados');
    expect(ardnoe).toContain('ya los tenían los auditores');
    expect(press('z-ardnoe')).toContain('mandados');

    // And why the difference did the work, which is the sentence that makes it
    // a technique rather than a slip.
    expect(body('l12')).toContain('la mañana era lo único que ella creía que le quedaba');
  });

  /**
   * The first clue in the game, re-recorded here because claims cannot cross
   * case scripts. The pair is one verb apart and shares the `ruth-papers` group.
   */
  it('keeps the papers pair one verb apart on the chips', () => {
    expect(chip('c-papers-sent')).toContain('ya había mandado los papeles');
    expect(chip('c-papers-kept')).toContain('guardó los papeles en su propio cuaderno');
    expect(revelation('x-papers')).toContain('La primera pista del juego');
    expect(body('k2')).toContain('No se le mandó nada a ningún auditor');
    expect(body('k3')).toContain('no hubo eventuales');
  });

  /**
   * Ninety-four seconds is the other half of the conviction, and it is spoken
   * rather than logged everywhere the English speaks it. Derived count, so a
   * translator cannot quietly drop one of the six.
   */
  it('says ninety-four seconds as often as the English does', () => {
    expect(occurrences(allProse.toLowerCase(), 'noventa y cuatro segundos')).toBe(
      occurrences(englishProse.toLowerCase(), 'ninety-four seconds'),
    );
    expect(body('k6')).toContain('no se ha publicado nunca');
    expect(revelation('x-box')).toContain('antes de que nadie se la pidiera');
  });

  /** Only the line records carry a digit clock time, exactly as in the English. */
  it('lets only the line records write a time in digits', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['k5']);
    expect(digitTimes(body('k5'))).toEqual(['21:31']);
    for (const t of [revelation('x-box'), press('z-box')]) {
      expect(t).toContain('21:31');
    }
  });
});

describe('El escuchante (es) — Pack 1, quoted back', () => {
  /**
   * Ruth's last message is word for word her last message in Pack 1, so it is
   * copied from `es/the-lighthouse.ts` character for character rather than
   * retranslated. A player who did the tutorial reads it twice and has to
   * recognise it the second time.
   */
  it('reproduces Ruth s last message exactly as Pack 1 shipped it', () => {
    expect(body('r6')).toBe(
      'me subo a la torre, la lámpara está dando guerra otra vez. cuarenta años automatizada y sigue queriendo a alguien de pie al lado',
    );
  });

  /**
   * And her voice is Pack 1's, not this locale's.
   *
   * Her English drops apostrophes, which everywhere else in Spanish would mean
   * dropping accents. Pack 1 gives her `lámpara` and `está`, so no accent axis
   * was applied to her here — matching her earlier self beats applying a locale
   * rule she was never subject to.
   */
  it('keeps Ruth lowercase, unfinished, accented, and capitalising people', () => {
    // Derived from the English rather than assumed: she opens lowercase in
    // every message except r5, which opens on the capitalised initial of the
    // friend she cannot bring herself to name in full. Asserting a blanket
    // lowercase rule here failed, and the pack was right.
    for (const id of ['r2', 'r3', 'r4', 'r5', 'r6']) {
      expect(/^[a-z]/.test(body(id)), `${id} does not open the way the English does`).toBe(
        /^[a-z]/.test(englishBody(id)),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    for (const id of ['r3', 'r5', 'r6']) {
      expect(/[áéíóú]/.test(body(id)), `${id} lost an accent Pack 1 gives her`).toBe(true);
    }
    // She capitalises the friend she cannot bring herself to name in full.
    expect(body('r5')).toContain('M es mi amiga');
  });

  /** Pack 1's nouns, so the callback lands on somebody who played it. */
  it('reuses Pack 1 s words for the trust, the auditors and the lighthouse', () => {
    expect(body('r2')).toContain('patronato');
    expect(body('k2')).toContain('Patronato');
    expect(body('k3')).toContain('Patronato del Faro de Ardnoe');
    expect(body('l6')).toContain('auditores');
    expect(revelation('x-papers')).toContain('auditores');
    expect(script.places.find((p) => p.id === 'tower')?.name).toBe('el faro');
    expect(script.places.find((p) => p.id === 'cafe')?.name).toBe('el café');
  });
});

describe('El escuchante (es) — the names', () => {
  it('translates the places that are descriptions', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('ardnoe')).toBe('Ardnoe');
    expect(place('callbox')).toBe('la cabina de la carretera de Kilmorack');
    expect(place('home')).toBe('su piso de Kirkcaldy');
    expect(place('hospital')).toBe('el Vale of Leven, planta 6');
  });

  it('speaks every place name somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theListenerEs)]
      .filter(([p]) => !/^(character|place|object|thread)\./.test(p))
      .map(([, v]) => v)
      .join('\n')
      .toLowerCase();

    for (const p of script.places) {
      const head = p.name.replace(/^(el|la|los|las|su) /, '').split(/[ ,]/)[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * Spanish `al` and `del` swallow a masculine article. This has shipped as a
   * real defect in two locales, so the three masculine places are each said in
   * full at least once.
   */
  it('says the lighthouse, the cafe and the hospital in full, uncontracted', () => {
    expect(body('k2')).toContain('en el faro');
    expect(revelation('x-box')).toContain('El café');
    expect(body('b7')).toContain('en el Vale of Leven');
    for (const id of ['c-listener-box', 'c-beth-box']) {
      expect(chip(id)).toContain('la cabina de la carretera de Kilmorack');
    }
    // The digit in ward 6 stays a digit.
    expect(chip('c-beth-hospital')).toContain('planta 6');
    expect(body('b7')).toContain('planta 6');
  });
});

describe('El escuchante (es) — the player has no gender', () => {
  /**
   * This pack is the worst offender in the game: the English calls the player
   * `her` twice, in l3 and in the confession. That is a third-person leak
   * playerNeutral.test.ts cannot see, and both are rebuilt rather than resolved.
   * Nothing else in the build would notice if either were reverted.
   */
  it('keeps the version-of-you line agreeing with the version, not the reader', () => {
    // `la` agrees with `una versión`. The English sentence survives whole.
    expect(body('l3')).toContain('una versión de ti');
    // `la` is the whole guard. A Spanish perfect participle after `haber` never
    // inflects, so `conocido` here says nothing about anybody — the pronoun is
    // the only part of the sentence that could have picked a side, and it
    // agrees with `versión`.
    expect(body('l3')).toContain('la he conocido');
    expect(body('l3')).not.toMatch(/\blo he conocido\b/);
  });

  it('keeps the confession from telling the player what they are', () => {
    const confession = script.confrontation?.confession ?? '';
    // `la mejor cabeza de detective` is feminine by `cabeza` and silent about
    // the reader; `un detective extraordinario` would not be.
    expect(confession).toContain('la mejor cabeza de detective');
    expect(confession).toContain('no me ha fallado ni una sola vez');
    // The neuter `lo` is the only form of this sentence that picks no side.
    expect(confession).toContain('Eres lo mejor que hay');
    expect(confession).not.toMatch(/\b(la|el) mejor detective\b/);
  });

  it('describes the player only by what they did', () => {
    expect(script.briefing?.opening).toContain('Era tu tía');
    expect(script.briefing?.opening).toContain('Llegaste en el último ferry');
    expect(script.briefing?.causeOfDeath).toContain('Fue tu primer caso a la vuelta');
    // `mejor` does not inflect for gender, which is why this one is safe as is.
    expect(script.confrontation?.deflections[0]).toContain('Eres mejor que esto');
  });
});

describe('El escuchante (es) — the voices', () => {
  const RUTH = ['r2', 'r3', 'r4', 'r5', 'r6'];
  const WRITTEN = [
    'l1', 'l2', 'l3', 'l4', 'l8', 'l9', 'l11', 'l12', 'l14', 'l15', 'l16',
    'k1', 'k2', 'k3', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10', 'k11', 'r1',
    'm1', 'm2', 'm4', 'm5', 'm6', 'm8', 'm9',
    'b1', 'b2', 'b3', 'b4', 'b6', 'b7', 'b8', 'b9', 'b10',
  ];
  const YOU = ['l5', 'l6', 'l7', 'l10', 'l13', 'k4', 'm3', 'm7', 'b5'];

  it('keeps everybody but Ruth and the player writing in finished sentences', () => {
    for (const id of WRITTEN) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    // The shortest message in the game, and it is his.
    expect(body('l8')).toBe('No.');
  });

  it('keeps the player terse, in the case where they finally answer him', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });

  /** Ruth is checked against Pack 1 above; this pins that she is the only one. */
  it('gives the lowercase archive voice to Ruth alone', () => {
    for (const id of RUTH) {
      expect(body(id).endsWith('.')).toBe(false);
    }
    for (const id of ['r1', 'k1', 'm1', 'b1']) {
      expect(body(id).endsWith('.'), `${id} has taken Ruth s register`).toBe(true);
    }
  });
});

describe('El escuchante (es) — the ending', () => {
  /**
   * The motive is that he is checking, not that he is cruel, and the pack does
   * not work if it lands as sadism. Both halves live in different threads.
   */
  it('keeps the motive about finding out', () => {
    expect(body('l16')).toContain('Es la única manera de averiguarlo');
    expect(body('b9')).toContain('Estaba comprobando');
    expect(body('b10')).toContain('Vuelve para ver cómo salió');
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('1996');
    expect(motive).toContain('solo cuenta cuando alguien ha demostrado lo que fue');
    expect(press('z-why')).toContain('averiguando si te habías equivocado');
  });

  /** Eleven box files, one per person, and a twelfth with no papers in it. */
  it('keeps the box files countable', () => {
    expect(body('l4')).toContain('Los he guardado todos');
    expect(script.confrontation?.confession).toContain('Los he guardado a todos');
    const epilogue = script.solution.epilogue;
    expect(epilogue).toContain('once cajas archivadoras');
    expect(epilogue).toContain('cada una una persona');
    expect(epilogue).toContain('duodécima');
    expect(epilogue).toContain('llevaba tu nombre');
  });

  /**
   * Beth is the red herring and is every clue at once, which is the point of
   * her. She has to be cleared and the case must not require proving it.
   */
  it('clears the woman who is every clue at once', () => {
    expect(revelation('x-beth')).toContain('Es todas las pistas a la vez');
    expect(body('b6')).toContain('2014');
    expect(body('b7')).toContain('Ingresada, no de visita');
    expect(script.solution.requiredContradictionIds).not.toContain('x-beth');
    expect(script.solution.killerId).toBe('listener');
  });

  /**
   * The last voice in fifteen packs is the first killer, and not him. A coda
   * from a caught man would take back the finale's promise.
   */
  it('gives the last word to Mairi Bell', () => {
    expect(script.coda?.from).toBe('Mairi Bell');
    expect(script.coda?.messages).toHaveLength(5);
    expect(script.coda?.messages[2]).toContain('entonces ya lo sabes');
    expect(script.coda?.messages[4]).toContain('Gracias por preguntar');
    // The four words, in her mouth twice, which is how she has carried them.
    expect(body('m6')).toContain('entonces ya lo sabes');
    expect(body('m6')).toContain('Cuatro palabras');
  });

  /** DS Nkemdi names Mairi, which is the only reason her thread opens. */
  it('still passes on the request in the message that finds her', () => {
    expect(body('k11')).toContain('Mairi Bell');
  });
});
