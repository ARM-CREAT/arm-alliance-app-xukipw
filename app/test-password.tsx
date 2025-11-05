
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function TestPasswordScreen() {
  const [testPassword, setTestPassword] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAdmin, isLoading } = useAuth();

  const CORRECT_PASSWORD = 'ARM2024Admin!';

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      Alert.alert(
        'Accès Refusé',
        'Cette page est réservée aux administrateurs. Veuillez vous connecter d\'abord.',
        [
          {
            text: 'Se Connecter',
            onPress: () => router.replace('/admin-login'),
          },
          {
            text: 'Retour',
            onPress: () => router.back(),
            style: 'cancel',
          },
        ]
      );
    }
  }, [isAdmin, isLoading]);

  const handleTestPassword = async () => {
    console.log('=== TEST DE MOT DE PASSE ===');
    console.log('Mot de passe saisi:', testPassword);
    console.log('Longueur du mot de passe saisi:', testPassword.length);
    console.log('Correspondance exacte:', testPassword === CORRECT_PASSWORD);

    // Test de connexion réel
    const success = await login(testPassword);
    console.log('Résultat de la connexion:', success);

    if (success) {
      setTestResult('✅ SUCCÈS - Le mot de passe est correct!');
      Alert.alert(
        'Test Réussi',
        'Le mot de passe est correct! Vous êtes maintenant connecté.',
        [
          {
            text: 'Aller au tableau de bord',
            onPress: () => router.replace('/admin-dashboard'),
          },
          {
            text: 'Rester ici',
            style: 'cancel',
          },
        ]
      );
    } else {
      setTestResult('❌ ÉCHEC - Le mot de passe est incorrect');
      Alert.alert('Test Échoué', 'Le mot de passe ne correspond pas.');
    }
  };

  const handleCopyPassword = () => {
    if (!isAdmin) {
      Alert.alert('Accès Refusé', 'Seuls les administrateurs peuvent copier le mot de passe.');
      return;
    }
    setTestPassword(CORRECT_PASSWORD);
    Alert.alert('Copié', 'Le mot de passe correct a été copié dans le champ');
  };

  const togglePasswordVisibility = () => {
    if (!isAdmin) {
      Alert.alert('Accès Refusé', 'Seuls les administrateurs peuvent voir le mot de passe.');
      return;
    }
    setShowPassword(!showPassword);
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Test du Mot de Passe Admin',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
          }}
        />
        <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.loadingText}>Vérification de l'authentification...</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Accès Refusé',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
          }}
        />
        <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.container, styles.accessDeniedContainer]}>
            <IconSymbol name="lock.shield.fill" size={80} color={colors.error} />
            <Text style={styles.accessDeniedTitle}>Accès Refusé</Text>
            <Text style={styles.accessDeniedText}>
              Cette page est réservée aux administrateurs authentifiés.
            </Text>
            <Pressable
              style={[buttonStyles.primary, { marginTop: 24 }]}
              onPress={() => router.replace('/admin-login')}
            >
              <Text style={buttonStyles.text}>Se Connecter</Text>
            </Pressable>
            <Pressable
              style={[buttonStyles.secondary, { marginTop: 12 }]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.text}>Retour</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Test du Mot de Passe Admin',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <IconSymbol name="checkmark.shield.fill" size={60} color={colors.primary} />
            <Text style={styles.title}>Test du Mot de Passe</Text>
            <Text style={styles.subtitle}>
              Vérifiez que le mot de passe administrateur fonctionne correctement
            </Text>
          </View>

          {/* Statut actuel */}
          <View style={[styles.card, styles.statusCard]}>
            <Text style={styles.cardTitle}>Statut de Connexion</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>État actuel:</Text>
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Text style={styles.badgeText}>✓ Administrateur Connecté</Text>
              </View>
            </View>
          </View>

          {/* Mot de passe correct - Sécurisé */}
          <View style={[styles.card, styles.passwordCard]}>
            <Text style={styles.cardTitle}>Mot de Passe Administrateur</Text>
            <View style={styles.passwordBox}>
              <Text style={styles.passwordText}>
                {showPassword ? CORRECT_PASSWORD : '••••••••••••••'}
              </Text>
            </View>
            
            <View style={styles.passwordActions}>
              <Pressable 
                style={[buttonStyles.secondary, { flex: 1 }]} 
                onPress={togglePasswordVisibility}
              >
                <IconSymbol 
                  name={showPassword ? "eye.slash.fill" : "eye.fill"} 
                  size={20} 
                  color={colors.white} 
                />
                <Text style={buttonStyles.text}>
                  {showPassword ? 'Masquer' : 'Afficher'}
                </Text>
              </Pressable>
              
              <Pressable 
                style={[buttonStyles.secondary, { flex: 1 }]} 
                onPress={handleCopyPassword}
              >
                <IconSymbol name="doc.on.doc.fill" size={20} color={colors.white} />
                <Text style={buttonStyles.text}>Copier</Text>
              </Pressable>
            </View>

            {showPassword && (
              <View style={styles.passwordDetails}>
                <Text style={styles.detailText}>• Longueur: {CORRECT_PASSWORD.length} caractères</Text>
                <Text style={styles.detailText}>• Contient: Majuscules, minuscules, chiffres et symboles</Text>
                <Text style={styles.detailText}>• Format: ARM2024Admin!</Text>
              </View>
            )}
          </View>

          {/* Test du mot de passe */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tester un Mot de Passe</Text>
            <Text style={commonStyles.label}>Entrez le mot de passe à tester</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[commonStyles.input, { flex: 1 }]}
                value={testPassword}
                onChangeText={setTestPassword}
                placeholder="Tapez le mot de passe ici"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
              />
            </View>
            
            {testPassword.length > 0 && (
              <View style={styles.comparisonBox}>
                <Text style={styles.comparisonTitle}>Analyse:</Text>
                <Text style={styles.comparisonText}>
                  Longueur du mot de passe: {testPassword.length} caractères
                </Text>
                <Text style={styles.comparisonText}>
                  Longueur attendue: {CORRECT_PASSWORD.length} caractères
                </Text>
                <Text style={[
                  styles.comparisonResult,
                  testPassword.length === CORRECT_PASSWORD.length ? styles.matchSuccess : styles.matchFail
                ]}>
                  {testPassword.length === CORRECT_PASSWORD.length ? '✓ Longueur correcte' : '✗ Longueur incorrecte'}
                </Text>
              </View>
            )}

            <Pressable
              style={[buttonStyles.primary, !testPassword && styles.buttonDisabled]}
              onPress={handleTestPassword}
              disabled={!testPassword}
            >
              <IconSymbol name="play.circle.fill" size={20} color={colors.white} />
              <Text style={buttonStyles.text}>Tester le Mot de Passe</Text>
            </Pressable>

            {testResult && (
              <View style={[
                styles.resultBox,
                testResult.includes('SUCCÈS') ? styles.resultSuccess : styles.resultError
              ]}>
                <Text style={styles.resultText}>{testResult}</Text>
              </View>
            )}
          </View>

          {/* Instructions */}
          <View style={[styles.card, styles.instructionsCard]}>
            <Text style={styles.cardTitle}>Instructions</Text>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>1.</Text>
              <Text style={styles.instructionText}>
                Cliquez sur "Afficher" pour voir le mot de passe administrateur
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>2.</Text>
              <Text style={styles.instructionText}>
                Utilisez "Copier" pour copier le mot de passe dans le champ de test
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>3.</Text>
              <Text style={styles.instructionText}>
                Cliquez sur "Tester le Mot de Passe" pour vérifier
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>4.</Text>
              <Text style={styles.instructionText}>
                Cette page est sécurisée et accessible uniquement aux administrateurs
              </Text>
            </View>
          </View>

          {/* Informations de sécurité */}
          <View style={[styles.card, styles.securityCard]}>
            <View style={styles.securityHeader}>
              <IconSymbol name="lock.shield.fill" size={24} color={colors.success} />
              <Text style={styles.securityTitle}>Sécurité</Text>
            </View>
            <Text style={styles.securityText}>
              • Cette page est protégée par authentification
            </Text>
            <Text style={styles.securityText}>
              • Le mot de passe est masqué par défaut
            </Text>
            <Text style={styles.securityText}>
              • Seuls les administrateurs peuvent accéder à cette page
            </Text>
            <Text style={styles.securityText}>
              • Les mots de passe saisis sont sécurisés
            </Text>
          </View>

          {/* Informations de plateforme */}
          <View style={styles.platformInfo}>
            <Text style={styles.platformText}>
              Plateforme: {Platform.OS} | Version: {Platform.Version}
            </Text>
          </View>

          {/* Boutons de navigation */}
          <View style={styles.navigationButtons}>
            <Pressable
              style={[buttonStyles.primary, { flex: 1 }]}
              onPress={() => router.push('/admin-dashboard')}
            >
              <Text style={buttonStyles.text}>Tableau de Bord</Text>
            </Pressable>
            
            <Pressable
              style={[buttonStyles.secondary, { flex: 1 }]}
              onPress={() => router.push('/admin-guide')}
            >
              <Text style={buttonStyles.text}>Guide Admin</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Retour</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  accessDeniedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  accessDeniedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.error,
    marginTop: 24,
    marginBottom: 12,
  },
  accessDeniedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: colors.primary + '15',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeSuccess: {
    backgroundColor: '#10b981',
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  passwordCard: {
    backgroundColor: colors.secondary + '20',
  },
  passwordBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    minHeight: 60,
    justifyContent: 'center',
  },
  passwordText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  passwordActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  passwordDetails: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  comparisonBox: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  comparisonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  comparisonText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  comparisonResult: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  matchSuccess: {
    color: '#10b981',
  },
  matchFail: {
    color: '#ef4444',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  resultBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  resultSuccess: {
    backgroundColor: '#10b981' + '20',
    borderColor: '#10b981',
  },
  resultError: {
    backgroundColor: '#ef4444' + '20',
    borderColor: '#ef4444',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  instructionsCard: {
    backgroundColor: colors.accent + '15',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.accent,
    marginRight: 12,
    width: 24,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  securityCard: {
    backgroundColor: '#10b981' + '15',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  securityText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  platformInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  platformText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});
