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
  title = 'Workspace',
  subtitle = 'Presentation Intelligence',
}: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-xs flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-slate-900">{title}</h1>
            <Badge variant="indigo" className="text-[10px] py-0">
              AI Powered
            </Badge>
          </div>
          <span className="text-xs text-slate-500">{subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-slate-900">
            <span>Website</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
        <Link href="/presentation">
          <Button variant="outline" size="sm" className="text-xs">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-indigo-600" />
            <span>Open Sample Deck</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
