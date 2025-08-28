import authService, { TokenDetails } from './authService';

/**
 * Token utility functions for easy access to token details
 */
export class TokenUtils {
  /**
   * Get current token details
   * @returns TokenDetails or null if not logged in
   */
  static getTokenDetails(): TokenDetails | null {
    return authService.getTokenDetails();
  }

  /**
   * Get current user ID from token
   * @returns User ID string or null
   */
  static getUserId(): string | null {
    const tokenDetails = this.getTokenDetails();
    return tokenDetails?.userId || null;
  }

  /**
   * Get current user role from token
   * @returns User role or null
   */
  static getUserRole(): 'admin' | 'client' | 'lawyer' | null {
    const tokenDetails = this.getTokenDetails();
    return tokenDetails?.role || null;
  }

  /**
   * Get current username from token
   * @returns Username string or null
   */
  static getUsername(): string | null {
    const tokenDetails = this.getTokenDetails();
    return tokenDetails?.username || null;
  }

  /**
   * Get current user email from token
   * @returns Email string or null
   */
  static getUserEmail(): string | null {
    const tokenDetails = this.getTokenDetails();
    return tokenDetails?.email || null;
  }

  /**
   * Check if user has specific role
   * @param role Role to check against
   * @returns Boolean indicating if user has the role
   */
  static hasRole(role: 'admin' | 'client' | 'lawyer'): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  /**
   * Check if user is admin
   * @returns Boolean indicating if user is admin
   */
  static isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Check if user is client
   * @returns Boolean indicating if user is client
   */
  static isClient(): boolean {
    return this.hasRole('client');
  }

  /**
   * Check if user is lawyer
   * @returns Boolean indicating if user is lawyer
   */
  static isLawyer(): boolean {
    return this.hasRole('lawyer');
  }

  /**
   * Get token for API requests
   * @returns JWT token string or null
   */
  static getAuthToken(): string | null {
    return authService.getToken();
  }

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  static isAuthenticated(): boolean {
    return authService.isAuthenticated() && this.getTokenDetails() !== null;
  }
}

export default TokenUtils;
