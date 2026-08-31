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
 * Each person's bubble carries their own colour, dimmed to a surface tint.
 *
 * Every incoming bubble was one grey, which is not what a phone looks like and,
 * worse, made a group thread a wall of identical boxes with only a small name
 * label to tell four speakers apart. The character's `avatarColor` is already
 * their identity in the inbox, on the accusation sheet and in the confrontation,
 * so this is that same signal reaching the one screen where it was missing.
 *
 * Mixed hard toward the bubble grey rather than used neat. At full strength
 * these are avatar colours — saturated enough to sit behind a face circle — and
 * a saturated bubble both destroys the body-text contrast and stops the screen
 * reading as somebody's real phone. `MIX` is the fraction of the character's
 * colour that survives; the rest is the original grey, so every bubble stays in
 * the same dark family and only its temperature changes.
 */
const MIX = 0.22;

function mixChannel(from: number, to: number): number {
  return Math.round(from + (to - from) * MIX);
}

function tintFor(sender: Character): string {
  const hex = sender.avatarColor.replace('#', '');
  if (hex.length !== 6) return theme.color.bubbleThem;
  const base = theme.color.bubbleThem.replace('#', '');
  const channel = (at: number) =>
    mixChannel(parseInt(base.slice(at, at + 2), 16), parseInt(hex.slice(at, at + 2), 16));
  const out = [channel(0), channel(2), channel(4)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
  return `#${out}`;
}

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
        isOwn ? styles.own : { backgroundColor: tintFor(sender) },
        radii(isOwn, geometry),
        hasClaims && styles.hasClaims,
      ]}
    >
      {geometry.first && !isOwn ? <Text style={styles.sender}>{sender.name}</Text> : null}
      <Text style={[styles.body, hasClaims && styles.bodyClaim]}>{message.body}</Text>
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
            isOwn ? styles.own : { backgroundColor: tintFor(sender) },
            radii(isOwn, geometry),
            styles.lifted,
          ]}
        >
          {geometry.first && !isOwn ? <Text style={styles.sender}>{sender.name}</Text> : null}
          <Text style={[styles.body, styles.bodyClaim]}>{message.body}</Text>
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
   * The line carries a claim, so it is set in semibold.
   *
   * The hairline border above was meant to mark these without shouting, and it
   * marked them so quietly that players reported missing clues entirely — the
   * whole point of a message that can go on the record is that you notice it is
   * one. Weight rather than colour: a coloured line in a chat reads as a link or
   * a system notice, whereas bold reads as emphasis inside somebody's own
   * sentence, which is what this is. It also survives every locale, which a
   * colour-coded convention explained nowhere does not.
   */
  bodyClaim: { fontWeight: '600' },
  /**
   * The copy that floats above the blur. This one *is* the moment, so it takes
   * the accent outline the in-thread marker deliberately refuses.
   */
  lifted: { borderWidth: 1, borderColor: theme.color.accent },
  sender: { ...theme.type.sender, color: theme.color.accent, marginBottom: 3 },
  body: { ...theme.type.body, color: theme.color.text },
});
