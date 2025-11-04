
import React, { useState } from 'react';
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
  const { login, isAdmin } = useAuth();

  const CORRECT_PASSWORD = 'ARM2024Admin!';

  const handleTestPassword = async () => {
    console.log('=== TEST DE MOT DE PASSE ===');
    console.log('Mot de passe saisi:', testPassword);
    console.log('Mot de passe correct:', CORRECT_PASSWORD);
    console.log('Longueur du mot de passe saisi:', testPassword.length);
    console.log('Longueur du mot de passe correct:', CORRECT_PASSWORD.length);
    console.log('Correspondance exacte:', testPassword === CORRECT_PASSWORD);
    
    // Test caractère par caractère
    console.log('Comparaison caractère par caractère:');
    for (let i = 0; i < Math.max(testPassword.length, CORRECT_PASSWORD.length); i++) {
      const char1 = testPassword[i] || '(vide)';
      const char2 = CORRECT_PASSWORD[i] || '(vide)';
      const match = char1 === char2 ? '✓' : '✗';
      console.log(`Position ${i}: "${char1}" vs "${char2}" ${match}`);
    }

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
    setTestPassword(CORRECT_PASSWORD);
    Alert.alert('Copié', 'Le mot de passe correct a été copié dans le champ');
  };

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
              <View style={[styles.badge, isAdmin ? styles.badgeSuccess : styles.badgeWarning]}>
                <Text style={styles.badgeText}>
                  {isAdmin ? '✓ Connecté' : '○ Non connecté'}
                </Text>
              </View>
            </View>
          </View>

          {/* Mot de passe correct */}
          <View style={[styles.card, styles.passwordCard]}>
            <Text style={styles.cardTitle}>Mot de Passe Correct</Text>
            <View style={styles.passwordBox}>
              <Text style={styles.passwordText}>{CORRECT_PASSWORD}</Text>
            </View>
            <View style={styles.passwordDetails}>
              <Text style={styles.detailText}>• Longueur: {CORRECT_PASSWORD.length} caractères</Text>
              <Text style={styles.detailText}>• Contient: Majuscules, minuscules, chiffres et symboles</Text>
              <Text style={styles.detailText}>• Format: ARM2024Admin!</Text>
            </View>
            <Pressable style={buttonStyles.secondary} onPress={handleCopyPassword}>
              <IconSymbol name="doc.on.doc.fill" size={20} color={colors.white} />
              <Text style={buttonStyles.text}>Copier dans le champ de test</Text>
            </Pressable>
          </View>

          {/* Test du mot de passe */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tester un Mot de Passe</Text>
            <Text style={commonStyles.label}>Entrez le mot de passe à tester</Text>
            <TextInput
              style={commonStyles.input}
              value={testPassword}
              onChangeText={setTestPassword}
              placeholder="Tapez le mot de passe ici"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            {testPassword.length > 0 && (
              <View style={styles.comparisonBox}>
                <Text style={styles.comparisonTitle}>Comparaison en temps réel:</Text>
                <Text style={styles.comparisonText}>
                  Saisi: "{testPassword}" ({testPassword.length} car.)
                </Text>
                <Text style={styles.comparisonText}>
                  Attendu: "{CORRECT_PASSWORD}" ({CORRECT_PASSWORD.length} car.)
                </Text>
                <Text style={[
                  styles.comparisonResult,
                  testPassword === CORRECT_PASSWORD ? styles.matchSuccess : styles.matchFail
                ]}>
                  {testPassword === CORRECT_PASSWORD ? '✓ Correspondance exacte' : '✗ Pas de correspondance'}
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
                Le mot de passe correct est affiché ci-dessus
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>2.</Text>
              <Text style={styles.instructionText}>
                Cliquez sur "Copier dans le champ de test" pour le copier automatiquement
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
                Si le test réussit, vous serez connecté en tant qu'administrateur
              </Text>
            </View>
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
              style={[buttonStyles.secondary, { flex: 1 }]}
              onPress={() => router.push('/admin-login')}
            >
              <Text style={buttonStyles.text}>Page de Connexion</Text>
            </Pressable>
            
            {isAdmin && (
              <Pressable
                style={[buttonStyles.primary, { flex: 1 }]}
                onPress={() => router.push('/admin-dashboard')}
              >
                <Text style={buttonStyles.text}>Tableau de Bord</Text>
              </Pressable>
            )}
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
  badgeWarning: {
    backgroundColor: '#f59e0b',
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
  },
  passwordText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  passwordDetails: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
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
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
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
