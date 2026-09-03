'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Award, BookOpen, Presentation, FileCode } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';
import { SAMPLE_DOCUMENT } from '@/lib/mockData';
import { PresentationPurpose } from '@/types/presentation';

export function TemplateQuickPicks() {
  const router = useRouter();
  const { setDocument, updateConfig } = usePresentation();

  const presets = [
    {
      title: 'Final Year Project Viva',
      subtitle: 'NVIDIA Jetson / AI Computer Vision report',
      purpose: 'project_viva' as PresentationPurpose,
      icon: Award,
      badge: 'Viva Defense',
    },
    {
      title: 'Department Seminar Deck',
      subtitle: 'Autonomous Drone SLAM system paper',
      purpose: 'seminar' as PresentationPurpose,
      icon: Presentation,
      badge: '15-min Talk',
    },
    {
      title: 'IEEE Research Paper',
      subtitle: 'Microservices benchmarking conference draft',
      purpose: 'research' as PresentationPurpose,
      icon: BookOpen,
      badge: 'Conference',
    },
    {
      title: 'Lab Mini-Project',
      subtitle: 'Embedded IoT sensor telemetry documentation',
      purpose: 'assignment' as PresentationPurpose,
      icon: FileCode,
      badge: 'Evaluation',
    },
  ];

  const handlePickPreset = (preset: (typeof presets)[0]) => {
    setDocument({
      ...SAMPLE_DOCUMENT,
      name: `${preset.title.replace(/\s+/g, '_')}_Report.pdf`,
    });
    updateConfig('purpose', preset.purpose);
    router.push('/create');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Or Quick-Start by Project Type
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((p, idx) => {
          const Icon = p.icon;
          return (
            <button
              key={idx}
              onClick={() => handlePickPreset(p)}
              className="text-left p-4 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                    {p.badge}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{p.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
