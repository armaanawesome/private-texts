import { describe, it, expect } from 'vitest';
import { saveBlobSchema } from './saveBlob';

describe('save blob', () => {
  it('parses a good save', () => {
    const blob = saveBlobSchema.parse({
      readMessageIds: ['r1', 'r2'],
      confirmedContradictionIds: ['x-papers'],
    });
    expect(blob.readMessageIds).toEqual(['r1', 'r2']);
    expect(blob.confirmedContradictionIds).toEqual(['x-papers']);
  });

  it('recovers a field of the wrong type rather than throwing', () => {
    const blob = saveBlobSchema.parse({
      readMessageIds: 'not an array',
      confirmedContradictionIds: ['x-papers'],
    });
    expect(blob.readMessageIds).toEqual([]);
    // A bad field must not take a good one down with it.
    expect(blob.confirmedContradictionIds).toEqual(['x-papers']);
  });

  /**
   * The reason the schema uses `.catch(() => [])` and not `.catch([])`.
   *
   * The value form hands every failed parse the same array instance, so two
   * corrupt saves would share one list and pushing into one would silently edit
   * the other. This test fails if anybody "simplifies" it back.
   */
  it('gives each recovered save its own array', () => {
    const a = saveBlobSchema.parse({ readMessageIds: 0, confirmedContradictionIds: 0 });
    const b = saveBlobSchema.parse({ readMessageIds: 0, confirmedContradictionIds: 0 });

    expect(a.readMessageIds).not.toBe(b.readMessageIds);
    a.readMessageIds.push('r1');
    expect(b.readMessageIds).toEqual([]);
  });

  it('rejects a blob that is not an object at all', () => {
    expect(() => saveBlobSchema.parse(null)).toThrow();
    expect(() => saveBlobSchema.parse('save')).toThrow();
  });
});
