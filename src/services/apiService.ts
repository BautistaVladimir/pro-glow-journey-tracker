
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/auth';

// API service using Supabase
const apiService = {
  // User profile
  getUserProfile: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.session.user.id)
        .single();
      
      if (error) throw error;
      return { users: [data] };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  updateUserProfile: async (userData: Partial<AuthUser>) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', session.session.user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  // Admin user management
  getUsers: async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  getUser: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
      
      // Admin function to delete user from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  
  updateUser: async (userId: string, userData: Partial<AuthUser>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  
  // BMI
  getBMIHistory: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bmi')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching BMI history:', error);
      throw error;
    }
  },
  
  saveBMI: async (bmiData: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('bmi')
        .insert({
          ...bmiData,
          user_id: session.session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving BMI:', error);
      throw error;
    }
  },
  
  // Activities
  getActivities: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },
  
  saveActivity: async (activityData: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('activities')
        .insert({
          ...activityData,
          user_id: session.session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving activity:', error);
      throw error;
    }
  },
  
  // Nutrition
  getNutrition: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('nutrition')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      throw error;
    }
  },
  
  saveNutrition: async (nutritionData: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('nutrition')
        .insert({
          ...nutritionData,
          user_id: session.session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving nutrition data:', error);
      throw error;
    }
  },
  
  // Sleep
  getSleep: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('sleep')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching sleep data:', error);
      throw error;
    }
  },
  
  saveSleep: async (sleepData: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('sleep')
        .insert({
          ...sleepData,
          user_id: session.session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving sleep data:', error);
      throw error;
    }
  },
  
  // Goals
  getGoals: async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', session.session.user.id);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  },
  
  saveGoal: async (goalData: any) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('goals')
        .insert({
          ...goalData,
          user_id: session.session.user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  },
};

export default apiService;
