
import { API_URL } from "@/config/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  // Fetch CSRF token
  async getCsrfToken(): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include'
      });
      
      return response.ok ? 'Token fetched successfully' : null;
    } catch (error) {
      console.error('CSRF Token Error:', error);
      return null;
    }
  },

  // Generic GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: 'An error occurred while fetching data' };
    }
  },

  // Generic POST request
  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      // Ensure CSRF token is fetched before making the request
      await this.getCsrfToken();

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Important for Laravel
        },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: error instanceof Error ? error.message : 'An error occurred while posting data' };
    }
  }
};
