import { describe, it, expect } from 'vitest';
import { loadCase, checkContradiction, visibleThreads, type Claim } from '@/engine';
import { theHelplineRaw } from './the-helpline';
import { describeCaseContract } from './caseContract';

const script = loadCase(theHelplineRaw);
describeCaseContract(script);

const byId = new Map(
  script.threads.flatMap((t) => t.messages.flatMap((m) => m.claims ?? [])).map((c) => [c.id, c]),
);
const claim = (id: string): Claim => {
  const c = byId.get(id);
  if (!c) throw new Error(`no claim "${id}"`);
  return c;
};

describe('The Helpline', () => {
  it('requires three contradictions and the motive', () => {
    expect(script.solution.requiredContradictionIds).toHaveLength(3);
    expect(script.solution.requiredMotiveIds).toEqual(['m-numbers']);
  });

  /**
   * The shape: a call that was never made. The duty book cannot be checked
   * against a recording, because there are no recordings — that is the promise
   * the charity rests on. It is checked against how many minutes the lines
   * carried, which says nothing about anybody.
   */
  it('breaks the logged call without touching what was said on it', () => {
    const v = checkContradiction(script, claim('c-alun-oncall'), claim('c-alun-offphones'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).toContain('x-alun-call');
  });

  /**
   * Care rule for this setting: callers stay off the page. No claim is ever
   * about a caller, no caller is named, and nothing in the case turns on what
   * anybody said on that line.
   */
  it('never makes a caller a subject of anything', () => {
    const cast = new Set(script.characters.map((c) => c.id));
    for (const c of byId.values()) {
      expect(cast.has(c.subject), `claim ${c.id} is about a non-cast person`).toBe(true);
      expect(cast.has(c.assertedBy), `claim ${c.id} is asserted by a non-cast person`).toBe(true);
    }
  });

  it('clears the volunteer he pointed at, and does not require it', () => {
    const v = checkContradiction(script, claim('c-sunny-branch'), claim('c-sunny-home'));
    expect(v.ok).toBe(true);
    expect(script.solution.requiredContradictionIds).not.toContain('x-sunny-fob');
    expect(script.solution.killerId).not.toBe('sunny');
  });

  it('opens Sunny only after Yusuf points at her', () => {
    const cold = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: [],
    }).map((t) => t.id);
    expect(cold).not.toContain('t-sunny');

    const after = visibleThreads(script, {
      confirmedContradictionIds: [],
      readMessageIds: ['y9'],
    }).map((t) => t.id);
    expect(after).toContain('t-sunny');
  });

  /**
   * Pack 12 is the connection that narrows him to a person. Clue 5 is that he
   * used the script — the reflective phrasing a trained listener uses — and
   * Alun recognised it because he teaches it.
   */
  it('carries the arc, and only after the case is solved', () => {
    expect(script.coda).toBeDefined();
    const confession = script.confrontation?.confession ?? '';
    expect(confession).toMatch(/reflecting back/i);
    expect(confession).toMatch(/one of us/i);

    const beforeTheEnd = [
      script.briefing?.opening ?? '',
      ...script.threads.flatMap((t) => t.messages.map((m) => m.body)),
    ].join(' ');
    expect(beforeTheEnd).not.toMatch(/reflecting back|one of us/i);
  });

  it('has him admit in the coda where he trained', () => {
    const coda = (script.coda?.messages ?? []).join(' ');
    expect(coda).toMatch(/where I learned/i);
    expect(coda).toMatch(/five/i);
  });

  it('keeps every claim window inside one day', () => {
    for (const c of byId.values()) {
      expect(c.window.end - c.window.start, `claim ${c.id}`).toBeLessThanOrEqual(1440);
      expect(Math.floor(c.window.start / 1440)).toBe(Math.floor((c.window.end - 1) / 1440));
    }
  });
});
