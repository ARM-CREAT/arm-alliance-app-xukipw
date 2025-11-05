
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";
import { ScrollView, StyleSheet, View, Text, Pressable, RefreshControl, Platform } from "react-native";
import React, { useState, useCallback } from "react";
import { IconSymbol } from "@/components/IconSymbol";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Toast } from "@/components/Toast";
import { useToast } from "@/hooks/useToast";
import { FilterChip } from "@/components/FilterChip";
import * as Haptics from "expo-haptics";
import { SearchBar } from "@/components/SearchBar";
import { useContent } from "@/contexts/ContentContext";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  eventInfo: {
    flex: 1,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventLocationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 4,
  },
});

export default function EventsScreen() {
  const { events, isLoading: contentLoading, refreshContent } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await refreshContent();
    showToast('Événements actualisés', 'success');
    setRefreshing(false);
  }, [refreshContent, showToast]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'person.3.fill';
      case 'campaign':
        return 'megaphone.fill';
      case 'forum':
        return 'bubble.left.and.bubble.right.fill';
      case 'conference':
        return 'video.fill';
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
      case 'conference':
        return 'Conférence';
      default:
        return 'Événement';
    }
  };

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    showToast(`Inscription à "${eventTitle}" confirmée !`, 'success');
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const eventTypes = [
    { id: 'all', label: 'Tous' },
    { id: 'meeting', label: 'Réunions' },
    { id: 'campaign', label: 'Campagnes' },
    { id: 'forum', label: 'Forums' },
    { id: 'conference', label: 'Conférences' },
  ];

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
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Événements</Text>
          <Text style={styles.headerSubtitle}>
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
          </Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un événement..."
        />

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {eventTypes.map((type) => (
              <FilterChip
                key={type.id}
                label={type.label}
                selected={selectedFilter === type.id}
                onPress={() => setSelectedFilter(type.id)}
              />
            ))}
          </ScrollView>
        </View>

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
          <View style={commonStyles.section}>
            {contentLoading && events.length === 0 ? (
              <>
                <SkeletonLoader width="100%" height={150} style={{ marginBottom: 12 }} />
                <SkeletonLoader width="100%" height={150} style={{ marginBottom: 12 }} />
                <SkeletonLoader width="100%" height={150} />
              </>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <Animated.View
                  key={event.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                >
                  <View style={styles.eventCard}>
                    <View style={styles.eventHeader}>
                      <View style={[styles.eventIcon, { backgroundColor: colors.card }]}>
                        <IconSymbol name={getEventIcon(event.type)} size={24} color={colors.primary} />
                      </View>
                      <View style={styles.eventInfo}>
                        <Text style={styles.eventType}>{getTypeLabel(event.type)}</Text>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventDate}>
                          <IconSymbol name="calendar" size={14} color={colors.textSecondary} />
                          {' '}{event.date}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.eventDescription}>{event.description}</Text>

                    <View style={styles.eventLocation}>
                      <IconSymbol name="mappin.circle.fill" size={16} color={colors.accent} />
                      <Text style={styles.eventLocationText}>{event.location}</Text>
                    </View>

                    <Pressable
                      style={styles.registerButton}
                      onPress={() => handleRegister(event.id, event.title)}
                    >
                      <Text style={styles.registerButtonText}>S&apos;inscrire</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun événement trouvé</Text>
                <Text style={styles.emptySubtext}>
                  {searchQuery ? 'Essayez une autre recherche' : 'Aucun événement disponible pour le moment'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {toast.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onHide={hideToast}
          />
        )}
      </SafeAreaView>
    </>
  );
}
