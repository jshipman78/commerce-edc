import type { ReportSection } from '@/types';

export const reportSections: ReportSection[] = [
  {
    id: 'workforce',
    title: 'Workforce & Demographics',
    description: 'Population, labor force, education levels, and major employers',
    page: '/data-center/workforce',
    category: 'data-center',
    icon: 'Users',
  },
  {
    id: 'traffic',
    title: 'Traffic Counts',
    description: 'TxDOT Annual Average Daily Traffic data',
    page: '/data-center/traffic',
    category: 'data-center',
    icon: 'Car',
  },
  {
    id: 'utilities',
    title: 'Utilities & Infrastructure',
    description: 'Electric, water, sewer, gas, and telecom providers',
    page: '/data-center/utilities',
    category: 'data-center',
    icon: 'Zap',
  },
  {
    id: 'tax-rates',
    title: 'Tax Rates',
    description: 'Property tax rate comparisons by entity',
    page: '/data-center/tax-rates',
    category: 'data-center',
    icon: 'Receipt',
  },
  {
    id: 'broadband',
    title: 'Broadband Coverage',
    description: 'Internet service providers, speeds, and technologies',
    page: '/data-center/broadband',
    category: 'data-center',
    icon: 'Wifi',
  },
  {
    id: 'cost-of-living',
    title: 'Cost of Living',
    description: 'Cost of living index comparisons',
    page: '/data-center/cost-of-living',
    category: 'data-center',
    icon: 'DollarSign',
  },
  {
    id: 'business-climate',
    title: 'Business Climate',
    description: 'Right-to-work state, business-friendly regulations',
    page: '/why-commerce/business-climate',
    category: 'why-commerce',
    icon: 'TrendingUp',
  },
  {
    id: 'incentives',
    title: 'Incentives & Opportunity Zone',
    description: 'Tax abatements, grants, enterprise zone, and OZ info',
    page: '/why-commerce/incentives',
    category: 'why-commerce',
    icon: 'Award',
  },
  {
    id: 'location',
    title: 'Location & Access',
    description: 'I-30 corridor, rail access, distance tables',
    page: '/why-commerce/location',
    category: 'why-commerce',
    icon: 'MapPin',
  },
  {
    id: 'quality-of-life',
    title: 'Quality of Life',
    description: 'Recreation, education, healthcare, community',
    page: '/why-commerce/quality-of-life',
    category: 'why-commerce',
    icon: 'Heart',
  },
  {
    id: 'properties',
    title: 'Available Properties',
    description: '230+ acres of industrial land across 6 tracts',
    page: '/available-properties',
    category: 'properties',
    icon: 'Map',
  },
  {
    id: 'buildings',
    title: 'Available Buildings',
    description: 'Move-in ready commercial/industrial facilities',
    page: '/available-buildings',
    category: 'properties',
    icon: 'Building2',
  },
  {
    id: 'employers',
    title: 'Major Employers',
    description: 'Employer directory with industry and workforce data',
    page: '/businesses',
    category: 'general',
    icon: 'Briefcase',
  },
  {
    id: 'about',
    title: 'About Commerce EDC',
    description: 'Board of directors, mission, and contact information',
    page: '/about',
    category: 'general',
    icon: 'Info',
  },
];

export function getReportSection(id: string): ReportSection | undefined {
  return reportSections.find((s) => s.id === id);
}

export function getReportSectionsByPage(page: string): ReportSection | undefined {
  return reportSections.find((s) => s.page === page);
}
