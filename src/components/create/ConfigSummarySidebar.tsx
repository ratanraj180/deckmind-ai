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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 sticky top-20">
      <div className="flex items-center justify-between pb-4 border-b border-slate-150">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>Presentation Blueprint</span>
        </h3>
        <Badge variant="indigo" className="text-[10px]">
          Ready
        </Badge>
      </div>

      {/* Selected Document Card */}
      {document ? (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
            Target Document
          </span>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-rose-600 shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 truncate">{document.name}</div>
              <div className="text-[10px] text-slate-500">
                {formatFileSize(document.size)} • ~{document.pages || 42} pages
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200">
          No document selected. Using sample engineering viva report.
        </div>
      )}

      {/* Configuration Matrix */}
      <div className="space-y-3 text-xs">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
          Configured Parameters
        </span>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-slate-400" /> Purpose
          </span>
          <span className="font-semibold text-slate-900 capitalize">
            {config.purpose.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-400" /> Audience
          </span>
          <span className="font-semibold text-slate-900 capitalize">{config.audience}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" /> Duration
          </span>
          <span className="font-semibold text-slate-900">{config.duration}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Layout className="h-3.5 w-3.5 text-slate-400" /> Slides
          </span>
          <span className="font-semibold text-slate-900">{slideCountNumber} slides</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-slate-400" /> Style
          </span>
          <span className="font-semibold text-slate-900 capitalize">{config.style}</span>
        </div>
      </div>

      {/* AI Planned Visual Strategy */}
      <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
        <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block flex items-center gap-1">
          <Cpu className="h-3 w-3" /> Visual Plan for Viva Defense
        </span>
        <div className="space-y-1 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-indigo-600" />
            <span>Architecture block diagram (Jetson & Sensors)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-indigo-600" />
            <span>Flowchart for MTCNN & FaceNet inference</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-indigo-600" />
            <span>Accuracy & Latency empirical charts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-indigo-600" />
            <span>Predicted external examiner Viva questions</span>
          </div>
        </div>
      </div>

      {/* Primary Generate CTA */}
      <Button
        variant="accent"
        size="lg"
        onClick={handleGenerate}
        className="w-full justify-center group shadow-md"
      >
        <span>Generate Presentation</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>

      <p className="text-[11px] text-center text-slate-400">
        Estimated generation time: ~6 seconds
      </p>
    </div>
  );
}
