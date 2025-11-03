
import React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

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
];

export default function NewsScreen() {
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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
            {newsItems.map((item) => (
              <View key={item.id} style={styles.newsCard}>
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

                  <Pressable style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Lire la suite</Text>
                    <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                  </Pressable>
                </View>
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
