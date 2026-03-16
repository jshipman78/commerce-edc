import type { Metadata } from 'next';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  const url = `https://commerceedc.com${path}`;
  const ogImage = image || '/images/og/default.jpg';

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Commerce EDC`,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: url,
    },
  };
}
