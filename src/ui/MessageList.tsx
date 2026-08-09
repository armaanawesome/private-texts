import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { theme } from './theme';
import { ChatBubble, type BubbleGeometry } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { DateDivider } from './DateDivider';
import { useCaseStore } from '@/state/caseStore';
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
  const reduceMotion = useReducedMotion();
  const markRead = useCaseStore((s) => s.markRead);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);

  const initialCount = thread.messages.filter((m) => readMessageIds.includes(m.id)).length;
  const [shown, setShown] = useState(Math.max(initialCount, 1));
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const byId = new Map(characters.map((c) => [c.id, c]));
  const done = shown >= thread.messages.length;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const skip = useCallback(() => {
    clearTimers();
    setTyping(false);
    setShown(thread.messages.length);
    thread.messages.forEach((m) => markRead(m.id));
  }, [clearTimers, markRead, thread.messages]);

  useEffect(() => {
    thread.messages.slice(0, shown).forEach((m) => markRead(m.id));
  }, [shown, thread.messages, markRead]);

  useEffect(() => {
    if (done) return;
    const next = thread.messages[shown];
    if (!next) return;
    if (reduceMotion) {
      skip();
      return;
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, theme.motion.typingFor(next.body));
    timers.current.push(t);
    return clearTimers;
  }, [shown, done, thread.messages, reduceMotion, skip, clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const visible = thread.messages.slice(0, shown);

  return (
    <Pressable
      onPress={done ? undefined : skip}
      style={styles.flex}
      accessibilityRole={done ? undefined : 'button'}
      accessibilityLabel={done ? 'Conversation' : 'Tap to skip ahead'}
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
        {typing ? <TypingIndicator /> : null}
      </ScrollView>

      {!done ? (
        <Animated.View
          entering={reduceMotion ? undefined : FadeIn.duration(400).delay(900)}
          style={styles.skipHint}
          pointerEvents="none"
        >
          <Text style={styles.skipText}>Tap to skip</Text>
        </Animated.View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: theme.color.bg },
  content: { paddingHorizontal: theme.space.md, paddingBottom: theme.space.xl },
  skipHint: {
    position: 'absolute',
    bottom: theme.space.lg,
    alignSelf: 'center',
    backgroundColor: theme.color.surface,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.bubbleThem,
  },
  skipText: { ...theme.type.meta, color: theme.color.textDim, letterSpacing: 0.4 },
});
