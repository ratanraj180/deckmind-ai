'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface ContextStatusTickerProps {
  message: string;
}

export function ContextStatusTicker({ message }: ContextStatusTickerProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-center p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 max-w-lg mx-auto shadow-xs">
      <Sparkles className="h-4 w-4 text-indigo-600 animate-spin [animation-duration:6s] shrink-0" />
      <span className="text-xs sm:text-sm font-semibold text-slate-800 font-mono tracking-tight transition-all duration-300">
        {message}
      </span>
    </div>
  );
}
