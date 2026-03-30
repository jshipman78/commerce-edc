'use client';

import { useState } from 'react';
import { FormField } from '../fields/FormField';
import { ImagePickerField } from '../fields/ImagePickerField';

interface BoardMember {
  name: string;
  title: string;
  role: string;
  organization: string;
  image?: string;
}

interface BoardMemberFormProps {
  member?: BoardMember;
  isNew?: boolean;
  onSave: (member: BoardMember) => void;
  onCancel: () => void;
}

export function BoardMemberForm({ member, isNew, onSave, onCancel }: BoardMemberFormProps) {
  const [form, setForm] = useState<BoardMember>({
    name: member?.name || '',
    title: member?.title || '',
    role: member?.role || '',
    organization: member?.organization || '',
    image: member?.image || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.title.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ ...form, image: form.image || undefined });
    }
  };

  const update = (key: keyof BoardMember, value: string) => {
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
          placeholder="Full name"
        />
      </FormField>

      <FormField label="Title" required error={errors.title}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g. President, Board Member"
        />
      </FormField>

      <FormField label="Role">
        <input
          type="text"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g. Board President"
        />
      </FormField>

      <FormField label="Organization">
        <input
          type="text"
          value={form.organization}
          onChange={(e) => update('organization', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Company or organization"
        />
      </FormField>

      <ImagePickerField
        label="Photo"
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
          {isNew ? 'Add Member' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
