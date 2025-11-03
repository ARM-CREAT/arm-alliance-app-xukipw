
import React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

const events = [
  {
    id: '1',
    title: 'Assemblée Générale',
    date: '15 Mars 2025',
    time: '14:00',
    location: 'Siège du parti, Bamako',
    description: 'Réunion générale de tous les membres pour discuter des orientations stratégiques du parti.',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Campagne de sensibilisation',
    date: '22 Mars 2025',
    time: '09:00',
    location: 'Koutiala',
    description: 'Campagne de sensibilisation sur nos programmes dans la région de Koutiala.',
    type: 'campaign',
  },
  {
    id: '3',
    title: 'Forum sur l\'éducation',
    date: '5 Avril 2025',
    time: '10:00',
    location: 'Centre culturel, Bamako',
    description: 'Discussion sur l\'amélioration du système éducatif malien.',
    type: 'forum',
  },
];

export default function EventsScreen() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'person.3.fill';
      case 'campaign':
        return 'megaphone.fill';
      case 'forum':
        return 'bubble.left.and.bubble.right.fill';
      default:
        return 'calendar';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Événements",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: "modal",
        }}
      />
      <SafeAreaView style={commonStyles.container} edges={['bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="calendar" size={48} color={colors.accent} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Nos Événements
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Participez à nos activités et événements
            </Text>
          </View>

          <View style={commonStyles.section}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={[styles.eventIcon, { backgroundColor: colors.accent }]}>
                    <IconSymbol name={getEventIcon(event.type)} size={24} color={colors.white} />
                  </View>
                  <View style={styles.eventHeaderText}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <IconSymbol name="calendar" size={14} color={colors.textSecondary} />
                      <Text style={styles.eventMetaText}>{event.date}</Text>
                      <IconSymbol name="clock" size={14} color={colors.textSecondary} style={{ marginLeft: 12 }} />
                      <Text style={styles.eventMetaText}>{event.time}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.eventLocation}>
                  <IconSymbol name="location.fill" size={16} color={colors.primary} />
                  <Text style={styles.eventLocationText}>{event.location}</Text>
                </View>

                <Text style={styles.eventDescription}>{event.description}</Text>

                <Pressable style={styles.eventButton}>
                  <Text style={styles.eventButtonText}>S&apos;inscrire</Text>
                  <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable 
            style={[styles.backButton, { backgroundColor: colors.primary }]} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </Pressable>
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
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventHeaderText: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventMetaText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
  },
  eventLocationText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    fontWeight: '500',
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  eventButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 8,
  },
  backButton: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
