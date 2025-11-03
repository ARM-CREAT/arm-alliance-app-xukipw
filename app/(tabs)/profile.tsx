
import React from "react";
import { ScrollView, StyleSheet, View, Text, Image, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

const members = [
  {
    id: '1',
    name: 'Lassine Diakité',
    role: 'Président',
    profession: 'Entrepreneur',
    location: 'Avenida Castilla la Mancha 122, Yuncos, Toledo, Espagne',
    phone: '+34 632 60 71 01',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '2',
    name: 'Dadou Sangare',
    role: 'Premier Vice-Président',
    profession: '',
    location: 'Milan, Italie',
    phone: '',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    id: '3',
    name: 'Oumar Keita',
    role: 'Deuxième Vice-Président',
    profession: 'Enseignant',
    location: 'Koutiala, Mali',
    phone: '+223 76 30 48 69',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  },
  {
    id: '4',
    name: 'Karifa Keita',
    role: 'Secrétaire Général',
    profession: 'Fonctionnaire d\'État',
    location: 'Bamako, Mali',
    phone: '',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '5',
    name: 'Modibo Keita',
    role: 'Secrétaire Administratif',
    profession: 'Gestionnaire',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
  },
  {
    id: '6',
    name: 'Sokona Keita',
    role: 'Trésorière',
    profession: 'Sage-femme',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '+223 75 17 99 20',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
];

export default function ProfileScreen() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Membres du Parti",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
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
          <View style={styles.header}>
            <Text style={[commonStyles.title, { color: colors.primary }]}>
              Direction du Parti
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Rencontrez les membres de notre équipe dirigeante
            </Text>
          </View>

          <View style={commonStyles.section}>
            {members.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <Image 
                  source={{ uri: member.image }}
                  style={styles.memberImage}
                  resizeMode="cover"
                />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.roleText}>{member.role}</Text>
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
                      <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
                      <Text style={styles.infoText}>{member.phone}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>

          {/* Party Values */}
          <View style={[commonStyles.section, styles.valuesSection]}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, textAlign: 'center' }]}>
              Nos Valeurs
            </Text>
            <View style={styles.valuesContainer}>
              <View style={styles.valueCard}>
                <IconSymbol name="heart.fill" size={32} color={colors.primary} />
                <Text style={styles.valueTitle}>Fraternité</Text>
                <Text style={styles.valueDescription}>
                  L&apos;unité et la solidarité entre tous les Maliens
                </Text>
              </View>
              <View style={styles.valueCard}>
                <IconSymbol name="hand.raised.fill" size={32} color={colors.accent} />
                <Text style={styles.valueTitle}>Liberté</Text>
                <Text style={styles.valueDescription}>
                  Le respect des droits et libertés fondamentales
                </Text>
              </View>
              <View style={styles.valueCard}>
                <IconSymbol name="equal.circle.fill" size={32} color={colors.secondary} />
                <Text style={styles.valueTitle}>Égalité</Text>
                <Text style={styles.valueDescription}>
                  La justice et l&apos;équité pour tous les citoyens
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
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
  memberName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
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
});
