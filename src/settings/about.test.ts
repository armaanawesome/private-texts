import { describe, it, expect } from 'vitest';
import { LICENCES, PRIVACY_POINTS, versionLine } from './about';

describe('versionLine', () => {
  it('pairs the version with an iOS build number string', () => {
    expect(versionLine('1.0.0', '5')).toBe('1.0.0 (5)');
  });

  it('pairs the version with an Android versionCode number', () => {
    // Android hands this over as a number, iOS as a string. Both reach this row.
    expect(versionLine('1.0.0', 5)).toBe('1.0.0 (5)');
  });

  it('shows the version alone when there is no build number', () => {
    expect(versionLine('1.0.0', null)).toBe('1.0.0');
    expect(versionLine('1.0.0', undefined)).toBe('1.0.0');
    expect(versionLine('1.0.0', '  ')).toBe('1.0.0');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['an empty string', ''],
    ['whitespace', '   '],
  ])('admits it does not know when the version is %s', (_label, version) => {
    // Constants.expoConfig is nullable at runtime. An empty row reads as a
    // rendering bug; "Unknown" reads as a fact, and support asks for a build
    // number first every time.
    expect(versionLine(version, '5')).toBe('Unknown');
  });

  it('handles a build number with no version at all', () => {
    expect(versionLine(null, null)).toBe('Unknown');
  });
});

describe('the licence list', () => {
  it('names something and a licence for every entry', () => {
    for (const entry of LICENCES) {
      expect(entry.name.trim()).not.toBe('');
      expect(entry.licence.trim()).not.toBe('');
    }
  });

  it('lists nothing twice', () => {
    // Copy-paste is how these lists rot; a duplicate row is the visible symptom.
    const names = LICENCES.map((l) => l.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('the privacy points', () => {
  it('says something', () => {
    expect(PRIVACY_POINTS.length).toBeGreaterThan(0);
    for (const point of PRIVACY_POINTS) {
      expect(point.trim()).not.toBe('');
    }
  });
});
