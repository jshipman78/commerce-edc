'use client';

import { useReportStore } from '@/lib/report-store';
import { useState, useEffect } from 'react';

export function ReportCartButton() {
  const { sections, setDrawerOpen } = useReportStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? sections.length : 0;

  return (
    <button
      onClick={() => setDrawerOpen(true)}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber text-white shadow-lg shadow-amber/30 transition-all duration-200 hover:bg-amber-dark hover:shadow-xl hover:shadow-amber/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
      aria-label={`Open report builder${count > 0 ? ` (${count} items)` : ''}`}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
