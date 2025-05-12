import { useTranslations } from 'next-intl';
// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Only runs at the root path (`/`)
  redirect('/en');
}
