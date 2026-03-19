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
    logo: '/images/partners/hydro.png',
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
    logo: '/images/partners/legacy-housing.png',
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
    logo: '/images/partners/zurn.png',
  },
  {
    name: 'KLZ Stone Group Inc',
    industry: 'Manufacturing',
    description: 'Granite and stone facility, importing granite from South America.',
  },
];

export const partners: Partner[] = [
  { name: 'Bloomfield Homes', logo: '/images/partners/bloomfield-homes.png' },
  { name: 'Hydro Aluminum', logo: '/images/partners/hydro.png' },
  { name: 'Ben E. Keith', logo: '/images/partners/ben-e-keith.png' },
  { name: 'Mohawk Industries', logo: '/images/partners/mohawk.png' },
  { name: 'Legacy Housing', logo: '/images/partners/legacy-housing.png' },
  { name: 'Zurn PEX', logo: '/images/partners/zurn.png' },
];
