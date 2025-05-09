
import { AuthUser, UserRole } from '@/types/auth';

// Mock user database (would be replaced with actual backend)
export const MOCK_USERS: AuthUser[] = [
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
export const MOCK_PASSWORDS: Record<string, string> = {
  'admin@proglo.com': 'admin123',
  'user@proglo.com': 'user123',
};

// This service would be replaced with actual API calls in production
export const mockAuthService = {
  getUsers: () => MOCK_USERS,
  
  getUserByEmail: (email: string) => {
    return MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  
  validateCredentials: (email: string, password: string) => {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user && MOCK_PASSWORDS[email.toLowerCase()] === password;
  },
  
  createUser: (name: string, email: string, password: string, role: UserRole = 'user') => {
    const newUser: AuthUser = {
      id: String(MOCK_USERS.length + 1),
      email: email.toLowerCase(),
      name,
      role,
      avatar: null,
    };
    
    MOCK_USERS.push(newUser);
    MOCK_PASSWORDS[email.toLowerCase()] = password;
    
    return newUser;
  },
  
  deleteUser: (userId: string) => {
    const index = MOCK_USERS.findIndex(u => u.id === userId);
    if (index !== -1) {
      const email = MOCK_USERS[index].email;
      MOCK_USERS.splice(index, 1);
      delete MOCK_PASSWORDS[email];
      return true;
    }
    return false;
  },
  
  updateUser: (userId: string, userData: Partial<AuthUser>) => {
    const index = MOCK_USERS.findIndex(u => u.id === userId);
    if (index !== -1) {
      MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData };
      return MOCK_USERS[index];
    }
    return null;
  },
};
