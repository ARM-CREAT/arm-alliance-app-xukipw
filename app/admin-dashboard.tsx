
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
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';

export default function AdminDashboardScreen() {
  const { isAdmin, logout } = useAuth();
  const { news, events, media, refreshContent } = useContent();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin-login');
    }
  }, [isAdmin]);

  const handleLogout = () => {
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

  const handleRefresh = async () => {
    await refreshContent();
    Alert.alert('Succès', 'Contenu actualisé!');
  };

  if (!isAdmin) {
    return null;
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
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 16 }}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <IconSymbol name="person.circle.fill" size={60} color={colors.primary} />
            <Text style={styles.welcomeTitle}>Bienvenue, Administrateur</Text>
            <Text style={styles.welcomeSubtitle}>Gérez le contenu de l&apos;application</Text>
          </View>

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
              <IconSymbol name="newspaper.fill" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{news.length}</Text>
              <Text style={styles.statLabel}>Actualités</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
              <IconSymbol name="calendar" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{events.length}</Text>
              <Text style={styles.statLabel}>Événements</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.highlight }]}>
              <IconSymbol name="photo.stack.fill" size={32} color={colors.white} />
              <Text style={styles.statNumber}>{media.length}</Text>
              <Text style={styles.statLabel}>Médias</Text>
            </View>
          </View>

          {/* Quick Guide */}
          <View style={commonStyles.section}>
            <Pressable
              style={styles.guideCard}
              onPress={() => router.push('/admin-guide')}
            >
              <IconSymbol name="book.fill" size={32} color={colors.accent} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Guide de l&apos;Administrateur</Text>
                <Text style={styles.guideText}>
                  Comment se connecter et modifier le contenu
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Management Actions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Gestion du Contenu
            </Text>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/manage-news')}
            >
              <View style={styles.actionIcon}>
                <IconSymbol name="newspaper.fill" size={28} color={colors.primary} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Gérer les Actualités</Text>
                <Text style={styles.actionDescription}>
                  Ajouter, modifier ou supprimer des actualités
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/manage-events')}
            >
              <View style={styles.actionIcon}>
                <IconSymbol name="calendar" size={28} color={colors.accent} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Gérer les Événements</Text>
                <Text style={styles.actionDescription}>
                  Ajouter, modifier ou supprimer des événements
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/manage-media')}
            >
              <View style={styles.actionIcon}>
                <IconSymbol name="photo.stack.fill" size={28} color={colors.highlight} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Gérer les Médias</Text>
                <Text style={styles.actionDescription}>
                  Ajouter ou supprimer des photos et vidéos
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} />
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/video-conference')}
            >
              <View style={styles.actionIcon}>
                <IconSymbol name="video.fill" size={28} color={colors.secondary} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Vidéo Conférence</Text>
                <Text style={styles.actionDescription}>
                  Créer et gérer des conférences vidéo
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* System Actions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Actions Système
            </Text>

            <Pressable
              style={[buttonStyles.accent, { marginBottom: 12 }]}
              onPress={handleRefresh}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Actualiser l&apos;Application
              </Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { borderColor: colors.error }]}
              onPress={handleLogout}
            >
              <Text style={[buttonStyles.textOutline, { color: colors.error }]}>
                Se Déconnecter
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
  welcomeSection: {
    backgroundColor: colors.card,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
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
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  guideContent: {
    flex: 1,
    marginLeft: 12,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  guideText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
