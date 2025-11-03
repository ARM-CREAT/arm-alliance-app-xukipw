
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
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

export default function AnalyticsScreen() {
  const { isAdmin, isLoading } = useAuth();
  const [data, setData] = useState<AnalyticsData>({
    totalMembers: 247,
    newMembersThisMonth: 18,
    totalDonations: 12450,
    donationsThisMonth: 2340,
    totalEvents: 15,
    upcomingEvents: 3,
    totalNews: 28,
    mediaItems: 45,
    chatMessages: 1523,
    pageViews: 8934,
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      Alert.alert(
        'Accès refusé',
        'Cette page est réservée aux administrateurs',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }
  }, [isAdmin, isLoading]);

  const handleRefresh = () => {
    Alert.alert('Actualisation', 'Les données ont été actualisées');
    console.log('Analytics data refreshed');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Text style={commonStyles.text}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Analyses',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: 'modal',
        }}
      />
      <SafeAreaView style={commonStyles.container} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="chart.bar.fill" size={48} color={colors.accent} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Tableau de bord analytique
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Vue d&apos;ensemble des statistiques du parti
            </Text>
          </View>

          {/* Key Metrics */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Métriques clés
            </Text>
            <View style={styles.metricsGrid}>
              <View style={[styles.metricCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="person.3.fill" size={32} color={colors.white} />
                <Text style={styles.metricValue}>{data.totalMembers}</Text>
                <Text style={styles.metricLabel}>Membres totaux</Text>
                <View style={styles.metricBadge}>
                  <IconSymbol name="arrow.up" size={12} color={colors.success} />
                  <Text style={styles.metricBadgeText}>+{data.newMembersThisMonth} ce mois</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="eurosign.circle.fill" size={32} color={colors.white} />
                <Text style={styles.metricValue}>{data.totalDonations}€</Text>
                <Text style={styles.metricLabel}>Dons totaux</Text>
                <View style={styles.metricBadge}>
                  <IconSymbol name="arrow.up" size={12} color={colors.success} />
                  <Text style={styles.metricBadgeText}>+{data.donationsThisMonth}€ ce mois</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: colors.highlight }]}>
                <IconSymbol name="calendar" size={32} color={colors.white} />
                <Text style={styles.metricValue}>{data.totalEvents}</Text>
                <Text style={styles.metricLabel}>Événements</Text>
                <View style={styles.metricBadge}>
                  <Text style={styles.metricBadgeText}>{data.upcomingEvents} à venir</Text>
                </View>
              </View>

              <View style={[styles.metricCard, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="newspaper" size={32} color={colors.black} />
                <Text style={[styles.metricValue, { color: colors.black }]}>{data.totalNews}</Text>
                <Text style={[styles.metricLabel, { color: colors.black }]}>Articles</Text>
              </View>
            </View>
          </View>

          {/* Engagement Metrics */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Engagement
            </Text>
            <View style={styles.engagementCard}>
              <View style={styles.engagementRow}>
                <View style={styles.engagementIcon}>
                  <IconSymbol name="photo.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.engagementInfo}>
                  <Text style={styles.engagementLabel}>Médias</Text>
                  <Text style={styles.engagementValue}>{data.mediaItems} éléments</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.engagementRow}>
                <View style={styles.engagementIcon}>
                  <IconSymbol name="bubble.left.and.bubble.right.fill" size={24} color={colors.accent} />
                </View>
                <View style={styles.engagementInfo}>
                  <Text style={styles.engagementLabel}>Messages du chat</Text>
                  <Text style={styles.engagementValue}>{data.chatMessages} messages</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.engagementRow}>
                <View style={styles.engagementIcon}>
                  <IconSymbol name="eye.fill" size={24} color={colors.highlight} />
                </View>
                <View style={styles.engagementInfo}>
                  <Text style={styles.engagementLabel}>Vues de page</Text>
                  <Text style={styles.engagementValue}>{data.pageViews} vues</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Growth Chart Placeholder */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Croissance des membres
            </Text>
            <View style={styles.chartPlaceholder}>
              <IconSymbol name="chart.line.uptrend.xyaxis" size={64} color={colors.primary} />
              <Text style={styles.chartText}>
                Graphique de croissance
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                +{data.newMembersThisMonth} nouveaux membres ce mois
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={commonStyles.section}>
            <Pressable style={buttonStyles.primary} onPress={handleRefresh}>
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>Actualiser les données</Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { marginTop: 12 }]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.textOutline}>Retour</Text>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    marginTop: 12,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginTop: 4,
    textAlign: 'center',
  },
  metricBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 8,
  },
  metricBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 4,
  },
  engagementCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  engagementInfo: {
    flex: 1,
  },
  engagementLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  engagementValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  chartPlaceholder: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 32,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
});
