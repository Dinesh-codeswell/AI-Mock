import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Browser-side Supabase client for the AI Mock app
// Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to be set
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase env vars are missing in AI Mock app')
  }

  return createSupabaseClient(url || '', key || '', {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}
