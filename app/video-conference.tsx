
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { WebView } from 'react-native-webview';

interface Conference {
  id: string;
  title: string;
  key: string;
  createdAt: string;
  createdBy: string;
}

export default function VideoConferenceScreen() {
  const { isAdmin } = useAuth();
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [conferenceTitle, setConferenceTitle] = useState('');
  const [joinKey, setJoinKey] = useState('');
  const [activeConference, setActiveConference] = useState<Conference | null>(null);

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const createConference = () => {
    if (!conferenceTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la conférence');
      return;
    }

    const newConference: Conference = {
      id: Date.now().toString(),
      title: conferenceTitle,
      key: generateKey(),
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
    };

    setConferences([newConference, ...conferences]);
    setConferenceTitle('');
    setShowCreateForm(false);

    Alert.alert(
      'Conférence créée!',
      `Clé de connexion: ${newConference.key}\n\nPartagez cette clé avec les participants.`,
      [
        {
          text: 'Partager',
          onPress: () => shareConferenceKey(newConference),
        },
        { text: 'OK' },
      ]
    );
  };

  const shareConferenceKey = async (conference: Conference) => {
    try {
      await Share.share({
        message: `Rejoignez la conférence "${conference.title}"\n\nClé de connexion: ${conference.key}\n\nUtilisez cette clé dans l'application A.R.M pour rejoindre la conférence.`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const joinConference = () => {
    if (!joinKey.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une clé de connexion');
      return;
    }

    const conference = conferences.find(
      (c) => c.key.toUpperCase() === joinKey.toUpperCase()
    );

    if (conference) {
      setActiveConference(conference);
      setJoinKey('');
    } else {
      Alert.alert('Erreur', 'Clé de connexion invalide');
    }
  };

  const leaveConference = () => {
    Alert.alert(
      'Quitter la conférence',
      'Êtes-vous sûr de vouloir quitter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () => setActiveConference(null),
        },
      ]
    );
  };

  if (activeConference) {
    return (
      <>
        <Stack.Screen
          options={{
            title: activeConference.title,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerRight: () => (
              <Pressable onPress={leaveConference} style={{ marginRight: 16 }}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.white} />
              </Pressable>
            ),
          }}
        />
        <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.black }]} edges={['bottom']}>
          <View style={styles.conferenceContainer}>
            <View style={styles.videoPlaceholder}>
              <IconSymbol name="video.fill" size={80} color={colors.white} />
              <Text style={styles.videoPlaceholderText}>
                Vidéo Conférence
              </Text>
              <Text style={styles.videoPlaceholderSubtext}>
                La fonctionnalité de vidéo conférence en temps réel nécessite un service externe comme Jitsi Meet ou Zoom.
              </Text>
              <Text style={styles.conferenceKey}>
                Clé: {activeConference.key}
              </Text>
            </View>

            <View style={styles.conferenceControls}>
              <Pressable style={styles.controlButton}>
                <IconSymbol name="mic.fill" size={28} color={colors.white} />
              </Pressable>
              <Pressable style={styles.controlButton}>
                <IconSymbol name="video.fill" size={28} color={colors.white} />
              </Pressable>
              <Pressable
                style={[styles.controlButton, styles.endCallButton]}
                onPress={leaveConference}
              >
                <IconSymbol name="phone.down.fill" size={28} color={colors.white} />
              </Pressable>
              <Pressable style={styles.controlButton}>
                <IconSymbol name="person.badge.plus" size={28} color={colors.white} />
              </Pressable>
              <Pressable
                style={styles.controlButton}
                onPress={() => shareConferenceKey(activeConference)}
              >
                <IconSymbol name="square.and.arrow.up" size={28} color={colors.white} />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Vidéo Conférence',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Join Conference Section */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Rejoindre une Conférence
            </Text>
            <View style={commonStyles.cardWhite}>
              <Text style={commonStyles.label}>Clé de connexion</Text>
              <TextInput
                style={commonStyles.input}
                value={joinKey}
                onChangeText={setJoinKey}
                placeholder="Entrez la clé (ex: ABC123XY)"
                autoCapitalize="characters"
                maxLength={8}
              />
              <Pressable style={buttonStyles.accent} onPress={joinConference}>
                <IconSymbol name="video.fill" size={20} color={colors.white} />
                <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                  Rejoindre
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Create Conference Section (Admin Only) */}
          {isAdmin && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Créer une Conférence
              </Text>
              {!showCreateForm ? (
                <Pressable
                  style={buttonStyles.primary}
                  onPress={() => setShowCreateForm(true)}
                >
                  <IconSymbol name="plus.circle.fill" size={20} color={colors.white} />
                  <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                    Nouvelle Conférence
                  </Text>
                </Pressable>
              ) : (
                <View style={commonStyles.cardWhite}>
                  <Text style={commonStyles.label}>Titre de la conférence</Text>
                  <TextInput
                    style={commonStyles.input}
                    value={conferenceTitle}
                    onChangeText={setConferenceTitle}
                    placeholder="Ex: Réunion du bureau exécutif"
                  />
                  <View style={styles.buttonRow}>
                    <Pressable
                      style={[buttonStyles.outline, { flex: 1 }]}
                      onPress={() => {
                        setShowCreateForm(false);
                        setConferenceTitle('');
                      }}
                    >
                      <Text style={buttonStyles.textOutline}>Annuler</Text>
                    </Pressable>
                    <Pressable
                      style={[buttonStyles.primary, { flex: 1 }]}
                      onPress={createConference}
                    >
                      <Text style={buttonStyles.text}>Créer</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Active Conferences */}
          {conferences.length > 0 && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Conférences Actives
              </Text>
              {conferences.map((conference) => (
                <View key={conference.id} style={styles.conferenceCard}>
                  <View style={styles.conferenceIcon}>
                    <IconSymbol name="video.fill" size={28} color={colors.accent} />
                  </View>
                  <View style={styles.conferenceInfo}>
                    <Text style={styles.conferenceTitle}>{conference.title}</Text>
                    <Text style={styles.conferenceDetails}>
                      Clé: {conference.key}
                    </Text>
                    <Text style={styles.conferenceDate}>
                      Créée le {new Date(conference.createdAt).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <View style={styles.conferenceActions}>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() => setActiveConference(conference)}
                    >
                      <IconSymbol name="arrow.right.circle.fill" size={32} color={colors.accent} />
                    </Pressable>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() => shareConferenceKey(conference)}
                    >
                      <IconSymbol name="square.and.arrow.up" size={24} color={colors.textSecondary} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Info Section */}
          <View style={commonStyles.section}>
            <View style={styles.infoBox}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>À propos des conférences</Text>
                <Text style={styles.infoText}>
                  - Les administrateurs peuvent créer des conférences{'\n'}
                  - Partagez la clé avec les participants{'\n'}
                  - Les conférences restent actives jusqu&apos;à leur suppression{'\n'}
                  - Pour une vidéo conférence complète, intégrez un service comme Jitsi Meet
                </Text>
              </View>
            </View>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  conferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conferenceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  conferenceInfo: {
    flex: 1,
  },
  conferenceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  conferenceDetails: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 2,
  },
  conferenceDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  conferenceActions: {
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  conferenceContainer: {
    flex: 1,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  videoPlaceholderText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginTop: 20,
    textAlign: 'center',
  },
  videoPlaceholderSubtext: {
    fontSize: 14,
    color: colors.white,
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  conferenceKey: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.secondary,
    marginTop: 20,
  },
  conferenceControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: colors.error,
  },
});
