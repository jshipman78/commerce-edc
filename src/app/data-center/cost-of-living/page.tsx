import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Cost of Living',
  description:
    'Cost of living comparison between Commerce, Texas and the Dallas-Fort Worth Metroplex — housing, utilities, groceries, transportation, and healthcare.',
  path: '/data-center/cost-of-living',
});

export default function CostOfLivingPage() {
  return (
    <>
      <SectionHero
        title="Cost of Living"
        subtitle="How Commerce, Texas compares to the Dallas-Fort Worth Metroplex across key household cost categories."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Cost of Living' },
        ]}
      />

      {/* Comparison Table */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Commerce vs. DFW Comparison
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            One of Commerce&rsquo;s strongest value propositions for employers
            and employees alike is a significantly lower cost of living compared
            to the Dallas&ndash;Fort Worth Metroplex — just 60 miles west on
            I-30. Lower costs translate to competitive wages that go further,
            stronger employee retention, and better quality of life.
          </p>

          <DataTable
            className="mt-8"
            headers={['Category', 'Commerce, TX', 'DFW Metro', 'Difference']}
            rows={[
              ['Housing', 'Pending', 'Pending', 'Pending'],
              ['Utilities', 'Pending', 'Pending', 'Pending'],
              ['Groceries', 'Pending', 'Pending', 'Pending'],
              ['Transportation', 'Pending', 'Pending', 'Pending'],
              ['Healthcare', 'Pending', 'Pending', 'Pending'],
              ['Overall Index', 'Pending', 'Pending', 'Pending'],
            ]}
            source="Data compilation in progress — sources include C2ER, BLS, and Census Bureau"
          />

          <Card className="mt-8 border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Data Being Compiled:</strong>{' '}
              Specific cost-of-living index values are being assembled from the
              Council for Community and Economic Research (C2ER) Cost of Living
              Index, the Bureau of Labor Statistics, and U.S. Census Bureau
              American Community Survey data. This table will be updated with
              verified figures.
            </p>
          </Card>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            What Drives the Difference
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Housing
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Median home prices in Commerce are substantially lower than DFW
                averages, allowing employees to own more home for less — or
                rent at a fraction of metro rates.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Utilities
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Competitive electric rates through Texas&rsquo;s deregulated
                market, affordable municipal water, and Atmos Energy natural gas
                keep utility costs manageable.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Groceries
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Grocery prices in smaller Texas communities typically track at or
                below the national average, compared to above-average costs in
                major metro areas.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Transportation
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Shorter commute distances, lower fuel costs, and no toll roads
                reduce daily transportation expenses compared to DFW commuters.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Healthcare
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Hunt Regional Medical Center and local providers offer quality
                care at lower costs, with DFW-level specialty services accessible
                within an hour.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Employer Impact
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                A lower cost of living means competitive salaries go further for
                employees, reducing wage pressure and improving recruitment and
                retention outcomes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Wage Advantage */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            The Wage Advantage
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            When an employee earning $50,000 in DFW moves to Commerce, their
            purchasing power increases substantially. Lower housing, commuting,
            and daily expenses mean employers can offer competitive wages
            without matching metro-level salaries — a genuine win-win for
            both companies and workers.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                No State Income Tax
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-green">
                0%
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Texas advantage for employees
              </p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                DFW Access
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                60 mi.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Via I-30 — metro amenities nearby
              </p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Small-Town Quality of Life
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                9,090
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Population — community feel
              </p>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Let Us Build Your Business Case"
        description="We can prepare a detailed cost-of-living comparison customized to your workforce profile and target wages."
        buttonText="Contact the EDC"
        buttonHref="/contact"
      />
    </>
  );
}
