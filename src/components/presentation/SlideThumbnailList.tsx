'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { Badge } from '@/components/ui/badge';
import {
  Network,
  GitBranch,
  BarChart3,
  HelpCircle,
  Award,
  Layers,
  Cpu,
  Compass,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideThumbnailListProps {
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export function SlideThumbnailList({
  slides,
  currentIndex,
  onSelectSlide,
}: SlideThumbnailListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'system_architecture':
        return Network;
      case 'workflow_pipeline':
        return GitBranch;
      case 'results_charts':
        return BarChart3;
      case 'viva_defense':
        return HelpCircle;
      case 'problem_comparison':
        return AlertTriangle;
      case 'hardware_table':
        return Cpu;
      case 'roadmap':
        return Compass;
      default:
        return Layers;
    }
  };

  return (
    <aside className="hidden md:flex w-72 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl flex-col h-full shrink-0 overflow-y-auto p-4 space-y-3.5 shadow-2xs">
      <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
        <span>Slide Deck ({slides.length})</span>
        <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">
          16:9 HD
        </span>
      </div>

      <div className="space-y-2.5">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const Icon = getIcon(slide.visualType);

          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(index)}
              className={cn(
                'w-full text-left rounded-2xl p-3 border transition-all duration-200 flex items-start gap-3 group cursor-pointer select-none',
                isActive
                  ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.01]'
                  : 'border-slate-200/90 bg-white/80 hover:border-indigo-300 hover:bg-white hover:shadow-xs'
              )}
            >
              {/* Slide Index Pill */}
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-bold shrink-0 transition-colors',
                  isActive
                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                )}
              >
                {slide.slideNumber}
              </span>

              {/* Slide Info & Type */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold capitalize">
                    {slide.category}
                  </span>
                  <div
                    className={cn(
                      'p-1 rounded-md text-xs',
                      isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                </div>

                <h4
                  className={cn(
                    'text-xs font-bold truncate tracking-tight',
                    isActive ? 'text-indigo-950' : 'text-slate-700 group-hover:text-slate-900'
                  )}
                >
                  {slide.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-mono">
                  <span>~{slide.durationSeconds}s</span>
                  <span>•</span>
                  <span className="capitalize">{slide.visualType.replace('_', ' ')}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
