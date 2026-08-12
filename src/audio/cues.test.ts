import { describe, it, expect } from 'vitest';
import { CUES, CUE_IDS } from './cues';

describe('the cue table', () => {
  it('lists exactly the cues it defines', () => {
    // CUE_IDS is hand-written to stay typed as CueId[] without a cast. This is
    // what stops it drifting from CUES when a fifth cue is added.
    expect([...CUE_IDS].sort()).toEqual(Object.keys(CUES).sort());
  });

  it('keys every cue by its own id', () => {
    for (const [key, cue] of Object.entries(CUES)) {
      expect(cue.id).toBe(key);
    }
  });

  it('gives every cue a gain inside the usable range', () => {
    for (const cue of Object.values(CUES)) {
      expect(cue.gain).toBeGreaterThan(0);
      expect(cue.gain).toBeLessThanOrEqual(1);
    }
  });

  it('marks the two cues that report something as signals', () => {
    // These survive Reduce Motion. If either is ever downgraded to a flourish,
    // a player with Reduce Motion on loses the only audible report that they
    // just won, which is the moment the game exists for.
    expect(CUES.contradiction.role).toBe('signal');
    expect(CUES.confession.role).toBe('signal');
  });

  it('marks the cues that merely accompany a visible change as flourishes', () => {
    expect(CUES.message.role).toBe('flourish');
    expect(CUES.pin.role).toBe('flourish');
  });
});

/*
 * registry.ts is deliberately NOT imported here. Its `Record<CueId, ...>` type
 * already makes a missing cue a compile error, so a test would add nothing — and
 * the moment a real `require('../../assets/audio/*.m4a')` lands in it, importing
 * it from a Node test would fail on an asset Metro resolves and Node cannot.
 */
