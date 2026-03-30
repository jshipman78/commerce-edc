'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlideOverPanel } from '../SlideOverPanel';
import { BuildingForm } from '../forms/BuildingForm';
import { saveBuildingsTyped } from '@/lib/admin/data';

interface Building {
  id: string;
  name: string;
  address: string;
  squareFeet: number;
  price: string;
  description: string;
  features: string[];
  image?: string;
}

interface BuildingsManagerProps {
  initialData: Building[];
}

export function BuildingsManager({ initialData }: BuildingsManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<Building[]>(initialData);
  const [editing, setEditing] = useState<Building | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setIsNew(true);
    setPanelOpen(true);
  };

  const openEdit = (item: Building) => {
    setEditing(item);
    setIsNew(false);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditing(null);
  };

  const save = async (updated: Building[]) => {
    setSaving(true);
    setMessage(null);
    const result = await saveBuildingsTyped(updated);
    if (result.success) {
      setItems(updated);
      setMessage({ type: 'success', text: 'Saved successfully!' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
    setSaving(false);
  };

  const handleSave = async (building: Building) => {
    let updated: Building[];
    if (isNew) {
      updated = [...items, building];
    } else {
      updated = items.map((b) => (b.id === building.id ? building : b));
    }
    await save(updated);
    closePanel();
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((b) => b.id !== id);
    await save(updated);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buildings</h1>
          <p className="mt-1 text-sm text-gray-500">{items.length} building{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]"
        >
          + Add Building
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

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Building</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Address</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Sq Ft</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Price</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {b.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.image} alt="" className="h-10 w-14 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{b.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{b.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.squareFeet.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.price}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(b)}
                      className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    {deleteConfirm === b.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(b.id)}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  No buildings yet. Click &quot;Add Building&quot; to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOverPanel
        open={panelOpen}
        onClose={closePanel}
        title={isNew ? 'Add Building' : `Edit: ${editing?.name}`}
      >
        <BuildingForm
          key={editing?.id || 'new'}
          building={editing || undefined}
          isNew={isNew}
          onSave={handleSave}
          onCancel={closePanel}
        />
      </SlideOverPanel>
    </div>
  );
}
