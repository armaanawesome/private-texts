import { describe, it, expect } from 'vitest';
import { evaluateAccusation } from './accusation';
import type { CaseScript, Progress } from './types';

const SCRIPT = {
  id: 'c',
  title: 'C',
  blurb: '',
  characters: [
    { id: 'nadia', name: 'Nadia', avatarColor: '#c33' },
    { id: 'tom', name: 'Tom', avatarColor: '#3c3' },
  ],
  places: [],
  objects: [],
  motives: [
    {
      id: 'm1',
      characterId: 'nadia',
      summary: 'The money.',
      establishedByMessageIds: ['msg-a', 'msg-b'],
    },
  ],
  threads: [],
  contradictions: [
    { id: 'x1', claimIdA: 'a', claimIdB: 'b', revelation: 'r1' },
    { id: 'x2', claimIdA: 'c', claimIdB: 'd', revelation: 'r2' },
  ],
  solution: {
    killerId: 'nadia',
    requiredContradictionIds: ['x1', 'x2'],
    requiredMotiveIds: ['m1'],
    epilogue: 'She did it.',
  },
} as unknown as CaseScript;

/** Everything proven and everything read. */
const SOLVED: Progress = {
  confirmedContradictionIds: ['x1', 'x2'],
  readMessageIds: ['msg-a', 'msg-b'],
};

const progress = (over: Partial<Progress> = {}): Progress => ({ ...SOLVED, ...over });

describe('evaluateAccusation', () => {
  it('accepts the right person backed by all required proof and motive', () => {
    expect(evaluateAccusation(SCRIPT, 'nadia', SOLVED)).toEqual({
      correct: true,
      epilogue: 'She did it.',
    });
  });

  it('rejects the right person when proof is incomplete', () => {
    const r = evaluateAccusation(SCRIPT, 'nadia', progress({ confirmedContradictionIds: ['x1'] }));
    expect(r.correct).toBe(false);
    if (!r.correct) {
      expect(r.missingCount).toBe(1);
      expect(r.reason).toMatch(/cannot prove/i);
    }
  });

  it('rejects the wrong person even with all proof gathered', () => {
    const r = evaluateAccusation(SCRIPT, 'tom', SOLVED);
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/does not fit/i);
  });

  it('reports incomplete proof before wrong-person, so the player is not spoiled', () => {
    // Accusing the wrong person with no evidence must NOT reveal they are wrong --
    // that would let a player brute-force the killer by elimination.
    const r = evaluateAccusation(SCRIPT, 'tom', progress({ confirmedContradictionIds: [] }));
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/cannot prove/i);
  });

  it('ignores confirmed contradictions that are not required', () => {
    expect(
      evaluateAccusation(SCRIPT, 'nadia', progress({ confirmedContradictionIds: ['x1', 'x2', 'z'] }))
        .correct,
    ).toBe(true);
  });

  /**
   * The motive axis. You must be able to break their story AND say why they did
   * it — the two are found in different ways, so reading matters as much as
   * pairing.
   */
  it('refuses when the story is broken but the reason was never found', () => {
    const r = evaluateAccusation(SCRIPT, 'nadia', progress({ readMessageIds: ['msg-a'] }));
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/why/i);
  });

  it('checks proof before motive', () => {
    const r = evaluateAccusation(
      SCRIPT,
      'nadia',
      { confirmedContradictionIds: [], readMessageIds: [] },
    );
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.reason).toMatch(/cannot prove/i);
  });

  /**
   * `kind` exists so the UI can translate the refusal instead of rendering the
   * English `reason` at players in five languages. It is only worth anything if
   * it names the gate that actually fired, so these pin it to the same three
   * cases the `reason` assertions above cover.
   */
  it('names which gate refused', () => {
    const noProof = evaluateAccusation(
      SCRIPT,
      'nadia',
      progress({ confirmedContradictionIds: ['x1'] }),
    );
    if (!noProof.correct) expect(noProof.kind).toBe('proof');

    const noMotive = evaluateAccusation(SCRIPT, 'nadia', progress({ readMessageIds: ['msg-a'] }));
    if (!noMotive.correct) expect(noMotive.kind).toBe('motive');

    const wrongPerson = evaluateAccusation(SCRIPT, 'tom', SOLVED);
    if (!wrongPerson.correct) expect(wrongPerson.kind).toBe('identity');
  });

  /**
   * The same leak the next test guards, now that a second field could give the
   * answer away: if `kind` differed between the killer and an innocent it would
   * confirm by elimination just as loudly as different prose would.
   */
  it('gives the same kind for the killer and an innocent when motive is missing', () => {
    const noMotive = progress({ readMessageIds: [] });
    const a = evaluateAccusation(SCRIPT, 'tom', noMotive);
    const b = evaluateAccusation(SCRIPT, 'nadia', noMotive);
    expect(a.correct).toBe(false);
    expect(b.correct).toBe(false);
    if (!a.correct && !b.correct) expect(a.kind).toBe(b.kind);
  });

  it('checks motive globally, not against the accused, so a refusal leaks nothing', () => {
    // Accusing Tom with full proof but no motive established must give the SAME
    // refusal as accusing Nadia would. Otherwise "you cannot say why" would
    // confirm the player had landed on the breakable one.
    const noMotive = progress({ readMessageIds: [] });
    const a = evaluateAccusation(SCRIPT, 'tom', noMotive);
    const b = evaluateAccusation(SCRIPT, 'nadia', noMotive);
    expect(a.correct).toBe(false);
    expect(b.correct).toBe(false);
    if (!a.correct && !b.correct) expect(a.reason).toBe(b.reason);
  });

  it('skips the motive gate entirely for a case that declares none', () => {
    const noMotiveCase = {
      ...SCRIPT,
      motives: [],
      solution: { ...SCRIPT.solution, requiredMotiveIds: [] },
    } as unknown as CaseScript;
    expect(
      evaluateAccusation(noMotiveCase, 'nadia', {
        confirmedContradictionIds: ['x1', 'x2'],
        readMessageIds: [],
      }).correct,
    ).toBe(true);
  });
});
