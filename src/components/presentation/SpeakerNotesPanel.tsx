'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { Sparkles, MessageSquare, Clock, ShieldCheck, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SpeakerNotesPanelProps {
  slide: SlideData;
  onClose?: () => void;
}

export function SpeakerNotesPanel({ slide, onClose }: SpeakerNotesPanelProps) {
  return (
    <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shrink-0 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-150">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Viva Speaker Notes
          </h3>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-slate-400">
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Target Pacing */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
        <span className="text-slate-500 flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-slate-400" /> Target Pacing
        </span>
        <span className="font-mono font-bold text-slate-900">{slide.durationSeconds} seconds</span>
      </div>

      {/* What to Say to External Examiner */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Verbal Script for Examiner
        </span>
        <div className="p-3 rounded-xl bg-indigo-50/30 border border-indigo-100 text-xs text-slate-700 leading-relaxed italic">
          &quot;{slide.speakerNotes}&quot;
        </div>
      </div>

      {/* Technical Scrutiny Focus */}
      <div className="space-y-2 pt-2 border-t border-slate-150">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
          Examiner Scrutiny Focus
        </span>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
          <div className="font-semibold text-slate-900">Anticipated inquiry:</div>
          <p className="text-[11px] leading-relaxed">
            Be ready to justify the threshold parameters and demonstrate understanding of edge
            hardware constraints.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-150 text-[10px] text-slate-400 text-center">
        Notes automatically synced with Slide {slide.slideNumber} of 10
      </div>
    </div>
  );
}
