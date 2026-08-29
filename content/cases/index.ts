import { loadCase, type CaseScript } from '@/engine';
import { tutorialRaw } from './tutorial';
import { theLighthouseRaw } from './the-lighthouse';
import { theUnderstudyRaw } from './the-understudy';
import { theNightRoundRaw } from './the-night-round';
import { deepFieldRaw } from './deep-field';
import { theWakeRaw } from './the-wake';
import { theLongCourseRaw } from './the-long-course';
import { theBothyRaw } from './the-bothy';
import { sundayServiceRaw } from './sunday-service';
import { theCutRaw } from './the-cut';
import { openMicRaw } from './open-mic';
import { theAllotmentsRaw } from './the-allotments';
import { theHelplineRaw } from './the-helpline';
import { theReunionRaw } from './the-reunion';
import { theNightFerryRaw } from './the-night-ferry';
import { theListenerRaw } from './the-listener';

/**
 * Every case, validated at module load.
 *
 * loadCase throws on a dangling reference, so a broken case fails at startup
 * rather than halfway through someone’s playthrough. That is the whole point of
 * validating here instead of lazily.
 */
export const CASES: readonly CaseScript[] = [
  // First, so it heads the case-select grid. It is not one of the fifteen —
  // ledger.test.ts holds it out of the pack rules by id.
  loadCase(tutorialRaw),
  loadCase(theLighthouseRaw),
  loadCase(theUnderstudyRaw),
  loadCase(theNightRoundRaw),
  loadCase(deepFieldRaw),
  loadCase(theWakeRaw),
  loadCase(theLongCourseRaw),
  loadCase(theBothyRaw),
  loadCase(sundayServiceRaw),
  loadCase(theCutRaw),
  loadCase(openMicRaw),
  loadCase(theAllotmentsRaw),
  loadCase(theHelplineRaw),
  loadCase(theReunionRaw),
  loadCase(theNightFerryRaw),
  loadCase(theListenerRaw),
];

/**
 * The demo case: first in the order, free, and where onboarding lands.
 *
 * Read off the case rather than written out again, so the id cannot drift from
 * the thing it names. Both the walkthrough and the post-sign-in hand-off route
 * here, and `CASES[0]` would say the same thing less clearly and need a
 * non-null assertion to satisfy noUncheckedIndexedAccess.
 */
export const DEMO_CASE_ID = tutorialRaw.id;

export function getCase(caseId: string): CaseScript | undefined {
  return CASES.find((c) => c.id === caseId);
}
