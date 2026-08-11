import { loadCase, type CaseScript } from '@/engine';
import { theLighthouseRaw } from './the-lighthouse';
import { theUnderstudyRaw } from './the-understudy';
import { theNightRoundRaw } from './the-night-round';
import { deepFieldRaw } from './deep-field';
import { theWakeRaw } from './the-wake';
import { theLongCourseRaw } from './the-long-course';
import { theBothyRaw } from './the-bothy';
import { sundayServiceRaw } from './sunday-service';
import { theCutRaw } from './the-cut';

/**
 * Every case, validated at module load.
 *
 * loadCase throws on a dangling reference, so a broken case fails at startup
 * rather than halfway through someone’s playthrough. That is the whole point of
 * validating here instead of lazily.
 */
export const CASES: readonly CaseScript[] = [
  loadCase(theLighthouseRaw),
  loadCase(theUnderstudyRaw),
  loadCase(theNightRoundRaw),
  loadCase(deepFieldRaw),
  loadCase(theWakeRaw),
  loadCase(theLongCourseRaw),
  loadCase(theBothyRaw),
  loadCase(sundayServiceRaw),
  loadCase(theCutRaw),
];

export function getCase(caseId: string): CaseScript | undefined {
  return CASES.find((c) => c.id === caseId);
}
