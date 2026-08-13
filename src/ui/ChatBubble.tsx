import { forwardRef, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { feedback } from '@/settings/feedback';
import { theme } from './theme';
import type { Character, Message } from '@/engine';

export interface BubbleGeometry {
  /** First message of a run from this sender. */
  first: boolean;
  /** Last message of a run from this sender. */
  last: boolean;
}

interface Props {
  message: Message;
  sender: Character;
  isOwn: boolean;
  geometry: BubbleGeometry;
  onPressClaims?: (layout: { x: number; y: number; width: number; height: number }) => void;
  reduceMotion: boolean;
}

const R = theme.radius.bubble;
const TIGHT = 6;

/**
 * Corner geometry follows the run, not the message.
 *
 * A run of messages from one person reads as a single utterance when the inner
 * corners tighten and only the outer ones stay round. Uniformly rounded bubbles
 * are the giveaway of a chat UI built from a single reusable box.
 */
function radii(isOwn: boolean, { first, last }: BubbleGeometry) {
  const near = isOwn ? 'Right' : 'Left';
  return {
    borderTopLeftRadius: R,
    borderTopRightRadius: R,
    borderBottomLeftRadius: R,
    borderBottomRightRadius: R,
    [`borderTop${near}Radius`]: first ? R : TIGHT,
    [`borderBottom${near}Radius`]: last ? R : TIGHT,
  } as const;
}

function ChatBubbleImpl({ message, sender, isOwn, geometry, onPressClaims, reduceMotion }: Props) {
  const hasClaims = (message.claims?.length ?? 0) > 0;

  const bubble = (
    <View
      style={[
        styles.bubble,
        isOwn ? styles.own : styles.them,
        radii(isOwn, geometry),
        hasClaims && styles.hasClaims,
      ]}
    >
      {geometry.first && !isOwn ? <Text style={styles.sender}>{sender.name}</Text> : null}
      <Text style={styles.body}>{message.body}</Text>
    </View>
  );

  return (
    <Animated.View
      entering={reduceMotion ? undefined : FadeInDown.springify().damping(18).mass(0.6)}
      style={[
        styles.row,
        isOwn ? styles.rowOwn : styles.rowThem,
        // Tight within a run, open between speakers — the rhythm that makes a
        // transcript read as conversation instead of a list.
        { marginTop: geometry.first ? theme.space.md : 2 },
      ]}
    >
      {hasClaims ? (
        <Pressable
          onLongPress={(e) => {
            feedback.impact('medium');
            const { pageX, pageY, locationX, locationY } = e.nativeEvent;
            onPressClaims?.({
              x: pageX - locationX,
              y: pageY - locationY,
              width: 0,
              height: 0,
            });
          }}
          delayLongPress={280}
          hitSlop={theme.hit.slop}
          accessibilityRole="button"
          accessibilityLabel={`Message from ${sender.name}. Hold to put a statement on the record.`}
          style={({ pressed }) => (pressed ? styles.pressed : undefined)}
        >
          {bubble}
        </Pressable>
      ) : (
        bubble
      )}
    </Animated.View>
  );
}

export const ChatBubble = memo(ChatBubbleImpl);

/** Same visual, no interaction — used for the lifted copy in the claim menu. */
export const StaticBubble = forwardRef<View, Omit<Props, 'onPressClaims' | 'reduceMotion'>>(
  function StaticBubble({ message, sender, isOwn, geometry }, ref) {
    return (
      <View ref={ref} style={[styles.row, isOwn ? styles.rowOwn : styles.rowThem]}>
        <View
          style={[
            styles.bubble,
            isOwn ? styles.own : styles.them,
            radii(isOwn, geometry),
            styles.lifted,
          ]}
        >
          {geometry.first && !isOwn ? <Text style={styles.sender}>{sender.name}</Text> : null}
          <Text style={styles.body}>{message.body}</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  row: { maxWidth: '80%' },
  rowOwn: { alignSelf: 'flex-end' },
  rowThem: { alignSelf: 'flex-start' },
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  them: { backgroundColor: theme.color.bubbleThem },
  own: { backgroundColor: theme.color.bubbleYou },
  /**
   * A message you can hold to pin straight to the board.
   *
   * Deliberately almost invisible. Reading a message is already enough to put
   * its claim on the record — `availableClaims` derives from what you have read
   * — so this marks a shortcut, not a gate, and it does not need to advertise.
   * It was a 2px blue bar, which shouted "game" on the one surface whose whole
   * job is to be mistaken for a real messaging app.
   */
  hasClaims: { borderWidth: StyleSheet.hairlineWidth, borderColor: theme.color.rule },
  /**
   * The copy that floats above the blur. This one *is* the moment, so it takes
   * the accent outline the in-thread marker deliberately refuses.
   */
  lifted: { borderWidth: 1, borderColor: theme.color.accent },
  sender: { ...theme.type.sender, color: theme.color.accent, marginBottom: 3 },
  body: { ...theme.type.body, color: theme.color.text },
});
