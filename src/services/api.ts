
import { API_URL, SANCTUM_COOKIE_ENDPOINT, ENDPOINTS } from "@/config/api";

/**
 * Response interface for API calls
 */
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

/**
 * API service for Laravel 11 backend
 */
export const api = {
  // Endpoints reference for convenient access
  endpoints: ENDPOINTS,
  
  // Fetch CSRF token from Laravel Sanctum
  async getCsrfToken(): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}${SANCTUM_COOKIE_ENDPOINT}`, {
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
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while fetching data',
        status: 500
      };
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
      return { data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while posting data',
        status: 500
      };
    }
  },
  
  // Generic PUT request
  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      await this.getCsrfToken();

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while updating data',
        status: 500
      };
    }
  },
  
  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      await this.getCsrfToken();

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while deleting data',
        status: 500
      };
    }
  }
};
