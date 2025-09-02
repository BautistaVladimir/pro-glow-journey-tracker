import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthUser, UserRole, AuthContextType } from '@/types/auth';
import localAuthService from '@/services/localAuthService';
import { localDB } from '@/services/localDatabase';

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
        const userData = await localAuthService.getCurrentUser();
        setUser(userData);
        
        // For admin users, fetch user list
        if (userData?.role === 'admin') {
          const allUsers = await localDB.getUsers();
          setUsers(allUsers);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await localAuthService.login({ email, password });
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
      const newUser = await localAuthService.register({ name, email, password, role });
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
      await localAuthService.logout();
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
      const updatedUser = await localAuthService.updateUserProfile(userData);
      
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
      const newUser = await localDB.addUser({
        name,
        email,
        role,
        passwordHash: btoa(password + 'proglo_salt'), // Simple hash for demo
        avatar: null,
        height: null,
        weight: null,
        gender: null,
        age: null
      });
      
      const { passwordHash, ...userWithoutPassword } = newUser;
      setUsers([...users, userWithoutPassword]);
      
      toast({
        title: "User Created",
        description: `${name} has been added successfully`,
      });
      
      return userWithoutPassword;
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
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      // Update local storage (remove user from all data)
      const allUsers = await localDB.getUsers();
      const filteredUsers = allUsers.filter(u => u.id !== userId);
      await localDB['setData']('proglo_users', filteredUsers);
      
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
      const updatedUser = await localDB.updateUser(userId, userData);
      
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      // Update users list
      const updatedUsers = users.map(u => (
        u.id === userId ? { ...u, ...updatedUser } : u
      ));
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
