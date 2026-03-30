'use client';

import { useState, useEffect } from 'react';
import { FormField } from '../fields/FormField';
import { StringArrayField } from '../fields/StringArrayField';
import { ImagePickerField } from '../fields/ImagePickerField';
import { BooleanToggle } from '../fields/BooleanToggle';
import { UtilitiesField } from '../fields/UtilitiesField';

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

interface PropertyFormProps {
  property?: Property;
  isNew?: boolean;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export function PropertyForm({ property, isNew, onSave, onCancel }: PropertyFormProps) {
  const [form, setForm] = useState<Property>({
    id: property?.id || '',
    name: property?.name || '',
    acreage: property?.acreage || 0,
    zoning: property?.zoning || 'Industrial',
    price: property?.price || 'Negotiable',
    description: property?.description || '',
    location: property?.location || '',
    utilities: property?.utilities || { water: false, sewer: false, gas: false, electric: false },
    railServed: property?.railServed || false,
    opportunityZone: property?.opportunityZone || false,
    features: property?.features || [],
    image: property?.image || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isNew && form.name && !property) {
      setForm((f) => ({ ...f, id: slugify(f.name) }));
    }
  }, [form.name, isNew, property]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.id.trim()) errs.id = 'ID is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ ...form, image: form.image || undefined });
    }
  };

  const update = <K extends keyof Property>(key: K, value: Property[K]) => {
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
          placeholder="Tract 1 — 11 Acres East of Alliance"
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

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Acreage">
          <input
            type="number"
            step="0.001"
            value={form.acreage || ''}
            onChange={(e) => update('acreage', Number(e.target.value) || 0)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Zoning">
          <input
            type="text"
            value={form.zoning}
            onChange={(e) => update('zoning', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Industrial"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Price">
          <input
            type="text"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Negotiable"
          />
        </FormField>

        <FormField label="Location">
          <input
            type="text"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="SE Commerce, near County Rd 4220"
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

      <UtilitiesField value={form.utilities} onChange={(v) => update('utilities', v)} />

      <div className="flex gap-6">
        <BooleanToggle label="Rail Served" checked={form.railServed} onChange={(v) => update('railServed', v)} />
        <BooleanToggle label="Opportunity Zone" checked={form.opportunityZone} onChange={(v) => update('opportunityZone', v)} />
      </div>

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
          {isNew ? 'Add Property' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
