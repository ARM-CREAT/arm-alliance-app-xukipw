
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  useColorScheme,
} from 'react-native';
import { lightColors, darkColors } from '@/styles/commonStyles';

const AdminGuideScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkColors : lightColors;

  const sections = [
    {
      title: 'Connexion Administrateur',
      icon: 'lock.fill' as const,
      items: [
        'Mot de passe: ARM2024Admin!',
        'Accédez via le bouton "Admin" sur la page d\'accueil',
        'Le mot de passe est stocké de manière sécurisée',
      ],
    },
    {
      title: 'Gestion du Contenu',
      icon: 'doc.text.fill' as const,
      items: [
        'Actualités: Ajoutez, modifiez et supprimez des articles',
        'Événements: Gérez les événements du parti',
        'Médias: Téléchargez photos et vidéos',
        'Membres: Mettez à jour les informations des membres',
      ],
    },
    {
      title: 'Fonctionnalités Admin',
      icon: 'gear' as const,
      items: [
        'Tableau de bord avec statistiques',
        'Gestion des widgets personnalisés',
        'Analyse des données',
        'Vidéoconférences',
      ],
    },
    {
      title: 'Build et Déploiement',
      icon: 'hammer.fill' as const,
      items: [
        'Consultez le Guide de Build APK',
        'Générez des APK pour Android',
        'Créez des AAB pour Google Play Store',
        'Testez avant de publier',
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: 'Guide Administrateur',
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="person.badge.key.fill" size={48} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Guide Administrateur
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            A.R.M Alliance pour le Rassemblement Malien
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={[styles.section, { backgroundColor: themeColors.card }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name={section.icon} size={24} color={colors.primary} />
              </View>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                {section.title}
              </Text>
            </View>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.item}>
                <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                <Text style={[styles.itemText, { color: themeColors.textSecondary }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <Pressable
          style={[buttonStyles.primary, styles.buildButton]}
          onPress={() => router.push('/build-guide')}
        >
          <IconSymbol name="hammer.fill" size={20} color="#FFFFFF" />
          <Text style={buttonStyles.primaryText}>Voir le Guide de Build APK</Text>
        </Pressable>

        <Pressable
          style={[buttonStyles.secondary, styles.testButton]}
          onPress={() => router.push('/test-checklist')}
        >
          <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
          <Text style={[buttonStyles.secondaryText, { color: colors.primary }]}>
            Liste de Vérification
          </Text>
        </Pressable>

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
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  buildButton: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  testButton: {
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default AdminGuideScreen;
