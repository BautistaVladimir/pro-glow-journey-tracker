
// This file extends the Supabase TypeScript definitions to include our custom functions and tables

import { SupabaseClient } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc(
      fn: 'verify_admin_code' | 'generate_admin_code' | 'calculate_bmi' | 'get_bmi_category' | string,
      params?: object
    ): Promise<{
      data: any;
      error: Error | null;
    }>;
  }
}

// Add admin_codes table types if needed in the future
