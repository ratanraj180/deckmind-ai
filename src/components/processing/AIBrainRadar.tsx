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
        <div className="absolute inset-0 rounded-full border border-indigo-400/40 animate-ping opacity-25 [animation-duration:3s]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-indigo-500/30 animate-spin [animation-duration:24s]" />
        <div className="absolute inset-10 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-sm shadow-2xs" />

        {/* Orbiting intelligence nodes */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-indigo-200 shadow-sm text-indigo-600">
          <Network className="h-4 w-4" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm text-purple-600">
          <Workflow className="h-4 w-4" />
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm text-cyan-600">
          <Layers className="h-4 w-4" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm text-rose-500">
          <Cpu className="h-4 w-4" />
        </div>

        {/* Center Core Display */}
        <div className="relative z-10 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white h-28 w-28 shadow-xl shadow-indigo-500/20 border border-indigo-500/30">
          <Sparkles className="h-4 w-4 text-amber-300 mb-1 animate-pulse" />
          <span className="text-2xl font-black font-mono tracking-tight text-white">{Math.round(progress)}%</span>
          <span className="text-[9px] uppercase tracking-wider text-indigo-300 font-mono font-bold">
            SYNTHESIS
          </span>
        </div>
      </div>

      {/* Dynamic current activity badge */}
      <div className="mt-5 flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/95 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 animate-ping" />
        <span className="font-mono text-[11px] text-indigo-700 font-bold uppercase">
          Current Action:
        </span>
        <span className="text-slate-900 font-bold">{currentStageName}</span>
      </div>
    </div>
  );
}
