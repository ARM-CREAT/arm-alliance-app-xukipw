
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, Platform, Pressable, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const members = [
  {
    id: '1',
    name: 'Lassine Diakité',
    roleKey: 'profile.role.president',
    profession: 'Entrepreneur',
    location: 'Avenida Castilla la Mancha 122, Yuncos, Toledo, Espagne',
    phone: '+34 632 60 71 01',
    phoneRaw: '0034632607101',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'president@arm-mali.org',
  },
  {
    id: '2',
    name: 'Dadou Sangare',
    roleKey: 'profile.role.vicepresident1',
    profession: '',
    location: 'Milan, Italie',
    phone: '',
    phoneRaw: '',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'dadou.sangare@arm-mali.org',
  },
  {
    id: '3',
    name: 'Oumar Keita',
    roleKey: 'profile.role.vicepresident2',
    profession: 'Enseignant',
    location: 'Koutiala, Mali',
    phone: '+223 76 30 48 69',
    phoneRaw: '0022376304869',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'oumar.keita@arm-mali.org',
  },
  {
    id: '4',
    name: 'Karifa Keita',
    roleKey: 'profile.role.secretary',
    profession: 'Fonctionnaire d\'État',
    location: 'Bamako, Mali',
    phone: '+223 79 81 93 12',
    phoneRaw: '0022379819312',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'karifa.keita@arm-mali.org',
  },
  {
    id: '5',
    name: 'Modibo Keita',
    roleKey: 'profile.role.admin',
    profession: 'Gestionnaire',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '+223 76 11 22 63',
    phoneRaw: '0022376112263',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'modibo.keita@arm-mali.org',
  },
  {
    id: '6',
    name: 'Sokona Keita',
    roleKey: 'profile.role.treasurer',
    profession: 'Sage-femme',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '+223 75 17 99 20',
    phoneRaw: '0022375179920',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'sokona.keita@arm-mali.org',
  },
  {
    id: '7',
    name: 'Daouda Sangare',
    roleKey: 'profile.role.member',
    profession: '',
    location: 'Italie',
    phone: '+39 350 939 3002',
    phoneRaw: '00393509393002',
    image: require('@/assets/images/bc64fc44-1359-4439-90e9-3cbc3e5e00de.jpeg'),
    email: 'daouda.sangare@arm-mali.org',
  },
];

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleCall = (phone: string, name: string) => {
    if (!phone) {
      Alert.alert(t('common.unavailable'), t('profile.error.noPhone'));
      return;
    }
    const phoneNumber = phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert(t('common.error'), t('profile.error.cannotCall'));
    });
  };

  const handleMessage = (phone: string, name: string) => {
    if (!phone) {
      Alert.alert(t('common.unavailable'), t('profile.error.noPhone'));
      return;
    }
    const phoneNumber = phone.replace(/\s/g, '');
    Linking.openURL(`sms:${phoneNumber}`).catch(() => {
      Alert.alert(t('common.error'), t('profile.error.cannotMessage'));
    });
  };

  const handleEmail = (email: string, name: string) => {
    Linking.openURL(`mailto:${email}?subject=Contact depuis l'application ARM`).catch(() => {
      Alert.alert(t('common.error'), t('profile.error.cannotEmail'));
    });
  };

  const toggleExpand = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

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
      <SafeAreaView style={commonStyles.container} edges={['top']}>
        <ScrollView 
          style={styles.scrollView}
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
                style={styles.languageButton}
                onPress={() => setShowLanguageSelector(true)}
              >
                <IconSymbol name="globe" size={20} color={colors.primary} />
                <Text style={styles.languageButtonText}>{t('language.title')}</Text>
              </Pressable>
            </View>
          )}

          <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
            <Text style={[commonStyles.title, { color: colors.primary }]}>
              {t('profile.header.title')}
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              {t('profile.header.subtitle')}
            </Text>
          </Animated.View>

          <View style={commonStyles.section}>
            {members.map((member, index) => (
              <Animated.View 
                key={member.id} 
                entering={FadeInDown.delay(index * 100).duration(500)}
              >
                <Pressable 
                  style={styles.memberCard}
                  onPress={() => toggleExpand(member.id)}
                >
                  <Image 
                    source={member.image}
                    style={styles.memberImage}
                    resizeMode="cover"
                  />
                  <View style={styles.memberInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <IconSymbol 
                        name={expandedMember === member.id ? "chevron.up" : "chevron.down"} 
                        size={20} 
                        color={colors.primary} 
                      />
                    </View>
                    <View style={[styles.roleBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.roleText}>{t(member.roleKey)}</Text>
                    </View>
                    
                    {member.profession ? (
                      <View style={styles.infoRow}>
                        <IconSymbol name="briefcase.fill" size={16} color={colors.textSecondary} />
                        <Text style={styles.infoText}>{member.profession}</Text>
                      </View>
                    ) : null}
                    
                    <View style={styles.infoRow}>
                      <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                      <Text style={styles.infoText}>{member.location}</Text>
                    </View>
                    
                    {member.phone ? (
                      <View style={styles.infoRow}>
                        <IconSymbol name="phone.fill" size={16} color={colors.primary} />
                        <Text style={[styles.infoText, { color: colors.primary, fontWeight: '600' }]}>
                          {member.phone}
                        </Text>
                      </View>
                    ) : null}

                    {expandedMember === member.id && (
                      <Animated.View entering={FadeInDown.duration(300)} style={styles.expandedContent}>
                        <View style={styles.divider} />
                        
                        {/* Contact Actions */}
                        <View style={styles.actionsContainer}>
                          <Text style={styles.actionsTitle}>{t('profile.actions.title')}</Text>
                          <View style={styles.actionButtons}>
                            {member.phone && (
                              <>
                                <Pressable 
                                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                                  onPress={() => handleCall(member.phone, member.name)}
                                >
                                  <IconSymbol name="phone.fill" size={20} color={colors.white} />
                                  <Text style={styles.actionButtonText}>{t('profile.action.call')}</Text>
                                </Pressable>
                                
                                <Pressable 
                                  style={[styles.actionButton, { backgroundColor: colors.accent }]}
                                  onPress={() => handleMessage(member.phone, member.name)}
                                >
                                  <IconSymbol name="message.fill" size={20} color={colors.white} />
                                  <Text style={styles.actionButtonText}>{t('profile.action.message')}</Text>
                                </Pressable>
                              </>
                            )}
                            
                            <Pressable 
                              style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                              onPress={() => handleEmail(member.email, member.name)}
                            >
                              <IconSymbol name="envelope.fill" size={20} color={colors.white} />
                              <Text style={styles.actionButtonText}>{t('profile.action.email')}</Text>
                            </Pressable>
                          </View>
                        </View>

                        {/* Additional Info */}
                        <View style={styles.additionalInfo}>
                          <View style={styles.infoRow}>
                            <IconSymbol name="envelope.fill" size={16} color={colors.textSecondary} />
                            <Text style={styles.infoText}>{member.email}</Text>
                          </View>
                        </View>
                      </Animated.View>
                    )}
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* Party Values */}
          <Animated.View 
            entering={FadeInDown.delay(700).duration(600)}
            style={[commonStyles.section, styles.valuesSection]}
          >
            <Text style={[commonStyles.subtitle, { color: colors.primary, textAlign: 'center' }]}>
              {t('profile.values.title')}
            </Text>
            <View style={styles.valuesContainer}>
              <View style={styles.valueCard}>
                <IconSymbol name="heart.fill" size={32} color={colors.primary} />
                <Text style={styles.valueTitle}>{t('profile.value.fraternity')}</Text>
                <Text style={styles.valueDescription}>
                  {t('profile.value.fraternity.desc')}
                </Text>
              </View>
              <View style={styles.valueCard}>
                <IconSymbol name="hand.raised.fill" size={32} color={colors.accent} />
                <Text style={styles.valueTitle}>{t('profile.value.liberty')}</Text>
                <Text style={styles.valueDescription}>
                  {t('profile.value.liberty.desc')}
                </Text>
              </View>
              <View style={styles.valueCard}>
                <IconSymbol name="equal.circle.fill" size={32} color={colors.secondary} />
                <Text style={styles.valueTitle}>{t('profile.value.equality')}</Text>
                <Text style={styles.valueDescription}>
                  {t('profile.value.equality.desc')}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Party Headquarters */}
          <Animated.View 
            entering={FadeInDown.delay(800).duration(600)}
            style={[commonStyles.section, styles.headquartersSection]}
          >
            <Text style={[commonStyles.subtitle, { color: colors.primary, textAlign: 'center', marginBottom: 16 }]}>
              {t('profile.headquarters.title')}
            </Text>
            <View style={styles.headquartersCard}>
              <IconSymbol name="building.2.fill" size={40} color={colors.primary} />
              <Text style={styles.headquartersAddress}>
                {t('profile.headquarters.address')}
              </Text>
            </View>
          </Animated.View>
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
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-end',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.card,
  },
  memberCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  memberImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.card,
  },
  memberInfo: {
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  roleBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  actionsContainer: {
    marginBottom: 16,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  additionalInfo: {
    gap: 8,
  },
  valuesSection: {
    backgroundColor: colors.card,
    paddingVertical: 32,
    marginTop: 16,
  },
  valuesContainer: {
    marginTop: 20,
    gap: 16,
  },
  valueCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  headquartersSection: {
    backgroundColor: colors.white,
    paddingVertical: 32,
    marginTop: 16,
  },
  headquartersCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  headquartersAddress: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
    fontWeight: '500',
  },
});
