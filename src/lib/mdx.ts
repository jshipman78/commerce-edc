import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NewsPost } from '@/types';

const newsDirectory = path.join(process.cwd(), 'src/content/news');

export function getAllNewsPosts(): NewsPost[] {
  if (!fs.existsSync(newsDirectory)) return [];

  const files = fs.readdirSync(newsDirectory).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      author: data.author,
      image: data.image,
      tags: data.tags,
    } as NewsPost;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsPost(slug: string) {
  const filePath = path.join(newsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      author: data.author,
      image: data.image,
      tags: data.tags,
    } as NewsPost,
    content,
  };
}
