import { describe, it, expect } from 'vitest';
import { loadCase } from './schema';

const MINIMAL = {
  id: 'test-case',
  title: 'Test Case',
  blurb: 'A test.',
  characters: [{ id: 'nadia', name: 'Nadia', avatarColor: '#c33' }],
  places: [{ id: 'studio', name: 'The studio' }],
  threads: [
    {
      id: 't1',
      title: 'Group chat',
      participantIds: ['nadia'],
      requiresContradictionIds: [],
      messages: [
        {
          id: 'm1',
          threadId: 't1',
          senderId: 'nadia',
          sentAt: 1300,
          body: 'I was at the studio all night.',
          claims: [
            {
              id: 'c1',
              subject: 'nadia',
              assertedBy: 'nadia',
              predicate: { kind: 'at_place', placeId: 'studio' },
              window: { start: 1300, end: 1400 },
              sourceMessageId: 'm1',
              label: 'Nadia at the studio, 21:40-22:20',
            },
          ],
        },
      ],
    },
  ],
  // Annotated rather than inferred: bare `[]` infers as never[], which blocks
  // the negative tests below from pushing anything into it.
  contradictions: [] as { id: string; claimIdA: string; claimIdB: string; revelation: string }[],
  solution: {
    killerId: 'nadia',
    requiredContradictionIds: [] as string[],
    epilogue: 'Done.',
  },
};

describe('loadCase', () => {
  it('accepts a well-formed case', () => {
    expect(loadCase(MINIMAL).id).toBe('test-case');
  });

  it('rejects a claim whose subject is not a known character', () => {
    const bad = structuredClone(MINIMAL);
    bad.threads[0]!.messages[0]!.claims![0]!.subject = 'ghost';
    expect(() => loadCase(bad)).toThrow(/unknown character "ghost"/i);
  });

  it('rejects a claim referencing an unknown place', () => {
    const bad = structuredClone(MINIMAL);
    bad.threads[0]!.messages[0]!.claims![0]!.predicate = { kind: 'at_place', placeId: 'moon' };
    expect(() => loadCase(bad)).toThrow(/unknown place "moon"/i);
  });

  it('rejects a solution naming an unknown killer', () => {
    const bad = structuredClone(MINIMAL);
    bad.solution.killerId = 'nobody';
    expect(() => loadCase(bad)).toThrow(/unknown character "nobody"/i);
  });

  it('rejects duplicate claim ids', () => {
    const bad = structuredClone(MINIMAL);
    const dup = structuredClone(bad.threads[0]!.messages[0]!.claims![0]!);
    bad.threads[0]!.messages[0]!.claims!.push(dup);
    expect(() => loadCase(bad)).toThrow(/duplicate claim id "c1"/i);
  });

  it('rejects a window whose end precedes its start', () => {
    const bad = structuredClone(MINIMAL);
    bad.threads[0]!.messages[0]!.claims![0]!.window = { start: 1400, end: 1300 };
    expect(() => loadCase(bad)).toThrow();
  });

  it('rejects a contradiction referencing a claim that does not exist', () => {
    const bad = structuredClone(MINIMAL);
    bad.contradictions.push({ id: 'x1', claimIdA: 'c1', claimIdB: 'c99', revelation: 'nope' });
    expect(() => loadCase(bad)).toThrow(/unknown claim "c99"/i);
  });

  it('rejects a place whose parent does not exist', () => {
    const bad = {
      ...structuredClone(MINIMAL),
      places: [
        { id: 'studio', name: 'The studio' },
        { id: 'booth', name: 'The booth', parentId: 'atlantis' },
      ],
    };
    expect(() => loadCase(bad)).toThrow(/unknown parent place "atlantis"/i);
  });

  it('rejects a solution requiring a contradiction that does not exist', () => {
    const bad = structuredClone(MINIMAL);
    bad.solution.requiredContradictionIds = ['x-nope'];
    expect(() => loadCase(bad)).toThrow(/unknown contradiction "x-nope"/i);
  });
});
