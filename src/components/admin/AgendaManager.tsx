'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAgenda } from '@/lib/admin/data';

interface Agenda {
  name: string;
  path: string;
  date: string;
}

export function AgendaManager({ initialAgendas }: { initialAgendas: Agenda[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setMessage('Only PDF files are accepted for agendas.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'agendas');

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setMessage('Agenda uploaded successfully!');
        router.refresh();
      } else {
        setMessage('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      setMessage('Upload failed.');
    }
    setUploading(false);
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete agenda "${filename}"?`)) return;
    await deleteAgenda(filename);
    router.refresh();
  };

  return (
    <div className="mt-6">
      {/* Upload area */}
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center">
        <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="mt-2 text-sm font-medium text-gray-700">Upload Agenda PDF</p>
        <p className="mt-1 text-xs text-gray-500">Must be posted 72 hours before the meeting</p>
        <label className="mt-4 inline-block cursor-pointer rounded-lg bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]">
          {uploading ? 'Uploading...' : 'Select PDF'}
          <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {message && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Agenda list */}
      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Filename</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Uploaded</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialAgendas.map((agenda) => (
              <tr key={agenda.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <a href={agenda.path} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    {agenda.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(agenda.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(agenda.name)}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {initialAgendas.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-sm text-gray-500">
                  No agendas uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
