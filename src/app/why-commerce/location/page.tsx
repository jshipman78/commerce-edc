import { SectionHero } from '@/components/sections/SectionHero';
import { CTASection } from '@/components/sections/CTASection';
import { DataTable } from '@/components/ui/DataTable';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Location & Access',
  description:
    'Commerce, Texas is located 65 miles NE of Dallas in Hunt County with access to I-30, two shortline railroads connecting to Class I carriers, and a municipal airport.',
  path: '/why-commerce/location',
});

const distanceHeaders = ['Destination', 'Distance (miles)'];
const distanceRows: [string, string][] = [
  ['Dallas, TX', '66'],
  ['Texarkana, TX', '123'],
  ['Shreveport, LA', '173'],
  ['Wichita Falls, TX', '180'],
  ['Oklahoma City, OK', '232'],
  ['Austin, TX', '261'],
  ['Houston, TX', '301'],
];

const highways = [
  {
    name: 'Interstate 30',
    detail: '10 miles south of Commerce — major east-west corridor connecting Dallas to Texarkana and beyond.',
  },
  {
    name: 'State Highway 24',
    detail: 'North-south route through Commerce, providing 4-lane divided access south to I-30.',
  },
  {
    name: 'State Highway 50',
    detail: 'Runs through Commerce with 4-lane divided access south to I-30 via shared corridor with SH 24.',
  },
  {
    name: 'State Highway 11',
    detail: 'East-west route connecting Commerce to Sulphur Springs and Greenville.',
  },
  {
    name: 'State Highway 71',
    detail: 'Regional route serving the Commerce area.',
  },
  {
    name: 'State Highway 224',
    detail: 'Regional route providing additional connectivity in the Commerce corridor.',
  },
];

export default function LocationPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Location & Access - Commerce, Texas',
          description:
            'Commerce is located 65 miles NE of Dallas with multi-modal transportation access via I-30, rail, and air.',
          url: 'https://commerceedc.com/why-commerce/location',
        }}
      />

      <SectionHero
        title="Location & Access"
        subtitle="Strategically positioned in Hunt County, 65 miles northeast of Dallas, with multi-modal transportation access via highway, rail, and air."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Why Commerce', href: '/why-commerce' },
          { label: 'Location & Access' },
        ]}
      />

      {/* Overview */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              Hunt County, Texas
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Commerce is located in Hunt County, 65 miles northeast of Dallas just off
              Interstate 30. The city sits at the intersection of multiple state highways
              and is served by two shortline railroads, making it an ideal location for
              manufacturing, distribution, and logistics operations with access to the
              entire south-central United States.
            </p>
          </div>
        </div>
      </section>

      {/* Distances Table */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Distance to Major Cities
              </h2>
              <p className="mt-4 text-gray-600">
                Commerce&apos;s central location in the south-central United States
                provides efficient access to major population centers across Texas,
                Oklahoma, Louisiana, and Arkansas.
              </p>
              <DataTable
                headers={distanceHeaders}
                rows={distanceRows}
                className="mt-8"
              />
            </div>
            <div>
              <Card className="bg-navy text-white">
                <h3 className="font-heading text-xl font-bold text-white">
                  Location Snapshot
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'Hunt County, Texas',
                    '65 miles northeast of Dallas',
                    '10 miles north of Interstate 30',
                    '4-lane divided highway access to I-30 (SH 24/50)',
                    'Population: approximately 10,000',
                    'Home to East Texas A&M University',
                  ].map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-200">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Highways */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Highway Access
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Commerce is served by one interstate and five state highways, providing
            multiple routes to regional and national markets.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highways.map((hwy) => (
              <Card key={hwy.name}>
                <h3 className="font-heading text-lg font-bold text-navy">{hwy.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{hwy.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rail */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <Badge variant="green">Rail Served</Badge>
              <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
                Rail Access
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Commerce is served by two shortline railroads that provide direct
                connections to Class I carriers, giving businesses access to the
                national rail network for bulk freight, intermodal, and unit train
                service.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <h3 className="font-heading text-lg font-bold text-navy">
                  NETEX (Northeast Texas Rural Rail Transportation District)
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Shortline railroad serving Commerce and the surrounding region,
                  providing freight service and connections to Class I carriers.
                </p>
              </Card>
              <Card>
                <h3 className="font-heading text-lg font-bold text-navy">
                  Blacklands Railroad
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Shortline railroad connecting to Union Pacific (UP) and Canadian
                  Pacific Kansas City (CPKC), two of North America&apos;s largest
                  Class I railroads. This connection provides access to transcontinental
                  freight corridors.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Airport */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <Badge variant="navy">Air Access</Badge>
              <h2 className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl">
                Commerce Municipal Airport
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                The Commerce Municipal Airport provides general aviation access for
                corporate and private aircraft. The facility supports business travel
                and is supplemented by proximity to the Dallas-Fort Worth metropolitan
                area&apos;s major commercial airports.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <h3 className="font-heading text-lg font-bold text-navy">
                  Airport Specifications
                </h3>
                <ul className="mt-4 space-y-2">
                  {[
                    { label: 'Runway Length', value: '3,909 feet' },
                    { label: 'Runway Width', value: '60 feet' },
                    { label: 'Surface', value: 'Concrete/Asphalt' },
                    { label: 'Lighting', value: 'Medium Intensity Runway Lights (MIRL)' },
                  ].map((spec) => (
                    <li key={spec.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-medium text-gray-800">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="font-heading text-lg font-bold text-navy">
                  Commercial Airports
                </h3>
                <ul className="mt-4 space-y-2">
                  {[
                    { label: 'Dallas/Fort Worth International (DFW)', value: 'Approximately 1.5 hours' },
                    { label: 'Dallas Love Field (DAL)', value: 'Approximately 1.25 hours' },
                  ].map((airport) => (
                    <li key={airport.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{airport.label}</span>
                      <span className="font-medium text-gray-800">{airport.value}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Schedule a Site Visit"
        description="See Commerce's strategic location firsthand. Contact the EDC to arrange a confidential tour of available properties and infrastructure."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
