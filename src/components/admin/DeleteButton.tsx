'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteNewsArticle } from '@/lib/admin/data';

export function DeleteButton({ type, id, name }: { type: string; id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    if (type === 'news') {
      await deleteNewsArticle(id);
    }
    router.refresh();
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      title={`Delete ${name}`}
    >
      Delete
    </button>
  );
}
