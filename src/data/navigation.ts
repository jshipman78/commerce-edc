import { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  {
    label: 'Why Commerce',
    href: '/why-commerce',
    children: [
      { label: 'Business Climate', href: '/why-commerce/business-climate', description: 'Texas #1 business climate and local advantages' },
      { label: 'Incentives & OZ', href: '/why-commerce/incentives', description: 'Tax abatements, enterprise zones, and Opportunity Zone' },
      { label: 'Location & Access', href: '/why-commerce/location', description: 'I-30 corridor, rail, air, and highway access' },
      { label: 'Quality of Life', href: '/why-commerce/quality-of-life', description: 'Recreation, education, community assets' },
    ],
  },
  {
    label: 'Data Center',
    href: '/data-center',
    children: [
      { label: 'Workforce & Demographics', href: '/data-center/workforce', description: 'Employment, education, and labor data' },
      { label: 'Traffic Counts', href: '/data-center/traffic', description: 'TxDOT AADT data by corridor' },
      { label: 'Utilities', href: '/data-center/utilities', description: 'Oncor, Atmos, water and sewer capacity' },
      { label: 'Tax Rates', href: '/data-center/tax-rates', description: 'Commerce vs. peer community comparison' },
      { label: 'Broadband', href: '/data-center/broadband', description: 'ISP coverage and fiber availability' },
      { label: 'Cost of Living', href: '/data-center/cost-of-living', description: 'Commerce vs. DFW metro comparison' },
    ],
  },
  {
    label: 'Properties',
    href: '/available-properties',
    children: [
      { label: 'Available Properties', href: '/available-properties', description: '6 EDC-owned industrial tracts' },
      { label: 'Available Buildings', href: '/available-buildings', description: 'Move-in ready facilities' },
    ],
  },
  {
    label: 'Businesses',
    href: '/businesses',
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Board Agendas', href: '/transparency/agendas', description: 'Meeting agendas and notices' },
      { label: 'Board Minutes', href: '/transparency/minutes', description: 'Approved meeting minutes' },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const footerNavigation = {
  quickLinks: [
    { label: 'Why Commerce', href: '/why-commerce' },
    { label: 'Available Properties', href: '/available-properties' },
    { label: 'Available Buildings', href: '/available-buildings' },
    { label: 'Businesses', href: '/businesses' },
    { label: 'News', href: '/news' },
    { label: 'About', href: '/about' },
  ],
  dataCenter: [
    { label: 'Workforce & Demographics', href: '/data-center/workforce' },
    { label: 'Traffic Counts', href: '/data-center/traffic' },
    { label: 'Utilities', href: '/data-center/utilities' },
    { label: 'Tax Rates', href: '/data-center/tax-rates' },
    { label: 'Broadband', href: '/data-center/broadband' },
    { label: 'Cost of Living', href: '/data-center/cost-of-living' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Equal Opportunity Policy', href: '/equal-opportunity-policy' },
    { label: 'Transparency', href: '/transparency' },
  ],
};
