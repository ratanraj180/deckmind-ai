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
    <div className="h-14 border-t border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between">
      {/* Slide Navigation Pill */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-8 px-2 text-xs"
        >
          <ChevronLeft className="h-4 w-4 mr-0.5" />
          <span>Prev</span>
        </Button>

        <span className="text-xs font-mono font-semibold text-slate-700 px-2">
          Slide {currentIndex + 1} of {totalSlides}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentIndex === totalSlides - 1}
          className="h-8 px-2 text-xs"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4 ml-0.5" />
        </Button>
      </div>

      {/* Center Keyboard Shortcuts hint */}
      <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <span>Use</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
          ←
        </kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
          →
        </kbd>
        <span>keys to navigate</span>
      </div>

      {/* Right Mode Toggle */}
      <div className="flex items-center gap-2">
        {onToggleNotes && (
          <Button
            variant={showNotes ? 'primary' : 'ghost'}
            size="sm"
            onClick={onToggleNotes}
            className="h-8 text-xs sm:hidden"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Notes</span>
          </Button>
        )}
      </div>
    </div>
  );
}
