import { loadCase, type CaseScript } from '@/engine';
import { fixtureRaw } from './fixture';
import { lockedFixtureRaw } from './fixture-locked';

/**
 * Every case, validated at module load.
 *
 * loadCase throws on a dangling reference, so a broken case fails at startup
 * rather than halfway through someone's playthrough. That is the whole point of
 * validating here instead of lazily.
 */
export const CASES: readonly CaseScript[] = [loadCase(fixtureRaw), loadCase(lockedFixtureRaw)];

export function getCase(caseId: string): CaseScript | undefined {
  return CASES.find((c) => c.id === caseId);
}
