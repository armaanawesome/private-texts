import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The memo on `ChatBubble` was present and inert, which is the worst state for a
 * performance guard: it looks handled in review and does nothing on a device.
 *
 * `MessageList` builds two props fresh on every render — `geometry={{first,
 * last}}` and `onPressClaims={() => onPressClaims(m.id)}` — and a shallow
 * compare fails on both. So every tap re-rendered every revealed bubble, and the
 * cost of a tap grew with the length of the conversation. The owner reported it
 * as tapping fast making the game slow and the graphics degrade.
 *
 * These are source assertions rather than render assertions because the
 * component imports react-native, which the Node suite cannot parse — the same
 * constraint that put `wallpapers.ts` and `volume.ts` in their own files. What
 * can be checked here is that the arrangement which made the memo inert has not
 * come back.
 */

const read = (name: string) => readFileSync(join(process.cwd(), 'src/ui', name), 'utf8');

describe('the ChatBubble memo actually compares something', () => {
  const bubble = read('ChatBubble.tsx');

  it('passes a comparator to memo rather than relying on shallow equality', () => {
    expect(bubble).toContain('memo(ChatBubbleImpl, sameBubble)');
  });

  /**
   * The two props that defeat a shallow compare are exactly the two that must be
   * compared by value. If either leaves the comparator, the memo is inert again
   * for that prop.
   */
  it('compares the geometry booleans by value, not the object by identity', () => {
    expect(bubble).toContain('a.geometry.first === b.geometry.first');
    expect(bubble).toContain('a.geometry.last === b.geometry.last');
  });

  it('still compares the identity of everything that decides what is drawn', () => {
    for (const clause of [
      'a.message === b.message',
      'a.sender === b.sender',
      'a.isOwn === b.isOwn',
      'a.reduceMotion === b.reduceMotion',
    ]) {
      expect(bubble, `${clause} is missing from sameBubble`).toContain(clause);
    }
  });

  /**
   * Ignoring the callback is safe ONLY because `MessageList` is handed
   * `setSheetFor`, a `useState` setter whose identity React guarantees. This
   * pins that premise: if the thread screen ever passes something that closes
   * over changing state, the comparator has to start comparing it, and this is
   * where that gets noticed.
   */
  it('is still handed a stable setState function, which is why the callback may be ignored', () => {
    const screen = readFileSync(join(process.cwd(), 'app/thread/[threadId].tsx'), 'utf8');
    expect(screen).toContain('onPressClaims={setSheetFor}');
  });
});

describe('the chat wallpaper is flattened rather than composited view by view', () => {
  const paper = read('ChatWallpaper.tsx');

  /**
   * About 160 static views sit under every conversation. They are decorative,
   * unchanging and already pointer-transparent, so they belong in one texture.
   */
  it('rasterises on both platforms', () => {
    expect(paper).toContain('shouldRasterizeIOS');
    expect(paper).toContain('renderToHardwareTextureAndroid');
  });

  /**
   * Rasterising a layer that animates costs more than it saves, by rebuilding
   * the cache every frame. Nothing in here may animate.
   */
  it('has nothing animated inside it to invalidate the cache', () => {
    expect(paper).not.toContain('Animated');
    expect(paper).not.toContain('useSharedValue');
    expect(paper).not.toContain('entering=');
  });
});
