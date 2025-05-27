// src/app/[locale]/(protected)/layout.tsx
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function ProtectedLayout({ children, params }: Props) {
  const { locale } = params;

  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/${locale}/auth/login`);
  }

  return <>{children}</>;
}
