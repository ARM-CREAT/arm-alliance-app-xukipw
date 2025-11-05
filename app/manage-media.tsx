
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { useContent, MediaItem } from '@/contexts/ContentContext';
import { IconSymbol } from '@/components/IconSymbol';
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
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mediaItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mediaImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.card,
  },
  mediaInfo: {
    padding: 12,
  },
  mediaTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  mediaType: {
    fontSize: 12,
    color: colors.accent,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 12,
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

export default function ManageMediaScreen() {
  const { isAdmin } = useAuth();
  const { media, addMedia, deleteMedia } = useContent();
  const [formData, setFormData] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    url: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'image',
      url: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.url) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await addMedia(formData);
      Alert.alert('Succès', 'Média ajouté avec succès');
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le média');
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce média ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMedia(id);
              Alert.alert('Succès', 'Média supprimé');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer le média');
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
          title: 'Gérer les médias',
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
            <Text style={styles.headerTitle}>Gérer les médias</Text>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Ajouter un média</Text>

              <Text style={commonStyles.label}>Type *</Text>
              <View style={styles.typeSelector}>
                <Pressable
                  style={[
                    styles.typeButton,
                    formData.type === 'image' && styles.typeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'image' })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === 'image' && styles.typeButtonTextActive,
                    ]}
                  >
                    Image
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.typeButton,
                    formData.type === 'video' && styles.typeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'video' })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      formData.type === 'video' && styles.typeButtonTextActive,
                    ]}
                  >
                    Vidéo
                  </Text>
                </Pressable>
              </View>

              <Text style={commonStyles.label}>Titre *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Titre du média"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>URL *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="https://exemple.com/media.jpg"
                value={formData.url}
                onChangeText={(text) => setFormData({ ...formData, url: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Description</Text>
              <TextInput
                style={commonStyles.inputMultiline}
                placeholder="Description du média..."
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={3}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Date</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="AAAA-MM-JJ"
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Pressable style={buttonStyles.primary} onPress={handleSubmit}>
                <Text style={buttonStyles.text}>Ajouter</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Médias existants</Text>
            {media.length > 0 ? (
              <View style={styles.mediaGrid}>
                {media.map((item) => (
                  <View key={item.id} style={styles.mediaItem}>
                    {item.type === 'image' && (
                      <Image
                        source={{ uri: item.url }}
                        style={styles.mediaImage}
                        resizeMode="cover"
                      />
                    )}
                    {item.type === 'video' && (
                      <View style={[styles.mediaImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <IconSymbol name="play.circle.fill" size={48} color={colors.primary} />
                      </View>
                    )}
                    <View style={styles.mediaInfo}>
                      <Text style={styles.mediaTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.mediaType}>
                        {item.type === 'image' ? 'Image' : 'Vidéo'}
                      </Text>
                      <Pressable
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.id)}
                      >
                        <Text style={styles.deleteButtonText}>Supprimer</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="photo.fill" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun média</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
