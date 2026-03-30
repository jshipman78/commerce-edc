'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const slides = [
  {
    src: '/images/hero/hydro-aerial.jpg',
    alt: 'Aerial view of Hydro Extrusion industrial facility in Commerce, Texas',
  },
  {
    src: '/images/community/campus-aerial.jpeg',
    alt: 'Aerial view of Texas A&M University-Commerce campus',
  },
  {
    src: '/images/community/railroad-sunset.jpg',
    alt: 'Railroad infrastructure at sunset in Commerce, Texas',
  },
];

const kenBurnsVariants = [
  'kenBurns1 20s ease-in-out infinite alternate',
  'kenBurns2 22s ease-in-out infinite alternate',
  'kenBurns3 18s ease-in-out infinite alternate',
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 7000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-navy-dark">
      {/* Rotating background images with Ken Burns */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-2000"
          style={{
            opacity: i === current ? 1 : 0,
            transitionDuration: '2000ms',
          }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            style={{ animation: kenBurnsVariants[i] }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/50 to-navy-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 to-transparent" />

      {/* Content — left-aligned */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-in-up font-heading text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Where Industry Meets
              <span className="block text-amber-light">Opportunity</span>
            </h1>
            <p
              className="animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed text-gray-200 sm:text-xl sm:leading-relaxed"
              style={{ animationDelay: '0.15s' }}
            >
              Commerce, Texas — strategically located on I-30, rail-served, with 230+ acres
              of shovel-ready industrial land in a Federal Opportunity Zone.
            </p>
            <div
              className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: '0.3s' }}
            >
              <Button href="/available-properties" variant="cta">
                View Available Properties
              </Button>
              <Button
                href="/contact?type=site-selector"
                variant="secondary"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Request a Confidential Site Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-amber'
                : 'w-1.5 bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
