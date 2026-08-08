import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Pressable, View, Text, StyleSheet } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { theme } from './theme';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { useCaseStore } from '@/state/caseStore';
import type { Character, Thread } from '@/engine';

/** The player's own seat in every thread. */
export const PLAYER_ID = 'you';

interface Props {
  thread: Thread;
  characters: readonly Character[];
  onPressClaims: (messageId: string) => void;
}

/** Show a timestamp only when the conversation has visibly paused. */
const TIME_GAP_MINUTES = 5;

export function MessageList({ thread, characters, onPressClaims }: Props) {
  const reduceMotion = useReducedMotion();
  const markRead = useCaseStore((s) => s.markRead);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);

  // Messages already read in a previous session are present immediately; only
  // genuinely new ones play out. Re-reading a thread must not replay the wait.
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

  /** Flush the whole thread instantly. Without this the game is unplayable on a
   *  replay, and impossible to film for the demo video. */
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

    const delay = theme.motion.typingFor(next.body);
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, delay);
    timers.current.push(t1);

    return clearTimers;
  }, [shown, done, thread.messages, reduceMotion, skip, clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const visible = thread.messages.slice(0, shown);

  return (
    <Pressable onPress={done ? undefined : skip} style={styles.flex} accessibilityRole="button"
      accessibilityLabel={done ? 'Conversation' : 'Tap to skip ahead'}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion })}
      >
        {visible.map((m, i) => {
          const prev = i > 0 ? visible[i - 1] : undefined;
          const sender = byId.get(m.senderId);
          if (!sender) return null;
          return (
            <ChatBubble
              key={m.id}
              message={m}
              sender={sender}
              isOwn={m.senderId === PLAYER_ID}
              showSender={prev?.senderId !== m.senderId}
              showTime={!prev || m.sentAt - prev.sentAt >= TIME_GAP_MINUTES}
              onPressClaims={() => onPressClaims(m.id)}
              reduceMotion={reduceMotion}
            />
          );
        })}
        {typing ? <TypingIndicator /> : null}
      </ScrollView>

      {!done ? (
        <View style={styles.skipHint} pointerEvents="none">
          <Text style={styles.skipText}>Tap to skip</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.md, paddingBottom: theme.space.xl },
  skipHint: {
    position: 'absolute',
    bottom: theme.space.md,
    alignSelf: 'center',
    backgroundColor: theme.color.surface,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: theme.radius.chip,
    opacity: 0.9,
  },
  skipText: { ...theme.type.meta, color: theme.color.textDim },
});
