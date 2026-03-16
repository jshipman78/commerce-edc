import type { Employer, Partner } from '@/types';

export const majorEmployers: Employer[] = [
  {
    name: 'East Texas A&M University',
    employees: 850,
    industry: 'Higher Education',
    description: 'Established 1889, offering 100+ majors at undergraduate, masters, and doctoral levels.',
  },
  {
    name: 'Hydro Aluminum Metals — Commerce',
    industry: 'Manufacturing',
    description: 'State-of-the-art aluminum recycling and manufacturing facility.',
  },
  {
    name: 'Commerce ISD',
    employees: 230,
    industry: 'Education',
    description: 'K-12 public school district serving Commerce and surrounding areas.',
  },
  {
    name: 'Legacy Housing Corporation',
    employees: 128,
    industry: 'Manufacturing',
    description: 'Manufactured and modular home builder.',
  },
  {
    name: 'Walmart',
    employees: 200,
    industry: 'Retail',
    description: 'Supercenter retail location.',
  },
  {
    name: 'Zurn PEX Inc',
    industry: 'Manufacturing',
    description: 'Plumbing and water management products manufacturing.',
  },
  {
    name: 'KLZ Stone Group Inc',
    industry: 'Manufacturing',
    description: 'Granite and stone facility, importing granite from South America.',
  },
];

export const partners: Partner[] = [
  { name: 'City of Commerce', logo: '/images/partners/city-of-commerce.png' },
  { name: 'Commerce Chamber of Commerce', logo: '/images/partners/commerce-chamber.png' },
  { name: 'East Texas A&M University', logo: '/images/partners/etamu.png' },
  { name: 'Commerce ISD', logo: '/images/partners/cisd.png' },
  { name: 'Hunt County', logo: '/images/partners/hunt-county.png' },
];
