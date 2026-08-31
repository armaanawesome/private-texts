import { describe, it, expect } from 'vitest';
import { DEMO_CASE_ID, CASES } from '@content/cases';
import { CATALOGUES } from '@/i18n/strings';
import { tutorialStepFor, TUTORIAL_STEPS, type TutorialInput } from './steps';

/**
 * The walkthrough is a rule over the save, so it is testable as one — which is
 * most of the argument for building it this way. The five-page slideshow it
 * replaced could only be checked by launching the app and reading it.
 */

/** A player who has just opened the demo and done nothing. */
const fresh: TutorialInput = {
  caseId: DEMO_CASE_ID,
  screen: 'threads',
  dismissed: false,
  readCount: 0,
  pinnedCount: 0,
  provedCount: 0,
  solved: false,
};

const at = (over: Partial<TutorialInput>) => tutorialStepFor({ ...fresh, ...over });

const EVERY_SCREEN = ['threads', 'thread', 'board', 'accuse'] as const;

describe('tutorialStepFor', () => {
  it('opens by naming the one thing to do on the inbox', () => {
    expect(at({})?.id).toBe('open-thread');
  });

  it('drops the inbox prompt once anything has been read', () => {
    expect(at({ readCount: 1 })).toBeNull();
  });

  it('teaches the tap first, then the hold, in the conversation', () => {
    expect(at({ screen: 'thread', readCount: 0 })?.id).toBe('tap-to-read');
    expect(at({ screen: 'thread', readCount: 1 })?.id).toBe('tap-to-read');
    expect(at({ screen: 'thread', readCount: 3 })?.id).toBe('hold-to-pin');
  });

  /**
   * The pin is the gesture nobody discovers unaided, and it is also the point at
   * which the conversation prompts have done their job. Both of them end here
   * rather than only the second, or a player would be told to hold a message
   * they have already held.
   */
  it('goes quiet in a conversation once something is pinned', () => {
    expect(at({ screen: 'thread', readCount: 9, pinnedCount: 1 })).toBeNull();
    expect(at({ screen: 'thread', readCount: 0, pinnedCount: 1 })).toBeNull();
  });

  it('asks for the comparison on the board until one is proved', () => {
    expect(at({ screen: 'board' })?.id).toBe('compare');
    expect(at({ screen: 'board', provedCount: 1 })).toBeNull();
  });

  /**
   * The accusation prompt is the one that could actively harm a player: told to
   * "say who" while holding nothing, they name somebody, get refused, and learn
   * that the game rejects them rather than that they had skipped a step.
   */
  it('withholds the accusation prompt until something is proved', () => {
    expect(at({ screen: 'accuse' })).toBeNull();
    expect(at({ screen: 'accuse', provedCount: 1 })?.id).toBe('name-them');
  });

  it('says nothing at all in any case but the demo', () => {
    const other = CASES.find((c) => c.id !== DEMO_CASE_ID);
    expect(other).toBeDefined();
    for (const screen of EVERY_SCREEN) {
      expect(at({ caseId: other?.id, screen, provedCount: 1 })).toBeNull();
    }
  });

  it('says nothing while the script is still loading', () => {
    expect(at({ caseId: undefined })).toBeNull();
  });

  it('stops everywhere once the player has pressed Got it', () => {
    for (const screen of EVERY_SCREEN) {
      expect(at({ screen, dismissed: true, provedCount: 1 })).toBeNull();
    }
  });

  /**
   * A replay legitimately resets every count this function reads, so without the
   * `solved` guard a player reopening a case they had already closed would be
   * walked through the controls again from the top.
   */
  it('stops on a case that has already been solved', () => {
    for (const screen of EVERY_SCREEN) {
      expect(at({ screen, solved: true, provedCount: 1 })).toBeNull();
    }
  });
});

describe('tutorial copy', () => {
  it('has a line in every catalogue for every step', () => {
    for (const step of TUTORIAL_STEPS) {
      for (const [tag, catalogue] of Object.entries(CATALOGUES)) {
        const line = (catalogue as Record<string, string>)[step.key];
        expect(line, `${step.key} missing from ${tag}`).toBeTruthy();
      }
    }
  });
});
