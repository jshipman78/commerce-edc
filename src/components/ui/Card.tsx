import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn(
      'rounded-xl bg-white shadow-sm ring-1 ring-gray-200',
      padding && 'p-6',
      className,
    )}>
      {children}
    </div>
  );
}
