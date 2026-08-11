import type { Confrontation, ConfrontationBeat, EvidenceRef } from './types';

export type PressOutcome =
  /** The fact landed. `complete` is true when it was the last one. */
  | { readonly kind: 'lands'; readonly beat: ConfrontationBeat; readonly complete: boolean }
  /** Not one of the beats — the killer brushes it aside. */
  | { readonly kind: 'deflected'; readonly line: string }
  /** Already used. Saying it twice must not advance anything. */
  | { readonly kind: 'repeat' };

function sameEvidence(a: EvidenceRef, b: EvidenceRef): boolean {
  // Kind is compared as well as id: a motive and a contradiction may share an
  // id, and matching on id alone would land the wrong beat.
  return a.kind === b.kind && a.id === b.id;
}

/**
 * The player lays one fact in front of the killer.
 *
 * Cannot be brute-forced. The screen only offers evidence the player actually
 * proved, pressing the same fact twice is inert, and the confession arrives when
 * every beat has landed rather than after a set number of turns — so the ending
 * is earned by having the whole case, not by tapping until it gives up.
 */
export function press(
  confrontation: Confrontation,
  landedBeatIds: readonly string[],
  evidence: EvidenceRef,
): PressOutcome {
  const landed = new Set(landedBeatIds);
  const match = confrontation.beats.find((b) => sameEvidence(b.evidence, evidence));

  if (match) {
    if (landed.has(match.id)) return { kind: 'repeat' };
    return {
      kind: 'lands',
      beat: match,
      complete: confrontation.beats.every((b) => b.id === match.id || landed.has(b.id)),
    };
  }

  // Cycled by how far in the player is, so the killer does not repeat one line
  // back at them. Deterministic, so the same state always reads the same.
  const deflections = confrontation.deflections;
  const line = deflections[landed.size % deflections.length] ?? 'That proves nothing.';
  return { kind: 'deflected', line };
}

/** Beats still to land — what the player has left to say. */
export function remainingBeats(
  confrontation: Confrontation,
  landedBeatIds: readonly string[],
): ConfrontationBeat[] {
  const landed = new Set(landedBeatIds);
  return confrontation.beats.filter((b) => !landed.has(b.id));
}
