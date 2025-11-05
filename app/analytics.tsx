
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';

import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  totalMembers: number;
  newMembersThisMonth: number;
  totalDonations: number;
  donationsThisMonth: number;
  totalEvents: number;
  upcomingEvents: number;
  totalNews: number;
  mediaItems: number;
  chatMessages: number;
  pageViews: number;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});

export default function AnalyticsScreen() {
  const { news, events, media } = useContent();
  const { checkAuth } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalMembers: 7,
    newMembersThisMonth: 3,
    totalDonations: 0,
    donationsThisMonth: 0,
    totalEvents: events.length,
    upcomingEvents: events.length,
    totalNews: news.length,
    mediaItems: media.length,
    chatMessages: 0,
    pageViews: 0,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await checkAuth();
      if (!authenticated) {
        Alert.alert(
          'Accès refusé',
          'Vous devez vous connecter pour accéder à cette page',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/admin-login'),
            },
          ]
        );
      }
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    setAnalytics(prev => ({
      ...prev,
      totalEvents: events.length,
      upcomingEvents: events.length,
      totalNews: news.length,
      mediaItems: media.length,
    }));
  }, [news, events, media]);

  const handleRefresh = () => {
    Alert.alert('Succès', 'Données actualisées');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Analyses',
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
          <View style={styles.header}>
            <IconSymbol name="chart.bar.fill" size={64} color={colors.white} />
            <Text style={styles.headerTitle}>Analyses</Text>
            <Text style={styles.headerSubtitle}>Statistiques détaillées</Text>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="person.3.fill" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.statTitle}>Membres</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.totalMembers}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Ce mois</Text>
                  <Text style={[styles.statValue, { fontSize: 18, color: colors.success }]}>
                    +{analytics.newMembersThisMonth}
                  </Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="heart.fill" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.statTitle}>Dons</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.totalDonations}€</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Ce mois</Text>
                  <Text style={[styles.statValue, { fontSize: 18, color: colors.success }]}>
                    +{analytics.donationsThisMonth}€
                  </Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="calendar" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.statTitle}>Événements</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.totalEvents}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>À venir</Text>
                  <Text style={[styles.statValue, { fontSize: 18, color: colors.accent }]}>
                    {analytics.upcomingEvents}
                  </Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
                    <IconSymbol name="newspaper" size={24} color={colors.black} />
                  </View>
                  <Text style={styles.statTitle}>Actualités</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.totalNews}</Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="photo.fill" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.statTitle}>Médias</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.mediaItems}</Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="bubble.left.and.bubble.right.fill" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.statTitle}>Messages du chat</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{analytics.chatMessages}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Pressable style={buttonStyles.primary} onPress={handleRefresh}>
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Actualiser les données
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
