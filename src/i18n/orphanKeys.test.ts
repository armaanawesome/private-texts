import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

/**
 * The rule `strings.ts` states in its own header, made executable.
 *
 * > Every key here is rendered by a screen. When a string leaves the UI, its
 * > key leaves this file with it.
 *
 * It was a comment, and comments rot: four keys had already outlived their
 * screens (`common.cancel`, `common.done`, `reset.done`, `paywall.compare`),
 * costing twenty lines across five catalogues and a translator real work on
 * strings nobody would ever read. That is exactly the failure AGENTS.md §2
 * describes — write the check, not the note.
 */

const CATALOGUE = 'src/i18n/strings.ts';

/**
 * Prefixes assembled at runtime, so the literal key never appears in source.
 *
 * Kept deliberately short. Each entry is a hole in the check, so a new one
 * needs the same justification this one has: `app/sign-in.tsx` renders
 * ``t(`signIn.strength.${report.strength}`)``, where `strength` is a union of
 * the three suffixes below.
 */
const BUILT_AT_RUNTIME = ['signIn.strength.'];

function sourceFiles(root: string): string[] {
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!p.includes('node_modules') && !p.includes(`${sep}.`)) walk(p);
      } else if (/\.tsx?$/.test(entry.name) && !p.endsWith(join('i18n', 'strings.ts'))) {
        found.push(p);
      }
    }
  };
  walk(root);
  return found;
}

describe('the catalogue carries no dead weight', () => {
  it('has a screen for every key it ships', () => {
    const src = readFileSync(CATALOGUE, 'utf8');
    // English only. The other catalogues are Partial and are already held to
    // this set by translate.test.ts, so checking EN checks all five.
    const en = src.slice(src.indexOf('export const EN'), src.indexOf('export type StringKey'));
    const keys = [...en.matchAll(/^ {2}'([a-zA-Z0-9_.]+)':/gm)].map((m) => m[1]!);
    expect(keys.length).toBeGreaterThan(200);

    const blob = [...sourceFiles('src'), ...sourceFiles('app')]
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n');

    const orphans = keys.filter(
      (k) => !blob.includes(k) && !BUILT_AT_RUNTIME.some((p) => k.startsWith(p)),
    );
    expect(orphans).toEqual([]);
  });
});
