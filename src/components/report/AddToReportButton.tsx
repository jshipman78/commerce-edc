'use client';

import { useReportStore } from '@/lib/report-store';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface AddToReportButtonProps {
  sectionId: string;
  className?: string;
}

export function AddToReportButton({ sectionId, className }: AddToReportButtonProps) {
  const { hasSection, toggleSection } = useReportStore();
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdded = mounted && hasSection(sectionId);

  const handleClick = () => {
    const wasAdded = hasSection(sectionId);
    toggleSection(sectionId);
    if (!wasAdded) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200',
          isAdded
            ? 'bg-green text-white hover:bg-green-dark'
            : 'border-2 border-green text-green hover:bg-green hover:text-white'
        )}
      >
        {isAdded ? (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Added to Report
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add to Report
          </>
        )}
      </button>

      {showToast && (
        <div className="absolute bottom-full left-0 mb-2 animate-slide-up whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white shadow-lg">
          Added to your report
        </div>
      )}
    </div>
  );
}
