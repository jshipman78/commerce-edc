import { notFound } from 'next/navigation';
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
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return (
    <>
      <SectionHero
        title={post.frontmatter.title}
        subtitle={formatDate(post.frontmatter.date)}
        breadcrumbs={[
          { label: 'News', href: '/news' },
          { label: post.frontmatter.title },
        ]}
      />

      <article className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-amber hover:prose-a:text-amber-dark">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </>
  );
}
