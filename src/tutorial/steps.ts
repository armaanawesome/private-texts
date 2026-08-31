import { DEMO_CASE_ID } from '@content/cases';
import type { StringKey } from '@/i18n/strings';

/**
 * The walkthrough, as a rule read off the save rather than a counter written to it.
 *
 * ## Why there is no stored step number
 *
 * The first version of this was five full-screen pages shown before the game
 * started, and it taught the controls somewhere the controls did not exist. The
 * player read "hold a message to pin it" against a drawing of a message, then
 * arrived in a case and had to remember it. Teaching a gesture away from the
 * thing it acts on is the expensive way to be forgotten.
 *
 * So the walkthrough now runs inside the Bakehouse, on the real inbox and the
 * real board, and each line is answered by doing the thing rather than by
 * tapping Next. That makes a stored step index not merely unnecessary but
 * wrong: the save already records exactly how far the player has got, and a
 * second copy of that fact is a second copy to get out of sync. Reading it
 * instead means the prompt is correct after a crash, after a reinstall that
 * restores a save, after a sync from another device, and on replay — none of
 * which a counter survives without code written specially to make it.
 *
 * ## Why only the Bakehouse
 *
 * The demo case is built so that exactly one pair of claims fires and two
 * near-misses correctly refuse to, which is what makes it safe to say "pin a
 * second claim" and be sure the player can. In any other case that line could
 * send somebody hunting through four threads for a contradiction that is three
 * conversations away.
 */

/** Which screen is asking. Each one hosts its own slice of the walkthrough. */
export type TutorialScreen = 'threads' | 'thread' | 'board' | 'accuse';

export interface TutorialStep {
  /** Stable id, for keys and for tests to name a step without quoting its prose. */
  readonly id: string;
  /**
   * The i18n key of the line to show. Never the line itself — this ships in five
   * languages.
   *
   * Typed as `StringKey` rather than `string`, which is a type-only import and
   * so costs nothing at runtime. It buys the thing worth having: a step whose
   * key is not in the catalogue fails the typecheck here, instead of rendering
   * the raw key at a player somewhere inside the demo case.
   */
  readonly key: StringKey;
}

const OPEN_THREAD: TutorialStep = { id: 'open-thread', key: 'tutorial.openThread' };
const TAP_TO_READ: TutorialStep = { id: 'tap-to-read', key: 'tutorial.tapToRead' };
const HOLD_TO_PIN: TutorialStep = { id: 'hold-to-pin', key: 'tutorial.holdToPin' };
const COMPARE: TutorialStep = { id: 'compare', key: 'tutorial.compare' };
const NAME_THEM: TutorialStep = { id: 'name-them', key: 'tutorial.nameThem' };

/** Every step, in the order a player meets them. Exported for the i18n coverage test. */
export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  OPEN_THREAD,
  TAP_TO_READ,
  HOLD_TO_PIN,
  COMPARE,
  NAME_THEM,
];

/** How many messages have to be read before the pin prompt replaces the tap prompt. */
const READS_BEFORE_PIN = 3;

export interface TutorialInput {
  /** The open case. Undefined while the script is still loading. */
  readonly caseId: string | undefined;
  readonly screen: TutorialScreen;
  /** The player pressed "Got it". A preference, so it holds across cases and launches. */
  readonly dismissed: boolean;
  readonly readCount: number;
  readonly pinnedCount: number;
  readonly provedCount: number;
  /** This case has been solved before. */
  readonly solved: boolean;
}

/**
 * The one line to show right now, or null for none.
 *
 * Null is the overwhelmingly common answer — every case but one, every player
 * who has pressed Got it, and every screen where the player has already done
 * the thing. The coach strip renders nothing at all in that case, which is why
 * this returns a step rather than a visibility flag: there is no empty bar.
 */
export function tutorialStepFor(input: TutorialInput): TutorialStep | null {
  if (input.caseId !== DEMO_CASE_ID) return null;
  if (input.dismissed) return null;
  /*
   * Silent on a replay. A player reopening a case they have already closed is
   * not learning the controls, and the prompts would reappear from the top
   * because a replay legitimately resets the counts this function reads.
   */
  if (input.solved) return null;

  switch (input.screen) {
    case 'threads':
      // Only before the first message. After that the inbox is self-evident and
      // the prompt would be sitting on the screen the player is trying to leave.
      return input.readCount === 0 ? OPEN_THREAD : null;

    case 'thread':
      // Both of these end at the first pin, because pinning is what the second
      // one asks for and the first is only there to get them far enough down the
      // conversation to have something worth pinning.
      if (input.pinnedCount > 0) return null;
      return input.readCount < READS_BEFORE_PIN ? TAP_TO_READ : HOLD_TO_PIN;

    case 'board':
      return input.provedCount === 0 ? COMPARE : null;

    case 'accuse':
      /*
       * Withheld until something is proved. Arriving here early is a normal way
       * to look around, and "now name them" said to a player holding no
       * evidence is advice that gets them refused.
       */
      return input.provedCount > 0 ? NAME_THEM : null;
  }
}
