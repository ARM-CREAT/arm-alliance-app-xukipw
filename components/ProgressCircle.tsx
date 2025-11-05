
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressCircleProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressCircle({
  progress,
  size = 120,
  strokeWidth = 10,
  color = colors.primary,
  label,
}: ProgressCircleProps) {
  const animatedProgress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * animatedProgress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
