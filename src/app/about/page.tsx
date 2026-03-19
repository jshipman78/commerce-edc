import Image from 'next/image';
import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';
import { boardMembers } from '@/data/board-members';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = generatePageMetadata({
  title: 'About CEDC',
  description: 'Learn about the Commerce Economic Development Corporation — our mission, history, board of directors, and commitment to economic growth in Commerce, Texas.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'GovernmentOrganization',
          name: 'Commerce Economic Development Corporation',
          foundingDate: '1994-01',
          description: 'Nonprofit organization promoting economic development in Commerce, Texas through business recruitment, retention, and expansion.',
        }}
      />

      <SectionHero
        title="About the Commerce EDC"
        subtitle="Promoting economic development in Commerce, Texas since 1994."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Mission & History */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">Our Mission</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            The Commerce Economic Development Corporation (CEDC) is a nonprofit organization
            established to promote economic development in Commerce, Texas through the recruitment,
            retention, and expansion of business and industry. The CEDC was established in January 1994
            when the citizens of Commerce approved a local option 4A Sales Tax dedicated to economic
            development.
          </p>

          <h2 className="mt-12 font-heading text-2xl font-bold text-navy">What is a 4A Corporation?</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            The CEDC operates under the Texas Development Corporation Act as a Type A (4A) economic
            development corporation. The 4A sales tax generates revenue dedicated exclusively to
            economic development projects — including land acquisition, infrastructure development,
            and business incentive programs. This funding mechanism allows Commerce to compete
            effectively for business and industrial development projects.
          </p>

          <h2 className="mt-12 font-heading text-2xl font-bold text-navy">History & Achievements</h2>
          <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
            <p>
              Since its founding, the CEDC has invested in the growth of Commerce through strategic
              land acquisitions, infrastructure improvements, and business incentive programs:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Acquired and developed the 150-acre FM 3218 Industrial Park</li>
              <li>Installed major water and gas infrastructure to serve industrial users</li>
              <li>Published the Commerce Community Profile for site selector distribution</li>
              <li>Commissioned the Hunt County Wage & Benefit Survey and NE Texas Regional Labor Survey</li>
              <li>Won the Texas Economic Development Council &quot;Community Economic Development Award&quot; in 2002 (population category 5,001–15,000)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Community Image */}
      <section className="relative h-64 sm:h-80">
        <Image
          src="/images/community/aerial-neighborhood.jpg"
          alt="Aerial view of Commerce, Texas neighborhood"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/20" />
      </section>

      {/* Board of Directors */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-navy">Board of Directors</h2>
            <p className="mt-2 text-gray-600">
              The CEDC board is composed of local business and community leaders committed to
              Commerce&apos;s economic growth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member) => (
              <Card key={member.name} className="text-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto h-24 w-24 rounded-full bg-navy/10" />
                )}
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{member.name}</h3>
                <p className="text-sm font-semibold text-amber">{member.title}</p>
                <p className="mt-1 text-sm text-gray-500">{member.organization}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Commerce Means Business"
        description="Ready to explore what Commerce can offer your business? We're here to help — confidentially and professionally."
        buttonText="Contact the CEDC"
        buttonHref="/contact"
      />
    </>
  );
}
