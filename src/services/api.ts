
import { API_URL } from "@/config/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
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
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: 'An error occurred while posting data' };
    }
  }
};

