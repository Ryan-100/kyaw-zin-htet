import { createClient } from '@supabase/supabase-js';

// Use placeholders. The app will use fallback data if Supabase is not configured.
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "placeholder.key";

export const isSupabaseConfigured = supabaseUrl !== "https://placeholder.supabase.co";

if (!isSupabaseConfigured) {
  console.warn(`Supabase URL is not set. Using placeholder. App will use fallback data.
Please add SUPABASE_URL and SUPABASE_ANON_KEY to your environment variables to connect to a live database.`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);