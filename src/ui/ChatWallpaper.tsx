import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * A different backdrop behind every case's conversations.
 *
 * Every thread in the game sat on the same flat near-black, which is not what
 * anybody's phone looks like — people set a wallpaper, and a chat with none
 * reads as a mock-up of a chat. This is the one screen whose whole job is to be
 * mistaken for somebody's real messages, so a dead background costs more here
 * than anywhere else in the app.
 *
 * ## How far to take it
 *
 * The first version of this note argued for "barely there, by design" and set
 * the motif at 5% opacity in a near-black on near-black. It shipped, and the
 * person playing it reported the chat had no background at all. It was right
 * about the principle and wrong about the number by a factor of three.
 *
 * Re-grounded against the reference screens rather than against the idea of
 * them. WhatsApp's doodle field and Telegram's are plainly *visible* line art —
 * you can describe what the shapes are — and they stay out of the way through
 * being low-contrast and evenly distributed, not through being invisible.
 * Gojek's does the same on a light field. What none of them do is compete with
 * a bubble, because the bubbles sit on an opaque fill above them.
 *
 * So: legible texture, not a subliminal one. The test is whether somebody
 * notices the screen has a backdrop at all, which is the test the last one
 * failed.
 *
 * ## No image assets
 *
 * The motif is the game's own evidence mark — the same short bar that counts
 * contradictions on the case tile, the accusation sheet and the closing screen —
 * scattered on a diagonal. Drawn from Views, so a wallpaper costs no bundled PNG
 * per case and cannot drift from the palette it belongs to.
 */

/**
 * One tint per case, picked by hash rather than assigned by hand.
 *
 * A hand-written map would need an entry for every future case and would
 * silently fall back to black for the one somebody forgot. These all sit within
 * a few points of the base background, so any of them is safe behind any case.
 */
const TINTS = [
  '#141B24', // cold blue-black
  '#1C1622', // plum-black
  '#121D18', // green-black
  '#221A12', // warm brown-black
  '#101D23', // slate-black
  '#1F1620', // mauve-black
] as const;

/**
 * Rows and columns of marks.
 *
 * Denser than it was. The first version drew 84 and the person playing it
 * reported the chat had no background, which is the only test that counts.
 */
const ROWS = 18;
const COLUMNS = 7;

function tintFor(caseId: string): string {
  let hash = 0;
  for (let i = 0; i < caseId.length; i += 1) hash = (hash * 31 + caseId.charCodeAt(i)) >>> 0;
  return TINTS[hash % TINTS.length] ?? TINTS[0];
}

/**
 * A small deterministic hash per cell, so the scatter is stable.
 *
 * Not `Math.random()`: this component re-renders whenever the thread does, and
 * a wallpaper that reshuffles itself mid-conversation is a distraction of
 * exactly the kind the whole file is trying to avoid.
 */
function cellNoise(caseId: string, row: number, column: number): number {
  let h = 2166136261;
  const seed = `${caseId}:${row}:${column}`;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/** Three mark shapes, so the field reads as scattered evidence, not as a grid of tallies. */
const SHAPES = [
  { width: 3, height: 14 },
  { width: 3, height: 9 },
  { width: 6, height: 6 },
] as const;

export function ChatWallpaper({ caseId }: { caseId: string }) {
  const marks: ReactNode[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const noise = cellNoise(caseId, row, column);
      // Roughly one cell in seven stays empty, which is what stops the field
      // reading as wallpaper-by-tiling.
      if (noise % 7 === 0) continue;
      const shape = SHAPES[noise % SHAPES.length] ?? SHAPES[0];
      const angle = ((noise >> 4) % 5) * 18 - 36;
      const jitterX = (((noise >> 8) % 100) / 100 - 0.5) * (100 / COLUMNS) * 0.5;
      const jitterY = (((noise >> 14) % 100) / 100 - 0.5) * (100 / ROWS) * 0.5;

      marks.push(
        <View
          key={`${row}-${column}`}
          style={[
            styles.mark,
            shape,
            {
              top: `${(row / ROWS) * 100 + jitterY}%`,
              // Every other row is offset half a column, so the marks read as
              // scattered rather than as a table.
              left: `${((column + (row % 2) * 0.5) / COLUMNS) * 100 + jitterX}%`,
              transform: [{ rotate: `${angle}deg` }],
            },
          ]}
        />,
      );
    }
  }

  return (
    /*
     * `pointerEvents="none"` is load-bearing. This sits under the whole
     * conversation, and the message list's tap-to-advance and its scrolling both
     * have to pass straight through it.
     */
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: tintFor(caseId) }]}
      pointerEvents="none"
    >
      {marks}
    </View>
  );
}

const styles = StyleSheet.create({
  /**
   * 0.14, up from 0.05.
   *
   * The old comment claimed 0.1 would make the marks "read as content" and that
   * five percent was the band where the screen stops looking dead. On a handset
   * the screen still looked dead — 5% of `textDim` over a tint six points off
   * the background is under one step of 8-bit colour in places, so on real
   * hardware a good share of these marks were literally not being drawn.
   *
   * Sizes and shapes vary per cell (see SHAPES), which buys visible texture at a
   * lower opacity than a uniform field would need.
   */
  mark: {
    position: 'absolute',
    borderRadius: 1.5,
    backgroundColor: theme.color.textDim,
    opacity: 0.14,
  },
});
