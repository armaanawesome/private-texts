import type { CaseScript, Claim, Progress, Thread } from './types';
import { establishedMotiveIds } from './motive';

/**
 * Threads the player can open.
 *
 * Three independent gates, all of which must pass. Contradictions model
 * escalation — prove something and a door opens. `requiresReadMessageIds` models
 * *discovery*: someone mentions a person and that person becomes reachable,
 * which is what produces a natural chain from first responders outward rather
 * than a ladder of puzzle rewards.
 */
export function visibleThreads(script: CaseScript, progress: Progress): Thread[] {
  const confirmed = new Set(progress.confirmedContradictionIds);
  const read = new Set(progress.readMessageIds);
  const motives = new Set(establishedMotiveIds(script.motives, progress.readMessageIds));

  return script.threads.filter(
    (t) =>
      t.requiresContradictionIds.every((id) => confirmed.has(id)) &&
      (t.requiresReadMessageIds ?? []).every((id) => read.has(id)) &&
      (t.requiresMotiveIds ?? []).every((id) => motives.has(id)),
  );
}

/** Every claim the player has actually seen — you cannot pin what you have not read. */
export function availableClaims(
  script: CaseScript,
  readMessageIds: readonly string[],
): Claim[] {
  const read = new Set(readMessageIds);
  const out: Claim[] = [];
  for (const thread of script.threads) {
    for (const msg of thread.messages) {
      if (!read.has(msg.id)) continue;
      out.push(...(msg.claims ?? []));
    }
  }
  return out;
}
