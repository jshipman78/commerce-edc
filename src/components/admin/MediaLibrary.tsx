'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MediaFile } from '@/lib/admin/data';

export function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'document'>('all');
  const [copied, setCopied] = useState('');

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    setUploading(true);
    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/admin/upload', { method: 'POST', body: formData });
    }
    await loadFiles();
    setUploading(false);
  };

  const handleDelete = async (filePath: string) => {
    if (!confirm('Delete this file?')) return;
    await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: filePath }),
    });
    await loadFiles();
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(''), 2000);
  };

  const filteredFiles = files
    .filter((f) => typeFilter === 'all' || f.type === typeFilter)
    .filter((f) =>
      !filter || f.name.toLowerCase().includes(filter.toLowerCase()) || f.path.toLowerCase().includes(filter.toLowerCase())
    );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="mt-6">
      {/* Upload + Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]">
          {uploading ? 'Uploading...' : '+ Upload Files'}
          <input type="file" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search files..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {(['all', 'image', 'document'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                typeFilter === t ? 'bg-[#1B2A4A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">{filteredFiles.length} files</p>

      {/* File Grid */}
      {loading ? (
        <div className="mt-8 text-center text-sm text-gray-500">Loading media files...</div>
      ) : (
        <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredFiles.slice(0, 100).map((file) => (
            <div
              key={file.path}
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              {/* Preview */}
              <div className="relative aspect-square bg-gray-100">
                {file.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={file.path}
                    alt={file.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                )}

                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => copyPath(file.path)}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100"
                  >
                    {copied === file.path ? 'Copied!' : 'Copy Path'}
                  </button>
                  <button
                    onClick={() => handleDelete(file.path)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-2.5">
                <p className="truncate text-xs font-medium text-gray-900">{file.name}</p>
                <p className="mt-0.5 text-xs text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
