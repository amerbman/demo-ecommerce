// src/lib/supabaseClient.ts
console.log('→ SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('→ ANON KEY present?', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
