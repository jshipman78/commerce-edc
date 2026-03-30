import { StatCard } from '@/components/ui/StatCard';
import { homepageStats } from '@/data/stats';

export function StatBar() {
  return (
    <section className="relative bg-gradient-to-r from-navy-dark to-navy py-12">
      <div className="absolute inset-0 bg-pattern-dots" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {homepageStats.map((stat, index) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
