
import React, { useState } from 'react';
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
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useContent, MediaItem } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ManageMediaScreen() {
  const { isAdmin } = useAuth();
  const { media, addMedia, deleteMedia } = useContent();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin-login');
    }
  }, [isAdmin]);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setMediaType('image');
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      await addMedia({
        title,
        url,
        type: mediaType,
        date: new Date().toISOString().split('T')[0],
      });
      Alert.alert('Succès', 'Média ajouté!');
      resetForm();
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
      console.log('Error:', error);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer ce média?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteMedia(id);
            Alert.alert('Succès', 'Média supprimé!');
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
          title: 'Gérer les Médias',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Info Box */}
          <View style={styles.infoBox}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
            <Text style={styles.infoText}>
              Ajoutez des photos et vidéos en utilisant des URLs. Pour les images, vous pouvez utiliser des services comme Unsplash ou héberger vos propres images.
            </Text>
          </View>

          {!showForm && (
            <View style={commonStyles.section}>
              <Pressable
                style={buttonStyles.primary}
                onPress={() => setShowForm(true)}
              >
                <IconSymbol name="plus.circle.fill" size={20} color={colors.white} />
                <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                  Nouveau Média
                </Text>
              </Pressable>
            </View>
          )}

          {showForm && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                Nouveau Média
              </Text>
              <View style={commonStyles.cardWhite}>
                <Text style={commonStyles.label}>Type de Média</Text>
                <View style={styles.typeContainer}>
                  <Pressable
                    style={[
                      styles.typeButton,
                      mediaType === 'image' && styles.typeButtonActive,
                    ]}
                    onPress={() => setMediaType('image')}
                  >
                    <IconSymbol
                      name="photo.fill"
                      size={20}
                      color={mediaType === 'image' ? colors.white : colors.text}
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        mediaType === 'image' && styles.typeButtonTextActive,
                      ]}
                    >
                      Image
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.typeButton,
                      mediaType === 'video' && styles.typeButtonActive,
                    ]}
                    onPress={() => setMediaType('video')}
                  >
                    <IconSymbol
                      name="video.fill"
                      size={20}
                      color={mediaType === 'video' ? colors.white : colors.text}
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        mediaType === 'video' && styles.typeButtonTextActive,
                      ]}
                    >
                      Vidéo
                    </Text>
                  </Pressable>
                </View>

                <Text style={commonStyles.label}>Titre</Text>
                <TextInput
                  style={commonStyles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Titre du média"
                />

                <Text style={commonStyles.label}>URL du Média</Text>
                <TextInput
                  style={commonStyles.input}
                  value={url}
                  onChangeText={setUrl}
                  placeholder={mediaType === 'image' ? 'https://example.com/image.jpg' : 'https://youtube.com/watch?v=...'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {url && mediaType === 'image' && (
                  <View style={styles.previewContainer}>
                    <Text style={commonStyles.label}>Aperçu</Text>
                    <Image
                      source={{ uri: url }}
                      style={styles.previewImage}
                      resizeMode="cover"
                    />
                  </View>
                )}

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
                    <Text style={buttonStyles.text}>Ajouter</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Médias ({media.length})
            </Text>
            {media.length === 0 && (
              <View style={styles.emptyState}>
                <IconSymbol name="photo.stack" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun média pour le moment</Text>
              </View>
            )}
            {media.map((item) => (
              <View key={item.id} style={styles.mediaCard}>
                {item.type === 'image' ? (
                  <Image
                    source={{ uri: item.url }}
                    style={styles.mediaImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.videoPlaceholder}>
                    <IconSymbol name="play.circle.fill" size={48} color={colors.white} />
                  </View>
                )}
                <View style={styles.mediaInfo}>
                  <View style={styles.mediaHeader}>
                    <View style={[styles.typeBadge, { backgroundColor: item.type === 'image' ? colors.primary : colors.accent }]}>
                      <IconSymbol
                        name={item.type === 'image' ? 'photo.fill' : 'video.fill'}
                        size={14}
                        color={colors.white}
                      />
                      <Text style={styles.typeText}>
                        {item.type === 'image' ? 'Image' : 'Vidéo'}
                      </Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={styles.mediaTitle}>{item.title}</Text>
                  <Text style={styles.mediaUrl} numberOfLines={1}>{item.url}</Text>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <IconSymbol name="trash" size={18} color={colors.error} />
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  previewContainer: {
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
  mediaCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mediaImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.card,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaInfo: {
    padding: 16,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  mediaUrl: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
});
