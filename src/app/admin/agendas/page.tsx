import { getAgendaFiles } from '@/lib/admin/data';
import { AgendaManager } from '@/components/admin/AgendaManager';

export default async function AdminAgendasPage() {
  const agendas = await getAgendaFiles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage board meeting agendas. Must be posted 72 hours before meetings.
          </p>
        </div>
      </div>

      <AgendaManager initialAgendas={agendas} />
    </div>
  );
}
