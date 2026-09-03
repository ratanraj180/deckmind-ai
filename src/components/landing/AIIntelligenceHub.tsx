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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AIIntelligenceHub() {
  const [activeNode, setActiveNode] = useState(2);

  const nodes = [
    {
      id: 0,
      title: 'Document Understanding',
      desc: 'Parses multi-column layouts, tables, and mathematical formulas.',
      icon: BookOpen,
    },
    {
      id: 1,
      title: 'Key Insights Extraction',
      desc: 'Separates core contributions and thesis from background literature.',
      icon: Lightbulb,
    },
    {
      id: 2,
      title: 'Audience Storyline',
      desc: 'Builds narrative tension tailored for professors, peers, or investors.',
      icon: Workflow,
    },
    {
      id: 3,
      title: 'Visual Selection',
      desc: 'Chooses flowcharts for processes, charts for data, diagrams for systems.',
      icon: Palette,
    },
    {
      id: 4,
      title: 'Slide Generation',
      desc: 'Assembles editable vector shapes, typography, and speaker notes.',
      icon: FileCheck2,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-2">
          <Badge variant="indigo">Cognitive Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            How DeckMind AI thinks through your document
          </h2>
          <p className="text-sm text-slate-600">
            A modular intelligence engine designed to produce presentations that persuade and explain.
          </p>
        </div>

        {/* Interactive Radial/Hub Visual Layout */}
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-10 shadow-sm">
          {/* Subtle connection grid line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 -translate-y-1/2 -z-0" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeNode === idx;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(idx)}
                  className={`text-left rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 ${
                    isActive
                      ? 'bg-white border-2 border-indigo-600 shadow-md ring-4 ring-indigo-100/60 scale-105'
                      : 'bg-white/80 border border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">0{idx + 1}</span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isActive ? 'text-indigo-950' : 'text-slate-900'
                      }`}
                    >
                      {node.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Explanation Banner */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="font-semibold text-slate-900">Active Node Focus:</span>
              <span className="text-slate-600">{nodes[activeNode].title}</span>
            </div>
            <div className="text-[11px] font-mono text-indigo-700 font-medium">
              ✓ Automated without human prompts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
