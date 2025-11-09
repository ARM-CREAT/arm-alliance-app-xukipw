
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import * as Clipboard from 'expo-clipboard';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  useColorScheme,
} from 'react-native';
import { lightColors, darkColors } from '@/styles/commonStyles';

const BuildGuideScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkColors : lightColors;
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = async (text: string, stepId: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
    Alert.alert('Copié!', 'La commande a été copiée dans le presse-papiers');
  };

  const steps = [
    {
      id: '1',
      title: '1. Installer EAS CLI',
      description: 'Installez EAS CLI globalement sur votre ordinateur',
      command: 'npm install -g eas-cli',
      icon: 'terminal.fill' as const,
    },
    {
      id: '2',
      title: '2. Se connecter à Expo',
      description: 'Connectez-vous à votre compte Expo',
      command: 'eas login',
      icon: 'person.circle.fill' as const,
    },
    {
      id: '3',
      title: '3. Configurer le projet',
      description: 'Configurez votre projet pour EAS Build',
      command: 'eas build:configure',
      icon: 'gear' as const,
    },
    {
      id: '4',
      title: '4. Générer l\'APK (Preview)',
      description: 'Générez un APK pour tester votre application',
      command: 'eas build --platform android --profile preview',
      icon: 'hammer.fill' as const,
    },
    {
      id: '5',
      title: '5. Générer l\'APK (Production)',
      description: 'Générez un APK de production',
      command: 'eas build --platform android --profile production',
      icon: 'checkmark.seal.fill' as const,
    },
    {
      id: '6',
      title: '6. Générer AAB pour Google Play',
      description: 'Générez un fichier AAB pour publier sur Google Play Store',
      command: 'eas build --platform android --profile production-aab',
      icon: 'app.badge.fill' as const,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Guide de Build APK',
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="hammer.fill" size={48} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Guide de Build APK
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Suivez ces étapes pour générer votre APK
          </Text>
        </View>

        {/* Important Notice */}
        <View style={[styles.noticeCard, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
          <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.warning} />
          <View style={styles.noticeContent}>
            <Text style={[styles.noticeTitle, { color: colors.warning }]}>Important</Text>
            <Text style={[styles.noticeText, { color: themeColors.text }]}>
              Assurez-vous d'avoir Node.js et npm installés sur votre ordinateur avant de commencer.
            </Text>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={[styles.stepCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name={step.icon} size={24} color={colors.primary} />
                </View>
                <View style={styles.stepTitleContainer}>
                  <Text style={[styles.stepTitle, { color: themeColors.text }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepDescription, { color: themeColors.textSecondary }]}>
                    {step.description}
                  </Text>
                </View>
              </View>

              <View style={[styles.commandContainer, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
                <Text style={[styles.commandText, { color: colors.primary }]}>
                  {step.command}
                </Text>
              </View>

              <Pressable
                style={[styles.copyButton, { backgroundColor: colors.primary }]}
                onPress={() => copyToClipboard(step.command, step.id)}
              >
                <IconSymbol
                  name={copiedStep === step.id ? 'checkmark' : 'doc.on.doc'}
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.copyButtonText}>
                  {copiedStep === step.id ? 'Copié!' : 'Copier la commande'}
                </Text>
              </Pressable>

              {index < steps.length - 1 && (
                <View style={[styles.stepConnector, { backgroundColor: themeColors.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Additional Info */}
        <View style={[styles.infoCard, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: themeColors.text }]}>
              Après le build
            </Text>
            <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
              - Une fois le build terminé, vous recevrez un lien pour télécharger votre APK{'\n'}
              - Le build peut prendre 10-20 minutes{'\n'}
              - Vous pouvez suivre la progression sur expo.dev{'\n'}
              - L'APK sera disponible pendant 30 jours
            </Text>
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={[styles.infoCard, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="wrench.and.screwdriver.fill" size={24} color={colors.secondary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: themeColors.text }]}>
              Problèmes courants
            </Text>
            <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
              - Si "eas: command not found", redémarrez votre terminal{'\n'}
              - Si erreur de connexion, vérifiez votre compte Expo{'\n'}
              - Si erreur de build, vérifiez les logs sur expo.dev{'\n'}
              - Pour plus d'aide: docs.expo.dev
            </Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksContainer}>
          <Text style={[styles.quickLinksTitle, { color: themeColors.text }]}>
            Liens utiles
          </Text>
          
          <Pressable
            style={[styles.linkButton, { backgroundColor: themeColors.card }]}
            onPress={() => Alert.alert('Lien', 'Ouvrez: https://expo.dev')}
          >
            <IconSymbol name="globe" size={20} color={colors.primary} />
            <Text style={[styles.linkButtonText, { color: themeColors.text }]}>
              Expo Dashboard
            </Text>
            <IconSymbol name="chevron.right" size={16} color={themeColors.textSecondary} />
          </Pressable>

          <Pressable
            style={[styles.linkButton, { backgroundColor: themeColors.card }]}
            onPress={() => Alert.alert('Lien', 'Ouvrez: https://docs.expo.dev/build/introduction')}
          >
            <IconSymbol name="book.fill" size={20} color={colors.primary} />
            <Text style={[styles.linkButtonText, { color: themeColors.text }]}>
              Documentation EAS Build
            </Text>
            <IconSymbol name="chevron.right" size={16} color={themeColors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  noticeCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepsContainer: {
    paddingHorizontal: 16,
  },
  stepCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    position: 'relative',
  },
  stepHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitleContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  commandContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  commandText: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stepConnector: {
    position: 'absolute',
    bottom: -16,
    left: 39,
    width: 2,
    height: 16,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  quickLinksContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  quickLinksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  linkButtonText: {
    flex: 1,
    fontSize: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default BuildGuideScreen;
