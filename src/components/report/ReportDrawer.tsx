'use client';

import { useReportStore } from '@/lib/report-store';
import { reportSections } from '@/lib/report-sections';
import { cn } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';

export function ReportDrawer() {
  const {
    sections,
    includeExecutiveSummary,
    includeCoverPage,
    contactEmail,
    drawerOpen,
    removeSection,
    setIncludeExecutiveSummary,
    setIncludeCoverPage,
    setContactEmail,
    setDrawerOpen,
    clearAll,
  } = useReportStore();

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSections = sections
    .map((id) => reportSections.find((s) => s.id === id))
    .filter(Boolean);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
  }, [setDrawerOpen]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (drawerOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [drawerOpen, handleClose]);

  const handleGenerate = async () => {
    if (sections.length === 0) return;
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections,
          includeExecutiveSummary,
          includeCoverPage,
          contactEmail: contactEmail || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Commerce-EDC-Report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Something went wrong generating your report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (!drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">
                Report Builder
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                {sections.length} section{sections.length !== 1 ? 's' : ''} selected
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close drawer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Selected Sections */}
          {selectedSections.length === 0 ? (
            <div className="py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-3 text-sm font-medium text-gray-500">
                No sections added yet
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Browse the site and click &quot;Add to Report&quot; on any data section.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {selectedSections.map((section) => (
                <li
                  key={section!.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">{section!.title}</p>
                    <p className="truncate text-xs text-gray-500">{section!.description}</p>
                  </div>
                  <button
                    onClick={() => removeSection(section!.id)}
                    className="ml-3 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${section!.title}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Options */}
          <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-navy">Report Options</h3>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-gray-700">Include Cover Page</span>
              <button
                role="switch"
                aria-checked={includeCoverPage}
                onClick={() => setIncludeCoverPage(!includeCoverPage)}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors',
                  includeCoverPage ? 'bg-green' : 'bg-gray-300'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform',
                    includeCoverPage ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-gray-700">Include Executive Summary</span>
              <button
                role="switch"
                aria-checked={includeExecutiveSummary}
                onClick={() => setIncludeExecutiveSummary(!includeExecutiveSummary)}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors',
                  includeExecutiveSummary ? 'bg-green' : 'bg-gray-300'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform',
                    includeExecutiveSummary ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </label>

            <div>
              <label htmlFor="report-email" className="block text-sm text-gray-700">
                Email for follow-up <span className="text-gray-400">(optional)</span>
              </label>
              <input
                id="report-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handleGenerate}
            disabled={sections.length === 0 || generating}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-amber-dark hover:shadow-md disabled:opacity-50 disabled:pointer-events-none"
          >
            {generating ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Generate PDF Report
              </>
            )}
          </button>

          {sections.length > 0 && (
            <button
              onClick={clearAll}
              className="mt-2 w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </>
  );
}
