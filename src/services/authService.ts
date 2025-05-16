
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, LoginCredentials, RegisterData } from '@/types/auth';

// Map Supabase user data to our AuthUser type
const mapSupabaseUser = (user: any, profile?: any): AuthUser => {
  return {
    id: user.id,
    email: user.email || '',
    name: profile?.name || user.user_metadata?.name || '',
    role: profile?.role || user.user_metadata?.role || 'user',
    avatar: profile?.avatar || user.user_metadata?.avatar_url || null,
    height: profile?.height || user.user_metadata?.height || null,
    weight: profile?.weight || user.user_metadata?.weight || null,
    gender: profile?.gender || user.user_metadata?.gender || null,
    age: profile?.age || user.user_metadata?.age || null
  };
};

const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) throw error;
      
      // Fetch user profile from users table
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      const user = mapSupabaseUser(data.user, profileData);
      return user;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  },
  
  // Register new user
  register: async (data: RegisterData): Promise<AuthUser> => {
    try {
      // Register user with Supabase Auth
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role || 'user'
          }
        }
      });
      
      if (error) throw error;
      
      if (!authData.user) {
        throw new Error('User registration failed');
      }
      
      // The user profile will be created by the database trigger we set up
      
      // Wait a moment for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the profile that was created by the trigger
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();
      
      const user = mapSupabaseUser(authData.user, profileData);
      return user;
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw error;
    }
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  // Get current user from Supabase session
  getCurrentUser: async (): Promise<AuthUser | null> => {
    try {
      // Get session from Supabase
      const { data } = await supabase.auth.getSession();
      
      if (!data.session || !data.session.user) {
        return null;
      }
      
      // Get user profile
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
      
      const user = mapSupabaseUser(data.session.user, profileData);
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },
  
  // Get auth token
  getToken: async (): Promise<string | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  },
  
  // Refresh user data from Supabase
  refreshUserData: async (): Promise<AuthUser> => {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        throw error || new Error('User not found');
      }
      
      // Get user profile
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      const user = mapSupabaseUser(data.user, profileData);
      return user;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateUserProfile: async (userData: Partial<AuthUser>): Promise<AuthUser> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session || !sessionData.session.user) {
        throw new Error('No authenticated user');
      }
      
      const userId = sessionData.session.user.id;
      
      // Update auth metadata if name is changing
      if (userData.name) {
        await supabase.auth.updateUser({
          data: { name: userData.name }
        });
      }
      
      // Update profile in users table
      const { error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          height: userData.height,
          weight: userData.weight,
          gender: userData.gender,
          age: userData.age,
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Get updated user data
      return authService.refreshUserData();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

export default authService;
