import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next Project Viva in less than 48 hours?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Walk into your viva defense fully prepared.
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-normal">
          Upload your project report now. Let DeckMind AI construct your slides, diagrams, and
          answers in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="accent" className="w-full sm:w-auto font-semibold">
              <FileText className="h-4 w-4 mr-2" />
              <span>Upload Document & Start</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" /> Free to start
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" /> No credit card needed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" /> Instant .pptx output
          </span>
        </div>
      </div>
    </section>
  );
}
