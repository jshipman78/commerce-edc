import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function SectionHero({ title, subtitle, breadcrumbs }: SectionHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light py-14 sm:py-20">
      <div className="absolute inset-0 bg-pattern-dots" />
      {/* Decorative blurred circles */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-green/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-200/90">{subtitle}</p>
        )}
        <div className="mt-6 h-1 w-16 rounded-full bg-amber" />
      </div>
    </section>
  );
}
