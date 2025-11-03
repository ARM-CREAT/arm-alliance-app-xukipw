
import { colors, commonStyles } from '@/styles/commonStyles';
import { useContent } from '@/contexts/ContentContext';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import React from 'react';
import { Stack, router } from 'expo-router';
import { maliRegions } from '@/data/maliRegions';

const { width } = Dimensions.get('window');

export default function PublicDashboardScreen() {
  const { news, events, media, isLoading } = useContent();

  if (isLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Tableau de bord public',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
          }}
        />
        <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[commonStyles.text, { marginTop: 16 }]}>Chargement...</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tableau de bord public',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="chart.bar.fill" size={48} color={colors.accent} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Tableau de bord
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Vue d&apos;ensemble des activités du parti
            </Text>
          </View>

          {/* Quick Stats */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Statistiques
            </Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="newspaper" size={32} color={colors.white} />
                <Text style={styles.statValue}>{news.length}</Text>
                <Text style={styles.statLabel}>Actualités</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="calendar" size={32} color={colors.white} />
                <Text style={styles.statValue}>{events.length}</Text>
                <Text style={styles.statLabel}>Événements</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.highlight }]}>
                <IconSymbol name="photo.fill" size={32} color={colors.white} />
                <Text style={styles.statValue}>{media.length}</Text>
                <Text style={styles.statLabel}>Médias</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="map.fill" size={32} color={colors.black} />
                <Text style={[styles.statValue, { color: colors.black }]}>{maliRegions.length}</Text>
                <Text style={[styles.statLabel, { color: colors.black }]}>Régions</Text>
              </View>
            </View>
          </View>

          {/* Latest News */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Dernières actualités
              </Text>
              <Pressable onPress={() => router.push('/news')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            {news.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.newsCard}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.newsImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.newsContent}>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Upcoming Events */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Événements à venir
              </Text>
              <Pressable onPress={() => router.push('/events')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            {events.slice(0, 3).map((item) => (
              <View key={item.id} style={styles.eventCard}>
                <View style={[styles.eventIcon, { backgroundColor: colors.accent }]}>
                  <IconSymbol name="calendar" size={24} color={colors.white} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDate}>{item.date}</Text>
                  <Text style={styles.eventLocation} numberOfLines={1}>
                    <IconSymbol name="location.fill" size={12} color={colors.textSecondary} />
                    {' '}{item.location}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Media Gallery Preview */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Galerie média
              </Text>
              <Pressable onPress={() => router.push('/media-gallery')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaScroll}
            >
              {media.slice(0, 5).map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.mediaPreview}
                  onPress={() => router.push('/media-gallery')}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={styles.mediaPreviewImage}
                    resizeMode="cover"
                  />
                  {item.type === 'video' && (
                    <View style={styles.videoOverlay}>
                      <IconSymbol name="play.circle.fill" size={32} color={colors.white} />
                    </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Actions rapides
            </Text>
            <View style={styles.actionsGrid}>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/membership')}
              >
                <IconSymbol name="person.badge.plus" size={32} color={colors.primary} />
                <Text style={styles.actionText}>Adhérer</Text>
              </Pressable>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/donations')}
              >
                <IconSymbol name="heart.fill" size={32} color={colors.error} />
                <Text style={styles.actionText}>Faire un don</Text>
              </Pressable>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/chat')}
              >
                <IconSymbol name="bubble.left.and.bubble.right.fill" size={32} color={colors.accent} />
                <Text style={styles.actionText}>Chat</Text>
              </Pressable>
              <Pressable
                style={styles.actionCard}
                onPress={() => router.push('/contact')}
              >
                <IconSymbol name="envelope.fill" size={32} color={colors.highlight} />
                <Text style={styles.actionText}>Contact</Text>
              </Pressable>
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.card,
  },
  newsContent: {
    padding: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  eventDate: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  mediaScroll: {
    paddingRight: 20,
  },
  mediaPreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  mediaPreviewImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.card,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});
