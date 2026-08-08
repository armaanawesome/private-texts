import { describe, it, expect } from 'vitest';
import { patchPhases } from './force-bundling-patch.js';

interface Phase {
  name?: string;
  shellScript?: string;
}

const bundlePhase = (): Phase => ({
  name: '"Bundle React Native code and images"',
  shellScript: '"set -e\\n`node --print ...`/react-native-xcode.sh\\n"',
});

describe('patchPhases', () => {
  it('injects the export into the bundling phase', () => {
    const phases: Record<string, Phase> = { ABC123: bundlePhase() };
    expect(patchPhases(phases)).toBe(1);
    expect(phases.ABC123!.shellScript).toContain('export FORCE_BUNDLING=1');
  });

  it('keeps the shellScript a valid quoted string', () => {
    const phases: Record<string, Phase> = { ABC123: bundlePhase() };
    patchPhases(phases);
    const s = phases.ABC123!.shellScript!;
    expect(s.startsWith('"')).toBe(true);
    expect(s.endsWith('"')).toBe(true);
    // The original script body must survive intact.
    expect(s).toContain('react-native-xcode.sh');
  });

  it('is idempotent — a second prebuild must not double-inject', () => {
    const phases: Record<string, Phase> = { ABC123: bundlePhase() };
    patchPhases(phases);
    expect(patchPhases(phases)).toBe(0);
    const count = phases.ABC123!.shellScript!.split('export FORCE_BUNDLING=1').length - 1;
    expect(count).toBe(1);
  });

  it('ignores unrelated build phases', () => {
    const phases: Record<string, Phase> = {
      X: { name: '"[CP] Copy Pods Resources"', shellScript: '"echo hi"' },
    };
    expect(patchPhases(phases)).toBe(0);
    expect(phases.X!.shellScript).toBe('"echo hi"');
  });

  it('ignores pbxproj comment keys and malformed entries', () => {
    const phases: Record<string, unknown> = {
      ABC123_comment: 'Bundle React Native code and images',
      NOPE: null,
      NOSCRIPT: { name: '"Bundle React Native code and images"' },
    };
    expect(patchPhases(phases)).toBe(0);
  });

  it('reports zero when no bundling phase exists, so the caller can fail loudly', () => {
    expect(patchPhases({})).toBe(0);
  });
});
