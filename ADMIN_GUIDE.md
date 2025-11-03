
# Guide de l'Administrateur - Application A.R.M

## 📱 Comment l'administrateur peut se connecter et modifier le contenu

### 1. 🔐 Connexion Administrateur

#### Accès à l'écran de connexion
L'administrateur peut accéder à l'écran de connexion de deux façons :

1. **Depuis la page d'accueil** : Cliquez sur le bouton "Admin" dans la section "Actions Rapides"
2. **URL directe** : Naviguez vers `/admin-login`

#### Identifiants de connexion
- **Mot de passe** : `ARM2024Admin!`
- Le mot de passe est stocké de manière sécurisée dans l'application
- Une fois connecté, la session reste active jusqu'à la déconnexion

#### Processus de connexion
1. Entrez le mot de passe dans le champ prévu
2. Cliquez sur "Se connecter"
3. Vous serez automatiquement redirigé vers le tableau de bord administrateur

---

### 2. 📊 Tableau de Bord Administrateur

Le tableau de bord est le centre de contrôle de l'application. Il affiche :

#### Statistiques en temps réel
- Nombre d'actualités publiées
- Nombre d'événements planifiés
- Nombre de médias (photos/vidéos)

#### Actions disponibles
- **Guide de l'Administrateur** : Documentation complète
- **Gérer les Actualités** : Ajouter, modifier, supprimer des actualités
- **Gérer les Événements** : Ajouter, modifier, supprimer des événements
- **Gérer les Médias** : Ajouter, supprimer des photos et vidéos
- **Vidéo Conférence** : Créer et gérer des conférences vidéo
- **Actualiser l'Application** : Rafraîchir le contenu
- **Se Déconnecter** : Fermer la session admin

---

### 3. 📰 Gestion des Actualités

#### Ajouter une actualité
1. Cliquez sur "Gérer les Actualités" dans le tableau de bord
2. Cliquez sur "Nouvelle Actualité"
3. Remplissez les champs :
   - **Titre** : Le titre de l'actualité
   - **Catégorie** : Politique, Économie, Social, Culture, ou Autre
   - **Contenu** : Le texte complet de l'actualité
4. Cliquez sur "Ajouter"

#### Modifier une actualité
1. Dans la liste des actualités, cliquez sur "Modifier" sur l'actualité souhaitée
2. Modifiez les champs nécessaires
3. Cliquez sur "Mettre à jour"

#### Supprimer une actualité
1. Cliquez sur "Supprimer" sur l'actualité à supprimer
2. Confirmez la suppression dans la boîte de dialogue

---

### 4. 📅 Gestion des Événements

#### Ajouter un événement
1. Cliquez sur "Gérer les Événements" dans le tableau de bord
2. Cliquez sur "Nouvel Événement"
3. Remplissez les champs :
   - **Titre** : Le nom de l'événement
   - **Type** : Réunion, Campagne, Conférence, ou Autre
   - **Date** : Format AAAA-MM-JJ (exemple : 2024-02-15)
   - **Lieu** : L'adresse ou le lieu de l'événement
   - **Description** : Les détails de l'événement
4. Cliquez sur "Ajouter"

#### Modifier un événement
1. Dans la liste des événements, cliquez sur "Modifier"
2. Modifiez les informations
3. Cliquez sur "Mettre à jour"

#### Supprimer un événement
1. Cliquez sur "Supprimer" sur l'événement
2. Confirmez la suppression

---

### 5. 🖼️ Gestion des Médias

#### Ajouter une photo ou vidéo
1. Cliquez sur "Gérer les Médias" dans le tableau de bord
2. Cliquez sur "Nouveau Média"
3. Sélectionnez le type : Image ou Vidéo
4. Remplissez les champs :
   - **Titre** : Le nom du média
   - **URL** : L'adresse web du média
5. Pour les images, un aperçu s'affichera automatiquement
6. Cliquez sur "Ajouter"

#### Sources d'images recommandées
- Unsplash : https://unsplash.com
- Vos propres serveurs d'hébergement
- Services de stockage cloud

#### Supprimer un média
1. Cliquez sur "Supprimer" sous le média
2. Confirmez la suppression

---

### 6. 🎥 Vidéo Conférence

#### Créer une conférence
1. Cliquez sur "Vidéo Conférence" dans le tableau de bord
2. Cliquez sur "Créer une Conférence"
3. Entrez un titre pour la conférence
4. Une clé unique sera générée automatiquement
5. Partagez cette clé avec les participants

#### Rejoindre une conférence
1. Entrez la clé de conférence dans le champ prévu
2. Cliquez sur "Rejoindre"

---

### 7. 🔒 Sécurité

#### Fonctionnalités de sécurité
- ✅ **Authentification requise** : Seul l'administrateur avec le mot de passe peut accéder
- ✅ **Session sécurisée** : Les identifiants sont stockés de manière sécurisée
- ✅ **Protection des routes** : Les pages admin redirigent vers la connexion si non authentifié
- ✅ **Sauvegarde automatique** : Toutes les modifications sont sauvegardées immédiatement

#### Bonnes pratiques
1. **Déconnectez-vous toujours** après avoir terminé
2. **Ne partagez pas le mot de passe** avec des personnes non autorisées
3. **Vérifiez vos modifications** avant de les publier
4. **Utilisez des titres clairs** pour faciliter la navigation

---

### 8. 💾 Stockage des Données

#### Comment les données sont stockées
- Les données sont stockées localement sur l'appareil avec **AsyncStorage**
- Les modifications sont sauvegardées automatiquement
- Les données persistent même après fermeture de l'application

#### Actualiser le contenu
- Utilisez le bouton "Actualiser l'Application" dans le tableau de bord
- Cela recharge toutes les données depuis le stockage

---

### 9. 🆘 Résolution des Problèmes

#### Problèmes courants

**Je ne peux pas me connecter**
- Vérifiez que vous utilisez le bon mot de passe : `ARM2024Admin!`
- Assurez-vous qu'il n'y a pas d'espaces avant ou après le mot de passe

**Mes modifications ne s'affichent pas**
- Cliquez sur "Actualiser l'Application" dans le tableau de bord
- Fermez et rouvrez l'application

**L'application est lente**
- Trop de médias peuvent ralentir l'application
- Supprimez les médias inutilisés

---

### 10. 📞 Support

Pour toute question ou problème technique, contactez :
- **Email** : support@arm-mali.org
- **Téléphone** : +223 76 30 48 69

---

## 🎯 Résumé Rapide

### Pour se connecter :
1. Page d'accueil → Bouton "Admin"
2. Entrer le mot de passe : `ARM2024Admin!`
3. Accéder au tableau de bord

### Pour modifier le contenu :
1. Tableau de bord → Choisir l'action (Actualités, Événements, Médias)
2. Cliquer sur "Nouveau" ou "Modifier"
3. Remplir les champs
4. Cliquer sur "Ajouter" ou "Mettre à jour"

### Pour se déconnecter :
1. Tableau de bord → Bouton de déconnexion (en haut à droite)
2. Ou utiliser le bouton "Se Déconnecter" en bas de page

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2025  
**Application** : A.R.M - Alliance pour le Rassemblement Malien
