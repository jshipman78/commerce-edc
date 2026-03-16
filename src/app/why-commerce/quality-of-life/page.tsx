import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Quality of Life',
  description:
    'Commerce, Texas offers outstanding quality of life with parks, lakes, NCAA Division II athletics, a historic downtown, community events, and a welcoming small-town atmosphere.',
  path: '/why-commerce/quality-of-life',
});

const communityAssets = [
  { label: 'City Parks', value: '3' },
  { label: 'Area Lakes', value: '5' },
  { label: 'Country Club', value: '1' },
  { label: 'Health Centers', value: '3' },
  { label: 'Libraries', value: '2' },
  { label: 'Hotel Rooms', value: '131' },
  { label: 'Boys & Girls Club', value: '1' },
  { label: 'NCAA Div II Athletics', value: 'ETAMU Lions' },
];

const localAttractions = [
  {
    name: 'Bois d\'Arc Bash',
    description: 'Annual community festival celebrating Commerce\'s heritage with live music, food, vendors, and family activities.',
  },
  {
    name: 'Annual Golf Tournament',
    description: 'Community golf tournament held at the local country club, bringing together residents and businesses.',
  },
  {
    name: 'Christmas Downtown',
    description: 'Holiday celebration in historic downtown Commerce featuring lights, seasonal vendors, and community gatherings.',
  },
  {
    name: 'ETAMU Campus Events',
    description: 'East Texas A&M University hosts concerts, lectures, theater productions, art exhibits, and athletic events throughout the year.',
  },
  {
    name: 'NE Texas Children\'s Museum',
    description: 'Interactive museum providing hands-on educational exhibits and programs for children and families.',
  },
  {
    name: '4th of July Celebration',
    description: 'Annual Independence Day festivities with fireworks, parades, and community activities.',
  },
  {
    name: 'Planetarium',
    description: 'Located on the ETAMU campus, the planetarium offers public shows, educational programs, and stargazing events.',
  },
];

const areaAttractions = [
  {
    name: 'Cooper Lake State Park',
    description: 'Located northeast of Commerce, Cooper Lake offers fishing, camping, hiking, swimming, and wildlife viewing on a 19,300-acre reservoir.',
  },
  {
    name: 'Southwest Dairy Museum',
    description: 'Dedicated to the history and heritage of the dairy industry in the Southwest, featuring exhibits, artifacts, and educational programs in nearby Sulphur Springs.',
  },
  {
    name: 'Audie Murphy / American Cotton Museum',
    description: 'Located in Greenville, this museum honors Medal of Honor recipient Audie Murphy and preserves the history of cotton farming in the Blackland Prairie region.',
  },
];

const climateHeaders = ['Measurement', 'Value'];
const climateRows: [string, string][] = [
  ['Annual Average Temperature', '63.6\u00B0F'],
  ['Average High Temperature', '74.3\u00B0F'],
  ['Average Low Temperature', '52.2\u00B0F'],
  ['Annual Rainfall', '45.3 inches'],
  ['Annual Snowfall', '2.3 inches'],
  ['Elevation Range', '688 - 1,553 feet'],
];

export default function QualityOfLifePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Quality of Life - Commerce, Texas',
          description:
            'Commerce offers outstanding quality of life with parks, lakes, NCAA athletics, community events, and small-town character.',
          url: 'https://commerceedc.com/why-commerce/quality-of-life',
        }}
      />

      <SectionHero
        title="Quality of Life"
        subtitle="Small-town character, big-city amenities, and a welcoming community that families and businesses are proud to call home."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Why Commerce', href: '/why-commerce' },
          { label: 'Quality of Life' },
        ]}
      />

      {/* Recreation & Community Assets */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Recreation & Community Assets
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Commerce offers a range of recreational and community facilities that
            support an active, connected lifestyle for residents of all ages.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communityAssets.map((asset) => (
              <Card key={asset.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-amber">{asset.value}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">{asset.label}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Senior Programs',
                description:
                  'Commerce provides programs and services for senior residents including social activities, health screenings, meal programs, and recreational opportunities.',
              },
              {
                title: 'Boys & Girls Club',
                description:
                  'The local Boys & Girls Club offers after-school and summer programs for youth, including academic support, sports, arts, and leadership development.',
              },
              {
                title: 'NCAA Division II Athletics',
                description:
                  'East Texas A&M University competes in the Lone Star Conference as the Lions, offering football, basketball, baseball, track & field, and additional sports year-round.',
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Attractions */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Local Attractions & Events
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Throughout the year, Commerce hosts festivals, celebrations, and cultural
            events that bring the community together and showcase the city&apos;s character.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localAttractions.map((attraction) => (
              <Card key={attraction.name}>
                <h3 className="font-heading text-lg font-bold text-navy">
                  {attraction.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {attraction.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Area Attractions */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="green">Regional Destinations</Badge>
          <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
            Area Attractions
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Northeast Texas is home to state parks, museums, and cultural destinations
            within a short drive of Commerce.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {areaAttractions.map((attraction) => (
              <Card key={attraction.name}>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {attraction.name}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {attraction.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Climate
              </h2>
              <p className="mt-4 text-gray-600">
                Commerce enjoys a temperate climate with four distinct seasons. Mild
                winters and warm summers make it comfortable for outdoor activities
                year-round.
              </p>
              <DataTable
                headers={climateHeaders}
                rows={climateRows}
                className="mt-8"
              />
            </div>
            <div className="space-y-6">
              <Card>
                <Badge variant="navy">Faith Community</Badge>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy">
                  Churches
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Commerce is home to a diverse and active faith community with
                  churches representing 14 denominations. The faith community plays
                  an important role in local life, providing spiritual services,
                  community outreach, youth programs, and social support.
                </p>
              </Card>
              <Card>
                <Badge variant="amber">Historic Landmark</Badge>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy">
                  Commerce Public Library
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Built in 1918, the Commerce Public Library is a community landmark
                  that houses a modern lending collection alongside historical archives
                  documenting the city&apos;s heritage. The library serves residents of
                  all ages with programs, research resources, and public meeting space.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Government */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="navy">Local Government</Badge>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
              City Government
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Commerce operates under a council-manager form of government. The city
              council consists of a mayor and four council members who set policy and
              provide oversight, while a professional city manager handles day-to-day
              administration. This structure ensures efficient, accountable governance
              that is responsive to the needs of residents and businesses.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Experience Commerce for Yourself"
        description="Schedule a visit and see why families and businesses choose Commerce, Texas."
        buttonText="Contact Us"
        buttonHref="/contact"
        variant="amber"
      />
    </>
  );
}
