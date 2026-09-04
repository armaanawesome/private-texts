import { memo, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { hashSeed, wallpaperAt, type Shape } from './wallpapers';

/**
 * The backdrop behind a conversation: a dark field with a faint line-art motif,
 * and **a different one for every contact**.
 *
 * This is the one screen whose whole job is to be mistaken for somebody's real
 * messages, and a chat with no wallpaper reads as a mock-up of a chat.
 *
 * ## Per contact, not per case
 *
 * It used to key on the case, so every thread in a case shared one backdrop.
 * Real phones do not work that way — a wallpaper is something set for a
 * conversation — and more usefully here, a distinct field per contact lets the
 * player tell at a glance which thread they are in after switching away and
 * back. Sixteen cases deep, that is worth more than consistency.
 *
 * ## Two failed versions, and what each one taught
 *
 * **Invisible.** Marks at 5% opacity over a tint six points off the background —
 * under one step of 8-bit colour in places, so some were not drawn at all.
 *
 * **Germs.** The next version raised the opacity and the density but kept the
 * motif a *filled speck*. Turned up loud enough to see, filled specks do not
 * read as a pattern; they read as dirt on the screen, which is what they were
 * called.
 *
 * The reference screens say why. WhatsApp's dark wallpaper is **outlined line
 * art**: closed shapes in a hairline stroke, each big enough to recognise as a
 * thing. Outline is the whole difference — a stroke reads as drawn, a filled dot
 * of the same area reads as a speck — and so is scale, because at 3px nothing
 * can be a shape at all.
 *
 * ## What varies between the ten, and what does not
 *
 * Varies: the field colour, the ink, the three motifs, and the grid density.
 * Fixed: hairline stroke, ~30px motifs, low opacity, dark field. That split is
 * what lets ten backdrops be obviously different from each other and obviously
 * the same product — the brief was "different dark colours or shapes, same
 * vibe", and the vibe lives in the constants.
 *
 * Every field colour is darker than `bubbleThem` (#22262D), which is the rule
 * that keeps a bubble reading as a bubble on all ten.
 *
 * ## No image assets
 *
 * Drawn from Views. Ten wallpapers cost no bundled PNGs and cannot drift from
 * the palette they belong to.
 */

/** Motif box, in points. Roughly WhatsApp's doodle scale on a phone. */
const CELL = 30;

/** Hairline. Any heavier and the outlines start reading as filled again. */
const STROKE = 1.1;

/**
 * Draws one motif as outlines inside a 30x30 box.
 *
 * Composed from bordered Views rather than SVG: this project has no SVG library,
 * and adding one for a background would mean a native rebuild — which
 * `poster.ts` already refused for the case tiles.
 */
function shape(kind: Shape, ink: string): ReactNode {
  const line = { backgroundColor: ink };
  const ring = { borderColor: ink, borderWidth: STROKE };

  switch (kind) {
    // The game's own subject: what time does somebody say it was.
    case 'clock':
      return (
        <>
          <View style={[s.abs, ring, { top: 6, left: 6, width: 18, height: 18, borderRadius: 9 }]} />
          <View style={[s.abs, line, { top: 9, left: 14.5, width: STROKE, height: 6 }]} />
          <View style={[s.abs, line, { top: 14.5, left: 15, width: 5, height: STROKE }]} />
        </>
      );
    case 'bubble':
      return (
        <>
          <View style={[s.abs, ring, { top: 5, left: 4, width: 21, height: 14, borderRadius: 5 }]} />
          <View
            style={[
              s.abs,
              ring,
              { top: 16, left: 8, width: 5, height: 5, transform: [{ rotate: '45deg' }] },
            ]}
          />
        </>
      );
    case 'lens':
      return (
        <>
          <View style={[s.abs, ring, { top: 5, left: 5, width: 14, height: 14, borderRadius: 7 }]} />
          <View
            style={[
              s.abs,
              line,
              { top: 18, left: 19, width: STROKE, height: 8, transform: [{ rotate: '-45deg' }] },
            ]}
          />
        </>
      );
    case 'key':
      return (
        <>
          <View style={[s.abs, ring, { top: 11, left: 3, width: 8, height: 8, borderRadius: 4 }]} />
          <View style={[s.abs, line, { top: 14.5, left: 11, width: 13, height: STROKE }]} />
          <View style={[s.abs, line, { top: 15, left: 20, width: STROKE, height: 4 }]} />
        </>
      );
    // The mark somebody makes against a statement.
    case 'cross':
      return (
        <>
          <View
            style={[
              s.abs,
              line,
              { top: 14.4, left: 7, width: 16, height: STROKE, transform: [{ rotate: '45deg' }] },
            ]}
          />
          <View
            style={[
              s.abs,
              line,
              { top: 14.4, left: 7, width: 16, height: STROKE, transform: [{ rotate: '-45deg' }] },
            ]}
          />
        </>
      );
    case 'envelope':
      return (
        <>
          <View style={[s.abs, ring, { top: 8, left: 4, width: 22, height: 15, borderRadius: 2 }]} />
          <View
            style={[
              s.abs,
              line,
              { top: 12, left: 6, width: 14, height: STROKE, transform: [{ rotate: '32deg' }] },
            ]}
          />
          <View
            style={[
              s.abs,
              line,
              { top: 12, left: 11, width: 14, height: STROKE, transform: [{ rotate: '-32deg' }] },
            ]}
          />
        </>
      );
    case 'lock':
      return (
        <>
          <View
            style={[s.abs, ring, { top: 13, left: 7, width: 16, height: 12, borderRadius: 3 }]}
          />
          {/* The shackle: a ring whose lower half is covered by the body. */}
          <View
            style={[s.abs, ring, { top: 5, left: 10, width: 10, height: 10, borderRadius: 5 }]}
          />
        </>
      );
    // Ridges. A print, not a target — the break in the middle is what tells them apart.
    case 'print':
      return (
        <>
          <View style={[s.abs, ring, { top: 4, left: 8, width: 14, height: 16, borderRadius: 7 }]} />
          <View style={[s.abs, ring, { top: 8, left: 11, width: 8, height: 10, borderRadius: 4 }]} />
          <View style={[s.abs, line, { top: 11, left: 14.5, width: STROKE, height: 5 }]} />
        </>
      );
    case 'pin':
      return (
        <>
          <View
            style={[s.abs, ring, { top: 5, left: 11, width: 9, height: 9, borderRadius: 4.5 }]}
          />
          <View style={[s.abs, line, { top: 14, left: 15, width: STROKE, height: 10 }]} />
        </>
      );
    case 'link':
      return (
        <>
          <View style={[s.abs, ring, { top: 9, left: 4, width: 12, height: 12, borderRadius: 6 }]} />
          <View
            style={[s.abs, ring, { top: 9, left: 13, width: 12, height: 12, borderRadius: 6 }]}
          />
        </>
      );
    // Strokes and a slash: the way anybody counts on paper.
    case 'tally':
      return (
        <>
          <View style={[s.abs, line, { top: 9, left: 8, width: STROKE, height: 13 }]} />
          <View style={[s.abs, line, { top: 9, left: 13, width: STROKE, height: 13 }]} />
          <View style={[s.abs, line, { top: 9, left: 18, width: STROKE, height: 13 }]} />
          <View
            style={[
              s.abs,
              line,
              { top: 15, left: 6, width: 16, height: STROKE, transform: [{ rotate: '-24deg' }] },
            ]}
          />
        </>
      );
    // A window, for the cases that turn on who saw what from where.
    default:
      return (
        <>
          <View style={[s.abs, ring, { top: 6, left: 6, width: 18, height: 18, borderRadius: 2 }]} />
          <View style={[s.abs, line, { top: 6, left: 14.5, width: STROKE, height: 18 }]} />
          <View style={[s.abs, line, { top: 14.5, left: 6, width: 18, height: STROKE }]} />
        </>
      );
  }
}

/**
 * `index` picks the backdrop; `seed` only scatters the motifs within it, so two
 * contacts sharing a theme would still not share a layout.
 */
function ChatWallpaperImpl({ seed, index }: { seed: string; index: number }) {
  const paper = wallpaperAt(index);
  const cells: ReactNode[] = [];

  for (let row = 0; row < paper.rows; row += 1) {
    for (let column = 0; column < paper.columns; column += 1) {
      const n = hashSeed(`${seed}:${row}:${column}`);
      // Roughly one cell in six stays empty, so the field never reads as a table.
      if (n % 6 === 0) continue;

      // Small rotations only. A doodle wallpaper is tilted, not tumbling — past
      // about fifteen degrees the shapes stop reading as objects and start
      // reading as debris, which is the failure this replaced.
      const angle = ((n >> 4) % 7) * 5 - 15;
      const jitterX = (((n >> 8) % 100) / 100 - 0.5) * 5;
      const jitterY = (((n >> 14) % 100) / 100 - 0.5) * 5;
      const kind = paper.shapes[(n >> 3) % paper.shapes.length] ?? paper.shapes[0];

      cells.push(
        <View
          key={`${row}-${column}`}
          style={[
            s.cell,
            { opacity: paper.opacity },
            {
              top: `${(row / paper.rows) * 100}%`,
              // Every other row is offset half a column, so the grid reads as a
              // weave rather than a table.
              left: `${((column + (row % 2) * 0.5) / paper.columns) * 100}%`,
              transform: [
                { translateX: jitterX },
                { translateY: jitterY },
                { rotate: `${angle}deg` },
              ],
            },
          ]}
        >
          {shape(kind, paper.ink)}
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
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: paper.field }]}
      pointerEvents="none"
      /*
       * Flattened to a single texture, because this layer is about 160 views
       * that never change.
       *
       * Counted from the source: roughly 42 of the 50 grid cells are drawn, and
       * each motif is a wrapper plus 2.8 views on average. Every one of them is
       * a real native view the compositor walks each frame, sitting underneath a
       * conversation that repaints on every tap.
       *
       * Rasterising is right here and nowhere else in the app: the content is
       * decorative, static for the life of the thread, and already
       * `pointerEvents="none"`. Nothing inside it animates, so there is no cache
       * to invalidate — which is the usual reason not to do this.
       */
      shouldRasterizeIOS
      renderToHardwareTextureAndroid
    >
      {cells}
    </View>
  );
}

/**
 * Memoised on `seed`. The thread re-renders on every revealed message, and
 * rebuilding fifty motifs each time would be work nobody can see.
 */
export const ChatWallpaper = memo(ChatWallpaperImpl);

const s = StyleSheet.create({
  cell: { position: 'absolute', width: CELL, height: CELL },
  abs: { position: 'absolute' },
});
