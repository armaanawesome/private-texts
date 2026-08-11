import { loadCase, type CaseScript } from '@/engine';
import { theLighthouseRaw } from './the-lighthouse';
import { theUnderstudyRaw } from './the-understudy';
import { theNightRoundRaw } from './the-night-round';

/**
 * Every case, validated at module load.
 *
 * loadCase throws on a dangling reference, so a broken case fails at startup
 * rather than halfway through someone's playthrough. That is the whole point of
 * validating here instead of lazily.
 */
export const CASES: readonly CaseScript[] = [
  loadCase(theLighthouseRaw),
  loadCase(theUnderstudyRaw),
  loadCase(theNightRoundRaw),
];

export function getCase(caseId: string): CaseScript | undefined {
  return CASES.find((c) => c.id === caseId);
}
