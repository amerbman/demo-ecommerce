"use client";
import { useTranslations } from 'next-intl';

export default function OrdersList() {
  const t = useTranslations();
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">{t('order.1234.status.shipped')}</div>
      <div className="p-4 border rounded">{t('order.5678.status.processing')}</div>
    </div>
  );
}
