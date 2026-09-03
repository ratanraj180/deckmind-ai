'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ContextStatusTickerProps {
  message: string;
}

export function ContextStatusTicker({ message }: ContextStatusTickerProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-center p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 max-w-lg mx-auto">
      <Sparkles className="h-4 w-4 text-indigo-600 animate-spin [animation-duration:6s] shrink-0" />
      <span className="text-xs sm:text-sm font-medium text-slate-700 font-mono tracking-tight transition-all duration-300">
        {message}
      </span>
    </div>
  );
}
