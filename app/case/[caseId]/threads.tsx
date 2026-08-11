import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { theme } from '@/ui/theme';
import { clockOf } from '@/ui/timeScale';
import { useCaseStore } from '@/state/caseStore';
import { visibleThreads, type CaseScript, type Thread } from '@/engine';

const PLAYER_ID = 'you';

/**
 * The inbox.
 *
 * Deliberately built as flat rows with hairline separators rather than floating
 * cards. Cards read as "app UI"; a real Messages list reads as rows, and this
 * screen's entire job is to be mistaken for one. It is the first thing that has
 * to convince you that you are holding somebody's phone.
 */
export default function ThreadsScreen() {
  const script = useCaseStore((s) => s.script);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);

  if (!script) return null;

  const threads = visibleThreads(script, confirmedIds);
  const hidden = script.threads.length - threads.length;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {threads.map((t, i) => (
        <ThreadRow
          key={t.id}
          thread={t}
          script={script}
          readMessageIds={readMessageIds}
          first={i === 0}
        />
      ))}

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

function ThreadRow({
  thread,
  script,
  readMessageIds,
  first,
}: {
  thread: Thread;
  script: CaseScript;
  readMessageIds: readonly string[];
  first: boolean;
}) {
  const unread = thread.messages.filter((m) => !readMessageIds.includes(m.id)).length;
  const last = thread.messages[thread.messages.length - 1];

  // A one-to-one thread borrows the other person's colour; a group falls back to
  // the thread's own initial, the way a group chat without a photo does.
  const others = thread.participantIds.filter((id) => id !== PLAYER_ID);
  const solo = others.length === 1 ? script.characters.find((c) => c.id === others[0]) : undefined;
  const tint = solo?.avatarColor ?? theme.color.rail;
  const initial = (solo?.name ?? thread.title).slice(0, 1).toUpperCase();

  const sender = last ? script.characters.find((c) => c.id === last.senderId) : undefined;
  const preview = last
    ? `${last.senderId === PLAYER_ID ? 'You: ' : others.length > 1 && sender ? `${sender.name}: ` : ''}${last.body}`
    : 'No messages';

  return (
    <Link href={`/thread/${thread.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${thread.title}. ${unread > 0 ? `${unread} unread.` : 'No unread messages.'}`}
        style={({ pressed }) => [styles.row, !first && styles.divided, pressed && styles.pressed]}
      >
        <View style={[styles.avatar, { backgroundColor: tint }]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.line}>
            <Text style={[styles.title, unread > 0 && styles.titleUnread]} numberOfLines={1}>
              {thread.title}
            </Text>
            {last ? <Text style={styles.time}>{clockOf(last.sentAt)}</Text> : null}
          </View>
          <View style={styles.line}>
            <Text style={[styles.preview, unread > 0 && styles.previewUnread]} numberOfLines={1}>
              {preview}
            </Text>
            {unread > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unread}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const AVATAR = 44;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  content: { paddingBottom: theme.space.xl },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.md,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.md,
  },
  /**
   * The separator starts after the avatar, not at the screen edge — the inset
   * rule is the detail that makes a list read as a native inbox.
   */
  divided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.rule,
    marginLeft: AVATAR + theme.space.md + theme.space.md,
    paddingLeft: 0,
    marginRight: 0,
  },
  pressed: { backgroundColor: theme.color.surface },

  avatar: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2, alignItems: 'center', justifyContent: 'center' },
  initial: { ...theme.type.title, color: theme.color.bg, fontSize: 18 },

  body: { flex: 1, gap: 3 },
  line: { flexDirection: 'row', alignItems: 'center', gap: theme.space.sm },
  title: { ...theme.type.body, color: theme.color.text, flex: 1 },
  titleUnread: { fontWeight: '600' },
  time: { ...theme.type.meta, color: theme.color.textDim },
  preview: { ...theme.type.meta, color: theme.color.textDim, flex: 1 },
  previewUnread: { color: theme.color.text },

  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.proof,
  },
  badgeText: { ...theme.type.meta, color: theme.color.bg, fontWeight: '600', fontSize: 11 },

  locked: {
    ...theme.type.meta,
    color: theme.color.textDim,
    paddingHorizontal: theme.space.md,
    paddingTop: theme.space.lg,
  },
});
