import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn(
      'rounded-xl bg-white shadow-md ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-lg hover:ring-gray-300/80 hover:-translate-y-0.5',
      padding && 'p-6',
      className,
    )}>
      {children}
    </div>
  );
}
