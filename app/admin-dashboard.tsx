
import React, { useEffect } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from '@/components/IconSymbol';
import { lightColors, darkColors, buttonStyles } from '@/styles/commonStyles';

export default function AdminDashboardScreen() {
  const { news, events, media, members, refreshContent } = useContent();
  const { isAuthenticated, logout, checkAuth } = useAuth();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.unauthorizedContainer}>
          <IconSymbol name="lock.shield.fill" size={64} color={colors.error} />
          <Text style={[styles.unauthorizedTitle, { color: colors.text }]}>Accès Non Autorisé</Text>
          <Text style={[styles.unauthorizedText, { color: colors.textSecondary }]}>
            Vous devez vous connecter en tant qu&apos;administrateur pour accéder à cette page.
          </Text>
          <Pressable
            style={[buttonStyles.primary, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/admin-login')}
          >
            <Text style={[buttonStyles.text, { color: colors.white }]}>Se connecter</Text>
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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]} contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <View style={[styles.welcomeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <IconSymbol name="person.circle.fill" size={48} color={colors.primary} />
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>Bienvenue, Administrateur</Text>
              <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
                Gérez le contenu de l&apos;application A.R.M
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Statistiques Rapides
            </Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <IconSymbol name="newspaper.fill" size={32} color={colors.primary} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{news.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Actualités</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <IconSymbol name="calendar" size={32} color={colors.accent} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{events.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Événements</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <IconSymbol name="photo.fill" size={32} color={colors.secondary} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{media.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Médias</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <IconSymbol name="person.3.fill" size={32} color={colors.primary} />
                <Text style={[styles.statNumber, { color: colors.text }]}>{members.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Membres</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Gestion du Contenu
            </Text>
            {adminMenuItems.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <IconSymbol name={item.icon as any} size={28} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.menuDescription, { color: colors.textSecondary }]}>{item.description}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <Pressable
              style={[buttonStyles.secondary, { marginBottom: 12, backgroundColor: colors.secondary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={handleRefresh}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.black} />
              <Text style={[buttonStyles.secondaryText, { color: colors.black }]}>Actualiser le contenu</Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { borderColor: colors.error, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
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
  unauthorizedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
  },
  unauthorizedText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
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
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
  },
});
