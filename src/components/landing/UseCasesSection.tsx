'use client';

import React from 'react';
import { Award, BookOpen, Presentation, FileCheck, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UseCasesSection() {
  const cases = [
    {
      icon: Award,
      title: 'Project Viva',
      tag: 'Engineering',
      summary: 'Architecture diagrams, BOM breakdown & anticipated examiner questions.',
    },
    {
      icon: Presentation,
      title: 'Seminar',
      tag: 'Departmental',
      summary: '15-minute conceptual flowcharts and algorithmic transitions.',
    },
    {
      icon: BookOpen,
      title: 'Research Paper',
      tag: 'IEEE / Conference',
      summary: 'Distills double-column LaTeX drafts into experimental proof slides.',
    },
    {
      icon: FileCheck,
      title: 'Assignment',
      tag: 'Rubric-Aligned',
      summary: 'Rapid 5-slide summary capturing core takeaways and results.',
    },
    {
      icon: Briefcase,
      title: 'Business Pitch',
      tag: 'Executive',
      summary: 'Problem-solution fit, market metrics, and technical moat.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-14 space-y-2">
          <Badge variant="indigo">Tailored Presentations</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Engineered for academic evaluations and defenses
          </h2>
          <p className="text-sm text-slate-600">
            Calibrated for the exact context and grading rubrics of your evaluation.
          </p>
        </div>

        {/* Minimalist Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
                      <Icon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-medium">{c.tag}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mb-1">{c.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{c.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
