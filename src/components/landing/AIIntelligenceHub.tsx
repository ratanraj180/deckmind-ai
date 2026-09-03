'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  Workflow,
  Palette,
  FileCheck2,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AIIntelligenceHub() {
  const [activeNode, setActiveNode] = useState(2);

  const nodes = [
    {
      id: 0,
      title: 'Document Understanding',
      desc: 'Parses complex multi-column layouts, tables, and mathematical formulations.',
      icon: BookOpen,
      gradient: 'from-blue-600 to-indigo-600',
      lightBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
      activeBorder: 'border-blue-500 ring-blue-100',
    },
    {
      id: 1,
      title: 'Key Insights Extraction',
      desc: 'Isolates core contributions and experimental findings from introductory literature.',
      icon: Lightbulb,
      gradient: 'from-purple-600 to-violet-600',
      lightBg: 'bg-purple-50 text-purple-700 border-purple-200/60',
      activeBorder: 'border-purple-500 ring-purple-100',
    },
    {
      id: 2,
      title: 'Audience Storyline',
      desc: 'Builds deliberate narrative pacing tailored for professors, examiners, or reviewers.',
      icon: Workflow,
      gradient: 'from-indigo-600 to-purple-600',
      lightBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
      activeBorder: 'border-indigo-500 ring-indigo-100',
    },
    {
      id: 3,
      title: 'Visual Selection',
      desc: 'Chooses system diagrams for architecture, charts for metrics, and cards for highlights.',
      icon: Palette,
      gradient: 'from-cyan-600 to-teal-600',
      lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
      activeBorder: 'border-cyan-500 ring-cyan-100',
    },
    {
      id: 4,
      title: 'Vector PPTX Output',
      desc: 'Generates editable PowerPoint shapes, custom palettes, and examiner speaking cues.',
      icon: FileCheck2,
      gradient: 'from-emerald-600 to-teal-600',
      lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      activeBorder: 'border-emerald-500 ring-emerald-100',
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-3">
          <Badge variant="cyan" className="font-semibold uppercase tracking-wider">
            Cognitive Pipeline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How DeckMind AI synthesizes your document
          </h2>
          <p className="text-base text-slate-600">
            A modular intelligence engine designed to produce presentations that persuade, defend, and explain.
          </p>
        </div>

        {/* Interactive Radial/Hub Visual Layout */}
        <div className="relative max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-white/75 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_-24px_rgba(66,133,244,0.25)]">
          {/* Subtle connection grid line */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-300 via-purple-400 to-emerald-300 -translate-y-1/2 -z-0 opacity-60" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeNode === idx;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(idx)}
                  className={`text-left rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden ${
                    isActive
                      ? `bg-white border-2 ${node.activeBorder} shadow-lg ring-4 scale-105 z-20`
                      : 'bg-white/85 border border-slate-200 hover:border-slate-300 hover:bg-white hover:scale-[1.02] shadow-xs'
                  }`}
                >
                  {/* Active top line */}
                  {isActive && (
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${node.gradient}`} />
                  )}

                  <div className="flex items-center justify-between">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-tr ${node.gradient} text-white shadow-md`
                          : `${node.lightBg}`
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold leading-snug tracking-tight ${
                        isActive ? 'text-slate-950 font-extrabold' : 'text-slate-800'
                      }`}
                    >
                      {node.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Explanation Banner */}
          <div className="mt-8 pt-6 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900">Current Node Focus:</span>
              <span className="text-indigo-700 font-semibold bg-indigo-50/60 px-2.5 py-0.5 rounded-md border border-indigo-100">
                {nodes[activeNode].title}
              </span>
            </div>
            <div className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shadow-xs">
              ✓ Automated without generic LLM hallucination
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
