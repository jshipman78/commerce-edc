import Link from 'next/link';
import { SectionHero } from '@/components/sections/SectionHero';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Transparency',
  description: 'Board agendas, meeting minutes, and public policies of the Commerce Economic Development Corporation.',
  path: '/transparency',
});

export default function TransparencyPage() {
  return (
    <>
      <SectionHero
        title="Transparency"
        subtitle="The Commerce EDC is committed to open governance. Access board agendas, meeting minutes, and public policies below."
        breadcrumbs={[{ label: 'Transparency' }]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/transparency/agendas" className="group">
              <Card className="transition-shadow group-hover:shadow-md">
                <div className="text-3xl">📋</div>
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">Board Agendas</h2>
                <p className="mt-2 text-sm text-gray-600">
                  View notices and agendas for CEDC board meetings, sorted by date. Available as downloadable PDFs.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber group-hover:text-amber-dark">
                  View Agendas &rarr;
                </span>
              </Card>
            </Link>

            <Link href="/transparency/minutes" className="group">
              <Card className="transition-shadow group-hover:shadow-md">
                <div className="text-3xl">📝</div>
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">Board Minutes</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Access approved minutes from CEDC board meetings. Available as downloadable PDFs.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber group-hover:text-amber-dark">
                  View Minutes &rarr;
                </span>
              </Card>
            </Link>

            <Link href="/equal-opportunity-policy" className="group">
              <Card className="transition-shadow group-hover:shadow-md">
                <div className="text-3xl">⚖️</div>
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">Equal Opportunity Policy</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Read the Commerce EDC Equal Opportunity Public Notification Policy.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber group-hover:text-amber-dark">
                  Read Policy &rarr;
                </span>
              </Card>
            </Link>

            <Link href="/privacy-policy" className="group">
              <Card className="transition-shadow group-hover:shadow-md">
                <div className="text-3xl">🔒</div>
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">Privacy Policy</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Review the Commerce EDC website privacy policy.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber group-hover:text-amber-dark">
                  Read Policy &rarr;
                </span>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
