import Link from 'next/link';
import Image from 'next/image';
import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Why Commerce',
  description:
    'Discover why Commerce, Texas is the ideal location for your business — with a pro-business climate, competitive incentives, strategic access, and outstanding quality of life.',
  path: '/why-commerce',
});

const sections = [
  {
    title: 'Business Climate',
    href: '/why-commerce/business-climate',
    badge: 'Texas #1',
    badgeVariant: 'amber' as const,
    description:
      'Texas is consistently ranked the #1 state for business. With no state income tax, a right-to-work framework, and East Texas A&M University as a workforce pipeline, Commerce delivers the competitive edge growing companies need.',
    highlights: ['No state income tax', 'Right-to-work state', 'University workforce pipeline'],
  },
  {
    title: 'Incentives & Opportunity Zone',
    href: '/why-commerce/incentives',
    badge: 'OZ Designated',
    badgeVariant: 'green' as const,
    description:
      'The Commerce EDC offers a comprehensive incentives toolkit — from land at no cost and spec building programs to tax abatements, forgivable loans, and federal Opportunity Zone benefits.',
    highlights: ['Land at no cost', 'Tax abatements & TIRZ', 'Forgivable loans'],
  },
  {
    title: 'Location & Access',
    href: '/why-commerce/location',
    badge: '65 mi NE of Dallas',
    badgeVariant: 'navy' as const,
    description:
      'Situated in Hunt County just off I-30, Commerce offers multi-modal access via highway, rail, and air — connecting businesses to the DFW Metroplex, Austin, Houston, and beyond.',
    highlights: ['I-30 corridor access', 'Two shortline railroads', 'Municipal airport'],
  },
  {
    title: 'Quality of Life',
    href: '/why-commerce/quality-of-life',
    badge: 'Small-Town Charm',
    badgeVariant: 'green' as const,
    description:
      'Commerce blends small-town character with big-city amenities — parks, lakes, NCAA Division II athletics, a historic downtown, a planetarium, and a welcoming community that families and businesses call home.',
    highlights: ['5 area lakes', 'NCAA Div II athletics', '14 church denominations'],
  },
];

export default function WhyCommercePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Why Commerce',
          description:
            'Discover why Commerce, Texas is the ideal location for business relocation and expansion.',
          url: 'https://commerceedc.com/why-commerce',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Commerce Economic Development Corporation',
          },
        }}
      />

      <SectionHero
        title="Why Commerce"
        subtitle="A pro-business community with strategic location, competitive incentives, and a quality of life that attracts and retains talent."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Why Commerce' },
        ]}
      />

      {/* Introduction */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Commerce, Texas
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Located 65 miles northeast of Dallas in Hunt County, Commerce is a growing
                community of approximately 10,000 residents anchored by East Texas A&amp;M
                University. With direct access to the I-30 corridor, two shortline railroads,
                and a federally designated Opportunity Zone, Commerce offers a business
                environment that is both competitive and collaborative.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                The Commerce Economic Development Corporation works with companies at every
                stage — from initial site selection through grand opening and beyond — providing
                confidential assistance, incentive packaging, and connections to local and state
                resources.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/community/campus-aerial.jpeg"
                alt="Aerial view of East Texas A&amp;M University and downtown Commerce"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <Link key={section.href} href={section.href} className="group">
                <Card className="h-full transition-shadow duration-200 group-hover:shadow-xl group-hover:ring-amber/50">
                  <div className="flex items-start justify-between">
                    <h3 className="font-heading text-2xl font-bold text-navy">
                      {section.title}
                    </h3>
                    <Badge variant={section.badgeVariant}>{section.badge}</Badge>
                  </div>
                  <p className="mt-4 text-gray-600">{section.description}</p>
                  <ul className="mt-6 space-y-2">
                    {section.highlights.map((item) => (
                      <li key={item} className="flex items-center text-sm text-gray-700">
                        <span className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-semibold text-amber group-hover:text-amber-dark">
                    Learn more &rarr;
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Explore Commerce?"
        description="Start a confidential conversation with the Commerce EDC team. We'll help you evaluate sites, incentives, and community fit."
        buttonText="Contact Us Today"
        buttonHref="/contact"
      />
    </>
  );
}
