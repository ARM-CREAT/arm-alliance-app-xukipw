
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  description: string;
  date: string;
}

export interface MemberItem {
  id: string;
  name: string;
  roleKey: string;
  profession: string;
  location: string;
  phone: string;
  phoneRaw: string;
  email: string;
  image: string;
  order: number;
}

interface ContentContextType {
  news: NewsItem[];
  events: EventItem[];
  media: MediaItem[];
  members: MemberItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addEvent: (item: Omit<EventItem, 'id'>) => Promise<void>;
  updateEvent: (id: string, item: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addMedia: (item: Omit<MediaItem, 'id'>) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;
  addMember: (item: Omit<MemberItem, 'id'>) => Promise<void>;
  updateMember: (id: string, item: Partial<MemberItem>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NEWS: 'arm_news',
  EVENTS: 'arm_events',
  MEDIA: 'arm_media',
  MEMBERS: 'arm_members',
  INITIALIZED: 'arm_content_initialized',
};

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Lancement officiel de l\'A.R.M',
    content: 'L\'Alliance pour le Rassemblement Malien a été officiellement lancée à Bamako. Cette nouvelle formation politique vise à rassembler tous les Maliens autour des valeurs de fraternité, liberté et égalité.',
    category: 'Politique',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800',
  },
  {
    id: '2',
    title: 'Programme de développement économique',
    content: 'Présentation de notre plan ambitieux pour la création d\'emplois et le développement économique du Mali. Notre programme se concentre sur l\'agriculture, l\'entrepreneuriat et l\'innovation.',
    category: 'Économie',
    date: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  },
  {
    id: '3',
    title: 'Rencontre avec les jeunes',
    content: 'Notre vice-président a rencontré les jeunes de plusieurs régions pour discuter de l\'avenir de l\'éducation et de l\'emploi au Mali.',
    category: 'Jeunesse',
    date: '2024-01-25',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
  },
];

const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'Assemblée Générale',
    description: 'Première assemblée générale du parti pour définir les orientations stratégiques',
    date: '2024-02-15',
    location: 'Bamako, Sebenikoro',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Campagne de sensibilisation',
    description: 'Campagne de sensibilisation dans la région de Koulikoro sur nos programmes',
    date: '2024-02-20',
    location: 'Koulikoro',
    type: 'campaign',
  },
  {
    id: '3',
    title: 'Forum sur l\'éducation',
    description: 'Discussion sur l\'amélioration du système éducatif malien avec les acteurs du secteur',
    date: '2024-03-05',
    location: 'Centre culturel, Bamako',
    type: 'forum',
  },
];

const defaultMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Cérémonie de lancement',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800',
    description: 'Photos de la cérémonie de lancement officiel du parti A.R.M',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Rencontre avec les membres',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
    description: 'Moments forts de notre rencontre avec les membres du parti',
    date: '2024-01-20',
  },
];

const defaultMembers: MemberItem[] = [
  {
    id: '1',
    name: 'Lassine Diakité',
    roleKey: 'profile.role.president',
    profession: 'Entrepreneur',
    location: 'Avenida Castilla la Mancha 122, Yuncos, Toledo, Espagne',
    phone: '+34 632 60 71 01',
    phoneRaw: '0034632607101',
    email: 'president@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    order: 1,
  },
  {
    id: '2',
    name: 'Dadou Sangare',
    roleKey: 'profile.role.vicepresident1',
    profession: '',
    location: 'Milan, Italie',
    phone: '',
    phoneRaw: '',
    email: 'dadou.sangare@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    order: 2,
  },
  {
    id: '3',
    name: 'Oumar Keita',
    roleKey: 'profile.role.vicepresident2',
    profession: 'Enseignant',
    location: 'Koutiala, Mali',
    phone: '+223 76 30 48 69',
    phoneRaw: '0022376304869',
    email: 'oumar.keita@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    order: 3,
  },
  {
    id: '4',
    name: 'Karifa Keita',
    roleKey: 'profile.role.secretary',
    profession: 'Fonctionnaire d\'État',
    location: 'Bamako, Mali',
    phone: '+223 79 81 93 12',
    phoneRaw: '0022379819312',
    email: 'karifa.keita@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
    order: 4,
  },
  {
    id: '5',
    name: 'Modibo Keita',
    roleKey: 'profile.role.admin',
    profession: 'Gestionnaire',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '+223 76 11 22 63',
    phoneRaw: '0022376112263',
    email: 'modibo.keita@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
    order: 5,
  },
  {
    id: '6',
    name: 'Sokona Keita',
    roleKey: 'profile.role.treasurer',
    profession: 'Sage-femme',
    location: 'Sebenikoro, Bamako, Mali',
    phone: '+223 75 17 99 20',
    phoneRaw: '0022375179920',
    email: 'sokona.keita@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
    order: 6,
  },
  {
    id: '7',
    name: 'Daouda Sangare',
    roleKey: 'profile.role.member',
    profession: '',
    location: 'Italie',
    phone: '+39 350 939 3002',
    phoneRaw: '00393509393002',
    email: 'daouda.sangare@arm-mali.org',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
    order: 7,
  },
];

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeContent();
  }, []);

  const initializeContent = async () => {
    try {
      console.log('Initializing content...');
      const initialized = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);
      
      if (!initialized) {
        console.log('First time initialization - setting default content');
        // First time initialization
        await Promise.all([
          AsyncStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(defaultNews)),
          AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(defaultEvents)),
          AsyncStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(defaultMedia)),
          AsyncStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(defaultMembers)),
          AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true'),
        ]);
        setNews(defaultNews);
        setEvents(defaultEvents);
        setMedia(defaultMedia);
        setMembers(defaultMembers);
      } else {
        console.log('Loading existing content');
        await loadContent();
      }
    } catch (error) {
      console.error('Error initializing content:', error);
      // Fallback to default content
      setNews(defaultNews);
      setEvents(defaultEvents);
      setMedia(defaultMedia);
      setMembers(defaultMembers);
    } finally {
      setIsLoading(false);
      console.log('Content initialization complete');
    }
  };

  const loadContent = async () => {
    try {
      const [storedNews, storedEvents, storedMedia, storedMembers] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.NEWS),
        AsyncStorage.getItem(STORAGE_KEYS.EVENTS),
        AsyncStorage.getItem(STORAGE_KEYS.MEDIA),
        AsyncStorage.getItem(STORAGE_KEYS.MEMBERS),
      ]);

      if (storedNews) {
        const parsedNews = JSON.parse(storedNews);
        setNews(parsedNews.length > 0 ? parsedNews : defaultNews);
      } else {
        setNews(defaultNews);
      }
      
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        setEvents(parsedEvents.length > 0 ? parsedEvents : defaultEvents);
      } else {
        setEvents(defaultEvents);
      }
      
      if (storedMedia) {
        const parsedMedia = JSON.parse(storedMedia);
        setMedia(parsedMedia.length > 0 ? parsedMedia : defaultMedia);
      } else {
        setMedia(defaultMedia);
      }

      if (storedMembers) {
        const parsedMembers = JSON.parse(storedMembers);
        setMembers(parsedMembers.length > 0 ? parsedMembers : defaultMembers);
      } else {
        setMembers(defaultMembers);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback to default content
      setNews(defaultNews);
      setEvents(defaultEvents);
      setMedia(defaultMedia);
      setMembers(defaultMembers);
    }
  };

  const saveNews = async (newNews: NewsItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newNews));
      setNews(newNews);
      console.log('News saved successfully');
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const saveEvents = async (newEvents: EventItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(newEvents));
      setEvents(newEvents);
      console.log('Events saved successfully');
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const saveMedia = async (newMedia: MediaItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(newMedia));
      setMedia(newMedia);
      console.log('Media saved successfully');
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const saveMembers = async (newMembers: MemberItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(newMembers));
      setMembers(newMembers);
      console.log('Members saved successfully');
    } catch (error) {
      console.error('Error saving members:', error);
    }
  };

  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...item,
      id: Date.now().toString(),
    };
    await saveNews([newItem, ...news]);
  };

  const updateNews = async (id: string, item: Partial<NewsItem>) => {
    const updated = news.map(n => n.id === id ? { ...n, ...item } : n);
    await saveNews(updated);
  };

  const deleteNews = async (id: string) => {
    const filtered = news.filter(n => n.id !== id);
    await saveNews(filtered);
  };

  const addEvent = async (item: Omit<EventItem, 'id'>) => {
    const newItem: EventItem = {
      ...item,
      id: Date.now().toString(),
    };
    await saveEvents([newItem, ...events]);
  };

  const updateEvent = async (id: string, item: Partial<EventItem>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...item } : e);
    await saveEvents(updated);
  };

  const deleteEvent = async (id: string) => {
    const filtered = events.filter(e => e.id !== id);
    await saveEvents(filtered);
  };

  const addMedia = async (item: Omit<MediaItem, 'id'>) => {
    const newItem: MediaItem = {
      ...item,
      id: Date.now().toString(),
    };
    await saveMedia([newItem, ...media]);
  };

  const deleteMedia = async (id: string) => {
    const filtered = media.filter(m => m.id !== id);
    await saveMedia(filtered);
  };

  const addMember = async (item: Omit<MemberItem, 'id'>) => {
    const newItem: MemberItem = {
      ...item,
      id: Date.now().toString(),
    };
    const sortedMembers = [...members, newItem].sort((a, b) => a.order - b.order);
    await saveMembers(sortedMembers);
  };

  const updateMember = async (id: string, item: Partial<MemberItem>) => {
    const updated = members.map(m => m.id === id ? { ...m, ...item } : m);
    const sortedMembers = updated.sort((a, b) => a.order - b.order);
    await saveMembers(sortedMembers);
  };

  const deleteMember = async (id: string) => {
    const filtered = members.filter(m => m.id !== id);
    await saveMembers(filtered);
  };

  const refreshContent = async () => {
    console.log('Refreshing content...');
    setIsLoading(true);
    await loadContent();
    setIsLoading(false);
    console.log('Content refreshed');
  };

  return (
    <ContentContext.Provider
      value={{
        news,
        events,
        media,
        members,
        addNews,
        updateNews,
        deleteNews,
        addEvent,
        updateEvent,
        deleteEvent,
        addMedia,
        deleteMedia,
        addMember,
        updateMember,
        deleteMember,
        refreshContent,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
