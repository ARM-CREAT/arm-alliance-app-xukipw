
import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchBar({ value, onChangeText, placeholder = 'Rechercher...', onClear }: SearchBarProps) {
  const handleClear = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={styles.container}>
      <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
      {value.length > 0 && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});
