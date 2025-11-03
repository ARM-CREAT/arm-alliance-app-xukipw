
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'card' | 'bank' | 'mobile';
}

const paymentMethods: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', icon: 'creditcard.fill', type: 'card' },
  { id: 'mastercard', name: 'Mastercard', icon: 'creditcard.fill', type: 'card' },
  { id: 'bank', name: 'Virement Bancaire', icon: 'building.columns.fill', type: 'bank' },
  { id: 'mobile', name: 'Mobile Money', icon: 'phone.fill', type: 'mobile' },
];

export default function DonationsScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const predefinedAmounts = [5, 10, 20, 50, 100, 200];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (text: string) => {
    setCustomAmount(text);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount);
    return 0;
  };

  const handlePayment = () => {
    const amount = getFinalAmount();
    
    if (amount <= 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner ou saisir un montant');
      return;
    }

    if (!selectedPayment) {
      Alert.alert('Erreur', 'Veuillez sélectionner un mode de paiement');
      return;
    }

    if (selectedPayment === 'visa' || selectedPayment === 'mastercard') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        Alert.alert('Erreur', 'Veuillez remplir toutes les informations de la carte');
        return;
      }
    }

    if (selectedPayment === 'mobile' && !phoneNumber) {
      Alert.alert('Erreur', 'Veuillez saisir votre numéro de téléphone');
      return;
    }

    Alert.alert(
      'Don confirmé',
      `Merci pour votre généreux don de ${amount}€!\n\nVotre contribution aide A.R.M à construire un Mali meilleur.\n\nUn reçu vous sera envoyé par email.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Faire un don',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: 'modal',
        }}
      />
      <SafeAreaView style={commonStyles.container} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="heart.fill" size={48} color={colors.error} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Soutenez A.R.M
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Votre contribution nous aide à construire un Mali meilleur
            </Text>
          </View>

          {/* Amount Selection */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Choisissez un montant
            </Text>
            <View style={styles.amountGrid}>
              {predefinedAmounts.map((amount) => (
                <Pressable
                  key={amount}
                  style={[
                    styles.amountButton,
                    selectedAmount === amount && styles.amountButtonSelected,
                  ]}
                  onPress={() => handleAmountSelect(amount)}
                >
                  <Text
                    style={[
                      styles.amountText,
                      selectedAmount === amount && styles.amountTextSelected,
                    ]}
                  >
                    {amount}€
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[commonStyles.label, { marginTop: 16 }]}>
              Ou saisissez un montant personnalisé
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Montant en euros"
              value={customAmount}
              onChangeText={handleCustomAmount}
              keyboardType="numeric"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Payment Method Selection */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Mode de paiement
            </Text>
            <View style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <Pressable
                  key={method.id}
                  style={[
                    styles.paymentCard,
                    selectedPayment === method.id && styles.paymentCardSelected,
                  ]}
                  onPress={() => setSelectedPayment(method.id)}
                >
                  <IconSymbol
                    name={method.icon}
                    size={32}
                    color={
                      selectedPayment === method.id ? colors.white : colors.primary
                    }
                  />
                  <Text
                    style={[
                      styles.paymentText,
                      selectedPayment === method.id && styles.paymentTextSelected,
                    ]}
                  >
                    {method.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Payment Details */}
          {(selectedPayment === 'visa' || selectedPayment === 'mastercard') && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Informations de la carte
              </Text>
              
              <Text style={commonStyles.label}>Nom sur la carte</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="John Doe"
                value={cardName}
                onChangeText={setCardName}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Numéro de carte</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
                placeholderTextColor={colors.textSecondary}
              />

              <View style={styles.cardDetailsRow}>
                <View style={styles.cardDetailsColumn}>
                  <Text style={commonStyles.label}>Date d&apos;expiration</Text>
                  <TextInput
                    style={commonStyles.input}
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    keyboardType="numeric"
                    maxLength={5}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
                <View style={styles.cardDetailsColumn}>
                  <Text style={commonStyles.label}>CVV</Text>
                  <TextInput
                    style={commonStyles.input}
                    placeholder="123"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>
            </View>
          )}

          {selectedPayment === 'bank' && (
            <View style={commonStyles.section}>
              <View style={styles.bankInfoCard}>
                <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                  Informations bancaires
                </Text>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankInfoLabel}>Banque:</Text>
                  <Text style={styles.bankInfoValue}>BMS (Banque Malienne de Solidarité)</Text>
                </View>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankInfoLabel}>Titulaire:</Text>
                  <Text style={styles.bankInfoValue}>A.R.M Alliance pour le Rassemblement Malien</Text>
                </View>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankInfoLabel}>Type:</Text>
                  <Text style={styles.bankInfoValue}>Compte Épargne</Text>
                </View>
                <Text style={[commonStyles.textSecondary, { marginTop: 12 }]}>
                  Veuillez effectuer le virement et nous envoyer la preuve de paiement par email.
                </Text>
              </View>
            </View>
          )}

          {selectedPayment === 'mobile' && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Mobile Money
              </Text>
              <Text style={commonStyles.label}>Numéro de téléphone</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="+223 XX XX XX XX"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor={colors.textSecondary}
              />
              <Text style={commonStyles.textSecondary}>
                Vous recevrez une notification sur votre téléphone pour confirmer le paiement.
              </Text>
            </View>
          )}

          {/* Security Notice */}
          <View style={[commonStyles.section, styles.securityNotice]}>
            <IconSymbol name="lock.shield.fill" size={24} color={colors.success} />
            <Text style={styles.securityText}>
              Paiement 100% sécurisé. Vos informations sont cryptées et protégées.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Pressable style={buttonStyles.primary} onPress={handlePayment}>
              <Text style={buttonStyles.text}>
                Confirmer le don de {getFinalAmount()}€
              </Text>
            </Pressable>

            <Pressable
              style={[buttonStyles.outline, { marginTop: 12 }]}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.textOutline}>Annuler</Text>
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
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  amountButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  amountButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  amountTextSelected: {
    color: colors.white,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  paymentCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  paymentCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  paymentTextSelected: {
    color: colors.white,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardDetailsColumn: {
    flex: 1,
  },
  bankInfoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bankInfoRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bankInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    width: 100,
  },
  bankInfoValue: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.success,
  },
  securityText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
});
