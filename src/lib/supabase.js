import { createClient } from '@supabase/supabase-js';

// Production fallback credentials ensuring live builds always connect to the database
const DEFAULT_SUPABASE_URL = 'https://lzjirrgswjoifjykbsuh.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_8h-WEpnRZ5lIE87ami34uQ_jjMdbL3Q';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

