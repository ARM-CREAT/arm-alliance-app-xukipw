
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
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NEWS: 'arm_news',
  EVENTS: 'arm_events',
  MEDIA: 'arm_media',
};

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Lancement officiel de l\'A.R.M',
    content: 'L\'Alliance pour le Rassemblement Malien a été officiellement lancée à Bamako.',
    category: 'Politique',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Programme de développement économique',
    content: 'Présentation de notre plan pour la création d\'emplois et le développement économique.',
    category: 'Économie',
    date: '2024-01-20',
  },
];

const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'Assemblée Générale',
    description: 'Première assemblée générale du parti',
    date: '2024-02-15',
    location: 'Bamako, Sebenikoro',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Campagne de sensibilisation',
    description: 'Campagne de sensibilisation dans la région de Koulikoro',
    date: '2024-02-20',
    location: 'Koulikoro',
    type: 'campaign',
  },
];

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [storedNews, storedEvents, storedMedia] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.NEWS),
        AsyncStorage.getItem(STORAGE_KEYS.EVENTS),
        AsyncStorage.getItem(STORAGE_KEYS.MEDIA),
      ]);

      if (storedNews) setNews(JSON.parse(storedNews));
      if (storedEvents) setEvents(JSON.parse(storedEvents));
      if (storedMedia) setMedia(JSON.parse(storedMedia));
    } catch (error) {
      console.log('Error loading content:', error);
    }
  };

  const saveNews = async (newNews: NewsItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newNews));
      setNews(newNews);
    } catch (error) {
      console.log('Error saving news:', error);
    }
  };

  const saveEvents = async (newEvents: EventItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.log('Error saving events:', error);
    }
  };

  const saveMedia = async (newMedia: MediaItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(newMedia));
      setMedia(newMedia);
    } catch (error) {
      console.log('Error saving media:', error);
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
    await loadContent();
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
