
import supabase from './supabaseClient';
import { AuthUser, LoginCredentials, RegisterData } from '@/types/auth';

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

// Map Supabase user data to our AuthUser type
const mapSupabaseUser = (user: any, profile?: any): AuthUser => {
  return {
    id: user.id,
    email: user.email || '',
    name: profile?.name || user.user_metadata?.name || '',
    role: profile?.role || user.user_metadata?.role || 'user',
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url || null,
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
      // Check if Supabase is configured
      if (!supabase || !supabase.auth) {
        console.warn('Supabase not configured. Using mock data for development.');
        const mockUser = generateMockUser({ 
          email: credentials.email, 
          name: credentials.email.split('@')[0],
          role: credentials.email.includes('admin') ? 'admin' : 'user'
        });
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) throw error;
      
      // Fetch user profile from profiles table
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      const user = mapSupabaseUser(data.user, profileData);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  },
  
  // Register new user
  register: async (data: RegisterData): Promise<AuthUser> => {
    try {
      // Check if Supabase is configured
      if (!supabase || !supabase.auth) {
        console.warn('Supabase not configured. Using mock data for development.');
        const mockUser = generateMockUser({ 
          email: data.email, 
          name: data.name,
          role: data.role || 'user'
        });
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }

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
      
      // Create profile record in profiles table
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          name: data.name,
          email: data.email,
          role: data.role || 'user',
        });
      
      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
      
      const user = mapSupabaseUser(authData.user, {
        name: data.name,
        role: data.role || 'user'
      });
      
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw error;
    }
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    try {
      if (supabase && supabase.auth) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
    }
  },
  
  // Get current user from localStorage or Supabase session
  getCurrentUser: async (): Promise<AuthUser | null> => {
    try {
      // Check if Supabase is configured
      if (!supabase || !supabase.auth) {
        const userJSON = localStorage.getItem('user');
        if (!userJSON) return null;
        try {
          return JSON.parse(userJSON);
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          return null;
        }
      }
      
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
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    if (!supabase || !supabase.auth) {
      return !!localStorage.getItem('user');
    }
    
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },
  
  // Get auth token
  getToken: async (): Promise<string | null> => {
    if (!supabase || !supabase.auth) {
      return null;
    }
    
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  },
  
  // Refresh user data from Supabase
  refreshUserData: async (): Promise<AuthUser> => {
    try {
      if (!supabase || !supabase.auth) {
        const storedUser = await authService.getCurrentUser();
        if (!storedUser) {
          throw new Error('No stored user data available');
        }
        return storedUser;
      }
      
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
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateUserProfile: async (userData: Partial<AuthUser>): Promise<AuthUser> => {
    try {
      if (!supabase || !supabase.auth) {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          throw new Error('No user data available');
        }
        
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      
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
      
      // Update profile in profiles table
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
