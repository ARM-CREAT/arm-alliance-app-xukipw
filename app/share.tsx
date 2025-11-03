
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Share,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

export default function ShareScreen() {
  const [shareCount, setShareCount] = useState(0);

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Rejoignez A.R.M - Alliance pour le Rassemblement Malien\n\nEnsemble, construisons un Mali meilleur!\n\nFraternité • Liberté • Égalité\n\nTéléchargez l\'application maintenant!',
        title: 'A.R.M - Alliance pour le Rassemblement Malien',
      });

      if (result.action === Share.sharedAction) {
        setShareCount(shareCount + 1);
        Alert.alert('Merci!', 'Merci d\'avoir partagé A.R.M avec vos contacts!');
        console.log('App shared successfully');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Erreur', 'Impossible de partager pour le moment');
    }
  };

  const shareOnSocialMedia = async (platform: string) => {
    const message = 'Rejoignez A.R.M - Alliance pour le Rassemblement Malien. Ensemble, construisons un Mali meilleur! #ARM #Mali #Politique';
    
    try {
      await Share.share({
        message: message,
      });
      console.log(`Shared on ${platform}`);
    } catch (error) {
      console.error(`Error sharing on ${platform}:`, error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Partager',
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
            <IconSymbol name="square.and.arrow.up" size={48} color={colors.accent} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Partagez A.R.M
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Aidez-nous à faire connaître notre parti
            </Text>
          </View>

          {/* Share Stats */}
          {shareCount > 0 && (
            <View style={commonStyles.section}>
              <View style={styles.statsCard}>
                <IconSymbol name="heart.fill" size={32} color={colors.error} />
                <Text style={styles.statsText}>
                  Vous avez partagé {shareCount} fois
                </Text>
                <Text style={styles.statsSubtext}>
                  Merci pour votre soutien!
                </Text>
              </View>
            </View>
          )}

          {/* Main Share Button */}
          <View style={commonStyles.section}>
            <Pressable style={buttonStyles.primary} onPress={shareApp}>
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Partager l&apos;application
              </Text>
            </Pressable>
          </View>

          {/* Social Media Sharing */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Partager sur les réseaux sociaux
            </Text>
            <View style={styles.socialGrid}>
              <Pressable
                style={[styles.socialCard, { backgroundColor: '#1877F2' }]}
                onPress={() => shareOnSocialMedia('Facebook')}
              >
                <IconSymbol name="f.square.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>Facebook</Text>
              </Pressable>

              <Pressable
                style={[styles.socialCard, { backgroundColor: '#1DA1F2' }]}
                onPress={() => shareOnSocialMedia('Twitter')}
              >
                <IconSymbol name="at" size={32} color={colors.white} />
                <Text style={styles.socialText}>Twitter</Text>
              </Pressable>

              <Pressable
                style={[styles.socialCard, { backgroundColor: '#25D366' }]}
                onPress={() => shareOnSocialMedia('WhatsApp')}
              >
                <IconSymbol name="message.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>WhatsApp</Text>
              </Pressable>

              <Pressable
                style={[styles.socialCard, { backgroundColor: '#0088CC' }]}
                onPress={() => shareOnSocialMedia('Telegram')}
              >
                <IconSymbol name="paperplane.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>Telegram</Text>
              </Pressable>
            </View>
          </View>

          {/* Share Message Preview */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Message de partage
            </Text>
            <View style={styles.messagePreview}>
              <Text style={styles.messageText}>
                Rejoignez A.R.M - Alliance pour le Rassemblement Malien
              </Text>
              <Text style={styles.messageText}>
                {'\n'}Ensemble, construisons un Mali meilleur!
              </Text>
              <Text style={styles.messageText}>
                {'\n'}Fraternité • Liberté • Égalité
              </Text>
              <Text style={styles.messageText}>
                {'\n'}Téléchargez l&apos;application maintenant!
              </Text>
            </View>
          </View>

          {/* Why Share Section */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Pourquoi partager?
            </Text>
            <View style={styles.benefitsCard}>
              <View style={styles.benefitRow}>
                <IconSymbol name="person.3.fill" size={24} color={colors.primary} />
                <Text style={styles.benefitText}>
                  Aidez plus de Maliens à découvrir notre vision
                </Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="megaphone.fill" size={24} color={colors.accent} />
                <Text style={styles.benefitText}>
                  Amplifiez notre message de changement
                </Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="hand.raised.fill" size={24} color={colors.highlight} />
                <Text style={styles.benefitText}>
                  Contribuez à la construction d&apos;un Mali meilleur
                </Text>
              </View>
            </View>
          </View>

          {/* Back Button */}
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
    paddingVertical: 24,
    paddingHorizontal: 20,
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
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  socialCard: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginTop: 8,
  },
  messagePreview: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
});
