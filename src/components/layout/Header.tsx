'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mainNavigation } from '@/data/navigation';
import { siteConfig } from '@/data/site-config';
import type { NavItem } from '@/types';

function MegaMenuDropdown({ item }: { item: NavItem }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-0 w-72 rounded-b-lg border-t-2 border-amber bg-white shadow-xl ring-1 ring-gray-200/60">
      <div className="p-4">
        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block rounded-md px-3 py-2.5 hover:bg-cream"
          >
            <span className="block text-sm font-semibold text-navy">{child.label}</span>
            {child.description && (
              <span className="block text-xs text-gray-600 mt-0.5">{child.description}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <span className="font-heading text-lg font-bold text-navy">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          {mainNavigation.map((item) => (
            <div key={item.href} className="border-b border-gray-100">
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between py-3 text-left text-navy font-semibold"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSubmenu === item.label && (
                    <div className="pb-2 pl-4">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-2 text-sm text-gray-600 hover:text-amber"
                      >
                        Overview
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 text-sm text-gray-600 hover:text-amber"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-navy font-semibold"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full rounded-lg bg-amber px-4 py-3 text-center font-semibold text-white hover:bg-amber-dark"
          >
            Contact Us
          </Link>
          <p className="mt-3 text-center text-sm text-gray-600">{siteConfig.phone}</p>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur-md border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[0.8rem] tracking-wide">
          <a href={`tel:${siteConfig.phone}`} className="font-medium hover:text-amber-light">
            {siteConfig.phone}
          </a>
          <span className="hidden text-white/90 sm:block">{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between lg:h-24">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/edc-logo.png"
              alt="Commerce EDC"
              width={400}
              height={310}
              className="h-16 w-auto lg:h-[80px]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {mainNavigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-cream hover:text-navy"
                >
                  {item.label}
                  {item.children && (
                    <svg className="ml-1 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <MegaMenuDropdown item={item} />
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-white hover:bg-amber-dark sm:block"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
