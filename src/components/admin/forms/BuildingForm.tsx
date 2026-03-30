'use client';

import { useState, useEffect } from 'react';
import { FormField } from '../fields/FormField';
import { StringArrayField } from '../fields/StringArrayField';
import { ImagePickerField } from '../fields/ImagePickerField';

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

interface BuildingFormProps {
  building?: Building;
  isNew?: boolean;
  onSave: (building: Building) => void;
  onCancel: () => void;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export function BuildingForm({ building, isNew, onSave, onCancel }: BuildingFormProps) {
  const [form, setForm] = useState<Building>({
    id: building?.id || '',
    name: building?.name || '',
    address: building?.address || '',
    squareFeet: building?.squareFeet || 0,
    price: building?.price || '',
    description: building?.description || '',
    features: building?.features || [],
    image: building?.image || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isNew && form.name && !building) {
      setForm((f) => ({ ...f, id: slugify(f.name) }));
    }
  }, [form.name, isNew, building]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.id.trim()) errs.id = 'ID is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ ...form, image: form.image || undefined });
    }
  };

  const update = (key: keyof Building, value: Building[keyof Building]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <div className="space-y-5">
      <FormField label="Name" required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Building name"
        />
      </FormField>

      <FormField label="ID (slug)" required error={errors.id}>
        <input
          type="text"
          value={form.id}
          onChange={(e) => update('id', e.target.value)}
          readOnly={!isNew}
          className={`block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono text-sm text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${!isNew ? 'bg-gray-50' : ''}`}
        />
      </FormField>

      <FormField label="Address" required error={errors.address}>
        <input
          type="text"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Commerce, TX 75428"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Square Feet">
          <input
            type="number"
            value={form.squareFeet || ''}
            onChange={(e) => update('squareFeet', Number(e.target.value) || 0)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Price">
          <input
            type="text"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Contact for Details"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </FormField>

      <StringArrayField
        label="Features"
        value={form.features}
        onChange={(v) => update('features', v)}
      />

      <ImagePickerField
        label="Image"
        value={form.image || ''}
        onChange={(v) => update('image', v)}
      />

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-[#1B2A4A] px-6 py-2 text-sm font-semibold text-white hover:bg-[#152238]"
        >
          {isNew ? 'Add Building' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
