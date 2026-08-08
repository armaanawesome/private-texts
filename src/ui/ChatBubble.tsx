import { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import type { Character, Message } from '@/engine';

interface Props {
  message: Message;
  sender: Character;
  /** True when this is the player's own message. */
  isOwn: boolean;
  /** First in a run from the same sender — only then is the name shown. */
  showSender: boolean;
  /** More than 5 in-fiction minutes since the previous message. */
  showTime: boolean;
  onPressClaims?: () => void;
  reduceMotion: boolean;
}

/** In-fiction clock, from minutes since the case epoch. */
function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function ChatBubbleImpl({
  message,
  sender,
  isOwn,
  showSender,
  showTime,
  onPressClaims,
  reduceMotion,
}: Props) {
  const hasClaims = (message.claims?.length ?? 0) > 0;

  const body = (
    <View
      style={[
        styles.bubble,
        isOwn ? styles.own : styles.them,
        // A hairline marker: this message put something on the record.
        hasClaims && styles.hasClaims,
      ]}
    >
      {showSender && !isOwn ? <Text style={styles.sender}>{sender.name}</Text> : null}
      <Text style={styles.body}>{message.body}</Text>
      {showTime ? <Text style={styles.time}>{formatTime(message.sentAt)}</Text> : null}
    </View>
  );

  return (
    <Animated.View
      entering={reduceMotion ? undefined : FadeInDown.duration(180).springify()}
      style={[styles.row, isOwn ? styles.rowOwn : styles.rowThem]}
    >
      {hasClaims ? (
        <Pressable
          onLongPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPressClaims?.();
          }}
          hitSlop={theme.hit.slop}
          accessibilityRole="button"
          accessibilityLabel={`Message from ${sender.name}. Long press to record a statement.`}
          style={({ pressed }) => (pressed ? styles.pressed : undefined)}
        >
          {body}
        </Pressable>
      ) : (
        body
      )}
    </Animated.View>
  );
}

export const ChatBubble = memo(ChatBubbleImpl);

const styles = StyleSheet.create({
  row: { marginVertical: theme.space.xs, maxWidth: '82%' },
  rowOwn: { alignSelf: 'flex-end' },
  rowThem: { alignSelf: 'flex-start' },
  pressed: { opacity: 0.7 },
  bubble: {
    borderRadius: theme.radius.bubble,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
  },
  them: { backgroundColor: theme.color.bubbleThem },
  own: { backgroundColor: theme.color.bubbleYou },
  hasClaims: { borderLeftWidth: 2, borderLeftColor: theme.color.proof },
  sender: { ...theme.type.sender, color: theme.color.accent, marginBottom: 2 },
  body: { ...theme.type.body, color: theme.color.text },
  time: { ...theme.type.meta, color: theme.color.textDim, alignSelf: 'flex-end', marginTop: 2 },
});
