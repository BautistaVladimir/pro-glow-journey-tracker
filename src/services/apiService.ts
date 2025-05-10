
import { authAxios } from './authService';
import { ENDPOINTS } from '@/config/api';
import { AuthUser } from '@/types/auth';

// Generic API service for handling all other API calls
const apiService = {
  // User profile
  getUserProfile: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  updateUserProfile: async (data: any) => {
    try {
      const response = await authAxios.put(ENDPOINTS.USER.UPDATE, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  // Admin user management
  getUsers: async () => {
    try {
      const response = await authAxios.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  getUser: async (userId: string) => {
    try {
      const response = await authAxios.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  
  createUser: async (userData: any) => {
    try {
      const response = await authAxios.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  updateUser: async (userId: string, userData: Partial<AuthUser>) => {
    try {
      const response = await authAxios.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string) => {
    try {
      const response = await authAxios.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  
  // BMI
  getBMIHistory: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.BMI);
      return response.data;
    } catch (error) {
      console.error('Error fetching BMI history:', error);
      throw error;
    }
  },
  
  saveBMI: async (bmiData: any) => {
    try {
      const response = await authAxios.post(ENDPOINTS.BMI, bmiData);
      return response.data;
    } catch (error) {
      console.error('Error saving BMI:', error);
      throw error;
    }
  },
  
  // Activities
  getActivities: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.ACTIVITIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },
  
  saveActivity: async (activityData: any) => {
    try {
      const response = await authAxios.post(ENDPOINTS.ACTIVITIES, activityData);
      return response.data;
    } catch (error) {
      console.error('Error saving activity:', error);
      throw error;
    }
  },
  
  // Nutrition
  getNutrition: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.NUTRITION);
      return response.data;
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      throw error;
    }
  },
  
  saveNutrition: async (nutritionData: any) => {
    try {
      const response = await authAxios.post(ENDPOINTS.NUTRITION, nutritionData);
      return response.data;
    } catch (error) {
      console.error('Error saving nutrition data:', error);
      throw error;
    }
  },
  
  // Sleep
  getSleep: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.SLEEP);
      return response.data;
    } catch (error) {
      console.error('Error fetching sleep data:', error);
      throw error;
    }
  },
  
  saveSleep: async (sleepData: any) => {
    try {
      const response = await authAxios.post(ENDPOINTS.SLEEP, sleepData);
      return response.data;
    } catch (error) {
      console.error('Error saving sleep data:', error);
      throw error;
    }
  },
  
  // Goals
  getGoals: async () => {
    try {
      const response = await authAxios.get(ENDPOINTS.GOALS);
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  },
  
  saveGoal: async (goalData: any) => {
    try {
      const response = await authAxios.post(ENDPOINTS.GOALS, goalData);
      return response.data;
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  },
};

export default apiService;
