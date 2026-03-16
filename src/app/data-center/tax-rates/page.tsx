import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tax Rates',
  description:
    'Property tax rates for Commerce, Texas — Hunt County, City of Commerce, Commerce ISD, and Hospital District rates with peer community comparison.',
  path: '/data-center/tax-rates',
});

export default function TaxRatesPage() {
  return (
    <>
      <SectionHero
        title="Tax Rates"
        subtitle="Transparent property tax rate data from every taxing entity in Commerce, Texas."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Tax Rates' },
        ]}
      />

      {/* Tax Rate Table */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Property Tax Rates by Entity
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Property in Commerce is subject to overlapping tax levies from the
            entities below. Texas has no state income tax, making property tax
            the primary funding mechanism for local services, schools, and
            infrastructure.
          </p>

          <DataTable
            className="mt-8"
            headers={['Taxing Entity', 'Rate (per $100 valuation)', 'Notes']}
            rows={[
              ['Hunt County', 'Pending', 'General fund + road & bridge'],
              ['Hunt County Hospital District', 'Pending', 'County healthcare services'],
              ['City of Commerce', 'Pending', 'General fund + debt service'],
              ['Commerce ISD', 'Pending', 'M&O + I&S (debt service)'],
            ]}
            source="Hunt County Appraisal District"
          />

          <Card className="mt-8 border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Data Pending:</strong> Current
              certified tax rates are being confirmed with the Hunt County
              Appraisal District and will be published upon verification. Rates
              shown will reflect the most recently adopted fiscal year.
            </p>
          </Card>
        </div>
      </section>

      {/* Context */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Understanding Commerce Tax Rates
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                No State Income Tax
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Texas is one of nine states with no personal income tax and one
                of the few with no corporate income tax. The franchise tax
                (margin tax) applies only to entities with revenue above $2.47
                million.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Tax Abatement Programs
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Qualifying projects may be eligible for property tax abatements
                through agreements with the City of Commerce, Hunt County,
                and/or Commerce ISD under Chapter 312 of the Texas Tax Code.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Freeport Exemption
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Texas offers a Freeport Exemption that removes inventory from
                property tax rolls if goods are shipped out of state within 175
                days of acquisition.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Opportunity Zone
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Commerce includes a federally designated Opportunity Zone,
                allowing investors to defer and reduce capital gains taxes on
                qualified investments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Estimate Your Tax Impact"
        description="We can model the total tax burden for your specific project, including any eligible abatements or incentives."
        buttonText="Contact the EDC"
        buttonHref="/contact"
      />
    </>
  );
}
