import { MapPin, Phone, Mail } from 'lucide-react';
import { SectionHero } from '@/components/sections/SectionHero';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/sections/ContactForm';
import { generatePageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/data/site-config';

export const metadata = generatePageMetadata({
  title: 'Contact',
  description: 'Contact the Commerce Economic Development Corporation. General inquiries or confidential site selector requests.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <SectionHero
        title="Contact Us"
        subtitle="Whether you have a general question or a confidential site selection inquiry, we're here to help."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* General Inquiry */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">General Inquiry</h2>
              <p className="mt-2 mb-6 text-sm text-gray-600">
                Questions about Commerce, the CEDC, or our community? We&apos;d love to hear from you.
              </p>
              <Card>
                <ContactForm defaultType="general" />
              </Card>
            </div>

            {/* Site Selector Inquiry */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">Site Selector Inquiry</h2>
              <p className="mt-2 mb-6 text-sm text-gray-600">
                All site selector inquiries are handled with complete confidentiality.
              </p>
              <Card className="ring-2 ring-amber/30">
                <ContactForm defaultType="site-selector" />
              </Card>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Card className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/10">
                <MapPin className="h-6 w-6 text-amber" />
              </div>
              <h3 className="mt-2 font-semibold text-navy">Address</h3>
              <p className="mt-1 text-sm text-gray-600">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
            </Card>
            <Card className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/10">
                <Phone className="h-6 w-6 text-amber" />
              </div>
              <h3 className="mt-2 font-semibold text-navy">Phone</h3>
              <p className="mt-1 text-sm text-gray-600">
                <a href={`tel:${siteConfig.phone}`} className="hover:text-amber">{siteConfig.phone}</a>
              </p>
            </Card>
            <Card className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/10">
                <Mail className="h-6 w-6 text-amber" />
              </div>
              <h3 className="mt-2 font-semibold text-navy">Email</h3>
              <p className="mt-1 text-sm text-gray-600">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber">{siteConfig.email}</a>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
