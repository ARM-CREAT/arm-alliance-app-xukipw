
import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, Image, RefreshControl, Platform } from "react-native";
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

const newsItems = [
  {
    id: '1',
    title: 'Lancement officiel de A.R.M',
    date: '1 Mars 2025',
    category: 'Annonce',
    excerpt: 'Le parti A.R.M a été officiellement lancé lors d\'une cérémonie à Bamako, marquant le début d\'une nouvelle ère politique au Mali.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800',
  },
  {
    id: '2',
    title: 'Rencontre avec les jeunes de Koutiala',
    date: '28 Février 2025',
    category: 'Événement',
    excerpt: 'Notre vice-président Oumar Keita a rencontré les jeunes de Koutiala pour discuter de l\'avenir de l\'éducation et de l\'emploi.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
  },
  {
    id: '3',
    title: 'Programme de développement économique',
    date: '25 Février 2025',
    category: 'Programme',
    excerpt: 'A.R.M présente son programme ambitieux pour le développement économique du Mali, axé sur l\'agriculture et l\'entrepreneuriat.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  },
  {
    id: '4',
    title: 'Initiative pour l\'éducation des filles',
    date: '20 Février 2025',
    category: 'Programme',
    excerpt: 'Lancement d\'un programme spécial pour encourager la scolarisation des filles dans les zones rurales.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  },
  {
    id: '5',
    title: 'Tournée nationale du président',
    date: '15 Février 2025',
    category: 'Événement',
    excerpt: 'Le président Lassine Diakité entame une tournée nationale pour rencontrer les membres du parti dans toutes les régions.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
  },
];

const categories = ['Tous', 'Annonce', 'Événement', 'Programme'];

export default function NewsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
      showToast({
        message: 'Actualités mises à jour',
        type: 'success',
        duration: 2000,
      });
    }, 1500);
  }, []);

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Annonce':
        return colors.highlight;
      case 'Événement':
        return colors.accent;
      case 'Programme':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const handleNewsPress = (item: typeof newsItems[0]) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    showToast({
      message: 'Article ouvert',
      type: 'info',
      duration: 1500,
    });
  };

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
            <IconSymbol name="newspaper" size={48} color={colors.highlight} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Actualités
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Restez informé de nos dernières nouvelles
            </Text>
          </View>

          <View style={commonStyles.section}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher une actualité..."
            />

            <View style={styles.filterContainer}>
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  selected={selectedCategory === category}
                  onPress={() => {
                    setSelectedCategory(category);
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                />
              ))}
            </View>

            {isLoading ? (
              <SkeletonLoader type="card" count={3} />
            ) : filteredNews.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="doc.text.magnifyingglass" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucune actualité trouvée</Text>
                <Text style={styles.emptySubtext}>
                  Essayez de modifier vos critères de recherche
                </Text>
              </View>
            ) : (
              filteredNews.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100).springify()}
                >
                  <Pressable
                    style={styles.newsCard}
                    onPress={() => handleNewsPress(item)}
                  >
                    <Image 
                      source={{ uri: item.image }}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                    <View style={styles.newsContent}>
                      <View style={styles.newsHeader}>
                        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                          <Text style={styles.categoryText}>{item.category}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                          <IconSymbol name="calendar" size={14} color={colors.textSecondary} />
                          <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.newsTitle}>{item.title}</Text>
                      <Text style={styles.newsExcerpt}>{item.excerpt}</Text>

                      <View style={styles.readMoreButton}>
                        <Text style={styles.readMoreText}>Lire la suite</Text>
                        <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                      </View>
                    </View>
                  </Pressable>
                </Animated.View>
              ))
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
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 26,
  },
  newsExcerpt: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  readMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 6,
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
