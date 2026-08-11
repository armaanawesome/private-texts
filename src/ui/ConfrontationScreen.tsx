import { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, { FadeIn, FadeInDown, useReducedMotion } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from './theme';
import {
  press,
  establishedMotiveIds,
  type CaseScript,
  type EvidenceRef,
  type Progress,
} from '@/engine';

interface Props {
  script: CaseScript;
  progress: Progress;
  onClosed: () => void;
}

interface Line {
  key: string;
  who: 'them' | 'you';
  text: string;
}

/** Chip text: enough to know which fact you are laying down, not the whole speech. */
function firstSentence(s: string): string {
  const cut = s.indexOf('. ');
  return cut === -1 ? s : s.slice(0, cut + 1);
}

/**
 * The endgame, played as a conversation.
 *
 * The whole game is read as text messages, so the confrontation is too — but
 * this is the one thread where the player speaks. Every line they can say is
 * something they proved or read; nothing here is free. She gives ground one fact
 * at a time and confesses when there is nothing left to push back with, so the
 * ending belongs to the player's case rather than to a script running out.
 */
export function ConfrontationScreen({ script, progress, onClosed }: Props) {
  const reduceMotion = useReducedMotion();
  const confrontation = script.confrontation;
  const scrollRef = useRef<ScrollView>(null);

  const [landed, setLanded] = useState<string[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const [lines, setLines] = useState<Line[]>(() =>
    confrontation ? [{ key: 'open', who: 'them', text: confrontation.opening }] : [],
  );
  const [confessed, setConfessed] = useState(false);

  const killer = script.characters.find((c) => c.id === script.solution.killerId);

  /** Only what the player actually holds. Nothing here can be guessed into. */
  const evidence: { ref: EvidenceRef; label: string; key: string }[] = [
    ...script.contradictions
      .filter((c) => progress.confirmedContradictionIds.includes(c.id))
      .map((c) => ({
        ref: { kind: 'contradiction' as const, id: c.id },
        label: firstSentence(c.revelation),
        key: `x:${c.id}`,
      })),
    ...script.motives
      .filter((m) => establishedMotiveIds(script.motives, progress.readMessageIds).includes(m.id))
      .map((m) => ({
        ref: { kind: 'motive' as const, id: m.id },
        label: firstSentence(m.summary),
        key: `m:${m.id}`,
      })),
  ];

  const say = useCallback((next: Line[]) => {
    setLines((prev) => [...prev, ...next]);
    // Let layout settle before chasing the bottom.
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }, []);

  if (!confrontation || !killer) return null;

  function put(item: { ref: EvidenceRef; label: string; key: string }) {
    if (confessed) return;
    const outcome = press(confrontation!, landed, item.ref);

    if (outcome.kind === 'repeat') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      say([{ key: `r-${Date.now()}`, who: 'them', text: 'You have said that already.' }]);
      return;
    }

    if (outcome.kind === 'deflected') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      say([
        { key: `p-${item.key}-${Date.now()}`, who: 'you', text: item.label },
        { key: `d-${Date.now()}`, who: 'them', text: outcome.line },
      ]);
      return;
    }

    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLanded((l) => [...l, outcome.beat.id]);
    setUsed((u) => [...u, item.key]);

    const next: Line[] = [{ key: `p-${outcome.beat.id}`, who: 'you', text: outcome.beat.press }];
    // The last beat gets no rebuttal in content — she has nothing left.
    if (outcome.beat.rebuttal.trim() !== '') {
      next.push({ key: `t-${outcome.beat.id}`, who: 'them', text: outcome.beat.rebuttal });
    }
    say(next);

    if (outcome.complete) setConfessed(true);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.transcript}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: !reduceMotion })}
      >
        <View style={styles.head}>
          <View style={[styles.avatar, { backgroundColor: killer.avatarColor }]}>
            <Text style={styles.initial}>{killer.name.slice(0, 1)}</Text>
          </View>
          <Text style={styles.headName}>{killer.name}</Text>
        </View>

        {lines.map((l) => (
          <Animated.View
            key={l.key}
            entering={reduceMotion ? undefined : FadeInDown.springify().damping(18).mass(0.6)}
            style={[styles.row, l.who === 'you' ? styles.rowYou : styles.rowThem]}
          >
            <View style={[styles.bubble, l.who === 'you' ? styles.you : styles.them]}>
              <Text style={styles.body}>{l.text}</Text>
            </View>
          </Animated.View>
        ))}

        {confessed ? (
          <Animated.View
            entering={reduceMotion ? undefined : FadeIn.duration(600).delay(theme.motion.base)}
            style={styles.confession}
          >
            <Text style={styles.confessionText}>{confrontation.confession}</Text>
          </Animated.View>
        ) : null}
      </ScrollView>

      {confessed ? (
        <Pressable
          onPress={onClosed}
          accessibilityRole="button"
          style={({ pressed }) => [styles.close, pressed && styles.pressed]}
        >
          <Text style={styles.closeText}>Close the case</Text>
        </Pressable>
      ) : (
        <View style={styles.tray}>
          <Text style={styles.trayLabel}>
            {landed.length === 0
              ? 'Put it to her. One fact at a time.'
              : `${confrontation.beats.length - landed.length} left to say`}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {evidence.map((e) => {
              const spent = used.includes(e.key);
              return (
                <Pressable
                  key={e.key}
                  onPress={() => put(e)}
                  accessibilityRole="button"
                  accessibilityLabel={`Put to ${killer.name}: ${e.label}`}
                  style={({ pressed }) => [styles.chip, spent && styles.chipSpent, pressed && styles.pressed]}
                >
                  <Text style={[styles.chipText, spent && styles.chipTextSpent]} numberOfLines={3}>
                    {e.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  transcript: { padding: theme.space.md, gap: theme.space.xs, paddingBottom: theme.space.lg },

  head: { alignItems: 'center', gap: theme.space.sm, paddingVertical: theme.space.lg },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  initial: { ...theme.type.title, color: theme.color.bg },
  headName: { ...theme.type.body, color: theme.color.textDim },

  row: { maxWidth: '84%' },
  rowThem: { alignSelf: 'flex-start' },
  rowYou: { alignSelf: 'flex-end' },
  bubble: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: theme.radius.bubble },
  them: { backgroundColor: theme.color.bubbleThem },
  you: { backgroundColor: theme.color.bubbleYou },
  body: { ...theme.type.body, color: theme.color.text },

  confession: {
    marginTop: theme.space.lg,
    paddingTop: theme.space.lg,
    borderTopWidth: 1,
    borderTopColor: theme.color.rule,
  },
  confessionText: { ...theme.type.body, color: theme.color.text },

  tray: {
    borderTopWidth: 1,
    borderTopColor: theme.color.rule,
    paddingVertical: theme.space.sm,
    gap: theme.space.sm,
    backgroundColor: theme.color.surface,
  },
  trayLabel: { ...theme.type.meta, color: theme.color.textDim, paddingHorizontal: theme.space.md },
  chips: { paddingHorizontal: theme.space.md, gap: theme.space.sm },
  chip: {
    maxWidth: 240,
    justifyContent: 'center',
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.color.rule,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    minHeight: theme.hit.min,
  },
  chipSpent: { opacity: 0.35 },
  chipText: { ...theme.type.meta, color: theme.color.text },
  chipTextSpent: { color: theme.color.textDim },

  close: {
    margin: theme.space.md,
    minHeight: theme.hit.min,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.chip,
  },
  closeText: { ...theme.type.body, color: theme.color.bg, fontWeight: '600' },
  pressed: { opacity: 0.7 },
});
