'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  FileText,
  Layers,
  ArrowDown,
  CheckCircle2,
  Cpu,
  BarChart3,
  Network,
  Zap,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-[12%] w-[420px] h-[320px] bg-blue-400/25 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-10 right-[10%] w-[360px] h-[280px] bg-amber-300/30 rounded-full blur-[90px] animate-pulse-glow" />
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-emerald-300/18 rounded-full blur-[110px]" />
        <div className="absolute top-40 right-1/3 w-[280px] h-[200px] bg-rose-400/16 rounded-full blur-[90px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Focused Headline, short text, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Next-Gen Presentation Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
              Turn any document into a presentation{' '}
              <span className="gradient-text">worth presenting.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              DeckMind understands dense academic manuscripts, research papers, and technical reports —
              transforming them into audience-aware, stunning slide decks ready for defense.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/dashboard">
                <Button size="lg" variant="accent" className="group font-bold px-7 h-13 rounded-2xl">
                  <span>Create Presentation</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#transformation">
                <Button size="lg" variant="secondary" className="font-semibold px-6 h-13 rounded-2xl">
                  <span>See Live Transformation</span>
                </Button>
              </a>
            </div>

            {/* Quick formats / badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-emerald-200/70 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> PDF & DOCX Ingestion
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-blue-200/70 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-blue-600" /> 100% Editable .PPTX
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-200/70 shadow-xs">
                <Zap className="h-4 w-4 text-amber-500" /> 52+ Design Families
              </span>
            </div>
          </motion.div>

          {/* Right Column: Premium Animated Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* Background decorative glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 rounded-3xl blur-xl opacity-25 -z-10" />

            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl p-5 sm:p-7 shadow-2xl shadow-blue-500/10 space-y-4">
              {/* Step 1: Input Document Card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/80 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-[220px]">
                      Project_Viva_Final_Report.pdf
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      42 Pages • Technical Thesis
                    </span>
                  </div>
                </div>
                <Badge variant="indigo" className="text-[10px] font-mono font-bold uppercase">
                  Input Doc
                </Badge>
              </div>

              {/* Connecting Flow Stem */}
              <div className="flex justify-center my-1">
                <div className="flex items-center gap-2 px-3.5 py-1.2 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-emerald-50 border border-blue-200/70 text-[10px] font-mono font-bold text-slate-700 shadow-xs">
                  <Cpu className="h-3.5 w-3.5 animate-pulse text-blue-600" />
                  <span>DECKMIND SYNTHESIS ENGINE</span>
                  <ArrowDown className="h-3 w-3 text-indigo-600 animate-bounce" />
                </div>
              </div>

              {/* Step 2: Output Professional Slide Preview */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-violet-500/10 space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-bar" />

                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                      Generated 16:9 Presentation
                    </span>
                  </div>
                  <Badge variant="purple" className="text-[9px] py-0 font-mono font-semibold">
                    Slide 04 • System Topology
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                    Edge AI Inference & Hardware Pipeline
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Auto-synthesized into interactive architectural flow
                  </div>
                </div>

                {/* Miniature Visual Layout */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-[10px] font-mono">
                  <div className="p-2.5 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/80 text-center shadow-xs">
                    <span className="text-slate-400 block text-[8px] font-semibold uppercase">INPUT</span>
                    <span className="font-bold text-slate-800 text-[11px]">Sony IMX477</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gradient-to-b from-blue-500 to-violet-600 text-white text-center shadow-md shadow-violet-500/20 border border-white/20">
                    <span className="text-blue-100 block text-[8px] font-bold uppercase">EDGE GPU</span>
                    <span className="font-bold text-white text-[11px]">Jetson Nano</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/80 text-center shadow-xs">
                    <span className="text-slate-400 block text-[8px] font-semibold uppercase">VECTOR DB</span>
                    <span className="font-bold text-slate-800 text-[11px]">FAISS Index</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" /> Complete Examiner Viva Notes
                  </span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    ✓ Native PPTX
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
