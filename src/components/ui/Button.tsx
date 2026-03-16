import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta';

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-light',
  secondary: 'bg-white text-navy border border-navy hover:bg-cream',
  ghost: 'text-navy hover:bg-cream',
  cta: 'bg-amber text-white hover:bg-amber-dark',
};

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:opacity-50 disabled:pointer-events-none';

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
