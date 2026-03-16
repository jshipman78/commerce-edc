import { Hero } from '@/components/sections/Hero';
import { StatBar } from '@/components/sections/StatBar';
import { NewsFeedPreview } from '@/components/sections/NewsFeedPreview';
import { AgendaSidebar } from '@/components/sections/AgendaSidebar';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllNewsPosts } from '@/lib/mdx';

export default function HomePage() {
  const latestPosts = getAllNewsPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'GovernmentOrganization'],
          name: 'Commerce Economic Development Corporation',
          description: 'Promoting economic growth and opportunity in Commerce, Texas.',
          url: 'https://commerceedc.com',
          telephone: '(903) 886-1121',
          email: 'info@commerceedc.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1119 Alamo Street',
            addressLocality: 'Commerce',
            addressRegion: 'TX',
            postalCode: '75428',
            addressCountry: 'US',
          },
        }}
      />

      <Hero />
      <StatBar />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <NewsFeedPreview posts={latestPosts} />
          </div>
          <div>
            <AgendaSidebar />
          </div>
        </div>
      </div>

      <PartnerLogos />

      <CTASection
        title="Start a Confidential Conversation"
        description="Whether you're exploring Commerce for the first time or ready to break ground, we're here to help. All site selector inquiries are handled with complete confidentiality."
        buttonText="Contact Us Today"
        buttonHref="/contact"
      />
    </>
  );
}
