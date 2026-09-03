import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

    const variants = {
      primary:
        'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md active:scale-[0.98] focus-visible:ring-slate-900 border border-slate-800',
      accent:
        'bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 text-white hover:from-blue-500 hover:via-violet-500 hover:to-fuchsia-400 shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-fuchsia-500/25 active:scale-[0.98] focus-visible:ring-violet-500 border border-white/20',
      gradient:
        'bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-400 text-white hover:opacity-95 shadow-md shadow-emerald-500/20 hover:shadow-lg active:scale-[0.98] focus-visible:ring-blue-500 border border-white/20',
      secondary:
        'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-2xs hover:shadow-xs active:scale-[0.98] focus-visible:ring-indigo-400 backdrop-blur-xs',
      outline:
        'border border-slate-200/90 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 hover:border-indigo-300 active:scale-[0.98] focus-visible:ring-indigo-400 backdrop-blur-xs',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-white/70 focus-visible:ring-slate-300 active:scale-[0.98]',
      danger:
        'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-400 hover:to-orange-400 shadow-sm shadow-rose-500/20 active:scale-[0.98] focus-visible:ring-rose-500 border border-white/20',
    };

    const sizes = {
      sm: 'text-xs h-8 px-3 gap-1.5',
      md: 'text-sm h-10 px-4 gap-2',
      lg: 'text-base h-12 px-6 gap-2.5 font-medium',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
