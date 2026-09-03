'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SimplePricing() {
  return (
    <section id="pricing" className="py-24 bg-[#fafafb] border-b border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center mb-12 space-y-2">
          <Badge variant="indigo">Transparent & Direct</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Simple, accessible pricing
          </h2>
          <p className="text-sm text-slate-600">
            No subscriptions or hidden tiers. Pay per generation or start completely free.
          </p>
        </div>

        {/* Single Focused Pricing Card */}
        <div className="mx-auto max-w-md rounded-3xl border-2 border-indigo-600 bg-white p-8 sm:p-10 shadow-xl shadow-indigo-100/50 text-center space-y-6 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold">
              Pay As You Go
            </span>
            <h3 className="text-xl font-bold text-slate-900">Create a Presentation</h3>
          </div>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black tracking-tight text-slate-900 font-mono">₹10</span>
            <span className="text-xs text-slate-500 font-medium">/ presentation</span>
          </div>

          <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-150">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>One document (PDF or DOCX up to 50MB)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>One intelligent, audience-aware presentation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>100% Editable native PowerPoint (.pptx) download</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full">
              <Button size="lg" variant="accent" className="w-full justify-center font-bold shadow-md">
                <span>Create Presentation</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              <span>First 3 generations are completely free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
