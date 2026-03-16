import { SectionHero } from '@/components/sections/SectionHero';
import { YearFilter } from '@/components/sections/YearFilter';
import { generatePageMetadata } from '@/lib/metadata';
import { boardDocuments } from '@/data/documents';

export const metadata = generatePageMetadata({
  title: 'Board Agendas',
  description: 'Board meeting agendas and notices for the Commerce Economic Development Corporation. Download meeting agendas as PDFs.',
  path: '/transparency/agendas',
});

export default function AgendasPage() {
  const agendas = boardDocuments
    .filter((doc) => doc.type === 'agenda')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SectionHero
        title="Board Agendas"
        subtitle="Notices and agendas for CEDC board meetings. Meetings are held at Commerce City Hall, 1119 Alamo Street, Commerce, TX 75428."
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Agendas' },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <YearFilter documents={agendas} />
        </div>
      </section>
    </>
  );
}
