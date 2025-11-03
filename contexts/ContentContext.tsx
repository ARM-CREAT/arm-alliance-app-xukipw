
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

interface ContentContextType {
  news: NewsItem[];
  events: EventItem[];
  media: MediaItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addEvent: (item: Omit<EventItem, 'id'>) => Promise<void>;
  updateEvent: (id: string, item: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addMedia: (item: Omit<MediaItem, 'id'>) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NEWS: 'arm_news',
  EVENTS: 'arm_events',
  MEDIA: 'arm_media',
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

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
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
          AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true'),
        ]);
        setNews(defaultNews);
        setEvents(defaultEvents);
        setMedia(defaultMedia);
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
    } finally {
      setIsLoading(false);
      console.log('Content initialization complete');
    }
  };

  const loadContent = async () => {
    try {
      const [storedNews, storedEvents, storedMedia] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.NEWS),
        AsyncStorage.getItem(STORAGE_KEYS.EVENTS),
        AsyncStorage.getItem(STORAGE_KEYS.MEDIA),
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
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback to default content
      setNews(defaultNews);
      setEvents(defaultEvents);
      setMedia(defaultMedia);
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
        addNews,
        updateNews,
        deleteNews,
        addEvent,
        updateEvent,
        deleteEvent,
        addMedia,
        deleteMedia,
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
