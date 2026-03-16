'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import type { BoardDocument } from '@/types';

export function YearFilter({ documents }: { documents: BoardDocument[] }) {
  const years = [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filtered = selectedYear
    ? documents.filter((d) => d.year === selectedYear)
    : documents;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedYear(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedYear === null
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Years
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedYear === year
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-navy">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Title
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((doc) => (
              <tr key={doc.id} className="hover:bg-cream/50">
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {formatDate(doc.date)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">
                  {doc.title}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-amber hover:text-amber-dark"
                  >
                    PDF ↓
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">No documents found for this year.</p>
      )}
    </div>
  );
}
