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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-[#fafafb]">
      {/* Subtle ambient light gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,#eef2ff,transparent_70%)] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Focused Headline, short text, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/90 bg-indigo-50/80 px-3.5 py-1 text-xs font-medium text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>AI Presentation Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Turn any document into a presentation{' '}
              <span className="text-indigo-600">worth presenting.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              DeckMind understands your document, identifies what matters, and transforms it into a
              structured, visually engaging presentation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/dashboard">
                <Button size="lg" variant="accent" className="shadow-md shadow-indigo-600/20 group">
                  <span>Create Presentation</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#transformation">
                <Button size="lg" variant="secondary" className="border-slate-200">
                  See how it works
                </Button>
              </a>
            </div>

            {/* Quick formats */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> PDF & DOCX supported
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Editable .PPTX export
              </span>
            </div>
          </motion.div>

          {/* Right Column: Premium Animated Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xl shadow-slate-200/60">
              {/* Step 1: Input Document Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-150 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                      Project_Viva_Final_Report.pdf
                    </span>
                    <span className="text-[11px] text-slate-500">42 Pages • Technical Thesis</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  Input
                </Badge>
              </div>

              {/* Connecting Flow Stem */}
              <div className="flex justify-center my-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-mono font-bold text-indigo-700">
                  <Cpu className="h-3 w-3 animate-pulse text-indigo-600" />
                  <span>DECKMIND INTELLIGENCE ENGINE</span>
                  <ArrowDown className="h-3 w-3" />
                </div>
              </div>

              {/* Step 2: Output Professional Slide Preview */}
              <div className="rounded-xl border-2 border-indigo-500/80 bg-white p-4 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-150 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-mono font-semibold uppercase text-slate-700">
                      Generated 16:9 Presentation
                    </span>
                  </div>
                  <Badge variant="indigo" className="text-[9px] py-0 font-mono">
                    Slide 04 • Architecture
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-900">
                    System Architecture & Hardware Nodes
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Auto-synthesized into visual pipeline instead of raw bullets
                  </div>
                </div>

                {/* Miniature Visual Layout */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
                    <span className="text-slate-400 block text-[8px]">INPUT</span>
                    <span className="font-bold text-slate-800">Sony Sensor</span>
                  </div>
                  <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-center">
                    <span className="text-indigo-600 block text-[8px] font-bold">EDGE AI</span>
                    <span className="font-bold text-indigo-950">Jetson Nano</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-center">
                    <span className="text-slate-400 block text-[8px]">STORAGE</span>
                    <span className="font-bold text-slate-800">Vector FAISS</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-indigo-500" /> Includes Examiner Speaker Notes
                  </span>
                  <span className="font-semibold text-emerald-600">✓ Editable PPTX</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
