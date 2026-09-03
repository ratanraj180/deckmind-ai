'use client';

import React from 'react';
import { FileText, ArrowRight, Sparkles, Check, Network, BarChart3, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TransformationDemo() {
  return (
    <section id="transformation" className="py-20 bg-[#f1f5f9]/70 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-14 space-y-2">
          <Badge variant="indigo">The Transformation</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            From dense documentation to audience-ready slides
          </h2>
          <p className="text-sm text-slate-600">
            No endless manual copying. DeckMind extracts structural relationships and creates
            visual slides automatically.
          </p>
        </div>

        {/* 3-Column Visual Transformation Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          {/* Left Column: Dense Raw Document (Before) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">PROJECT_REPORT.PDF</div>
                  <div className="text-[10px] text-slate-500">Dense academic manuscript (42 pages)</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px] uppercase">
                Before
              </Badge>
            </div>

            {/* Document Skeleton Content */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs">
              <div className="font-bold text-slate-800 text-[11px]">
                3.2 Hardware Integration & Jetson Pipeline
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The embedded module receives 4K RTSP frames from Sony IMX477 sensors at 30 fps.
                Video frames pass through a 3-stage MTCNN network which constructs multi-scale image
                pyramids to detect facial landmark coordinates...
              </p>
              <div className="h-1.5 w-4/5 bg-slate-200 rounded" />
              <div className="h-1.5 w-full bg-slate-200 rounded" />
              <div className="h-1.5 w-2/3 bg-slate-200 rounded" />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Wall-of-text report</span>
              <span className="text-rose-600 font-medium">Unsuitable for live presentation</span>
            </div>
          </div>

          {/* Middle Column: AI Processing Transition Arrow */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 text-indigo-600">
            <div className="hidden lg:flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-mono uppercase font-bold text-indigo-700 tracking-wider">
                DEEP AI
              </span>
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                <ArrowRight className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono text-slate-400">ANALYSIS</span>
            </div>

            <div className="lg:hidden flex items-center gap-2 my-2 text-xs font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              <span>Synthesizing presentation structure</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Right Column: Professional Presentation Preview (After) */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-indigo-600/90 bg-white p-6 shadow-md shadow-indigo-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">PROFESSIONAL PRESENTATION</div>
                  <div className="text-[10px] text-indigo-700 font-medium">
                    10 structured slides with visual architecture & charts
                  </div>
                </div>
              </div>
              <Badge variant="indigo" className="text-[10px] uppercase">
                After
              </Badge>
            </div>

            {/* Rendered Slide Preview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Edge AI Inference & Architecture
                </span>
                <span className="text-[10px] font-mono text-indigo-700 font-bold">142ms Latency</span>
              </div>

              {/* Diagram Blocks */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center">
                  <span className="text-slate-400 block text-[8px]">ACQUISITION</span>
                  <span className="font-bold text-slate-800">4K RTSP</span>
                </div>
                <div className="p-2 rounded-lg bg-indigo-600 text-white text-center shadow-xs">
                  <span className="text-indigo-200 block text-[8px]">DETECTION</span>
                  <span className="font-bold">MTCNN + FaceNet</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center">
                  <span className="text-slate-400 block text-[8px]">LOGGING</span>
                  <span className="font-bold text-slate-800">Local Vector DB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> High audience comprehension
              </span>
              <span className="text-slate-500 font-mono text-[10px]">Editable .PPTX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
