import Link from 'next/link';
import { ClipboardList, FileText, Scale, Shield } from 'lucide-react';
import { SectionHero } from '@/components/sections/SectionHero';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Transparency',
  description: 'Board agendas, meeting minutes, and public policies of the Commerce Economic Development Corporation.',
  path: '/transparency',
});

const items = [
  {
    href: '/transparency/agendas',
    icon: ClipboardList,
    title: 'Board Agendas',
    description: 'View notices and agendas for CEDC board meetings, sorted by date. Available as downloadable PDFs.',
    linkText: 'View Agendas',
  },
  {
    href: '/transparency/minutes',
    icon: FileText,
    title: 'Board Minutes',
    description: 'Access approved minutes from CEDC board meetings. Available as downloadable PDFs.',
    linkText: 'View Minutes',
  },
  {
    href: '/equal-opportunity-policy',
    icon: Scale,
    title: 'Equal Opportunity Policy',
    description: 'Read the Commerce EDC Equal Opportunity Public Notification Policy.',
    linkText: 'Read Policy',
  },
  {
    href: '/privacy-policy',
    icon: Shield,
    title: 'Privacy Policy',
    description: 'Review the Commerce EDC website privacy policy.',
    linkText: 'Read Policy',
  },
];

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
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="transition-shadow group-hover:shadow-xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/10">
                      <Icon className="h-6 w-6 text-amber" />
                    </div>
                    <h2 className="mt-4 font-heading text-xl font-bold text-navy">{item.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-amber group-hover:text-amber-dark">
                      {item.linkText} &rarr;
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
