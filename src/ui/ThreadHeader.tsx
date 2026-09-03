import { View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';
import { PLAYER_ID } from './MessageList';
import type { Character } from '@/engine';

/**
 * The identity row at the top of a conversation: who you are talking to, with a
 * face beside the name.
 *
 * The thread header was a bare text title, which is the one part of the chat
 * that did not look like a chat. Every reference screen pulled for this puts an
 * avatar immediately against the name — WhatsApp and Gojek to the left of it,
 * Telegram opposite it — and Gojek's is the closest fit here because it draws
 * initials on a coloured disc rather than a photograph, which is exactly what
 * this game has: every character already owns an `avatarColor` used on the
 * accusation sheet, the confrontation and the bubble tint. This is that same
 * identity reaching the last screen that was missing it.
 *
 * ## Groups get a stack
 *
 * A thread with three people in it cannot be represented by one disc without
 * picking a winner. The reference group headers overlap two or three avatars and
 * let the rest fall off, so that is what this does, with the names carried in
 * the subtitle rather than in a "+2" chip — the subtitle is already there for
 * groups, and a chip would be a second thing to look at.
 */

/** How many discs a stacked header shows before it stops. */
const MAX_STACK = 3;

/** Overlap, in points. Negative margin, so the discs read as a set rather than a row. */
const OVERLAP = -10;

export function Avatar({ character, size = 30 }: { character: Character; size?: number }) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: character.avatarColor,
        },
      ]}
    >
      <Text style={[styles.initial, { fontSize: size * 0.46 }]} numberOfLines={1}>
        {character.name.slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );
}

interface Props {
  title: string;
  /** Everyone in the thread, player included — this filters them out itself. */
  participants: readonly Character[];
}

export function ThreadHeaderTitle({ title, participants }: Props) {
  /*
   * You are not one of the faces at the top of your own conversation. A phone
   * shows you who you are talking TO, and including the player would make every
   * one-to-one thread look like a group of two.
   */
  const others = participants.filter((c) => c.id !== PLAYER_ID);
  const shown = others.slice(0, MAX_STACK);
  const isGroup = others.length > 1;

  return (
    <View style={styles.row}>
      <View style={styles.stack}>
        {shown.map((c, i) => (
          /* A ring in the header colour separates one disc from the next where
             they overlap; without it a stack of similar tones reads as a single
             lumpy shape. */
          <View key={c.id} style={[styles.ring, i === 0 ? undefined : styles.stacked]}>
            <Avatar character={c} size={isGroup ? 26 : 30} />
          </View>
        ))}
      </View>

      <View style={styles.identity}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {isGroup ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {others.map((c) => c.name).join(', ')}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  stack: { flexDirection: 'row', alignItems: 'center' },
  stacked: { marginLeft: OVERLAP },
  ring: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.color.bg,
  },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  /*
   * Dark ink on the character's colour, matching the accusation sheet and the
   * closing screen. Every `avatarColor` in the game is a mid-tone chosen to
   * carry it, so this does not need a per-colour luminance test — and adding one
   * would let a future character ship a colour that only works because the test
   * rescued it.
   */
  initial: { ...theme.type.sender, color: theme.color.bg },
  identity: { flexShrink: 1 },
  title: { ...theme.type.body, color: theme.color.text, fontWeight: '700' },
  subtitle: { ...theme.type.meta, color: theme.color.textDim, marginTop: 1 },
});
