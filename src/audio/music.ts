import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { bedSource } from './beds';
import { primeAudio } from './sound';
import { resolveBedVolume, type VolumePrefs } from './volume';

/**
 * The looping background bed. One at a time, ever.
 *
 * Sibling of sound.ts and built to the same two rules: every decision was made
 * in a pure file (beds.ts) and tested there, and no background drone is worth a
 * crash, so every native call is guarded.
 *
 * ## Why a module-level player rather than one per track
 *
 * Cues keep a player each because they retrigger constantly and creating one per
 * sting would stutter. A bed is the opposite: exactly one plays, it plays for
 * minutes, and holding seventeen decoded loops in memory to save a swap that
 * happens only when the player changes screen would waste a phone's RAM for no
 * gain anybody could hear.
 */

let player: AudioPlayer | null = null;
/** Which track that player holds, so an unchanged track is never restarted. */
let current: string | null = null;

/**
 * Play `trackId` on a loop, or stop everything when it is null.
 *
 * Idempotent on the track: calling it repeatedly with the same id only updates
 * the volume. That matters because the screens driving this re-render for
 * reasons with nothing to do with audio, and a bed that restarted from the top
 * on every render would be a stutter rather than a soundtrack.
 */
export function playBed(trackId: string | null, prefs: VolumePrefs): void {
  const volume = resolveBedVolume(prefs);

  // Muted, silenced by Reduce Motion, or nowhere to play. Tear down rather than
  // leave a silent player holding the audio session open.
  if (trackId === null || volume <= 0) {
    stopBed();
    return;
  }

  const source = bedSource(trackId);
  // No bed generated for this case yet. Silence, not an error.
  if (source === null) {
    stopBed();
    return;
  }

  try {
    if (current === trackId && player) {
      player.volume = volume;
      return;
    }

    primeAudio();
    stopBed();
    const next = createAudioPlayer(source, { keepAudioSessionActive: true });
    next.loop = true;
    next.volume = volume;
    next.play();
    player = next;
    current = trackId;
  } catch {
    // A missing codec, a device with no audio route, a player released under us.
    // Background music is the last thing that should take a case down.
    stopBed();
  }
}

/** Stop and release. Safe to call when nothing is playing. */
export function stopBed(): void {
  try {
    player?.remove();
  } catch {
    // Already gone.
  }
  player = null;
  current = null;
}
