import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Traffic Counts',
  description:
    'Annual average daily traffic (AADT) counts for I-30, US-69, and key highways serving Commerce, Texas — sourced from TxDOT.',
  path: '/data-center/traffic',
});

export default function TrafficPage() {
  return (
    <>
      <SectionHero
        title="Traffic Counts"
        subtitle="Annual Average Daily Traffic (AADT) data for corridors serving Commerce and Hunt County."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Traffic Counts' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Key Corridor Traffic Volumes
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Commerce sits at the intersection of major Texas transportation
            corridors. Interstate 30 provides direct east-west access between
            Dallas&ndash;Fort Worth and Texarkana, while US-69/US-380 and state
            highways connect north-south markets.
          </p>

          <DataTable
            className="mt-8"
            headers={['Corridor', 'Location / Segment', 'AADT (Vehicles/Day)', 'Year']}
            rows={[
              ['I-30', 'At Commerce (Hunt County)', 'Pending', 'TBD'],
              ['US-69 / US-380', 'Through Commerce', 'Pending', 'TBD'],
              ['SH-24 (Hwy 24)', 'Commerce to Greenville', 'Pending', 'TBD'],
              ['SH-11 (Hwy 11)', 'Commerce to Sulphur Springs', 'Pending', 'TBD'],
              ['FM-1570', 'South of Commerce', 'Pending', 'TBD'],
            ]}
            source="Texas Department of Transportation (TxDOT) Statewide Traffic Analysis"
          />

          <Card className="mt-8 border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Data Pending:</strong> Official AADT
              values are being requested from TxDOT&rsquo;s Transportation
              Planning &amp; Programming Division. This table will be updated
              with verified counts upon receipt.
            </p>
          </Card>
        </div>
      </section>

      {/* Context Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Why Traffic Counts Matter
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Retail Site Selection
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                AADT data is a critical input for retailers, restaurants, and
                service businesses evaluating drive-by visibility and customer
                access.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Industrial Logistics
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Manufacturers and distributors use corridor volumes to assess
                freight routing efficiency and supply chain proximity.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Infrastructure Investment
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Growing traffic volumes signal economic vitality and often
                precede TxDOT roadway improvement investments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Planning a Location Study?"
        description="We can provide supplemental traffic data, aerial maps, and site-specific corridor analysis for your project."
        buttonText="Contact the EDC"
        buttonHref="/contact"
      />
    </>
  );
}
