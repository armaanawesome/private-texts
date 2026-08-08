import type { CaseScript } from './types';

export type AccusationResult =
  | { readonly correct: true; readonly epilogue: string }
  | { readonly correct: false; readonly reason: string; readonly missingCount: number };

/**
 * Proof is checked before identity on purpose. Reporting "right person, wrong proof"
 * would let a player brute-force the killer by tapping every suspect in turn.
 */
export function evaluateAccusation(
  script: CaseScript,
  accusedId: string,
  confirmedContradictionIds: readonly string[],
): AccusationResult {
  const confirmed = new Set(confirmedContradictionIds);
  const missing = script.solution.requiredContradictionIds.filter((id) => !confirmed.has(id));

  if (missing.length > 0) {
    return {
      correct: false,
      reason: 'You cannot prove it yet. Something in their story still holds up.',
      missingCount: missing.length,
    };
  }
  if (accusedId !== script.solution.killerId) {
    return {
      correct: false,
      reason: 'The evidence you have does not fit this person.',
      missingCount: 0,
    };
  }
  return { correct: true, epilogue: script.solution.epilogue };
}
