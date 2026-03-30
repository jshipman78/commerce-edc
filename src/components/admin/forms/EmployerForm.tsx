'use client';

import { useState } from 'react';
import { FormField } from '../fields/FormField';
import { ImagePickerField } from '../fields/ImagePickerField';

interface Employer {
  name: string;
  employees?: number;
  industry: string;
  description?: string;
  logo?: string;
  website?: string;
}

interface EmployerFormProps {
  employer?: Employer;
  isNew?: boolean;
  onSave: (employer: Employer) => void;
  onCancel: () => void;
}

export function EmployerForm({ employer, isNew, onSave, onCancel }: EmployerFormProps) {
  const [form, setForm] = useState<Employer>({
    name: employer?.name || '',
    employees: employer?.employees,
    industry: employer?.industry || '',
    description: employer?.description || '',
    logo: employer?.logo || '',
    website: employer?.website || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.industry.trim()) errs.industry = 'Industry is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        name: form.name,
        industry: form.industry,
        employees: form.employees || undefined,
        description: form.description || undefined,
        logo: form.logo || undefined,
        website: form.website || undefined,
      });
    }
  };

  return (
    <div className="space-y-5">
      <FormField label="Company Name" required error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Industry" required error={errors.industry}>
          <input
            type="text"
            value={form.industry}
            onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Manufacturing"
          />
        </FormField>

        <FormField label="Employees">
          <input
            type="number"
            value={form.employees ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, employees: e.target.value ? Number(e.target.value) : undefined }))}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea
          value={form.description || ''}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </FormField>

      <FormField label="Website">
        <input
          type="url"
          value={form.website || ''}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="https://example.com"
        />
      </FormField>

      <ImagePickerField
        label="Logo"
        value={form.logo || ''}
        onChange={(v) => setForm((f) => ({ ...f, logo: v }))}
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
          {isNew ? 'Add Employer' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
