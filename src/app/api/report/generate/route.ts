/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';

// Dynamic import to avoid build issues with @react-pdf/renderer
async function generatePDF(sections: string[], options: { includeExecutiveSummary: boolean; includeCoverPage: boolean }) {
  // Use dynamic import to properly load @react-pdf/renderer outside the bundler
  const ReactPDF = await import('@react-pdf/renderer');
  const React = await import('react');
  const { Document, Page, Text, View, StyleSheet } = ReactPDF;
  const { createElement: h } = React;

  const styles = StyleSheet.create({
    page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#1F2937' },
    coverPage: { padding: 50, fontFamily: 'Helvetica', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B2A4A' },
    coverTitle: { fontSize: 32, fontFamily: 'Helvetica-Bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
    coverSubtitle: { fontSize: 16, color: '#D97706', textAlign: 'center', marginBottom: 40 },
    coverDate: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginBottom: 8 },
    coverContact: { fontSize: 10, color: '#9CA3AF', textAlign: 'center' },
    sectionTitle: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#1B2A4A', marginBottom: 16, borderBottomWidth: 2, borderBottomColor: '#B45309', paddingBottom: 8 },
    subsectionTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#1B2A4A', marginBottom: 8, marginTop: 16 },
    paragraph: { fontSize: 10, lineHeight: 1.6, color: '#4B5563', marginBottom: 10 },
    tableContainer: { marginTop: 10, marginBottom: 16 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#1B2A4A', padding: 8 },
    tableHeaderCell: { flex: 1, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#FFFFFF' },
    tableRow: { flexDirection: 'row', padding: 8, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' },
    tableRowAlt: { flexDirection: 'row', padding: 8, borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
    tableCell: { flex: 1, fontSize: 9, color: '#374151' },
    tocTitle: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#1B2A4A', marginBottom: 24, borderBottomWidth: 2, borderBottomColor: '#B45309', paddingBottom: 8 },
    tocItem: { fontSize: 11, color: '#374151', marginBottom: 8, paddingLeft: 8 },
    tocBullet: { color: '#B45309', marginRight: 8 },
    statRow: { flexDirection: 'row', marginBottom: 6 },
    statLabel: { fontSize: 9, color: '#6B7280', width: 160 },
    statValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#1B2A4A' },
    badge: { fontSize: 8, backgroundColor: '#0D7E6B', color: '#FFFFFF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, alignSelf: 'flex-start', marginBottom: 8 },
    cardBox: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 4, padding: 12, marginBottom: 10 },
    pageFooter: { position: 'absolute', bottom: 30, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#9CA3AF' },
    contactPage: { padding: 50, fontFamily: 'Helvetica', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    contactTitle: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#1B2A4A', textAlign: 'center', marginBottom: 24, borderBottomWidth: 2, borderBottomColor: '#B45309', paddingBottom: 8 },
    contactDetail: { fontSize: 12, color: '#374151', textAlign: 'center', marginBottom: 6 },
    summaryHighlight: { backgroundColor: '#F7F4EF', padding: 12, borderRadius: 4, marginBottom: 10 },
    summaryStatRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    summaryStatLabel: { fontSize: 10, color: '#6B7280' },
    summaryStatValue: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#1B2A4A' },
  });

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Section data definitions
  const sectionData: Record<string, { title: string; render: () => ReturnType<typeof React.createElement>[] }> = {
    workforce: {
      title: 'Workforce & Demographics',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'w1' }, 'Commerce serves as the economic hub for northeast Hunt County, anchored by East Texas A&M University and a growing manufacturing sector.'),
        h(View, { style: styles.subsectionTitle, key: 'w2h' }, h(Text, null, 'Population')),
        h(View, { style: styles.tableContainer, key: 'w2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Area'),
            h(Text, { style: styles.tableHeaderCell }, 'Population'),
            h(Text, { style: styles.tableHeaderCell }, 'Source'),
          ),
          ...([
            ['City of Commerce', '9,090', '2021 Census Est.'],
            ['Hunt County', '99,956', '2021 Census Est.'],
            ['30-Minute Drive', '~150,000+', 'Labor shed'],
            ['DFW Metroplex', '7.6M+', '60 mi. via I-30'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `wr${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'w3h' }, h(Text, null, 'Major Employers')),
        h(View, { style: styles.tableContainer, key: 'w3' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Employer'),
            h(Text, { style: styles.tableHeaderCell }, 'Industry'),
            h(Text, { style: styles.tableHeaderCell }, 'Employees'),
          ),
          ...([
            ['East Texas A&M University', 'Higher Education', '~850'],
            ['Commerce ISD', 'Education', '~230'],
            ['Walmart Supercenter', 'Retail', '~200'],
            ['Legacy Housing Corporation', 'Manufacturing', '~128'],
            ['Hydro Aluminum Metals', 'Manufacturing', '--'],
            ['Zurn PEX Inc', 'Manufacturing', '--'],
            ['KLZ Stone Group Inc', 'Manufacturing', '--'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `we${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
      ],
    },

    traffic: {
      title: 'Traffic Counts',
      render: () => [
        h(Text, { style: styles.paragraph, key: 't1' }, 'Annual Average Daily Traffic (AADT) counts from the Texas Department of Transportation for key corridors in and around Commerce.'),
        h(View, { style: styles.tableContainer, key: 't2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Corridor'),
            h(Text, { style: styles.tableHeaderCell }, 'Location'),
            h(Text, { style: styles.tableHeaderCell }, 'AADT'),
          ),
          ...([
            ['I-30', 'West of SH 24 interchange', '37,000+'],
            ['SH 24', 'South of Commerce (4-lane)', '12,000+'],
            ['SH 50', 'At SH 24 shared corridor', '8,000+'],
            ['SH 11', 'East of Commerce', '5,500+'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `tr${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
        h(Text, { style: { ...styles.paragraph, fontSize: 8, fontStyle: 'italic' }, key: 't3' }, 'Source: TxDOT Statewide Planning Map / AADT data'),
      ],
    },

    utilities: {
      title: 'Utilities & Infrastructure',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'u1' }, 'Reliable, competitively priced utilities with capacity to support large-scale industrial and commercial projects.'),
        h(View, { style: styles.subsectionTitle, key: 'u2h' }, h(Text, null, 'Electric Power — Oncor Electric Delivery')),
        h(View, { style: styles.tableContainer, key: 'u2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Metric'),
            h(Text, { style: styles.tableHeaderCell }, 'Value'),
          ),
          ...([
            ['System Reliability', '99.9721%'],
            ['Total Substation Capacity', '23,981 KW'],
            ['Reserve Capacity', '16.2%'],
            ['Voltage Available', '12.47 KV (distribution), 69 KV+ (transmission)'],
            ['Deregulated Market', 'Yes — competitive retail electric providers'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `ue${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'u3h' }, h(Text, null, 'Natural Gas — Atmos Energy')),
        h(View, { style: styles.tableContainer, key: 'u3' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Metric'),
            h(Text, { style: styles.tableHeaderCell }, 'Value'),
          ),
          ...([
            ['BTU Content', '1,050 per cubic foot'],
            ['Industrial Gas Transport', 'Available'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `ug${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'u4h' }, h(Text, null, 'Water System — City of Commerce')),
        h(View, { style: styles.tableContainer, key: 'u4' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Metric'),
            h(Text, { style: styles.tableHeaderCell }, 'Value'),
          ),
          ...([
            ['Source', 'Lake Tawakoni (Sabine River Authority)'],
            ['Treatment Capacity', '4,200,000 gallons/day'],
            ['Storage Capacity', '2,345,000 gallons'],
            ['Distribution Mains', '6" to 16" lines'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `uw${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'u5h' }, h(Text, null, 'Wastewater / Sewer')),
        h(View, { style: styles.tableContainer, key: 'u5' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Metric'),
            h(Text, { style: styles.tableHeaderCell }, 'Value'),
          ),
          ...([
            ['Treatment Type', 'Activated sludge'],
            ['Treatment Capacity', '2,000,000 gallons/day'],
            ['TCEQ Permit', 'Active'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `us${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
            )
          ),
        ),
      ],
    },

    'tax-rates': {
      title: 'Tax Rates',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'tx1' }, 'Property in Commerce is subject to overlapping tax levies. Texas has no state income tax, making property tax the primary funding mechanism for local services.'),
        h(View, { style: styles.tableContainer, key: 'tx2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Taxing Entity'),
            h(Text, { style: styles.tableHeaderCell }, 'Rate (per $100)'),
            h(Text, { style: styles.tableHeaderCell }, 'Notes'),
          ),
          ...([
            ['Hunt County', 'Pending', 'General fund + road & bridge'],
            ['Hunt County Hospital District', 'Pending', 'County healthcare services'],
            ['City of Commerce', 'Pending', 'General fund + debt service'],
            ['Commerce ISD', 'Pending', 'M&O + I&S (debt service)'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `txr${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'tx3h' }, h(Text, null, 'Key Tax Advantages')),
        ...(['No state income tax (one of nine states)', 'No corporate income tax (franchise tax only above $2.47M revenue)', 'Tax abatement programs available (Ch. 312 TX Tax Code)', 'Freeport Exemption — inventory shipped out of state within 175 days exempt', 'Federal Opportunity Zone — capital gains deferral and elimination'] as string[]).map((item, i) =>
          h(View, { style: styles.statRow, key: `txa${i}` },
            h(Text, { style: { color: '#B45309', marginRight: 6, fontSize: 10 } }, '•'),
            h(Text, { style: styles.paragraph }, item),
          )
        ),
      ],
    },

    broadband: {
      title: 'Broadband Coverage',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'b1' }, 'Internet service provider availability and speeds for Commerce, Texas (ZIP 75428). Data sourced from the FCC Broadband Map.'),
        h(View, { style: styles.subsectionTitle, key: 'b2h' }, h(Text, null, 'FCC Broadband Benchmarks')),
        h(View, { style: styles.tableContainer, key: 'b2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Tier'),
            h(Text, { style: styles.tableHeaderCell }, 'Download'),
            h(Text, { style: styles.tableHeaderCell }, 'Upload'),
            h(Text, { style: styles.tableHeaderCell }, 'Typical Use'),
          ),
          ...([
            ['Basic Broadband', '25 Mbps', '3 Mbps', 'Email, web, video calls'],
            ['Broadband (Standard)', '100 Mbps', '20 Mbps', 'Streaming, telework'],
            ['High-Speed', '250+ Mbps', '25+ Mbps', 'Multi-user offices, cloud'],
            ['Gigabit', '1,000 Mbps', '100+ Mbps', 'Data centers, mfg'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `br${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
              h(Text, { style: styles.tableCell }, row[3]),
            )
          ),
        ),
      ],
    },

    'cost-of-living': {
      title: 'Cost of Living',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'c1' }, 'Commerce offers a significantly lower cost of living compared to Dallas-Fort Worth and national averages, making it an attractive location for both businesses and employees.'),
        h(View, { style: styles.tableContainer, key: 'c2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Category'),
            h(Text, { style: styles.tableHeaderCell }, 'Commerce'),
            h(Text, { style: styles.tableHeaderCell }, 'DFW Metro'),
            h(Text, { style: styles.tableHeaderCell }, 'National Avg'),
          ),
          ...([
            ['Overall', 'Below Average', 'Above Average', '100'],
            ['Housing', 'Significantly Below', 'Above Average', '100'],
            ['Utilities', 'Near Average', 'Near Average', '100'],
            ['Groceries', 'Below Average', 'Near Average', '100'],
            ['Transportation', 'Below Average', 'Near Average', '100'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `cr${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
              h(Text, { style: styles.tableCell }, row[3]),
            )
          ),
        ),
      ],
    },

    'business-climate': {
      title: 'Business Climate',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'bc1' }, 'Texas consistently ranks among the top states for business, and Commerce amplifies those advantages with competitive local incentives and a university-anchored workforce.'),
        h(View, { style: styles.subsectionTitle, key: 'bc2h' }, h(Text, null, 'Texas Business Advantages')),
        ...(['Right-to-Work state since 1947', 'No state income tax — personal or corporate', 'Franchise tax applies only above $2.47M revenue', 'Streamlined permitting and regulatory environment', 'Tort reform — damages caps and loser-pays provisions', 'Business-friendly legal and regulatory climate'] as string[]).map((item, i) =>
          h(View, { style: styles.statRow, key: `bca${i}` },
            h(Text, { style: { color: '#B45309', marginRight: 6, fontSize: 10 } }, '•'),
            h(Text, { style: styles.paragraph }, item),
          )
        ),
        h(View, { style: styles.subsectionTitle, key: 'bc3h' }, h(Text, null, 'Commerce Competitive Advantages')),
        ...(['230+ acres of EDC-owned, shovel-ready industrial land', 'Rail-served sites via NETEX & Blacklands Railroad', 'Federal Opportunity Zone designation', 'University talent pipeline (ETAMU — 100+ majors)', 'Growing clean energy manufacturing cluster'] as string[]).map((item, i) =>
          h(View, { style: styles.statRow, key: `bcb${i}` },
            h(Text, { style: { color: '#0D7E6B', marginRight: 6, fontSize: 10 } }, '•'),
            h(Text, { style: styles.paragraph }, item),
          )
        ),
      ],
    },

    incentives: {
      title: 'Incentives & Opportunity Zone',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'i1' }, 'The Commerce EDC offers a comprehensive, performance-based incentive toolkit designed to reduce costs and accelerate timelines for qualifying projects.'),
        h(View, { style: styles.subsectionTitle, key: 'i2h' }, h(Text, null, 'Available Incentives')),
        ...([
          ['Land at No Cost', 'Shovel-ready industrial tracts at no cost for qualifying projects meeting job creation benchmarks.'],
          ['Spec Building Programs', 'Purpose-built spec facilities to reduce time-to-occupancy and upfront capital outlay.'],
          ['Infrastructure Support', 'Funded/co-funded street, water, sewer, and gas extensions for new and expanding businesses.'],
          ['Forgivable & Low-Interest Loans', 'Performance-based forgivable loans and below-market financing.'],
          ['Cash for Jobs & Capital Investment', 'Direct cash incentives tied to new job creation and capital investment.'],
          ['Tax Abatement', 'Property tax abatements on new improvements for a defined period.'],
          ['Enterprise Zone', 'State sales and use tax refunds for qualifying businesses.'],
          ['Tax Reinvestment Zone (TIRZ)', 'Incremental tax revenue reinvested in infrastructure and development.'],
          ['4A Sales Tax Projects', 'Dedicated sales tax revenue for primary job creation projects.'],
        ] as string[][]).map((item, i) =>
          h(View, { style: styles.cardBox, key: `ic${i}` },
            h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#1B2A4A', marginBottom: 4 } }, item[0]),
            h(Text, { style: { fontSize: 9, color: '#4B5563', lineHeight: 1.5 } }, item[1]),
          )
        ),
        h(View, { style: styles.subsectionTitle, key: 'i3h' }, h(Text, null, 'Federal Opportunity Zone')),
        h(Text, { style: styles.paragraph, key: 'i3' }, 'Commerce includes a federally designated Opportunity Zone. Investors who deploy capital gains into a Qualified Opportunity Fund can benefit from tax deferral, step-up in basis (5+ years), and elimination of capital gains tax on appreciation (10+ years).'),
      ],
    },

    location: {
      title: 'Location & Access',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'l1' }, 'Commerce is located in Hunt County, 65 miles northeast of Dallas just off Interstate 30, at the intersection of multiple state highways and served by two shortline railroads.'),
        h(View, { style: styles.subsectionTitle, key: 'l2h' }, h(Text, null, 'Distance to Major Cities')),
        h(View, { style: styles.tableContainer, key: 'l2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Destination'),
            h(Text, { style: styles.tableHeaderCell }, 'Distance (miles)'),
          ),
          ...([
            ['Dallas, TX', '66'],
            ['Texarkana, TX', '123'],
            ['Shreveport, LA', '173'],
            ['Oklahoma City, OK', '232'],
            ['Austin, TX', '261'],
            ['Houston, TX', '301'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `lr${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'l3h' }, h(Text, null, 'Highway Access')),
        ...([
          ['Interstate 30', 'Major east-west corridor — Dallas to Texarkana'],
          ['State Highway 24', '4-lane divided, north-south through Commerce'],
          ['State Highway 50', '4-lane divided access south to I-30'],
          ['State Highway 11', 'East-west, Sulphur Springs to Greenville'],
        ] as string[][]).map((item, i) =>
          h(View, { style: styles.statRow, key: `lh${i}` },
            h(Text, { style: { ...styles.statLabel, width: 120 } }, item[0]),
            h(Text, { style: { ...styles.paragraph, flex: 1 } }, item[1]),
          )
        ),
        h(View, { style: styles.subsectionTitle, key: 'l4h' }, h(Text, null, 'Rail Access')),
        h(Text, { style: styles.paragraph, key: 'l4' }, 'Two shortline railroads: NETEX and Blacklands Railroad, connecting to Class I carriers Union Pacific (UP) and Canadian Pacific Kansas City (CPKC).'),
        h(View, { style: styles.subsectionTitle, key: 'l5h' }, h(Text, null, 'Commerce Municipal Airport')),
        ...([
          ['Runway Length', '3,909 feet'],
          ['Surface', 'Concrete/Asphalt'],
          ['Lighting', 'Medium Intensity (MIRL)'],
          ['DFW International', '~1.5 hours'],
          ['Dallas Love Field', '~1.25 hours'],
        ] as string[][]).map((item, i) =>
          h(View, { style: styles.statRow, key: `la${i}` },
            h(Text, { style: styles.statLabel }, item[0]),
            h(Text, { style: styles.statValue }, item[1]),
          )
        ),
      ],
    },

    'quality-of-life': {
      title: 'Quality of Life',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'q1' }, 'Commerce offers a high quality of life with affordable housing, excellent schools, a vibrant university community, and convenient access to Dallas-Fort Worth amenities.'),
        h(View, { style: styles.subsectionTitle, key: 'q2h' }, h(Text, null, 'Education')),
        ...(['East Texas A&M University — 100+ academic programs', 'Commerce ISD — well-regarded K-12 system', 'Paris Junior College satellite campus'] as string[]).map((item, i) =>
          h(View, { style: styles.statRow, key: `qe${i}` },
            h(Text, { style: { color: '#B45309', marginRight: 6, fontSize: 10 } }, '•'),
            h(Text, { style: styles.paragraph }, item),
          )
        ),
        h(View, { style: styles.subsectionTitle, key: 'q3h' }, h(Text, null, 'Recreation & Community')),
        ...(['Annual Bois d\'Arc Bash community festival', 'City parks, splash pad, and youth sports programs', 'Lake Tawakoni — 36,700 acre reservoir nearby', 'Historic downtown with local shops and restaurants', 'Low cost of living relative to DFW Metro'] as string[]).map((item, i) =>
          h(View, { style: styles.statRow, key: `qr${i}` },
            h(Text, { style: { color: '#0D7E6B', marginRight: 6, fontSize: 10 } }, '•'),
            h(Text, { style: styles.paragraph }, item),
          )
        ),
        h(View, { style: styles.subsectionTitle, key: 'q4h' }, h(Text, null, 'Healthcare')),
        h(Text, { style: styles.paragraph, key: 'q4' }, 'Commerce is served by local medical facilities and the Hunt Regional Medical Center in nearby Greenville. The Hunt County Hospital District provides a county-wide healthcare safety net.'),
      ],
    },

    properties: {
      title: 'Available Properties',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'p1' }, 'The Commerce EDC owns and maintains six industrial tracts totaling over 230 acres. All are zoned industrial, most are rail-served, and all are priced to negotiate.'),
        ...([
          { name: 'Tract 1 — 11 Acres East of Alliance', acres: '11.155', rail: true, desc: 'Near CR 4220. Railroad spur possible. Water and sewer available.' },
          { name: 'Tract 2 — 13 Acres West of Alliance', acres: '13.69', rail: true, desc: 'South of Blacklands Railroad. 12" water, 6" sewer, 36\' concrete street.' },
          { name: 'Tract 3 — 25 Acres North of Economic Dr', acres: '24.97', rail: false, desc: 'East of FM 3218. Gentle slope. Water and sewer on west side.' },
          { name: 'Tract 4 — 37 Acres Knight Street', acres: '36.94', rail: true, desc: 'Between Knight St and railroad. Lightly wooded. Spur possible.' },
          { name: 'Tract 5 — 87 Acres South of Economic Dr', acres: '87', rail: false, desc: 'Largest EDC tract. FM 3218 frontage. Gentle topography.' },
          { name: 'Tract 6 — 30 Acres Highway 11 East', acres: '30.669', rail: true, desc: 'Between Hwy 11 and railroad. Adjacent to operating businesses.' },
        ] as Array<{ name: string; acres: string; rail: boolean; desc: string }>).map((tract, i) =>
          h(View, { style: styles.cardBox, key: `pt${i}` },
            h(View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 } },
              h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#1B2A4A' } }, tract.name),
              tract.rail ? h(Text, { style: styles.badge }, 'RAIL-SERVED') : null,
            ),
            h(Text, { style: { fontSize: 9, color: '#6B7280', marginBottom: 4 } }, `${tract.acres} acres | Zoned Industrial | Price: Negotiable`),
            h(Text, { style: { fontSize: 9, color: '#4B5563', lineHeight: 1.5 } }, tract.desc),
          )
        ),
      ],
    },

    buildings: {
      title: 'Available Buildings',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'bl1' }, 'Move-in ready commercial and industrial facilities available in Commerce.'),
        h(View, { style: styles.cardBox, key: 'bl2' },
          h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1B2A4A', marginBottom: 4 } }, 'SRS Warehouse Facility'),
          h(Text, { style: { fontSize: 9, color: '#6B7280', marginBottom: 4 } }, '97,110 SF | Commerce, TX 75428 | Price: Contact for Details'),
          h(Text, { style: { fontSize: 9, color: '#4B5563' } }, 'Large warehouse facility. Contact CEDC for specifications.'),
        ),
        h(View, { style: styles.cardBox, key: 'bl3' },
          h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1B2A4A', marginBottom: 4 } }, 'WDF Building'),
          h(Text, { style: { fontSize: 9, color: '#6B7280', marginBottom: 4 } }, '26,500 SF | State Hwy 11, Commerce, TX | Price: Contact for Details'),
          h(Text, { style: { fontSize: 9, color: '#4B5563' } }, 'Industrial building on Highway 11. Contact CEDC for specifications.'),
        ),
      ],
    },

    employers: {
      title: 'Major Employers',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'e1' }, 'Commerce\'s employer base spans higher education, advanced manufacturing, retail, clean energy, and public services.'),
        h(View, { style: styles.tableContainer, key: 'e2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Employer'),
            h(Text, { style: styles.tableHeaderCell }, 'Industry'),
            h(Text, { style: styles.tableHeaderCell }, 'Employees'),
          ),
          ...([
            ['East Texas A&M University', 'Higher Education', '~850'],
            ['Commerce ISD', 'Education', '~230'],
            ['Walmart Supercenter', 'Retail', '~200'],
            ['Legacy Housing Corp', 'Manufacturing', '~128'],
            ['OutBack Power Technologies', 'Clean Energy Mfg', '~50'],
            ['BigBattery', 'Clean Energy Mfg', '~48'],
            ['Hydro Aluminum Metals', 'Manufacturing', '--'],
            ['Zurn PEX Inc', 'Manufacturing', '--'],
            ['KLZ Stone Group Inc', 'Manufacturing', '--'],
            ['Solar 76', 'Clean Energy Mfg', '--'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `er${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
      ],
    },

    about: {
      title: 'About Commerce EDC',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'a1' }, 'The Commerce Economic Development Corporation (CEDC) is a Type A economic development corporation funded by a dedicated half-cent sales tax. The CEDC promotes economic growth, job creation, and capital investment in Commerce, Texas.'),
        h(View, { style: styles.subsectionTitle, key: 'a2h' }, h(Text, null, 'Board of Directors')),
        h(View, { style: styles.tableContainer, key: 'a2' },
          h(View, { style: styles.tableHeader },
            h(Text, { style: styles.tableHeaderCell }, 'Name'),
            h(Text, { style: styles.tableHeaderCell }, 'Title'),
            h(Text, { style: styles.tableHeaderCell }, 'Organization'),
          ),
          ...([
            ['Scott Ward', 'President', 'CFO, Fix & Feed'],
            ['Stan McKee', 'Vice-President', 'Retired, ONCOR'],
            ['Michael Glas', 'Treasurer', 'Glas Consulting'],
            ['Dr. Brent Donham', 'Board Member', 'VP, East Texas A&M'],
            ['Mandy Freeman', 'Board Member', 'Senior VP'],
            ['Joe Shipman', 'Board Member', 'Luminous Productions'],
            ['Dan Luckett', 'Board Member', 'Hydro Aluminum'],
            ['Jay Garrett', 'Attorney', 'Faries and Garrett'],
            ['Bonnie Hunter', 'Executive Dir.', 'Commerce EDC'],
          ] as string[][]).map((row, i) =>
            h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `ar${i}` },
              h(Text, { style: styles.tableCell }, row[0]),
              h(Text, { style: styles.tableCell }, row[1]),
              h(Text, { style: styles.tableCell }, row[2]),
            )
          ),
        ),
        h(View, { style: styles.subsectionTitle, key: 'a3h' }, h(Text, null, 'Contact Information')),
        ...([
          ['Address', '1119 Alamo Street, Commerce, TX 75428'],
          ['Phone', '(903) 886-1121'],
          ['Email', 'info@commerceedc.com'],
          ['Web', 'commerceedc.com'],
        ] as string[][]).map((item, i) =>
          h(View, { style: styles.statRow, key: `ac${i}` },
            h(Text, { style: styles.statLabel }, item[0]),
            h(Text, { style: styles.statValue }, item[1]),
          )
        ),
      ],
    },
  };

  // Build PDF pages
  const pages: ReturnType<typeof React.createElement>[] = [];

  // Cover Page
  if (options.includeCoverPage) {
    pages.push(
      h(Page, { key: 'cover', size: 'LETTER', style: styles.coverPage },
        h(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
          h(Text, { style: { fontSize: 14, color: '#D97706', letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' } }, 'COMMUNITY PROFILE'),
          h(Text, { style: styles.coverTitle }, 'Commerce, Texas'),
          h(Text, { style: styles.coverSubtitle }, 'Commerce Means Business'),
          h(View, { style: { marginTop: 40 } },
            h(Text, { style: styles.coverDate }, `Prepared: ${date}`),
            h(Text, { style: styles.coverContact }, 'Commerce Economic Development Corporation'),
            h(Text, { style: styles.coverContact }, '1119 Alamo Street, Commerce, TX 75428'),
            h(Text, { style: styles.coverContact }, '(903) 886-1121 | info@commerceedc.com'),
          ),
        ),
      )
    );
  }

  // Table of Contents
  const selectedSections = sections.filter((id) => sectionData[id]);
  pages.push(
    h(Page, { key: 'toc', size: 'LETTER', style: styles.page },
      h(Text, { style: styles.tocTitle }, 'Table of Contents'),
      ...(options.includeExecutiveSummary
        ? [h(Text, { style: styles.tocItem, key: 'toc-es' },
            h(Text, { style: styles.tocBullet }, '— '),
            'Executive Summary'
          )]
        : []),
      ...selectedSections.map((id) =>
        h(Text, { style: styles.tocItem, key: `toc-${id}` },
          h(Text, { style: styles.tocBullet }, '— '),
          sectionData[id].title
        )
      ),
      h(Text, { style: { ...styles.tocItem, marginTop: 12 }, key: 'toc-contact' },
        h(Text, { style: styles.tocBullet }, '— '),
        'Contact Information'
      ),
      h(View, { style: styles.pageFooter },
        h(Text, null, 'Commerce EDC | commerceedc.com'),
        h(Text, null, date),
      ),
    )
  );

  // Executive Summary
  if (options.includeExecutiveSummary) {
    pages.push(
      h(Page, { key: 'exec', size: 'LETTER', style: styles.page },
        h(Text, { style: styles.sectionTitle }, 'Executive Summary'),
        h(Text, { style: styles.paragraph },
          'Commerce, Texas is strategically located in Hunt County, 65 miles northeast of Dallas on the I-30 corridor. With 230+ acres of shovel-ready industrial land, rail service via two shortline railroads, and a talent pipeline anchored by East Texas A&M University, Commerce offers a compelling value proposition for manufacturing, distribution, and clean energy operations.'
        ),
        h(View, { style: styles.summaryHighlight },
          h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1B2A4A', marginBottom: 10 } }, 'Key Facts'),
          ...([
            ['Location', '65 miles NE of Dallas on I-30'],
            ['Industrial Land', '230+ acres, EDC-owned, shovel-ready'],
            ['Rail Service', 'NETEX & Blacklands Railroad (UP/CPKC connections)'],
            ['Anchor Employer', 'East Texas A&M University (~850 employees)'],
            ['Opportunity Zone', 'Federally designated — capital gains benefits'],
            ['Manufacturing Cluster', 'Hydro Aluminum, Zurn PEX, Solar 76, BigBattery'],
            ['Population (City)', '~9,090 (2021 Census)'],
            ['Labor Shed (30 min)', '~150,000+ workers'],
          ] as string[][]).map((item, i) =>
            h(View, { style: styles.summaryStatRow, key: `es${i}` },
              h(Text, { style: styles.summaryStatLabel }, item[0]),
              h(Text, { style: styles.summaryStatValue }, item[1]),
            )
          ),
        ),
        h(Text, { style: styles.paragraph },
          'The Commerce EDC offers a performance-based incentive toolkit including land at no cost, tax abatements, forgivable loans, infrastructure support, and enterprise zone benefits. Every incentive is tailored to the specific needs of the project.'
        ),
        h(View, { style: styles.pageFooter },
          h(Text, null, 'Commerce EDC | commerceedc.com'),
          h(Text, null, date),
        ),
      )
    );
  }

  // Section Pages
  for (const id of selectedSections) {
    const section = sectionData[id];
    pages.push(
      h(Page, { key: id, size: 'LETTER', style: styles.page },
        h(Text, { style: styles.sectionTitle }, section.title),
        ...section.render(),
        h(View, { style: styles.pageFooter },
          h(Text, null, 'Commerce EDC | commerceedc.com'),
          h(Text, null, date),
        ),
      )
    );
  }

  // Contact Page
  pages.push(
    h(Page, { key: 'contact', size: 'LETTER', style: styles.contactPage },
      h(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
        h(Text, { style: styles.contactTitle }, 'Let\'s Talk'),
        h(Text, { style: { ...styles.contactDetail, fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#1B2A4A', marginBottom: 16 } }, 'Commerce Economic Development Corporation'),
        h(Text, { style: styles.contactDetail }, '1119 Alamo Street'),
        h(Text, { style: styles.contactDetail }, 'Commerce, TX 75428'),
        h(Text, { style: { ...styles.contactDetail, marginTop: 12, color: '#B45309', fontFamily: 'Helvetica-Bold' } }, '(903) 886-1121'),
        h(Text, { style: { ...styles.contactDetail, color: '#B45309' } }, 'info@commerceedc.com'),
        h(Text, { style: { ...styles.contactDetail, marginTop: 12 } }, 'commerceedc.com'),
        h(Text, { style: { ...styles.contactDetail, marginTop: 32, fontSize: 11, color: '#6B7280' } }, 'All site selector inquiries are handled with complete confidentiality.'),
        h(Text, { style: { ...styles.contactDetail, fontSize: 11, color: '#6B7280' } }, 'Schedule a site tour today.'),
      ),
      h(View, { style: styles.pageFooter },
        h(Text, null, 'Commerce EDC | commerceedc.com'),
        h(Text, null, date),
      ),
    )
  );

  const doc = h(Document, null, ...pages);
  return ReactPDF.renderToBuffer(doc);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sections, includeExecutiveSummary = true, includeCoverPage = true } = body;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: 'At least one section must be selected' },
        { status: 400 }
      );
    }

    const buffer = await generatePDF(sections, {
      includeExecutiveSummary,
      includeCoverPage,
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Commerce-EDC-Report.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF report' },
      { status: 500 }
    );
  }
}
