import { useAuth } from '../context/AuthContext';
import { TokenDetails } from '../services/authService';

/**
 * Custom hook to access token details throughout the application
 * @returns TokenDetails object containing userId, role, username, and email
 */
export const useTokenDetails = (): TokenDetails | null => {
  const { tokenDetails } = useAuth();
  return tokenDetails;
};

/**
 * Custom hook to get specific token detail properties
 * @returns Object with individual token detail properties
 */
export const useTokenInfo = () => {
  const { tokenDetails } = useAuth();
  
  return {
    userId: tokenDetails?.userId || null,
    role: tokenDetails?.role || null,
    username: tokenDetails?.username || null,
    email: tokenDetails?.email || null,
    isLoggedIn: !!tokenDetails,
  };
};

export default useTokenDetails;
