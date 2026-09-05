import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { EN } from '@/i18n/strings';

/**
 * Guards on the accusation, the moment the game states its thesis.
 *
 * Source assertions rather than render assertions, for the reason
 * `bubbleMemo.test.ts` documents: these components import react-native, which
 * the Node suite cannot parse. Three things were wrong and must not return.
 *
 * 1. The confirmation was `Alert.alert` — the most dramatic decision in the
 *    product drawn in operating-system chrome, on a screen whose premise is
 *    that you are holding a real phone.
 * 2. Every visible string was a hardcoded English literal, the alert included.
 * 3. The refusal rendered the engine's English `reason` prose directly.
 */

const read = (rel: string) => readFileSync(join(process.cwd(), rel), 'utf8');

describe('the accusation is the game’s own surface', () => {
  const screen = read('src/ui/AccusationScreen.tsx');
  const sheet = read('src/ui/AccusationSheet.tsx');

  it('no longer confirms through the OS alert', () => {
    expect(screen).not.toContain('Alert.alert');
    expect(screen).toContain('<AccusationSheet');
  });

  /**
   * Android's hardware back must close the sheet. Without `onRequestClose` a
   * react-native Modal swallows it, and the sheet becomes a trap on that
   * platform — a full stop in the middle of the game's climax.
   */
  it('lets the Android back button out of the sheet', () => {
    expect(sheet).toContain('onRequestClose');
  });
});

describe('the accusation speaks the player’s language', () => {
  const screen = read('src/ui/AccusationScreen.tsx');
  const sheet = read('src/ui/AccusationSheet.tsx');

  it('routes its copy through the catalogue', () => {
    expect(screen).toContain('useTranslator');
    expect(sheet).toContain('useTranslator');
  });

  const GONE = [
    'Who killed them?',
    'Naming the right person is not enough',
    'nothing proven',
    'If your evidence does not fit them',
    'still holds up',
    'still hold up',
  ];

  it.each(GONE)('no longer hardcodes %j', (literal) => {
    expect(screen).not.toContain(`'${literal}`);
    expect(screen).not.toContain(`>${literal}`);
    expect(sheet).not.toContain(`'${literal}`);
  });

  it('renders every accuse key it added', () => {
    const screens = screen + sheet;
    const unused = Object.keys(EN)
      .filter((k) => k.startsWith('accuse.'))
      .filter((k) => !screens.includes(k));
    expect(unused).toEqual([]);
  });
});

describe('the refusal is keyed, not string-matched', () => {
  const screen = read('src/ui/AccusationScreen.tsx');

  /**
   * The engine still returns English `reason` prose for tests and dev logs. The
   * screen must select on `kind` instead — matching the sentence would work
   * until the first time somebody rewords it, and then silently show the wrong
   * refusal.
   */
  it('selects the refusal from the engine discriminator', () => {
    expect(screen).toContain('REFUSAL_KEY[result.kind]');
    expect(screen).not.toContain('{result.reason}');
  });

  it('maps all three gates', () => {
    for (const kind of ['proof', 'motive', 'identity']) {
      expect(screen).toContain(`${kind}: 'accuse.refusal.${kind}'`);
    }
  });

  /**
   * The count line belongs to the proof gate alone. On the motive gate the
   * story is already broken and what is missing is the why, so "N things in
   * their story still hold up" told the player something untrue about their
   * own progress.
   */
  it('shows the remaining count only on the proof gate', () => {
    expect(screen).toContain("result.kind === 'proof' && result.missingCount > 0");
  });
});
