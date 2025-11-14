
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
  useColorScheme,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightColors, darkColors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import QRCode from 'react-native-qrcode-svg';
import * as Haptics from 'expo-haptics';

export default function QRCodeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  
  const params = useLocalSearchParams();
  const qrType = (params.type as string) || 'app';
  const qrData = (params.data as string) || 'https://arm-mali.org';
  const qrTitle = (params.title as string) || 'A.R.M Alliance Mali';

  const [qrSize, setQrSize] = useState(250);

  const handleShare = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert(
      'Partager le QR Code',
      'Prenez une capture d\'écran pour partager ce QR code',
      [{ text: 'OK' }]
    );
  };

  const getQRContent = () => {
    switch (qrType) {
      case 'contact':
        return `BEGIN:VCARD
VERSION:3.0
FN:A.R.M Alliance Mali
ORG:Alliance pour le Rassemblement Malien
TEL:+223 76 30 48 69
TEL:+34 632 60 71 01
ADR:;;Rue 530, Porte 245;Sebenikoro;Bamako;;Mali
EMAIL:contact@arm-mali.org
END:VCARD`;
      case 'wifi':
        return `WIFI:T:WPA;S:ARM-Mali;P:password123;;`;
      case 'event':
        return qrData;
      case 'membership':
        return `https://arm-mali.org/membership?ref=${qrData}`;
      default:
        return qrData;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'QR Code',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: 'modal',
        }}
      />
      <SafeAreaView 
        style={[styles.container, { backgroundColor: colors.background }]} 
        edges={['bottom']}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
              <IconSymbol 
                ios_icon_name="qrcode" 
                android_material_icon_name="qr_code" 
                size={48} 
                color={colors.primary} 
              />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              {qrTitle}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Scannez ce code QR pour accéder rapidement
            </Text>
          </View>

          {/* QR Code Container - Fixed positioning to avoid conflicts */}
          <View style={styles.qrSection}>
            <View style={[
              styles.qrContainer, 
              { 
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
              }
            ]}>
              <QRCode
                value={getQRContent()}
                size={qrSize}
                color="#000000"
                backgroundColor="#FFFFFF"
                logo={require('@/assets/images/99df2f25-b6d7-4db9-a96a-9954201d795c.png')}
                logoSize={50}
                logoBackgroundColor="#FFFFFF"
                logoMargin={2}
                logoBorderRadius={25}
                quietZone={10}
                enableLinearGradient={false}
              />
            </View>
          </View>

          {/* Instructions */}
          <View style={commonStyles.section}>
            <View style={[styles.instructionsCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.instructionsTitle, { color: colors.text }]}>
                Comment utiliser ce QR Code
              </Text>
              <View style={styles.instructionItem}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
                  Ouvrez l&apos;application appareil photo de votre téléphone
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
                  Pointez vers le QR code ci-dessus
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
                  Appuyez sur la notification pour accéder au contenu
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={commonStyles.section}>
            <Pressable
              style={[buttonStyles.primary, { marginBottom: 12 }]}
              onPress={handleShare}
            >
              <IconSymbol 
                ios_icon_name="square.and.arrow.up" 
                android_material_icon_name="share" 
                size={20} 
                color={colors.white} 
              />
              <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                Partager le QR Code
              </Text>
            </Pressable>

            <Pressable
              style={buttonStyles.outline}
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.textOutline}>Retour</Text>
            </Pressable>
          </View>

          {/* Info Box */}
          <View style={commonStyles.section}>
            <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
              <IconSymbol 
                ios_icon_name="info.circle.fill" 
                android_material_icon_name="info" 
                size={24} 
                color={colors.accent} 
              />
              <View style={styles.infoContent}>
                <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                  Ce QR code contient des informations sur A.R.M Alliance Mali. 
                  Vous pouvez le partager avec d&apos;autres personnes pour leur 
                  permettre d&apos;accéder rapidement à notre contenu.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  qrSection: {
    paddingHorizontal: 20,
    marginVertical: 24,
    alignItems: 'center',
  },
  qrContainer: {
    padding: 20,
    borderRadius: 20,
  },
  instructionsCard: {
    borderRadius: 12,
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    paddingTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
