'use client';

import { usePathname } from 'next/navigation';
import { useReportStore } from '@/lib/report-store';
import { getReportSectionsByPage } from '@/lib/report-sections';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function ReportFloatingBar() {
  const pathname = usePathname();
  const { sections, hasSection, toggleSection, setDrawerOpen } = useReportStore();
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset justAdded when navigating to a new page
  useEffect(() => {
    setJustAdded(false);
  }, [pathname]);

  const currentSection = getReportSectionsByPage(pathname);
  const count = mounted ? sections.length : 0;
  const isCurrentAdded = mounted && currentSection ? hasSection(currentSection.id) : false;

  const handleAdd = () => {
    if (!currentSection) return;
    if (!isCurrentAdded) {
      toggleSection(currentSection.id);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2500);
    } else {
      toggleSection(currentSection.id);
    }
  };

  // On reportable pages: show expanded bar with add button + cart
  // On other pages: show just the cart FAB (if items > 0)
  if (currentSection) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-3xl px-4 pb-5">
          <div className="pointer-events-auto flex items-stretch overflow-hidden rounded-2xl bg-navy shadow-2xl shadow-navy/30 ring-1 ring-white/10">
            {/* Add Section Button */}
            <button
              onClick={handleAdd}
              className={cn(
                'flex flex-1 items-center gap-3 px-5 py-3.5 text-left transition-all duration-300',
                isCurrentAdded
                  ? 'bg-green/15'
                  : 'hover:bg-white/5'
              )}
            >
              {/* Icon */}
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                  isCurrentAdded
                    ? 'bg-green text-white'
                    : 'bg-amber/20 text-amber'
                )}
              >
                {isCurrentAdded ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </span>

              {/* Text */}
              <span className="min-w-0 flex-1">
                {isCurrentAdded ? (
                  <>
                    <span className="block text-sm font-semibold text-green">
                      {justAdded ? 'Added!' : 'In Your Report'}
                    </span>
                    <span className="block truncate text-xs text-white/50">
                      {currentSection.title} — tap to remove
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-sm font-semibold text-white">
                      Add to Report
                    </span>
                    <span className="block truncate text-xs text-white/50">
                      {currentSection.title}
                    </span>
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="w-px self-stretch bg-white/10" />

            {/* View Report Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2.5 px-5 py-3.5 transition-colors hover:bg-white/5"
              aria-label={`Open report builder${count > 0 ? ` (${count} items)` : ''}`}
            >
              <span className="relative">
                <svg className="h-5 w-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>
              <span className="hidden text-sm font-semibold text-white sm:block">
                {count > 0 ? 'Report' : 'Report'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Non-reportable pages: show cart FAB only if items exist
  if (count === 0) return null;

  return (
    <button
      onClick={() => setDrawerOpen(true)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-amber px-5 py-3 text-white shadow-lg shadow-amber/30 transition-all duration-200 hover:bg-amber-dark hover:shadow-xl hover:shadow-amber/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
      aria-label={`Open report builder (${count} items)`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span className="text-sm font-semibold">Report ({count})</span>
    </button>
  );
}
