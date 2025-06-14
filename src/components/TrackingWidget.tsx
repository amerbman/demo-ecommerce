// src/app/components/TrackingWidget.tsx
"use client";

import { useTranslations } from 'next-intl';

export default function TrackingWidget() {
  const t = useTranslations('trackingWidget');
  return (
    <div className="p-4 border rounded">
      <p>{t('prompt')}</p>
      {/* You can add a form/input here later */}
    </div>
  );
}
