
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
  passwordHash?: string;
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
  loading: boolean; // Added loading state
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<AuthUser>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<AuthUser | undefined>;
  addUser: (name: string, email: string, password: string, role: UserRole) => Promise<AuthUser | undefined>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, userData: Partial<AuthUser>) => Promise<AuthUser | undefined>;
}
