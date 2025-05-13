
import axios from 'axios';
import { API_URL } from '@/config/api';
import { LoginCredentials, RegisterData, AuthUser } from '@/types/auth';

// Create axios instance with baseURL
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Remove withCredentials to fix CORS issues
  // withCredentials: true,
});

// Add interceptor to add token to every request
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token expiration
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If there's no error response, don't try to access status
    if (!error.response) {
      console.error('Network error or CORS issue:', error.message);
      return Promise.reject(error);
    }
    
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const response = await authAxios.post('/auth/refresh');
        const { token } = response.data;
        
        // Store new token
        localStorage.setItem('auth-token', token);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// For development/testing - generate mock user data
const generateMockUser = (userData: Partial<AuthUser> & { password?: string }): AuthUser => {
  const { password, ...userWithoutPassword } = userData;
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    email: userData.email || 'user@example.com',
    name: userData.name || 'Test User',
    role: userData.role || 'user',
    avatar: null,
    ...userWithoutPassword
  };
};

// Generate a mock token
const generateMockToken = (user: AuthUser): string => {
  return `mock-token-${user.id}-${Date.now()}`;
};

const authService = {
  // Login user and store token
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    try {
      const response = await authAxios.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      // If we get a 404, it means the route doesn't exist (API not set up yet)
      if (error.response?.status === 404) {
        console.warn('API route not found. Using mock data for development.');
        
        // Create mock user and token for development
        const mockUser = generateMockUser({ 
          email: credentials.email, 
          name: credentials.email.split('@')[0],
          role: credentials.email.includes('admin') ? 'admin' : 'user'
        });
        const mockToken = generateMockToken(mockUser);
        
        localStorage.setItem('auth-token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return mockUser;
      }
      
      // Better error handling
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials or network connection.';
      console.error('Login error:', errorMsg, error);
      throw error;
    }
  },
  
  // Register new user
  register: async (data: RegisterData): Promise<AuthUser> => {
    try {
      const response = await authAxios.post('/auth/register', data);
      const { token, user } = response.data;
      
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      // If we get a 404, it means the route doesn't exist (API not set up yet)
      if (error.response?.status === 404) {
        console.warn('API route not found. Using mock data for development.');
        
        // Create mock user and token for development
        const mockUser = generateMockUser({ 
          email: data.email, 
          name: data.name,
          role: data.role || 'user'
        });
        const mockToken = generateMockToken(mockUser);
        
        localStorage.setItem('auth-token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return mockUser;
      }
      
      // Better error handling
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again later.';
      console.error('Registration error:', errorMsg, error);
      throw error;
    }
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    try {
      await authAxios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
    }
  },
  
  // Get current user from token
  getCurrentUser: (): AuthUser | null => {
    const userJSON = localStorage.getItem('user');
    if (!userJSON) return null;
    
    try {
      return JSON.parse(userJSON);
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth-token');
  },
  
  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('auth-token');
  },
  
  // Refresh user data from server
  refreshUserData: async (): Promise<AuthUser> => {
    try {
      const response = await authAxios.get('/auth/user');
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      // If we get a 404, it means the route doesn't exist (API not set up yet)
      if (error.response?.status === 404) {
        console.warn('API route not found. Using stored user data.');
        const storedUser = authService.getCurrentUser();
        
        if (!storedUser) {
          throw new Error('No stored user data available');
        }
        
        return storedUser;
      }
      
      console.error('Error refreshing user data:', error);
      throw error;
    }
  },
};

export default authService;
export { authAxios };
