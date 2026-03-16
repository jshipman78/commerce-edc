import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { generatePageMetadata } from '@/lib/metadata';
import { properties } from '@/data/properties';

export const metadata = generatePageMetadata({
  title: 'Available Properties',
  description: 'Explore 230+ acres of shovel-ready industrial land owned by the Commerce EDC. Rail-served sites, Opportunity Zone eligible, with utilities in place.',
  path: '/available-properties',
});

export default function AvailablePropertiesPage() {
  return (
    <>
      <SectionHero
        title="Available Properties"
        subtitle="230+ acres of EDC-owned industrial land — shovel-ready, rail-served, and competitively priced."
        breadcrumbs={[{ label: 'Available Properties' }]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              The Commerce Economic Development Corporation owns and maintains six industrial tracts
              totaling over 230 acres. All properties are zoned industrial, most are rail-served via
              the NETEX/Blacklands Railroad, and all are priced to negotiate. Contact us for a
              confidential site tour.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Request a Site Tour"
        description="All site selector inquiries are handled with complete confidentiality. Let us show you why Commerce is the right location for your next project."
        buttonText="Schedule a Confidential Tour"
        buttonHref="/contact?type=site-selector"
        variant="amber"
      />
    </>
  );
}
