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
 * ## `playsInSilentMode: true`, and this is the line that silenced the game
 *
 * It was `false`, reasoned about as though it only meant the iOS mute switch:
 * someone playing on a train with the ringer off expects silence. On **Android
 * that flag does something much broader** — expo-audio's own type documentation
 * is explicit that when it is `false`, "playback is suppressed when the ringer
 * mode is silent or vibrate". Most people carry a phone on vibrate. So the whole
 * soundtrack was being suppressed at the session level, for most users, before a
 * single sample was read. No amount of retuning the files could reach that, and
 * two rounds of retuning did not.
 *
 * Ringer mode governs alerts, not media. A game belongs on the media stream, and
 * this app already gives the player a real way to silence it — a sound toggle
 * and a volume slider in Settings — which is a better control than a hardware
 * switch that was never asked about this app in particular.
 *
 * `mixWithOthers` stays: a 150ms sting must not stop the podcast somebody is
 * listening to.
 */
export function primeAudio(): void {
  if (primed) return;
  primed = true;
  void setAudioModeAsync({
    playsInSilentMode: true,
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
    /*
     * Rewind, then play — but never let the rewind decide whether the sound
     * happens.
     *
     * This used to be `seekTo(0).then(play).catch(() => {})`, which makes
     * playback conditional on a promise that can reject: seeking a player that
     * has not finished loading fails, and the empty catch then swallowed both
     * the error and the sound. The first play of every cue is the one most
     * likely to hit it, which is exactly the play that matters.
     *
     * So `play()` is called unconditionally and synchronously, and the rewind is
     * a best-effort that runs first and only when there is something to rewind.
     * A cue that starts from the wrong position is a small defect; a cue that
     * never plays is the bug this file has been shipping.
     */
    if (player.isLoaded && player.currentTime > 0) {
      void player.seekTo(0).catch(() => {});
    }
    player.play();
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
