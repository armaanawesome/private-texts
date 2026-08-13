import type { CaseScript, Claim, Message } from '@/engine';

/**
 * Per-locale case prose.
 *
 * A case is not a string table. It is prose with a solvability contract
 * attached: the engine matches on ids and structured predicates, so translating
 * a message body cannot break the *logic*, but it can absolutely break the
 * *player*. A Spanish message that says half past three against a claim chip
 * that says 03:10 leaves the case unsolvable by reasoning, and every test in the
 * engine still passes. That is the failure this module is shaped around.
 *
 * The shape is the defence. A translation carries prose and nothing else, keyed
 * by the ids the English case already uses:
 *
 *   messages: { r4: '…' }        NOT  messages: [{ id: 'r4', sentAt: 138, body: '…' }]
 *
 * There is no field here for a window, a predicate, a sentAt, a parentId or an
 * id-as-value. A translator therefore cannot move a claim, re-time a message or
 * rename an id, because there is nowhere to write it down. Ids are keys, never
 * values: an unknown key matches nothing and is discarded, a missing key falls
 * through to English. Neither can add or remove an id from the case.
 *
 * Fallback works exactly like the UI catalogue in src/i18n/translate.ts — the
 * locale's text, then English — with one deliberate difference: a value that is
 * empty *or* whitespace-only counts as absent. A blank UI label is a bad screen;
 * a blank message bubble is a missing piece of evidence.
 *
 * Partial translations resolve correctly, but a translation *registered to ship*
 * must be complete, and caseText.test.ts enforces that. Half a Spanish case is
 * worse than none: the player reads six messages in Spanish, hits one in
 * English, and cannot tell whether the switch means something.
 */
export interface CaseTranslation {
  readonly title?: string;
  readonly blurb?: string;
  /**
   * Entity names, by id.
   *
   * Names are usually left alone — a person or a business is the same person or
   * business in every language, and the player matches the name on a claim chip
   * against the name in a message. Descriptive names are the exception: a case
   * whose places are called "the back yard" and "the garage on the bypass"
   * reads as machine output if those phrases stay English inside Spanish prose.
   *
   * Either way the decision is written down. A complete translation lists every
   * character and place, so "we kept this name on purpose" is visible in review
   * rather than indistinguishable from an oversight, and the naming test then
   * holds the prose to whichever choice was made.
   */
  readonly characters?: Readonly<Record<string, string>>;
  readonly places?: Readonly<Record<string, string>>;
  readonly objects?: Readonly<Record<string, string>>;
  /** Thread id to thread title. */
  readonly threads?: Readonly<Record<string, string>>;
  /** Message id to message body. */
  readonly messages?: Readonly<Record<string, string>>;
  /** Claim id to the short label the player pins on the board. */
  readonly claims?: Readonly<Record<string, string>>;
  /** Contradiction id to the revelation shown once it is proven. */
  readonly contradictions?: Readonly<Record<string, string>>;
  /** Motive id to its summary. */
  readonly motives?: Readonly<Record<string, string>>;
  readonly briefing?: {
    readonly causeOfDeath?: string;
    readonly ruling?: string;
    readonly opening?: string;
  };
  readonly confrontation?: {
    readonly opening?: string;
    /** Beat id to that beat's two lines. */
    readonly beats?: Readonly<
      Record<string, { readonly press?: string; readonly rebuttal?: string }>
    >;
    /**
     * Positional, because a deflection has no id — it is one of a bag of lines
     * the killer reaches for. Index i replaces index i and the array is never
     * lengthened or shortened, so a translator cannot delete the killer's third
     * answer by supplying two lines.
     */
    readonly deflections?: readonly string[];
    readonly confession?: string;
  };
  readonly coda?: { readonly from?: string; readonly messages?: readonly string[] };
  /** solution.epilogue, flattened — the rest of `solution` is machinery. */
  readonly epilogue?: string;
}

/** Absent, empty and whitespace-only all mean "no translation, use English". */
function pick(translated: string | undefined, english: string): string {
  return translated !== undefined && translated.trim() !== '' ? translated : english;
}

function fromTable(
  table: Readonly<Record<string, string>> | undefined,
  id: string,
  english: string,
): string {
  return pick(table?.[id], english);
}

/**
 * English lines, replaced one for one by index. Length always comes from the
 * English, so a short or long translated array cannot change how many lines
 * exist.
 */
function byPosition(
  translated: readonly string[] | undefined,
  english: readonly string[],
): readonly string[] {
  return english.map((line, i) => pick(translated?.[i], line));
}

/**
 * Rebuild a case with its prose replaced.
 *
 * Takes the translation rather than a locale tag so this stays a pure function
 * of two arguments — the registry lookup lives in ./index.ts, which keeps this
 * module free of any import cycle and directly testable with a hand-written
 * partial translation.
 *
 * `undefined` returns the original object by reference. Every untranslated
 * locale and every untranslated case takes that path, which is all of them but
 * one today, so it is worth not cloning sixteen cases to change nothing.
 */
export function applyCaseText(script: CaseScript, text: CaseTranslation | undefined): CaseScript {
  if (text === undefined) return script;

  const localiseClaim = (c: Claim): Claim => ({
    ...c,
    label: fromTable(text.claims, c.id, c.label),
  });

  const localiseMessage = (m: Message): Message =>
    m.claims === undefined
      ? { ...m, body: fromTable(text.messages, m.id, m.body) }
      : {
          ...m,
          body: fromTable(text.messages, m.id, m.body),
          claims: m.claims.map(localiseClaim),
        };

  const briefing = script.briefing;
  const confrontation = script.confrontation;
  const coda = script.coda;

  return {
    ...script,
    title: pick(text.title, script.title),
    blurb: pick(text.blurb, script.blurb),
    characters: script.characters.map((c) => ({
      ...c,
      name: fromTable(text.characters, c.id, c.name),
    })),
    places: script.places.map((p) => ({ ...p, name: fromTable(text.places, p.id, p.name) })),
    objects: script.objects.map((o) => ({ ...o, name: fromTable(text.objects, o.id, o.name) })),
    threads: script.threads.map((t) => ({
      ...t,
      title: fromTable(text.threads, t.id, t.title),
      messages: t.messages.map(localiseMessage),
    })),
    contradictions: script.contradictions.map((x) => ({
      ...x,
      revelation: fromTable(text.contradictions, x.id, x.revelation),
    })),
    motives: script.motives.map((m) => ({
      ...m,
      summary: fromTable(text.motives, m.id, m.summary),
    })),
    ...(briefing === undefined
      ? {}
      : {
          briefing: {
            ...briefing,
            causeOfDeath: pick(text.briefing?.causeOfDeath, briefing.causeOfDeath),
            ruling: pick(text.briefing?.ruling, briefing.ruling),
            opening: pick(text.briefing?.opening, briefing.opening),
          },
        }),
    ...(confrontation === undefined
      ? {}
      : {
          confrontation: {
            ...confrontation,
            opening: pick(text.confrontation?.opening, confrontation.opening),
            beats: confrontation.beats.map((b) => ({
              ...b,
              press: pick(text.confrontation?.beats?.[b.id]?.press, b.press),
              rebuttal: pick(text.confrontation?.beats?.[b.id]?.rebuttal, b.rebuttal),
            })),
            deflections: byPosition(text.confrontation?.deflections, confrontation.deflections),
            confession: pick(text.confrontation?.confession, confrontation.confession),
          },
        }),
    ...(coda === undefined
      ? {}
      : {
          coda: {
            from: pick(text.coda?.from, coda.from),
            messages: byPosition(text.coda?.messages, coda.messages),
          },
        }),
    solution: {
      ...script.solution,
      epilogue: pick(text.epilogue, script.solution.epilogue),
    },
  };
}

/**
 * Every translatable string in a case, as a flat map of dotted path to English.
 *
 * Flat and dotted for the same reason src/i18n/strings.ts is: the test that
 * matters compares key *sets*, and a flat set compares with one `Set` equality.
 * A recursive walk over nested objects would need to be right, and the failure
 * mode of getting it subtly wrong is a missing translation the test reports as
 * present.
 *
 * Empty English is skipped, and that is load-bearing rather than tidy. The last
 * confrontation beat carries `rebuttal: ''` on purpose — the killer has stopped
 * answering, and the confession follows the silence. Listing it as translatable
 * would invite someone to fill it in, and a line there would break the scene.
 * Nothing to translate means no key, and a translation that supplies one is
 * flagged as an extra.
 */
export function caseTextEntries(script: CaseScript): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  const put = (path: string, english: string) => {
    if (english.trim() !== '') out.set(path, english);
  };

  put('title', script.title);
  put('blurb', script.blurb);

  for (const c of script.characters) put(`character.${c.id}`, c.name);
  for (const p of script.places) put(`place.${p.id}`, p.name);
  for (const o of script.objects) put(`object.${o.id}`, o.name);

  for (const t of script.threads) {
    put(`thread.${t.id}`, t.title);
    for (const m of t.messages) {
      put(`message.${m.id}`, m.body);
      for (const c of m.claims ?? []) put(`claim.${c.id}`, c.label);
    }
  }

  for (const x of script.contradictions) put(`contradiction.${x.id}`, x.revelation);
  for (const m of script.motives) put(`motive.${m.id}`, m.summary);

  if (script.briefing) {
    put('briefing.causeOfDeath', script.briefing.causeOfDeath);
    put('briefing.ruling', script.briefing.ruling);
    put('briefing.opening', script.briefing.opening);
  }

  if (script.confrontation) {
    put('confrontation.opening', script.confrontation.opening);
    for (const b of script.confrontation.beats) {
      put(`confrontation.beat.${b.id}.press`, b.press);
      put(`confrontation.beat.${b.id}.rebuttal`, b.rebuttal);
    }
    script.confrontation.deflections.forEach((d, i) => put(`confrontation.deflection.${i}`, d));
    put('confrontation.confession', script.confrontation.confession);
  }

  if (script.coda) {
    put('coda.from', script.coda.from);
    script.coda.messages.forEach((m, i) => put(`coda.message.${i}`, m));
  }

  put('epilogue', script.solution.epilogue);
  return out;
}

/** The same flat view of a translation, so the two key sets are comparable. */
export function caseTranslationEntries(text: CaseTranslation): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  const put = (path: string, value: string | undefined) => {
    if (value !== undefined) out.set(path, value);
  };
  const table = (prefix: string, t: Readonly<Record<string, string>> | undefined) => {
    for (const [id, value] of Object.entries(t ?? {})) out.set(`${prefix}.${id}`, value);
  };

  put('title', text.title);
  put('blurb', text.blurb);

  table('character', text.characters);
  table('place', text.places);
  table('object', text.objects);
  table('thread', text.threads);
  table('message', text.messages);
  table('claim', text.claims);
  table('contradiction', text.contradictions);
  table('motive', text.motives);

  put('briefing.causeOfDeath', text.briefing?.causeOfDeath);
  put('briefing.ruling', text.briefing?.ruling);
  put('briefing.opening', text.briefing?.opening);

  put('confrontation.opening', text.confrontation?.opening);
  for (const [id, beat] of Object.entries(text.confrontation?.beats ?? {})) {
    put(`confrontation.beat.${id}.press`, beat.press);
    put(`confrontation.beat.${id}.rebuttal`, beat.rebuttal);
  }
  (text.confrontation?.deflections ?? []).forEach((d, i) =>
    out.set(`confrontation.deflection.${i}`, d),
  );
  put('confrontation.confession', text.confrontation?.confession);

  put('coda.from', text.coda?.from);
  (text.coda?.messages ?? []).forEach((m, i) => out.set(`coda.message.${i}`, m));

  put('epilogue', text.epilogue);
  return out;
}

/**
 * How much of a case is translated, 0 to 1.
 *
 * Mirrors `coverage` in src/i18n/translate.ts, and reports rather than gates for
 * the same reason: the case-select screen wants to say which cases are in the
 * player's language, and that is a fact about the build, not a rule about it.
 * The rule that a *shipped* translation must be whole lives in the test.
 */
export function caseTextCoverage(script: CaseScript, text: CaseTranslation | undefined): number {
  const english = caseTextEntries(script);
  if (english.size === 0) return 1;
  if (text === undefined) return 0;

  const translated = caseTranslationEntries(text);
  let done = 0;
  for (const path of english.keys()) {
    const value = translated.get(path);
    if (value !== undefined && value.trim() !== '') done += 1;
  }
  return done / english.size;
}
