import Link from 'next/link';
import { Badge } from './Badge';
import { Card } from './Card';
import type { Property } from '@/types';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="flex flex-col">
      <div className="aspect-video w-full rounded-lg bg-cream-dark" />
      <div className="mt-4 flex flex-wrap gap-1.5">
        {property.railServed && <Badge variant="green">Rail-Served</Badge>}
        {property.opportunityZone && <Badge variant="amber">Opportunity Zone</Badge>}
        <Badge variant="navy">{property.zoning}</Badge>
      </div>
      <h3 className="mt-3 font-heading text-lg font-bold text-navy">{property.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{property.location}</p>
      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
        <span>{property.acreage} acres</span>
        <span>{property.price}</span>
      </div>
      <div className="mt-3 flex gap-2">
        {property.utilities.water && (
          <span className="text-xs text-gray-400" title="Water">💧</span>
        )}
        {property.utilities.sewer && (
          <span className="text-xs text-gray-400" title="Sewer">🔧</span>
        )}
        {property.utilities.gas && (
          <span className="text-xs text-gray-400" title="Gas">🔥</span>
        )}
        {property.utilities.electric && (
          <span className="text-xs text-gray-400" title="Electric">⚡</span>
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
