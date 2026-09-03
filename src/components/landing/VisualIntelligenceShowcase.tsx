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
      preview: (
        <div className="flex items-center justify-between gap-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono">
          <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
            1. Frame Grab
          </span>
          <span className="text-slate-300">→</span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
            2. MTCNN
          </span>
          <span className="text-slate-300">→</span>
          <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
            3. Match
          </span>
        </div>
      ),
    },
    {
      title: 'DATA → Benchmark Chart',
      desc: 'Parses empirical tables into clear accuracy and latency comparisons.',
      icon: BarChart2,
      preview: (
        <div className="space-y-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-600">Model Accuracy</span>
            <span className="font-bold text-slate-900">99.4%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[94%]" />
          </div>
        </div>
      ),
    },
    {
      title: 'SYSTEM → Architecture Diagram',
      desc: 'Extracts hardware and cloud nodes into connected structural layers.',
      icon: Network,
      preview: (
        <div className="grid grid-cols-3 gap-1 text-[9px] font-mono text-center">
          <div className="p-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
            Sensor
          </div>
          <div className="p-1 rounded bg-indigo-600 text-white font-bold">Jetson Edge</div>
          <div className="p-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
            Cloud
          </div>
        </div>
      ),
    },
    {
      title: 'COMPARISON → Structured Table',
      desc: 'Maps trade-offs against traditional methods into clear contrast matrices.',
      icon: Columns,
      preview: (
        <div className="divide-y divide-slate-200 text-[10px] rounded-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-100 px-2 py-1 font-bold text-slate-700">
            <span>Manual Call</span>
            <span className="text-rose-600">15 min loss</span>
          </div>
          <div className="grid grid-cols-2 bg-white px-2 py-1 text-slate-800">
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
      preview: (
        <div className="flex items-center justify-between text-[9px] font-mono p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-slate-600">
            <span className="font-bold text-indigo-700 block">Phase 1</span> Core ML
          </div>
          <span className="text-slate-300">——</span>
          <div className="text-slate-600">
            <span className="font-bold text-indigo-700 block">Phase 2</span> ERP Sync
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-[#fafafb] border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-2">
          <Badge variant="secondary">Visual Intelligence</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Concepts become visuals, not bullet points
          </h2>
          <p className="text-sm text-slate-600">
            The AI determines which visual format communicates each specific idea with the highest
            impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{cap.title}</h3>
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
