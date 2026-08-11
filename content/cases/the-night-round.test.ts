import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theNightRoundRaw } from './the-night-round';
import { describeCaseContract } from './caseContract';

const script = loadCase(theNightRoundRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};
const allMessageIds = script.threads.flatMap((t) => t.messages.map((m) => m.id));
const at = (proven: string[]) => ({
  confirmedContradictionIds: proven,
  readMessageIds: allMessageIds,
});

describe('The Night Round', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-attorney']);
  });

  /**
   * The shape of this case’s lie, per docs/pack-ledger.md: routine. A round
   * signed for and never walked. It has to be provable and it has to NOT be the
   * murder, or the red herring is just a second suspect.
   */
  it('proves the round was signed and not walked, without that being the murder', () => {
    const v = checkContradiction(script, claim('c-margo-round'), claim('c-margo-desk'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-margo-round');
    expect(script.solution.killerId).not.toBe('margo');
  });

  it('breaks the alibi on a machine, not only on witnesses', () => {
    // Two of the three rest on an old man’s hearing and a carer’s ear. The fob
    // record is the one the killer cannot call unreliable, which is why the
    // confrontation saves it for third.
    const v = checkContradiction(script, claim('c-fen-home'), claim('c-fen-carpark'));
    expect(v.ok).toBe(true);
    const third = script.confrontation?.beats[2];
    expect(third?.evidence.id).toBe('x-fen-carpark');
  });

  it('opens Teddy only after Margo points at him', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-teddy');

    const named = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['g9'],
    }).map((t) => t.id);
    expect(named).toContain('t-teddy');
  });

  it('gates the manager behind two proven contradictions', () => {
    expect(visibleThreads(script, at([])).map((t) => t.id)).not.toContain('t-saoirse');
    expect(
      visibleThreads(script, at(['x-fen-corridor', 'x-fen-asleep'])).map((t) => t.id),
    ).toContain('t-saoirse');
  });

  /**
   * Pack 3 is a connection pack. The arc surfaces in the confession and the
   * coda, and nowhere earlier — a player must have solved the case before the
   * floor moves.
   */
  it('carries the arc, and only after the case is solved', () => {
    expect(script.coda).toBeDefined();
    expect(script.confrontation?.confession).toMatch(/telephoned/i);

    // The prognosis is clue 2: private information the killer could not reach.
    expect(script.confrontation?.confession).toMatch(/eight to fourteen months/i);

    // And it must not leak into the briefing or any thread.
    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toMatch(/eight to fourteen/i);
  });
});
