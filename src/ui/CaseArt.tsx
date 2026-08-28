import { View, Image, StyleSheet } from 'react-native';
import { theme } from './theme';
import { artFor } from './caseArtAssets';
import { CasePoster } from './CasePoster';
import type { CaseScript } from '@/engine';

interface Props {
  script: CaseScript;
  locked: boolean;
}

/**
 * A case tile's cover: the painted art if the case has any, the generated
 * poster if it does not.
 *
 * One component rather than a branch at each call site, so neither the grid nor
 * the Continue card has to know which cases have been painted yet — and so the
 * locked treatment is defined once for both kinds of cover.
 *
 * **The locked rule is carried over deliberately.** `CasePoster` draws a locked
 * case in the rail colour: the shape of the evidence is visible, the reading is
 * not. A padlock badge would say the same thing louder and tell the player
 * nothing about the case. The painted covers keep that idea — banked down
 * behind a scrim, so the composition still reads as its own case, just not one
 * you can open yet.
 */
export function CaseArt({ script, locked }: Props) {
  const art = artFor(script.id);
  if (art === undefined) return <CasePoster script={script} locked={locked} />;

  return (
    <View style={styles.frame} accessible={false} importantForAccessibility="no-hide-descendants">
      <Image source={art} style={styles.image} resizeMode="cover" />
      {/* Not a padlock. The case stays legible as itself. */}
      {locked ? <View style={styles.scrim} pointerEvents="none" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // Matches CasePoster's frame exactly, so a grid holding both kinds stays on
  // one rhythm while only some cases are painted.
  frame: {
    aspectRatio: 3 / 4,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    backgroundColor: theme.color.bg,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.color.bg,
    opacity: 0.62,
  },
});
