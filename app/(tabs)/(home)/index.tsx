
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Image, Pressable, Platform, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

export default function HomeScreen() {
  const handleDonation = () => {
    router.push('/donations');
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "A.R.M",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
          }}
        />
      )}
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section with Logo */}
          <View style={styles.heroSection}>
            <Image
              source={{ uri: 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/ef2123d4-1cc1-4115-a9f7-a9eb468170b4/assets/images/985330b5-79d1-46f0-a940-6a9b43f3f4ea.jpeg?AWSAccessKeyId=AKIAVRUVRKQJC5DISQ4Q&Signature=RDGWypHkHgoZJ4PnoUkXULAbvdc%3D&Expires=1762284336' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.heroTitle}>A.R.M</Text>
            <Text style={styles.heroSubtitle}>Alliance pour le Rassemblement Malien</Text>
            <View style={styles.mottoContainer}>
              <Text style={styles.motto}>Fraternité • Liberté • Égalité</Text>
            </View>
          </View>

          {/* Political Program Section */}
          <View style={[commonStyles.section, styles.programSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>Notre Programme Politique</Text>
            <View style={commonStyles.cardWhite}>
              <Text style={commonStyles.text}>
                L&apos;Alliance pour le Rassemblement Malien (A.R.M) s&apos;engage à construire un Mali uni, prospère et démocratique. 
                Notre vision repose sur les valeurs fondamentales de fraternité, liberté et égalité pour tous les Maliens.
              </Text>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.programPointText}>Renforcement de la démocratie et de l&apos;État de droit</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.programPointText}>Développement économique et création d&apos;emplois</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.programPointText}>Éducation de qualité pour tous</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.programPointText}>Santé accessible et modernisée</Text>
              </View>
              <View style={styles.programPoint}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                <Text style={styles.programPointText}>Unité nationale et cohésion sociale</Text>
              </View>
            </View>
          </View>

          {/* Donation Section */}
          <View style={[commonStyles.section, styles.donationSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>Soutenez Notre Mouvement</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
              Votre contribution nous aide à construire un Mali meilleur
            </Text>
            <Pressable 
              style={[buttonStyles.primary, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={handleDonation}
            >
              <IconSymbol name="heart.fill" size={20} color={colors.white} />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>Faire un don</Text>
            </Pressable>
          </View>

          {/* Quick Actions */}
          <View style={[commonStyles.section, styles.actionsSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>Actions Rapides</Text>
            <View style={styles.actionGrid}>
              <Link href="/membership" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="person.badge.plus" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Adhérer</Text>
                  <Text style={styles.actionDescription}>Rejoignez le parti</Text>
                </Pressable>
              </Link>

              <Link href="/events" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="calendar" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Événements</Text>
                  <Text style={styles.actionDescription}>Nos activités</Text>
                </Pressable>
              </Link>

              <Link href="/news" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="newspaper" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Actualités</Text>
                  <Text style={styles.actionDescription}>Dernières nouvelles</Text>
                </Pressable>
              </Link>

              <Link href="/contact" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                    <IconSymbol name="envelope.fill" size={28} color={colors.black} />
                  </View>
                  <Text style={styles.actionTitle}>Contact</Text>
                  <Text style={styles.actionDescription}>Nous contacter</Text>
                </Pressable>
              </Link>

              <Link href="/chat" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="bubble.left.and.bubble.right.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Chat</Text>
                  <Text style={styles.actionDescription}>Discussion publique</Text>
                </Pressable>
              </Link>

              <Link href="/media-gallery" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="photo.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Galerie</Text>
                  <Text style={styles.actionDescription}>Photos & Vidéos</Text>
                </Pressable>
              </Link>

              <Link href="/regions" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                    <IconSymbol name="map.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Régions</Text>
                  <Text style={styles.actionDescription}>Régions du Mali</Text>
                </Pressable>
              </Link>

              <Link href="/public-dashboard" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name="chart.bar.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Tableau de bord</Text>
                  <Text style={styles.actionDescription}>Vue d&apos;ensemble</Text>
                </Pressable>
              </Link>

              <Link href="/video-conference" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.highlight }]}>
                    <IconSymbol name="video.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Vidéoconférence</Text>
                  <Text style={styles.actionDescription}>Réunions en ligne</Text>
                </Pressable>
              </Link>

              <Link href="/share" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: '#1877F2' }]}>
                    <IconSymbol name="square.and.arrow.up.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Partager</Text>
                  <Text style={styles.actionDescription}>Partagez A.R.M</Text>
                </Pressable>
              </Link>

              <Link href="/install-pwa" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
                    <IconSymbol name="arrow.down.circle.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Installer</Text>
                  <Text style={styles.actionDescription}>Installer l&apos;app</Text>
                </Pressable>
              </Link>

              <Link href="/admin-login" asChild>
                <Pressable style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: colors.error }]}>
                    <IconSymbol name="lock.shield.fill" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.actionTitle}>Admin</Text>
                  <Text style={styles.actionDescription}>Espace admin</Text>
                </Pressable>
              </Link>
            </View>
          </View>

          {/* Party Info */}
          <View style={[commonStyles.section, styles.infoSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>Informations</Text>
            <View style={commonStyles.cardWhite}>
              <View style={styles.infoRow}>
                <IconSymbol name="building.2" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Siège</Text>
                  <Text style={styles.infoText}>Rue 530, Porte 245, Sebenikoro, Bamako, Mali</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Contact</Text>
                  <Text style={styles.infoText}>+223 76 30 48 69</Text>
                </View>
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
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroSection: {
    backgroundColor: colors.primary,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: colors.white,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  mottoContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  motto: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  programSection: {
    marginTop: 24,
  },
  programPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  programPointText: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  donationSection: {
    backgroundColor: colors.card,
    paddingVertical: 24,
    marginTop: 8,
  },
  actionsSection: {
    marginTop: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  infoSection: {
    marginTop: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
});
