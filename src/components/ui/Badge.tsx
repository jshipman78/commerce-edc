import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'green' | 'amber' | 'navy';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  green: 'bg-green/10 text-green-dark',
  amber: 'bg-amber/10 text-amber-dark',
  navy: 'bg-navy/10 text-navy',
};

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  );
}
