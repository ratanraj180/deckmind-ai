'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Sparkles, ExternalLink, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardHeader({
  title = 'Presentation Studio',
  subtitle = 'Transform documents into presentations',
}: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <Link href="/" className="lg:hidden flex h-9 w-9 items-center justify-center rounded-2xl brand-mark text-white">
          <Layers className="h-4 w-4" />
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">{title}</h1>
            <Badge variant="gradient" className="text-[10px] py-0 px-2 font-mono">
              AI Engine
            </Badge>
          </div>
          <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-slate-900 font-medium">
            <span>Website</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
        <Link href="/presentation">
          <Button variant="outline" size="sm" className="text-xs font-semibold border-violet-200/80 bg-violet-50/50 text-violet-700 hover:bg-violet-50 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-indigo-600" />
            <span>Open Active Deck</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
