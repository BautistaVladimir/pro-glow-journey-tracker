import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthUser, UserRole, AuthContextType } from '@/types/auth';
import authService from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for stored auth on mount and set up auth state listener
  useEffect(() => {
    // Set up auth state listener to keep the user state updated
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setLoading(true);
        
        if (session?.user) {
          try {
            // Use setTimeout to prevent Supabase auth callback deadlocks
            setTimeout(async () => {
              const userData = await authService.getCurrentUser();
              setUser(userData);
              setLoading(false);
            }, 0);
          } catch (error) {
            console.error('Error getting user data:', error);
            setUser(null);
            setLoading(false);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );
    
    // Get initial session
    const initAuth = async () => {
      setLoading(true);
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        // For admin users, fetch user list
        if (userData?.role === 'admin') {
          const { data } = await supabase.from('users').select('*');
          if (data) {
            setUsers(data as AuthUser[]);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authService.login({ email, password });
      setUser(loggedInUser);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      navigate('/');
      return loggedInUser;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || 'Invalid email or password',
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    try {
      const newUser = await authService.register({ name, email, password, role });
      setUser(newUser);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created",
      });
      
      navigate('/');
      return newUser;
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || 'Registration failed',
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      navigate('/login');
    }
  };
  
  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
    if (!user) return;
    
    try {
      const updatedUser = await authService.updateUserProfile(userData);
      
      setUser(updatedUser);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      
      return updatedUser;
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || 'Failed to update profile',
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  // Admin functions for user management
  const addUser = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name, role }
      });
      
      if (error) throw error;
      
      const newUser = {
        id: data.user.id,
        name,
        email,
        role,
        avatar: null
      } as AuthUser;
      
      setUsers([...users, newUser]);
      
      toast({
        title: "User Created",
        description: `${name} has been added successfully`,
      });
      
      return newUser;
    } catch (error: any) {
      toast({
        title: "User Creation Failed",
        description: error.message || 'Failed to create user',
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  const deleteUser = async (userId: string) => {
    if (user && userId === user.id) {
      toast({
        title: "Deletion Failed",
        description: "Cannot delete your own account while logged in",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
      
      // Also delete from auth (requires admin privileges)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authError) throw authError;
      
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.message || 'Failed to delete user',
        variant: "destructive",
      });
    }
  };
  
  const updateUser = async (userId: string, userData: Partial<AuthUser>) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update auth user metadata if name or role changed
      if (userData.name || userData.role) {
        const { error: authError } = await supabase.auth.admin.updateUserById(
          userId,
          { user_metadata: { name: userData.name, role: userData.role } }
        );
        
        if (authError) throw authError;
      }
      
      // Get updated user data
      const { data: updatedUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      // Update users list
      const updatedUsers = users.map(u => (
        u.id === userId ? { ...u, ...updatedUser } as AuthUser : u
      ));
      setUsers(updatedUsers);
      
      // If this is the current user, update that too
      if (user && userId === user.id) {
        setUser({ ...user, ...updatedUser } as AuthUser);
      }
      
      toast({
        title: "User Updated",
        description: "User has been updated successfully",
      });
      
      return updatedUser as AuthUser;
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || 'Failed to update user',
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
