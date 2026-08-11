import { describe, it, expect } from 'vitest';
import { press, remainingBeats } from './confrontation';
import type { Confrontation, EvidenceRef } from './types';

const CONFRONTATION: Confrontation = {
  opening: 'You had better be very sure.',
  beats: [
    {
      id: 'b-alibi',
      evidence: { kind: 'contradiction', id: 'x-callum-alibi' },
      press: 'You put Callum in the café. He was at the slipway and he said so first.',
      rebuttal: 'A mother misremembers an evening. That is not a crime.',
    },
    {
      id: 'b-path',
      evidence: { kind: 'contradiction', id: 'x-mairi-path' },
      press: 'Esme passed you on the cliff path at 21:47.',
      rebuttal: 'I walked. People walk.',
    },
    {
      id: 'b-why',
      evidence: { kind: 'motive', id: 'm-trust' },
      press: 'Ruth found the hole in the Trust books, and it had your son in it.',
      rebuttal: '...',
    },
  ],
  deflections: ['That proves nothing.', 'You are reaching.'],
  confession: 'She was at the top of the stairs and she would not listen.',
};

const ev = (kind: EvidenceRef['kind'], id: string): EvidenceRef =>
  kind === 'motive' ? { kind: 'motive', id } : { kind: 'contradiction', id };

/**
 * The confrontation turns everything the player earned into moves.
 *
 * It deliberately cannot be brute-forced: only evidence actually proven can be
 * presented (the UI only offers those), and the killer confesses when every beat
 * has landed rather than after a fixed number of turns. Pushing the same fact
 * twice must not advance anything, or the player could win by tapping one chip
 * repeatedly.
 */
describe('press', () => {
  it('lands a beat when the right evidence is presented', () => {
    const r = press(CONFRONTATION, [], ev('contradiction', 'x-callum-alibi'));
    expect(r.kind).toBe('lands');
    if (r.kind === 'lands') {
      expect(r.beat.id).toBe('b-alibi');
      expect(r.complete).toBe(false);
    }
  });

  it('completes only when the last beat lands', () => {
    const r = press(CONFRONTATION, ['b-alibi', 'b-path'], ev('motive', 'm-trust'));
    expect(r.kind).toBe('lands');
    if (r.kind === 'lands') expect(r.complete).toBe(true);
  });

  it('does not advance when the same fact is pushed twice', () => {
    const r = press(CONFRONTATION, ['b-alibi'], ev('contradiction', 'x-callum-alibi'));
    expect(r.kind).toBe('repeat');
  });

  it('deflects evidence that is not one of the beats', () => {
    const r = press(CONFRONTATION, [], ev('contradiction', 'x-unrelated'));
    expect(r.kind).toBe('deflected');
    if (r.kind === 'deflected') expect(CONFRONTATION.deflections).toContain(r.line);
  });

  it('does not confuse a motive id with a contradiction id', () => {
    // Same id, different kind, must not land the motive beat.
    const r = press(CONFRONTATION, [], ev('contradiction', 'm-trust'));
    expect(r.kind).toBe('deflected');
  });

  it('varies the deflection so the killer does not repeat one line', () => {
    const first = press(CONFRONTATION, [], ev('contradiction', 'nope'));
    const second = press(CONFRONTATION, ['b-alibi'], ev('contradiction', 'nope'));
    expect(first.kind).toBe('deflected');
    expect(second.kind).toBe('deflected');
    if (first.kind === 'deflected' && second.kind === 'deflected') {
      expect(first.line).not.toBe(second.line);
    }
  });

  it('is deterministic for the same state', () => {
    const a = press(CONFRONTATION, ['b-alibi'], ev('contradiction', 'nope'));
    const b = press(CONFRONTATION, ['b-alibi'], ev('contradiction', 'nope'));
    expect(a).toEqual(b);
  });
});

describe('remainingBeats', () => {
  it('lists the beats still to land', () => {
    expect(remainingBeats(CONFRONTATION, ['b-alibi']).map((b) => b.id)).toEqual([
      'b-path',
      'b-why',
    ]);
  });

  it('is empty once everything has landed', () => {
    expect(remainingBeats(CONFRONTATION, ['b-alibi', 'b-path', 'b-why'])).toEqual([]);
  });
});
