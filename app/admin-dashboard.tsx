
import { useContent } from '@/contexts/ContentContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightColors, darkColors, buttonStyles } from '@/styles/commonStyles';
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from '@/components/IconSymbol';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
  useColorScheme,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/styles/commonStyles';

const AdminDashboardScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkColors : lightColors;
  const { isAdmin, logout } = useAuth();
  const { news, events, media, members, refreshContent } = useContent();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin-login');
    }
  }, [isAdmin]);

  const handleRefresh = async () => {
    await refreshContent();
    Alert.alert('Succès', 'Contenu actualisé avec succès');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(tabs)/(home)');
          },
        },
      ]
    );
  };

  const stats = [
    { label: 'Actualités', value: news.length, icon: 'newspaper.fill' as const, color: colors.primary },
    { label: 'Événements', value: events.length, icon: 'calendar' as const, color: colors.secondary },
    { label: 'Médias', value: media.length, icon: 'photo.fill' as const, color: colors.accent },
    { label: 'Membres', value: members.length, icon: 'person.3.fill' as const, color: colors.success },
  ];

  const adminActions = [
    {
      title: 'Gérer les Actualités',
      icon: 'newspaper.fill' as const,
      route: '/manage-news',
      color: colors.primary,
    },
    {
      title: 'Gérer les Événements',
      icon: 'calendar' as const,
      route: '/manage-events',
      color: colors.secondary,
    },
    {
      title: 'Gérer les Médias',
      icon: 'photo.fill' as const,
      route: '/manage-media',
      color: colors.accent,
    },
    {
      title: 'Gérer les Membres',
      icon: 'person.3.fill' as const,
      route: '/manage-members',
      color: colors.success,
    },
    {
      title: 'Vidéoconférence',
      icon: 'video.fill' as const,
      route: '/video-conference',
      color: colors.info,
    },
    {
      title: 'Analyse',
      icon: 'chart.bar.fill' as const,
      route: '/analytics',
      color: colors.warning,
    },
    {
      title: 'Guide de Build APK',
      icon: 'hammer.fill' as const,
      route: '/build-guide',
      color: colors.primary,
    },
    {
      title: 'Guide Admin',
      icon: 'book.fill' as const,
      route: '/admin-guide',
      color: colors.secondary,
    },
  ];

  if (!isAdmin) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Tableau de Bord Admin',
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.error} />
            </Pressable>
          ),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={[styles.welcomeCard, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="person.badge.key.fill" size={48} color={colors.primary} />
          <Text style={[styles.welcomeTitle, { color: themeColors.text }]}>
            Bienvenue, Administrateur
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: themeColors.textSecondary }]}>
            A.R.M Alliance pour le Rassemblement Malien
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: themeColors.card }]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                <IconSymbol name={stat.icon} size={28} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: themeColors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Actions Rapides</Text>
          <View style={styles.actionsGrid}>
            {adminActions.map((action, index) => (
              <Pressable
                key={index}
                style={[styles.actionCard, { backgroundColor: themeColors.card }]}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: action.color + '20' }]}>
                  <IconSymbol name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={[styles.actionTitle, { color: themeColors.text }]} numberOfLines={2}>
                  {action.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Refresh Button */}
        <Pressable
          style={[buttonStyles.primary, styles.refreshButton]}
          onPress={handleRefresh}
        >
          <IconSymbol name="arrow.clockwise" size={20} color="#FFFFFF" />
          <Text style={buttonStyles.primaryText}>Actualiser le Contenu</Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoutButton: {
    padding: 8,
    marginRight: 8,
  },
  welcomeCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  statCard: {
    width: '47%',
    margin: '1.5%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCard: {
    width: '47%',
    margin: '1.5%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  refreshButton: {
    marginHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default AdminDashboardScreen;
