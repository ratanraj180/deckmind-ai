'use client';

import React from 'react';
import { Award, BookOpen, Presentation, FileCheck, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UseCasesSection() {
  const cases = [
    {
      icon: Award,
      title: 'Project Viva Defense',
      tag: 'Engineering',
      summary: 'Architecture blueprints, hardware BOM, and high-probability examiner question preparation.',
      gradient: 'from-purple-500 to-indigo-600',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
      iconColor: 'bg-purple-50 text-purple-600 border-purple-200/80',
    },
    {
      icon: Presentation,
      title: 'Department Seminar',
      tag: 'Academic',
      summary: '15-minute conceptual flowcharts, visual algorithms, and structured pedagogical slides.',
      gradient: 'from-blue-500 to-cyan-600',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
      iconColor: 'bg-blue-50 text-blue-600 border-blue-200/80',
    },
    {
      icon: BookOpen,
      title: 'Research Paper',
      tag: 'IEEE / ACM',
      summary: 'Distills double-column LaTeX PDFs into experimental proof matrices and benchmark graphs.',
      gradient: 'from-cyan-500 to-teal-600',
      tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
      iconColor: 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
    },
    {
      icon: FileCheck,
      title: 'Course Assignment',
      tag: 'Rubric-Aligned',
      summary: 'Rapid 5-slide summary capturing core takeaways, technical trade-offs, and key results.',
      gradient: 'from-emerald-500 to-green-600',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
    },
    {
      icon: Briefcase,
      title: 'Startup Pitch',
      tag: 'Executive',
      summary: 'Problem-solution fit, market traction metrics, revenue model, and competitive moat.',
      gradient: 'from-amber-500 to-orange-600',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
      iconColor: 'bg-amber-50 text-amber-600 border-amber-200/80',
    },
  ];

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-3">
          <Badge variant="gradient" className="font-semibold uppercase tracking-wider">
            Tailored Presentation Storylines
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Engineered for academic evaluations and defenses
          </h2>
          <p className="text-base text-slate-600">
            Calibrated for the exact context, timing constraints, and grading rubrics of your presentation.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-11 w-11 rounded-2xl ${c.iconColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${c.tagColor}`}>
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
