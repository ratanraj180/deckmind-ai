import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'indigo' | 'warning';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-900 text-white',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200/80',
    outline: 'border border-slate-200 text-slate-700 bg-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
