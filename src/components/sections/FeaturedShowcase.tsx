import Image from 'next/image';

const images = [
  {
    src: '/images/community/university-fountain.jpg',
    alt: 'East Texas A&M University campus with fountain',
    caption: 'East Texas A&M University',
    span: 'row-span-2' as const,
  },
  {
    src: '/images/hero/commerce-water-tower.jpg',
    alt: 'Aerial view of Commerce, Texas',
    caption: 'City of Commerce',
    span: '' as const,
  },
  {
    src: '/images/community/worker-manufacturing.jpeg',
    alt: 'Advanced manufacturing in Commerce',
    caption: 'Advanced Manufacturing',
    span: '' as const,
  },
  {
    src: '/images/community/boisdarc-bash.jpg',
    alt: "Bois d'Arc Bash community festival",
    caption: "Bois d'Arc Bash Festival",
    span: '' as const,
  },
  {
    src: '/images/community/klz-stone-interior.jpg',
    alt: 'Industrial manufacturing facility interior',
    caption: 'Industrial Facilities',
    span: '' as const,
  },
];

export function FeaturedShowcase() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Discover Commerce
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A thriving community where industry, education, and quality of life come together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* Large featured image — spans 2 columns and 2 rows */}
          <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl shadow-md">
            <div className="relative h-full min-h-[320px] md:min-h-[420px]">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {images[0].caption}
              </p>
            </div>
          </div>

          {/* 4 smaller images */}
          {images.slice(1).map((image) => (
            <div
              key={image.src}
              className="group relative overflow-hidden rounded-xl shadow-md"
            >
              <div className="relative h-full min-h-[160px] md:min-h-[200px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
