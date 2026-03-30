'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlideOverPanel } from '../SlideOverPanel';
import { BoardMemberForm } from '../forms/BoardMemberForm';
import { saveBoardMembersTyped } from '@/lib/admin/data';

interface BoardMember {
  name: string;
  title: string;
  role: string;
  organization: string;
  image?: string;
}

interface BoardMembersManagerProps {
  initialData: BoardMember[];
}

export function BoardMembersManager({ initialData }: BoardMembersManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<BoardMember[]>(initialData);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openNew = () => {
    setEditingIdx(null);
    setIsNew(true);
    setPanelOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIdx(idx);
    setIsNew(false);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingIdx(null);
  };

  const save = async (updated: BoardMember[]) => {
    setSaving(true);
    setMessage(null);
    const result = await saveBoardMembersTyped(updated);
    if (result.success) {
      setItems(updated);
      setMessage({ type: 'success', text: 'Saved successfully!' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
    setSaving(false);
  };

  const handleSave = async (member: BoardMember) => {
    let updated: BoardMember[];
    if (isNew) {
      updated = [...items, member];
    } else if (editingIdx !== null) {
      updated = items.map((m, i) => (i === editingIdx ? member : m));
    } else {
      return;
    }
    await save(updated);
    closePanel();
  };

  const handleDelete = async (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    await save(updated);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board Members</h1>
          <p className="mt-1 text-sm text-gray-500">{items.length} member{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]"
        >
          + Add Member
        </button>
      </div>

      {message && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {saving && (
        <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">Saving...</div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-4 p-4">
              {m.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.image} alt={m.name} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-500">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{m.name}</p>
                <p className="text-sm text-[#B45309]">{m.title}</p>
                <p className="text-xs text-gray-500 truncate">{m.organization}</p>
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => openEdit(idx)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-50"
              >
                Edit
              </button>
              {deleteConfirm === idx ? (
                <div className="flex flex-1 border-l border-gray-100">
                  <button
                    onClick={() => handleDelete(idx)}
                    className="flex-1 px-3 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(idx)}
                  className="flex-1 border-l border-gray-100 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-6 rounded-xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">No board members yet. Click &quot;Add Member&quot; to get started.</p>
        </div>
      )}

      <SlideOverPanel
        open={panelOpen}
        onClose={closePanel}
        title={isNew ? 'Add Board Member' : `Edit: ${editingIdx !== null ? items[editingIdx]?.name : ''}`}
      >
        <BoardMemberForm
          key={editingIdx ?? 'new'}
          member={editingIdx !== null ? items[editingIdx] : undefined}
          isNew={isNew}
          onSave={handleSave}
          onCancel={closePanel}
        />
      </SlideOverPanel>
    </div>
  );
}
