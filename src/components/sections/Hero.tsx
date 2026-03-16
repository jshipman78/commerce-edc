import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative bg-navy py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 to-navy/80" />
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Where Industry Meets
          <span className="block text-amber-light">Opportunity</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Commerce, Texas — strategically located on I-30, rail-served, with 230+ acres
          of shovel-ready industrial land in a Federal Opportunity Zone.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/available-properties" variant="cta">
            View Available Properties
          </Button>
          <Button href="/contact?type=site-selector" variant="secondary" className="border-white text-white hover:bg-white/10">
            Request a Confidential Site Tour
          </Button>
        </div>
      </div>
    </section>
  );
}
