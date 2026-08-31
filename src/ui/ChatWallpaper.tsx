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
 * Six reference conversation screens were pulled for this. The ones that work —
 * WhatsApp, Telegram — put a motif only a few percent off the field colour, so
 * it registers as texture rather than as picture and never competes with a
 * bubble for attention. The ones that go further (iMessage over a photograph)
 * stay legible only because their bubbles are fully opaque and high-contrast,
 * and this app's are neither. So: barely there, by design. If it is the first
 * thing you notice, it is wrong.
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
  '#12161B', // cold blue-black
  '#161318', // plum-black
  '#111713', // green-black
  '#181410', // warm brown-black
  '#101619', // slate-black
  '#171317', // mauve-black
] as const;

/** Rows and columns of marks. Sparse: this is texture, not a grid. */
const ROWS = 14;
const COLUMNS = 6;

function tintFor(caseId: string): string {
  let hash = 0;
  for (let i = 0; i < caseId.length; i += 1) hash = (hash * 31 + caseId.charCodeAt(i)) >>> 0;
  return TINTS[hash % TINTS.length] ?? TINTS[0];
}

export function ChatWallpaper({ caseId }: { caseId: string }) {
  const marks: ReactNode[] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      marks.push(
        <View
          key={`${row}-${column}`}
          style={[
            styles.mark,
            {
              top: `${(row / ROWS) * 100}%`,
              // Every other row is offset half a column, so the marks read as
              // scattered rather than as a table.
              left: `${((column + (row % 2) * 0.5) / COLUMNS) * 100}%`,
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
   * 0.05 opacity, and that is not a placeholder value.
   *
   * At 0.1 the marks read as content and the eye starts checking whether they
   * mean something; at 0.02 they vanish on an OLED panel at low brightness,
   * which is exactly how this game gets played. Five percent is the band where
   * the screen stops looking dead without ever asking to be read.
   */
  mark: {
    position: 'absolute',
    width: 2,
    height: 10,
    borderRadius: 1,
    backgroundColor: theme.color.textDim,
    opacity: 0.05,
    transform: [{ rotate: '20deg' }],
  },
});
