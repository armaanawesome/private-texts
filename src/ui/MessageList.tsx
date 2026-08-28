import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useReduceMotion } from '@/settings/useReduceMotion';
import { theme } from './theme';
import { ChatBubble, type BubbleGeometry } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { DateDivider } from './DateDivider';
import { useCaseStore } from '@/state/caseStore';
import { useTranslator } from '@/i18n/useTranslator';
import type { Character, Thread } from '@/engine';

export const PLAYER_ID = 'you';

/** A visible pause in the conversation earns a time marker. */
const TIME_GAP_MINUTES = 5;

interface Props {
  thread: Thread;
  characters: readonly Character[];
  onPressClaims: (messageId: string) => void;
}

export function MessageList({ thread, characters, onPressClaims }: Props) {
  const reduceMotion = useReduceMotion();
  const t = useTranslator();
  const markRead = useCaseStore((s) => s.markRead);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);

  const initialCount = thread.messages.filter((m) => readMessageIds.includes(m.id)).length;
  const [shown, setShown] = useState(Math.max(initialCount, 1));
  const scrollRef = useRef<ScrollView>(null);

  const byId = new Map(characters.map((c) => [c.id, c]));
  const done = shown >= thread.messages.length;

  /*
   * The conversation advances on a TAP, not on a timer.
   *
   * It used to auto-play: each message arrived on a setTimeout of
   * `theme.motion.typingFor(body)`, which caps at 1.8 seconds however long the
   * line is. That is under two seconds to read a sentence the whole case can
   * hinge on, it cannot be paused, and it does not care whether the player
   * looked away. On a device the messages simply went past.
   *
   * Reading pace belongs to the reader, so the tap is theirs. It also suits what
   * the screen is pretending to be: a conversation handed to you one message at
   * a time.
   */
  const advance = useCallback(() => {
    setShown((n) => Math.min(n + 1, thread.messages.length));
  }, [thread.messages.length]);

  const skipAll = useCallback(() => {
    setShown(thread.messages.length);
  }, [thread.messages.length]);

  /*
   * Marking read follows `shown` rather than happening inside the two actions
   * above, so there is one path for both of them and for whatever a save
   * restored on mount. Skipping used to mark every message itself, which was the
   * same rule written twice with one of them free to drift.
   */
  useEffect(() => {
    thread.messages.slice(0, shown).forEach((m) => markRead(m.id));
  }, [shown, thread.messages, markRead]);

  const visible = thread.messages.slice(0, shown);

  /*
   * Only the OTHER party is ever shown as typing.
   *
   * The next line being the player's own is not something to animate as though
   * somebody else were composing it. The indicator is also the cue that a tap
   * will deliver something, so pointing it at the wrong person misleads twice.
   *
   * reduceMotion no longer dumps the whole thread at once, which is what it used
   * to do. Pacing is not motion — the bubble entrance is, and ChatBubble already
   * suppresses that itself.
   */
  const pending = thread.messages[shown];
  const awaitingOther = !done && pending !== undefined && pending.senderId !== PLAYER_ID;

  return (
    <Pressable
      onPress={done ? undefined : advance}
      style={styles.flex}
      accessibilityRole={done ? undefined : 'button'}
      accessibilityLabel={done ? t('thread.conversation') : t('thread.tapToContinue')}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion })}
      >
        {visible.map((m, i) => {
          const prev = i > 0 ? visible[i - 1] : undefined;
          const next = visible[i + 1];
          const sender = byId.get(m.senderId);
          if (!sender) return null;

          const gap = !prev || m.sentAt - prev.sentAt >= TIME_GAP_MINUTES;
          const geometry: BubbleGeometry = {
            // A time marker breaks the run, so the bubble below it reads as new.
            first: gap || prev?.senderId !== m.senderId,
            last:
              !next ||
              next.senderId !== m.senderId ||
              next.sentAt - m.sentAt >= TIME_GAP_MINUTES,
          };

          return (
            <View key={m.id}>
              {gap ? <DateDivider minutes={m.sentAt} /> : null}
              <ChatBubble
                message={m}
                sender={sender}
                isOwn={m.senderId === PLAYER_ID}
                geometry={geometry}
                onPressClaims={() => onPressClaims(m.id)}
                reduceMotion={reduceMotion}
              />
            </View>
          );
        })}
        {awaitingOther ? <TypingIndicator /> : null}
      </ScrollView>

      {!done ? (
        /*
         * `box-none`, not `none`. The old pill was a label with pointer events
         * switched off, because tapping anywhere already skipped the thread.
         * Now a tap advances by one and this is a real button, so the container
         * has to let touches reach the button without swallowing the taps aimed
         * past it at the conversation.
         */
        <Animated.View
          entering={reduceMotion ? undefined : FadeIn.duration(400).delay(600)}
          style={styles.footer}
          pointerEvents="box-none"
        >
          <Text style={styles.tapHint}>{t('thread.tapToContinue')}</Text>
          <Pressable
            onPress={skipAll}
            accessibilityRole="button"
            accessibilityLabel={t('thread.skipAll')}
            hitSlop={theme.hit.slop}
            style={({ pressed }) => [styles.skipButton, pressed && styles.skipPressed]}
          >
            <Text style={styles.skipText}>{t('thread.skipAll')}</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: theme.color.bg },
  // Clears the footer, so the newest bubble is never parked under the button.
  content: { paddingHorizontal: theme.space.md, paddingBottom: theme.space.xl * 2.5 },

  footer: {
    position: 'absolute',
    bottom: theme.space.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: theme.space.sm,
  },
  tapHint: { ...theme.type.meta, color: theme.color.textDim, letterSpacing: 0.4, opacity: 0.7 },
  skipButton: {
    minHeight: theme.hit.min,
    justifyContent: 'center',
    backgroundColor: theme.color.surface,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.sm,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.bubbleThem,
  },
  skipPressed: { opacity: 0.7 },
  skipText: { ...theme.type.meta, color: theme.color.text, letterSpacing: 0.4 },
});
