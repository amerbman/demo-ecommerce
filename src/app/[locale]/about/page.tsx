// src/app/[locale]/about/page.tsx
"use client";

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <main className="container mx-auto py-16 space-y-12">
      <h1 className="text-4xl font-bold">
        {t('title')}
      </h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {t('ourStory.title')}
        </h2>
        <p className="text-lg leading-relaxed">
          {t('ourStory.content')}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {t('ourMission.title')}
        </h2>
        <p className="text-lg leading-relaxed">
          {t('ourMission.content')}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {t('meetTeam')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Jane Doe */}
          <div className="border rounded p-4 text-center">
            <img
              src="/assets/team/jane.jpg"
              alt={t('team.jane.name')}
              className="mx-auto mb-2 h-24 w-24 rounded-full object-cover"
            />
            <h3 className="font-medium">
              {t('team.jane.name')}
            </h3>
            <p>
              {t('team.jane.title')}
            </p>
          </div>
          {/* John Smith */}
          <div className="border rounded p-4 text-center">
            <img
              src="/assets/team/john.jpg"
              alt={t('team.john.name')}
              className="mx-auto mb-2 h-24 w-24 rounded-full object-cover"
            />
            <h3 className="font-medium">
              {t('team.john.name')}
            </h3>
            <p>
              {t('team.john.title')}
            </p>
          </div>
          {/* …more team cards */}
        </div>
      </section>
    </main>
);
}
