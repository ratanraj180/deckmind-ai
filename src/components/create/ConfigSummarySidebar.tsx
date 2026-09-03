'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  Layout,
  Users,
  Award,
  Palette,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePresentation } from '@/context/PresentationContext';
import { formatFileSize } from '@/lib/utils';

export function ConfigSummarySidebar() {
  const router = useRouter();
  const { document, config } = usePresentation();

  const handleGenerate = () => {
    router.push('/processing');
  };

  const slideCountNumber = config.slideCount === 'ai_decide' ? '10 (Auto)' : config.slideCount;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 shadow-sm space-y-6 sticky top-20">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>Presentation Blueprint</span>
        </h3>
        <Badge variant="gradient" className="text-[10px] font-mono">
          Ready
        </Badge>
      </div>

      {/* Selected Document Card */}
      {document ? (
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/20 border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Target Document
          </span>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-rose-200 text-rose-600 shrink-0 shadow-2xs">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{document.name}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {formatFileSize(document.size)} • ~{document.pages || 42} pages
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 text-xs border border-amber-200 font-medium">
          No document selected. Using sample engineering viva report.
        </div>
      )}

      {/* Configuration Matrix */}
      <div className="space-y-3 text-xs">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block tracking-wider">
          Configured Parameters
        </span>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-indigo-500" /> Purpose
          </span>
          <span className="font-bold text-slate-900 capitalize">
            {config.purpose.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-purple-500" /> Audience
          </span>
          <span className="font-bold text-slate-900 capitalize">{config.audience}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-500" /> Duration
          </span>
          <span className="font-bold text-slate-900 font-mono">{config.duration}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Layout className="h-3.5 w-3.5 text-blue-500" /> Slides
          </span>
          <span className="font-bold text-slate-900 font-mono">{slideCountNumber} slides</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100 font-medium">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-rose-500" /> Style
          </span>
          <span className="font-bold text-slate-900 capitalize">{config.style}</span>
        </div>
      </div>

      {/* AI Planned Visual Strategy */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2.5 text-xs">
        <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-indigo-600" /> Visual Plan for Viva Defense
        </span>
        <div className="space-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Architecture block diagram (Jetson & Sensors)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Flowchart for MTCNN & FaceNet inference</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Accuracy & Latency empirical charts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Predicted external examiner Viva questions</span>
          </div>
        </div>
      </div>

      {/* Primary Generate CTA */}
      <Button
        variant="accent"
        size="lg"
        onClick={handleGenerate}
        className="w-full justify-center group shadow-lg shadow-indigo-500/20 font-bold h-12 rounded-xl"
      >
        <span>Generate Presentation</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>

      <p className="text-[11px] text-center text-slate-400 font-medium">
        Estimated synthesis: ~4.5 seconds
      </p>
    </div>
  );
}
