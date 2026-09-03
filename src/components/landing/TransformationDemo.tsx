'use client';

import React from 'react';
import { FileText, ArrowRight, Sparkles, Check, Network, BarChart3, Layers, Zap, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TransformationDemo() {
  return (
    <section id="transformation" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-3">
          <Badge variant="purple" className="font-semibold uppercase tracking-wider">
            Deep Document Synthesis
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            From dense documentation to audience-ready slides
          </h2>
          <p className="text-base text-slate-600">
            No copy-pasting or manual layout formatting. DeckMind extracts structural relationships
            and generates persuasive visual slides automatically.
          </p>
        </div>

        {/* 3-Column Visual Transformation Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* Left Column: Dense Raw Document (Before) */}
          <div className="lg:col-span-5 rounded-3xl border border-rose-200/70 bg-white/90 backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-rose-500/10 space-y-4 relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-amber-400" />
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-150 shadow-xs">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 tracking-tight">PROJECT_REPORT.PDF</div>
                  <div className="text-[11px] text-slate-500">Dense academic manuscript (42 pages)</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100/80 text-rose-700 border border-rose-200">
                Before
              </span>
            </div>

            {/* Document Skeleton Content */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 text-xs">
              <div className="font-bold text-slate-800 text-[12px] flex items-center justify-between">
                <span>3.2 Hardware Integration & Jetson Pipeline</span>
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                The embedded module receives 4K RTSP frames from Sony IMX477 sensors at 30 fps.
                Video frames pass through a 3-stage MTCNN network which constructs multi-scale image
                pyramids to detect facial landmark coordinates...
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="h-2 w-4/5 bg-slate-200/80 rounded-full" />
                <div className="h-2 w-full bg-slate-200/80 rounded-full" />
                <div className="h-2 w-2/3 bg-slate-200/80 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Wall-of-text unreadable in viva
              </span>
              <span className="text-rose-600 font-semibold">Low examiner retention</span>
            </div>
          </div>

          {/* Middle Column: AI Processing Transition Arrow */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-4 text-indigo-600">
            <div className="hidden lg:flex flex-col items-center gap-2">
              <span className="text-[9px] font-mono uppercase font-extrabold text-indigo-600 tracking-wider">
                DECKMIND AI
              </span>
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-violet-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-violet-500/30">
                <ArrowRight className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <span className="text-[9px] font-mono text-purple-600 font-bold">SYNTHESIS</span>
            </div>

            <div className="lg:hidden flex items-center justify-center gap-2 my-2 py-2 px-4 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 shadow-xs">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>Synthesizing presentation structure</span>
              <ArrowRight className="h-4 w-4 text-indigo-600" />
            </div>
          </div>

          {/* Right Column: Professional Presentation Preview (After) */}
          <div className="lg:col-span-5 rounded-3xl border border-emerald-200/80 bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-xl shadow-emerald-500/10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-bar" />

            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 tracking-tight">PROFESSIONAL PRESENTATION</div>
                  <div className="text-[11px] text-indigo-700 font-semibold">
                    10 structured slides with visual architecture & charts
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xs">
                After
              </span>
            </div>

            {/* Rendered Slide Preview */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20 border border-indigo-100 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 tracking-tight">
                  Edge AI Inference & Architecture
                </span>
                <span className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                  142ms Latency
                </span>
              </div>

              {/* Diagram Blocks */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
                  <span className="text-slate-400 block text-[8px] uppercase font-bold">ACQUISITION</span>
                  <span className="font-bold text-slate-800 text-[11px]">4K RTSP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-b from-blue-500 to-violet-600 text-white text-center shadow-md shadow-violet-500/20">
                  <span className="text-indigo-200 block text-[8px] uppercase font-bold">DETECTION</span>
                  <span className="font-bold text-[11px]">MTCNN + Face</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
                  <span className="text-slate-400 block text-[8px] uppercase font-bold">LOGGING</span>
                  <span className="font-bold text-slate-800 text-[11px]">Vector FAISS</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> High examiner comprehension
              </span>
              <span className="font-mono text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                Editable .PPTX
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
