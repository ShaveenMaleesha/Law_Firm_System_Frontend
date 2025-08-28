import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import TokenUtils from '../services/tokenUtils';

export const useAuthenticatedRequest = () => {
  const { logout, tokenDetails } = useAuth();

  const makeRequest = async <T>(request: () => Promise<T>): Promise<T> => {
    try {
      return await request();
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Token expired or unauthorized
        logout();
        window.location.href = '/signin';
      }
      throw error;
    }
  };

  // Helper functions to access token details
  const getUserId = () => tokenDetails?.userId || TokenUtils.getUserId();
  const getUserRole = () => tokenDetails?.role || TokenUtils.getUserRole();
  const getUsername = () => tokenDetails?.username || TokenUtils.getUsername();
  const getUserEmail = () => tokenDetails?.email || TokenUtils.getUserEmail();

  return { 
    makeRequest, 
    authService,
    tokenDetails,
    getUserId,
    getUserRole,
    getUsername,
    getUserEmail
  };
};
