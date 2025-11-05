
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

const { width } = Dimensions.get('window');

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'image' | 'text' | 'circle';
  count?: number;
}

export function SkeletonLoader({ type = 'card', count = 3 }: SkeletonLoaderProps) {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <Animated.View style={[styles.card, animatedStyle]}>
            <View style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.textLine} />
              <View style={[styles.textLine, { width: '60%' }]} />
            </View>
          </Animated.View>
        );
      case 'list':
        return (
          <Animated.View style={[styles.listItem, animatedStyle]}>
            <View style={styles.circle} />
            <View style={styles.listContent}>
              <View style={styles.textLine} />
              <View style={[styles.textLine, { width: '70%', height: 12 }]} />
            </View>
          </Animated.View>
        );
      case 'image':
        return <Animated.View style={[styles.imageSkeleton, animatedStyle]} />;
      case 'text':
        return (
          <Animated.View style={[styles.textSkeleton, animatedStyle]}>
            <View style={styles.textLine} />
            <View style={[styles.textLine, { width: '80%' }]} />
            <View style={[styles.textLine, { width: '90%' }]} />
          </Animated.View>
        );
      case 'circle':
        return <Animated.View style={[styles.circleSkeleton, animatedStyle]} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>{renderSkeleton()}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.border,
  },
  cardContent: {
    padding: 16,
  },
  textLine: {
    height: 16,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    marginRight: 12,
  },
  listContent: {
    flex: 1,
    justifyContent: 'center',
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
    backgroundColor: colors.border,
    borderRadius: 12,
    marginBottom: 16,
  },
  textSkeleton: {
    padding: 16,
  },
  circleSkeleton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
  },
});
