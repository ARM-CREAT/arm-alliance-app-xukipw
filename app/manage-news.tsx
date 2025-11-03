
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
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useContent, NewsItem } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ManageNewsScreen() {
  const { isAdmin } = useAuth();
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Politique');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin-login');
    }
  }, [isAdmin]);

  const categories = ['Politique', 'Économie', 'Social', 'Culture', 'Autre'];

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('Politique');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      if (editingId) {
        await updateNews(editingId, { title, content, category });
        Alert.alert('Succès', 'Actualité mise à jour!');
      } else {
        await addNews({
          title,
          content,
          category,
          date: new Date().toISOString().split('T')[0],
        });
        Alert.alert('Succès', 'Actualité ajoutée!');
      }
      resetForm();
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
      console.log('Error:', error);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cette actualité?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteNews(id);
            Alert.alert('Succès', 'Actualité supprimée!');
          },
        },
      ]
    );
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Gérer les Actualités',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Add Button */}
          {!showForm && (
            <View style={commonStyles.section}>
              <Pressable
                style={buttonStyles.primary}
                onPress={() => setShowForm(true)}
              >
                <IconSymbol name="plus.circle.fill" size={20} color={colors.white} />
                <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                  Nouvelle Actualité
                </Text>
              </Pressable>
            </View>
          )}

          {/* Form */}
          {showForm && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                {editingId ? 'Modifier l\'Actualité' : 'Nouvelle Actualité'}
              </Text>
              <View style={commonStyles.cardWhite}>
                <Text style={commonStyles.label}>Titre</Text>
                <TextInput
                  style={commonStyles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Titre de l'actualité"
                />

                <Text style={commonStyles.label}>Catégorie</Text>
                <View style={styles.categoryContainer}>
                  {categories.map((cat) => (
                    <Pressable
                      key={cat}
                      style={[
                        styles.categoryButton,
                        category === cat && styles.categoryButtonActive,
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.categoryButtonText,
                          category === cat && styles.categoryButtonTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={commonStyles.label}>Contenu</Text>
                <TextInput
                  style={commonStyles.inputMultiline}
                  value={content}
                  onChangeText={setContent}
                  placeholder="Contenu de l'actualité"
                  multiline
                  numberOfLines={6}
                />

                <View style={styles.buttonRow}>
                  <Pressable
                    style={[buttonStyles.outline, { flex: 1 }]}
                    onPress={resetForm}
                  >
                    <Text style={buttonStyles.textOutline}>Annuler</Text>
                  </Pressable>
                  <Pressable
                    style={[buttonStyles.primary, { flex: 1 }]}
                    onPress={handleSubmit}
                  >
                    <Text style={buttonStyles.text}>
                      {editingId ? 'Mettre à jour' : 'Ajouter'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          {/* News List */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Actualités ({news.length})
            </Text>
            {news.map((item) => (
              <View key={item.id} style={styles.newsCard}>
                <View style={styles.newsHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsContent} numberOfLines={2}>
                  {item.content}
                </Text>
                <View style={styles.newsActions}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => handleEdit(item)}
                  >
                    <IconSymbol name="pencil" size={20} color={colors.accent} />
                    <Text style={[styles.actionButtonText, { color: colors.accent }]}>
                      Modifier
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <IconSymbol name="trash" size={20} color={colors.error} />
                    <Text style={[styles.actionButtonText, { color: colors.error }]}>
                      Supprimer
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
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
    paddingBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: colors.white,
  },
  newsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  newsActions: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
