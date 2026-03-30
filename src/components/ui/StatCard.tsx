interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  index?: number;
}

export function StatCard({ value, label, icon, index = 0 }: StatCardProps) {
  return (
    <div
      className="animate-slide-up rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {icon && <div className="mx-auto mb-2 text-amber">{icon}</div>}
      <div className="font-heading text-3xl font-bold leading-none text-white sm:text-4xl">{value}</div>
      <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-gray-100">{label}</div>
    </div>
  );
}
