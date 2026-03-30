import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { boardDocuments } from '@/data/documents';

export function AgendaSidebar() {
  const latestAgendas = boardDocuments
    .filter((doc) => doc.type === 'agenda')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Card>
      <h3 className="font-heading text-lg font-bold text-navy">Board Agendas</h3>
      <div className="mt-4 divide-y divide-gray-100">
        {latestAgendas.map((doc) => (
          <div key={doc.id} className="py-3 first:pt-0 last:pb-0">
            <a
              href={doc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-amber"
            >
              {doc.title}
            </a>
            <p className="text-xs text-gray-500">{formatDate(doc.date)}</p>
          </div>
        ))}
      </div>
      <Link
        href="/transparency/agendas"
        className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber-dark"
      >
        View All Agendas &rarr;
      </Link>
    </Card>
  );
}
