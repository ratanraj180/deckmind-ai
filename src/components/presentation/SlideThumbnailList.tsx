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
    <aside className="w-72 border-r border-slate-200 bg-slate-50/60 flex flex-col h-full shrink-0 overflow-y-auto p-4 space-y-3">
      <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Slides ({slides.length})</span>
        <span className="text-[10px] font-mono text-indigo-600">16:9 HD</span>
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
                'w-full text-left rounded-xl p-3 border transition-all duration-150 flex items-start gap-3 group cursor-pointer select-none',
                isActive
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-100'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              )}
            >
              {/* Slide Index Pill */}
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold shrink-0 transition-colors',
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                )}
              >
                {slide.slideNumber}
              </span>

              {/* Slide Info & Type */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono text-slate-400 capitalize">
                    {slide.category}
                  </span>
                  <div
                    className={cn(
                      'p-1 rounded text-xs',
                      isActive ? 'text-indigo-600' : 'text-slate-400'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                </div>

                <h4
                  className={cn(
                    'text-xs font-semibold truncate',
                    isActive ? 'text-indigo-950 font-bold' : 'text-slate-700 group-hover:text-slate-900'
                  )}
                >
                  {slide.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
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
