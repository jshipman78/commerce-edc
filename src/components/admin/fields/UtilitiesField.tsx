'use client';

import { BooleanToggle } from './BooleanToggle';
import { FormField } from './FormField';

interface Utilities {
  water: boolean;
  sewer: boolean;
  gas: boolean;
  electric: boolean;
}

interface UtilitiesFieldProps {
  value: Utilities;
  onChange: (value: Utilities) => void;
}

export function UtilitiesField({ value, onChange }: UtilitiesFieldProps) {
  const update = (key: keyof Utilities, checked: boolean) => {
    onChange({ ...value, [key]: checked });
  };

  return (
    <FormField label="Utilities">
      <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <BooleanToggle label="Water" checked={value.water} onChange={(v) => update('water', v)} />
        <BooleanToggle label="Sewer" checked={value.sewer} onChange={(v) => update('sewer', v)} />
        <BooleanToggle label="Gas" checked={value.gas} onChange={(v) => update('gas', v)} />
        <BooleanToggle label="Electric" checked={value.electric} onChange={(v) => update('electric', v)} />
      </div>
    </FormField>
  );
}
