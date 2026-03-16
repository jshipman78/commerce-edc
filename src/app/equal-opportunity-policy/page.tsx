import { SectionHero } from '@/components/sections/SectionHero';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Equal Opportunity Policy',
  description: 'Equal Opportunity Public Notification Policy of the Commerce Economic Development Corporation.',
  path: '/equal-opportunity-policy',
});

export default function EqualOpportunityPolicyPage() {
  return (
    <>
      <SectionHero
        title="Equal Opportunity Policy"
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Equal Opportunity Policy' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy">
          <h2>Equal Opportunity Public Notification Policy</h2>

          <p>
            The Commerce Economic Development Corporation (CEDC) does not discriminate on the basis of
            race, color, national origin, sex, religion, age, disability, or status in any of its
            programs, activities, or employment practices.
          </p>

          <p>
            All programs and activities of the CEDC are available to all persons regardless of race,
            color, national origin, sex, religion, age, or disability.
          </p>

          <p>
            The CEDC is an equal opportunity employer. Employment decisions are based on qualifications,
            merit, and business needs. The CEDC is committed to providing an environment free from
            discrimination and harassment.
          </p>

          <h2>Reporting</h2>

          <p>
            Any person who believes they have been subjected to discrimination may file a complaint
            with the CEDC Executive Director:
          </p>

          <address className="not-italic">
            <strong>Bonnie Hunter, Executive Director</strong><br />
            Commerce Economic Development Corporation<br />
            1119 Alamo Street<br />
            Commerce, TX 75428<br />
            Phone: (903) 886-1121<br />
            Email:{' '}
            <a href="mailto:info@commerceedc.com" className="text-amber hover:text-amber-dark">
              info@commerceedc.com
            </a>
          </address>
        </div>
      </section>
    </>
  );
}
