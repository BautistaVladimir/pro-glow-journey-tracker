import { AuthUser, LoginCredentials, RegisterData } from '@/types/auth';
import { localDB } from './localDatabase';

// Simple password hashing (in production, use proper crypto)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo purposes - use proper crypto in production
  return btoa(password + 'proglo_salt');
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

const localAuthService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const user = await localDB.getUserByEmail(credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (!user.passwordHash || !verifyPassword(credentials.password, user.passwordHash)) {
      throw new Error('Invalid password');
    }
    
    // Remove password hash from returned user
    const { passwordHash, ...userWithoutPassword } = user;
    await localDB.setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  },

  // Register new user
  register: async (data: RegisterData): Promise<AuthUser> => {
    // Check if user already exists
    const existingUser = await localDB.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = await localDB.addUser({
      name: data.name,
      email: data.email,
      role: data.role || 'user',
      passwordHash: hashPassword(data.password),
      avatar: null,
      height: null,
      weight: null,
      gender: null,
      age: null
    });

    // Remove password hash from returned user
    const { passwordHash, ...userWithoutPassword } = newUser;
    await localDB.setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await localDB.setCurrentUser(null);
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthUser | null> => {
    return await localDB.getCurrentUser();
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const user = await localDB.getCurrentUser();
    return !!user;
  },

  // Update user profile
  updateUserProfile: async (userData: Partial<AuthUser>): Promise<AuthUser> => {
    const currentUser = await localDB.getCurrentUser();
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const updatedUser = await localDB.updateUser(currentUser.id, userData);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    await localDB.setCurrentUser(updatedUser);
    return updatedUser;
  }
};

export default localAuthService;