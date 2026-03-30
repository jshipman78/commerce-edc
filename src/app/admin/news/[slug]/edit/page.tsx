import { getNewsArticle } from '@/lib/admin/data';
import { NewsEditor } from '@/components/admin/NewsEditor';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  return <NewsEditor article={article} />;
}
