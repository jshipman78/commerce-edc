import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Utilities & Infrastructure',
  description:
    'Electric, natural gas, water, and sewer capacity data for Commerce, Texas — Oncor, Atmos Energy, and City of Commerce utilities.',
  path: '/data-center/utilities',
});

export default function UtilitiesPage() {
  return (
    <>
      <SectionHero
        title="Utilities & Infrastructure"
        subtitle="Reliable, competitively priced utilities with capacity to support large-scale industrial and commercial projects."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Utilities & Infrastructure' },
        ]}
      />

      {/* Electric */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Electric Power
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Electric service is provided by Oncor Electric Delivery, one of the
            largest regulated electric distribution companies in Texas.
          </p>

          <DataTable
            className="mt-8"
            headers={['Metric', 'Value']}
            rows={[
              ['Provider', 'Oncor Electric Delivery'],
              ['System Reliability', '99.9721%'],
              ['Total Substation Capacity', '23,981 KW'],
              ['Reserve Capacity', '16.2%'],
              ['Voltage Available', '12.47 KV (distribution), 69 KV+ (transmission)'],
              ['Deregulated Market', 'Yes — competitive retail electric providers'],
            ]}
            source="Oncor Electric Delivery"
          />
        </div>
      </section>

      {/* Natural Gas */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Natural Gas
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Natural gas service is provided by Atmos Energy Corporation, the
            largest natural-gas-only distributor in the United States.
          </p>

          <DataTable
            className="mt-8"
            headers={['Metric', 'Value']}
            rows={[
              ['Provider', 'Atmos Energy Corporation'],
              ['BTU Content', '1,050 per cubic foot'],
              ['Industrial Gas Transport', 'Available'],
              ['Distribution Pressure', 'Available upon request'],
            ]}
            source="Atmos Energy Corporation"
          />
        </div>
      </section>

      {/* Water */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Water System
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The City of Commerce operates the municipal water system, sourced
            from Lake Tawakoni via the Sabine River Authority.
          </p>

          <DataTable
            className="mt-8"
            headers={['Metric', 'Value']}
            rows={[
              ['Source', 'Lake Tawakoni (Sabine River Authority)'],
              ['Treatment Capacity', '4,200,000 gallons/day (maximum)'],
              ['Storage Capacity', '2,345,000 gallons'],
              ['Distribution Mains', '6" to 16" lines'],
              ['Water Pressure', 'Maintained by elevated storage'],
            ]}
            source="City of Commerce Public Works"
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Max Daily Capacity
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                4.2M gal
              </p>
              <p className="mt-1 text-xs text-gray-500">Gallons per day</p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Total Storage
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                2.345M gal
              </p>
              <p className="mt-1 text-xs text-gray-500">Ground + elevated</p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Main Sizes
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                6&rdquo;&ndash;16&rdquo;
              </p>
              <p className="mt-1 text-xs text-gray-500">Distribution mains</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sewer */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Wastewater / Sewer
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The City of Commerce operates an activated-sludge wastewater
            treatment plant serving the incorporated area.
          </p>

          <DataTable
            className="mt-8"
            headers={['Metric', 'Value']}
            rows={[
              ['Treatment Type', 'Activated sludge'],
              ['Treatment Capacity', '2,000,000 gallons/day'],
              ['TCEQ Permit', 'Active — City of Commerce WWTP'],
            ]}
            source="City of Commerce Public Works"
          />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-cream py-8">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Verification Note:</strong> All
              utility figures shown are from the most recent data available to
              the Commerce EDC. Official utility confirmation letters for
              site-specific capacity are available upon request from each
              provider. Contact the EDC for assistance.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        title="Need a Utility Confirmation Letter?"
        description="We coordinate directly with Oncor, Atmos Energy, and the City of Commerce to provide utility capacity letters for your site."
        buttonText="Request Utility Data"
        buttonHref="/contact"
      />
    </>
  );
}
