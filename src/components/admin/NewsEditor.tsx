'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from './RichTextEditor';
import { saveNewsArticle } from '@/lib/admin/data';
import type { NewsArticle } from '@/lib/admin/data';
import { MediaPickerModal } from './MediaPickerModal';

interface NewsEditorProps {
  article?: NewsArticle;
  isNew?: boolean;
}

export function NewsEditor({ article, isNew }: NewsEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [date, setDate] = useState(article?.date || new Date().toISOString().split('T')[0]);
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [image, setImage] = useState(article?.image || '');
  const [author, setAuthor] = useState(article?.author || 'Commerce EDC');
  const [category, setCategory] = useState(article?.category || '');
  const [body, setBody] = useState(article?.body || '');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !date) {
      setError('Title, slug, and date are required.');
      return;
    }

    setSaving(true);
    setError('');

    const result = await saveNewsArticle({
      slug,
      title,
      date,
      excerpt,
      image: image || undefined,
      author: author || undefined,
      category: category || undefined,
      body,
    });

    if (result.success) {
      router.push('/admin/news');
      router.refresh();
    } else {
      setError(result.error || 'Failed to save');
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? 'New Article' : 'Edit Article'}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin/news')}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-[#1B2A4A] px-6 py-2 text-sm font-semibold text-white hover:bg-[#152238] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Article title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-600 font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="article-slug"
          />
        </div>

        {/* Date + Category row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">None</option>
              <option value="Business">Business</option>
              <option value="Development">Development</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Clean Energy">Clean Energy</option>
            </select>
          </div>
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Author name"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="/uploads/image.jpg"
            />
            <button
              type="button"
              onClick={() => setShowMediaPicker(true)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Browse
            </button>
          </div>
          {image && (
            <div className="mt-2 relative h-40 w-64 overflow-hidden rounded-lg bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Brief summary of the article..."
          />
        </div>

        {/* Body (Rich Text Editor) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <div className="mt-1">
            <RichTextEditor content={body} onChange={setBody} />
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            Note: Content is saved as HTML. For MDX files, simple HTML formatting is supported.
          </p>
        </div>
      </div>

      {showMediaPicker && (
        <MediaPickerModal
          onSelect={(path) => {
            setImage(path);
            setShowMediaPicker(false);
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
