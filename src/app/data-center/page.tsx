import Link from 'next/link';
import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Data Center',
  description:
    'Comprehensive community data for site selectors and decision-makers — workforce, utilities, traffic, tax rates, broadband, and cost of living in Commerce, Texas.',
  path: '/data-center',
});

const dataPages = [
  {
    title: 'Workforce & Demographics',
    href: '/data-center/workforce',
    description:
      'Population, labor force, educational attainment, and major employers in Commerce and Hunt County.',
  },
  {
    title: 'Traffic Counts',
    href: '/data-center/traffic',
    description:
      'TxDOT annual average daily traffic counts for I-30, US-69, and key state highways.',
  },
  {
    title: 'Utilities & Infrastructure',
    href: '/data-center/utilities',
    description:
      'Electric, natural gas, water, and sewer capacity data from Oncor, Atmos Energy, and the City of Commerce.',
  },
  {
    title: 'Tax Rates',
    href: '/data-center/tax-rates',
    description:
      'Property tax rate comparison across Hunt County, City of Commerce, Commerce ISD, and the Hospital District.',
  },
  {
    title: 'Broadband Coverage',
    href: '/data-center/broadband',
    description:
      'Internet service provider availability, technology types, and speeds for ZIP 75428 from the FCC Broadband Map.',
  },
  {
    title: 'Cost of Living',
    href: '/data-center/cost-of-living',
    description:
      'Side-by-side comparison of housing, utilities, groceries, transportation, and healthcare costs versus DFW.',
  },
];

export default function DataCenterPage() {
  return (
    <>
      <SectionHero
        title="Stop Searching. Start Deciding."
        subtitle="Transparent, verified community data compiled for site selectors, corporate decision-makers, and entrepreneurs evaluating Commerce, Texas."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              Community Data at Your Fingertips
            </h2>
            <p className="mt-4 text-gray-600">
              Every data point below is sourced from official agencies and
              verified by the Commerce EDC. Select a category to dive into the
              numbers that matter for your project.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dataPages.map((page) => (
              <Link key={page.href} href={page.href} className="group">
                <Card className="h-full transition-shadow duration-200 group-hover:shadow-md group-hover:ring-amber">
                  <h3 className="font-heading text-lg font-bold text-navy group-hover:text-amber">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {page.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-amber">
                    View Data &rarr;
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Custom Data for Your Project?"
        description="Our team can compile a tailored data package for your specific site-selection criteria. All inquiries are confidential."
        buttonText="Request a Data Package"
        buttonHref="/contact"
      />
    </>
  );
}
