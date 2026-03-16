interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="text-center">
      {icon && <div className="mx-auto mb-2 text-amber">{icon}</div>}
      <div className="font-heading text-3xl font-bold text-navy sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}
