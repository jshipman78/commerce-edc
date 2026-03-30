import Link from 'next/link';
import { getNewsArticles } from '@/lib/admin/data';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminNewsPage() {
  const articles = await getNewsArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Articles</h1>
          <p className="mt-1 text-sm text-gray-500">{articles.length} articles</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152238]"
        >
          + New Article
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Category</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/news/${article.slug}/edit`} className="font-medium text-gray-900 hover:text-blue-600">
                    {article.title}
                  </Link>
                  <p className="mt-0.5 truncate text-xs text-gray-500 max-w-sm">{article.excerpt}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{article.date}</td>
                <td className="px-4 py-3">
                  {article.category && (
                    <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {article.category}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/news/${article.slug}/edit`}
                      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <DeleteButton type="news" id={article.slug} name={article.title} />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-500">
                  No articles yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
