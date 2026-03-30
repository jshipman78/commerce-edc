import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SectionHero } from '@/components/sections/SectionHero';
import { getAllNewsPosts, getNewsPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Commerce EDC`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      ...(post.frontmatter.image && {
        images: [{ url: post.frontmatter.image }],
      }),
    },
  };
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const readTime = estimateReadTime(post.content);

  return (
    <>
      <SectionHero
        title={post.frontmatter.title}
        breadcrumbs={[
          { label: 'News', href: '/news' },
          { label: post.frontmatter.title },
        ]}
      />

      <article className="bg-cream">
        {/* Feature Image — full-bleed with overlay fade */}
        {post.frontmatter.image && (
          <div className="relative -mt-1">
            <div className="mx-auto max-w-5xl px-4">
              <div className="relative aspect-[2.2/1] overflow-hidden rounded-xl shadow-lg sm:aspect-[2.4/1]">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:pb-20 sm:pt-12">
          {/* Meta bar */}
          <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200/80 pb-6">
            <time className="text-[0.8rem] font-semibold tracking-[0.06em] text-gray-500">
              {formatDate(post.frontmatter.date).toUpperCase()}
            </time>
            <span className="hidden h-3.5 w-px bg-gray-300 sm:block" aria-hidden="true" />
            <span className="text-[0.8rem] font-medium tracking-wide text-gray-500">
              {readTime} min read
            </span>
          </div>

          {/* Lead paragraph + body */}
          <div className="article-prose prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy prose-p:leading-[1.8] prose-li:leading-[1.75] prose-a:text-amber prose-a:decoration-amber/30 prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 hover:prose-a:text-amber-dark hover:prose-a:decoration-amber-dark/50 prose-strong:text-navy prose-blockquote:not-italic prose-blockquote:border-amber prose-blockquote:pl-6 prose-blockquote:text-gray-600">
            <MDXRemote source={post.content} />
          </div>

          {/* Article footer */}
          <footer className="mt-14 border-t border-gray-200/80 pt-8">
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-amber"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to All News
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}
