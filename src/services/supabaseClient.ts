
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/config/api';

// Types for database schema
export type Tables = {
  users: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar_url: string | null;
    height: number | null;
    weight: number | null;
    gender: string | null;
    age: number | null;
  };
  activities: {
    id: string;
    user_id: string;
    activity_type: string;
    duration: number;
    calories_burned: number;
    date: string;
    notes: string | null;
    created_at: string;
  };
  nutrition: {
    id: string;
    user_id: string;
    meal_type: string;
    food_items: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    date: string;
    created_at: string;
  };
  sleep: {
    id: string;
    user_id: string;
    hours: number;
    quality: number;
    date: string;
    notes: string | null;
    created_at: string;
  };
  bmi: {
    id: string;
    user_id: string;
    weight: number;
    height: number;
    bmi_value: number;
    date: string;
    created_at: string;
  };
  goals: {
    id: string;
    user_id: string;
    goal_type: string;
    target: number;
    current: number;
    unit: string;
    deadline: string | null;
    completed: boolean;
    created_at: string;
  };
};

// Create Supabase client
export const supabase = createClient<Tables>(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
