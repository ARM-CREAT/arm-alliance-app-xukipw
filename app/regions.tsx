
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { maliRegions, Region } from '@/data/maliRegions';

export default function RegionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const filteredRegions = maliRegions.filter(
    (region) =>
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRegion = (regionId: string) => {
    setExpandedRegion(expandedRegion === regionId ? null : regionId);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Régions du Mali',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Toutes les Régions du Mali</Text>
          <Text style={styles.headerSubtitle}>
            {maliRegions.length} régions administratives
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une région..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {filteredRegions.map((region) => (
            <Pressable
              key={region.id}
              style={styles.regionCard}
              onPress={() => toggleRegion(region.id)}
            >
              <View style={styles.regionHeader}>
                <View style={styles.regionIcon}>
                  <IconSymbol name="map.fill" size={28} color={colors.primary} />
                </View>
                <View style={styles.regionInfo}>
                  <Text style={styles.regionName}>{region.name}</Text>
                  <Text style={styles.regionCapital}>
                    <IconSymbol name="building.2" size={14} color={colors.textSecondary} />
                    {' '}Chef-lieu: {region.capital}
                  </Text>
                  <Text style={styles.cercleCount}>
                    {region.cercles.length} cercle{region.cercles.length > 1 ? 's' : ''}
                  </Text>
                </View>
                <IconSymbol
                  name={expandedRegion === region.id ? 'chevron.up' : 'chevron.down'}
                  size={24}
                  color={colors.textSecondary}
                />
              </View>

              {expandedRegion === region.id && (
                <View style={styles.cerclesContainer}>
                  <Text style={styles.cerclesTitle}>Cercles:</Text>
                  <View style={styles.cerclesList}>
                    {region.cercles.map((cercle, index) => (
                      <View key={index} style={styles.cercleItem}>
                        <IconSymbol name="circle.fill" size={6} color={colors.primary} />
                        <Text style={styles.cercleName}>{cercle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </Pressable>
          ))}

          {filteredRegions.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="magnifyingglass" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>Aucune région trouvée</Text>
              <Text style={styles.emptySubtext}>
                Essayez une autre recherche
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  regionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  regionCapital: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  cercleCount: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  cerclesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cerclesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  cerclesList: {
    gap: 8,
  },
  cercleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cercleName: {
    fontSize: 14,
    color: colors.textSecondary,
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
