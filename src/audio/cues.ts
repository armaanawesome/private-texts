import type { CueGain } from './volume';

/**
 * Every sound the game can make, and what each one is for.
 *
 * Four, deliberately. A deduction game played in silence with the phone face up
 * on a table needs its sound to mean something; a cue per interaction would turn
 * the soundtrack into keyboard clatter and the two that matter would stop
 * registering.
 */
export type CueId = 'message' | 'pin' | 'contradiction' | 'confession' | 'accusation';

export interface Cue extends CueGain {
  readonly id: CueId;
}

export const CUES: Record<CueId, Cue> = {
  /** A bubble arrived. You are already watching it appear. */
  message: { id: 'message', role: 'flourish', gain: 0.45 },
  /** A claim went onto the board. The chip already changed state. */
  pin: { id: 'pin', role: 'flourish', gain: 0.35 },
  /** Two statements cannot both be true. This is the game; it is never silent. */
  contradiction: { id: 'contradiction', role: 'signal', gain: 1 },
  /** She admits it. The one moment the game is allowed to be loud. */
  confession: { id: 'confession', role: 'signal', gain: 0.9 },
  /**
   * A name being put to the record. A gavel, twice.
   *
   * `signal`, not `flourish`: naming somebody is the one irreversible-feeling
   * move in the game, and a player with Reduce Motion on still needs to hear
   * that it landed. Pitched under the confession, which is the louder moment.
   */
  accusation: { id: 'accusation', role: 'signal', gain: 0.8 },
};

/**
 * Written out rather than derived from `Object.keys(CUES)`, which returns
 * `string[]` and would need a cast to become `CueId[]`. The test below is what
 * keeps the two in step instead.
 */
export const CUE_IDS: readonly CueId[] = [
  'message',
  'pin',
  'contradiction',
  'confession',
  'accusation',
];
