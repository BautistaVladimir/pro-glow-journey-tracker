
// Configure the API URL based on environment
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// API endpoints for client-side data fetching
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    USER: "/auth/user",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/profile",
  },
  ACTIVITIES: "/activities",
  NUTRITION: "/nutrition",
  SLEEP: "/sleep",
  BMI: "/bmi",
  GOALS: "/goals",
};
