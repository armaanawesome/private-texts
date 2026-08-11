/** Minutes elapsed since the case's own epoch (day 1, 00:00). */
export type Minutes = number;

/** A half-open interval [start, end). A point-in-time claim uses end = start + 1. */
export interface TimeWindow {
  readonly start: Minutes;
  readonly end: Minutes;
}

export interface Place {
  readonly id: string;
  readonly name: string;
  /** A place may sit inside another, e.g. "the pier" inside "the harbour". */
  readonly parentId?: string;
}

export interface Character {
  readonly id: string;
  readonly name: string;
  readonly avatarColor: string;
}

/** A thing that can be held, and that only one person can hold at a time. */
export interface CaseObject {
  readonly id: string;
  readonly name: string;
  /**
   * True when only one exists. Two people holding a `unique` object at the same
   * moment is a contradiction; two people both holding "a torch" is not.
   */
  readonly unique: boolean;
}

export type ClaimPredicate =
  | { readonly kind: 'at_place'; readonly placeId: string }
  | { readonly kind: 'with_person'; readonly personId: string }
  | { readonly kind: 'doing'; readonly actionId: string; readonly exclusiveGroup: string }
  | { readonly kind: 'has_object'; readonly objectId: string };

/** A factual assertion extracted from one message. */
export interface Claim {
  readonly id: string;
  /** The character the claim is ABOUT. */
  readonly subject: string;
  /** The character who asserted it — may differ from subject. */
  readonly assertedBy: string;
  readonly predicate: ClaimPredicate;
  readonly window: TimeWindow;
  readonly sourceMessageId: string;
  /** Short player-facing label, e.g. "Nadia was at the studio, 21:40-22:00". */
  readonly label: string;
}

export interface Message {
  readonly id: string;
  readonly threadId: string;
  readonly senderId: string;
  readonly sentAt: Minutes;
  readonly body: string;
  /** Claims this message puts on the record. Most messages emit none. */
  readonly claims?: readonly Claim[];
  /** Thread ids this message unlocks once read. */
  readonly unlocksThreadIds?: readonly string[];
}

export interface Thread {
  readonly id: string;
  readonly title: string;
  readonly participantIds: readonly string[];
  readonly messages: readonly Message[];
  /** Confirmed contradiction ids required before this thread appears. Empty = open from the start. */
  readonly requiresContradictionIds: readonly string[];
  /**
   * Messages that must have been read before this thread appears — someone has
   * to mention a person before you can talk to them.
   *
   * This is what produces a natural chain (first responders, then family, then
   * whoever they name) rather than pure escalation.
   *
   * Content rule: the unlocking message must actually *name* them. If nothing
   * named them, a thread appearing out of nowhere reads as a bug, not a reward.
   */
  readonly requiresReadMessageIds?: readonly string[];
  /** Motives that must be established first. */
  readonly requiresMotiveIds?: readonly string[];
}

/**
 * Why someone would do it.
 *
 * Deliberately not a contradiction: "why would they?" cannot be falsified by
 * pairing two statements, and forcing it through `checkContradiction` would
 * produce verdicts the game cannot explain in one line. It is established by
 * reading instead, which is what makes reading matter as much as pairing.
 */
export interface Motive {
  readonly id: string;
  readonly characterId: string;
  /** Shown once established. */
  readonly summary: string;
  /** Every one of these must have been read. Never empty. */
  readonly establishedByMessageIds: readonly string[];
}

/**
 * How far the player has got.
 *
 * One object rather than a widening argument list, because both thread
 * visibility and the accusation now depend on the same two facts, and motive is
 * derived from `readMessageIds` rather than stored — so there is no third field
 * to keep consistent.
 */
export interface Progress {
  readonly confirmedContradictionIds: readonly string[];
  readonly readMessageIds: readonly string[];
}

/** A contradiction the case author intends the player to find. */
export interface IntendedContradiction {
  readonly id: string;
  readonly claimIdA: string;
  readonly claimIdB: string;
  /** Shown after the player proves it. */
  readonly revelation: string;
}

/**
 * What is NOT in dispute.
 *
 * Shown before the first thread. Stating the settled facts is what makes the
 * disputed ones legible — a claim only contradicts something if you already know
 * what it is supposed to line up with.
 */
export interface CaseBriefing {
  readonly victimId: string;
  readonly foundAt: { readonly placeId: string; readonly minutes: Minutes };
  /** "a fall from the tower stairs" */
  readonly causeOfDeath: string;
  /** What the authorities concluded. The thing the player is about to disprove. */
  readonly ruling: string;
  /** Two sentences of hook. */
  readonly opening: string;
  /** Objects recovered at the scene, by id. Facts, so a later claim can jar. */
  readonly recoveredObjectIds?: readonly string[];
}

/** A thing the player can put to the killer: something they proved, or found. */
export type EvidenceRef =
  | { readonly kind: 'contradiction'; readonly id: string }
  | { readonly kind: 'motive'; readonly id: string };

/** One exchange in the confrontation: the player presses, the killer answers. */
export interface ConfrontationBeat {
  readonly id: string;
  readonly evidence: EvidenceRef;
  /** The player's line when they lay this fact down. */
  readonly press: string;
  /** How the killer answers it — pushing back, until they cannot. */
  readonly rebuttal: string;
}

/**
 * The endgame. After a correct accusation the killer answers, and the player has
 * to lay out what they have, one fact at a time, until there is nothing left to
 * push back with.
 *
 * It is the payoff for the deduction rather than a cutscene: every move is
 * something the player earned, and the confession comes when the evidence runs
 * out, not after a fixed number of turns.
 */
export interface Confrontation {
  /** The killer's first answer to being named. */
  readonly opening: string;
  readonly beats: readonly ConfrontationBeat[];
  /** Used when the player presses something that is not one of the beats. */
  readonly deflections: readonly string[];
  readonly confession: string;
}

/**
 * What arrives after the epilogue.
 *
 * A message from someone who was never in the case, landing once the player
 * thinks the case is over. It carries the campaign arc without touching the
 * case: nothing here gates anything, and a player who ignores it still finished
 * the case correctly.
 */
export interface CaseCoda {
  /** Shown as the sender. Usually not a name. */
  readonly from: string;
  readonly messages: readonly string[];
}

export interface CaseSolution {
  readonly killerId: string;
  /** Every one of these must be confirmed before an accusation can stick. */
  readonly requiredContradictionIds: readonly string[];
  /**
   * Motives that must be established before any accusation is accepted.
   *
   * Checked globally rather than per suspect, deliberately. Checking "does the
   * accused have a motive" would leak: refusing on motive would confirm the
   * player had picked someone whose story is otherwise breakable.
   */
  readonly requiredMotiveIds: readonly string[];
  readonly epilogue: string;
}

export interface CaseScript {
  readonly id: string;
  readonly title: string;
  readonly blurb: string;
  /** Undefined = free. Otherwise the RevenueCat entitlement id that unlocks it. */
  readonly requiredEntitlementId?: string;
  readonly characters: readonly Character[];
  readonly places: readonly Place[];
  /** Things that can be held. Empty for cases with no object axis. */
  readonly objects: readonly CaseObject[];
  /** Why people would do it. Empty for cases with no motive axis. */
  readonly motives: readonly Motive[];
  /** The settled facts, shown before the first thread. */
  readonly briefing?: CaseBriefing;
  /** The endgame. Without one, a correct accusation goes straight to the epilogue. */
  readonly confrontation?: Confrontation;
  /** Arrives after the epilogue. Carries the campaign arc, gates nothing. */
  readonly coda?: CaseCoda;
  readonly threads: readonly Thread[];
  readonly contradictions: readonly IntendedContradiction[];
  readonly solution: CaseSolution;
}
