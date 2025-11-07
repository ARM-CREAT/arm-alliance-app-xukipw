
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { lightColors, darkColors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface TestItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tested: boolean;
  passed: boolean;
}

export default function TestChecklistScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const [testItems, setTestItems] = useState<TestItem[]>([
    // Navigation & Core Functionality
    {
      id: '1',
      category: 'Navigation',
      title: 'Page d\'accueil',
      description: 'Vérifier que la page d\'accueil s\'affiche correctement avec le logo, le programme politique et les actions rapides',
      tested: false,
      passed: false,
    },
    {
      id: '2',
      category: 'Navigation',
      title: 'Navigation entre les écrans',
      description: 'Tester la navigation vers tous les écrans (Membres, Événements, Actualités, Contact, etc.)',
      tested: false,
      passed: false,
    },
    {
      id: '3',
      category: 'Navigation',
      title: 'Bouton retour',
      description: 'Vérifier que le bouton retour fonctionne sur tous les écrans',
      tested: false,
      passed: false,
    },

    // Language Support
    {
      id: '4',
      category: 'Langues',
      title: 'Sélecteur de langue',
      description: 'Vérifier que le sélecteur de langue s\'ouvre et affiche les 3 langues (Français, Español, Bamanankan)',
      tested: false,
      passed: false,
    },
    {
      id: '5',
      category: 'Langues',
      title: 'Changement de langue',
      description: 'Tester le changement de langue et vérifier que toutes les traductions s\'appliquent correctement',
      tested: false,
      passed: false,
    },
    {
      id: '6',
      category: 'Langues',
      title: 'Persistance de la langue',
      description: 'Fermer et rouvrir l\'application pour vérifier que la langue sélectionnée est conservée',
      tested: false,
      passed: false,
    },

    // Theme Support
    {
      id: '7',
      category: 'Thème',
      title: 'Mode clair',
      description: 'Vérifier que le mode clair s\'affiche correctement avec les bonnes couleurs',
      tested: false,
      passed: false,
    },
    {
      id: '8',
      category: 'Thème',
      title: 'Mode sombre',
      description: 'Activer le mode sombre du système et vérifier que l\'application s\'adapte correctement',
      tested: false,
      passed: false,
    },

    // Member Management
    {
      id: '9',
      category: 'Membres',
      title: 'Affichage des membres',
      description: 'Vérifier que tous les membres du parti s\'affichent correctement avec leurs informations',
      tested: false,
      passed: false,
    },
    {
      id: '10',
      category: 'Membres',
      title: 'Appel téléphonique',
      description: 'Tester la fonction d\'appel pour un membre avec numéro de téléphone',
      tested: false,
      passed: false,
    },
    {
      id: '11',
      category: 'Membres',
      title: 'Envoi de message',
      description: 'Tester la fonction d\'envoi de SMS pour un membre',
      tested: false,
      passed: false,
    },
    {
      id: '12',
      category: 'Membres',
      title: 'Envoi d\'email',
      description: 'Tester la fonction d\'envoi d\'email pour un membre',
      tested: false,
      passed: false,
    },

    // Admin Authentication
    {
      id: '13',
      category: 'Administration',
      title: 'Connexion admin',
      description: 'Tester la connexion avec le mot de passe administrateur',
      tested: false,
      passed: false,
    },
    {
      id: '14',
      category: 'Administration',
      title: 'Mot de passe incorrect',
      description: 'Vérifier que la connexion échoue avec un mauvais mot de passe',
      tested: false,
      passed: false,
    },
    {
      id: '15',
      category: 'Administration',
      title: 'Déconnexion admin',
      description: 'Tester la déconnexion de l\'espace administrateur',
      tested: false,
      passed: false,
    },
    {
      id: '16',
      category: 'Administration',
      title: 'Tableau de bord admin',
      description: 'Vérifier que le tableau de bord admin affiche toutes les options de gestion',
      tested: false,
      passed: false,
    },

    // Content Management
    {
      id: '17',
      category: 'Gestion de contenu',
      title: 'Ajout d\'actualité',
      description: 'Tester l\'ajout d\'une nouvelle actualité depuis l\'espace admin',
      tested: false,
      passed: false,
    },
    {
      id: '18',
      category: 'Gestion de contenu',
      title: 'Modification d\'actualité',
      description: 'Tester la modification d\'une actualité existante',
      tested: false,
      passed: false,
    },
    {
      id: '19',
      category: 'Gestion de contenu',
      title: 'Suppression d\'actualité',
      description: 'Tester la suppression d\'une actualité',
      tested: false,
      passed: false,
    },
    {
      id: '20',
      category: 'Gestion de contenu',
      title: 'Ajout d\'événement',
      description: 'Tester l\'ajout d\'un nouvel événement',
      tested: false,
      passed: false,
    },
    {
      id: '21',
      category: 'Gestion de contenu',
      title: 'Modification d\'événement',
      description: 'Tester la modification d\'un événement existant',
      tested: false,
      passed: false,
    },
    {
      id: '22',
      category: 'Gestion de contenu',
      title: 'Suppression d\'événement',
      description: 'Tester la suppression d\'un événement',
      tested: false,
      passed: false,
    },
    {
      id: '23',
      category: 'Gestion de contenu',
      title: 'Ajout de média',
      description: 'Tester l\'ajout d\'un nouveau média (photo ou vidéo)',
      tested: false,
      passed: false,
    },
    {
      id: '24',
      category: 'Gestion de contenu',
      title: 'Suppression de média',
      description: 'Tester la suppression d\'un média',
      tested: false,
      passed: false,
    },
    {
      id: '25',
      category: 'Gestion de contenu',
      title: 'Ajout de membre',
      description: 'Tester l\'ajout d\'un nouveau membre du parti',
      tested: false,
      passed: false,
    },
    {
      id: '26',
      category: 'Gestion de contenu',
      title: 'Modification de membre',
      description: 'Tester la modification des informations d\'un membre',
      tested: false,
      passed: false,
    },
    {
      id: '27',
      category: 'Gestion de contenu',
      title: 'Suppression de membre',
      description: 'Tester la suppression d\'un membre',
      tested: false,
      passed: false,
    },

    // Public Features
    {
      id: '28',
      category: 'Fonctionnalités publiques',
      title: 'Formulaire d\'adhésion',
      description: 'Tester le formulaire d\'adhésion au parti',
      tested: false,
      passed: false,
    },
    {
      id: '29',
      category: 'Fonctionnalités publiques',
      title: 'Formulaire de contact',
      description: 'Tester le formulaire de contact',
      tested: false,
      passed: false,
    },
    {
      id: '30',
      category: 'Fonctionnalités publiques',
      title: 'Page de dons',
      description: 'Vérifier l\'affichage de la page de dons avec les montants et méthodes de paiement',
      tested: false,
      passed: false,
    },
    {
      id: '31',
      category: 'Fonctionnalités publiques',
      title: 'Chat public',
      description: 'Tester l\'envoi de messages dans le chat public',
      tested: false,
      passed: false,
    },
    {
      id: '32',
      category: 'Fonctionnalités publiques',
      title: 'Galerie média',
      description: 'Vérifier l\'affichage des photos et vidéos dans la galerie',
      tested: false,
      passed: false,
    },
    {
      id: '33',
      category: 'Fonctionnalités publiques',
      title: 'Lecture de vidéo',
      description: 'Tester la lecture d\'une vidéo dans la galerie',
      tested: false,
      passed: false,
    },
    {
      id: '34',
      category: 'Fonctionnalités publiques',
      title: 'Régions du Mali',
      description: 'Vérifier l\'affichage de toutes les régions du Mali',
      tested: false,
      passed: false,
    },
    {
      id: '35',
      category: 'Fonctionnalités publiques',
      title: 'Tableau de bord public',
      description: 'Vérifier l\'affichage du tableau de bord public avec les statistiques',
      tested: false,
      passed: false,
    },
    {
      id: '36',
      category: 'Fonctionnalités publiques',
      title: 'Vidéoconférence',
      description: 'Tester la création et le partage d\'une clé de vidéoconférence',
      tested: false,
      passed: false,
    },

    // Search & Filter
    {
      id: '37',
      category: 'Recherche et filtres',
      title: 'Recherche d\'actualités',
      description: 'Tester la fonction de recherche dans les actualités',
      tested: false,
      passed: false,
    },
    {
      id: '38',
      category: 'Recherche et filtres',
      title: 'Filtres d\'actualités',
      description: 'Tester les filtres par catégorie dans les actualités',
      tested: false,
      passed: false,
    },
    {
      id: '39',
      category: 'Recherche et filtres',
      title: 'Recherche d\'événements',
      description: 'Tester la fonction de recherche dans les événements',
      tested: false,
      passed: false,
    },
    {
      id: '40',
      category: 'Recherche et filtres',
      title: 'Filtres d\'événements',
      description: 'Tester les filtres par type dans les événements',
      tested: false,
      passed: false,
    },

    // Data Persistence
    {
      id: '41',
      category: 'Persistance des données',
      title: 'Sauvegarde des actualités',
      description: 'Ajouter une actualité, fermer l\'app et vérifier qu\'elle est toujours là',
      tested: false,
      passed: false,
    },
    {
      id: '42',
      category: 'Persistance des données',
      title: 'Sauvegarde des événements',
      description: 'Ajouter un événement, fermer l\'app et vérifier qu\'il est toujours là',
      tested: false,
      passed: false,
    },
    {
      id: '43',
      category: 'Persistance des données',
      title: 'Sauvegarde des membres',
      description: 'Modifier un membre, fermer l\'app et vérifier que les modifications sont conservées',
      tested: false,
      passed: false,
    },
    {
      id: '44',
      category: 'Persistance des données',
      title: 'Sauvegarde de l\'authentification',
      description: 'Se connecter en admin, fermer l\'app et vérifier que la session est conservée',
      tested: false,
      passed: false,
    },

    // UI/UX
    {
      id: '45',
      category: 'Interface utilisateur',
      title: 'Animations',
      description: 'Vérifier que les animations sont fluides (transitions, apparitions)',
      tested: false,
      passed: false,
    },
    {
      id: '46',
      category: 'Interface utilisateur',
      title: 'Retour haptique',
      description: 'Vérifier que les vibrations fonctionnent lors des interactions (sur mobile)',
      tested: false,
      passed: false,
    },
    {
      id: '47',
      category: 'Interface utilisateur',
      title: 'Toasts de notification',
      description: 'Vérifier que les messages de confirmation s\'affichent correctement',
      tested: false,
      passed: false,
    },
    {
      id: '48',
      category: 'Interface utilisateur',
      title: 'Pull to refresh',
      description: 'Tester le rafraîchissement par glissement sur les listes',
      tested: false,
      passed: false,
    },
    {
      id: '49',
      category: 'Interface utilisateur',
      title: 'États de chargement',
      description: 'Vérifier que les indicateurs de chargement s\'affichent correctement',
      tested: false,
      passed: false,
    },
    {
      id: '50',
      category: 'Interface utilisateur',
      title: 'États vides',
      description: 'Vérifier que les messages d\'état vide s\'affichent quand il n\'y a pas de contenu',
      tested: false,
      passed: false,
    },

    // Error Handling
    {
      id: '51',
      category: 'Gestion des erreurs',
      title: 'Champs obligatoires',
      description: 'Vérifier que les formulaires valident les champs obligatoires',
      tested: false,
      passed: false,
    },
    {
      id: '52',
      category: 'Gestion des erreurs',
      title: 'Messages d\'erreur',
      description: 'Vérifier que les messages d\'erreur sont clairs et informatifs',
      tested: false,
      passed: false,
    },
    {
      id: '53',
      category: 'Gestion des erreurs',
      title: 'Gestion hors ligne',
      description: 'Vérifier que l\'application fonctionne en mode hors ligne',
      tested: false,
      passed: false,
    },
  ]);

  const toggleTest = (id: string, passed: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTestItems(items =>
      items.map(item =>
        item.id === id ? { ...item, tested: true, passed } : item
      )
    );
  };

  const resetTests = () => {
    Alert.alert(
      'Réinitialiser les tests',
      'Voulez-vous réinitialiser tous les tests ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            setTestItems(items =>
              items.map(item => ({ ...item, tested: false, passed: false }))
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const generateReport = () => {
    const total = testItems.length;
    const tested = testItems.filter(item => item.tested).length;
    const passed = testItems.filter(item => item.passed).length;
    const failed = testItems.filter(item => item.tested && !item.passed).length;
    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

    Alert.alert(
      'Rapport de test',
      `Tests effectués: ${tested}/${total}\n` +
      `Tests réussis: ${passed}\n` +
      `Tests échoués: ${failed}\n` +
      `Taux de réussite: ${percentage}%\n\n` +
      (percentage === 100 ? '✅ Tous les tests sont passés!' : 
       percentage >= 80 ? '⚠️ Quelques tests nécessitent attention' :
       '❌ Plusieurs tests nécessitent correction'),
      [{ text: 'OK' }]
    );
  };

  const categories = [...new Set(testItems.map(item => item.category))];

  const getCategoryStats = (category: string) => {
    const categoryItems = testItems.filter(item => item.category === category);
    const tested = categoryItems.filter(item => item.tested).length;
    const passed = categoryItems.filter(item => item.passed).length;
    return { total: categoryItems.length, tested, passed };
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Liste de contrôle',
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
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Test de l'application A.R.M
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {testItems.filter(item => item.tested).length}/{testItems.length} tests effectués
          </Text>
          <View style={styles.headerButtons}>
            <Pressable
              style={[styles.headerButton, { backgroundColor: colors.accent }]}
              onPress={generateReport}
            >
              <IconSymbol name="chart.bar.fill" size={20} color={colors.white} />
              <Text style={styles.headerButtonText}>Rapport</Text>
            </Pressable>
            <Pressable
              style={[styles.headerButton, { backgroundColor: colors.error }]}
              onPress={resetTests}
            >
              <IconSymbol name="arrow.counterclockwise" size={20} color={colors.white} />
              <Text style={styles.headerButtonText}>Réinitialiser</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {categories.map(category => {
            const stats = getCategoryStats(category);
            const categoryItems = testItems.filter(item => item.category === category);

            return (
              <View key={category} style={[styles.categorySection, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.categoryHeader}>
                  <Text style={[styles.categoryTitle, { color: colors.text }]}>{category}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.categoryBadgeText}>
                      {stats.passed}/{stats.total}
                    </Text>
                  </View>
                </View>

                {categoryItems.map(item => (
                  <View
                    key={item.id}
                    style={[
                      styles.testItem,
                      { borderColor: colors.border },
                      item.tested && (item.passed ? styles.testItemPassed : styles.testItemFailed),
                    ]}
                  >
                    <View style={styles.testContent}>
                      <Text style={[styles.testTitle, { color: colors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.testDescription, { color: colors.textSecondary }]}>
                        {item.description}
                      </Text>
                    </View>

                    <View style={styles.testActions}>
                      <Pressable
                        style={[
                          styles.testButton,
                          styles.passButton,
                          item.tested && item.passed && styles.testButtonActive,
                        ]}
                        onPress={() => toggleTest(item.id, true)}
                      >
                        <IconSymbol
                          name="checkmark.circle.fill"
                          size={24}
                          color={item.tested && item.passed ? colors.success : colors.textSecondary}
                        />
                      </Pressable>
                      <Pressable
                        style={[
                          styles.testButton,
                          styles.failButton,
                          item.tested && !item.passed && styles.testButtonActive,
                        ]}
                        onPress={() => toggleTest(item.id, false)}
                      >
                        <IconSymbol
                          name="xmark.circle.fill"
                          size={24}
                          color={item.tested && !item.passed ? colors.error : colors.textSecondary}
                        />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}

          <View style={[styles.infoBox, { backgroundColor: colors.accent + '20', borderColor: colors.accent }]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              Utilisez cette liste pour vérifier systématiquement toutes les fonctionnalités de l'application.
              Appuyez sur ✓ si le test passe, sur ✗ si le test échoue.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  categorySection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  testItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  testItemPassed: {
    backgroundColor: '#22c55e20',
    borderColor: '#22c55e',
  },
  testItemFailed: {
    backgroundColor: '#ef444420',
    borderColor: '#ef4444',
  },
  testContent: {
    flex: 1,
    marginRight: 12,
  },
  testTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  testActions: {
    flexDirection: 'row',
    gap: 8,
  },
  testButton: {
    padding: 4,
  },
  passButton: {},
  failButton: {},
  testButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
  },
});
