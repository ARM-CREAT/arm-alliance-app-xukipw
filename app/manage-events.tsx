
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
import { useContent, EventItem } from '@/contexts/ContentContext';
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
  eventItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  eventActions: {
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

export default function ManageEventsScreen() {
  const { isAdmin } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'meeting',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      type: 'meeting',
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        Alert.alert('Succès', 'Événement mis à jour avec succès');
      } else {
        await addEvent(formData);
        Alert.alert('Succès', 'Événement ajouté avec succès');
      }
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder l\'événement');
    }
  };

  const handleEdit = (item: EventItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      type: item.type,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cet événement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(id);
              Alert.alert('Succès', 'Événement supprimé');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer l\'événement');
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
          title: 'Gérer les événements',
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
            <Text style={styles.headerTitle}>Gérer les événements</Text>
          </View>

          <View style={commonStyles.section}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>
                {editingId ? 'Modifier l\'événement' : 'Ajouter un événement'}
              </Text>

              <Text style={commonStyles.label}>Titre *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Titre de l'événement"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Type *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="meeting, campaign, forum, conference"
                value={formData.type}
                onChangeText={(text) => setFormData({ ...formData, type: text })}
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

              <Text style={commonStyles.label}>Lieu *</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Lieu de l'événement"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={commonStyles.label}>Description *</Text>
              <TextInput
                style={commonStyles.inputMultiline}
                placeholder="Description de l'événement..."
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={4}
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

            <Text style={styles.sectionTitle}>Événements existants</Text>
            {events.length > 0 ? (
              events.map((item) => (
                <View key={item.id} style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventType}>{item.type}</Text>
                  <Text style={styles.eventDate}>{item.date} - {item.location}</Text>
                  <View style={styles.eventActions}>
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
                <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>Aucun événement</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
