import type { CaseScript, Progress } from './types';
import { establishedMotiveIds } from './motive';

export type AccusationResult =
  | { readonly correct: true; readonly epilogue: string }
  | { readonly correct: false; readonly reason: string; readonly missingCount: number };

/**
 * Three gates, in this order, and the order is the whole design.
 *
 * 1. Proof — every required contradiction broken.
 * 2. Motive — every required motive read and established.
 * 3. Identity — the right person.
 *
 * Proof and motive are checked **globally**, never against the accused. Asking
 * "does this person have a motive" would leak: refusing on motive would confirm
 * the player had landed on someone whose story is otherwise breakable, and they
 * could brute-force the killer by elimination. Identity is checked last for the
 * same reason.
 */
export function evaluateAccusation(
  script: CaseScript,
  accusedId: string,
  progress: Progress,
): AccusationResult {
  const confirmed = new Set(progress.confirmedContradictionIds);
  const missing = script.solution.requiredContradictionIds.filter((id) => !confirmed.has(id));

  if (missing.length > 0) {
    return {
      correct: false,
      reason: 'You cannot prove it yet. Something in their story still holds up.',
      missingCount: missing.length,
    };
  }

  const established = new Set(establishedMotiveIds(script.motives, progress.readMessageIds));
  const missingMotives = script.solution.requiredMotiveIds.filter((id) => !established.has(id));

  if (missingMotives.length > 0) {
    return {
      correct: false,
      reason: 'You can break the story, but you cannot yet say why. Keep reading.',
      missingCount: missingMotives.length,
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
