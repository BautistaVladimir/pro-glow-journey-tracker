
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ewfvexnggznyywasoqwh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnZleG5nZ3pueXl3YXNvcXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzc4NjEsImV4cCI6MjA2MjkxMzg2MX0.K2McY56BdPuxLwrArHnm-GK_Caut86TWj1-sFiO9mx8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
