import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { CUES, type CueId } from './cues';
import { CUE_SOURCES } from './registry';
import { resolveVolume, type VolumePrefs } from './volume';

/**
 * The one place expo-audio is touched.
 *
 * Everything decidable was decided in volume.ts and tested there; what is left
 * here is lifecycle, which is not testable in Node and is kept as small as
 * possible for that reason.
 *
 * Two rules hold this together:
 *  - A cue with no asset is a silent no-op, not an error. That is what lets the
 *    game ship before the audio does.
 *  - A sound effect is never worth a crash. Every native call is guarded.
 */

/** One player per cue, created on first use and reused. */
const players: Partial<Record<CueId, AudioPlayer>> = {};

let primed = false;

/**
 * Configures the audio session once, lazily.
 *
 * `playsInSilentMode: false` is the deliberate choice: someone playing this on a
 * train with the ringer switch off expects silence, and a game that overrides
 * that is the reason people delete games. `mixWithOthers` is the matching one —
 * a 150ms sting must not stop the podcast the player is listening to.
 */
function primeAudio(): void {
  if (primed) return;
  primed = true;
  void setAudioModeAsync({
    playsInSilentMode: false,
    shouldPlayInBackground: false,
    interruptionMode: 'mixWithOthers',
  }).catch(() => {
    // Session config is best-effort. Failing it must not silence the game.
  });
}

/**
 * Plays a cue at the volume the player's settings resolve to.
 *
 * Takes prefs rather than reading the store, so the decision stays visible at
 * the call site and this module keeps its one-way dependency on volume.ts.
 */
export function playCue(id: CueId, prefs: VolumePrefs): void {
  const volume = resolveVolume(prefs, CUES[id]);
  // Muted, or a flourish under Reduce Motion. Nothing to create, nothing to load.
  if (volume <= 0) return;

  const source = CUE_SOURCES[id];
  // No asset authored for this cue yet. Not a warning — this is the shipped state.
  if (source === null) return;

  try {
    primeAudio();
    const player = (players[id] ??= createAudioPlayer(source, {
      // Without this the session deactivates when the sting ends, which
      // interrupts any video or audio the player had going.
      keepAudioSessionActive: true,
    }));
    player.volume = volume;
    // Rewind first: these retrigger faster than they finish, and a player left
    // at its end position plays nothing at all the second time.
    void player
      .seekTo(0)
      .then(() => player.play())
      .catch(() => {});
  } catch {
    // A missing codec, a released player, a device with no audio route. None of
    // them are worth taking the case down for.
  }
}

/** Frees the native players. For a settings screen unmount or a memory warning. */
export function releaseAudio(): void {
  for (const id of Object.keys(players) as CueId[]) {
    try {
      players[id]?.remove();
    } catch {
      // Already gone. Nothing to do.
    }
    delete players[id];
  }
}
