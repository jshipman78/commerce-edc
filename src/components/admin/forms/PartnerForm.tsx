'use client';

import { useState } from 'react';
import { FormField } from '../fields/FormField';
import { ImagePickerField } from '../fields/ImagePickerField';

interface Partner {
  name: string;
  logo: string;
  website?: string;
}

interface PartnerFormProps {
  partner?: Partner;
  isNew?: boolean;
  onSave: (partner: Partner) => void;
  onCancel: () => void;
}

export function PartnerForm({ partner, isNew, onSave, onCancel }: PartnerFormProps) {
  const [form, setForm] = useState<Partner>({
    name: partner?.name || '',
    logo: partner?.logo || '',
    website: partner?.website || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.logo.trim()) errs.logo = 'Logo is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        name: form.name,
        logo: form.logo,
        website: form.website || undefined,
      });
    }
  };

  return (
    <div className="space-y-5">
      <FormField label="Partner Name" required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </FormField>

      <ImagePickerField
        label="Logo"
        value={form.logo}
        onChange={(v) => setForm((f) => ({ ...f, logo: v }))}
      />
      {errors.logo && <p className="text-xs text-red-600">{errors.logo}</p>}

      <FormField label="Website">
        <input
          type="url"
          value={form.website || ''}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="https://example.com"
        />
      </FormField>

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
          {isNew ? 'Add Partner' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
