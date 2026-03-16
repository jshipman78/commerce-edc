import { SectionHero } from '@/components/sections/SectionHero';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for the Commerce Economic Development Corporation website.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SectionHero
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy">
          <p className="text-gray-600">
            <em>Last updated: March 2026</em>
          </p>

          <h2>Information We Collect</h2>
          <p>
            The Commerce Economic Development Corporation (&quot;CEDC,&quot; &quot;we,&quot; &quot;us&quot;) collects information you voluntarily
            provide when you contact us through our website, including your name, email address, phone
            number, company name, and message content.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            Information collected through our contact forms is used solely to respond to your inquiry
            and provide the requested information about economic development opportunities in Commerce,
            Texas. We do not sell, trade, or share your personal information with third parties.
          </p>

          <h2>Site Selector Confidentiality</h2>
          <p>
            All site selector inquiries submitted through our confidential inquiry form are treated
            with the highest level of confidentiality. Project details, company information, and
            contact information are shared only with CEDC staff directly involved in responding to
            your inquiry.
          </p>

          <h2>Cookies and Analytics</h2>
          <p>
            This website may use cookies and analytics tools to understand how visitors use our site.
            This information is collected in aggregate and does not personally identify individual users.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of these external sites.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{' '}
            <a href="mailto:info@commerceedc.com" className="text-amber hover:text-amber-dark">
              info@commerceedc.com
            </a>{' '}
            or call{' '}
            <a href="tel:9038861121" className="text-amber hover:text-amber-dark">
              (903) 886-1121
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
