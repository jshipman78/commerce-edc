import Link from 'next/link';
import Image from 'next/image';
import { Droplets, Wrench, Flame, Zap } from 'lucide-react';
import { Badge } from './Badge';
import { Card } from './Card';
import type { Property } from '@/types';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-cream-dark">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-500">Property Image</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {property.railServed && <Badge variant="green">Rail-Served</Badge>}
        {property.opportunityZone && <Badge variant="amber">Opportunity Zone</Badge>}
        <Badge variant="navy">{property.zoning}</Badge>
      </div>
      <h3 className="mt-3 font-heading text-lg font-bold text-navy">{property.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{property.location}</p>
      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
        <span>{property.acreage} acres</span>
        <span>{property.price}</span>
      </div>
      <div className="mt-3 flex gap-3">
        {property.utilities.water && (
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Droplets className="h-3.5 w-3.5 text-blue-500" />
            <span>Water</span>
          </span>
        )}
        {property.utilities.sewer && (
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Wrench className="h-3.5 w-3.5 text-gray-600" />
            <span>Sewer</span>
          </span>
        )}
        {property.utilities.gas && (
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span>Gas</span>
          </span>
        )}
        {property.utilities.electric && (
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Zap className="h-3.5 w-3.5 text-yellow-500" />
            <span>Electric</span>
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm text-gray-600 line-clamp-3">{property.description}</p>
      <div className="mt-4">
        <Link
          href="/contact?type=site-selector"
          className="text-sm font-semibold text-amber hover:text-amber-dark"
        >
          Request Site Tour &rarr;
        </Link>
      </div>
    </Card>
  );
}
