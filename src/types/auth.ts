
// User and authentication related types

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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthContextType {
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
