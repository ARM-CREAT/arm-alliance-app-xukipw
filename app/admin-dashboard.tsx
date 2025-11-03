
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { useContent } from '@/contexts/ContentContext';
import { Stack, router } from 'expo-router';

export default function AdminDashboardScreen() {
  const { isAdmin, logout, isLoading } = useAuth();
  const { news, events, media, refreshContent } = useContent();

  useEffect(() => {
    console.log('AdminDashboard - isAdmin:', isAdmin, 'isLoading:', isLoading);
    
    // Only redirect if not loading and not admin
    if (!isLoading && !isAdmin) {
      console.log('Not authenticated, redirecting to login');
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
  }, [isAdmin, isLoading]);

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
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

  const handleRefresh = async () => {
    try {
      await refreshContent();
      Alert.alert('Succès', 'Contenu actualisé avec succès');
    } catch (error) {
      console.error('Error refreshing content:', error);
      Alert.alert('Erreur', 'Impossible d\'actualiser le contenu');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Don't render if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tableau de bord Admin',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 16 }}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <IconSymbol name="person.circle.fill" size={60} color={colors.primary} />
            <Text style={styles.welcomeTitle}>Bienvenue, Administrateur</Text>
            <Text style={styles.welcomeSubtitle}>
              Gérez le contenu de l&apos;application A.R.M
            </Text>
          </View>

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
              <IconSymbol name="newspaper.fill" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{news.length}</Text>
              <Text style={styles.statLabel}>Actualités</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
              <IconSymbol name="calendar.badge.clock" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{events.length}</Text>
              <Text style={styles.statLabel}>Événements</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.highlight }]}>
              <IconSymbol name="photo.stack.fill" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{media.length}</Text>
              <Text style={styles.statLabel}>Médias</Text>
            </View>
          </View>

          {/* Management Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gestion du Contenu</Text>
            
            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/manage-news')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="newspaper.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les Actualités</Text>
                <Text style={styles.menuDescription}>
                  Ajouter, modifier ou supprimer des actualités
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/manage-events')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="calendar.badge.clock" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les Événements</Text>
                <Text style={styles.menuDescription}>
                  Ajouter, modifier ou supprimer des événements
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/manage-media')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.highlight }]}>
                <IconSymbol name="photo.stack.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les Médias</Text>
                <Text style={styles.menuDescription}>
                  Ajouter ou supprimer des photos et vidéos
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Other Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Autres Fonctionnalités</Text>
            
            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/video-conference')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="video.fill" size={24} color={colors.black} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Vidéoconférence</Text>
                <Text style={styles.menuDescription}>
                  Créer et gérer des vidéoconférences
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/public-dashboard')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="chart.bar.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Tableau de bord Public</Text>
                <Text style={styles.menuDescription}>
                  Voir les statistiques publiques
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/admin-guide')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="book.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Guide d&apos;Administration</Text>
                <Text style={styles.menuDescription}>
                  Instructions pour gérer l&apos;application
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <Pressable
              style={[buttonStyles.accent, { marginBottom: 12 }]}
              onPress={handleRefresh}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Actualiser le contenu
              </Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.primary, { backgroundColor: colors.error }]}
              onPress={handleLogout}
            >
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  welcomeSection: {
    backgroundColor: colors.card,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionsSection: {
    padding: 16,
  },
});
