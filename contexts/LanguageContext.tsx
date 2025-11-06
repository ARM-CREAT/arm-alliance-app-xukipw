
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'fr' | 'es' | 'bm';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'arm_app_language';

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.profile': 'Membres',
    'nav.events': 'Événements',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'nav.chat': 'Chat',
    'nav.donations': 'Dons',
    'nav.media': 'Galerie',
    'nav.regions': 'Régions',
    'nav.dashboard': 'Tableau de bord',
    'nav.admin': 'Administration',
    
    // Home Screen
    'home.title': 'A.R.M',
    'home.subtitle': 'Alliance pour le Rassemblement Malien',
    'home.motto': 'Fraternité • Liberté • Égalité',
    'home.program.title': 'Notre Programme Politique',
    'home.program.intro': 'L\'Alliance pour le Rassemblement Malien (A.R.M) s\'engage à construire un Mali uni, prospère et démocratique. Notre vision repose sur les valeurs fondamentales de fraternité, liberté et égalité pour tous les Maliens.',
    'home.program.point1': 'Renforcement de la démocratie et de l\'État de droit',
    'home.program.point2': 'Développement économique et création d\'emplois',
    'home.program.point3': 'Éducation de qualité pour tous',
    'home.program.point4': 'Santé accessible et modernisée',
    'home.program.point5': 'Unité nationale et cohésion sociale',
    'home.donation.title': 'Soutenez Notre Mouvement',
    'home.donation.subtitle': 'Votre contribution nous aide à construire un Mali meilleur',
    'home.donation.button': 'Faire un don',
    'home.actions.title': 'Actions Rapides',
    'home.action.join': 'Adhérer',
    'home.action.join.desc': 'Rejoignez le parti',
    'home.action.events': 'Événements',
    'home.action.events.desc': 'Nos activités',
    'home.action.news': 'Actualités',
    'home.action.news.desc': 'Dernières nouvelles',
    'home.action.contact': 'Contact',
    'home.action.contact.desc': 'Nous contacter',
    'home.action.chat': 'Chat',
    'home.action.chat.desc': 'Discussion publique',
    'home.action.gallery': 'Galerie',
    'home.action.gallery.desc': 'Photos & Vidéos',
    'home.action.regions': 'Régions',
    'home.action.regions.desc': 'Régions du Mali',
    'home.action.dashboard': 'Tableau de bord',
    'home.action.dashboard.desc': 'Vue d\'ensemble',
    'home.action.video': 'Vidéoconférence',
    'home.action.video.desc': 'Réunions en ligne',
    'home.action.share': 'Partager',
    'home.action.share.desc': 'Partagez A.R.M',
    'home.action.install': 'Installer',
    'home.action.install.desc': 'Installer l\'app',
    'home.action.test': 'Test Admin',
    'home.action.test.desc': 'Tester le mot de passe',
    'home.action.admin': 'Admin',
    'home.action.admin.desc': 'Espace admin',
    'home.info.title': 'Informations',
    'home.info.headquarters': 'Siège',
    'home.info.headquarters.address': 'Rue 530, Porte 245, Sebenikoro, Bamako, Mali',
    'home.info.contact': 'Contact',
    
    // Profile Screen
    'profile.title': 'Membres du Parti',
    'profile.header.title': 'Direction du Parti',
    'profile.header.subtitle': 'Rencontrez les membres de notre équipe dirigeante',
    'profile.role.president': 'Président',
    'profile.role.vicepresident1': 'Premier Vice-Président',
    'profile.role.vicepresident2': 'Deuxième Vice-Président',
    'profile.role.secretary': 'Secrétaire Général',
    'profile.role.admin': 'Secrétaire Administratif',
    'profile.role.treasurer': 'Trésorière',
    'profile.role.member': 'Membre',
    'profile.actions.title': 'Actions rapides',
    'profile.action.call': 'Appeler',
    'profile.action.message': 'Message',
    'profile.action.email': 'Email',
    'profile.values.title': 'Nos Valeurs',
    'profile.value.fraternity': 'Fraternité',
    'profile.value.fraternity.desc': 'L\'unité et la solidarité entre tous les Maliens',
    'profile.value.liberty': 'Liberté',
    'profile.value.liberty.desc': 'Le respect des droits et libertés fondamentales',
    'profile.value.equality': 'Égalité',
    'profile.value.equality.desc': 'La justice et l\'équité pour tous les citoyens',
    'profile.headquarters.title': 'Siège du Parti',
    'profile.headquarters.address': 'Rue 530, Porte 245\nSebenikoro, Bamako\nMali',
    'profile.error.noPhone': 'Le numéro de téléphone n\'est pas disponible.',
    'profile.error.cannotCall': 'Impossible d\'ouvrir l\'application téléphone.',
    'profile.error.cannotMessage': 'Impossible d\'ouvrir l\'application messages.',
    'profile.error.cannotEmail': 'Impossible d\'ouvrir l\'application email.',
    
    // Contact Screen
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes à votre écoute',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.form.cancel': 'Annuler',
    'contact.form.required': 'Veuillez remplir tous les champs obligatoires',
    'contact.form.success': 'Merci pour votre message! Nous vous répondrons dans les plus brefs délais.',
    'contact.quickActions': 'Actions rapides',
    
    // Donations
    'donations.title': 'Faire un Don',
    'donations.subtitle': 'Soutenez notre mouvement pour un Mali meilleur',
    'donations.amount.title': 'Montant du don',
    'donations.amount.custom': 'Montant personnalisé',
    'donations.amount.custom.placeholder': 'Entrez le montant',
    'donations.payment.title': 'Méthode de paiement',
    'donations.payment.card': 'Carte bancaire',
    'donations.payment.bank': 'Virement bancaire',
    'donations.payment.mobile': 'Orange Money',
    'donations.button': 'Faire un don de',
    'donations.success': 'Merci pour votre don !',
    'donations.success.message': 'Votre contribution nous aide à construire un Mali meilleur.',
    
    // Events
    'events.title': 'Événements',
    'events.upcoming': 'Événements à venir',
    'events.past': 'Événements passés',
    'events.all': 'Tous',
    'events.search': 'Rechercher un événement...',
    'events.register': 'S\'inscrire',
    'events.registered': 'Inscription confirmée',
    'events.type.meeting': 'Réunion',
    'events.type.rally': 'Rassemblement',
    'events.type.conference': 'Conférence',
    'events.type.training': 'Formation',
    'events.type.other': 'Autre',
    
    // News
    'news.title': 'Actualités',
    'news.latest': 'Dernières nouvelles',
    'news.all': 'Toutes',
    'news.search': 'Rechercher une actualité...',
    'news.category.politics': 'Politique',
    'news.category.economy': 'Économie',
    'news.category.social': 'Social',
    'news.category.culture': 'Culture',
    'news.category.other': 'Autre',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.back': 'Retour',
    'common.close': 'Fermer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.refresh': 'Actualiser',
    'common.unavailable': 'Non disponible',
    
    // Language Selector
    'language.title': 'Langue',
    'language.french': 'Français',
    'language.spanish': 'Español',
    'language.bambara': 'Bamanankan',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.profile': 'Miembros',
    'nav.events': 'Eventos',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'nav.chat': 'Chat',
    'nav.donations': 'Donaciones',
    'nav.media': 'Galería',
    'nav.regions': 'Regiones',
    'nav.dashboard': 'Panel',
    'nav.admin': 'Administración',
    
    // Home Screen
    'home.title': 'A.R.M',
    'home.subtitle': 'Alianza para la Unidad Maliense',
    'home.motto': 'Fraternidad • Libertad • Igualdad',
    'home.program.title': 'Nuestro Programa Político',
    'home.program.intro': 'La Alianza para la Unidad Maliense (A.R.M) se compromete a construir un Malí unido, próspero y democrático. Nuestra visión se basa en los valores fundamentales de fraternidad, libertad e igualdad para todos los malienses.',
    'home.program.point1': 'Fortalecimiento de la democracia y el estado de derecho',
    'home.program.point2': 'Desarrollo económico y creación de empleo',
    'home.program.point3': 'Educación de calidad para todos',
    'home.program.point4': 'Atención médica accesible y modernizada',
    'home.program.point5': 'Unidad nacional y cohesión social',
    'home.donation.title': 'Apoya Nuestro Movimiento',
    'home.donation.subtitle': 'Tu contribución nos ayuda a construir un Malí mejor',
    'home.donation.button': 'Hacer una donación',
    'home.actions.title': 'Acciones Rápidas',
    'home.action.join': 'Unirse',
    'home.action.join.desc': 'Únete al partido',
    'home.action.events': 'Eventos',
    'home.action.events.desc': 'Nuestras actividades',
    'home.action.news': 'Noticias',
    'home.action.news.desc': 'Últimas noticias',
    'home.action.contact': 'Contacto',
    'home.action.contact.desc': 'Contáctanos',
    'home.action.chat': 'Chat',
    'home.action.chat.desc': 'Discusión pública',
    'home.action.gallery': 'Galería',
    'home.action.gallery.desc': 'Fotos y Videos',
    'home.action.regions': 'Regiones',
    'home.action.regions.desc': 'Regiones de Malí',
    'home.action.dashboard': 'Panel',
    'home.action.dashboard.desc': 'Vista general',
    'home.action.video': 'Videoconferencia',
    'home.action.video.desc': 'Reuniones en línea',
    'home.action.share': 'Compartir',
    'home.action.share.desc': 'Comparte A.R.M',
    'home.action.install': 'Instalar',
    'home.action.install.desc': 'Instalar la app',
    'home.action.test': 'Test Admin',
    'home.action.test.desc': 'Probar contraseña',
    'home.action.admin': 'Admin',
    'home.action.admin.desc': 'Área de admin',
    'home.info.title': 'Información',
    'home.info.headquarters': 'Sede',
    'home.info.headquarters.address': 'Calle 530, Puerta 245, Sebenikoro, Bamako, Malí',
    'home.info.contact': 'Contacto',
    
    // Profile Screen
    'profile.title': 'Miembros del Partido',
    'profile.header.title': 'Dirección del Partido',
    'profile.header.subtitle': 'Conoce a los miembros de nuestro equipo directivo',
    'profile.role.president': 'Presidente',
    'profile.role.vicepresident1': 'Primer Vicepresidente',
    'profile.role.vicepresident2': 'Segundo Vicepresidente',
    'profile.role.secretary': 'Secretario General',
    'profile.role.admin': 'Secretario Administrativo',
    'profile.role.treasurer': 'Tesorera',
    'profile.role.member': 'Miembro',
    'profile.actions.title': 'Acciones rápidas',
    'profile.action.call': 'Llamar',
    'profile.action.message': 'Mensaje',
    'profile.action.email': 'Email',
    'profile.values.title': 'Nuestros Valores',
    'profile.value.fraternity': 'Fraternidad',
    'profile.value.fraternity.desc': 'Unidad y solidaridad entre todos los malienses',
    'profile.value.liberty': 'Libertad',
    'profile.value.liberty.desc': 'Respeto por los derechos y libertades fundamentales',
    'profile.value.equality': 'Igualdad',
    'profile.value.equality.desc': 'Justicia y equidad para todos los ciudadanos',
    'profile.headquarters.title': 'Sede del Partido',
    'profile.headquarters.address': 'Calle 530, Puerta 245\nSebenikoro, Bamako\nMalí',
    'profile.error.noPhone': 'El número de teléfono no está disponible.',
    'profile.error.cannotCall': 'No se puede abrir la aplicación de teléfono.',
    'profile.error.cannotMessage': 'No se puede abrir la aplicación de mensajes.',
    'profile.error.cannotEmail': 'No se puede abrir la aplicación de correo.',
    
    // Contact Screen
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para escucharte',
    'contact.form.title': 'Envíanos un mensaje',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Teléfono',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.send': 'Enviar mensaje',
    'contact.form.cancel': 'Cancelar',
    'contact.form.required': 'Por favor complete todos los campos requeridos',
    'contact.form.success': '¡Gracias por tu mensaje! Responderemos lo antes posible.',
    'contact.quickActions': 'Acciones rápidas',
    
    // Donations
    'donations.title': 'Hacer una Donación',
    'donations.subtitle': 'Apoya nuestro movimiento por un Malí mejor',
    'donations.amount.title': 'Monto de la donación',
    'donations.amount.custom': 'Monto personalizado',
    'donations.amount.custom.placeholder': 'Ingrese el monto',
    'donations.payment.title': 'Método de pago',
    'donations.payment.card': 'Tarjeta bancaria',
    'donations.payment.bank': 'Transferencia bancaria',
    'donations.payment.mobile': 'Orange Money',
    'donations.button': 'Donar',
    'donations.success': '¡Gracias por tu donación!',
    'donations.success.message': 'Tu contribución nos ayuda a construir un Malí mejor.',
    
    // Events
    'events.title': 'Eventos',
    'events.upcoming': 'Próximos eventos',
    'events.past': 'Eventos pasados',
    'events.all': 'Todos',
    'events.search': 'Buscar un evento...',
    'events.register': 'Registrarse',
    'events.registered': 'Registro confirmado',
    'events.type.meeting': 'Reunión',
    'events.type.rally': 'Concentración',
    'events.type.conference': 'Conferencia',
    'events.type.training': 'Formación',
    'events.type.other': 'Otro',
    
    // News
    'news.title': 'Noticias',
    'news.latest': 'Últimas noticias',
    'news.all': 'Todas',
    'news.search': 'Buscar noticias...',
    'news.category.politics': 'Política',
    'news.category.economy': 'Economía',
    'news.category.social': 'Social',
    'news.category.culture': 'Cultura',
    'news.category.other': 'Otro',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.save': 'Guardar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.back': 'Volver',
    'common.close': 'Cerrar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.refresh': 'Actualizar',
    'common.unavailable': 'No disponible',
    
    // Language Selector
    'language.title': 'Idioma',
    'language.french': 'Français',
    'language.spanish': 'Español',
    'language.bambara': 'Bamanankan',
  },
  bm: {
    // Navigation (Bambara)
    'nav.home': 'So',
    'nav.profile': 'Mɔgɔw',
    'nav.events': 'Kɛwalew',
    'nav.news': 'Kunnafoniw',
    'nav.contact': 'Kumaɲɔgɔnya',
    'nav.chat': 'Baro',
    'nav.donations': 'Dɛmɛw',
    'nav.media': 'Jasigilanw',
    'nav.regions': 'Maruw',
    'nav.dashboard': 'Kunnafoni yɔrɔ',
    'nav.admin': 'Baarakɛlaw',
    
    // Home Screen
    'home.title': 'A.R.M',
    'home.subtitle': 'Mali Mɔgɔw ka Ɲɔgɔn Jɛɲɔgɔnya',
    'home.motto': 'Badenya • Hɔrɔnya • Bɛɛ ye kelen ye',
    'home.program.title': 'An ka Politiki Porogaramu',
    'home.program.intro': 'Mali Mɔgɔw ka Ɲɔgɔn Jɛɲɔgɔnya (A.R.M) b\'a ɲini k\'a kɛ Mali kelen ye, nɔgɔya ni demokarasi ye. An ka hakilina sinsinnen bɛ badenya, hɔrɔnya ani bɛɛ ye kelen ye kan Mali mɔgɔw bɛɛ ye.',
    'home.program.point1': 'Demokarasi ni sariya sabatili',
    'home.program.point2': 'Sɔrɔko yiriwaliya ni baara dabɔli',
    'home.program.point3': 'Kalanko ɲuman bɛɛ ye',
    'home.program.point4': 'Kɛnɛya kɔrɔbɔli ni kɔrɔbɔli',
    'home.program.point5': 'Jamana kelen ni sigida ɲɔgɔn',
    'home.donation.title': 'An ka Baara Dɛmɛ',
    'home.donation.subtitle': 'I ka dɛmɛ b\'an dɛmɛ k\'a kɛ Mali ɲuman ye',
    'home.donation.button': 'Dɛmɛ di',
    'home.actions.title': 'Baara Teliyaw',
    'home.action.join': 'Don a la',
    'home.action.join.desc': 'Don parti la',
    'home.action.events': 'Kɛwalew',
    'home.action.events.desc': 'An ka baaraw',
    'home.action.news': 'Kunnafoniw',
    'home.action.news.desc': 'Kunnafoni koraw',
    'home.action.contact': 'Kumaɲɔgɔnya',
    'home.action.contact.desc': 'An sɔrɔ',
    'home.action.chat': 'Baro',
    'home.action.chat.desc': 'Foroba baro',
    'home.action.gallery': 'Jasigilanw',
    'home.action.gallery.desc': 'Jasigi ni Wideyow',
    'home.action.regions': 'Maruw',
    'home.action.regions.desc': 'Mali maruw',
    'home.action.dashboard': 'Kunnafoni yɔrɔ',
    'home.action.dashboard.desc': 'Kunnafoni bɛɛ',
    'home.action.video': 'Wideyo lajɛ',
    'home.action.video.desc': 'Ɛntɛrinɛti kan lajɛw',
    'home.action.share': 'Tila',
    'home.action.share.desc': 'A.R.M tila',
    'home.action.install': 'Sigi',
    'home.action.install.desc': 'Porogaramu sigi',
    'home.action.test': 'Baarakɛla kɔrɔbɔli',
    'home.action.test.desc': 'Daɲɛgafe kɔrɔbɔ',
    'home.action.admin': 'Baarakɛlaw',
    'home.action.admin.desc': 'Baarakɛlaw yɔrɔ',
    'home.info.title': 'Kunnafoniw',
    'home.info.headquarters': 'Sigiyɔrɔ',
    'home.info.headquarters.address': 'Sira 530, Da 245, Sebenikoro, Bamako, Mali',
    'home.info.contact': 'Kumaɲɔgɔnya',
    
    // Profile Screen
    'profile.title': 'Parti Mɔgɔw',
    'profile.header.title': 'Parti Kuntigiya',
    'profile.header.subtitle': 'An ka kuntigiya ekipu mɔgɔw lajɛ',
    'profile.role.president': 'Jamanakuntigiya',
    'profile.role.vicepresident1': 'Jamanakuntigiya kɔrɔfɔlɔ',
    'profile.role.vicepresident2': 'Jamanakuntigiya filanan',
    'profile.role.secretary': 'Sɛkɛrɛtɛri jeneral',
    'profile.role.admin': 'Sɛkɛrɛtɛri baarakɛla',
    'profile.role.treasurer': 'Warijɛla',
    'profile.role.member': 'Mɔgɔ',
    'profile.actions.title': 'Baara teliyaw',
    'profile.action.call': 'Wele',
    'profile.action.message': 'Cikan',
    'profile.action.email': 'Bataki',
    'profile.values.title': 'An ka Nafaw',
    'profile.value.fraternity': 'Badenya',
    'profile.value.fraternity.desc': 'Kelen ni jɛɲɔgɔnya Mali mɔgɔw bɛɛ cɛ',
    'profile.value.liberty': 'Hɔrɔnya',
    'profile.value.liberty.desc': 'Hakɛ ni hɔrɔnyaw bonya',
    'profile.value.equality': 'Bɛɛ ye kelen ye',
    'profile.value.equality.desc': 'Tiɲɛ ni bɛɛ ye kelen ye sitiyɛnw bɛɛ ye',
    'profile.headquarters.title': 'Parti Sigiyɔrɔ',
    'profile.headquarters.address': 'Sira 530, Da 245\nSebenikoro, Bamako\nMali',
    'profile.error.noPhone': 'Telefɔni nimɔrɔ tɛ yen.',
    'profile.error.cannotCall': 'Telefɔni porogaramu dabɔ tɛ se ka kɛ.',
    'profile.error.cannotMessage': 'Cikan porogaramu dabɔ tɛ se ka kɛ.',
    'profile.error.cannotEmail': 'Bataki porogaramu dabɔ tɛ se ka kɛ.',
    
    // Contact Screen
    'contact.title': 'An sɔrɔ',
    'contact.subtitle': 'An bɛ yen ka i mɛn',
    'contact.form.title': 'Cikan ci an ma',
    'contact.form.name': 'Tɔgɔ',
    'contact.form.email': 'Bataki',
    'contact.form.phone': 'Telefɔni',
    'contact.form.subject': 'Kunnafoni',
    'contact.form.message': 'Cikan',
    'contact.form.send': 'Cikan ci',
    'contact.form.cancel': 'Bali',
    'contact.form.required': 'I ka kan ka yɔrɔw bɛɛ fa',
    'contact.form.success': 'I ni ce i ka cikan kama! An bɛna jaabi di teliya la.',
    'contact.quickActions': 'Baara teliyaw',
    
    // Donations
    'donations.title': 'Dɛmɛ Di',
    'donations.subtitle': 'An ka baara dɛmɛ Mali ɲuman kama',
    'donations.amount.title': 'Dɛmɛ hakɛ',
    'donations.amount.custom': 'Hakɛ yɛrɛmahɔrɔnya',
    'donations.amount.custom.placeholder': 'Hakɛ sɛbɛ',
    'donations.payment.title': 'Sara fɛɛrɛ',
    'donations.payment.card': 'Banki karti',
    'donations.payment.bank': 'Banki cikan',
    'donations.payment.mobile': 'Orange Money',
    'donations.button': 'Dɛmɛ di',
    'donations.success': 'I ni ce i ka dɛmɛ kama!',
    'donations.success.message': 'I ka dɛmɛ b\'an dɛmɛ k\'a kɛ Mali ɲuman ye.',
    
    // Events
    'events.title': 'Kɛwalew',
    'events.upcoming': 'Kɛwalew nataw',
    'events.past': 'Kɛwalew tɛmɛnenw',
    'events.all': 'Bɛɛ',
    'events.search': 'Kɛwale ɲini...',
    'events.register': 'I tɔgɔ sɛbɛ',
    'events.registered': 'Tɔgɔsɛbɛnni dafalen',
    'events.type.meeting': 'Lajɛ',
    'events.type.rally': 'Ɲɔgɔn',
    'events.type.conference': 'Lajɛ belebele',
    'events.type.training': 'Kalan',
    'events.type.other': 'Wɛrɛ',
    
    // News
    'news.title': 'Kunnafoniw',
    'news.latest': 'Kunnafoni koraw',
    'news.all': 'Bɛɛ',
    'news.search': 'Kunnafoni ɲini...',
    'news.category.politics': 'Politiki',
    'news.category.economy': 'Sɔrɔko',
    'news.category.social': 'Sigida',
    'news.category.culture': 'Laadalakow',
    'news.category.other': 'Wɛrɛ',
    
    // Common
    'common.loading': 'Ka don...',
    'common.error': 'Fili',
    'common.success': 'Ɲɛtaa',
    'common.cancel': 'Bali',
    'common.confirm': 'Dafali',
    'common.save': 'Mara',
    'common.delete': 'Bɔ',
    'common.edit': 'Yɛlɛma',
    'common.back': 'Segin',
    'common.close': 'Datugu',
    'common.search': 'Ɲini',
    'common.filter': 'Sugandi',
    'common.refresh': 'Kura',
    'common.unavailable': 'Tɛ yen',
    
    // Language Selector
    'language.title': 'Kan',
    'language.french': 'Faransi kan',
    'language.spanish': 'Ɛspanyi kan',
    'language.bambara': 'Bamanankan',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      console.log('Loading language from AsyncStorage...');
      const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
      console.log('Stored language:', stored);
      
      if (stored && ['fr', 'es', 'bm'].includes(stored)) {
        setLanguageState(stored as Language);
        console.log('Language set to:', stored);
      } else {
        // Default to French if no valid language is stored
        console.log('No valid language stored, defaulting to French');
        setLanguageState('fr');
        await AsyncStorage.setItem(LANGUAGE_KEY, 'fr');
      }
    } catch (error) {
      console.error('Error loading language, defaulting to French:', error);
      // Default to French on error
      setLanguageState('fr');
      try {
        await AsyncStorage.setItem(LANGUAGE_KEY, 'fr');
      } catch (saveError) {
        console.error('Error saving default language:', saveError);
      }
    } finally {
      setIsInitialized(true);
      console.log('Language initialization complete');
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      console.log('Setting language to:', lang);
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      setLanguageState(lang);
      console.log('Language changed successfully to:', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  // Don't render children until language is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
