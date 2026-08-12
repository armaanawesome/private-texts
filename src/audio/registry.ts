import type { CueId } from './cues';

/**
 * WHERE THE SOUND FILES GO.
 *
 * Drop the file in `assets/audio/` and replace the `null` with a require:
 *
 *     contradiction: require('../../assets/audio/contradiction.m4a'),
 *
 * Nothing else has to change. sound.ts treats a `null` entry as "this cue has no
 * sound yet" and returns without touching expo-audio, so the game behaves
 * identically with none, some, or all four filled in — which is why the settings
 * screen can ship a working volume control before a single asset exists.
 *
 * They are null on purpose. No audio has been authored or licensed for this
 * project, and committing placeholder blobs would ship a sound nobody chose and
 * put binaries in the repo that are tedious to remove later.
 *
 * Use m4a (AAC): it decodes on both platforms with no extra native work. Keep
 * each cue under about 200ms — these fire during reading, and anything longer
 * overlaps the next message.
 *
 * The `Record<CueId, ...>` type is what guarantees a lookup here can never be
 * undefined; adding a fifth cue to CueId makes this a compile error until it is
 * listed. That is why no test asserts the same thing.
 */
export const CUE_SOURCES: Record<CueId, number | null> = {
  message: null,
  pin: null,
  contradiction: null,
  confession: null,
};
