import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '@/ui/theme';
import { useCaseStore } from '@/state/caseStore';
import { visibleThreads } from '@/engine';

export default function ThreadsScreen() {
  const script = useCaseStore((s) => s.script);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);

  if (!script) return null;

  const threads = visibleThreads(script, confirmedIds);
  const hidden = script.threads.length - threads.length;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {threads.map((t) => {
        const unread = t.messages.filter((m) => !readMessageIds.includes(m.id)).length;
        const last = t.messages[t.messages.length - 1];
        return (
          <Link key={t.id} href={`/thread/${t.id}`} asChild>
            <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
              <View style={styles.rowText}>
                <Text style={styles.title}>{t.title}</Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {last?.body ?? 'No messages'}
                </Text>
              </View>
              {unread > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unread}</Text>
                </View>
              ) : null}
            </Pressable>
          </Link>
        );
      })}

      {hidden > 0 ? (
        <Text style={styles.locked}>
          {hidden === 1
            ? 'One conversation is still out of reach. Prove something first.'
            : `${hidden} conversations are still out of reach. Prove something first.`}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { padding: theme.space.md, gap: theme.space.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    minHeight: theme.hit.min + 16,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.chip,
    padding: theme.space.md,
  },
  pressed: { opacity: 0.7 },
  rowText: { flex: 1, gap: 2 },
  title: { ...theme.type.body, color: theme.color.text },
  preview: { ...theme.type.meta, color: theme.color.textDim },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.proof,
  },
  badgeText: { ...theme.type.meta, color: theme.color.bg, fontWeight: '600' },
  locked: { ...theme.type.meta, color: theme.color.textDim, marginTop: theme.space.md },
});
