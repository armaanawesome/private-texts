import { View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * Centred time marker between message runs.
 *
 * Every real messaging app surveyed on Mobbin — Riot Mobile, XChat, TextNow,
 * BeReal — marks time with a centred divider, never a timestamp tucked inside
 * the bubble. Putting the time in the bubble is the single clearest tell that
 * a chat UI was designed rather than observed.
 */
export function DateDivider({ minutes }: { minutes: number }) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const day = Math.floor(minutes / 1440);
  const label = `${day === 0 ? 'Today' : `Day ${day + 1}`}, ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', marginVertical: theme.space.md },
  text: {
    ...theme.type.meta,
    color: theme.color.textDim,
    letterSpacing: 0.3,
  },
});
