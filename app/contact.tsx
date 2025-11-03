
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!formData.nom || !formData.email || !formData.message) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    Alert.alert(
      "Message envoyé",
      "Merci pour votre message! Nous vous répondrons dans les plus brefs délais.",
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
          title: "Contact",
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
            <IconSymbol name="envelope.fill" size={48} color={colors.secondary} />
            <Text style={[commonStyles.title, { color: colors.primary, marginTop: 16 }]}>
              Contactez-nous
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Nous sommes à votre écoute
            </Text>
          </View>

          {/* Contact Info Cards */}
          <View style={commonStyles.section}>
            <View style={styles.contactCard}>
              <View style={[styles.contactIcon, { backgroundColor: colors.primary }]}>
                <IconSymbol name="building.2" size={24} color={colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Siège</Text>
                <Text style={styles.contactText}>Rue 530, Porte 245</Text>
                <Text style={styles.contactText}>Sebenikoro, Bamako, Mali</Text>
              </View>
            </View>

            <View style={styles.contactCard}>
              <View style={[styles.contactIcon, { backgroundColor: colors.accent }]}>
                <IconSymbol name="phone.fill" size={24} color={colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Téléphone</Text>
                <Text style={styles.contactText}>+223 76 30 48 69</Text>
                <Text style={styles.contactText}>+34 632 60 71 01</Text>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 16 }]}>
              Envoyez-nous un message
            </Text>

            <Text style={commonStyles.label}>Nom *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Votre nom"
              value={formData.nom}
              onChangeText={(text) => setFormData({ ...formData, nom: text })}
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

            <Text style={commonStyles.label}>Téléphone</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="+223 XX XX XX XX"
              value={formData.telephone}
              onChangeText={(text) => setFormData({ ...formData, telephone: text })}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Sujet</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Sujet de votre message"
              value={formData.sujet}
              onChangeText={(text) => setFormData({ ...formData, sujet: text })}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={commonStyles.label}>Message *</Text>
            <TextInput
              style={commonStyles.inputMultiline}
              placeholder="Votre message..."
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              multiline
              numberOfLines={6}
              placeholderTextColor={colors.textSecondary}
            />

            <Pressable style={buttonStyles.primary} onPress={handleSubmit}>
              <Text style={buttonStyles.text}>Envoyer le message</Text>
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
  contactCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
