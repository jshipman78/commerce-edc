import { SectionHero } from '@/components/sections/SectionHero';
import { YearFilter } from '@/components/sections/YearFilter';
import { generatePageMetadata } from '@/lib/metadata';
import { boardDocuments } from '@/data/documents';

export const metadata = generatePageMetadata({
  title: 'Board Minutes',
  description: 'Approved meeting minutes for the Commerce Economic Development Corporation board. Download minutes as PDFs.',
  path: '/transparency/minutes',
});

export default function MinutesPage() {
  const minutes = boardDocuments
    .filter((doc) => doc.type === 'minutes')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SectionHero
        title="Board Minutes"
        subtitle="Approved minutes from CEDC board meetings."
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Minutes' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <YearFilter documents={minutes} />
        </div>
      </section>
    </>
  );
}
