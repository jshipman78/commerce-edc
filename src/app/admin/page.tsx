import Link from 'next/link';
import { getNewsArticles, getAgendaFiles, getMediaFiles } from '@/lib/admin/data';

export default async function AdminDashboard() {
  const [articles, agendas, media] = await Promise.all([
    getNewsArticles(),
    getAgendaFiles(),
    getMediaFiles(),
  ]);

  const stats = [
    { label: 'News Articles', value: articles.length, href: '/admin/news', color: 'bg-blue-500' },
    { label: 'Agendas', value: agendas.length, href: '/admin/agendas', color: 'bg-green-500' },
    { label: 'Media Files', value: media.filter((m) => m.type === 'image').length, href: '/admin/media', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Welcome to the Commerce EDC admin panel.</p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center text-lg font-bold text-white`}>
                {stat.value}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value} total</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'New Article', href: '/admin/news/new', desc: 'Write a news post' },
            { label: 'Upload Agenda', href: '/admin/agendas', desc: 'Add board agenda' },
            { label: 'Edit Properties', href: '/admin/properties', desc: 'Update property listings' },
            { label: 'Media Library', href: '/admin/media', desc: 'Upload images & files' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-xl border border-gray-200 bg-white px-4 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="font-semibold text-gray-900">{action.label}</p>
              <p className="mt-0.5 text-sm text-gray-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Articles</h2>
          <Link href="/admin/news" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View all
          </Link>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          {articles.slice(0, 5).map((article) => (
            <Link
              key={article.slug}
              href={`/admin/news/${article.slug}/edit`}
              className="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{article.title}</p>
                <p className="text-xs text-gray-500">{article.date}</p>
              </div>
              <svg className="ml-3 h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
