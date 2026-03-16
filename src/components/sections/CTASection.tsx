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
  return (
    <section className={variant === 'navy' ? 'bg-navy' : 'bg-amber'}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {description}
          </p>
        )}
        <div className="mt-8">
          <Button
            href={buttonHref}
            variant={variant === 'navy' ? 'cta' : 'secondary'}
            className={variant === 'amber' ? 'bg-white text-amber hover:bg-cream' : ''}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
