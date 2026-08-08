import type { CaseScript, Claim, Thread } from './types';

/** Threads whose gating contradictions have all been confirmed. */
export function visibleThreads(
  script: CaseScript,
  confirmedContradictionIds: readonly string[],
): Thread[] {
  const confirmed = new Set(confirmedContradictionIds);
  return script.threads.filter((t) =>
    t.requiresContradictionIds.every((id) => confirmed.has(id)),
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
