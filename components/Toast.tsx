
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onHide?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onHide }: ToastProps) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Haptic feedback
    if (Platform.OS !== 'web') {
      if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === 'error') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }

    // Show animation
    translateY.value = withSpring(0, { damping: 15 });
    opacity.value = withTiming(1, { duration: 300 });

    // Hide after duration
    const timer = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 }, () => {
        if (onHide) {
          runOnJS(onHide)();
        }
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return '#f59e0b';
      case 'info':
      default:
        return colors.accent;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark.circle.fill';
      case 'error':
        return 'xmark.circle.fill';
      case 'warning':
        return 'exclamationmark.triangle.fill';
      case 'info':
      default:
        return 'info.circle.fill';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        animatedStyle,
      ]}
    >
      <IconSymbol name={getIcon()} size={24} color={colors.white} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    zIndex: 9999,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  message: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
});
