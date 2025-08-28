import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTokenInfo } from '../../hooks/useTokenDetails';
import TokenUtils from '../../services/tokenUtils';

/**
 * Example component demonstrating how to access token details
 * across the application using different methods
 */
export const TokenExampleComponent: React.FC = () => {
  // Method 1: Using AuthContext directly
  const { tokenDetails, user } = useAuth();

  // Method 2: Using custom hook for individual token properties
  const { userId, role, username, email, isLoggedIn } = useTokenInfo();

  // Method 3: Using utility class (can be used anywhere in the app)
  const userIdFromUtils = TokenUtils.getUserId();
  const roleFromUtils = TokenUtils.getUserRole();
  const isAdmin = TokenUtils.isAdmin();
  const isLawyer = TokenUtils.isLawyer();
  const isClient = TokenUtils.isClient();

  if (!isLoggedIn) {
    return <div>Please log in to view this content.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Token Details Example</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">From AuthContext:</h3>
          <p><strong>User ID:</strong> {tokenDetails?.userId}</p>
          <p><strong>Role:</strong> {tokenDetails?.role}</p>
          <p><strong>Username:</strong> {tokenDetails?.username}</p>
          <p><strong>Email:</strong> {tokenDetails?.email}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">From useTokenInfo Hook:</h3>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">From TokenUtils:</h3>
          <p><strong>User ID:</strong> {userIdFromUtils}</p>
          <p><strong>Role:</strong> {roleFromUtils}</p>
          <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
          <p><strong>Is Lawyer:</strong> {isLawyer ? 'Yes' : 'No'}</p>
          <p><strong>Is Client:</strong> {isClient ? 'Yes' : 'No'}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold mb-2">User Information:</h3>
          <p><strong>Display Name:</strong> {user?.name || user?.username}</p>
          <p><strong>Practice Area:</strong> {user?.practiceArea || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenExampleComponent;
