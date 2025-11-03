
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';

export default function AdminDashboardScreen() {
  const { isAdmin, isLoading, logout } = useAuth();
  const { news, events, media } = useContent();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      Alert.alert(
        'Accès refusé',
        'Vous devez être connecté en tant qu\'administrateur',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/admin-login'),
          },
        ]
      );
    }
  }, [isAdmin, isLoading]);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/admin-login');
          },
        },
      ]
    );
  };

  const handleRefresh = () => {
    Alert.alert('Actualisation', 'Les données ont été actualisées');
    console.log('Dashboard refreshed');
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
          title: 'Tableau de bord Admin',
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
            <IconSymbol name="lock.shield.fill" size={48} color={colors.primary} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Espace Administrateur
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Gérez le contenu et les paramètres de l&apos;application
            </Text>
          </View>

          {/* Statistics */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Statistiques
            </Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="newspaper" size={32} color={colors.white} />
                <Text style={styles.statValue}>{news.length}</Text>
                <Text style={styles.statLabel}>Articles</Text>
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
            </View>
          </View>

          {/* Content Management */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Gestion du contenu
            </Text>
            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/manage-news')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="newspaper" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les actualités</Text>
                <Text style={styles.menuDescription}>
                  Ajouter, modifier ou supprimer des articles
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/manage-events')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="calendar" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les événements</Text>
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
                <IconSymbol name="photo.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Gérer les médias</Text>
                <Text style={styles.menuDescription}>
                  Ajouter, modifier ou supprimer des photos et vidéos
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Tools */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Outils
            </Text>
            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/analytics')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="chart.bar.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Analyses</Text>
                <Text style={styles.menuDescription}>
                  Statistiques et analyses détaillées
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/video-conference')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.highlight }]}>
                <IconSymbol name="video.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Vidéoconférence</Text>
                <Text style={styles.menuDescription}>
                  Créer et gérer des réunions en ligne
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/admin-guide')}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="book.fill" size={24} color={colors.black} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Guide d&apos;administration</Text>
                <Text style={styles.menuDescription}>
                  Documentation et aide
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Actions */}
          <View style={commonStyles.section}>
            <Pressable
              style={[buttonStyles.primary, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={handleRefresh}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>Actualiser</Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { marginTop: 12 }]}
              onPress={handleLogout}
            >
              <Text style={buttonStyles.textOutline}>Déconnexion</Text>
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
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
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
    fontSize: 13,
    color: colors.textSecondary,
  },
});
