import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCaseStore } from './caseStore';
import { saveBlobSchema, type SaveBlob } from './saveBlob';
import { saveKey, saveKeysIn, caseIdFromSaveKey } from './saveKeys';
import { RESUME_KEY, lastPlayedSchema, type LastPlayed } from './resume';

/**
 * Pins are deliberately not persisted — an in-progress comparison is not
 * meaningful across sessions, and restoring one would put the player back
 * mid-thought with no memory of why.
 *
 * The blob shape and the key space now live in saveBlob.ts and saveKeys.ts,
 * because progress sync has to validate a row that came back from the server
 * against exactly the same schema, and "reset progress" has to find every save
 * key without hand-writing the prefix a second time. Which case to resume, and
 * whether resuming makes sense at all, lives in resume.ts.
 */
export async function saveProgress(caseId: string): Promise<void> {
  const { readMessageIds, confirmedContradictionIds, lastThreadId, lastMessageId, solved } =
    useCaseStore.getState();
  const blob: SaveBlob = {
    readMessageIds,
    confirmedContradictionIds,
    lastThreadId,
    lastMessageId,
    solved,
  };
  await AsyncStorage.setItem(saveKey(caseId), JSON.stringify(blob));
  // Any write is evidence this is the case being played.
  await markLastPlayed(caseId);
}

/**
 * One validated read, shared by the case screen and the home screen.
 *
 * Returns null both when there is no save and when the save was unreadable, so
 * that a corrupt save is indistinguishable from a fresh case everywhere
 * downstream — which is exactly the recovery behaviour we want.
 */
export async function readSave(caseId: string): Promise<SaveBlob | null> {
  const raw = await AsyncStorage.getItem(saveKey(caseId));
  if (!raw) return null;
  try {
    return saveBlobSchema.parse(JSON.parse(raw));
  } catch {
    // A corrupt save should start a fresh case, not crash the app.
    await AsyncStorage.removeItem(saveKey(caseId));
    return null;
  }
}

export async function loadProgress(caseId: string): Promise<void> {
  const blob = await readSave(caseId);
  if (blob) {
    useCaseStore.setState({
      readMessageIds: blob.readMessageIds,
      confirmedContradictionIds: blob.confirmedContradictionIds,
      lastThreadId: blob.lastThreadId,
      lastMessageId: blob.lastMessageId,
      solved: blob.solved,
    });
  }
  // Set even when there was nothing to load: the question the flag answers is
  // "has storage been consulted", not "was there a save".
  useCaseStore.setState({ hydrated: true });
}

/**
 * Every case this device has solved.
 *
 * The case grid needs all of them at once to decide what is reachable, and the
 * per-case store only ever holds the case that is open — so this reads the saves
 * directly rather than going through it.
 *
 * A corrupt save counts as unsolved rather than throwing. Being asked to replay
 * a case is a bad afternoon; a grid that cannot render is a broken app, and the
 * same reasoning already governs `readSave`.
 */
export async function readSolvedCaseIds(): Promise<Set<string>> {
  const solved = new Set<string>();
  // AsyncStorage is one flat namespace shared with Supabase's session entry and
  // the settings blob, so the keys are filtered rather than assumed.
  const keys = saveKeysIn(await AsyncStorage.getAllKeys());
  if (keys.length === 0) return solved;

  for (const [key, raw] of await AsyncStorage.multiGet(keys)) {
    const caseId = caseIdFromSaveKey(key);
    if (caseId === null || raw === null) continue;
    try {
      if (saveBlobSchema.parse(JSON.parse(raw)).solved) solved.add(caseId);
    } catch {
      continue;
    }
  }
  return solved;
}

/** Stamps this case as the one Continue should offer. */
export async function markLastPlayed(caseId: string): Promise<void> {
  const pointer: LastPlayed = { caseId, updatedAt: Date.now() };
  await AsyncStorage.setItem(RESUME_KEY, JSON.stringify(pointer));
}

/**
 * The pointer and the save it names, for the home screen to turn into an offer.
 *
 * Deliberately returns raw records rather than a decision: whether to *show*
 * Continue depends on the case list and the player's entitlements, which this
 * module has no business knowing. `offerResume` in resume.ts makes that call
 * and is unit-tested; this function only fetches.
 */
export async function readResume(): Promise<{ last: LastPlayed; save: SaveBlob } | null> {
  const raw = await AsyncStorage.getItem(RESUME_KEY);
  if (!raw) return null;

  let last: LastPlayed;
  try {
    last = lastPlayedSchema.parse(JSON.parse(raw));
  } catch {
    await AsyncStorage.removeItem(RESUME_KEY);
    return null;
  }

  const save = await readSave(last.caseId);
  if (!save) {
    // The pointer outlived its save — most often because the save was corrupt
    // and got cleared, or progress was reset. Drop it so the home screen shows
    // the plain grid instead of offering to continue a case with no progress.
    await AsyncStorage.removeItem(RESUME_KEY);
    return null;
  }
  return { last, save };
}
