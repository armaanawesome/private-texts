import { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, Redirect } from 'expo-router';
import { theme } from '@/ui/theme';
import { MessageList } from '@/ui/MessageList';
import { ClaimChip } from '@/ui/ClaimChip';
import { useCaseStore } from '@/state/caseStore';
import { saveProgress } from '@/state/persistence';

export default function ThreadScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const script = useCaseStore((s) => s.script);
  const pinnedClaimIds = useCaseStore((s) => s.pinnedClaimIds);
  const togglePin = useCaseStore((s) => s.togglePin);
  const [sheetFor, setSheetFor] = useState<string | null>(null);

  if (!script) return <Redirect href="/" />;
  const thread = script.threads.find((t) => t.id === threadId);
  if (!thread) return <Redirect href="/" />;

  const sheetClaims = sheetFor
    ? (thread.messages.find((m) => m.id === sheetFor)?.claims ?? [])
    : [];

  return (
    <>
      <Stack.Screen options={{ title: thread.title }} />
      <MessageList
        thread={thread}
        characters={script.characters}
        onPressClaims={setSheetFor}
      />

      <Modal
        visible={sheetFor !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSheetFor(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setSheetFor(null)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.grabber} />
            <Text style={styles.heading}>Write it down</Text>
            <Text style={styles.sub}>
              Adding a statement to the record lets you compare it on the board.
            </Text>
            {sheetClaims.map((c) => (
              <ClaimChip
                key={c.id}
                claim={c}
                pinned={pinnedClaimIds.includes(c.id)}
                onPress={() => {
                  togglePin(c.id);
                  setSheetFor(null);
                  void saveProgress(script.id);
                }}
              />
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: theme.color.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.space.lg,
    paddingBottom: theme.space.xl,
    gap: theme.space.sm,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.color.bubbleThem,
    alignSelf: 'center',
    marginBottom: theme.space.sm,
  },
  heading: { ...theme.type.title, color: theme.color.text },
  sub: { ...theme.type.meta, color: theme.color.textDim, marginBottom: theme.space.sm },
});
