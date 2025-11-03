
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useContent } from '@/contexts/ContentContext';
import { maliRegions } from '@/data/maliRegions';

const { width } = Dimensions.get('window');

export default function PublicDashboardScreen() {
  const { news, events, media } = useContent();

  const recentNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tableau de Bord Public',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Hero Stats */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Tableau de Bord A.R.M</Text>
            <Text style={styles.heroSubtitle}>
              Suivez l&apos;activité de notre parti en temps réel
            </Text>
          </View>

          {/* Key Statistics */}
          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: colors.primary }]}>
              <IconSymbol name="person.3.fill" size={36} color={colors.white} />
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Membres du Bureau</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.accent }]}>
              <IconSymbol name="map.fill" size={36} color={colors.white} />
              <Text style={styles.statValue}>{maliRegions.length}</Text>
              <Text style={styles.statLabel}>Régions</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.highlight }]}>
              <IconSymbol name="newspaper.fill" size={36} color={colors.white} />
              <Text style={styles.statValue}>{news.length}</Text>
              <Text style={styles.statLabel}>Actualités</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.secondary }]}>
              <IconSymbol name="calendar" size={36} color={colors.black} />
              <Text style={[styles.statValue, { color: colors.black }]}>{events.length}</Text>
              <Text style={[styles.statLabel, { color: colors.black }]}>Événements</Text>
            </View>
          </View>

          {/* Recent News */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Actualités Récentes
              </Text>
              <Pressable onPress={() => router.push('/news')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            {recentNews.map((item) => (
              <View key={item.id} style={styles.newsCard}>
                <View style={styles.newsHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsContent} numberOfLines={2}>
                  {item.content}
                </Text>
              </View>
            ))}
          </View>

          {/* Upcoming Events */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Événements à Venir
              </Text>
              <Pressable onPress={() => router.push('/events')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            {upcomingEvents.map((item) => (
              <View key={item.id} style={styles.eventCard}>
                <View style={styles.eventIcon}>
                  <IconSymbol name="calendar" size={24} color={colors.accent} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventLocation}>
                    <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
                    {' '}{item.location}
                  </Text>
                  <Text style={styles.eventDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Regions Overview */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Régions du Mali
              </Text>
              <Pressable onPress={() => router.push('/regions')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            <View style={styles.regionsGrid}>
              {maliRegions.slice(0, 6).map((region) => (
                <View key={region.id} style={styles.regionCard}>
                  <IconSymbol name="map.fill" size={24} color={colors.primary} />
                  <Text style={styles.regionName}>{region.name}</Text>
                  <Text style={styles.regionCapital}>{region.capital}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Media Gallery Preview */}
          {media.length > 0 && (
            <View style={commonStyles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                  Galerie Média
                </Text>
                <Pressable onPress={() => router.push('/media-gallery')}>
                  <Text style={styles.seeAllText}>Voir tout</Text>
                </Pressable>
              </View>
              <Text style={styles.mediaCount}>
                {media.length} {media.length === 1 ? 'média disponible' : 'médias disponibles'}
              </Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Actions Rapides
            </Text>
            <Pressable
              style={styles.quickActionButton}
              onPress={() => router.push('/membership')}
            >
              <IconSymbol name="person.badge.plus" size={24} color={colors.white} />
              <Text style={styles.quickActionText}>Adhérer au Parti</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionButton, { backgroundColor: colors.accent }]}
              onPress={() => router.push('/contact')}
            >
              <IconSymbol name="envelope.fill" size={24} color={colors.white} />
              <Text style={styles.quickActionText}>Nous Contacter</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  statBox: {
    width: (width - 52) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  regionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  regionCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  regionCapital: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  mediaCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
