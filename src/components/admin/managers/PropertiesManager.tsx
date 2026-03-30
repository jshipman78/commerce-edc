'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlideOverPanel } from '../SlideOverPanel';
import { PropertyForm } from '../forms/PropertyForm';
import { savePropertiesTyped } from '@/lib/admin/data';

interface Property {
  id: string;
  name: string;
  acreage: number;
  zoning: string;
  price: string;
  description: string;
  location: string;
  utilities: { water: boolean; sewer: boolean; gas: boolean; electric: boolean };
  railServed: boolean;
  opportunityZone: boolean;
  features: string[];
  image?: string;
}

interface PropertiesManagerProps {
  initialData: Property[];
}

export function PropertiesManager({ initialData }: PropertiesManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<Property[]>(initialData);
  const [editing, setEditing] = useState<Property | null>(null);
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

  const openEdit = (item: Property) => {
    setEditing(item);
    setIsNew(false);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditing(null);
  };

  const save = async (updated: Property[]) => {
    setSaving(true);
    setMessage(null);
    const result = await savePropertiesTyped(updated);
    if (result.success) {
      setItems(updated);
      setMessage({ type: 'success', text: 'Saved successfully!' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
    setSaving(false);
  };

  const handleSave = async (property: Property) => {
    let updated: Property[];
    if (isNew) {
      updated = [...items, property];
    } else {
      updated = items.map((p) => (p.id === property.id ? property : p));
    }
    await save(updated);
    closePanel();
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((p) => p.id !== id);
    await save(updated);
    setDeleteConfirm(null);
  };

  const utilityBadges = (p: Property) => {
    const utils = [];
    if (p.utilities.water) utils.push('Water');
    if (p.utilities.sewer) utils.push('Sewer');
    if (p.utilities.gas) utils.push('Gas');
    if (p.utilities.electric) utils.push('Electric');
    return utils;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-sm text-gray-500">{items.length} propert{items.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#152238]"
        >
          + Add Property
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
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Property</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Acres</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Utilities</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="h-10 w-14 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.acreage}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {utilityBadges(p).map((u) => (
                      <span key={u} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{u}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.railServed && (
                      <span className="rounded-full bg-[#0D7E6B]/10 px-2 py-0.5 text-xs font-medium text-[#0D7E6B]">Rail Served</span>
                    )}
                    {p.opportunityZone && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">OZ</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1B2A4A] hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(p.id)}
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
                        onClick={() => setDeleteConfirm(p.id)}
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
                  No properties yet. Click &quot;Add Property&quot; to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOverPanel
        open={panelOpen}
        onClose={closePanel}
        title={isNew ? 'Add Property' : `Edit: ${editing?.name}`}
      >
        <PropertyForm
          key={editing?.id || 'new'}
          property={editing || undefined}
          isNew={isNew}
          onSave={handleSave}
          onCancel={closePanel}
        />
      </SlideOverPanel>
    </div>
  );
}
