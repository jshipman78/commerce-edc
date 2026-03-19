import Image from 'next/image';
import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { generatePageMetadata } from '@/lib/metadata';
import { majorEmployers, partners } from '@/data/employers';

export const metadata = generatePageMetadata({
  title: 'Businesses in Commerce',
  description: 'Major employers and business partners in Commerce, Texas. Home to East Texas A&M University, Hydro Aluminum, Legacy Housing, and more.',
  path: '/businesses',
});

export default function BusinessesPage() {
  return (
    <>
      <SectionHero
        title="Businesses in Commerce"
        subtitle="Commerce is home to a diverse mix of manufacturing, education, and service industries — anchored by East Texas A&M University."
        breadcrumbs={[{ label: 'Businesses' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">Major Employers</h2>
          <p className="mt-2 text-gray-600">
            Commerce&apos;s economy is driven by higher education, advanced manufacturing, and a growing residential sector.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {majorEmployers.map((employer) => (
              <Card key={employer.name}>
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-lg font-bold text-navy">{employer.name}</h3>
                  <Badge variant="navy">{employer.industry}</Badge>
                </div>
                {employer.employees && (
                  <p className="mt-2 text-2xl font-bold text-amber">{employer.employees}+</p>
                )}
                {employer.employees && (
                  <p className="text-xs text-gray-400">employees</p>
                )}
                {employer.description && (
                  <p className="mt-3 text-sm text-gray-600">{employer.description}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-heading text-2xl font-bold text-navy">Community Partners</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-20 w-40 items-center justify-center rounded-lg bg-white px-4 shadow-sm ring-1 ring-gray-200"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={70}
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-sm font-medium text-gray-600">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Join Commerce&apos;s Growing Business Community"
        description="Learn about the incentives and resources available to businesses in Commerce, Texas."
        buttonText="View Incentives"
        buttonHref="/why-commerce/incentives"
      />
    </>
  );
}
