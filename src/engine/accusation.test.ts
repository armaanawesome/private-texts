import { describe, it, expect } from 'vitest';
import { evaluateAccusation } from './accusation';
import type { CaseScript } from './types';

const SCRIPT = {
  id: 'c',
  title: 'C',
  blurb: '',
  characters: [
    { id: 'nadia', name: 'Nadia', avatarColor: '#c33' },
    { id: 'tom', name: 'Tom', avatarColor: '#3c3' },
  ],
  places: [],
  threads: [],
  contradictions: [
    { id: 'x1', claimIdA: 'a', claimIdB: 'b', revelation: 'r1' },
    { id: 'x2', claimIdA: 'c', claimIdB: 'd', revelation: 'r2' },
  ],
  solution: {
    killerId: 'nadia',
    requiredContradictionIds: ['x1', 'x2'],
    epilogue: 'She did it.',
  },
} as unknown as CaseScript;

describe('evaluateAccusation', () => {
  it('accepts the right person backed by all required proof', () => {
    expect(evaluateAccusation(SCRIPT, 'nadia', ['x1', 'x2'])).toEqual({
      correct: true,
      epilogue: 'She did it.',
    });
  });

  it('rejects the right person when proof is incomplete', () => {
    const r = evaluateAccusation(SCRIPT, 'nadia', ['x1']);
    expect(r.correct).toBe(false);
    if (!r.correct) {
      expect(r.missingCount).toBe(1);
      expect(r.reason).toMatch(/cannot prove/i);
    }
  });

  it('rejects the wrong person even with all proof gathered', () => {
    const r = evaluateAccusation(SCRIPT, 'tom', ['x1', 'x2']);
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/does not fit/i);
  });

  it('reports incomplete proof before wrong-person, so the player is not spoiled', () => {
    // Accusing the wrong person with no evidence must NOT reveal they are wrong --
    // that would let a player brute-force the killer by elimination.
    const r = evaluateAccusation(SCRIPT, 'tom', []);
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/cannot prove/i);
  });

  it('ignores confirmed contradictions that are not required', () => {
    expect(evaluateAccusation(SCRIPT, 'nadia', ['x1', 'x2', 'unrelated']).correct).toBe(true);
  });
});
