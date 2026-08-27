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
import { theNightFerryEs } from './the-night-ferry';

/**
 * The Spanish Night Ferry, checked on the things a player reasons over.
 *
 * Applied directly rather than through CASE_TRANSLATIONS. What no generic test
 * can see: three ways of writing a time that must never blend into each other,
 * and a port call whose vocabulary has to be identical in the mouth of the man
 * inventing it and the officer refusing it.
 */
const english = getCase('the-night-ferry')!;
const script = applyCaseText(english, theNightFerryEs);

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

const allProse = [...caseTranslationEntries(theNightFerryEs).values()].join('\n');

describeCaseContract(script);

describe('El ferry nocturno (es) — the contract', () => {
  it('translates exactly the ids the English case has, and no others', () => {
    const source = new Set(caseTextEntries(english).keys());
    const translated = new Set(caseTranslationEntries(theNightFerryEs).keys());

    expect([...source].filter((k) => !translated.has(k)), 'missing translations').toEqual([]);
    expect([...translated].filter((k) => !source.has(k)), 'ids the case does not have').toEqual([]);
    expect(caseTextCoverage(english, theNightFerryEs)).toBe(1);
  });

  it('has no blank, duplicated or build-breaking prose', () => {
    const entries = [...caseTranslationEntries(theNightFerryEs)];
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

describe('El ferry nocturno (es) — the call that never happened', () => {
  /**
   * Dougie invents a port call and Senga refuses it, and the player can only
   * lay the two accounts side by side if they use the same words for the same
   * things. One term each: la escala, atracados, la rampa de acceso, largar
   * amarras, la pasarela.
   */
  it('uses one vocabulary for the port call in both mouths', () => {
    expect(body('d5')).toContain('la escala de Kirkwall');
    expect(body('d5')).toContain('atracados');
    expect(body('d5')).toContain('la rampa de acceso');
    expect(body('d5')).toContain('largamos amarras');

    expect(body('s2')).toContain('La escala de Kirkwall se anuló');
    expect(body('s2')).toContain('La rampa de acceso');
    expect(body('s3')).toContain('No se armó ninguna pasarela');
    expect(body('e8')).toContain('La rampa de acceso, averiada');

    const kirkwall = revelation('x-dougie-kirkwall');
    expect(kirkwall).toContain('No hubo escala en Kirkwall');
    expect(kirkwall).toContain('rampa de acceso');
    expect(kirkwall).toContain('ninguna pasarela');
    expect(press('a-kirkwall')).toContain('rampa de acceso');

    // And the blurb, which is the promise the whole pack makes.
    expect(script.blurb).toContain('atracado en Kirkwall');
    expect(script.blurb).toContain('no hizo escala en Kirkwall');
  });

  it('states every load-bearing time exactly where the English does', () => {
    const times: Readonly<Record<string, readonly string[]>> = {
      d3: ['las ocho y media'], // Dougie in the bar
      d5: ['las nueve y media', 'las once menos cuarto'], // and his invented hour ashore
      d8: ['las diez y diez'], // the phone he says he handed in
      g5: ['las nueve y media'], // Sheila putting him in the bar
      m2: ['las ocho y media'], // Hannah arrives
      m6: ['las nueve y cinco'], // and goes out for air
      m7: ['las nueve y veinte'], // he follows her
      e5: ['las nueve y cinco', 'las diez y veinticinco'], // Eck in the hospital cabin
      e8: ['las nueve'], // the announcement
      s2: ['21:00'], // the call dropped
      s5: ['21:04', '23:40'], // the lost property book
      s7: ['21:05', '22:25'], // and the nurse signing Eck in and out
    };
    for (const [id, fragments] of Object.entries(times)) {
      for (const f of fragments) {
        expect(body(id).toLowerCase(), `${id} no longer says "${f}"`).toContain(f.toLowerCase());
      }
    }

    expect(script.briefing?.causeOfDeath).toContain('23:10');
    expect(script.briefing?.opening).toContain('las once y diez');
    for (const t of [revelation('x-phone'), press('a-phone')]) {
      expect(t.toLowerCase()).toContain('diez y diez');
    }
    expect(revelation('x-eck')).toContain('21:05');
    expect(revelation('x-eck')).toContain('22:25');
  });

  /**
   * Three registers, and the middle one convicts him.
   *
   * Hannah was a purser for twenty-six years and writes ship time — four
   * digits, no colon. Senga quotes logs and writes 21:04. Everybody else
   * speaks. If any register bleeds into another, the fact that a document
   * disagrees with a man stops being visible on the page.
   */
  it('keeps the three ways of writing a time apart', () => {
    const digitsIn = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => digitTimes(m.body).length > 0)
      .map((m) => m.id);
    expect(digitsIn).toEqual(['s2', 's5', 's7']);

    // Hannah, and only Hannah, writes ship time.
    const shipTime = script.threads
      .flatMap((t) => t.messages)
      .filter((m) => /\b(1730|2106)\b/.test(m.body))
      .map((m) => m.id);
    expect(shipTime).toEqual(['n4', 'n10']);
    expect(body('n4')).toContain('1730');
    expect(body('n10')).toContain('2106');

    // And Dougie speaks every one of his, which is what a passenger does.
    expect(digitTimes(body('d5'))).toEqual([]);
  });
});

describe('El ferry nocturno (es) — the names', () => {
  it('translates the places that are descriptions and keeps the ship a name', () => {
    const place = (id: string) => script.places.find((p) => p.id === id)?.name;
    expect(place('ship')).toBe('el MV Roost');
    expect(place('bar')).toBe('el bar Magnus');
    expect(place('afterdeck')).toBe('la cubierta de popa');
    expect(place('hospital')).toBe('el camarote enfermería del barco');
    expect(place('kirkwall')).toBe('Kirkwall, atracados');

    expect(script.characters.find((c) => c.id === 'hannah')?.name).toBe('Mamá');
    expect(script.characters.find((c) => c.id === 'marisa')?.name).toBe('Sheila');
  });

  /**
   * Every place a chip names has to be a place some sentence says.
   *
   * `cabins` is excluded deliberately: it carries no claim and the English
   * never names it in prose either, so requiring it here would fail a pack that
   * is correct.
   */
  it('speaks every place a chip names somewhere in the prose', () => {
    const prose = [...caseTranslationEntries(theNightFerryEs)]
      .filter(([p]) => !/^(character|place|object|thread)\./.test(p))
      .map(([, v]) => v)
      .join('\n')
      .toLowerCase();

    for (const p of script.places.filter((x) => x.id !== 'cabins')) {
      const head = p.name.replace(/^(el|la|los|las) /, '').split(/[ ,]/)[0]!.toLowerCase();
      expect(prose.includes(head), `no message ever says "${p.name}"`).toBe(true);
    }
  });

  /**
   * Spanish `del` and `al` swallow a masculine article. This has now shipped as
   * a real defect in two locales, so the two masculine places that carry chips
   * are each said in full at least once.
   */
  it('says the ship and the bar in full, uncontracted', () => {
    expect(body('s3')).toContain('el MV Roost');
    expect(body('d3')).toContain('el bar Magnus');
    expect(chip('c-dougie-aboard')).toContain('MV Roost');
    for (const id of ['c-dougie-bar', 'c-hannah-bar']) {
      expect(chip(id)).toContain('en el bar Magnus');
    }
    for (const id of ['c-hannah-afterdeck', 'c-dougie-afterdeck', 'c-eck-afterdeck']) {
      expect(chip(id)).toContain('en la cubierta de popa');
    }
  });

  /** One unique phone, in two pairs of hands, with one name. */
  it('gives the phone one name and keeps its green case', () => {
    expect(script.objects.find((o) => o.id === 'phone')?.name).toContain('funda verde');
    for (const id of ['c-phone-dougie', 'c-phone-marisa']) {
      expect(chip(id)).toContain('el móvil de Hannah');
    }
    expect(body('d8')).toContain('funda verde');
    expect(body('s5')).toContain('funda verde');
    expect(revelation('x-phone')).toContain('funda verde');
    expect(revelation('x-phone')).toContain('libro de objetos perdidos');
  });
});

describe('El ferry nocturno (es) — the player has no gender', () => {
  /**
   * The English carries a comment on s1 recording that it names the
   * relationship from the dead woman's side. The Spanish follows, and the
   * confrontation opening avoids `ser cuidadoso` — which would agree — by
   * reaching for an impersonal construction instead.
   */
  it('names the relationship from the dead woman s side', () => {
    expect(body('s1')).toContain('porque era tu madre');
    expect(allProse).not.toMatch(/eres su (hijo|hija)/i);
  });

  it('addresses the player without agreeing with them', () => {
    expect(script.confrontation?.opening).toContain('Te conviene tener cuidado');
    expect(script.confrontation?.opening).not.toMatch(/cuidados[oa]\b/);
    expect(script.confrontation?.deflections[2]).toContain('Tu madre se avergonzaría');
    expect(script.briefing?.opening).toContain('ahora vives en Lerwick');
  });

  /**
   * A gendered noun is only a defect when it is an address. `mi hermana`, `mi
   * mujer` and `tu madre` are facts about the speaker or about the victim and
   * must survive — neutralising them would delete real characterisation.
   */
  it('leaves gendered facts about other people alone', () => {
    expect(body('e2')).toContain('mi hermana');
    expect(body('d1')).toContain('Tu madre y yo servimos juntos');
  });
});

describe('El ferry nocturno (es) — the voices', () => {
  const HANNAH = ['n1', 'n3', 'n4', 'n5', 'n6', 'n8', 'n9', 'n10'];
  const SHEILA = ['g2', 'g5', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm9', 'm10'];
  const ECK = ['e1', 'e2', 'e4', 'e5', 'e6', 'e8', 'e9'];
  const FORMAL = [
    'g3', 'd1', 'd3', 'd5', 'd6', 'd8', 'd9',
    'g1', 'g4', 'g6', 's1', 's2', 's3', 's5', 's6', 's7', 's9', 's10',
    ...ECK,
  ];
  const YOU = ['n2', 'n7', 'd2', 'd4', 'd7', 'm8', 'e3', 'e7', 's4', 's8'];

  /** Hannah writes in sentences and finishes — except the last one she sends. */
  it('keeps Hannah finishing every message but her last', () => {
    for (const id of HANNAH) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
    }
    for (const id of HANNAH.filter((x) => x !== 'n10')) {
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
    expect(body('n10').endsWith('x')).toBe(true);
    // The endearment is one whose own gender is fixed, so it marks nobody.
    expect(body('n10')).toContain('cariño');
  });

  /** Sheila is lowercase and never closes, with one word shouted. */
  it('keeps Sheila lowercase, and lets her shout once', () => {
    for (const id of SHEILA) {
      expect(body(id), `${id} is not lowercase except where it shouts`).toBe(
        body(id) === body('m4') ? body(id) : body(id).toLowerCase(),
      );
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
    // The moment the case turns on, and the English shouts here too.
    expect(body('m4')).toContain('ENCANTADA');
    // The denial, repeated. This asserted the substring `no se rió de él` and
    // the translation says `nadie se rió de él` — same fact, different and
    // equally faithful wording for `nobody laughed at him`. The prose was right
    // and the expected string was written against a phrasing nobody used.
    //
    // Derived now: what matters is that Sheila says it twice, as the English
    // does (`nobody laughed at him` … `nobody laughed`), because the repetition
    // is the characterisation — she has gone over it.
    const englishM5 =
      english.threads.flatMap((t) => t.messages).find((m) => m.id === 'm5')?.body ?? '';
    expect((body('m5').match(/se rió/g) ?? []).length).toBe(
      (englishM5.match(/laughed/g) ?? []).length,
    );
    expect(body('m5')).toContain('nadie se rió de él');
  });

  /**
   * Eck is the loss, and this records what replaced it.
   *
   * His English is Scots — `Aye`, `she will have wrote it down`, `kens` — and
   * Spanish has no register that maps onto it without turning a wrongly
   * suspected man into a comic yokel. So the axis moves to the tag: he closes
   * e1 and e8 with a bare `Sí.` where the English puts `Aye.`, and nobody else
   * in the pack ends a message that way.
   */
  it('gives Eck the closing tag and nobody else', () => {
    expect(body('e1').endsWith('Sí.')).toBe(true);
    expect(body('e8').endsWith('Sí.')).toBe(true);
    for (const id of [...HANNAH, ...SHEILA, 'd1', 'd5', 's1', 's9']) {
      expect(body(id).endsWith('Sí.'), `${id} has taken Eck s tag`).toBe(false);
    }
    // And he says the conviction first, which is the character.
    expect(body('e1')).toContain('para que nadie tenga que ir acercándose');
  });

  it('keeps everybody who writes formally writing in sentences', () => {
    for (const id of FORMAL) {
      expect(body(id)[0], `${id} does not start as a written sentence`).toBe(
        body(id)[0]?.toUpperCase(),
      );
      expect(body(id).endsWith('.'), `${id} does not finish its sentence`).toBe(true);
    }
  });

  it('keeps the player terse', () => {
    for (const id of YOU) {
      expect(body(id), `${id} is not lowercase`).toBe(body(id).toLowerCase());
      expect(body(id), `${id} has grown punctuation`).not.toMatch(/[¿¡]/);
      expect(body(id).endsWith('.'), `${id} has grown a full stop`).toBe(false);
    }
  });
});

describe('El ferry nocturno (es) — the arc and the motive', () => {
  /** Pack 14 is standalone. The finale is Pack 15. */
  it('carries no arc content', () => {
    expect(script.coda).toBeUndefined();
    expect(allProse).not.toContain('Keeper');
  });

  /**
   * The motive is proportionate to nothing, and the pack collapses if it reads
   * as humiliation. She was pleased to see him and nobody laughed — both halves
   * have to survive in Sheila's mouth, in the motive and in the confession.
   */
  it('keeps the motive about kindness and not about mockery', () => {
    expect(body('m4')).toContain('le hizo muchísima ilusión verlo');
    expect(body('m5')).toContain('no se rió nadie');
    const motive = script.motives[0]?.summary ?? '';
    expect(motive).toContain('No estaba siendo cruel');
    expect(motive).toContain('Se alegraba');
    expect(press('a-why')).toContain('no se rió nadie');
    expect(script.confrontation?.confession).toContain('No se rió nadie');
    expect(script.confrontation?.confession).toContain('lo empeoró');
  });

  /** The rank he grew in the telling, which is the whole of him. */
  it('keeps the two ranks apart, and the sentence that collapses them', () => {
    expect(body('m3')).toContain('capitán de la marina mercante');
    expect(body('n8')).toContain('Camarero de comedor');
    expect(body('s9')).toContain('personal de fonda');
    expect(body('s9')).toContain('título de competencia');
    expect(script.confrontation?.confession).toContain('Yo llevaba el comedor');
    expect(script.confrontation?.confession).toContain('no lo soy y no lo he sido nunca');
  });

  /**
   * Eck is the red herring and the pack is explicit that he is named because of
   * a conviction from 1979. He has to be cleared and the case must not require
   * proving it.
   */
  it('clears the man everybody starts with', () => {
    expect(body('m10')).toContain('todo el mundo empieza con eck tulloch');
    expect(body('s6')).toContain('lo primero que pensó la tripulación');
    expect(body('s7')).toContain('con la respuesta pegada');
    expect(revelation('x-eck')).toContain('firmado a la entrada y a la salida');
    expect(script.solution.requiredContradictionIds).not.toContain('x-eck');
    expect(script.solution.killerId).not.toBe('eck');
  });

  /** Sheila names Eck, which is the only reason his thread opens. */
  it('still names Eck in the message that finds him', () => {
    expect(body('m10')).toContain('eck tulloch');
  });
});
