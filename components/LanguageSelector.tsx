
import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
    { code: 'bm', name: t('language.bambara'), flag: '🇲🇱' },
  ];

  const handleSelectLanguage = async (lang: Language) => {
    await setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View 
          entering={FadeIn.duration(200)} 
          exiting={FadeOut.duration(200)}
          style={styles.container}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('language.title')}</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <IconSymbol name="xmark" size={24} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.languageList}>
              {languages.map((lang) => (
                <Pressable
                  key={lang.code}
                  style={[
                    styles.languageItem,
                    language === lang.code && styles.languageItemActive,
                  ]}
                  onPress={() => handleSelectLanguage(lang.code)}
                >
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.languageName,
                      language === lang.code && styles.languageNameActive,
                    ]}
                  >
                    {lang.name}
                  </Text>
                  {language === lang.code && (
                    <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    padding: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.card,
  },
  languageItemActive: {
    backgroundColor: colors.primary + '20',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  flag: {
    fontSize: 28,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  languageNameActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
