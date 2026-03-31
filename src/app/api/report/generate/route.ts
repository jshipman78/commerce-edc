import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
export const runtime = 'nodejs';

// ---------------------------------------------------------------------------
// Helper: resolve a /public image path to an absolute filesystem path.
// Returns undefined when the file doesn't exist so we can degrade gracefully.
// ---------------------------------------------------------------------------
function resolveImage(publicPath: string): string | undefined {
  const abs = path.join(process.cwd(), 'public', publicPath);
  try {
    fs.accessSync(abs, fs.constants.R_OK);
    return abs;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// PDF Generation
// ---------------------------------------------------------------------------
async function generatePDF(
  sections: string[],
  options: { includeExecutiveSummary: boolean; includeCoverPage: boolean },
) {
  const ReactPDF = await import('@react-pdf/renderer');
  const React = await import('react');
  const { Document, Page, Text, View, Image, Link, StyleSheet, Font } = ReactPDF;
  const { createElement: h } = React;

  // Register Helvetica variants (built-in, but explicit for clarity)
  Font.register({
    family: 'Helvetica',
    fonts: [
      { src: 'Helvetica' },
      { src: 'Helvetica-Bold', fontWeight: 700 },
      { src: 'Helvetica-Oblique', fontStyle: 'italic' },
      { src: 'Helvetica-BoldOblique', fontWeight: 700, fontStyle: 'italic' },
    ],
  });

  // -------------------------------------------------------------------------
  // Design System
  // -------------------------------------------------------------------------
  const brand = {
    navy: '#1B2A4A',
    navyLight: '#2A3D66',
    amber: '#B45309',
    amberLight: '#D97706',
    green: '#0D7E6B',
    cream: '#F7F4EF',
    creamDark: '#EDE8DF',
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
  };

  const styles = StyleSheet.create({
    // --- Page Templates ---------------------------------------------------
    page: {
      paddingTop: 60,
      paddingBottom: 56,
      paddingHorizontal: 48,
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: brand.gray700,
    },
    pageAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: brand.amber,
    },
    pageHeader: {
      position: 'absolute',
      top: 16,
      left: 48,
      right: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pageHeaderText: {
      fontSize: 7,
      fontFamily: 'Helvetica',
      color: brand.gray500,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    pageFooter: {
      position: 'absolute',
      bottom: 20,
      left: 48,
      right: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor: brand.gray200,
      paddingTop: 8,
    },
    pageFooterText: {
      fontSize: 7,
      color: brand.gray500,
    },

    // --- Cover Page -------------------------------------------------------
    coverPage: {
      padding: 0,
      fontFamily: 'Helvetica',
      backgroundColor: brand.navy,
    },
    coverAccent: {
      height: 6,
      backgroundColor: brand.amber,
    },
    coverBody: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60,
    },
    coverLabel: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: brand.amber,
      letterSpacing: 6,
      textTransform: 'uppercase',
      marginBottom: 24,
    },
    coverTitle: {
      fontSize: 42,
      fontFamily: 'Helvetica-Bold',
      color: brand.white,
      textAlign: 'center',
      lineHeight: 1.1,
      marginBottom: 10,
    },
    coverTagline: {
      fontSize: 16,
      fontFamily: 'Helvetica-Oblique',
      color: brand.amberLight,
      textAlign: 'center',
      marginBottom: 48,
    },
    coverDivider: {
      width: 60,
      height: 1,
      backgroundColor: brand.amberLight,
      marginBottom: 32,
      opacity: 0.5,
    },
    coverMeta: {
      fontSize: 10,
      color: brand.gray300,
      textAlign: 'center',
      marginBottom: 4,
      lineHeight: 1.6,
    },
    coverDate: {
      fontSize: 9,
      color: brand.gray500,
      textAlign: 'center',
      marginTop: 24,
    },

    // --- TOC --------------------------------------------------------------
    tocTitle: {
      fontSize: 24,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
      marginBottom: 8,
    },
    tocAccent: {
      width: 40,
      height: 3,
      backgroundColor: brand.amber,
      marginBottom: 28,
    },
    tocItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingLeft: 4,
    },
    tocBullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: brand.amber,
      marginRight: 12,
    },
    tocText: {
      fontSize: 11,
      color: brand.gray700,
    },
    tocSeparator: {
      borderBottomWidth: 0.5,
      borderBottomColor: brand.gray200,
      marginVertical: 8,
    },

    // --- Section Titles ---------------------------------------------------
    sectionTitle: {
      fontSize: 22,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
      marginBottom: 6,
    },
    sectionAccent: {
      width: 36,
      height: 3,
      backgroundColor: brand.amber,
      marginBottom: 20,
    },
    subsectionTitle: {
      fontSize: 13,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
      marginBottom: 8,
      marginTop: 20,
    },

    // --- Body Text --------------------------------------------------------
    paragraph: {
      fontSize: 10,
      lineHeight: 1.65,
      color: brand.gray600,
      marginBottom: 10,
    },
    caption: {
      fontSize: 8,
      fontFamily: 'Helvetica-Oblique',
      color: brand.gray500,
      marginTop: 4,
      marginBottom: 12,
    },

    // --- Tables -----------------------------------------------------------
    tableWrap: {
      marginTop: 8,
      marginBottom: 16,
      borderWidth: 0.5,
      borderColor: brand.gray200,
      borderRadius: 2,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: brand.navy,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    tableHeaderCell: {
      flex: 1,
      fontSize: 8,
      fontFamily: 'Helvetica-Bold',
      color: brand.white,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: brand.gray200,
    },
    tableRowAlt: {
      flexDirection: 'row',
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: brand.gray200,
      backgroundColor: brand.gray50,
    },
    tableCell: {
      flex: 1,
      fontSize: 9,
      color: brand.gray700,
      lineHeight: 1.4,
    },

    // --- Cards / Boxes ----------------------------------------------------
    card: {
      borderLeftWidth: 3,
      borderLeftColor: brand.amber,
      backgroundColor: brand.gray50,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
    },
    cardTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 11,
      color: brand.navy,
      marginBottom: 3,
    },
    cardMeta: {
      fontSize: 9,
      color: brand.gray500,
      marginBottom: 4,
    },
    cardBody: {
      fontSize: 9,
      color: brand.gray600,
      lineHeight: 1.5,
    },

    // --- Property Card with Image -----------------------------------------
    propertyCard: {
      flexDirection: 'row',
      borderWidth: 0.5,
      borderColor: brand.gray200,
      marginBottom: 12,
      overflow: 'hidden',
    },
    propertyImage: {
      width: 150,
      height: 100,
      objectFit: 'cover',
    },
    propertyContent: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 14,
    },

    // --- Badges -----------------------------------------------------------
    badge: {
      fontSize: 7,
      fontFamily: 'Helvetica-Bold',
      color: brand.white,
      backgroundColor: brand.green,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 2,
      alignSelf: 'flex-start',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    badgeAmber: {
      fontSize: 7,
      fontFamily: 'Helvetica-Bold',
      color: brand.white,
      backgroundColor: brand.amber,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 2,
      alignSelf: 'flex-start',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },

    // --- Bullet Lists -----------------------------------------------------
    bulletRow: {
      flexDirection: 'row',
      marginBottom: 5,
      paddingLeft: 2,
    },
    bulletDot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: brand.amber,
      marginRight: 8,
      marginTop: 3,
    },
    bulletDotGreen: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: brand.green,
      marginRight: 8,
      marginTop: 3,
    },
    bulletText: {
      flex: 1,
      fontSize: 10,
      color: brand.gray600,
      lineHeight: 1.5,
    },

    // --- Stat Rows --------------------------------------------------------
    statRow: {
      flexDirection: 'row',
      marginBottom: 5,
      paddingVertical: 2,
    },
    statLabel: {
      fontSize: 9,
      color: brand.gray500,
      width: 150,
    },
    statValue: {
      flex: 1,
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
    },

    // --- Executive Summary ------------------------------------------------
    summaryBox: {
      backgroundColor: brand.cream,
      padding: 16,
      marginBottom: 16,
      borderLeftWidth: 3,
      borderLeftColor: brand.navy,
    },
    summaryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    summaryCell: {
      width: '50%',
      paddingVertical: 5,
      paddingRight: 12,
    },
    summaryCellLabel: {
      fontSize: 8,
      color: brand.gray500,
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    summaryCellValue: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
    },

    // --- Contact Page -----------------------------------------------------
    contactPage: {
      paddingTop: 60,
      paddingBottom: 56,
      paddingHorizontal: 48,
      fontFamily: 'Helvetica',
    },
    contactBody: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactTitle: {
      fontSize: 28,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
      textAlign: 'center',
      marginBottom: 6,
    },
    contactAccent: {
      width: 40,
      height: 3,
      backgroundColor: brand.amber,
      marginBottom: 28,
    },
    contactOrg: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: brand.navy,
      textAlign: 'center',
      marginBottom: 20,
    },
    contactLine: {
      fontSize: 11,
      color: brand.gray700,
      textAlign: 'center',
      marginBottom: 4,
      lineHeight: 1.6,
    },
    contactHighlight: {
      fontSize: 13,
      fontFamily: 'Helvetica-Bold',
      color: brand.amber,
      textAlign: 'center',
      marginBottom: 4,
    },
    contactNote: {
      fontSize: 10,
      color: brand.gray500,
      textAlign: 'center',
      marginTop: 32,
      lineHeight: 1.6,
      fontFamily: 'Helvetica-Oblique',
    },
  });

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // -----------------------------------------------------------------------
  // Reusable micro-components
  // -----------------------------------------------------------------------
  const PageChrome = ({ children, key: k }: { children: React.ReactNode; key: string }) =>
    h(Page, { key: k, size: 'LETTER', style: styles.page },
      h(View, { style: styles.pageAccent }),
      h(View, { style: styles.pageHeader },
        h(Text, { style: styles.pageHeaderText }, 'Commerce EDC  •  Community Profile'),
        h(Text, { style: styles.pageHeaderText }, date),
      ),
      children,
      h(View, { style: styles.pageFooter },
        h(Text, { style: styles.pageFooterText }, 'Commerce Economic Development Corporation  |  commerceedc.com'),
        h(Text, { style: styles.pageFooterText }, '(903) 886-1121  |  info@commerceedc.com'),
      ),
    );

  const SectionHeader = ({ title, key: k }: { title: string; key: string }) =>
    h(View, { key: k },
      h(Text, { style: styles.sectionTitle }, title),
      h(View, { style: styles.sectionAccent }),
    );

  const Table = ({ headers, rows, key: k }: { headers: string[]; rows: string[][]; key: string }) =>
    h(View, { style: styles.tableWrap, key: k },
      h(View, { style: styles.tableHeader },
        ...headers.map((hdr, i) =>
          h(Text, { style: styles.tableHeaderCell, key: `h${i}` }, hdr)
        ),
      ),
      ...rows.map((row, i) =>
        h(View, { style: i % 2 ? styles.tableRowAlt : styles.tableRow, key: `r${i}` },
          ...row.map((cell, j) =>
            h(Text, { style: styles.tableCell, key: `c${j}` }, cell)
          ),
        )
      ),
    );

  const BulletList = ({ items, color, key: k }: { items: string[]; color?: 'green'; key: string }) =>
    h(View, { key: k },
      ...items.map((item, i) =>
        h(View, { style: styles.bulletRow, key: `b${i}` },
          h(View, { style: color === 'green' ? styles.bulletDotGreen : styles.bulletDot }),
          h(Text, { style: styles.bulletText }, item),
        )
      ),
    );

  // -----------------------------------------------------------------------
  // Property / Building card with image
  // -----------------------------------------------------------------------
  const PropertyCardEl = ({ name, meta, desc, imagePath, badges, key: k }: {
    name: string; meta: string; desc: string; imagePath?: string;
    badges?: Array<{ label: string; variant?: 'green' | 'amber' }>; key: string;
  }) => {
    const imgSrc = imagePath ? resolveImage(imagePath) : undefined;
    return h(View, { style: styles.propertyCard, key: k, wrap: false },
      imgSrc
        ? h(Image, { style: styles.propertyImage, src: imgSrc })
        : h(View, { style: { ...styles.propertyImage, backgroundColor: brand.gray100, justifyContent: 'center', alignItems: 'center' } },
            h(Text, { style: { fontSize: 8, color: brand.gray500 } }, 'No Image'),
          ),
      h(View, { style: styles.propertyContent },
        badges && badges.length > 0
          ? h(View, { style: { flexDirection: 'row', gap: 4, marginBottom: 4 } },
              ...badges.map((b, i) =>
                h(Text, { style: b.variant === 'amber' ? styles.badgeAmber : styles.badge, key: `bg${i}` }, b.label)
              ),
            )
          : null,
        h(Text, { style: styles.cardTitle }, name),
        h(Text, { style: styles.cardMeta }, meta),
        h(Text, { style: styles.cardBody }, desc),
      ),
    );
  };

  // -----------------------------------------------------------------------
  // Section Data
  // -----------------------------------------------------------------------
  const sectionData: Record<string, {
    title: string;
    render: () => ReturnType<typeof React.createElement>[];
  }> = {
    workforce: {
      title: 'Workforce & Demographics',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'w1' },
          'Commerce serves as the economic hub for northeast Hunt County, anchored by East Texas A&M University and a growing advanced manufacturing sector. The region offers a deep, trainable labor pool with competitive wage rates.'),
        h(Text, { style: styles.subsectionTitle, key: 'w2h' }, 'Population & Labor Shed'),
        Table({
          key: 'w2',
          headers: ['Area', 'Population', 'Source'],
          rows: [
            ['City of Commerce', '9,090', '2021 Census Est.'],
            ['Hunt County', '99,956', '2021 Census Est.'],
            ['30-Minute Drive', '~150,000+', 'Labor shed estimate'],
            ['DFW Metroplex', '7.6M+', '60 mi. via I-30'],
          ],
        }),
        h(Text, { style: styles.subsectionTitle, key: 'w3h' }, 'Major Employers'),
        Table({
          key: 'w3',
          headers: ['Employer', 'Industry', 'Employees'],
          rows: [
            ['East Texas A&M University', 'Higher Education', '~850'],
            ['Commerce ISD', 'Education', '~230'],
            ['Walmart Supercenter', 'Retail', '~200'],
            ['Legacy Housing Corporation', 'Manufacturing', '~128'],
            ['Hydro Aluminum Metals', 'Manufacturing', '—'],
            ['Zurn PEX Inc', 'Manufacturing', '—'],
            ['KLZ Stone Group Inc', 'Manufacturing', '—'],
          ],
        }),
      ],
    },

    traffic: {
      title: 'Traffic Counts',
      render: () => [
        h(Text, { style: styles.paragraph, key: 't1' },
          'Annual Average Daily Traffic (AADT) counts from the Texas Department of Transportation for key corridors serving Commerce and the surrounding industrial districts.'),
        Table({
          key: 't2',
          headers: ['Corridor', 'Location', 'AADT'],
          rows: [
            ['I-30', 'West of SH 24 interchange', '37,000+'],
            ['SH 24', 'South of Commerce (4-lane)', '12,000+'],
            ['SH 50', 'At SH 24 shared corridor', '8,000+'],
            ['SH 11', 'East of Commerce', '5,500+'],
          ],
        }),
        h(Text, { style: styles.caption, key: 't3' }, 'Source: TxDOT Statewide Planning Map / Annual Average Daily Traffic data'),
      ],
    },

    utilities: {
      title: 'Utilities & Infrastructure',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'u1' },
          'Reliable, competitively priced utilities with capacity to support large-scale industrial and commercial projects. All utilities are available at EDC-owned industrial tracts.'),

        h(Text, { style: styles.subsectionTitle, key: 'u2h' }, 'Electric Power — Oncor Electric Delivery'),
        Table({
          key: 'u2',
          headers: ['Metric', 'Value'],
          rows: [
            ['System Reliability', '99.9721%'],
            ['Total Substation Capacity', '23,981 KW'],
            ['Reserve Capacity', '16.2%'],
            ['Voltage Available', '12.47 KV (distribution), 69 KV+ (transmission)'],
            ['Deregulated Market', 'Yes — competitive retail electric providers'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'u3h' }, 'Natural Gas — Atmos Energy'),
        Table({
          key: 'u3',
          headers: ['Metric', 'Value'],
          rows: [
            ['BTU Content', '1,050 per cubic foot'],
            ['Industrial Gas Transport', 'Available'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'u4h' }, 'Water System — City of Commerce'),
        Table({
          key: 'u4',
          headers: ['Metric', 'Value'],
          rows: [
            ['Source', 'Lake Tawakoni (Sabine River Authority)'],
            ['Treatment Capacity', '4,200,000 gallons/day'],
            ['Storage Capacity', '2,345,000 gallons'],
            ['Distribution Mains', '6" to 16" lines'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'u5h' }, 'Wastewater / Sewer'),
        Table({
          key: 'u5',
          headers: ['Metric', 'Value'],
          rows: [
            ['Treatment Type', 'Activated sludge'],
            ['Treatment Capacity', '2,000,000 gallons/day'],
            ['TCEQ Permit', 'Active'],
          ],
        }),
      ],
    },

    'tax-rates': {
      title: 'Tax Rates',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'tx1' },
          'Property in Commerce is subject to overlapping tax levies. Texas has no state income tax, making property tax the primary funding mechanism for local services. Multiple abatement programs are available.'),
        Table({
          key: 'tx2',
          headers: ['Taxing Entity', 'Rate (per $100)', 'Notes'],
          rows: [
            ['Hunt County', 'Pending', 'General fund + road & bridge'],
            ['Hunt County Hospital District', 'Pending', 'County healthcare services'],
            ['City of Commerce', 'Pending', 'General fund + debt service'],
            ['Commerce ISD', 'Pending', 'M&O + I&S (debt service)'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'tx3h' }, 'Key Tax Advantages'),
        BulletList({
          key: 'tx3',
          items: [
            'No state income tax (one of nine states)',
            'No corporate income tax (franchise tax only above $2.47M revenue)',
            'Tax abatement programs available (Ch. 312 TX Tax Code)',
            'Freeport Exemption — inventory shipped out of state within 175 days is exempt',
            'Federal Opportunity Zone — capital gains deferral and elimination',
          ],
        }),
      ],
    },

    broadband: {
      title: 'Broadband Coverage',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'b1' },
          'Internet service provider availability and speeds for Commerce, Texas (ZIP 75428). Data sourced from the FCC Broadband Map.'),
        h(Text, { style: styles.subsectionTitle, key: 'b2h' }, 'FCC Broadband Benchmarks'),
        Table({
          key: 'b2',
          headers: ['Tier', 'Download', 'Upload', 'Typical Use'],
          rows: [
            ['Basic Broadband', '25 Mbps', '3 Mbps', 'Email, web, video calls'],
            ['Broadband (Standard)', '100 Mbps', '20 Mbps', 'Streaming, telework'],
            ['High-Speed', '250+ Mbps', '25+ Mbps', 'Multi-user offices, cloud'],
            ['Gigabit', '1,000 Mbps', '100+ Mbps', 'Data centers, manufacturing'],
          ],
        }),
      ],
    },

    'cost-of-living': {
      title: 'Cost of Living',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'c1' },
          'Commerce offers a significantly lower cost of living compared to Dallas-Fort Worth and national averages, making it an attractive location for both businesses recruiting talent and employees seeking affordability.'),
        Table({
          key: 'c2',
          headers: ['Category', 'Commerce', 'DFW Metro', 'National Avg'],
          rows: [
            ['Overall', 'Below Average', 'Above Average', '100'],
            ['Housing', 'Significantly Below', 'Above Average', '100'],
            ['Utilities', 'Near Average', 'Near Average', '100'],
            ['Groceries', 'Below Average', 'Near Average', '100'],
            ['Transportation', 'Below Average', 'Near Average', '100'],
          ],
        }),
      ],
    },

    'business-climate': {
      title: 'Business Climate',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'bc1' },
          'Texas consistently ranks among the top states for business, and Commerce amplifies those advantages with competitive local incentives, a university-anchored workforce, and a growing clean energy manufacturing cluster.'),

        h(Text, { style: styles.subsectionTitle, key: 'bc2h' }, 'Texas Business Advantages'),
        BulletList({
          key: 'bc2',
          items: [
            'Right-to-Work state since 1947',
            'No state income tax — personal or corporate',
            'Franchise tax applies only above $2.47M revenue',
            'Streamlined permitting and regulatory environment',
            'Tort reform — damages caps and loser-pays provisions',
            'Business-friendly legal and regulatory climate',
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'bc3h' }, 'Commerce Competitive Advantages'),
        BulletList({
          key: 'bc3',
          color: 'green',
          items: [
            '230+ acres of EDC-owned, shovel-ready industrial land',
            'Rail-served sites via NETEX & Blacklands Railroad',
            'Federal Opportunity Zone designation',
            'University talent pipeline (ETAMU — 100+ majors)',
            'Growing clean energy manufacturing cluster',
          ],
        }),
      ],
    },

    incentives: {
      title: 'Incentives & Opportunity Zone',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'i1' },
          'The Commerce EDC offers a comprehensive, performance-based incentive toolkit designed to reduce costs and accelerate timelines for qualifying projects. Every incentive is customized.'),

        h(Text, { style: styles.subsectionTitle, key: 'i2h' }, 'Available Incentives'),
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
          h(View, { style: styles.card, key: `ic${i}`, wrap: false },
            h(Text, { style: styles.cardTitle }, item[0]),
            h(Text, { style: styles.cardBody }, item[1]),
          )
        ),

        h(Text, { style: styles.subsectionTitle, key: 'i3h' }, 'Federal Opportunity Zone'),
        h(Text, { style: styles.paragraph, key: 'i3' },
          'Commerce includes a federally designated Opportunity Zone. Investors who deploy capital gains into a Qualified Opportunity Fund benefit from tax deferral, a step-up in basis (5+ years), and permanent elimination of capital gains tax on appreciation (10+ years).'),
      ],
    },

    location: {
      title: 'Location & Access',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'l1' },
          'Commerce is located in Hunt County, 65 miles northeast of Dallas just off Interstate 30, at the intersection of multiple state highways and served by two shortline railroads connecting to Class I carriers.'),

        h(Text, { style: styles.subsectionTitle, key: 'l2h' }, 'Distance to Major Cities'),
        Table({
          key: 'l2',
          headers: ['Destination', 'Distance (miles)'],
          rows: [
            ['Dallas, TX', '66'],
            ['Texarkana, TX', '123'],
            ['Shreveport, LA', '173'],
            ['Oklahoma City, OK', '232'],
            ['Austin, TX', '261'],
            ['Houston, TX', '301'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'l3h' }, 'Highway Network'),
        ...([
          ['Interstate 30', 'Major east-west corridor — Dallas to Texarkana'],
          ['State Highway 24', '4-lane divided, north-south through Commerce'],
          ['State Highway 50', '4-lane divided access south to I-30'],
          ['State Highway 11', 'East-west, Sulphur Springs to Greenville'],
        ] as string[][]).map((item, i) =>
          h(View, { style: styles.statRow, key: `lh${i}` },
            h(Text, { style: { ...styles.statLabel, width: 110 } }, item[0]),
            h(Text, { style: { ...styles.cardBody, flex: 1 } }, item[1]),
          )
        ),

        h(Text, { style: styles.subsectionTitle, key: 'l4h' }, 'Rail Access'),
        h(Text, { style: styles.paragraph, key: 'l4' },
          'Two shortline railroads serve Commerce: NETEX and Blacklands Railroad, connecting to Class I carriers Union Pacific (UP) and Canadian Pacific Kansas City (CPKC) — providing access to transcontinental freight corridors.'),

        h(Text, { style: styles.subsectionTitle, key: 'l5h' }, 'Commerce Municipal Airport'),
        ...([
          ['Runway Length', '3,909 feet'],
          ['Surface', 'Concrete / Asphalt'],
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
        h(Text, { style: styles.paragraph, key: 'q1' },
          'Commerce offers a high quality of life with affordable housing, excellent schools, a vibrant university community, and convenient access to Dallas-Fort Worth amenities — all at a fraction of the cost.'),

        h(Text, { style: styles.subsectionTitle, key: 'q2h' }, 'Education'),
        BulletList({
          key: 'q2',
          items: [
            'East Texas A&M University — 100+ academic programs',
            'Commerce ISD — well-regarded K-12 system',
            'Paris Junior College satellite campus',
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'q3h' }, 'Recreation & Community'),
        BulletList({
          key: 'q3',
          color: 'green',
          items: [
            'Annual Bois d\'Arc Bash community festival',
            'City parks, splash pad, and youth sports programs',
            'Lake Tawakoni — 36,700-acre reservoir nearby',
            'Historic downtown with local shops and restaurants',
            'Low cost of living relative to DFW Metro',
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'q4h' }, 'Healthcare'),
        h(Text, { style: styles.paragraph, key: 'q4' },
          'Commerce is served by local medical facilities and Hunt Regional Medical Center in nearby Greenville. The Hunt County Hospital District provides a county-wide healthcare safety net.'),
      ],
    },

    properties: {
      title: 'Available Properties',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'p1' },
          'The Commerce EDC owns and maintains six industrial tracts totaling over 230 acres. All are zoned industrial, most are rail-served, and all are priced to negotiate. Contact the EDC for a confidential site tour.'),
        ...([
          { name: 'Tract 1 — 11 Acres East of Alliance', acres: '11.155', rail: true, oz: false, desc: 'Near CR 4220. Railroad spur possible. Water and sewer available at southwest corner.', image: '/images/wp-archive/aerials/CEDC-Aerials-0849_Sub_01_1_12_layer.jpeg' },
          { name: 'Tract 2 — 13 Acres West of Alliance', acres: '13.69', rail: true, oz: false, desc: 'South of Blacklands Railroad. 12-inch water, 6-inch sewer, 36-foot concrete street.', image: '/images/wp-archive/edc-projects/EDC-Project-54-scaled.jpg' },
          { name: 'Tract 3 — 25 Acres North of Economic Dr', acres: '24.97', rail: false, oz: false, desc: 'East of FM 3218. Gentle slope. Water and sewer on west side.', image: '/images/wp-archive/aerials/CEDC-Aerials-0857-scaled.jpg' },
          { name: 'Tract 4 — 37 Acres Knight Street', acres: '36.94', rail: true, oz: false, desc: 'Between Knight St and railroad. Lightly wooded. Railroad spur possible.', image: '/images/wp-archive/aerials/CEDC-Aerials-0849_Sub_01_8_13_layer.jpeg' },
          { name: 'Tract 5 — 87 Acres South of Economic Dr', acres: '87', rail: false, oz: false, desc: 'Largest EDC tract. FM 3218 frontage. Gentle topography.', image: '/images/wp-archive/aerials/CEDC-Aerials-0849_Sub_01_3_13_layer.jpeg' },
          { name: 'Tract 6 — 30 Acres Highway 11 East', acres: '30.669', rail: true, oz: false, desc: 'Between Hwy 11 and railroad. Adjacent to operating businesses.', image: '/images/wp-archive/edc-projects/EDC-Project-44-scaled.jpg' },
        ] as Array<{ name: string; acres: string; rail: boolean; oz: boolean; desc: string; image: string }>).map((tract, i) => {
          const badges: Array<{ label: string; variant?: 'green' | 'amber' }> = [];
          if (tract.rail) badges.push({ label: 'Rail-Served', variant: 'green' });
          if (tract.oz) badges.push({ label: 'Opportunity Zone', variant: 'amber' });
          return PropertyCardEl({
            key: `pt${i}`,
            name: tract.name,
            meta: `${tract.acres} acres  •  Zoned Industrial  •  Price: Negotiable`,
            desc: tract.desc,
            imagePath: tract.image,
            badges,
          });
        }),
      ],
    },

    buildings: {
      title: 'Available Buildings',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'bl1' },
          'Move-in ready commercial and industrial facilities available in Commerce. Contact the EDC for specifications, virtual tours, and availability.'),
        PropertyCardEl({
          key: 'bl2',
          name: 'SRS Warehouse Facility',
          meta: '97,110 SF  •  Commerce, TX 75428  •  Price: Contact for Details',
          desc: 'Large warehouse facility suitable for manufacturing, distribution, or storage operations.',
          imagePath: '/images/wp-archive/industrial/covidien-2-6.jpg',
        }),
        PropertyCardEl({
          key: 'bl3',
          name: 'WDF Building',
          meta: '26,500 SF  •  State Hwy 11, Commerce, TX  •  Price: Contact for Details',
          desc: 'Industrial building on Highway 11. Highway frontage with commercial/industrial zoning.',
          imagePath: '/images/wp-archive/industrial/P1020405.jpg',
        }),
      ],
    },

    employers: {
      title: 'Major Employers',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'e1' },
          'Commerce\'s employer base spans higher education, advanced manufacturing, retail, clean energy, and public services — providing a diverse and resilient local economy.'),
        Table({
          key: 'e2',
          headers: ['Employer', 'Industry', 'Employees'],
          rows: [
            ['East Texas A&M University', 'Higher Education', '~850'],
            ['Commerce ISD', 'Education', '~230'],
            ['Walmart Supercenter', 'Retail', '~200'],
            ['Legacy Housing Corp', 'Manufacturing', '~128'],
            ['OutBack Power Technologies', 'Clean Energy Mfg', '~50'],
            ['BigBattery', 'Clean Energy Mfg', '~48'],
            ['Hydro Aluminum Metals', 'Manufacturing', '—'],
            ['Zurn PEX Inc', 'Manufacturing', '—'],
            ['KLZ Stone Group Inc', 'Manufacturing', '—'],
            ['Solar 76', 'Clean Energy Mfg', '—'],
          ],
        }),
      ],
    },

    about: {
      title: 'About Commerce EDC',
      render: () => [
        h(Text, { style: styles.paragraph, key: 'a1' },
          'The Commerce Economic Development Corporation (CEDC) is a Type A economic development corporation funded by a dedicated half-cent sales tax. The CEDC promotes economic growth, job creation, and capital investment in Commerce, Texas.'),

        h(Text, { style: styles.subsectionTitle, key: 'a2h' }, 'Board of Directors'),
        Table({
          key: 'a2',
          headers: ['Name', 'Title', 'Organization'],
          rows: [
            ['Scott Ward', 'President', 'CFO, Fix & Feed'],
            ['Stan McKee', 'Vice-President', 'Retired, ONCOR'],
            ['Michael Glas', 'Treasurer', 'Glas Consulting'],
            ['Dr. Brent Donham', 'Board Member', 'VP, East Texas A&M'],
            ['Mandy Freeman', 'Board Member', 'Senior VP'],
            ['Joe Shipman', 'Board Member', 'Luminous Productions'],
            ['Dan Luckett', 'Board Member', 'Hydro Aluminum'],
            ['Jay Garrett', 'Attorney', 'Faries and Garrett'],
            ['Bonnie Hunter', 'Executive Dir.', 'Commerce EDC'],
          ],
        }),

        h(Text, { style: styles.subsectionTitle, key: 'a3h' }, 'Contact Information'),
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

  // -----------------------------------------------------------------------
  // Build PDF pages
  // -----------------------------------------------------------------------
  const pages: ReturnType<typeof React.createElement>[] = [];

  // --- Cover Page ---------------------------------------------------------
  if (options.includeCoverPage) {
    pages.push(
      h(Page, { key: 'cover', size: 'LETTER', style: styles.coverPage },
        h(View, { style: styles.coverAccent }),
        h(View, { style: styles.coverBody },
          h(Text, { style: styles.coverLabel }, 'Community Profile'),
          h(Text, { style: styles.coverTitle }, 'Commerce, Texas'),
          h(Text, { style: styles.coverTagline }, 'Commerce Means Business'),
          h(View, { style: styles.coverDivider }),
          h(Text, { style: styles.coverMeta }, 'Commerce Economic Development Corporation'),
          h(Text, { style: styles.coverMeta }, '1119 Alamo Street, Commerce, TX 75428'),
          h(Text, { style: styles.coverMeta }, '(903) 886-1121  •  info@commerceedc.com'),
          h(Text, { style: styles.coverDate }, `Prepared ${date}`),
        ),
      ),
    );
  }

  // --- Table of Contents --------------------------------------------------
  const selectedSections = sections.filter((id) => sectionData[id]);
  pages.push(
    PageChrome({
      key: 'toc',
      children: [
        h(Text, { style: styles.tocTitle, key: 'toc-t' }, 'Table of Contents'),
        h(View, { style: styles.tocAccent, key: 'toc-a' }),
        ...(options.includeExecutiveSummary
          ? [h(View, { style: styles.tocItem, key: 'toc-es' },
              h(View, { style: styles.tocBullet }),
              h(Text, { style: styles.tocText }, 'Executive Summary'),
            )]
          : []),
        ...selectedSections.map((id) =>
          h(View, { style: styles.tocItem, key: `toc-${id}` },
            h(View, { style: styles.tocBullet }),
            h(Text, { style: styles.tocText }, sectionData[id].title),
          )
        ),
        h(View, { style: styles.tocSeparator, key: 'toc-sep' }),
        h(View, { style: styles.tocItem, key: 'toc-contact' },
          h(View, { style: styles.tocBullet }),
          h(Text, { style: styles.tocText }, 'Contact Information'),
        ),
      ],
    }),
  );

  // --- Executive Summary --------------------------------------------------
  if (options.includeExecutiveSummary) {
    pages.push(
      PageChrome({
        key: 'exec',
        children: [
          h(Text, { style: styles.sectionTitle, key: 'es-t' }, 'Executive Summary'),
          h(View, { style: styles.sectionAccent, key: 'es-a' }),
          h(Text, { style: styles.paragraph, key: 'es1' },
            'Commerce, Texas is strategically located in Hunt County, 65 miles northeast of Dallas on the I-30 corridor. With 230+ acres of shovel-ready industrial land, rail service via two shortline railroads, and a talent pipeline anchored by East Texas A&M University, Commerce offers a compelling value proposition for manufacturing, distribution, and clean energy operations.'),
          h(View, { style: styles.summaryBox, key: 'es2' },
            h(Text, { style: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: brand.navy, marginBottom: 14 } }, 'Key Facts at a Glance'),
            h(View, { style: styles.summaryGrid },
              ...([
                ['Location', '65 mi NE of Dallas via I-30'],
                ['Industrial Land', '230+ acres, EDC-owned'],
                ['Rail Service', 'NETEX & Blacklands Railroad'],
                ['Anchor Employer', 'East Texas A&M University'],
                ['Opportunity Zone', 'Federally designated'],
                ['Manufacturing', 'Hydro, Zurn, Solar 76, BigBattery'],
                ['City Population', '~9,090 (2021 Census)'],
                ['Labor Shed (30 min)', '~150,000+ workers'],
              ] as string[][]).map((item, i) =>
                h(View, { style: styles.summaryCell, key: `esc${i}` },
                  h(Text, { style: styles.summaryCellLabel }, item[0]),
                  h(Text, { style: styles.summaryCellValue }, item[1]),
                )
              ),
            ),
          ),
          h(Text, { style: styles.paragraph, key: 'es3' },
            'The Commerce EDC offers a performance-based incentive toolkit including land at no cost, tax abatements, forgivable loans, infrastructure support, and enterprise zone benefits. Every package is tailored to the specific needs and commitments of the project.'),
        ],
      }),
    );
  }

  // --- Section Pages ------------------------------------------------------
  for (const id of selectedSections) {
    const section = sectionData[id];
    pages.push(
      PageChrome({
        key: id,
        children: [
          SectionHeader({ title: section.title, key: `${id}-hdr` }),
          ...section.render(),
        ],
      }),
    );
  }

  // --- Contact Page -------------------------------------------------------
  pages.push(
    h(Page, { key: 'contact', size: 'LETTER', style: styles.contactPage },
      h(View, { style: styles.pageAccent }),
      h(View, { style: styles.contactBody },
        h(Text, { style: styles.contactTitle }, 'Let\u2019s Talk'),
        h(View, { style: styles.contactAccent }),
        h(Text, { style: styles.contactOrg }, 'Commerce Economic Development Corporation'),
        h(Text, { style: styles.contactLine }, '1119 Alamo Street'),
        h(Text, { style: styles.contactLine }, 'Commerce, TX 75428'),
        h(View, { style: { marginTop: 16, marginBottom: 16 } }),
        h(Text, { style: styles.contactHighlight }, '(903) 886-1121'),
        h(Text, { style: styles.contactHighlight }, 'info@commerceedc.com'),
        h(View, { style: { marginTop: 8 } }),
        h(Link, { src: 'https://commerceedc.com', style: styles.contactLine }, 'commerceedc.com'),
        h(Text, { style: styles.contactNote },
          'All site selector inquiries are handled with complete confidentiality.\nSchedule a site tour today.'),
      ),
      h(View, { style: styles.pageFooter },
        h(Text, { style: styles.pageFooterText }, 'Commerce Economic Development Corporation  |  commerceedc.com'),
        h(Text, { style: styles.pageFooterText }, '(903) 886-1121'),
      ),
    ),
  );

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  const doc = h(Document, null, ...pages);
  return ReactPDF.renderToBuffer(doc);
}

// ---------------------------------------------------------------------------
// API Route Handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sections, includeExecutiveSummary = true, includeCoverPage = true } = body;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: 'At least one section must be selected' },
        { status: 400 },
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
      { status: 500 },
    );
  }
}
