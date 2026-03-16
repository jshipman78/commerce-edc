import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { generatePageMetadata } from '@/lib/metadata';
import { buildings } from '@/data/buildings';

export const metadata = generatePageMetadata({
  title: 'Available Buildings',
  description: 'Move-in ready industrial and warehouse facilities available in Commerce, Texas. Contact the Commerce EDC for specifications and tours.',
  path: '/available-buildings',
});

export default function AvailableBuildingsPage() {
  return (
    <>
      <SectionHero
        title="Available Buildings"
        subtitle="Move-in ready industrial and warehouse facilities in Commerce, Texas."
        breadcrumbs={[{ label: 'Available Buildings' }]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {buildings.map((building) => (
              <Card key={building.id} className="flex flex-col">
                <div className="aspect-video w-full rounded-lg bg-cream-dark" />
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {building.features.map((f) => (
                    <Badge key={f} variant="navy">{f}</Badge>
                  ))}
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy">{building.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{building.address}</p>
                <p className="mt-3 flex-1 text-sm text-gray-600">{building.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">
                    {building.squareFeet.toLocaleString()} SF
                  </span>
                  <span className="text-sm text-amber font-semibold">{building.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Specific Building Requirements?"
        description="Contact us with your specifications and we'll help you find the right facility in Commerce."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
