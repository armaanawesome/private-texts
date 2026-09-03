import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * How much bottom padding a screen inside the case tabs needs so the native tab
 * bar does not sit on top of its content.
 *
 * The confrontation screen's evidence chips were being covered by the tab bar —
 * half a chip was visible behind "Accuse" — because the tray carried
 * `paddingBottom: theme.space.lg`, twenty points, against a bar that is at least
 * forty-nine. `EvidenceBoard` has the same bug with a slightly larger number.
 *
 * ## Why this is a constant and not a measurement
 *
 * `expo-router/unstable-native-tabs` renders a real UITabBar / BottomNavigationView
 * and exposes no height. `@react-navigation/bottom-tabs` — which does have
 * `useBottomTabBarHeight` — is not installed, and pulling it in for one number
 * would add a navigator this app does not use.
 *
 * So: the platform's documented bar height, plus whatever the safe area reports.
 * On iOS the bar's frame already includes the home indicator inset, so when
 * `insets.bottom` reports 34 the sum is the true 83; when the navigator has
 * consumed the inset and it reports 0, the sum is 49, which still clears the bar
 * itself. **Both readings land somewhere safe, which is the point** — the
 * failure modes are not symmetric. Over-padding leaves a little dead space at
 * the bottom of a scroll view. Under-padding hides a control the player has to
 * tap, which is the bug this exists to end.
 */

/** UITabBar is 49pt; Android's BottomNavigationView is 56dp. */
const BAR = Platform.select({ ios: 49, android: 56, default: 56 });

export function useTabBarClearance(): number {
  const insets = useSafeAreaInsets();
  return BAR + insets.bottom;
}
