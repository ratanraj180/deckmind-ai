'use client';

import React from 'react';
import { GitBranch, BarChart2, Network, Columns, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function VisualIntelligenceShowcase() {
  const capabilities = [
    {
      title: 'PROCESS → Flow Diagram',
      desc: 'Transforms multi-step algorithms into linear or branching pipelines.',
      icon: GitBranch,
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200/80',
      preview: (
        <div className="flex items-center justify-between gap-1 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-[10px] font-mono shadow-xs">
          <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
            1. Frame Grab
          </span>
          <span className="text-indigo-400 font-bold">→</span>
          <span className="px-2 py-1 rounded-lg bg-indigo-600 text-white font-bold shadow-xs">
            2. MTCNN
          </span>
          <span className="text-indigo-400 font-bold">→</span>
          <span className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
            3. Match
          </span>
        </div>
      ),
    },
    {
      title: 'DATA → Benchmark Chart',
      desc: 'Parses empirical tables into clear accuracy and latency comparisons.',
      icon: BarChart2,
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      preview: (
        <div className="space-y-2 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Model Accuracy</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
              99.4%
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-200/80 overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-[94%]" />
          </div>
        </div>
      ),
    },
    {
      title: 'SYSTEM → Architecture Diagram',
      desc: 'Extracts hardware and cloud nodes into connected structural layers.',
      icon: Network,
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200/80',
      preview: (
        <div className="grid grid-cols-3 gap-1.5 text-[9.5px] font-mono text-center">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Sensor
          </div>
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold shadow-xs">
            Jetson Edge
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Cloud
          </div>
        </div>
      ),
    },
    {
      title: 'COMPARISON → Structured Table',
      desc: 'Maps trade-offs against traditional methods into clear contrast matrices.',
      icon: Columns,
      gradient: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
      preview: (
        <div className="divide-y divide-slate-200 text-[10px] rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-2 bg-slate-100/90 px-2.5 py-1.5 font-bold text-slate-700">
            <span>Manual Roll Call</span>
            <span className="text-rose-600">15 min loss</span>
          </div>
          <div className="grid grid-cols-2 bg-white px-2.5 py-1.5 text-slate-800 font-semibold">
            <span>DeckMind AI</span>
            <span className="text-emerald-600 font-bold">0 sec delay</span>
          </div>
        </div>
      ),
    },
    {
      title: 'TIMELINE → Milestone Roadmap',
      desc: 'Converts future scope and project phases into horizontal milestones.',
      icon: Clock,
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
      preview: (
        <div className="flex items-center justify-between text-[9px] font-mono p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs">
          <div className="text-slate-600">
            <span className="font-bold text-indigo-700 block">Phase 1</span> Core ML
          </div>
          <span className="text-indigo-400 font-bold">——</span>
          <div className="text-slate-600">
            <span className="font-bold text-purple-700 block">Phase 2</span> Edge Opt
          </div>
          <span className="text-purple-400 font-bold">——</span>
          <div className="text-slate-600">
            <span className="font-bold text-cyan-700 block">Phase 3</span> Deploy
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-3">
          <Badge variant="indigo" className="font-semibold uppercase tracking-wider">
            Visual Intelligence Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Concepts become visuals, not bullet points
          </h2>
          <p className="text-base text-slate-600">
            The AI determines which visual format communicates each specific idea with the highest
            impact and retention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-sm p-6 shadow-xs hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                {/* Top accent gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cap.gradient}`} />

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl ${cap.iconBg} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">{cap.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>

                {/* Small Realistic UI Preview */}
                <div className="pt-2 border-t border-slate-100">{cap.preview}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
