
// Configure the API URL based on the environment
// In development, this would point to your Laravel server (likely on a different port)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// API Version (useful for API versioning if implemented on Laravel side)
export const API_VERSION = "v1";

// Sanctum configuration
export const SANCTUM_COOKIE_ENDPOINT = "/sanctum/csrf-cookie";
