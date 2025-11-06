
import { lightColors, darkColors } from '@/styles/commonStyles';
import { useContent } from '@/contexts/ContentContext';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  Platform,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import React, { useState, useCallback } from 'react';
import { Stack, router } from 'expo-router';
import { maliRegions } from '@/data/maliRegions';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { Toast } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function PublicDashboardScreen() {
  const { news, events, media, isLoading, refreshContent } = useContent();
  const [refreshing, setRefreshing] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    try {
      await refreshContent();
      showToast({
        message: 'Tableau de bord mis à jour',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.log('Error refreshing:', error);
      showToast({
        message: 'Erreur lors de la mise à jour',
        type: 'error',
        duration: 2000,
      });
    } finally {
      setRefreshing(false);
    }
  }, [refreshContent]);

  const handleCardPress = (route: string, title: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  if (isLoading && !refreshing) {
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <ScrollView
            style={[styles.scrollView, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <IconSymbol name="chart.bar.fill" size={48} color={colors.accent} />
              <Text style={[styles.title, { color: colors.primary, marginTop: 16 }]}>
                Tableau de bord
              </Text>
            </View>
            <View style={styles.section}>
              <SkeletonLoader type="card" count={2} />
            </View>
          </ScrollView>
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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onHide={hideToast}
          />
        )}
        
        <ScrollView
          style={[styles.scrollView, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.header}>
            <IconSymbol name="chart.bar.fill" size={48} color={colors.accent} />
            <Text style={[styles.title, { color: colors.primary, marginTop: 16 }]}>
              Tableau de bord
            </Text>
            <Text style={[styles.textSecondary, { textAlign: 'center', color: colors.textSecondary }]}>
              Vue d&apos;ensemble des activités du parti
            </Text>
          </Animated.View>

          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: colors.primary }]}>
              Statistiques
            </Text>
            <View style={styles.statsGrid}>
              <Animated.View entering={FadeInDown.delay(100).springify()}>
                <Pressable
                  style={[styles.statCard, { backgroundColor: colors.primary }]}
                  onPress={() => handleCardPress('/news', 'Actualités')}
                >
                  <IconSymbol name="newspaper" size={32} color={colors.white} />
                  <Text style={[styles.statValue, { color: colors.white }]}>{news.length}</Text>
                  <Text style={[styles.statLabel, { color: colors.white }]}>Actualités</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(200).springify()}>
                <Pressable
                  style={[styles.statCard, { backgroundColor: colors.accent }]}
                  onPress={() => handleCardPress('/events', 'Événements')}
                >
                  <IconSymbol name="calendar" size={32} color={colors.white} />
                  <Text style={[styles.statValue, { color: colors.white }]}>{events.length}</Text>
                  <Text style={[styles.statLabel, { color: colors.white }]}>Événements</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(300).springify()}>
                <Pressable
                  style={[styles.statCard, { backgroundColor: colors.highlight }]}
                  onPress={() => handleCardPress('/media-gallery', 'Médias')}
                >
                  <IconSymbol name="photo.fill" size={32} color={colors.white} />
                  <Text style={[styles.statValue, { color: colors.white }]}>{media.length}</Text>
                  <Text style={[styles.statLabel, { color: colors.white }]}>Médias</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(400).springify()}>
                <Pressable
                  style={[styles.statCard, { backgroundColor: colors.secondary }]}
                  onPress={() => handleCardPress('/regions', 'Régions')}
                >
                  <IconSymbol name="map.fill" size={32} color={colors.black} />
                  <Text style={[styles.statValue, { color: colors.black }]}>{maliRegions.length}</Text>
                  <Text style={[styles.statLabel, { color: colors.black }]}>Régions</Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>

          {/* Latest News */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.subtitle, { color: colors.primary }]}>
                Dernières actualités
              </Text>
              <Pressable onPress={() => handleCardPress('/news', 'Actualités')}>
                <Text style={[styles.seeAllText, { color: colors.accent }]}>Voir tout</Text>
              </Pressable>
            </View>
            {news.slice(0, 3).map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(500 + index * 100).springify()}
              >
                <Pressable
                  style={[styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/news', item.title)}
                >
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={[styles.newsImage, { backgroundColor: colors.card }]}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.newsContent}>
                    <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.categoryText, { color: colors.white }]}>{item.category}</Text>
                    </View>
                    <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={[styles.newsDate, { color: colors.textSecondary }]}>{item.date}</Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* Upcoming Events */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.subtitle, { color: colors.primary }]}>
                Événements à venir
              </Text>
              <Pressable onPress={() => handleCardPress('/events', 'Événements')}>
                <Text style={[styles.seeAllText, { color: colors.accent }]}>Voir tout</Text>
              </Pressable>
            </View>
            {events.slice(0, 3).map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(800 + index * 100).springify()}
              >
                <Pressable
                  style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/events', item.title)}
                >
                  <View style={[styles.eventIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="calendar" size={24} color={colors.white} />
                  </View>
                  <View style={styles.eventContent}>
                    <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.eventDate, { color: colors.accent }]}>{item.date}</Text>
                    <Text style={[styles.eventLocation, { color: colors.textSecondary }]} numberOfLines={1}>
                      <IconSymbol name="location.fill" size={12} color={colors.textSecondary} />
                      {' '}{item.location}
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* Media Gallery Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.subtitle, { color: colors.primary }]}>
                Galerie média
              </Text>
              <Pressable onPress={() => handleCardPress('/media-gallery', 'Galerie')}>
                <Text style={[styles.seeAllText, { color: colors.accent }]}>Voir tout</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaScroll}
            >
              {media.slice(0, 5).map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(1100 + index * 50).springify()}
                >
                  <Pressable
                    style={styles.mediaPreview}
                    onPress={() => handleCardPress('/media-gallery', 'Média')}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={[styles.mediaPreviewImage, { backgroundColor: colors.card }]}
                      resizeMode="cover"
                    />
                    {item.type === 'video' && (
                      <View style={styles.videoOverlay}>
                        <IconSymbol name="play.circle.fill" size={32} color={colors.white} />
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              ))}
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: colors.primary }]}>
              Actions rapides
            </Text>
            <View style={styles.actionsGrid}>
              <Animated.View entering={FadeInDown.delay(1300).springify()}>
                <Pressable
                  style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/membership', 'Adhérer')}
                >
                  <IconSymbol name="person.badge.plus" size={32} color={colors.primary} />
                  <Text style={[styles.actionText, { color: colors.text }]}>Adhérer</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(1400).springify()}>
                <Pressable
                  style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/donations', 'Faire un don')}
                >
                  <IconSymbol name="heart.fill" size={32} color={colors.error} />
                  <Text style={[styles.actionText, { color: colors.text }]}>Faire un don</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(1500).springify()}>
                <Pressable
                  style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/chat', 'Chat')}
                >
                  <IconSymbol name="bubble.left.and.bubble.right.fill" size={32} color={colors.accent} />
                  <Text style={[styles.actionText, { color: colors.text }]}>Chat</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInDown.delay(1600).springify()}>
                <Pressable
                  style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleCardPress('/contact', 'Contact')}
                >
                  <IconSymbol name="envelope.fill" size={32} color={colors.highlight} />
                  <Text style={[styles.actionText, { color: colors.text }]}>Contact</Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
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
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
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
  },
  newsCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  newsImage: {
    width: '100%',
    height: 150,
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
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
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
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
