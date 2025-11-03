
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
import { useContent, EventItem } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ManageEventsScreen() {
  const { isAdmin } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useContent();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('meeting');

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/admin-login');
    }
  }, [isAdmin]);

  const eventTypes = [
    { id: 'meeting', label: 'Réunion', icon: 'person.3.fill' },
    { id: 'campaign', label: 'Campagne', icon: 'megaphone.fill' },
    { id: 'conference', label: 'Conférence', icon: 'mic.fill' },
    { id: 'other', label: 'Autre', icon: 'calendar' },
  ];

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setType('meeting');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !date.trim() || !location.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      if (editingId) {
        await updateEvent(editingId, { title, description, date, location, type });
        Alert.alert('Succès', 'Événement mis à jour!');
      } else {
        await addEvent({ title, description, date, location, type });
        Alert.alert('Succès', 'Événement ajouté!');
      }
      resetForm();
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
      console.log('Error:', error);
    }
  };

  const handleEdit = (item: EventItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date);
    setLocation(item.location);
    setType(item.type);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cet événement?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(id);
            Alert.alert('Succès', 'Événement supprimé!');
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
          title: 'Gérer les Événements',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {!showForm && (
            <View style={commonStyles.section}>
              <Pressable
                style={buttonStyles.primary}
                onPress={() => setShowForm(true)}
              >
                <IconSymbol name="plus.circle.fill" size={20} color={colors.white} />
                <Text style={[buttonStyles.text, { marginLeft: 8 }]}>
                  Nouvel Événement
                </Text>
              </Pressable>
            </View>
          )}

          {showForm && (
            <View style={commonStyles.section}>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                {editingId ? 'Modifier l\'Événement' : 'Nouvel Événement'}
              </Text>
              <View style={commonStyles.cardWhite}>
                <Text style={commonStyles.label}>Titre</Text>
                <TextInput
                  style={commonStyles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Titre de l'événement"
                />

                <Text style={commonStyles.label}>Type</Text>
                <View style={styles.typeContainer}>
                  {eventTypes.map((eventType) => (
                    <Pressable
                      key={eventType.id}
                      style={[
                        styles.typeButton,
                        type === eventType.id && styles.typeButtonActive,
                      ]}
                      onPress={() => setType(eventType.id)}
                    >
                      <IconSymbol
                        name={eventType.icon as any}
                        size={20}
                        color={type === eventType.id ? colors.white : colors.text}
                      />
                      <Text
                        style={[
                          styles.typeButtonText,
                          type === eventType.id && styles.typeButtonTextActive,
                        ]}
                      >
                        {eventType.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={commonStyles.label}>Date (AAAA-MM-JJ)</Text>
                <TextInput
                  style={commonStyles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholder="2024-02-15"
                />

                <Text style={commonStyles.label}>Lieu</Text>
                <TextInput
                  style={commonStyles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Lieu de l'événement"
                />

                <Text style={commonStyles.label}>Description</Text>
                <TextInput
                  style={commonStyles.inputMultiline}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description de l'événement"
                  multiline
                  numberOfLines={4}
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

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              Événements ({events.length})
            </Text>
            {events.map((item) => (
              <View key={item.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={styles.eventIcon}>
                    <IconSymbol
                      name={eventTypes.find(t => t.id === item.type)?.icon as any || 'calendar'}
                      size={24}
                      color={colors.accent}
                    />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventLocation}>
                      <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
                      {' '}{item.location}
                    </Text>
                    <Text style={styles.eventDate}>{item.date}</Text>
                  </View>
                </View>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.eventActions}>
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  typeButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventActions: {
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
