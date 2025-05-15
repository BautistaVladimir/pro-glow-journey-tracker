
import supabase from './supabaseClient';

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
 * API service using Supabase
 */
export const api = {
  // Generic GET request
  async get<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase.from(path).select('*');
      
      if (error) {
        throw new Error(error.message || 'Network response was not ok');
      }
      
      // Use type assertion to handle the generic type properly
      return { data: data as T, status: 200 };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while fetching data',
        status: 500
      };
    }
  },

  // Generic POST request
  async post<T>(path: string, body: any): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(path)
        .insert(body)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message || 'Network response was not ok');
      }
      
      // Use type assertion to handle the generic type properly
      return { data: data as T, status: 201 };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while posting data',
        status: 500
      };
    }
  },
  
  // Generic PUT request
  async put<T>(path: string, id: string, body: any): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(path)
        .update(body)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message || 'Network response was not ok');
      }
      
      // Use type assertion to handle the generic type properly
      return { data: data as T, status: 200 };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while updating data',
        status: 500
      };
    }
  },
  
  // Generic DELETE request
  async delete<T>(path: string, id: string): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(path)
        .delete()
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message || 'Network response was not ok');
      }
      
      // Use type assertion to handle the generic type properly
      return { data: data as T, status: 200 };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'An error occurred while deleting data',
        status: 500
      };
    }
  }
};
