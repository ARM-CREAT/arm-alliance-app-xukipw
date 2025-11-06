
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, Platform, Pressable, Linking, Alert, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightColors, darkColors, commonStyles } from "@/styles/commonStyles";
import { Stack } from "expo-router";
import { useContent } from "@/contexts/ContentContext";
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { IconSymbol } from "@/components/IconSymbol";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { members } = useContent();
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const handleCall = (phone: string, name: string) => {
    if (!phone || phone === '......') {
      Alert.alert(
        t('profile.unavailable'),
        t('profile.phone.unavailable')
      );
      return;
    }
    
    Alert.alert(
      t('profile.call'),
      `${t('profile.call.confirm')} ${name}?`,
      [
        { text: t('profile.cancel'), style: 'cancel' },
        {
          text: t('profile.call'),
          onPress: () => {
            const phoneUrl = `tel:${phone}`;
            Linking.canOpenURL(phoneUrl)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(phoneUrl);
                } else {
                  Alert.alert(t('profile.error'), t('profile.call.error'));
                }
              })
              .catch((err) => {
                console.error('Error opening phone:', err);
                Alert.alert(t('profile.error'), t('profile.call.error'));
              });
          },
        },
      ]
    );
  };

  const handleMessage = (phone: string, name: string) => {
    if (!phone || phone === '......') {
      Alert.alert(
        t('profile.unavailable'),
        t('profile.phone.unavailable')
      );
      return;
    }

    const smsUrl = Platform.OS === 'ios' ? `sms:${phone}` : `sms:${phone}`;
    Linking.canOpenURL(smsUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(smsUrl);
        } else {
          Alert.alert(t('profile.error'), t('profile.message.error'));
        }
      })
      .catch((err) => {
        console.error('Error opening SMS:', err);
        Alert.alert(t('profile.error'), t('profile.message.error'));
      });
  };

  const handleEmail = (email: string, name: string) => {
    if (!email) {
      Alert.alert(
        t('profile.unavailable'),
        t('profile.email.unavailable')
      );
      return;
    }

    const emailUrl = `mailto:${email}`;
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(emailUrl);
        } else {
          Alert.alert(t('profile.error'), t('profile.email.error'));
        }
      })
      .catch((err) => {
        console.error('Error opening email:', err);
        Alert.alert(t('profile.error'), t('profile.email.error'));
      });
  };

  const toggleExpand = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  const sortedMembers = [...members].sort((a, b) => a.order - b.order);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: t('profile.title'),
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerRight: () => (
              <Pressable onPress={() => setShowLanguageSelector(true)} style={{ marginRight: 8 }}>
                <IconSymbol name="globe" size={24} color={colors.white} />
              </Pressable>
            ),
          }}
        />
      )}
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView 
          style={[styles.scrollView, { backgroundColor: colors.background }]}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Language Selector Button for Android */}
          {Platform.OS !== 'ios' && (
            <View style={styles.languageButtonContainer}>
              <Pressable 
                style={[styles.languageButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowLanguageSelector(true)}
              >
                <IconSymbol name="globe" size={20} color={colors.primary} />
                <Text style={[styles.languageButtonText, { color: colors.primary }]}>{t('language.title')}</Text>
              </Pressable>
            </View>
          )}

          {/* Header */}
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <Image
              source={require('@/assets/images/f6f1baa3-a779-4a50-9d6f-cd42e41f1832.jpeg')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={[styles.headerTitle, { color: colors.white }]}>{t('profile.title')}</Text>
            <Text style={[styles.headerSubtitle, { color: colors.white }]}>{t('profile.subtitle')}</Text>
          </View>

          {/* Members List */}
          <View style={[commonStyles.section, { marginTop: 24 }]}>
            {sortedMembers.map((member, index) => (
              <Animated.View
                key={member.id}
                entering={FadeInDown.delay(index * 100).springify()}
              >
                <Pressable
                  style={[styles.memberCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => toggleExpand(member.id)}
                >
                  <View style={styles.memberHeader}>
                    <Image
                      source={require('@/assets/images/f6f1baa3-a779-4a50-9d6f-cd42e41f1832.jpeg')}
                      style={styles.memberImage}
                      resizeMode="contain"
                    />
                    <View style={styles.memberInfo}>
                      <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                      <Text style={[styles.memberRole, { color: colors.primary }]}>{member.role}</Text>
                      <Text style={[styles.memberProfession, { color: colors.textSecondary }]}>{member.profession}</Text>
                    </View>
                    <IconSymbol
                      name={expandedMember === member.id ? "chevron.up" : "chevron.down"}
                      size={24}
                      color={colors.textSecondary}
                    />
                  </View>

                  {expandedMember === member.id && (
                    <Animated.View entering={FadeIn.duration(300)} style={styles.memberDetails}>
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                      
                      <View style={styles.detailRow}>
                        <IconSymbol name="mappin.circle.fill" size={20} color={colors.primary} />
                        <Text style={[styles.detailText, { color: colors.text }]}>{member.location}</Text>
                      </View>

                      {member.phone && member.phone !== '......' && (
                        <View style={styles.detailRow}>
                          <IconSymbol name="phone.fill" size={20} color={colors.primary} />
                          <Text style={[styles.detailText, { color: colors.text }]}>{member.phone}</Text>
                        </View>
                      )}

                      {member.email && (
                        <View style={styles.detailRow}>
                          <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
                          <Text style={[styles.detailText, { color: colors.text }]}>{member.email}</Text>
                        </View>
                      )}

                      <View style={styles.actionButtons}>
                        <Pressable
                          style={[styles.actionButton, { backgroundColor: colors.primary }]}
                          onPress={() => handleCall(member.phone, member.name)}
                        >
                          <IconSymbol name="phone.fill" size={18} color={colors.white} />
                          <Text style={[styles.actionButtonText, { color: colors.white }]}>{t('profile.call')}</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.actionButton, { backgroundColor: colors.accent }]}
                          onPress={() => handleMessage(member.phone, member.name)}
                        >
                          <IconSymbol name="message.fill" size={18} color={colors.white} />
                          <Text style={[styles.actionButtonText, { color: colors.white }]}>{t('profile.message')}</Text>
                        </Pressable>

                        {member.email && (
                          <Pressable
                            style={[styles.actionButton, { backgroundColor: colors.highlight }]}
                            onPress={() => handleEmail(member.email, member.name)}
                          >
                            <IconSymbol name="envelope.fill" size={18} color={colors.white} />
                            <Text style={[styles.actionButtonText, { color: colors.white }]}>{t('profile.email')}</Text>
                          </Pressable>
                        )}
                      </View>
                    </Animated.View>
                  )}
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <LanguageSelector 
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
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
  languageButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerLogo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  memberCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  memberProfession: {
    fontSize: 13,
  },
  memberDetails: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
