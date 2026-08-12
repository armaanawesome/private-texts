import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCaseStore } from './caseStore';
import { saveBlobSchema, type SaveBlob } from './saveBlob';
import { saveKey } from './saveKeys';

/**
 * Pins are deliberately not persisted — an in-progress comparison is not
 * meaningful across sessions, and restoring one would put the player back
 * mid-thought with no memory of why.
 *
 * The blob shape and the key space now live in saveBlob.ts and saveKeys.ts,
 * because progress sync has to validate a row that came back from the server
 * against exactly the same schema, and "reset progress" has to find every save
 * key without hand-writing the prefix a second time.
 */
export async function saveProgress(caseId: string): Promise<void> {
  const { readMessageIds, confirmedContradictionIds } = useCaseStore.getState();
  const blob: SaveBlob = { readMessageIds, confirmedContradictionIds };
  await AsyncStorage.setItem(saveKey(caseId), JSON.stringify(blob));
}

export async function loadProgress(caseId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(saveKey(caseId));
  if (!raw) return;
  try {
    const blob = saveBlobSchema.parse(JSON.parse(raw));
    useCaseStore.setState({
      readMessageIds: blob.readMessageIds,
      confirmedContradictionIds: blob.confirmedContradictionIds,
    });
  } catch {
    // A corrupt save should start a fresh case, not crash the app.
    await AsyncStorage.removeItem(saveKey(caseId));
  }
}
