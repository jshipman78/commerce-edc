import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="mx-auto max-w-md px-4 text-center">
        <h1 className="font-heading text-6xl font-bold text-navy">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="primary">Go Home</Button>
          <Button href="/contact" variant="ghost">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
