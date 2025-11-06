
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AUTH_KEY = '@arm_admin_auth';
// Mot de passe administrateur sécurisé - Ne jamais afficher ce mot de passe dans l'application
// Ce mot de passe est uniquement pour l'administrateur
const ADMIN_PASSWORD = 'ARM2024Admin!';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const authStatus = await AsyncStorage.getItem(AUTH_KEY);
      const isAuth = authStatus === 'true';
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch (error) {
      console.error('Error checking auth:', error);
      return false;
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      // Vérification sécurisée du mot de passe
      // Le mot de passe n'est jamais affiché ou exposé
      if (password === ADMIN_PASSWORD) {
        await AsyncStorage.setItem(AUTH_KEY, 'true');
        setIsAuthenticated(true);
        console.log('Admin login successful');
        return true;
      }
      console.log('Admin login failed - incorrect password');
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
      console.log('Admin logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
