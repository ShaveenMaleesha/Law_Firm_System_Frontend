import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, LoginCredentials, TokenDetails } from '../services/authService';
import lawyerService from '../services/lawyerService';
import clientService from '../services/clientService';

interface AuthContextType {
  user: User | null;
  tokenDetails: TokenDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials, userType: 'admin' | 'client' | 'lawyer') => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setTokenDetails: (tokenDetails: TokenDetails) => void;
  refreshUserData: () => Promise<void>;
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
  const [tokenDetails, setTokenDetailsState] = useState<TokenDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getUser();
        const storedTokenDetails = authService.getTokenDetails();
        
        if (token && storedUser) {
          // Verify token is still valid by fetching profile
          const profileData = await authService.getProfile();
          let userData = profileData.user;
          let tokenUpdateNeeded = false;
          
          // Fetch additional details including profile image, username and email based on user role
          if (userData.role === 'lawyer') {
            try {
              const lawyerDetails = await lawyerService.getMyDetails();
              const lawyer = lawyerDetails.lawyer;
              
              // Update user data with fields from API
              userData = {
                ...userData,
                profilePicture: lawyer.profilePicture,
                name: lawyer.name,
                email: lawyer.email
              };
              
              // Flag that we need to update the token with new data
              tokenUpdateNeeded = true;
            } catch (err) {
              console.error('Failed to fetch lawyer details:', err);
            }
          } else if (userData.role === 'client') {
            try {
              const clientDetails = await clientService.getMyDetails();
              const client = clientDetails.client;
              
              // Update user data with fields from API
              userData = {
                ...userData,
                profilePicture: client.profilePicture,
                name: client.name,
                username: client.username,
                email: client.email
              };
              
              // Flag that we need to update the token with new data
              tokenUpdateNeeded = true;
            } catch (err) {
              console.error('Failed to fetch client details:', err);
            }
          }
          
          // Update user state and local storage
          setUserState(userData);
          authService.setUser(userData);
          
          // Update token details with latest username and email if needed
          if (tokenUpdateNeeded && storedTokenDetails) {
            const updatedTokenDetails: TokenDetails = {
              userId: storedTokenDetails.userId,
              role: storedTokenDetails.role,
              username: userData.username || userData.name || '',
              email: userData.email || ''
            };
            authService.setTokenDetails(updatedTokenDetails);
            setTokenDetailsState(updatedTokenDetails);
          } else {
            setTokenDetailsState(storedTokenDetails);
          }
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

      // Store token and user data
      authService.setToken(response.token);
      let userData = response.user;
      
      // Fetch additional details including profile image, username and email based on user role
      if (userType === 'lawyer') {
        try {
          const lawyerDetails = await lawyerService.getMyDetails();
          const lawyer = lawyerDetails.lawyer;
          
          // Update user data with fields from API
          userData = {
            ...userData,
            profilePicture: lawyer.profilePicture,
            name: lawyer.name,
            email: lawyer.email
          };
        } catch (err) {
          console.error('Failed to fetch lawyer details:', err);
        }
      } else if (userType === 'client') {
        try {
          const clientDetails = await clientService.getMyDetails();
          const client = clientDetails.client;
          
          // Update user data with fields from API
          userData = {
            ...userData,
            profilePicture: client.profilePicture,
            name: client.name,
            username: client.username,
            email: client.email
          };
        } catch (err) {
          console.error('Failed to fetch client details:', err);
        }
      }
      
      // Update user state and local storage
      authService.setUser(userData);
      setUserState(userData);

      // Create and store token details using API data
      const tokenDetails: TokenDetails = {
        userId: userData.id,
        role: userData.role,
        username: userData.username || userData.name || '',
        email: userData.email || '',
      };
      
      authService.setTokenDetails(tokenDetails);
      setTokenDetailsState(tokenDetails);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUserState(null);
    setTokenDetailsState(null);
  };

  const setUser = (user: User) => {
    // Update user in local storage and state
    authService.setUser(user);
    setUserState(user);
    
    // Also update tokenDetails with the latest name and email
    const storedTokenDetails = authService.getTokenDetails();
    if (storedTokenDetails) {
      const updatedTokenDetails: TokenDetails = {
        ...storedTokenDetails,
        username: user.username || user.name || storedTokenDetails.username,
        email: user.email || storedTokenDetails.email
      };
      authService.setTokenDetails(updatedTokenDetails);
      setTokenDetailsState(updatedTokenDetails);
    }
  };

  const setTokenDetails = (tokenDetails: TokenDetails) => {
    authService.setTokenDetails(tokenDetails);
    setTokenDetailsState(tokenDetails);
  };
  
  // Function to refresh user data from the API
  const refreshUserData = async () => {
    try {
      const token = authService.getToken();
      const currentUser = authService.getUser();
      
      if (!token || !currentUser) {
        console.error('No token or user found during refresh');
        return;
      }
      
      // First get basic profile data
      const profileData = await authService.getProfile();
      let userData = profileData.user;
      
      // Then get detailed data based on role
      if (userData.role === 'lawyer') {
        try {
          const lawyerDetails = await lawyerService.getMyDetails();
          const lawyer = lawyerDetails.lawyer;
          
          // Update user data with fields from API
          userData = {
            ...userData,
            profilePicture: lawyer.profilePicture,
            name: lawyer.name,
            email: lawyer.email
          };
        } catch (err) {
          console.error('Failed to fetch lawyer details during refresh:', err);
        }
      } else if (userData.role === 'client') {
        try {
          const clientDetails = await clientService.getMyDetails();
          const client = clientDetails.client;
          
          // Update user data with fields from API
          userData = {
            ...userData,
            profilePicture: client.profilePicture,
            name: client.name,
            username: client.username,
            email: client.email
          };
        } catch (err) {
          console.error('Failed to fetch client details during refresh:', err);
        }
      }
      
      // Update user state and local storage
      setUserState(userData);
      authService.setUser(userData);
      
      // Update token details
      const storedTokenDetails = authService.getTokenDetails();
      if (storedTokenDetails) {
        const updatedTokenDetails: TokenDetails = {
          userId: storedTokenDetails.userId,
          role: storedTokenDetails.role,
          username: userData.username || userData.name || '',
          email: userData.email || ''
        };
        authService.setTokenDetails(updatedTokenDetails);
        setTokenDetailsState(updatedTokenDetails);
      }
      
      console.log('User data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    tokenDetails,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
    setTokenDetails,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
