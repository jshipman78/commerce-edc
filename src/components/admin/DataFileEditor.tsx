'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DataFileEditorProps {
  title: string;
  description: string;
  content: string;
  onSave: (content: string) => Promise<{ success: boolean; error?: string }>;
}

export function DataFileEditor({ title, description, content: initialContent, onSave }: DataFileEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const result = await onSave(content);
    if (result.success) {
      setMessage({ type: 'success', text: 'Saved successfully! Restart dev server to see changes.' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#152238] disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-lg px-4 py-3 text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mt-6">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
            <span className="text-xs font-mono text-gray-500">TypeScript Data File</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full font-mono text-sm text-gray-800 p-4 min-h-[500px] focus:outline-none resize-y"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
