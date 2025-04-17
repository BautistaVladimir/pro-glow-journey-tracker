import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Types
export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  height?: number; // cm
  weight?: number; // kg
  gender?: string;
  age?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  users: AuthUser[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<AuthUser>) => void;
  addUser: (name: string, email: string, password: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
  updateUser: (userId: string, userData: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (would be replaced with actual backend)
const MOCK_USERS: AuthUser[] = [
  {
    id: '1',
    email: 'admin@proglo.com',
    name: 'Admin User',
    role: 'admin',
    avatar: null,
    height: 180,
    weight: 75,
    gender: 'not specified',
    age: 35,
  },
  {
    id: '2',
    email: 'user@proglo.com',
    name: 'Test User',
    role: 'user',
    avatar: null,
    height: 175,
    weight: 70,
    gender: 'not specified',
    age: 30,
  },
];

// Mock passwords (in a real app these would be hashed and stored securely in a database)
const MOCK_PASSWORDS: Record<string, string> = {
  'admin@proglo.com': 'admin123',
  'user@proglo.com': 'user123',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>(MOCK_USERS);
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
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser || MOCK_PASSWORDS[email.toLowerCase()] !== password) {
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
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast({
        title: "Registration Failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error('Email already in use');
    }
    
    const newUser: AuthUser = {
      id: String(users.length + 1),
      email: email.toLowerCase(),
      name,
      role,
      avatar: null,
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    MOCK_PASSWORDS[email.toLowerCase()] = password;
    
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
    
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...userData } : u
    );
    setUsers(updatedUsers);
    
    localStorage.setItem('proglo-auth', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  // Admin functions for user management
  const addUser = (name: string, email: string, password: string, role: UserRole = 'user') => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast({
        title: "User Creation Failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error('Email already in use');
    }
    
    const newUser: AuthUser = {
      id: String(users.length + 1),
      email: email.toLowerCase(),
      name,
      role,
      avatar: null,
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    MOCK_PASSWORDS[email.toLowerCase()] = password;
    
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
    
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    
    if (userToDelete.email in MOCK_PASSWORDS) {
      delete MOCK_PASSWORDS[userToDelete.email];
    }
  };
  
  const updateUser = (userId: string, userData: Partial<AuthUser>) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...userData } : u
    );
    
    setUsers(updatedUsers);
    
    if (user && userId === user.id) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('proglo-auth', JSON.stringify(updatedUser));
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
