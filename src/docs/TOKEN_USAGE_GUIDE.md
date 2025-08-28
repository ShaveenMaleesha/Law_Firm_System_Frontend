# Token Details Usage Guide

After successful login, the application stores token details that can be accessed throughout the application. The token details include:

- `userId`: Unique identifier for the user
- `role`: User role ('admin', 'client', or 'lawyer')
- `username`: Display name of the user
- `email`: User's email address

## Ways to Access Token Details

### 1. Using AuthContext (Recommended for React components)

```tsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { tokenDetails, user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {tokenDetails?.username}!</p>
      <p>Your role: {tokenDetails?.role}</p>
      <p>User ID: {tokenDetails?.userId}</p>
      <p>Email: {tokenDetails?.email}</p>
    </div>
  );
};
```

### 2. Using Custom Hooks

#### useTokenDetails Hook
```tsx
import { useTokenDetails } from '../hooks/useTokenDetails';

const MyComponent = () => {
  const tokenDetails = useTokenDetails();
  
  return (
    <div>
      {tokenDetails && (
        <p>Hello, {tokenDetails.username}!</p>
      )}
    </div>
  );
};
```

#### useTokenInfo Hook (for individual properties)
```tsx
import { useTokenInfo } from '../hooks/useTokenDetails';

const MyComponent = () => {
  const { userId, role, username, email, isLoggedIn } = useTokenInfo();
  
  if (!isLoggedIn) {
    return <div>Not logged in</div>;
  }
  
  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Role: {role}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
};
```

### 3. Using TokenUtils (for non-React contexts or utility functions)

```tsx
import TokenUtils from '../services/tokenUtils';

// Get specific token details
const userId = TokenUtils.getUserId();
const role = TokenUtils.getUserRole();
const username = TokenUtils.getUsername();
const email = TokenUtils.getUserEmail();

// Check user roles
const isAdmin = TokenUtils.isAdmin();
const isLawyer = TokenUtils.isLawyer();
const isClient = TokenUtils.isClient();

// Check authentication status
const isAuthenticated = TokenUtils.isAuthenticated();

// Get auth token for API requests
const authToken = TokenUtils.getAuthToken();
```

## Example Use Cases

### Role-based Rendering
```tsx
import { useTokenInfo } from '../hooks/useTokenDetails';

const RoleBasedComponent = () => {
  const { role } = useTokenInfo();
  
  return (
    <div>
      {role === 'admin' && <AdminPanel />}
      {role === 'lawyer' && <LawyerDashboard />}
      {role === 'client' && <ClientDashboard />}
    </div>
  );
};
```

### API Requests with User Context
```tsx
import { useTokenInfo } from '../hooks/useTokenDetails';
import TokenUtils from '../services/tokenUtils';

const fetchUserData = async () => {
  const userId = TokenUtils.getUserId();
  const authToken = TokenUtils.getAuthToken();
  
  const response = await fetch(`/api/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
};
```

### Conditional Navigation
```tsx
import TokenUtils from '../services/tokenUtils';

const NavigationComponent = () => {
  const isAdmin = TokenUtils.isAdmin();
  const isLawyer = TokenUtils.isLawyer();
  const isClient = TokenUtils.isClient();
  
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {isAdmin && <Link to="/admin">Admin Panel</Link>}
      {isLawyer && <Link to="/cases">My Cases</Link>}
      {isClient && <Link to="/appointments">My Appointments</Link>}
    </nav>
  );
};
```

## Data Persistence

Token details are automatically:
- Stored in localStorage when user logs in
- Retrieved when the application initializes
- Cleared when user logs out
- Validated against the server on app startup

## Security Notes

- Token details are stored in localStorage and should not contain sensitive information
- The actual JWT token is stored separately and used for API authentication
- Token validation occurs on app initialization to ensure data integrity
