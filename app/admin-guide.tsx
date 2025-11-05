
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';


export default function AdminGuideScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Guide Administrateur',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="book.fill" size={60} color={colors.primary} />
            <Text style={styles.headerTitle}>Guide de l&apos;Administrateur</Text>
            <Text style={styles.headerSubtitle}>
              Comment gérer le contenu de l&apos;application A.R.M
            </Text>
          </View>

          {/* Section 1: Tableau de Bord */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="1.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tableau de Bord</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Le tableau de bord est votre centre de contrôle. Vous y trouverez :
              </Text>
              <View style={styles.feature}>
                <IconSymbol name="chart.bar.fill" size={24} color={colors.primary} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Statistiques</Text>
                  <Text style={styles.featureText}>
                    Nombre d&apos;actualités, événements et médias
                  </Text>
                </View>
              </View>
              <View style={styles.feature}>
                <IconSymbol name="square.grid.2x2.fill" size={24} color={colors.accent} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Actions de Gestion</Text>
                  <Text style={styles.featureText}>
                    Accès rapide à toutes les fonctions de modification
                  </Text>
                </View>
              </View>
              <View style={styles.feature}>
                <IconSymbol name="arrow.clockwise" size={24} color={colors.highlight} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Actualisation</Text>
                  <Text style={styles.featureText}>
                    Rafraîchir le contenu de l&apos;application
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Section 2: Gestion des Actualités */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="2.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Gérer les Actualités</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.stepTitle}>Ajouter une actualité :</Text>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Cliquez sur &quot;Gérer les Actualités&quot; dans le tableau de bord
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Cliquez sur &quot;Nouvelle Actualité&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Remplissez le titre, choisissez une catégorie et écrivez le contenu
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Cliquez sur &quot;Ajouter&quot; pour publier
                </Text>
              </View>
              <Text style={[styles.stepTitle, { marginTop: 16 }]}>Modifier ou supprimer :</Text>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Utilisez les boutons &quot;Modifier&quot; ou &quot;Supprimer&quot; sur chaque actualité
                </Text>
              </View>
            </View>
          </View>

          {/* Section 3: Gestion des Événements */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="3.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Gérer les Événements</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.stepTitle}>Créer un événement :</Text>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Accédez à &quot;Gérer les Événements&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Cliquez sur &quot;Nouvel Événement&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Remplissez le titre, type, date, lieu et description
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Format de date : AAAA-MM-JJ (exemple : 2024-02-15)
                </Text>
              </View>
            </View>
          </View>

          {/* Section 4: Gestion des Médias */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="4.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Gérer les Médias</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.stepTitle}>Ajouter des photos/vidéos :</Text>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Accédez à &quot;Gérer les Médias&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Choisissez le type (Image ou Vidéo)
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Entrez un titre et l&apos;URL du média
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Pour les images, vous pouvez utiliser des services comme Unsplash
                </Text>
              </View>
            </View>
          </View>

          {/* Section 5: Vidéo Conférence */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="5.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Vidéo Conférence</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.stepTitle}>Créer une conférence :</Text>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Accédez à &quot;Vidéo Conférence&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Cliquez sur &quot;Créer une Conférence&quot;
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Une clé unique sera générée automatiquement
                </Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>•</Text>
                <Text style={styles.stepText}>
                  Partagez cette clé avec les participants
                </Text>
              </View>
            </View>
          </View>

          {/* Section 6: Informations Importantes */}
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="info.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Informations Importantes</Text>
            </View>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.securityItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                <Text style={styles.securityText}>
                  Toutes les fonctionnalités d&apos;administration sont accessibles directement
                </Text>
              </View>
              <View style={styles.securityItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                <Text style={styles.securityText}>
                  Les modifications sont sauvegardées automatiquement
                </Text>
              </View>
              <View style={styles.securityItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                <Text style={styles.securityText}>
                  Le contenu est stocké localement sur l&apos;appareil
                </Text>
              </View>
              <View style={styles.securityItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                <Text style={styles.securityText}>
                  Utilisez le bouton &quot;Actualiser&quot; pour recharger le contenu
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Pressable
              style={buttonStyles.primary}
              onPress={() => router.push('/admin-dashboard')}
            >
              <IconSymbol name="square.grid.2x2.fill" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Aller au Tableau de Bord
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
  header: {
    backgroundColor: colors.card,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 8,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 12,
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  password: {
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'monospace',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    gap: 10,
    marginTop: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});
