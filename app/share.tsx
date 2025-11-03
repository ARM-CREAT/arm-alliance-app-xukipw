
import React from 'react';
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
  const shareMessage = 'Rejoignez A.R.M - Alliance pour le Rassemblement Malien. Ensemble, construisons un Mali meilleur! 🇲🇱';
  const shareUrl = 'https://arm-mali.org'; // Remplacez par votre URL réelle

  const handleShare = async (platform?: string) => {
    try {
      const result = await Share.share({
        message: `${shareMessage}\n\n${shareUrl}`,
        title: 'A.R.M - Alliance pour le Rassemblement Malien',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
        Alert.alert('Succès', 'Merci d\'avoir partagé A.R.M!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Erreur', 'Impossible de partager pour le moment');
    }
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        break;
    }

    if (url && Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      handleShare();
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
            <IconSymbol name="square.and.arrow.up.fill" size={48} color={colors.primary} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Partagez A.R.M
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Aidez-nous à faire connaître notre mouvement
            </Text>
          </View>

          {/* Share Message Preview */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Message à partager
            </Text>
            <View style={styles.messageCard}>
              <Text style={styles.messageText}>{shareMessage}</Text>
              <Text style={styles.urlText}>{shareUrl}</Text>
            </View>
          </View>

          {/* Social Media Buttons */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Partager sur les réseaux sociaux
            </Text>
            <View style={styles.socialGrid}>
              <Pressable
                style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
                onPress={() => handleSocialShare('facebook')}
              >
                <IconSymbol name="f.square.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>Facebook</Text>
              </Pressable>

              <Pressable
                style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
                onPress={() => handleSocialShare('twitter')}
              >
                <IconSymbol name="bird.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>Twitter</Text>
              </Pressable>

              <Pressable
                style={[styles.socialButton, { backgroundColor: '#25D366' }]}
                onPress={() => handleSocialShare('whatsapp')}
              >
                <IconSymbol name="message.fill" size={32} color={colors.white} />
                <Text style={styles.socialText}>WhatsApp</Text>
              </Pressable>

              <Pressable
                style={[styles.socialButton, { backgroundColor: '#0A66C2' }]}
                onPress={() => handleSocialShare('linkedin')}
              >
                <IconSymbol name="link" size={32} color={colors.white} />
                <Text style={styles.socialText}>LinkedIn</Text>
              </Pressable>
            </View>
          </View>

          {/* Generic Share */}
          <View style={commonStyles.section}>
            <Pressable
              style={[buttonStyles.primary, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={() => handleShare()}
            >
              <IconSymbol name="square.and.arrow.up.fill" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>Partager</Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { marginTop: 12 }]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.textOutline}>Retour</Text>
            </Pressable>
          </View>

          {/* Why Share */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Pourquoi partager?
            </Text>
            <View style={styles.benefitCard}>
              <View style={styles.benefitRow}>
                <IconSymbol name="person.3.fill" size={24} color={colors.primary} />
                <Text style={styles.benefitText}>
                  Aidez-nous à toucher plus de Maliens
                </Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="megaphone.fill" size={24} color={colors.accent} />
                <Text style={styles.benefitText}>
                  Faites connaître notre programme politique
                </Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="heart.fill" size={24} color={colors.error} />
                <Text style={styles.benefitText}>
                  Soutenez notre mouvement pour un Mali meilleur
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  messageCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  urlText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    marginTop: 8,
  },
  benefitCard: {
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
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
