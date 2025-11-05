
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContent } from '@/contexts/ContentContext';
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
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { Stack, router } from 'expo-router';

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuGrid: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
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
  menuChevron: {
    marginLeft: 8,
  },
});

export default function AdminDashboardScreen() {
  const { isAdmin, logout, isLoading } = useAuth();
  const { news, events, media, refreshContent } = useContent();

  useEffect(() => {
    console.log('AdminDashboard - isAdmin:', isAdmin, 'isLoading:', isLoading);
    if (!isLoading && !isAdmin) {
      console.log('Not admin, redirecting to login');
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

  const handleLogout = async () => {
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
            router.replace('/admin-login');
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    await refreshContent();
    Alert.alert('Succès', 'Contenu actualisé');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.text}>Chargement...</Text>
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
          title: 'Tableau de bord',
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
            <IconSymbol name="lock.shield.fill" size={64} color={colors.white} />
            <Text style={styles.headerTitle}>Tableau de bord</Text>
            <Text style={styles.headerSubtitle}>Espace Administrateur</Text>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Statistiques
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: colors.card }]}>
                  <IconSymbol name="newspaper" size={24} color={colors.primary} />
                </View>
                <Text style={styles.statValue}>{news.length}</Text>
                <Text style={styles.statLabel}>Actualités</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: colors.card }]}>
                  <IconSymbol name="calendar" size={24} color={colors.accent} />
                </View>
                <Text style={styles.statValue}>{events.length}</Text>
                <Text style={styles.statLabel}>Événements</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: colors.card }]}>
                  <IconSymbol name="photo.fill" size={24} color={colors.highlight} />
                </View>
                <Text style={styles.statValue}>{media.length}</Text>
                <Text style={styles.statLabel}>Médias</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: colors.card }]}>
                  <IconSymbol name="person.3.fill" size={24} color={colors.secondary} />
                </View>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Membres</Text>
              </View>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Gestion du contenu
            </Text>
            <View style={styles.menuGrid}>
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
                    Ajouter, modifier ou supprimer des actualités
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} style={styles.menuChevron} />
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
                <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} style={styles.menuChevron} />
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
                    Ajouter ou supprimer des photos et vidéos
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} style={styles.menuChevron} />
              </Pressable>

              <Pressable
                style={styles.menuItem}
                onPress={() => router.push('/analytics')}
              >
                <View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}>
                  <IconSymbol name="chart.bar.fill" size={24} color={colors.black} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>Analyses</Text>
                  <Text style={styles.menuDescription}>
                    Voir les statistiques détaillées
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} style={styles.menuChevron} />
              </Pressable>

              <Pressable
                style={styles.menuItem}
                onPress={() => router.push('/admin-guide')}
              >
                <View style={[styles.menuIcon, { backgroundColor: colors.accent }]}>
                  <IconSymbol name="book.fill" size={24} color={colors.white} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>Guide d&apos;administration</Text>
                  <Text style={styles.menuDescription}>
                    Instructions pour gérer l&apos;application
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} style={styles.menuChevron} />
              </Pressable>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Pressable style={buttonStyles.primary} onPress={handleRefresh}>
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Actualiser le contenu
              </Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { marginTop: 12, borderColor: colors.error }]}
              onPress={handleLogout}
            >
              <IconSymbol name="arrow.right.square.fill" size={20} color={colors.error} />
              <Text style={[buttonStyles.textOutline, { marginLeft: 8, color: colors.error }]}>
                Déconnexion
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
