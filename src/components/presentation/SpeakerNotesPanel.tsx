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
    <div className="w-72 sm:w-80 border-l border-slate-200/80 bg-white/85 backdrop-blur-xl flex flex-col h-full shrink-0 overflow-y-auto p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-2xs">
            <MessageSquare className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            Viva Speaker Notes
          </h3>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Target Pacing */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs shadow-2xs">
        <span className="text-slate-500 flex items-center gap-1.5 font-medium">
          <Clock className="h-3.5 w-3.5 text-indigo-500" /> Target Pacing
        </span>
        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
          {slide.durationSeconds}s
        </span>
      </div>

      {/* What to Say to External Examiner */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold flex items-center gap-1 tracking-wider">
          <Sparkles className="h-3 w-3 text-indigo-600" /> Verbal Script for Examiner
        </span>
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-indigo-50/20 border border-indigo-150 text-xs text-slate-700 leading-relaxed italic shadow-2xs">
          &quot;{slide.speakerNotes}&quot;
        </div>
      </div>

      {/* Technical Scrutiny Focus */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block tracking-wider">
          Examiner Scrutiny Focus
        </span>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 text-slate-600 shadow-2xs">
          <div className="font-bold text-slate-900">Anticipated inquiry:</div>
          <p className="text-[11px] leading-relaxed">
            Be ready to justify the architectural threshold parameters and demonstrate understanding of edge
            hardware constraints.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 text-center">
        Notes automatically synced with Slide {slide.slideNumber} of 10
      </div>
    </div>
  );
}
