
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAdmin } = useAuth();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAdmin) {
      console.log('Already logged in, redirecting to dashboard');
      router.replace('/admin-dashboard');
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    console.log('Login attempt started');
    
    if (!password) {
      Alert.alert('Erreur', 'Veuillez entrer le mot de passe');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Calling login function...');
      const success = await login(password);
      console.log('Login result:', success);

      if (success) {
        console.log('Login successful, showing alert');
        Alert.alert('Succès', 'Connexion réussie!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigating to admin dashboard');
              router.replace('/admin-dashboard');
            },
          },
        ]);
      } else {
        console.log('Login failed - incorrect password');
        Alert.alert('Erreur', 'Mot de passe incorrect');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Connexion Administrateur',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <IconSymbol name="lock.shield.fill" size={80} color={colors.primary} />
            </View>

            <Text style={styles.title}>Espace Administrateur</Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour accéder au tableau de bord
            </Text>

            <View style={styles.form}>
              <Text style={commonStyles.label}>Mot de passe</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[commonStyles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez le mot de passe"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={handleLogin}
                  returnKeyType="done"
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <IconSymbol
                    name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                    size={24}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>

              <Pressable
                style={[buttonStyles.primary, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={buttonStyles.text}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>Retour à l&apos;accueil</Text>
              </Pressable>
            </View>

            <View style={styles.infoBox}>
              <IconSymbol name="info.circle.fill" size={20} color={colors.accent} />
              <Text style={styles.infoText}>
                Cet espace est réservé aux administrateurs du parti A.R.M
              </Text>
            </View>

            <View style={styles.hintBox}>
              <Text style={styles.hintText}>
                💡 Mot de passe par défaut: ARM2024Admin!
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  hintBox: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 13,
    color: colors.black,
    fontWeight: '600',
  },
});
