/**
 * The audio surface the rest of the app is allowed to touch.
 *
 * Screens import from here rather than reaching into `music.ts` or `sound.ts`
 * directly, so the split those files rely on stays intact: every decision is
 * made in a pure, testable file (`volume.ts`, `beds.ts`, `cues.ts`) and only the
 * two service modules speak to expo-audio.
 *
 * Cues keep going through `settings/feedback.ts`, which already owns the "sound
 * and haptics together" call site. Nothing here re-exports `playCue` — there is
 * one way to fire a cue, and it is not this file.
 */
export { useBed } from './useBed';
export { playBed, stopBed } from './music';
export { MENU_BED, bedSource } from './beds';
export { resolveBedVolume } from './volume';
