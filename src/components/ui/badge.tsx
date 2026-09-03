import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'indigo' | 'warning' | 'purple' | 'cyan' | 'gradient';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-900 text-white shadow-xs',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80',
    outline: 'border border-slate-200 text-slate-700 bg-white/80 backdrop-blur-xs',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs shadow-emerald-500/5',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs shadow-indigo-500/5',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs shadow-amber-500/5',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-xs shadow-purple-500/5',
    cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 shadow-xs shadow-cyan-500/5',
    gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xs shadow-indigo-500/20 border border-white/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
