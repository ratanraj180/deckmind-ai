'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PresentationControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes?: () => void;
  showNotes?: boolean;
}

export function PresentationControls({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onToggleNotes,
  showNotes,
}: PresentationControlsProps) {
  return (
    <div className="h-16 border-t border-slate-200/80 bg-white/85 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Slide Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-8 px-3 text-xs font-bold border-slate-200 shadow-2xs"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-1" />
          <span>Prev</span>
        </Button>

        <span className="text-xs font-mono font-bold text-slate-800 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200/60 shadow-2xs">
          Slide {currentIndex + 1} of {totalSlides}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentIndex === totalSlides - 1}
          className="h-8 px-3 text-xs font-bold border-slate-200 shadow-2xs"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>

      {/* Center Keyboard Shortcuts hint */}
      <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <span>Use</span>
        <kbd className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-600 font-bold shadow-2xs">
          ←
        </kbd>
        <kbd className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-600 font-bold shadow-2xs">
          →
        </kbd>
        <span>keys to navigate slides</span>
      </div>

      {/* Right Mode Toggle */}
      <div className="flex items-center gap-2">
        {onToggleNotes && (
          <Button
            variant={showNotes ? 'primary' : 'ghost'}
            size="sm"
            onClick={onToggleNotes}
            className="h-8 text-xs sm:hidden font-bold"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1 text-indigo-400" />
            <span>Notes</span>
          </Button>
        )}
      </div>
    </div>
  );
}
