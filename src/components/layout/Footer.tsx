import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { footerNavigation } from '@/data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="h-1 bg-gradient-to-r from-amber via-amber-light to-green" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact column */}
          <div>
            <Image
              src="/images/logo/edc-logo.png"
              alt="Commerce EDC"
              width={200}
              height={155}
              className="h-20 w-auto brightness-0 invert"
            />
            <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-white">Commerce EDC</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{siteConfig.description}</p>
            <div className="mt-4 space-y-1.5 text-sm text-gray-300">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
              <p>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-amber-light">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-light">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-light/80">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-200 hover:text-amber-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Center Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-light/80">Data Center</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.dataCenter.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-200 hover:text-amber-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-light/80">Legal</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-200 hover:text-amber-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-light pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1.5 font-heading text-sm font-semibold tracking-wide text-amber-light/70">Commerce Means Business</p>
        </div>
      </div>
    </footer>
  );
}
