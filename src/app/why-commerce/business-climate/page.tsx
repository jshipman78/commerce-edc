import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Business Climate',
  description:
    'Texas is ranked the #1 state for business. Commerce offers no state income tax, right-to-work protections, a university workforce pipeline, and dedicated EDC incentive support.',
  path: '/why-commerce/business-climate',
});

const advantages = [
  {
    title: 'No State Income Tax',
    description:
      'Texas levies no personal or corporate state income tax, giving businesses and their employees a meaningful cost advantage compared to most competing states. This policy helps companies reinvest more capital into growth, equipment, and talent.',
  },
  {
    title: 'Right-to-Work State',
    description:
      'Texas right-to-work protections ensure that employees cannot be required to join or pay dues to a labor union as a condition of employment. This framework supports workforce flexibility and makes the state attractive to employers across all industries.',
  },
  {
    title: 'Pro-Business Regulatory Environment',
    description:
      'Texas consistently leads national rankings for business-friendliness thanks to streamlined permitting, predictable regulations, and a legal environment that favors enterprise. The state legislature actively works to reduce barriers to business formation and expansion.',
  },
];

export default function BusinessClimatePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Business Climate - Commerce, Texas',
          description:
            'Texas is ranked the #1 state for business, with no state income tax and right-to-work protections.',
          url: 'https://commerceedc.com/why-commerce/business-climate',
        }}
      />

      <SectionHero
        title="Business Climate"
        subtitle="Texas is consistently ranked the #1 state for business — and Commerce delivers the local advantages to match."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Why Commerce', href: '/why-commerce' },
          { label: 'Business Climate' },
        ]}
      />

      {/* Texas #1 Ranking */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="amber" className="text-sm px-4 py-1">Texas #1 for Business</Badge>
            <h2 className="mt-6 font-heading text-3xl font-bold text-navy sm:text-4xl">
              The Texas Advantage
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Year after year, Texas earns the top spot in national business climate rankings.
              Chief Executive Magazine, CNBC, and Site Selection Magazine have all recognized
              Texas for its combination of low taxes, skilled workforce, strategic location,
              and pro-growth policies. Commerce builds on that statewide advantage with local
              assets that make it uniquely competitive.
            </p>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Key Advantages
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {advantages.map((item) => (
              <Card key={item.title}>
                <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ETAMU Workforce Pipeline */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="navy">Workforce Pipeline</Badge>
              <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
                East Texas A&amp;M University
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Formerly Texas A&amp;M University-Commerce, East Texas A&amp;M University
                (ETAMU) is a regional research university enrolling approximately 12,000
                students. The university produces graduates across business, engineering
                technology, computer science, education, and the sciences — creating a
                steady pipeline of skilled talent for local and regional employers.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                ETAMU also partners with local industries on customized job training,
                workforce development programs, and applied research, making it a
                valuable resource for companies looking to train, upskill, or recruit.
              </p>
            </div>
            <div>
              <Card className="bg-navy text-white">
                <h3 className="font-heading text-xl font-bold text-white">
                  University at a Glance
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'Approximately 12,000 students enrolled',
                    'Part of the Texas A&M University System',
                    'NCAA Division II athletics (Lone Star Conference)',
                    'Programs in business, engineering technology, sciences, and education',
                    'Customized workforce training partnerships',
                    'Applied research collaborations with industry',
                  ].map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-300">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* EDC Support */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="green">EDC Support</Badge>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
              Commerce EDC Incentive Support
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              The Commerce Economic Development Corporation serves as the single point
              of contact for businesses considering Commerce. The EDC team provides
              confidential site selection assistance, helps assemble customized incentive
              packages, coordinates with city and county officials, and connects companies
              to state and federal programs.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Whether you are a manufacturer evaluating rail-served sites, a technology
              company exploring Opportunity Zone benefits, or a retailer looking for the
              right storefront, the Commerce EDC is committed to making your project
              successful.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Confidential Site Selection', detail: 'Private, no-obligation assistance' },
              { label: 'Incentive Packaging', detail: 'Local, state & federal programs' },
              { label: 'Permitting & Approvals', detail: 'Coordination with City & County' },
              { label: 'Ongoing Partnership', detail: 'Grand opening through expansion' },
            ].map((item) => (
              <Card key={item.label} className="text-center">
                <h3 className="font-heading text-lg font-bold text-navy">{item.label}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start a Confidential Conversation"
        description="Contact the Commerce EDC to learn how our business-friendly environment and incentive programs can support your next project."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
