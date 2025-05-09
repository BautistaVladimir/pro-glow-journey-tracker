
// Configure the API URL based on the environment
// In development, this would point to your Laravel 11 server (likely on a different port)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// API Version (useful for API versioning if implemented on Laravel side)
export const API_VERSION = "v1";

// Sanctum configuration for Laravel 11
export const SANCTUM_COOKIE_ENDPOINT = "/sanctum/csrf-cookie";

// Laravel 11 API endpoints (can be expanded as needed)
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
