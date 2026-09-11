'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IS_PAYMENT_ENABLED } from '@/lib/config/features';

export function SimplePricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/8 blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center mb-16 space-y-3">
          <Badge variant="indigo" className="font-semibold uppercase tracking-wider">
            Direct & Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Simple, accessible pricing
          </h2>
          <p className="text-base text-slate-600">
            No recurring subscriptions or hidden tiers. Pay per generation or test free right away.
          </p>
        </div>

        {/* Single Focused Pricing Card */}
        <div className="relative mx-auto max-w-md rounded-3xl p-1 bg-gradient-to-b from-blue-500 via-violet-500 to-amber-400 shadow-2xl shadow-violet-500/20">
          <div className="rounded-[22px] bg-white p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-extrabold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60 inline-block">
                {IS_PAYMENT_ENABLED ? 'Pay As You Go' : 'Completely Free'}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 pt-2">Full Presentation Deck</h3>
            </div>

            <div className="flex items-baseline justify-center gap-1.5 pt-1">
              <span className="text-6xl font-black tracking-tight font-mono gradient-text">
                {IS_PAYMENT_ENABLED ? '₹10' : 'Free'}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">/ deck</span>
            </div>

            <div className="space-y-3 text-xs text-slate-700 py-4 border-y border-slate-100 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                </div>
                <span className="font-medium text-slate-800">Any document (PDF or DOCX up to 25MB)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                </div>
                <span className="font-medium text-slate-800">Audience-aware storyline & thesis synthesis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                </div>
                <span className="font-medium text-slate-800">100% Editable native PowerPoint (.pptx) file</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                </div>
                <span className="font-medium text-slate-800">Comprehensive examiner viva Q&A defense notes</span>
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              <Link href="/dashboard" className="block w-full">
                <Button size="lg" variant="accent" className="w-full justify-center font-bold shadow-lg shadow-indigo-500/25 h-12 rounded-xl">
                  <span>Start Creating Now</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>{IS_PAYMENT_ENABLED ? 'First 3 generations are completely free' : 'Enjoy unlimited generations for free'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
