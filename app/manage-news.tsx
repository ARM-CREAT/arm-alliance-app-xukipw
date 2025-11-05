
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useContent, NewsItem } from '@/contexts/ContentContext';
import { Stack, router } from 'expo-router';

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
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  newsItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  newsCategory: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  newsActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.accent,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});

export default function ManageNewsScreen() {
  const { isAdmin } = useAuth();
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (editingId) {
        await updateNews(editingId, formData);
        Alert.alert('Succès', 'Actualité mise à jour avec succès');
      } else {
        await addNews(formData);
        Alert.alert('Succès', 'Actualité ajoutée avec succès');
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder l\'actualité');
    }
  };

  const handleEdit = (item: NewsItem) => {
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      date: item.date,
      image: item.image || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette actualité ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNews(id);
              Alert.alert('Succès', 'Actualité supprimée');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer l\'actualité');
            }
          },
        },
      ]
    );
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.emptyState}>
          <IconSymbol name="lock.fill" size={48} color={colors.textSecondary} />
          <Text style={styles.emptyText}>Accès non autorisé</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Gérer les actualités',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Gérer les actualités</Text>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>
                {editingId ? 'Modifier l\'actualité' : 'Ajouter une actualité'}
              </Text>

              <Text style={commonStyles.label}>Titre *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Titre de l'actualité"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Catégorie *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Ex: Politique, Économie, Jeunesse"
                value={formData.category}
                onChangeText={(text) => setFormData({ ...formData, category: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Date *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="AAAA-MM-JJ"
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>URL de l&apos;image</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="https://exemple.com/image.jpg"
                value={formData.image}
                onChangeText={(text) => setFormData({ ...formData, image: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Contenu *</Text>
              <TextInput
                style={commonStyles.inputMultiline}
                placeholder="Contenu de l'actualité..."
                value={formData.content}
                onChangeText={(text) => setFormData({ ...formData, content: text })}
                multiline
                numberOfLines={6}
                placeholderTextColor={colors.textSecondary}
              />

              <Pressable style={buttonStyles.primary} onPress={handleSubmit}>
                <Text style={buttonStyles.text}>
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </Text>
              </Pressable>

              {editingId && (
                <Pressable
                  style={[buttonStyles.outline, { marginTop: 8 }]}
                  onPress={resetForm}
                >
                  <Text style={buttonStyles.textOutline}>Annuler</Text>
                </Pressable>
              )}
            </View>

            <Text style={styles.sectionTitle}>Actualités existantes</Text>
            {news.length > 0 ? (
              news.map((item) => (
                <View key={item.id} style={styles.newsItem}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsCategory}>{item.category}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                  <View style={styles.newsActions}>
                    <Pressable
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => handleEdit(item)}
                    >
                      <Text style={styles.actionButtonText}>Modifier</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.actionButtonText}>Supprimer</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="newspaper" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucune actualité</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
