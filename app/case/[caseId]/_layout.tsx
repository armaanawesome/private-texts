import { useEffect } from 'react';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { getCase } from '@content/cases';
import { visibleThreads } from '@/engine';
import { useCaseStore } from '@/state/caseStore';
import { loadProgress } from '@/state/persistence';

export default function CaseLayout() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const script = getCase(caseId);
  const loadScript = useCaseStore((s) => s.loadScript);
  const loadedId = useCaseStore((s) => s.script?.id);
  const readMessageIds = useCaseStore((s) => s.readMessageIds);
  const confirmedIds = useCaseStore((s) => s.confirmedContradictionIds);

  useEffect(() => {
    if (!script || loadedId === script.id) return;
    loadScript(script);
    void loadProgress(script.id);
  }, [script, loadedId, loadScript]);

  if (!script) return <Redirect href="/" />;

  // Only counts threads the player can actually open — a gated thread is not
  // "unread", it does not exist yet as far as they are concerned.
  const progress = { confirmedContradictionIds: confirmedIds, readMessageIds };
  const unread = visibleThreads(script, progress)
    .flatMap((t) => t.messages)
    .filter((m) => !readMessageIds.includes(m.id)).length;

  // Nothing else in the game says "you have enough now". Without this the player
  // has to keep guessing at the accusation screen to discover they are ready,
  // and a wrong guess there is the one move the game treats as final.
  const ready = script.solution.requiredContradictionIds.every((id) => confirmedIds.includes(id));

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="threads">
        <NativeTabs.Trigger.Icon sf="bubble.left.and.bubble.right" md="chat" />
        <NativeTabs.Trigger.Label>Threads</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Badge hidden={unread === 0}>{String(unread)}</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="board">
        <NativeTabs.Trigger.Icon sf="pin" md="push_pin" />
        <NativeTabs.Trigger.Label>Board</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="accuse">
        <NativeTabs.Trigger.Icon sf="exclamationmark.bubble" md="gavel" />
        <NativeTabs.Trigger.Label>Accuse</NativeTabs.Trigger.Label>
        {/* A space can render as an empty pill on Android; a character is safe. */}
        <NativeTabs.Trigger.Badge hidden={!ready}>!</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
