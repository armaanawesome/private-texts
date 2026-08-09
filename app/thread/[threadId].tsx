import { useMemo, useState } from 'react';
import { useLocalSearchParams, Stack, Redirect } from 'expo-router';
import { useReducedMotion } from 'react-native-reanimated';
import { MessageList, PLAYER_ID } from '@/ui/MessageList';
import { ClaimMenu } from '@/ui/ClaimMenu';
import { useCaseStore } from '@/state/caseStore';
import { saveProgress } from '@/state/persistence';

export default function ThreadScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const reduceMotion = useReducedMotion();
  const script = useCaseStore((s) => s.script);
  const pinnedClaimIds = useCaseStore((s) => s.pinnedClaimIds);
  const togglePin = useCaseStore((s) => s.togglePin);
  const [sheetFor, setSheetFor] = useState<string | null>(null);

  const title = script?.threads.find((t) => t.id === threadId)?.title ?? '';
  const titleOptions = useMemo(() => ({ title }), [title]);

  if (!script) return <Redirect href="/" />;
  const thread = script.threads.find((t) => t.id === threadId);
  if (!thread) return <Redirect href="/" />;

  const active = sheetFor ? (thread.messages.find((m) => m.id === sheetFor) ?? null) : null;
  const sender = active ? (script.characters.find((c) => c.id === active.senderId) ?? null) : null;

  return (
    <>
      {/* Memoised: an inline literal makes the navigator setOptions every
          render, which loops. See app/_layout.tsx. */}
      <Stack.Screen options={titleOptions} />
      <MessageList thread={thread} characters={script.characters} onPressClaims={setSheetFor} />

      <ClaimMenu
        message={active}
        sender={sender}
        isOwn={active?.senderId === PLAYER_ID}
        pinnedClaimIds={pinnedClaimIds}
        reduceMotion={reduceMotion}
        onPick={(claim) => {
          togglePin(claim.id);
          setSheetFor(null);
          void saveProgress(script.id);
        }}
        onClose={() => setSheetFor(null)}
      />
    </>
  );
}
