
import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles/commonStyles';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selected ? 1 : 0.95) }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.chip,
        selected && styles.chipSelected,
        animatedStyle,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  labelSelected: {
    color: colors.white,
  },
});
