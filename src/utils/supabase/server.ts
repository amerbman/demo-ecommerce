import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Use in server components or App Router server code
export function createServerSupabaseClient() {
  return createServerComponentClient({ cookies });
}