import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';
import { theme } from './theme';

function Dot({ delay }: { delay: number }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1.35, { duration: 300 }), withTiming(1, { duration: 300 })),
        -1,
        false,
      ),
    );
    return () => cancelAnimation(scale);
  }, [delay, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <Animated.View style={[styles.dot, style]} />;
}

/**
 * Three dots on a 140ms stagger. Scale only — it runs as a Reanimated worklet on
 * the UI thread, so playback never competes with JS work for frames.
 */
export function TypingIndicator() {
  return (
    <View style={styles.bubble} accessibilityLabel="Someone is typing">
      <Dot delay={0} />
      <Dot delay={140} />
      <Dot delay={280} />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.space.xs,
    backgroundColor: theme.color.bubbleThem,
    borderRadius: theme.radius.bubble,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.md,
    marginVertical: theme.space.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.color.textDim,
  },
});
