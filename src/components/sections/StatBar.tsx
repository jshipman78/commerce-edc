import { StatCard } from '@/components/ui/StatCard';
import { homepageStats } from '@/data/stats';

export function StatBar() {
  return (
    <section className="border-b border-gray-200 bg-cream py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {homepageStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
