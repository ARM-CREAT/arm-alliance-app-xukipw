
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable, Alert, Platform } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

export default function MembershipScreen() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    ville: '',
    telephone: '',
    email: '',
    profession: '',
    region: '',
  });

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.email) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    Alert.alert(
      "Demande d'adhésion",
      "Merci pour votre demande d'adhésion! Nous vous contacterons bientôt.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Adhésion au Parti",
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
            <IconSymbol name="person.badge.plus" size={48} color={colors.primary} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Rejoignez A.R.M
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Remplissez ce formulaire pour devenir membre de notre parti
            </Text>
          </View>

          <View style={commonStyles.section}>
            <Text style={commonStyles.label}>Nom *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre nom"
              value={formData.nom}
              onChangeText={(text) => setFormData({ ...formData, nom: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Prénom *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre prénom"
              value={formData.prenom}
              onChangeText={(text) => setFormData({ ...formData, prenom: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Date de naissance</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="JJ/MM/AAAA"
              value={formData.dateNaissance}
              onChangeText={(text) => setFormData({ ...formData, dateNaissance: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Adresse</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre adresse"
              value={formData.adresse}
              onChangeText={(text) => setFormData({ ...formData, adresse: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Ville</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre ville"
              value={formData.ville}
              onChangeText={(text) => setFormData({ ...formData, ville: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Région</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre région"
              value={formData.region}
              onChangeText={(text) => setFormData({ ...formData, region: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Téléphone *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="+223 XX XX XX XX"
              value={formData.telephone}
              onChangeText={(text) => setFormData({ ...formData, telephone: text })}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Email *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Profession</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre profession"
              value={formData.profession}
              onChangeText={(text) => setFormData({ ...formData, profession: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Pressable style={buttonStyles.primary} onPress={handleSubmit}>
              <Text style={buttonStyles.text}>Soumettre ma demande</Text>
            </Pressable>

            <Pressable 
              style={[buttonStyles.outline, { marginTop: 12 }]} 
              onPress={() => router.back()}
            >
              <Text style={buttonStyles.textOutline}>Annuler</Text>
            </Pressable>
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
});
