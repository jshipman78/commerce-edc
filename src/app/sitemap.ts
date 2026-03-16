import type { MetadataRoute } from 'next';
import { getAllNewsPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://commerceedc.com';

  const staticRoutes = [
    '',
    '/why-commerce',
    '/why-commerce/business-climate',
    '/why-commerce/incentives',
    '/why-commerce/location',
    '/why-commerce/quality-of-life',
    '/data-center',
    '/data-center/workforce',
    '/data-center/traffic',
    '/data-center/utilities',
    '/data-center/tax-rates',
    '/data-center/broadband',
    '/data-center/cost-of-living',
    '/available-properties',
    '/available-buildings',
    '/businesses',
    '/news',
    '/transparency',
    '/transparency/agendas',
    '/transparency/minutes',
    '/about',
    '/contact',
    '/privacy-policy',
    '/equal-opportunity-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route.split('/').length <= 2 ? 0.8 : 0.6,
  }));

  const newsPosts = getAllNewsPosts().map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsPosts];
}
