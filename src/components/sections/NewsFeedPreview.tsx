import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import type { NewsPost } from '@/types';

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Card className="group flex flex-col">
      {post.image && (
        <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <time className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-gray-400">{formatDate(post.date)}</time>
      <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-navy">
        <Link href={`/news/${post.slug}`} className="hover:text-amber">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
      <Link href={`/news/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber-dark">
        Read More &rarr;
      </Link>
    </Card>
  );
}

export function NewsFeedPreview({ posts }: { posts: NewsPost[] }) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-navy">Latest News</h2>
          <p className="mt-2 text-gray-600">Updates from the Commerce EDC</p>
        </div>
        <Link href="/news" className="hidden text-sm font-semibold text-amber hover:text-amber-dark sm:block">
          View All News &rarr;
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link href="/news" className="text-sm font-semibold text-amber hover:text-amber-dark">
          View All News &rarr;
        </Link>
      </div>
    </div>
  );
}
