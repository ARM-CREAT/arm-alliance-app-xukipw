
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

export default function TestPasswordScreen() {
  const [showInfo, setShowInfo] = useState(false);

  const handleAdminAccess = () => {
    Alert.alert(
      'Accès Administrateur',
      'Pour accéder à l\'espace administrateur, veuillez utiliser le bouton "Connexion Admin" et entrer le mot de passe.\n\nLe mot de passe est uniquement connu par l\'administrateur et n\'est jamais affiché dans l\'application.',
      [
        {
          text: 'Aller à la connexion',
          onPress: () => router.push('/admin-login'),
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sécurité Administrateur',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <IconSymbol name="checkmark.shield.fill" size={64} color={colors.success} />
            </View>
            <Text style={styles.title}>Sécurité du Mot de Passe</Text>
            <Text style={styles.subtitle}>
              Le mot de passe administrateur est entièrement sécurisé et protégé
            </Text>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <IconSymbol name="lock.fill" size={24} color={colors.primary} />
                <Text style={styles.cardTitle}>Protection Maximale</Text>
              </View>
              <Text style={styles.cardText}>
                Le mot de passe administrateur est stocké de manière sécurisée et n&apos;est jamais affiché dans l&apos;application. 
                Seul l&apos;administrateur connaît ce mot de passe.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <IconSymbol name="eye.slash.fill" size={24} color={colors.accent} />
                <Text style={styles.cardTitle}>Mot de Passe Caché</Text>
              </View>
              <Text style={styles.cardText}>
                Lors de la saisie, le mot de passe est masqué par des points. 
                Vous pouvez temporairement afficher le mot de passe en appuyant sur l&apos;icône œil, 
                mais il ne sera jamais enregistré ou affiché ailleurs.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <IconSymbol name="person.badge.shield.checkmark.fill" size={24} color={colors.highlight} />
                <Text style={styles.cardTitle}>Accès Restreint</Text>
              </View>
              <Text style={styles.cardText}>
                Seuls les administrateurs autorisés avec le bon mot de passe 
                peuvent accéder au tableau de bord administrateur et gérer le contenu de l&apos;application.
              </Text>
            </View>

            <Pressable
              style={styles.infoButton}
              onPress={() => setShowInfo(!showInfo)}
            >
              <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
              <Text style={styles.infoButtonText}>
                {showInfo ? 'Masquer les détails' : 'Afficher les détails'}
              </Text>
            </Pressable>

            {showInfo && (
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>Fonctionnalités de Sécurité :</Text>
                
                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Mot de passe stocké de manière sécurisée dans le code
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Saisie masquée avec option de visibilité temporaire
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Vérification côté application avant l&apos;accès
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Session persistante après connexion réussie
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Option de déconnexion pour sécuriser l&apos;accès
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.detailText}>
                    Le mot de passe n&apos;est jamais affiché dans l&apos;interface publique
                  </Text>
                </View>
              </View>
            )}

            <Pressable
              style={buttonStyles.primary}
              onPress={handleAdminAccess}
            >
              <IconSymbol name="lock.shield.fill" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Accéder à l&apos;espace Admin
              </Text>
            </Pressable>

            <View style={styles.warningBox}>
              <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.warning} />
              <Text style={styles.warningText}>
                Important : Ne partagez jamais votre mot de passe administrateur avec des personnes non autorisées. 
                Le mot de passe est personnel et confidentiel.
              </Text>
            </View>

            <View style={styles.successBox}>
              <IconSymbol name="checkmark.seal.fill" size={20} color={colors.success} />
              <Text style={styles.successText}>
                Votre application est maintenant sécurisée avec un système d&apos;authentification administrateur robuste.
              </Text>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.success,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  infoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.warning + '10',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.success + '10',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  successText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
});
