import api from './api';

export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

export interface AdminRegisterData {
  username: string;
  password: string;
}

export interface ClientRegisterData {
  name: string;
  username: string;
  password: string;
  email: string;
  contactNo: string;
  address: string;
}

export interface LawyerRegisterData {
  name: string;
  email: string;
  password: string;
  practiceArea: string;
  address: string;
  contactNo: string;
}

export interface User {
  id: string;
  userId?: string;
  username?: string;
  name?: string;
  email?: string;
  role: 'admin' | 'client' | 'lawyer';
  practiceArea?: string;
  profilePicture?: string;
}

export interface TokenDetails {
  userId: string;
  role: 'admin' | 'client' | 'lawyer';
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

class AuthService {
  // Login methods
  async loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
  }

  async loginClient(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/client/login', credentials);
    return response.data;
  }

  async loginLawyer(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/lawyer/login', credentials);
    return response.data;
  }

  // Registration methods
  async registerAdmin(data: AdminRegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/admin/register', data);
    return response.data;
  }

  async registerClient(data: ClientRegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/client/register', data);
    return response.data;
  }

  async registerLawyer(data: LawyerRegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/lawyer/register', data);
    return response.data;
  }

  // Profile and utility methods
  async getProfile(): Promise<{ user: User }> {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  // Token management
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setTokenDetails(tokenDetails: TokenDetails): void {
    localStorage.setItem('tokenDetails', JSON.stringify(tokenDetails));
  }

  getTokenDetails(): TokenDetails | null {
    const tokenData = localStorage.getItem('tokenDetails');
    return tokenData ? JSON.parse(tokenData) : null;
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenDetails');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
