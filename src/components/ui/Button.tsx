import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]': variant === 'primary',
            'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]': variant === 'secondary',
            'bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]': variant === 'ghost',
            'border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]': variant === 'outline',
            // Sizes
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
