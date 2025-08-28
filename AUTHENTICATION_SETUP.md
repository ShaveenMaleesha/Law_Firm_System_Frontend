# Authentication Setup Guide

This guide explains how the authentication system has been integrated with your Law Firm Management System.

## Overview

The authentication system now supports three user types:
- **Admin**: Complete system access
- **Client**: Limited to client-specific features
- **Lawyer**: Access to lawyer-specific features

## Backend Integration

The frontend is configured to work with your backend authentication routes:

### API Endpoints
- `POST /api/auth/admin/register` - Admin registration
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/client/register` - Client registration
- `POST /api/auth/client/login` - Client login
- `POST /api/auth/lawyer/register` - Lawyer registration
- `POST /api/auth/lawyer/login` - Lawyer login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/change-password` - Change password

## Configuration

1. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Backend URL**
   Update the `VITE_API_URL` to match your backend server URL.

## New Routes

### Authentication Routes
- `/signin` - Universal login page for all user types
- `/signup/admin` - Admin registration
- `/signup/client` - Client registration  
- `/signup/lawyer` - Lawyer registration

### Protected Routes
- `/` - Admin dashboard (protected, admin only)
- `/client/*` - Client dashboard and pages (protected, client only)
- `/lawyer/*` - Lawyer dashboard and pages (protected, lawyer only)

## Features

### 1. Universal Login
- Single login page with user type selection (Admin, Client, Lawyer)
- Different field requirements based on user type:
  - **Admin/Client**: Username + Password
  - **Lawyer**: Email + Password

### 2. Role-based Registration
- Separate registration forms for each user type
- **Admin**: Username, Password
- **Client**: Name, Username, Email, Contact Number, Address, Password
- **Lawyer**: Name, Email, Contact Number, Practice Area, Address, Password

### 3. Protected Routes
- Automatic role-based redirection
- Authentication state management
- Token validation and refresh

### 4. User Management
- JWT token storage
- Automatic logout on token expiration
- User profile access

## Usage Examples

### Making Authenticated API Calls
```tsx
import { useAuthenticatedRequest } from '../hooks/useAuthenticatedRequest';

const MyComponent = () => {
  const { makeRequest, authService } = useAuthenticatedRequest();

  const fetchData = async () => {
    try {
      const response = await makeRequest(() => 
        authService.getProfile()
      );
      console.log(response.user);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <button onClick={fetchData}>
      Fetch User Data
    </button>
  );
};
```

### Using User Information
```tsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.username}!</h1>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Components

### Available Components
- `<UserInfo />` - Displays current user information
- `<LogoutButton />` - Logout functionality
- `<ProtectedRoute>` - Route protection wrapper

### Using Components
```tsx
import { UserInfo } from '../components/auth/UserInfo';
import { LogoutButton } from '../components/auth/LogoutButton';

const Header = () => (
  <div className="flex justify-between items-center">
    <UserInfo />
    <LogoutButton />
  </div>
);
```

## Error Handling

The system includes comprehensive error handling:
- Network errors
- Authentication failures
- Token expiration
- Role-based access control

## Security Features

- JWT token validation
- Automatic token cleanup on logout
- Protected route enforcement
- Role-based access control
- Secure password handling

## Testing the Integration

1. Start your backend server
2. Start the frontend: `npm run dev`
3. Navigate to `/signin`
4. Test registration with different user types
5. Test login functionality
6. Verify role-based redirections

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `VITE_API_URL` in `.env`
   - Verify backend server is running
   - Check CORS configuration on backend

2. **Authentication Failures**
   - Verify JWT secret matches between frontend/backend
   - Check token expiration settings
   - Validate API endpoint paths

3. **Role Redirection Issues**
   - Verify user roles in backend response
   - Check protected route configurations
   - Validate role-based logic

## Next Steps

1. **Customize UI**: Modify the authentication forms to match your design
2. **Add Features**: Implement password reset, email verification
3. **Enhance Security**: Add rate limiting, session management
4. **User Management**: Build admin panels for user administration

For additional help, refer to the individual component files and service implementations.
