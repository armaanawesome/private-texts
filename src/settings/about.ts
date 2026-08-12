/**
 * The About block's content and formatting, with no dependency on expo-constants.
 *
 * The screen reads the real version off `Constants.expoConfig` and passes it in.
 * Keeping the formatting here means the awkward cases — a config that failed to
 * load, a platform with no build number — are tested rather than discovered in a
 * screenshot of a support email.
 */

/**
 * "1.0.0 (5)", or as much of it as actually exists.
 *
 * `Constants.expoConfig` is nullable at runtime, and versionCode is a number on
 * Android while buildNumber is a string on iOS, so both shapes arrive here.
 */
export function versionLine(
  version: string | null | undefined,
  build: string | number | null | undefined,
): string {
  const v = typeof version === 'string' ? version.trim() : '';
  // A version row that says nothing is worse than one that admits it: the first
  // thing support asks for is the build, and "" reads as a rendering bug.
  if (v === '') return 'Unknown';

  const b = typeof build === 'number' ? String(build) : typeof build === 'string' ? build.trim() : '';
  return b === '' ? v : `${v} (${b})`;
}

/**
 * What the app does with the player's data, in the app.
 *
 * Deliberately shown as text rather than a link to a hosted privacy policy:
 * there is no such page yet, and a settings row that opens a 404 is worse than
 * no row. Every line here is a claim about shipped behaviour — check it against
 * the code before editing it.
 *
 * NOTE for whoever lands account sync on this branch: the moment progress is
 * uploaded, a line about it belongs here, and this comment is why.
 */
export const PRIVACY_POINTS: readonly string[] = [
  'Your progress through each case is stored on this device.',
  'Purchases are handled by the App Store or Google Play through RevenueCat. This app never sees your payment details.',
  'There are no ads and no analytics or tracking SDKs in this build.',
  'Deleting the app deletes your progress with it.',
];

export interface Licence {
  readonly name: string;
  readonly licence: string;
}

/**
 * Third-party components, not this app's own licence.
 *
 * The repo's own LICENSE file is still Expo's template and does not describe
 * this game, so nothing here claims to.
 */
export const LICENCES: readonly Licence[] = [
  { name: 'React and React Native', licence: 'MIT' },
  { name: 'Expo SDK', licence: 'MIT' },
  { name: 'Expo Router', licence: 'MIT' },
  { name: 'React Native Reanimated', licence: 'MIT' },
  { name: 'React Native Gesture Handler', licence: 'MIT' },
  { name: 'React Native Screens', licence: 'MIT' },
  { name: 'React Native Safe Area Context', licence: 'MIT' },
  { name: 'React Native Purchases (RevenueCat)', licence: 'MIT' },
  { name: 'Async Storage', licence: 'MIT' },
  { name: 'Zustand', licence: 'MIT' },
  { name: 'Zod', licence: 'MIT' },
  { name: 'i18n-js', licence: 'MIT' },
  { name: 'supabase-js', licence: 'MIT' },
];
