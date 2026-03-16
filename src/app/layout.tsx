import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Commerce Economic Development Corporation | Commerce, TX',
    template: '%s | Commerce EDC',
  },
  description: 'The Commerce Economic Development Corporation promotes economic growth and opportunity in Commerce, Texas — strategically located on I-30, rail-served, and ready for business.',
  metadataBase: new URL('https://commerceedc.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://commerceedc.com',
    siteName: 'Commerce Economic Development Corporation',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
