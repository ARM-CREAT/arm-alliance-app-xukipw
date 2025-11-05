
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function InstallPWAScreen() {
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
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <IconSymbol name="arrow.down.circle.fill" size={64} color={colors.success} />
            </View>
            <Text style={styles.title}>Installer A.R.M</Text>
            <Text style={styles.subtitle}>
              Installez notre application pour un accès rapide et une meilleure expérience
            </Text>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Avantages de l&apos;installation
            </Text>
            <View style={commonStyles.cardWhite}>
              <View style={styles.benefitItem}>
                <IconSymbol name="bolt.fill" size={24} color={colors.success} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Accès rapide</Text>
                  <Text style={styles.benefitText}>
                    Lancez l&apos;application directement depuis votre écran d&apos;accueil
                  </Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <IconSymbol name="wifi.slash" size={24} color={colors.accent} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Mode hors ligne</Text>
                  <Text style={styles.benefitText}>
                    Consultez certaines informations même sans connexion internet
                  </Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <IconSymbol name="bell.fill" size={24} color={colors.highlight} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Notifications</Text>
                  <Text style={styles.benefitText}>
                    Recevez des alertes sur les événements et actualités importantes
                  </Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <IconSymbol name="sparkles" size={24} color={colors.primary} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Expérience optimisée</Text>
                  <Text style={styles.benefitText}>
                    Interface fluide et adaptée à votre appareil
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {Platform.OS === 'ios' && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
                Sur iOS (iPhone/iPad)
              </Text>
              <View style={commonStyles.cardWhite}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Ouvrez cette page dans Safari
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Appuyez sur le bouton de partage <IconSymbol name="square.and.arrow.up" size={16} color={colors.primary} />
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Sélectionnez &quot;Sur l&apos;écran d&apos;accueil&quot;
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Appuyez sur &quot;Ajouter&quot;
                  </Text>
                </View>
              </View>
            </View>
          )}

          {Platform.OS === 'android' && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
                Sur Android
              </Text>
              <View style={commonStyles.cardWhite}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Ouvrez cette page dans Chrome
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Appuyez sur le menu (⋮) en haut à droite
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Sélectionnez &quot;Ajouter à l&apos;écran d&apos;accueil&quot;
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Confirmez en appuyant sur &quot;Ajouter&quot;
                  </Text>
                </View>
              </View>
            </View>
          )}

          {Platform.OS === 'web' && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
                Sur ordinateur
              </Text>
              <View style={commonStyles.cardWhite}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Cliquez sur l&apos;icône d&apos;installation dans la barre d&apos;adresse
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Ou utilisez le menu du navigateur : Plus d&apos;outils → Installer l&apos;application
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={commonStyles.section}>
            <View style={styles.infoBox}>
              <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
              <Text style={styles.infoText}>
                L&apos;application ne prend que quelques secondes à installer et ne nécessite aucun téléchargement depuis un store.
              </Text>
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    paddingTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
