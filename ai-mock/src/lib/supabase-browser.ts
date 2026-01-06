import { createBrowserClient } from "@@supabase/supabase-js"

let client: ReturnType<typeof createBrowserClient> | null = null

export const createClient = () => {
  if (client) return client

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
      global: {
        headers: {
          'x-application-name': 'startup-draft',
        },
      },
      // Optimized for real-time if needed
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  )
  
  return client
}
