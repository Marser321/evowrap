import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback to avoid build-time crashes if variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL: Supabase environment variables are missing!');
    } else {
        console.warn('Supabase env variables missing. Check .env.local');
    }
}

// createClient handles empty strings by not throwing immediately, 
// allowing the build to complete even if variables are missing in the build environment.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
