import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The engine and case content must never import React Native, Expo, or React.
 *
 * This is what keeps the suite runnable in plain Node in ~70ms with no
 * simulator, and it is half of what makes the codebase testable at all. It has
 * already been broken once — a fixture imported an entitlement id from a module
 * that pulls in react-native-purchases, and the whole content suite failed to
 * parse. A comment did not prevent that. This test does.
 */
const FORBIDDEN = [
  'react-native',
  'react-native-purchases',
  'react-native-reanimated',
  'expo',
  'expo-router',
  '@react-native-async-storage/async-storage',
];

function sourceFilesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFilesUnder(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.test.ts')) {
      out.push(full);
    }
  }
  return out;
}

describe.each([
  ['src/engine', 'src/engine'],
  ['content', 'content'],
])('%s stays free of native imports', (_label, dir) => {
  const files = sourceFilesUnder(join(process.cwd(), dir));

  it('finds source files to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((f) => [f.split(/[\\/]/).slice(-2).join('/'), f]))(
    '%s imports nothing native',
    (_name, file) => {
      const src = readFileSync(file, 'utf8');
      const imports = [...src.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1]!);
      const bad = imports.filter((spec) =>
        FORBIDDEN.some((f) => spec === f || spec.startsWith(`${f}/`)),
      );
      expect(bad, `native import(s) in ${file}: ${bad.join(', ')}`).toEqual([]);
    },
  );
});
