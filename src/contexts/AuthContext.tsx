
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthUser, UserRole, AuthContextType } from '@/types/auth';
import authService from '@/services/authService';
import apiService from '@/services/apiService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for stored auth on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Check if user is logged in
        if (authService.isAuthenticated()) {
          // Get user data from localStorage first for quick UI update
          const storedUser = authService.getCurrentUser();
          if (storedUser) {
            setUser(storedUser);
          }
          
          // Then refresh from server
          try {
            const freshUserData = await authService.refreshUserData();
            setUser(freshUserData);
          } catch (error) {
            // If refresh fails, logout
            await logout();
          }
          
          // For admin users, fetch all users
          if (storedUser?.role === 'admin') {
            try {
              const response = await apiService.getUserProfile();
              if (response.users) {
                setUsers(response.users);
              }
            } catch (error) {
              console.error('Failed to fetch users list:', error);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
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
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      
      toast({
        title: "Login Failed",
        description: errorMessage,
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
      const errorMessage = error.response?.data?.message || 'Registration failed';
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
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
      // Even if the server request fails, clear local storage
      authService.logout();
      setUser(null);
      navigate('/login');
    }
  };
  
  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
    if (!user) return;
    
    try {
      const updatedUser = await apiService.updateUserProfile({ ...userData, id: user.id });
      
      setUser({ ...user, ...updatedUser });
      
      // Update users array if this user exists there
      if (users.some(u => u.id === user.id)) {
        setUsers(users.map(u => u.id === user.id ? { ...u, ...updatedUser } : u));
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      
      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  };
  
  // Admin functions for user management - these would connect to your Laravel API endpoints
  const addUser = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    // This would be implemented to call your admin API endpoint
    // For now we'll just use the register function but in reality would be a separate endpoint
    try {
      const newUser = await authService.register({ name, email, password, role });
      setUsers([...users, newUser]);
      
      toast({
        title: "User Created",
        description: `${name} has been added successfully`,
      });
      
      return newUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      
      toast({
        title: "User Creation Failed",
        description: errorMessage,
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
      // This would call your delete user API endpoint
      await apiService.deleteUser(userId);
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      
      toast({
        title: "Deletion Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  
  const updateUser = async (userId: string, userData: Partial<AuthUser>) => {
    try {
      // This would call your update user API endpoint
      const updatedUser = await apiService.updateUser(userId, userData);
      const updatedUsers = users.map(u => u.id === userId ? { ...u, ...updatedUser } : u);
      setUsers(updatedUsers);
      
      // If this is the current user, update that too
      if (user && userId === user.id) {
        setUser({ ...user, ...updatedUser });
      }
      
      toast({
        title: "User Updated",
        description: "User has been updated successfully",
      });
      
      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      
      toast({
        title: "Update Failed",
        description: errorMessage,
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
