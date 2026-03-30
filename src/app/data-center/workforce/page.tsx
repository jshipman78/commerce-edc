import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Workforce & Demographics',
  description:
    'Population, labor force, educational attainment, and major employer data for Commerce, Texas and Hunt County.',
  path: '/data-center/workforce',
});

export default function WorkforcePage() {
  return (
    <>
      <SectionHero
        title="Workforce & Demographics"
        subtitle="A university-anchored labor market with skilled talent and competitive wages."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Data Center', href: '/data-center' },
          { label: 'Workforce & Demographics' },
        ]}
      />

      {/* Population Overview */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Population
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Commerce serves as the economic hub for northeast Hunt County,
            anchored by East Texas A&amp;M University and a growing
            manufacturing sector.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                City of Commerce
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-navy">
                9,090
              </p>
              <p className="mt-1 text-xs text-gray-500">2021 Census Est.</p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Hunt County
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-navy">
                99,956
              </p>
              <p className="mt-1 text-xs text-gray-500">2021 Census Est.</p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                30-Minute Drive
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-navy">
                ~150,000+
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Labor shed population
              </p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                DFW Metroplex
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-navy">
                7.6M+
              </p>
              <p className="mt-1 text-xs text-gray-500">
                60 mi. via I-30
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* East Texas A&M University */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            East Texas A&amp;M University
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Established in 1889, ETAMU is Commerce&rsquo;s largest employer and
            a cornerstone of the regional talent pipeline. The university offers
            100+ majors at the undergraduate, master&rsquo;s, and doctoral
            levels, producing a steady stream of graduates in engineering
            technology, business, nursing, education, and the sciences.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Founded
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                1889
              </p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Academic Programs
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                100+
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Undergraduate, Master&rsquo;s &amp; Doctoral
              </p>
            </Card>
            <Card>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Employees
              </p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">
                ~850
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Largest employer in Commerce
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Major Employers */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Major Employers
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Commerce&rsquo;s employer base spans higher education, advanced
            manufacturing, retail, and public services.
          </p>

          <DataTable
            className="mt-8"
            headers={['Employer', 'Industry', 'Employees']}
            rows={[
              ['East Texas A&M University', 'Higher Education', '~850'],
              ['Commerce ISD', 'Education', '~230'],
              ['Walmart Supercenter', 'Retail', '~200'],
              ['Legacy Housing Corporation', 'Manufacturing', '~128'],
              ['Hydro Aluminum Metals', 'Manufacturing', '--'],
              ['Zurn PEX Inc', 'Manufacturing', '--'],
              ['KLZ Stone Group Inc', 'Manufacturing', '--'],
            ]}
            source="Commerce EDC employer survey; employee counts are approximate"
          />

          <Card className="mt-8 border-l-4 border-amber bg-amber/5">
            <p className="text-sm text-gray-600">
              <strong className="text-navy">Note:</strong> Current employment
              figures from the Texas Workforce Commission (TWC) Quarterly Census
              of Employment and Wages are being compiled and will be added to
              this page upon verification.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        title="Need a Custom Workforce Profile?"
        description="We can compile labor availability, wage data, and training resources tailored to your industry. All inquiries are confidential."
        buttonText="Contact the EDC"
        buttonHref="/contact"
      />
    </>
  );
}
