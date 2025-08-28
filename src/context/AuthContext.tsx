import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, LoginCredentials } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials, userType: 'admin' | 'client' | 'lawyer') => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getUser();
        
        if (token && storedUser) {
          // Verify token is still valid by fetching profile
          const profileData = await authService.getProfile();
          setUserState(profileData.user);
        }
      } catch (error) {
        // Token is invalid, clear stored data
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials, userType: 'admin' | 'client' | 'lawyer') => {
    try {
      let response;
      
      switch (userType) {
        case 'admin':
          response = await authService.loginAdmin(credentials);
          break;
        case 'client':
          response = await authService.loginClient(credentials);
          break;
        case 'lawyer':
          response = await authService.loginLawyer(credentials);
          break;
        default:
          throw new Error('Invalid user type');
      }

      authService.setToken(response.token);
      authService.setUser(response.user);
      setUserState(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUserState(null);
  };

  const setUser = (user: User) => {
    authService.setUser(user);
    setUserState(user);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
