// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

// Site Configuration
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Statistics
export interface StatItem {
  value: string;
  label: string;
  icon?: string;
  source?: string;
}

// Properties
export interface Property {
  id: string;
  name: string;
  acreage: number;
  zoning: string;
  price: string;
  description: string;
  location: string;
  utilities: {
    water: boolean;
    sewer: boolean;
    gas: boolean;
    electric: boolean;
  };
  railServed: boolean;
  opportunityZone: boolean;
  features: string[];
  image?: string;
}

// Buildings
export interface Building {
  id: string;
  name: string;
  address: string;
  squareFeet: number;
  price: string;
  description: string;
  features: string[];
  image?: string;
}

// Board Members
export interface BoardMember {
  name: string;
  title: string;
  role: string;
  organization: string;
  image?: string;
}

// News / MDX
export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  tags?: string[];
}

// Documents (Agendas / Minutes)
export interface BoardDocument {
  id: string;
  title: string;
  date: string;
  type: 'agenda' | 'minutes';
  pdfUrl: string;
  year: number;
}

// Employers
export interface Employer {
  name: string;
  employees?: number;
  industry: string;
  description?: string;
  logo?: string;
  website?: string;
}

// Partner
export interface Partner {
  name: string;
  logo: string;
  website?: string;
}

// Incentive
export interface Incentive {
  title: string;
  description: string;
  icon?: string;
}

// Utility Provider
export interface UtilityProvider {
  name: string;
  type: 'electric' | 'gas' | 'water' | 'sewer' | 'telecom';
  details: Record<string, string>;
  description: string;
}

// Distance
export interface DistanceEntry {
  city: string;
  miles: number;
}

// Tax Rate
export interface TaxRate {
  entity: string;
  rate: string;
  source?: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: 'general' | 'site-selector';
  message: string;
  projectDetails?: string;
}

// Traffic Count
export interface TrafficCount {
  corridor: string;
  location: string;
  aadt: string;
  year: string;
  source: string;
}

// Broadband Provider
export interface BroadbandProvider {
  name: string;
  technologies: string[];
  maxDownload: string;
  maxUpload: string;
  coverage: string;
}
