import Image from 'next/image';
import { partners } from '@/data/employers';

export function PartnerLogos() {
  return (
    <section className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
          Community Partners
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-16 w-32 items-center justify-center rounded-lg bg-gray-50 px-4"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-center text-xs font-medium text-gray-500">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
