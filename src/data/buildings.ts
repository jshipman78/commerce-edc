import type { Building } from '@/types';

export const buildings: Building[] = [
  {
    id: 'srs-warehouse',
    name: 'SRS Warehouse Facility',
    address: 'Commerce, TX 75428',
    squareFeet: 97110,
    price: 'Contact for Details',
    description: 'Large warehouse facility available in Commerce. Contact CEDC for full specifications, utilities, and availability status.',
    features: ['97,110 SF', 'Warehouse/Industrial'],
    image: '/images/community/industry.jpeg',
  },
  {
    id: 'wdf-building',
    name: 'WDF Building',
    address: 'State Highway 11, Commerce, TX 75428',
    squareFeet: 26500,
    price: 'Contact for Details',
    description: 'Industrial building on State Highway 11. Contact CEDC for full specifications and current availability.',
    features: ['26,500 SF', 'Highway 11 location'],
    image: '/images/hero/hydro-aerial.jpg',
  },
];
