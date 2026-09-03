import { memo, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * The backdrop behind every conversation: black, with a faint line-art pattern.
 *
 * This is the one screen whose whole job is to be mistaken for somebody's real
 * messages, and a chat with no wallpaper reads as a mock-up of a chat.
 *
 * ## Two failed versions, and what each one taught
 *
 * **Invisible.** Marks at 5% opacity over a tint six points off the background —
 * under one step of 8-bit colour in places, so some were not drawn at all. It
 * was reported as "there is no chat background".
 *
 * **Germs.** The fix raised the opacity and the density but kept the motif a
 * *filled speck*: small solid bars at scattered angles. Turned up loud enough to
 * see, a field of filled specks does not read as a pattern, it reads as dirt on
 * the screen — and that is what it was called.
 *
 * The reference screens say why. WhatsApp's dark wallpaper is **outlined line
 * art**: closed shapes drawn in a hairline stroke on a near-black field, each
 * mark big enough to recognise as a thing. Outline is what separates "pattern"
 * from "noise" — a stroke reads as something drawn deliberately, where a filled
 * dot of the same area reads as a speck. Size matters for the same reason: at
 * 3px nothing can be a shape.
 *
 * So: black field, hairline outlines, motifs at ~30px, sparse enough that each
 * one is legible on its own.
 *
 * ## Why these five shapes
 *
 * WhatsApp draws the objects of ordinary life because it is a wallpaper for
 * ordinary conversation. The objects here are the ones this game is *about* — a
 * clock, a message, a magnifier, a key, a struck-out cross. The cases turn on
 * what time somebody claims to have been somewhere, so a wall of clocks behind
 * the transcript is the setting rather than decoration.
 *
 * ## Black for every case
 *
 * The per-case tint used to be the *background*, which fought the requirement
 * that this look like a phone: phones have dark chat wallpaper, not aubergine.
 * The field is now `theme.color.bg` everywhere and the case's identity moved
 * into the stroke colour, where it is a difference in temperature rather than a
 * different room.
 *
 * ## No image assets
 *
 * Drawn from Views. A wallpaper costs no bundled PNG per case and cannot drift
 * from the palette it belongs to.
 */

/**
 * One stroke hue per case, picked by hash rather than assigned by hand.
 *
 * A hand-written map would need an entry for every future case and would
 * silently fall back to grey for the one somebody forgot. All of these are muted
 * enough to sit at low opacity on black without tinting the field itself.
 */
const INKS = [
  '#7FA6C9', // cold blue
  '#B08FC7', // plum
  '#7FC7A4', // green
  '#C7A87F', // warm sand
  '#7FBFC7', // slate cyan
  '#C78FA6', // mauve
] as const;

/** The pattern grid. Sparse and large, because a shape has to be legible to be a shape. */
const ROWS = 10;
const COLUMNS = 5;

/** Motif box, in points. Roughly WhatsApp's doodle scale on a phone. */
const CELL = 30;

/** Hairline. Any heavier and the outlines start reading as filled again. */
const STROKE = 1.1;

/**
 * Visible, but never competing. Higher than the filled version needed, because a
 * 1.1px outline puts far less ink on the screen than a solid bar of the same
 * bounding box — the same opacity reads much fainter.
 */
const OPACITY = 0.17;

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function inkFor(caseId: string): string {
  return INKS[hash(caseId) % INKS.length] ?? INKS[0];
}

/**
 * The five motifs, each drawn as outlines inside a 30x30 box.
 *
 * Composed from bordered Views rather than SVG: this project has no SVG library,
 * and adding one for a background would mean a native rebuild — which
 * `poster.ts` already refused for the case tiles.
 */
function motif(kind: number, ink: string): ReactNode {
  const line = { backgroundColor: ink };
  const ring = { borderColor: ink, borderWidth: STROKE };

  switch (kind % 5) {
    // A clock. The game's own subject: what time does somebody say it was.
    case 0:
      return (
        <>
          <View
            style={[styles.abs, ring, { top: 6, left: 6, width: 18, height: 18, borderRadius: 9 }]}
          />
          <View style={[styles.abs, line, { top: 9, left: 14.5, width: STROKE, height: 6 }]} />
          <View style={[styles.abs, line, { top: 14.5, left: 15, width: 5, height: STROKE }]} />
        </>
      );
    // A message bubble.
    case 1:
      return (
        <>
          <View
            style={[styles.abs, ring, { top: 5, left: 4, width: 21, height: 14, borderRadius: 5 }]}
          />
          <View
            style={[
              styles.abs,
              ring,
              { top: 16, left: 8, width: 5, height: 5, transform: [{ rotate: '45deg' }] },
            ]}
          />
        </>
      );
    // A magnifier.
    case 2:
      return (
        <>
          <View
            style={[styles.abs, ring, { top: 5, left: 5, width: 14, height: 14, borderRadius: 7 }]}
          />
          <View
            style={[
              styles.abs,
              line,
              { top: 18, left: 19, width: STROKE, height: 8, transform: [{ rotate: '-45deg' }] },
            ]}
          />
        </>
      );
    // A key.
    case 3:
      return (
        <>
          <View
            style={[styles.abs, ring, { top: 11, left: 3, width: 8, height: 8, borderRadius: 4 }]}
          />
          <View style={[styles.abs, line, { top: 14.5, left: 11, width: 13, height: STROKE }]} />
          <View style={[styles.abs, line, { top: 15, left: 20, width: STROKE, height: 4 }]} />
        </>
      );
    // A struck-out cross: the mark somebody makes against a statement.
    default:
      return (
        <>
          <View
            style={[
              styles.abs,
              line,
              { top: 14.4, left: 7, width: 16, height: STROKE, transform: [{ rotate: '45deg' }] },
            ]}
          />
          <View
            style={[
              styles.abs,
              line,
              { top: 14.4, left: 7, width: 16, height: STROKE, transform: [{ rotate: '-45deg' }] },
            ]}
          />
        </>
      );
  }
}

function ChatWallpaperImpl({ caseId }: { caseId: string }) {
  const ink = inkFor(caseId);
  const cells: ReactNode[] = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const n = hash(`${caseId}:${row}:${column}`);
      // Roughly one cell in six stays empty, so the field never reads as a table.
      if (n % 6 === 0) continue;

      // Small rotations only. A doodle wallpaper is tilted, not tumbling — past
      // about fifteen degrees the shapes stop reading as objects and start
      // reading as debris, which is the failure this replaces.
      const angle = ((n >> 4) % 7) * 5 - 15;
      const jitterX = (((n >> 8) % 100) / 100 - 0.5) * 5;
      const jitterY = (((n >> 14) % 100) / 100 - 0.5) * 5;

      cells.push(
        <View
          key={`${row}-${column}`}
          style={[
            styles.cell,
            {
              top: `${(row / ROWS) * 100}%`,
              // Every other row is offset half a column, so the grid reads as a
              // weave rather than a table.
              left: `${((column + (row % 2) * 0.5) / COLUMNS) * 100}%`,
              transform: [
                { translateX: jitterX },
                { translateY: jitterY },
                { rotate: `${angle}deg` },
              ],
            },
          ]}
        >
          {motif(n >> 3, ink)}
        </View>,
      );
    }
  }

  return (
    /*
     * `pointerEvents="none"` is load-bearing. This sits under the whole
     * conversation, and the message list's tap-to-advance and its scrolling both
     * have to pass straight through it.
     */
    <View style={[StyleSheet.absoluteFill, styles.field]} pointerEvents="none">
      {cells}
    </View>
  );
}

/**
 * Memoised on `caseId`. The thread re-renders on every revealed message, and
 * rebuilding fifty motifs each time would be work nobody can see.
 */
export const ChatWallpaper = memo(ChatWallpaperImpl);

const styles = StyleSheet.create({
  field: { backgroundColor: theme.color.bg },
  cell: { position: 'absolute', width: CELL, height: CELL, opacity: OPACITY },
  abs: { position: 'absolute' },
});
