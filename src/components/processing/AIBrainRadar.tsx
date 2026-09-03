'use client';

import React from 'react';
import { Sparkles, Cpu, Layers, Network, Workflow } from 'lucide-react';

interface AIBrainRadarProps {
  progress: number;
  currentStageName: string;
}

export function AIBrainRadar({ progress, currentStageName }: AIBrainRadarProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Outer Pulse Rings */}
      <div className="relative flex h-52 w-52 items-center justify-center">
        {/* Radar ping wave */}
        <div className="absolute inset-0 rounded-full border border-indigo-200/50 animate-ping opacity-30 [animation-duration:3s]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-indigo-300/40 animate-spin [animation-duration:24s]" />
        <div className="absolute inset-10 rounded-full border border-slate-200 bg-white/60 backdrop-blur-xs shadow-xs" />

        {/* Orbiting intelligence nodes */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center h-7 w-7 rounded-full bg-white border border-indigo-200 shadow-xs text-indigo-600">
          <Network className="h-3.5 w-3.5" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center h-7 w-7 rounded-full bg-white border border-slate-200 shadow-xs text-slate-600">
          <Workflow className="h-3.5 w-3.5" />
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-7 w-7 rounded-full bg-white border border-slate-200 shadow-xs text-slate-600">
          <Layers className="h-3.5 w-3.5" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-7 w-7 rounded-full bg-white border border-slate-200 shadow-xs text-slate-600">
          <Cpu className="h-3.5 w-3.5" />
        </div>

        {/* Center Core Display */}
        <div className="relative z-10 flex flex-col items-center justify-center rounded-full bg-slate-900 text-white h-28 w-28 shadow-lg shadow-indigo-200/50">
          <Sparkles className="h-4 w-4 text-indigo-400 mb-1 animate-pulse" />
          <span className="text-2xl font-bold font-mono tracking-tight">{Math.round(progress)}%</span>
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
            SYNTHESIS
          </span>
        </div>
      </div>

      {/* Dynamic current activity badge */}
      <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 shadow-xs">
        <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
        <span className="font-mono text-[11px] text-indigo-700 font-semibold uppercase">
          Current Action:
        </span>
        <span className="text-slate-900 font-medium">{currentStageName}</span>
      </div>
    </div>
  );
}
