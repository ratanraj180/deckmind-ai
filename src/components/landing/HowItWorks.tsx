import React from 'react';
import { UploadCloud, SlidersHorizontal, Sparkles, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: UploadCloud,
      title: 'Upload Document',
      description:
        'Drop your 10 to 60-page Project Report, IEEE Research Paper, Seminar Document, or Assignment in PDF or DOCX format.',
      detail: 'Supports multi-column academic formats & formulas',
    },
    {
      step: '02',
      icon: SlidersHorizontal,
      title: 'Target Audience & Timing',
      description:
        'Specify your audience (Professor, Students, Reviewers), occasion (Viva, Seminar, Defense), and talk length (5, 10, 15, or 20 min).',
      detail: 'Calibrates pacing and technical depth',
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Presentation Storytelling Engine',
      description:
        'DeckMind selects core ideas, constructs narrative progression, and maps each concept to flowcharts, architecture blocks, or metrics.',
      detail: 'No boring walls of text',
    },
    {
      step: '04',
      icon: Download,
      title: 'Editable PPTX Download',
      description:
        'Preview every slide interactively, view AI-suggested speaker notes for your viva defense, and export as native, editable PowerPoint slides.',
      detail: 'Fully customizable shapes, text & vectors',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/60 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
          <Badge variant="secondary">Intuitive Workflow</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From dense documentation to confident defense in minutes
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A structured four-step methodology engineered to save hours of manual slide drafting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{item.step}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-indigo-600">
                  ✓ {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
