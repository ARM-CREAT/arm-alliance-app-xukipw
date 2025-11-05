
import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, RefreshControl, Platform } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { SearchBar } from "@/components/SearchBar";
import { FilterChip } from "@/components/FilterChip";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Toast } from "@/components/Toast";
import { useToast } from "@/hooks/useToast";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const events = [
  {
    id: '1',
    title: 'Assemblée Générale',
    date: '15 Mars 2025',
    time: '14:00',
    location: 'Siège du parti, Bamako',
    description: 'Réunion générale de tous les membres pour discuter des orientations stratégiques du parti.',
    type: 'meeting',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Campagne de sensibilisation',
    date: '22 Mars 2025',
    time: '09:00',
    location: 'Koutiala',
    description: 'Campagne de sensibilisation sur nos programmes dans la région de Koutiala.',
    type: 'campaign',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Forum sur l\'éducation',
    date: '5 Avril 2025',
    time: '10:00',
    location: 'Centre culturel, Bamako',
    description: 'Discussion sur l\'amélioration du système éducatif malien.',
    type: 'forum',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Conférence de presse',
    date: '10 Avril 2025',
    time: '11:00',
    location: 'Hôtel de l\'Amitié, Bamako',
    description: 'Présentation des nouvelles initiatives du parti pour 2025.',
    type: 'meeting',
    status: 'upcoming',
  },
];

const eventTypes = ['Tous', 'Réunion', 'Campagne', 'Forum'];

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const { toast, showToast, hideToast } = useToast();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setTimeout(() => {
      setRefreshing(false);
      showToast({
        message: 'Événements mis à jour',
        type: 'success',
        duration: 2000,
      });
    }, 1500);
  }, []);

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'Réunion';
      case 'campaign':
        return 'Campagne';
      case 'forum':
        return 'Forum';
      default:
        return type;
    }
  };

  const filteredEvents = events.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Tous' || getTypeLabel(item.type) === selectedType;
    return matchesSearch && matchesType;
  });

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      showToast({
        message: 'Inscription annulée',
        type: 'info',
        duration: 2000,
      });
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
      showToast({
        message: `Inscrit à: ${eventTitle}`,
        type: 'success',
        duration: 2500,
      });
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
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onHide={hideToast}
          />
        )}
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
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
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher un événement..."
            />

            <View style={styles.filterContainer}>
              {eventTypes.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  selected={selectedType === type}
                  onPress={() => {
                    setSelectedType(type);
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                />
              ))}
            </View>

            {isLoading ? (
              <SkeletonLoader type="list" count={4} />
            ) : filteredEvents.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="calendar.badge.exclamationmark" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun événement trouvé</Text>
                <Text style={styles.emptySubtext}>
                  Essayez de modifier vos critères de recherche
                </Text>
              </View>
            ) : (
              filteredEvents.map((event, index) => {
                const isRegistered = registeredEvents.includes(event.id);
                return (
                  <Animated.View
                    key={event.id}
                    entering={FadeInDown.delay(index * 100).springify()}
                  >
                    <View style={styles.eventCard}>
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

                      <Pressable
                        style={[
                          styles.eventButton,
                          isRegistered && styles.eventButtonRegistered,
                        ]}
                        onPress={() => handleRegister(event.id, event.title)}
                      >
                        <IconSymbol
                          name={isRegistered ? "checkmark.circle.fill" : "person.badge.plus"}
                          size={20}
                          color={isRegistered ? colors.white : colors.primary}
                        />
                        <Text style={[
                          styles.eventButtonText,
                          isRegistered && styles.eventButtonTextRegistered,
                        ]}>
                          {isRegistered ? 'Inscrit' : 'S\'inscrire'}
                        </Text>
                      </Pressable>
                    </View>
                  </Animated.View>
                );
              })
            )}
          </View>

          <Pressable 
            style={[styles.backButton, { backgroundColor: colors.primary }]} 
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              router.back();
            }}
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  eventButtonRegistered: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  eventButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  eventButtonTextRegistered: {
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
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
