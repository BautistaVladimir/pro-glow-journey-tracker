
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AuthUser, UserRole, AuthContextType } from '@/types/auth';
import { mockAuthService } from '@/services/mockAuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>(mockAuthService.getUsers());
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for stored auth on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('proglo-auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (error) {
        console.error('Failed to parse stored auth', error);
        localStorage.removeItem('proglo-auth');
      }
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    const foundUser = mockAuthService.getUserByEmail(email);
    
    if (!foundUser || !mockAuthService.validateCredentials(email, password)) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
    
    setUser(foundUser);
    localStorage.setItem('proglo-auth', JSON.stringify(foundUser));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${foundUser.name}!`,
    });
    
    navigate('/');
  };
  
  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    if (mockAuthService.getUserByEmail(email)) {
      toast({
        title: "Registration Failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error('Email already in use');
    }
    
    const newUser = mockAuthService.createUser(name, email, password, role);
    
    setUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem('proglo-auth', JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created",
    });
    
    navigate('/');
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('proglo-auth');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };
  
  // Update user profile
  const updateUserProfile = (userData: Partial<AuthUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    const updatedUserData = mockAuthService.updateUser(user.id, userData);
    if (updatedUserData) {
      const updatedUsers = users.map(u => u.id === user.id ? updatedUserData : u);
      setUsers(updatedUsers);
      
      localStorage.setItem('proglo-auth', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    }
  };
  
  // Admin functions for user management
  const addUser = (name: string, email: string, password: string, role: UserRole = 'user') => {
    if (mockAuthService.getUserByEmail(email)) {
      toast({
        title: "User Creation Failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error('Email already in use');
    }
    
    const newUser = mockAuthService.createUser(name, email, password, role);
    setUsers([...users, newUser]);
    
    toast({
      title: "User Created",
      description: `${name} has been added successfully`,
    });
  };
  
  const deleteUser = (userId: string) => {
    if (user && userId === user.id) {
      toast({
        title: "Deletion Failed",
        description: "Cannot delete your own account while logged in",
        variant: "destructive",
      });
      return;
    }
    
    if (mockAuthService.deleteUser(userId)) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
    }
  };
  
  const updateUser = (userId: string, userData: Partial<AuthUser>) => {
    const updatedUser = mockAuthService.updateUser(userId, userData);
    if (updatedUser) {
      const updatedUsers = users.map(u => u.id === userId ? updatedUser : u);
      setUsers(updatedUsers);
      
      if (user && userId === user.id) {
        setUser(updatedUser);
        localStorage.setItem('proglo-auth', JSON.stringify(updatedUser));
      }
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
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
