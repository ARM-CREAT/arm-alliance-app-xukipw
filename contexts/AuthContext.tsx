
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin password - In production, this should be stored securely on a backend
const ADMIN_PASSWORD = 'ARM2024Admin!';
const AUTH_KEY = 'arm_admin_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (Platform.OS === 'web') {
        const stored = localStorage.getItem(AUTH_KEY);
        setIsAdmin(stored === 'true');
      } else {
        const stored = await SecureStore.getItemAsync(AUTH_KEY);
        setIsAdmin(stored === 'true');
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      try {
        if (Platform.OS === 'web') {
          localStorage.setItem(AUTH_KEY, 'true');
        } else {
          await SecureStore.setItemAsync(AUTH_KEY, 'true');
        }
        setIsAdmin(true);
        return true;
      } catch (error) {
        console.log('Error saving auth:', error);
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(AUTH_KEY);
      } else {
        await SecureStore.deleteItemAsync(AUTH_KEY);
      }
      setIsAdmin(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
