
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

const adminMenuItems = [
  {
    id: 'news',
    title: 'Gérer les Actualités',
    description: 'Ajouter, modifier ou supprimer des actualités',
    icon: 'newspaper.fill',
    route: '/manage-news',
    color: colors.primary,
  },
  {
    id: 'events',
    title: 'Gérer les Événements',
    description: 'Créer et gérer les événements du parti',
    icon: 'calendar',
    route: '/manage-events',
    color: colors.accent,
  },
  {
    id: 'media',
    title: 'Gérer les Médias',
    description: 'Ajouter des photos et vidéos',
    icon: 'photo.fill',
    route: '/manage-media',
    color: colors.secondary,
  },
  {
    id: 'members',
    title: 'Gérer les Membres',
    description: 'Ajouter, modifier ou supprimer des membres de la direction',
    icon: 'person.3.fill',
    route: '/manage-members',
    color: colors.primary,
  },
  {
    id: 'conference',
    title: 'Vidéoconférence',
    description: 'Créer et gérer des vidéoconférences',
    icon: 'video.fill',
    route: '/video-conference',
    color: colors.accent,
  },
  {
    id: 'analytics',
    title: 'Statistiques',
    description: 'Voir les statistiques de l\'application',
    icon: 'chart.bar.fill',
    route: '/analytics',
    color: colors.secondary,
  },
  {
    id: 'guide',
    title: 'Guide Administrateur',
    description: 'Documentation et aide',
    icon: 'book.fill',
    route: '/admin-guide',
    color: colors.primary,
  },
];

export default function AdminDashboardScreen() {
  const { news, events, media, members, refreshContent } = useContent();
  const { isAuthenticated, logout, checkAuth } = useAuth();

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

  const handleRefresh = async () => {
    console.log('Refreshing content...');
    await refreshContent();
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.unauthorizedContainer}>
          <IconSymbol name="lock.shield.fill" size={64} color={colors.error} />
          <Text style={styles.unauthorizedTitle}>Accès Non Autorisé</Text>
          <Text style={styles.unauthorizedText}>
            Vous devez vous connecter en tant qu&apos;administrateur pour accéder à cette page.
          </Text>
          <Pressable
            style={buttonStyles.primary}
            onPress={() => router.replace('/admin-login')}
          >
            <Text style={buttonStyles.text}>Se connecter</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tableau de Bord Admin',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.white} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 8 }}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={commonStyles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={commonStyles.section}>
            <View style={styles.welcomeCard}>
              <IconSymbol name="person.circle.fill" size={48} color={colors.primary} />
              <Text style={styles.welcomeTitle}>Bienvenue, Administrateur</Text>
              <Text style={styles.welcomeSubtitle}>
                Gérez le contenu de l&apos;application A.R.M
              </Text>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Statistiques Rapides
            </Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="newspaper.fill" size={32} color={colors.primary} />
                <Text style={styles.statNumber}>{news.length}</Text>
                <Text style={styles.statLabel}>Actualités</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.accent + '20' }]}>
                <IconSymbol name="calendar" size={32} color={colors.accent} />
                <Text style={styles.statNumber}>{events.length}</Text>
                <Text style={styles.statLabel}>Événements</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="photo.fill" size={32} color={colors.secondary} />
                <Text style={styles.statNumber}>{media.length}</Text>
                <Text style={styles.statLabel}>Médias</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="person.3.fill" size={32} color={colors.primary} />
                <Text style={styles.statNumber}>{members.length}</Text>
                <Text style={styles.statLabel}>Membres</Text>
              </View>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Gestion du Contenu
            </Text>
            {adminMenuItems.map((item) => (
              <Pressable
                key={item.id}
                style={styles.menuItem}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <IconSymbol name={item.icon as any} size={28} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>

          <View style={commonStyles.section}>
            <Pressable
              style={[buttonStyles.secondary, { marginBottom: 12 }]}
              onPress={handleRefresh}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={buttonStyles.secondaryText}>Actualiser le contenu</Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { borderColor: colors.error }]}
              onPress={handleLogout}
            >
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color={colors.error} />
              <Text style={[buttonStyles.textOutline, { color: colors.error, marginLeft: 8 }]}>
                Se déconnecter
              </Text>
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
  unauthorizedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  unauthorizedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  welcomeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
