import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

export const useAuthenticatedRequest = () => {
  const { logout } = useAuth();

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

  return { makeRequest, authService };
};
