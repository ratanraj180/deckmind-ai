'use client';

import React from 'react';
import { Check, Loader2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StageItem {
  id: number;
  label: string;
  sublabel: string;
}

export const PROCESSING_STAGES: StageItem[] = [
  {
    id: 1,
    label: 'Document uploaded',
    sublabel: 'Verified PDF / DOCX integrity and checksum',
  },
  {
    id: 2,
    label: 'Reading document',
    sublabel: 'Extracting multi-column text, tables, and section hierarchies',
  },
  {
    id: 3,
    label: 'Understanding key concepts',
    sublabel: 'Constructing semantic knowledge graph of core engineering ideas',
  },
  {
    id: 4,
    label: 'Identifying important information',
    sublabel: 'Separating primary findings from background literature',
  },
  {
    id: 5,
    label: 'Building presentation storyline',
    sublabel: 'Aligning narrative tension, time pacing, and audience expectations',
  },
  {
    id: 6,
    label: 'Planning slide structure',
    sublabel: 'Deciding slide sequence: Problem → Solution → Architecture → Results',
  },
  {
    id: 7,
    label: 'Designing visual representations',
    sublabel: 'Synthesizing block diagrams, flowcharts, metric bars & Viva Q&A',
  },
  {
    id: 8,
    label: 'Generating presentation',
    sublabel: 'Compiling editable vector PPTX with speaker notes & annotations',
  },
];

interface ProcessingStagesProps {
  currentStageIndex: number;
}

export function ProcessingStages({ currentStageIndex }: ProcessingStagesProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-2">
      {PROCESSING_STAGES.map((stage, idx) => {
        const isCompleted = idx < currentStageIndex;
        const isCurrent = idx === currentStageIndex;
        const isPending = idx > currentStageIndex;

        return (
          <div
            key={stage.id}
            className={cn(
              'flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300',
              isCurrent && 'bg-white border border-violet-200 shadow-sm scale-[1.01]',
              isCompleted && 'opacity-85 text-slate-700',
              isPending && 'opacity-40 text-slate-400'
            )}
          >
            {/* Status icon badge */}
            <div
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono shrink-0 transition-colors',
                isCompleted && 'bg-emerald-600 text-white shadow-xs',
                isCurrent && 'bg-gradient-to-br from-blue-600 to-violet-600 text-white animate-pulse shadow-xs ring-4 ring-violet-100',
                isPending && 'border border-slate-200 bg-slate-50 text-slate-400'
              )}
            >
              {isCompleted ? (
                <Check className="h-3.5 w-3.5" />
              ) : isCurrent ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Circle className="h-2 w-2 fill-slate-300 text-transparent" />
              )}
            </div>

            {/* Stage title & live sublabel */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-xs font-semibold tracking-tight',
                    isCurrent ? 'text-slate-900 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                  )}
                >
                  {stage.label}
                </span>

                {isCompleted && (
                  <span className="text-[10px] font-mono text-emerald-600 font-medium">Done</span>
                )}
                {isCurrent && (
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase animate-pulse">
                    Processing...
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 truncate mt-0.5">{stage.sublabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
