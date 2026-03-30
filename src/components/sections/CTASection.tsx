import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'navy' | 'amber';
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  variant = 'navy',
}: CTASectionProps) {
  const bgClass =
    variant === 'navy'
      ? 'bg-gradient-to-br from-navy-dark via-navy to-navy-light'
      : 'bg-gradient-to-br from-amber-dark via-amber to-amber-light';

  return (
    <section className={`relative overflow-hidden ${bgClass}`}>
      <div className="absolute inset-0 bg-pattern-dots" />
      {/* Soft glow circles */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green/5 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
        <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-100">
            {description}
          </p>
        )}
        <div className="mt-10">
          <Button
            href={buttonHref}
            variant={variant === 'navy' ? 'cta' : 'secondary'}
            className={`shadow-lg ${variant === 'amber' ? 'bg-white text-amber hover:bg-cream' : ''}`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
