
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Image, Pressable, Platform, useColorScheme } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { lightColors, darkColors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function HomeScreen() {
  const { t, language } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  // Debug logging
  useEffect(() => {
    console.log('HomeScreen mounted');
    console.log('Color scheme:', colorScheme);
    console.log('Language:', language);
    console.log('Colors:', colors);
  }, [colorScheme, language]);

  const handleDonation = () => {
    console.log('Donation button pressed');
    router.push('/donations');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: t('home.title'),
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerRight: () => (
              <Pressable onPress={() => setShowLanguageSelector(true)} style={{ marginRight: 8 }}>
                <IconSymbol name="globe" size={24} color={colors.white} />
              </Pressable>
            ),
          }}
        />
      )}
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        <ScrollView 
          style={{ flex: 1, backgroundColor: colors.background }}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Language Selector Button for Android */}
          {Platform.OS !== 'ios' && (
            <View style={styles.languageButtonContainer}>
              <Pressable 
                style={[styles.languageButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowLanguageSelector(true)}
              >
                <IconSymbol name="globe" size={20} color={colors.primary} />
                <Text style={[styles.languageButtonText, { color: colors.primary }]}>{t('language.title')}</Text>
              </Pressable>
            </View>
          )}

          {/* Hero Section with Logo */}
          <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
            <Image
              source={require('@/assets/images/f6f1baa3-a779-4a50-9d6f-cd42e41f1832.jpeg')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.heroTitle, { color: colors.white }]}>{t('home.title')}</Text>
            <Text style={[styles.heroSubtitle, { color: colors.white }]}>{t('home.subtitle')}</Text>
            <View style={[styles.mottoContainer, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.motto, { color: colors.black }]}>{t('home.motto')}</Text>
            </View>
          </View>

          {/* Political Program Section */}
          <View style={[commonStyles.section, styles.programSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>{t('home.program.title')}</Text>
            <View style={[commonStyles.cardWhite, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[commonStyles.text, { color: colors.text }]}>
                {t('home.program.intro')}
              </Text>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={[styles.programPointText, { color: colors.text }]}>{t('home.program.point1')}</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={[styles.programPointText, { color: colors.text }]}>{t('home.program.point2')}</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={[styles.programPointText, { color: colors.text }]}>{t('home.program.point3')}</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={[styles.programPointText, { color: colors.text }]}>{t('home.program.point4')}</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={[styles.programPointText, { color: colors.text }]}>{t('home.program.point5')}</Text>
              </View>
            </View>
          </View>

          {/* Donation Section */}
          <View style={[commonStyles.section, styles.donationSection, { backgroundColor: colors.card }]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>{t('home.donation.title')}</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 16, color: colors.textSecondary }]}>
              {t('home.donation.subtitle')}
            </Text>
            <Pressable 
              style={[buttonStyles.primary, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }]}
              onPress={handleDonation}
            >
              <IconSymbol name="heart.fill" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8, color: colors.white }]}>{t('home.donation.button')}</Text>
            </Pressable>
          </View>

          {/* Quick Actions */}
          <View style={[commonStyles.section, styles.actionsSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>{t('home.actions.title')}</Text>
            <View style={styles.actionGrid}>
              <Link href="/membership" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="person.badge.plus" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.join')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.join.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/events" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="calendar" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.events')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.events.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/news" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="newspaper" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.news')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.news.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/contact" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                    <IconSymbol name="envelope.fill" size={28} color={colors.black} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.contact')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.contact.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/chat" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="bubble.left.and.bubble.right.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.chat')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.chat.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/media-gallery" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="photo.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.gallery')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.gallery.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/regions" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="map.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.regions')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.regions.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/public-dashboard" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="chart.bar.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.dashboard')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.dashboard.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/video-conference" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="video.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.video')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.video.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/share" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: '#1877F2' }]}>
                    <IconSymbol name="square.and.arrow.up.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.share')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.share.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/install-pwa" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
                    <IconSymbol name="arrow.down.circle.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.install')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.install.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/test-password" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: '#10b981' }]}>
                    <IconSymbol name="checkmark.shield.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.test')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.test.desc')}</Text>
                </Pressable>
              </Link>

              <Link href="/admin-login" asChild>
                <Pressable style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.error }]}>
                    <IconSymbol name="lock.shield.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={[styles.actionTitle, { color: colors.text }]}>{t('home.action.admin')}</Text>
                  <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>{t('home.action.admin.desc')}</Text>
                </Pressable>
              </Link>
            </View>
          </View>

          {/* Party Info */}
          <View style={[commonStyles.section, styles.infoSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>{t('home.info.title')}</Text>
            <View style={[commonStyles.cardWhite, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.infoRow}>
                <IconSymbol name="building.2" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.text }]}>{t('home.info.headquarters')}</Text>
                  <Text style={[styles.infoText, { color: colors.textSecondary }]}>{t('home.info.headquarters.address')}</Text>
                </View>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.text }]}>{t('home.info.contact')}</Text>
                  <Text style={[styles.infoText, { color: colors.textSecondary }]}>+223 76 30 48 69</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <LanguageSelector 
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  languageButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  mottoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  motto: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  programSection: {
    marginTop: 24,
  },
  programPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  programPointText: {
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  donationSection: {
    paddingVertical: 24,
    marginTop: 8,
  },
  actionsSection: {
    marginTop: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  infoSection: {
    marginTop: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
