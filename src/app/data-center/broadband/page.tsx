import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Broadband Coverage',
  description:
    'Internet service provider availability, technology types, and download/upload speeds for Commerce, Texas (ZIP 75428) from the FCC Broadband Map.',
  path: '/data-center/broadband',
});

export default function BroadbandPage() {
  return (
    <>
      <SectionHero
        title="Broadband Coverage"
        subtitle="Internet service provider availability and speeds for Commerce, Texas (ZIP 75428)."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Broadband Coverage' },
        ]}
      />

      {/* Provider Table */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Service Providers &amp; Speeds
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The table below will display broadband providers serving Commerce,
            Texas (ZIP 75428), including technology type, maximum advertised
            download and upload speeds, and service area coverage.
          </p>

          <DataTable
            className="mt-8"
            headers={[
              'Provider',
              'Technology',
              'Max Download',
              'Max Upload',
              'Coverage Area',
            ]}
            rows={[
              ['Pending', 'Fiber (FTTH)', 'Pending', 'Pending', 'Pending'],
              ['Pending', 'Cable (DOCSIS)', 'Pending', 'Pending', 'Pending'],
              ['Pending', 'Fixed Wireless', 'Pending', 'Pending', 'Pending'],
              ['Pending', 'DSL', 'Pending', 'Pending', 'Pending'],
              ['Pending', 'Satellite', 'Pending', 'Pending', 'Pending'],
            ]}
            source="FCC Broadband Data Collection (broadbandmap.fcc.gov)"
          />

          <Card className="mt-8 border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Data Pending:</strong> Provider
              names, speeds, and coverage details for ZIP 75428 are being
              compiled from the FCC Broadband Map (
              <a
                href="https://broadbandmap.fcc.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline hover:text-amber/80"
              >
                broadbandmap.fcc.gov
              </a>
              ) and will be published upon verification.
            </p>
          </Card>
        </div>
      </section>

      {/* Broadband Context */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Why Broadband Matters for Business
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Remote Workforce
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Reliable high-speed internet enables companies to recruit
                remote-capable talent from the DFW Metroplex without the metro
                cost of living.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                Smart Manufacturing
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                IoT-connected production lines, real-time quality monitoring,
                and cloud-based ERP systems all depend on low-latency, high-
                bandwidth connectivity.
              </p>
            </Card>
            <Card>
              <h3 className="font-heading text-lg font-bold text-navy">
                University Partnership
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                East Texas A&amp;M University&rsquo;s campus network and
                research infrastructure create a high-bandwidth anchor for
                the Commerce broadband ecosystem.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FCC Definition Reference */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            FCC Broadband Benchmarks
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The FCC defines broadband service tiers to help consumers and
            businesses evaluate connectivity. The current benchmark for
            &ldquo;broadband&rdquo; is 100 Mbps download / 20 Mbps upload.
          </p>

          <DataTable
            className="mt-8"
            headers={['Tier', 'Download', 'Upload', 'Typical Use']}
            rows={[
              ['Basic Broadband', '25 Mbps', '3 Mbps', 'Email, web, video calls'],
              ['Broadband (Current Standard)', '100 Mbps', '20 Mbps', 'Streaming, telework, small business'],
              ['High-Speed Broadband', '250+ Mbps', '25+ Mbps', 'Multi-user offices, cloud services'],
              ['Gigabit', '1,000 Mbps', '100+ Mbps', 'Data centers, manufacturing, healthcare'],
            ]}
            source="FCC Communications Marketplace Report"
          />
        </div>
      </section>

      <CTASection
        title="Need Connectivity for Your Facility?"
        description="We work with ISPs and utility providers to ensure your site has the bandwidth your operation requires."
        buttonText="Contact the EDC"
        buttonHref="/contact"
      />
    </>
  );
}
