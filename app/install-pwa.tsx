
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

export default function InstallPWAScreen() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handler = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
        console.log('PWA install prompt available');
      };

      window.addEventListener('beforeinstallprompt', handler);

      return () => {
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      Alert.alert(
        'Installation',
        'L\'application est déjà installée ou votre navigateur ne supporte pas l\'installation.'
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      Alert.alert('Succès', 'L\'application a été installée avec succès!');
      console.log('PWA installed successfully');
    } else {
      Alert.alert('Annulé', 'L\'installation a été annulée');
      console.log('PWA installation cancelled');
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Installer l\'application',
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
            <IconSymbol name="arrow.down.circle.fill" size={64} color={colors.primary} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Installer A.R.M
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Installez l&apos;application sur votre appareil pour un accès rapide
            </Text>
          </View>

          {/* Benefits */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Avantages de l&apos;installation
            </Text>
            <View style={styles.benefitCard}>
              <View style={styles.benefitRow}>
                <IconSymbol name="bolt.fill" size={24} color={colors.primary} />
                <Text style={styles.benefitText}>Accès rapide depuis votre écran d&apos;accueil</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="wifi.slash" size={24} color={colors.accent} />
                <Text style={styles.benefitText}>Fonctionne hors ligne</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="bell.fill" size={24} color={colors.highlight} />
                <Text style={styles.benefitText}>Recevez des notifications</Text>
              </View>
              <View style={styles.benefitRow}>
                <IconSymbol name="speedometer" size={24} color={colors.success} />
                <Text style={styles.benefitText}>Chargement plus rapide</Text>
              </View>
            </View>
          </View>

          {/* Installation Instructions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Comment installer
            </Text>

            {Platform.OS === 'web' && (
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionTitle}>Sur ordinateur (Chrome/Edge):</Text>
                <Text style={styles.instructionStep}>1. Cliquez sur le bouton &quot;Installer&quot; ci-dessous</Text>
                <Text style={styles.instructionStep}>2. Ou cliquez sur l&apos;icône d&apos;installation dans la barre d&apos;adresse</Text>
                <Text style={styles.instructionStep}>3. Confirmez l&apos;installation</Text>

                <View style={styles.divider} />

                <Text style={styles.instructionTitle}>Sur mobile (Safari iOS):</Text>
                <Text style={styles.instructionStep}>1. Appuyez sur le bouton de partage</Text>
                <Text style={styles.instructionStep}>2. Sélectionnez &quot;Sur l&apos;écran d&apos;accueil&quot;</Text>
                <Text style={styles.instructionStep}>3. Appuyez sur &quot;Ajouter&quot;</Text>

                <View style={styles.divider} />

                <Text style={styles.instructionTitle}>Sur mobile (Chrome Android):</Text>
                <Text style={styles.instructionStep}>1. Appuyez sur le menu (3 points)</Text>
                <Text style={styles.instructionStep}>2. Sélectionnez &quot;Installer l&apos;application&quot;</Text>
                <Text style={styles.instructionStep}>3. Confirmez l&apos;installation</Text>
              </View>
            )}

            {Platform.OS === 'android' && (
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionTitle}>Application Android:</Text>
                <Text style={styles.instructionStep}>
                  L&apos;application est déjà installée sur votre appareil Android.
                </Text>
                <Text style={[commonStyles.textSecondary, { marginTop: 12 }]}>
                  Pour télécharger l&apos;APK, visitez notre site web depuis un navigateur.
                </Text>
              </View>
            )}

            {Platform.OS === 'ios' && (
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionTitle}>Application iOS:</Text>
                <Text style={styles.instructionStep}>
                  L&apos;application est déjà installée sur votre appareil iOS.
                </Text>
              </View>
            )}
          </View>

          {/* Install Button */}
          {Platform.OS === 'web' && (
            <View style={commonStyles.section}>
              {isInstallable ? (
                <Pressable style={buttonStyles.primary} onPress={handleInstall}>
                  <IconSymbol name="arrow.down.circle.fill" size={20} color={colors.white} />
                  <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                    Installer maintenant
                  </Text>
                </Pressable>
              ) : (
                <View style={styles.notInstallableCard}>
                  <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
                  <Text style={styles.notInstallableText}>
                    L&apos;application est déjà installée ou votre navigateur ne supporte pas l&apos;installation PWA.
                  </Text>
                </View>
              )}

              <Pressable
                style={[buttonStyles.outline, { marginTop: 12 }]}
                onPress={() => router.back()}
              >
                <Text style={buttonStyles.textOutline}>Retour</Text>
              </Pressable>
            </View>
          )}

          {Platform.OS !== 'web' && (
            <View style={commonStyles.section}>
              <Pressable style={buttonStyles.primary} onPress={() => router.back()}>
                <Text style={buttonStyles.text}>Retour</Text>
              </Pressable>
            </View>
          )}
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
  },
  instructionsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  instructionStep: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  notInstallableCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.success,
  },
  notInstallableText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
});
