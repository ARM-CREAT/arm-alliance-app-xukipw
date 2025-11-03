
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
    console.log('AuthProvider mounted, checking auth status');
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...');
      if (Platform.OS === 'web') {
        const stored = localStorage.getItem(AUTH_KEY);
        console.log('Web auth status:', stored);
        setIsAdmin(stored === 'true');
      } else {
        const stored = await SecureStore.getItemAsync(AUTH_KEY);
        console.log('Native auth status:', stored);
        setIsAdmin(stored === 'true');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
      console.log('Auth check complete');
    }
  };

  const login = async (password: string): Promise<boolean> => {
    console.log('Login function called');
    console.log('Password length:', password.length);
    console.log('Expected password:', ADMIN_PASSWORD);
    console.log('Passwords match:', password === ADMIN_PASSWORD);
    
    if (password === ADMIN_PASSWORD) {
      try {
        console.log('Password correct, saving auth state...');
        if (Platform.OS === 'web') {
          localStorage.setItem(AUTH_KEY, 'true');
          console.log('Auth saved to localStorage');
        } else {
          await SecureStore.setItemAsync(AUTH_KEY, 'true');
          console.log('Auth saved to SecureStore');
        }
        setIsAdmin(true);
        console.log('isAdmin state updated to true');
        return true;
      } catch (error) {
        console.error('Error saving auth:', error);
        return false;
      }
    }
    console.log('Password incorrect');
    return false;
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      if (Platform.OS === 'web') {
        localStorage.removeItem(AUTH_KEY);
      } else {
        await SecureStore.deleteItemAsync(AUTH_KEY);
      }
      setIsAdmin(false);
      console.log('Logout complete');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  console.log('AuthProvider render - isAdmin:', isAdmin, 'isLoading:', isLoading);

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
