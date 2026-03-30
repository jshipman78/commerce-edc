'use client';

import { useState } from 'react';
import { FormField } from './FormField';
import { MediaPickerModal } from '../MediaPickerModal';

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ImagePickerField({ label, value, onChange }: ImagePickerFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <FormField label={label}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/image.jpg"
          className="block flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Browse
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Clear
          </button>
        )}
      </div>
      {value && (
        <div className="mt-2 relative h-32 w-48 overflow-hidden rounded-lg bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        </div>
      )}
      {showPicker && (
        <MediaPickerModal
          onSelect={(path) => {
            onChange(path);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </FormField>
  );
}
