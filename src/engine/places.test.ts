import { describe, it, expect } from 'vitest';
import { placesConflict } from './places';
import type { Place } from './types';

const PLACES: Place[] = [
  { id: 'harbour', name: 'The harbour' },
  { id: 'pier', name: 'The pier', parentId: 'harbour' },
  { id: 'pier-kiosk', name: 'The kiosk', parentId: 'pier' },
  { id: 'studio', name: 'The studio' },
];

describe('placesConflict', () => {
  it('reports no conflict for the same place', () => {
    expect(placesConflict(PLACES, 'studio', 'studio')).toBe(false);
  });

  it('reports a conflict between two unrelated places', () => {
    expect(placesConflict(PLACES, 'studio', 'harbour')).toBe(true);
  });

  it('reports no conflict when one place contains the other', () => {
    // Being at the pier IS being at the harbour.
    expect(placesConflict(PLACES, 'pier', 'harbour')).toBe(false);
  });

  it('reports no conflict across two levels of nesting', () => {
    expect(placesConflict(PLACES, 'pier-kiosk', 'harbour')).toBe(false);
  });

  it('is symmetric for nested places', () => {
    expect(placesConflict(PLACES, 'harbour', 'pier')).toBe(false);
  });

  it('reports a conflict between a nested place and an unrelated one', () => {
    expect(placesConflict(PLACES, 'pier-kiosk', 'studio')).toBe(true);
  });

  it('treats an unknown place id as conflicting with everything else', () => {
    expect(placesConflict(PLACES, 'studio', 'nowhere')).toBe(true);
  });
});
