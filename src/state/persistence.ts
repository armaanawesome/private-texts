import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCaseStore } from './caseStore';

const key = (caseId: string) => `save:${caseId}`;

interface SaveBlob {
  readMessageIds: string[];
  confirmedContradictionIds: string[];
}

/**
 * Pins are deliberately not persisted — an in-progress comparison is not
 * meaningful across sessions, and restoring one would put the player back
 * mid-thought with no memory of why.
 */
export async function saveProgress(caseId: string): Promise<void> {
  const { readMessageIds, confirmedContradictionIds } = useCaseStore.getState();
  const blob: SaveBlob = { readMessageIds, confirmedContradictionIds };
  await AsyncStorage.setItem(key(caseId), JSON.stringify(blob));
}

export async function loadProgress(caseId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(key(caseId));
  if (!raw) return;
  try {
    const blob = JSON.parse(raw) as SaveBlob;
    useCaseStore.setState({
      readMessageIds: blob.readMessageIds ?? [],
      confirmedContradictionIds: blob.confirmedContradictionIds ?? [],
    });
  } catch {
    // A corrupt save should start a fresh case, not crash the app.
    await AsyncStorage.removeItem(key(caseId));
  }
}
