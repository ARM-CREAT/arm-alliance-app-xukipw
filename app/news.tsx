
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Image, RefreshControl, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";
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
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.card,
  },
  newsContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 28,
  },
  newsDate: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  newsExcerpt: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 4,
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

export default function NewsScreen() {
  const { news, isLoading: contentLoading, refreshContent } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await refreshContent();
    showToast('Actualités actualisées', 'success');
    setRefreshing(false);
  }, [refreshContent, showToast]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'politique':
        return colors.primary;
      case 'économie':
        return colors.accent;
      case 'jeunesse':
        return colors.highlight;
      case 'social':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  const handleNewsPress = (item: typeof news[0]) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    showToast('Article ouvert', 'info');
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'Politique', label: 'Politique' },
    { id: 'Économie', label: 'Économie' },
    { id: 'Jeunesse', label: 'Jeunesse' },
    { id: 'Social', label: 'Social' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Actualités",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          presentation: "modal",
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Actualités</Text>
          <Text style={styles.headerSubtitle}>
            {filteredNews.length} article{filteredNews.length > 1 ? 's' : ''}
          </Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher une actualité..."
        />

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                label={category.label}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
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
            {contentLoading && news.length === 0 ? (
              <>
                <SkeletonLoader width="100%" height={300} style={{ marginBottom: 16 }} />
                <SkeletonLoader width="100%" height={300} style={{ marginBottom: 16 }} />
              </>
            ) : filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                >
                  <Pressable
                    style={styles.newsCard}
                    onPress={() => handleNewsPress(item)}
                  >
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.newsImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.newsContent}>
                      <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                      </View>
                      <Text style={styles.newsTitle}>{item.title}</Text>
                      <Text style={styles.newsDate}>
                        <IconSymbol name="calendar" size={13} color={colors.textSecondary} />
                        {' '}{item.date}
                      </Text>
                      <Text style={styles.newsExcerpt} numberOfLines={3}>
                        {item.content}
                      </Text>
                      <Pressable style={styles.readMoreButton}>
                        <Text style={styles.readMoreText}>Lire la suite</Text>
                        <IconSymbol name="chevron.right" size={14} color={colors.primary} />
                      </Pressable>
                    </View>
                  </Pressable>
                </Animated.View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="newspaper" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucune actualité trouvée</Text>
                <Text style={styles.emptySubtext}>
                  {searchQuery ? 'Essayez une autre recherche' : 'Aucune actualité disponible pour le moment'}
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
