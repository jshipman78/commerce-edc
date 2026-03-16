import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function SectionHero({ title, subtitle, breadcrumbs }: SectionHeroProps) {
  return (
    <section className="bg-navy py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
