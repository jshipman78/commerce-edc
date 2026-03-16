import Link from 'next/link';
import { SectionHero } from '@/components/sections/SectionHero';
import { Card } from '@/components/ui/Card';
import { generatePageMetadata } from '@/lib/metadata';
import { getAllNewsPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'News',
  description: 'Latest news and updates from the Commerce Economic Development Corporation.',
  path: '/news',
});

export default function NewsPage() {
  const posts = getAllNewsPosts();

  return (
    <>
      <SectionHero
        title="News"
        subtitle="Updates, announcements, and economic development news from Commerce, Texas."
        breadcrumbs={[{ label: 'News' }]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.slug}>
                <time className="text-xs text-gray-400">{formatDate(post.date)}</time>
                <h2 className="mt-2 font-heading text-xl font-bold text-navy">
                  <Link href={`/news/${post.slug}`} className="hover:text-amber">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <Link
                  href={`/news/${post.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-amber hover:text-amber-dark"
                >
                  Read More &rarr;
                </Link>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="py-12 text-center text-gray-500">No news posts yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
