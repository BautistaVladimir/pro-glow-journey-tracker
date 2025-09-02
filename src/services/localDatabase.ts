import { Preferences } from '@capacitor/preferences';
import { AuthUser } from '@/types/auth';

// Local storage keys
const STORAGE_KEYS = {
  USERS: 'proglo_users',
  CURRENT_USER: 'proglo_current_user',
  ACTIVITIES: 'proglo_activities',
  BMI_RECORDS: 'proglo_bmi_records',
  NUTRITION: 'proglo_nutrition',
  SLEEP: 'proglo_sleep',
  HYDRATION: 'proglo_hydration',
  GOALS: 'proglo_goals'
};

export interface Activity {
  id: string;
  user_id: string;
  type: string;
  duration: number;
  calories_burned: number;
  intensity: string;
  date: string;
  location?: { lat: number; lng: number; address?: string };
  photo?: string;
}

export interface BMIRecord {
  id: string;
  user_id: string;
  weight: number;
  height: number;
  bmi_value: number;
  category: string;
  date: string;
}

export interface NutritionEntry {
  id: string;
  user_id: string;
  food_name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  date: string;
  photo?: string;
}

export interface SleepRecord {
  id: string;
  user_id: string;
  hoursslept: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  date: string;
}

export interface HydrationRecord {
  id: string;
  user_id: string;
  amount: number;
  date: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  startvalue: number;
  currentvalue: number;
  targetvalue: number;
  unit: string;
  completed: boolean;
  deadline?: string;
}

class LocalDatabase {
  // Generic storage methods
  private async getData<T>(key: string): Promise<T[]> {
    try {
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return [];
    }
  }

  private async setData<T>(key: string, data: T[]): Promise<void> {
    try {
      await Preferences.set({ key, value: JSON.stringify(data) });
    } catch (error) {
      console.error(`Error setting data for key ${key}:`, error);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // User management
  async getUsers(): Promise<AuthUser[]> {
    return this.getData<AuthUser>(STORAGE_KEYS.USERS);
  }

  async addUser(user: Omit<AuthUser, 'id'>): Promise<AuthUser> {
    const users = await this.getUsers();
    const newUser: AuthUser = {
      ...user,
      id: this.generateId()
    };
    users.push(newUser);
    await this.setData(STORAGE_KEYS.USERS, users);
    return newUser;
  }

  async updateUser(userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> {
    const users = await this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    await this.setData(STORAGE_KEYS.USERS, users);
    return users[userIndex];
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    const users = await this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEYS.CURRENT_USER });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async setCurrentUser(user: AuthUser | null): Promise<void> {
    try {
      if (user) {
        await Preferences.set({ key: STORAGE_KEYS.CURRENT_USER, value: JSON.stringify(user) });
      } else {
        await Preferences.remove({ key: STORAGE_KEYS.CURRENT_USER });
      }
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  // Activities
  async getActivities(userId: string): Promise<Activity[]> {
    const activities = await this.getData<Activity>(STORAGE_KEYS.ACTIVITIES);
    return activities.filter(a => a.user_id === userId);
  }

  async addActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const activities = await this.getData<Activity>(STORAGE_KEYS.ACTIVITIES);
    const newActivity: Activity = {
      ...activity,
      id: this.generateId()
    };
    activities.push(newActivity);
    await this.setData(STORAGE_KEYS.ACTIVITIES, activities);
    return newActivity;
  }

  // BMI Records
  async getBMIRecords(userId: string): Promise<BMIRecord[]> {
    const records = await this.getData<BMIRecord>(STORAGE_KEYS.BMI_RECORDS);
    return records.filter(r => r.user_id === userId);
  }

  async addBMIRecord(record: Omit<BMIRecord, 'id'>): Promise<BMIRecord> {
    const records = await this.getData<BMIRecord>(STORAGE_KEYS.BMI_RECORDS);
    const newRecord: BMIRecord = {
      ...record,
      id: this.generateId()
    };
    records.push(newRecord);
    await this.setData(STORAGE_KEYS.BMI_RECORDS, records);
    return newRecord;
  }

  // Nutrition
  async getNutritionEntries(userId: string): Promise<NutritionEntry[]> {
    const entries = await this.getData<NutritionEntry>(STORAGE_KEYS.NUTRITION);
    return entries.filter(e => e.user_id === userId);
  }

  async addNutritionEntry(entry: Omit<NutritionEntry, 'id'>): Promise<NutritionEntry> {
    const entries = await this.getData<NutritionEntry>(STORAGE_KEYS.NUTRITION);
    const newEntry: NutritionEntry = {
      ...entry,
      id: this.generateId()
    };
    entries.push(newEntry);
    await this.setData(STORAGE_KEYS.NUTRITION, entries);
    return newEntry;
  }

  // Sleep
  async getSleepRecords(userId: string): Promise<SleepRecord[]> {
    const records = await this.getData<SleepRecord>(STORAGE_KEYS.SLEEP);
    return records.filter(r => r.user_id === userId);
  }

  async addSleepRecord(record: Omit<SleepRecord, 'id'>): Promise<SleepRecord> {
    const records = await this.getData<SleepRecord>(STORAGE_KEYS.SLEEP);
    const newRecord: SleepRecord = {
      ...record,
      id: this.generateId()
    };
    records.push(newRecord);
    await this.setData(STORAGE_KEYS.SLEEP, records);
    return newRecord;
  }

  // Hydration
  async getHydrationRecords(userId: string): Promise<HydrationRecord[]> {
    const records = await this.getData<HydrationRecord>(STORAGE_KEYS.HYDRATION);
    return records.filter(r => r.user_id === userId);
  }

  async addHydrationRecord(record: Omit<HydrationRecord, 'id'>): Promise<HydrationRecord> {
    const records = await this.getData<HydrationRecord>(STORAGE_KEYS.HYDRATION);
    const newRecord: HydrationRecord = {
      ...record,
      id: this.generateId()
    };
    records.push(newRecord);
    await this.setData(STORAGE_KEYS.HYDRATION, records);
    return newRecord;
  }

  // Goals
  async getGoals(userId: string): Promise<Goal[]> {
    const goals = await this.getData<Goal>(STORAGE_KEYS.GOALS);
    return goals.filter(g => g.user_id === userId);
  }

  async addGoal(goal: Omit<Goal, 'id'>): Promise<Goal> {
    const goals = await this.getData<Goal>(STORAGE_KEYS.GOALS);
    const newGoal: Goal = {
      ...goal,
      id: this.generateId()
    };
    goals.push(newGoal);
    await this.setData(STORAGE_KEYS.GOALS, goals);
    return newGoal;
  }

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<Goal | null> {
    const goals = await this.getData<Goal>(STORAGE_KEYS.GOALS);
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) return null;
    
    goals[goalIndex] = { ...goals[goalIndex], ...updates };
    await this.setData(STORAGE_KEYS.GOALS, goals);
    return goals[goalIndex];
  }
}

export const localDB = new LocalDatabase();