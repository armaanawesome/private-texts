import { View, StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * The show/hide-password mark, drawn rather than set in an icon font.
 *
 * Same reason the tick on the case tiles is drawn: an emoji renders in a
 * different typeface on every platform and carries a colour the screen does not
 * choose, and one icon does not justify a font dependency.
 *
 * ## The shape is a lens, not a pill
 *
 * The first version was a 22x14 rounded rectangle with a dot in it, and rendered
 * it read as a **toggle switch** — a stadium outline with a knob inside is the
 * universal shape for one. A square with two opposite corners fully rounded,
 * turned 45 degrees, gives the pointed-at-both-ends lens that reads as an eye.
 *
 * The slash is a sibling of the lens rather than a child, because the lens
 * carries a 45-degree rotation and a child would inherit it — the slash would
 * come out horizontal, which reads as a strikethrough rather than a
 * crossing-out.
 */
export function EyeGlyph({ struck }: { struck: boolean }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.lens}>
        <View style={styles.iris} />
      </View>
      {struck ? <View style={styles.slash} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  lens: {
    width: 17,
    height: 17,
    borderWidth: 1.5,
    borderColor: theme.color.textDim,
    // Two opposite corners round, two nearly square: a leaf, which becomes a
    // horizontal lens once turned.
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderTopRightRadius: 1,
    borderBottomLeftRadius: 1,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** A circle, so the parent's rotation cannot show. */
  iris: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.color.textDim },
  slash: {
    position: 'absolute',
    width: 26,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: theme.color.textDim,
    transform: [{ rotate: '-45deg' }],
  },
});
