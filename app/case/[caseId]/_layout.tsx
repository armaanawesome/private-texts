import { useEffect } from 'react';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { getCase } from '@content/cases';
import { useCaseStore } from '@/state/caseStore';
import { loadProgress } from '@/state/persistence';

export default function CaseLayout() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();
  const script = getCase(caseId);
  const loadScript = useCaseStore((s) => s.loadScript);
  const loadedId = useCaseStore((s) => s.script?.id);

  useEffect(() => {
    if (!script || loadedId === script.id) return;
    loadScript(script);
    void loadProgress(script.id);
  }, [script, loadedId, loadScript]);

  if (!script) return <Redirect href="/" />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="threads">
        <NativeTabs.Trigger.Icon sf="bubble.left.and.bubble.right" md="chat" />
        <NativeTabs.Trigger.Label>Threads</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="board">
        <NativeTabs.Trigger.Icon sf="pin" md="push_pin" />
        <NativeTabs.Trigger.Label>Board</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="accuse">
        <NativeTabs.Trigger.Icon sf="exclamationmark.bubble" md="gavel" />
        <NativeTabs.Trigger.Label>Accuse</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
