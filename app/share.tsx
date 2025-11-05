
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Share as RNShare,
  Alert,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';

export default function ShareScreen() {
  const [shareCount, setShareCount] = useState(0);

  const shareMessage = `Rejoignez l'Alliance pour le Rassemblement Malien (A.R.M) !

Notre devise : Fraternité • Liberté • Égalité

Ensemble, construisons un Mali uni, prospère et démocratique.

Téléchargez notre application pour en savoir plus sur nos programmes et nos actions.`;

  const handleShare = async (platform?: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    try {
      const result = await RNShare.share({
        message: shareMessage,
        title: 'A.R.M - Alliance pour le Rassemblement Malien',
      });

      if (result.action === RNShare.sharedAction) {
        setShareCount(shareCount + 1);
        Alert.alert('Merci !', 'Merci d\'avoir partagé A.R.M avec vos contacts !');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      Alert.alert('Erreur', 'Impossible de partager pour le moment');
    }
  };

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'bubble.left.and.bubble.right.fill',
      color: '#25D366',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'f.circle.fill',
      color: '#1877F2',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'at.circle.fill',
      color: '#1DA1F2',
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'envelope.fill',
      color: colors.accent,
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: 'message.fill',
      color: colors.highlight,
    },
    {
      id: 'more',
      name: 'Plus',
      icon: 'square.and.arrow.up.fill',
      color: colors.primary,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Partager A.R.M',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: 'modal',
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <IconSymbol name="square.and.arrow.up.fill" size={64} color={colors.primary} />
            </View>
            <Text style={styles.title}>Partagez A.R.M</Text>
            <Text style={styles.subtitle}>
              Aidez-nous à faire connaître notre mouvement et nos valeurs
            </Text>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Choisissez une plateforme
            </Text>

            <View style={styles.platformGrid}>
              {socialPlatforms.map((platform) => (
                <Pressable
                  key={platform.id}
                  style={styles.platformCard}
                  onPress={() => handleShare(platform.id)}
                >
                  <View style={[styles.platformIcon, { backgroundColor: platform.color }]}>
                    <IconSymbol name={platform.icon} size={32} color={colors.white} />
                  </View>
                  <Text style={styles.platformName}>{platform.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.messageCard}>
              <Text style={styles.messageTitle}>Message de partage</Text>
              <Text style={styles.messageText}>{shareMessage}</Text>
            </View>
          </View>

          {shareCount > 0 && (
            <View style={commonStyles.section}>
              <View style={styles.statsCard}>
                <IconSymbol name="heart.fill" size={32} color={colors.error} />
                <Text style={styles.statsText}>
                  Vous avez partagé {shareCount} fois !
                </Text>
                <Text style={styles.statsSubtext}>Merci pour votre soutien</Text>
              </View>
            </View>
          )}

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Pourquoi partager ?
            </Text>
            <View style={commonStyles.cardWhite}>
              <View style={styles.benefitItem}>
                <IconSymbol name="person.3.fill" size={24} color={colors.primary} />
                <Text style={styles.benefitText}>
                  Augmentez la visibilité de notre mouvement
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <IconSymbol name="heart.fill" size={24} color={colors.error} />
                <Text style={styles.benefitText}>
                  Rassemblez plus de Maliens autour de nos valeurs
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <IconSymbol name="megaphone.fill" size={24} color={colors.accent} />
                <Text style={styles.benefitText}>
                  Faites connaître nos programmes et nos actions
                </Text>
              </View>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Pressable
              style={buttonStyles.outline}
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
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  platformCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  platformIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  messageText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  statsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});
