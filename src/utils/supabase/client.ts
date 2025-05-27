import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export function createBrowserSupabaseClient() {
  return createPagesBrowserClient();
}
