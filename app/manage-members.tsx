
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
import { useContent, MemberItem } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

const roleOptions = [
  { key: 'profile.role.president', label: 'Président' },
  { key: 'profile.role.vicepresident1', label: 'Premier Vice-Président' },
  { key: 'profile.role.vicepresident2', label: 'Deuxième Vice-Président' },
  { key: 'profile.role.secretary', label: 'Secrétaire Général' },
  { key: 'profile.role.admin', label: 'Secrétaire Administratif' },
  { key: 'profile.role.treasurer', label: 'Trésorier(ère)' },
  { key: 'profile.role.member', label: 'Membre' },
];

export default function ManageMembersScreen() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { members, addMember, updateMember, deleteMember } = useContent();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [roleKey, setRoleKey] = useState('profile.role.member');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [order, setOrder] = useState('');
  const [showRolePicker, setShowRolePicker] = useState(false);

  React.useEffect(() => {
    if (!authLoading && !isAdmin) {
      Alert.alert('Accès refusé', 'Vous devez être administrateur pour accéder à cette page.');
      router.back();
    }
  }, [isAdmin, authLoading]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRoleKey('profile.role.member');
    setProfession('');
    setLocation('');
    setPhone('');
    setPhoneRaw('');
    setEmail('');
    setImage('');
    setOrder('');
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est requis');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erreur', 'L\'email est requis');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Erreur', 'La localisation est requise');
      return;
    }

    const orderNum = order ? parseInt(order) : members.length + 1;

    const memberData = {
      name: name.trim(),
      roleKey,
      profession: profession.trim(),
      location: location.trim(),
      phone: phone.trim(),
      phoneRaw: phoneRaw.trim(),
      email: email.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
      order: orderNum,
    };

    try {
      if (editingId) {
        await updateMember(editingId, memberData);
        Alert.alert('Succès', 'Membre mis à jour avec succès');
      } else {
        await addMember(memberData);
        Alert.alert('Succès', 'Membre ajouté avec succès');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving member:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le membre');
    }
  };

  const handleEdit = (item: MemberItem) => {
    setEditingId(item.id);
    setName(item.name);
    setRoleKey(item.roleKey);
    setProfession(item.profession);
    setLocation(item.location);
    setPhone(item.phone);
    setPhoneRaw(item.phoneRaw);
    setEmail(item.email);
    setImage(item.image);
    setOrder(item.order.toString());
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce membre ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMember(id);
              Alert.alert('Succès', 'Membre supprimé avec succès');
              if (editingId === id) {
                resetForm();
              }
            } catch (error) {
              console.error('Error deleting member:', error);
              Alert.alert('Erreur', 'Impossible de supprimer le membre');
            }
          },
        },
      ]
    );
  };

  if (authLoading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Text style={commonStyles.text}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const selectedRole = roleOptions.find(r => r.key === roleKey);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Gérer les Membres',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.white} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={commonStyles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
              {editingId ? 'Modifier le Membre' : 'Ajouter un Membre'}
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom complet *</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex: Lassine Diakité"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Rôle *</Text>
                <Pressable
                  style={styles.pickerButton}
                  onPress={() => setShowRolePicker(!showRolePicker)}
                >
                  <Text style={styles.pickerButtonText}>
                    {selectedRole?.label || 'Sélectionner un rôle'}
                  </Text>
                  <IconSymbol 
                    name={showRolePicker ? "chevron.up" : "chevron.down"} 
                    size={20} 
                    color={colors.primary} 
                  />
                </Pressable>
                {showRolePicker && (
                  <View style={styles.pickerOptions}>
                    {roleOptions.map((option) => (
                      <Pressable
                        key={option.key}
                        style={[
                          styles.pickerOption,
                          roleKey === option.key && styles.pickerOptionSelected,
                        ]}
                        onPress={() => {
                          setRoleKey(option.key);
                          setShowRolePicker(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            roleKey === option.key && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Profession</Text>
                <TextInput
                  style={styles.input}
                  value={profession}
                  onChangeText={setProfession}
                  placeholder="Ex: Entrepreneur"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Localisation *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Ex: Bamako, Mali"
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={2}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Téléphone</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Ex: +223 76 30 48 69"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Téléphone (format brut)</Text>
                <TextInput
                  style={styles.input}
                  value={phoneRaw}
                  onChangeText={setPhoneRaw}
                  placeholder="Ex: 0022376304869"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Ex: nom@arm-mali.org"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>URL de l&apos;image</Text>
                <TextInput
                  style={styles.input}
                  value={image}
                  onChangeText={setImage}
                  placeholder="https://images.unsplash.com/..."
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                />
                {image ? (
                  <Image 
                    source={{ uri: image }} 
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ordre d&apos;affichage</Text>
                <TextInput
                  style={styles.input}
                  value={order}
                  onChangeText={setOrder}
                  placeholder="Ex: 1, 2, 3..."
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.buttonRow}>
                <Pressable
                  style={[buttonStyles.primary, styles.submitButton]}
                  onPress={handleSubmit}
                >
                  <IconSymbol 
                    name={editingId ? "checkmark.circle.fill" : "plus.circle.fill"} 
                    size={20} 
                    color={colors.white} 
                  />
                  <Text style={buttonStyles.primaryText}>
                    {editingId ? 'Mettre à jour' : 'Ajouter'}
                  </Text>
                </Pressable>

                {editingId && (
                  <Pressable
                    style={[buttonStyles.secondary, styles.cancelButton]}
                    onPress={resetForm}
                  >
                    <IconSymbol name="xmark.circle.fill" size={20} color={colors.white} />
                    <Text style={buttonStyles.secondaryText}>Annuler</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>

          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Membres Actuels ({members.length})
            </Text>

            {members.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <Image 
                  source={require('@/assets/images/031bc733-c270-4f68-a82f-7339c4bdef87.jpeg')}
                  style={styles.memberImage}
                  resizeMode="contain"
                />
                <View style={styles.memberInfo}>
                  <View style={styles.memberHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberRole}>
                        {roleOptions.find(r => r.key === member.roleKey)?.label}
                      </Text>
                      {member.profession ? (
                        <Text style={styles.memberDetail}>{member.profession}</Text>
                      ) : null}
                      <Text style={styles.memberDetail}>{member.location}</Text>
                      <Text style={styles.memberDetail}>Ordre: {member.order}</Text>
                    </View>
                  </View>
                  <View style={styles.memberActions}>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: colors.accent }]}
                      onPress={() => handleEdit(member)}
                    >
                      <IconSymbol name="pencil" size={18} color={colors.white} />
                      <Text style={styles.actionButtonText}>Modifier</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.actionButton, { backgroundColor: colors.error }]}
                      onPress={() => handleDelete(member.id)}
                    >
                      <IconSymbol name="trash" size={18} color={colors.white} />
                      <Text style={styles.actionButtonText}>Supprimer</Text>
                    </Pressable>
                  </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginTop: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  pickerOptions: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary + '20',
  },
  pickerOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  pickerOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: colors.card,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  submitButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  memberCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  memberImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: colors.card,
  },
  memberInfo: {
    gap: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  memberName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  memberDetail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});
