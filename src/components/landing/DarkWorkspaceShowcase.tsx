'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Download,
  RotateCw,
  Edit3,
  Network,
  GitBranch,
  BarChart3,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DarkWorkspaceShowcase() {
  return (
    <section className="py-24 bg-[#090d16] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-14 space-y-3">
          <Badge variant="indigo" className="bg-indigo-900/60 text-indigo-300 border-indigo-700/60">
            Professional Presentation Workspace
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Presentations that look designed by senior engineers
          </h2>
          <p className="text-sm text-slate-400">
            Every slide is rendered in standard 16:9 HD with editable vector shapes, native
            typography, and speaker defense cues.
          </p>
        </div>

        {/* Realistic Presentation Workspace UI Container */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-[#0f1422] p-3 sm:p-5 shadow-2xl shadow-indigo-950/40 space-y-3">
          {/* Workspace Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#141b2d] border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-bold text-slate-200 truncate max-w-xs">
                Smart Attendance System — Final Viva Defense
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-[#1c253d] px-2 py-0.5 rounded border border-slate-700">
                10 Slides • 10m
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                External Professor Mode
              </span>
              <Link href="/presentation">
                <Button variant="accent" size="sm" className="h-7 text-xs shadow-none">
                  <Download className="h-3 w-3 mr-1" />
                  <span>Download .PPTX</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Workspace Body: Left Thumbnails + Main 16:9 Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[360px]">
            {/* Left Thumbnails */}
            <div className="hidden md:flex md:col-span-3 flex-col gap-2 p-2 rounded-xl bg-[#141b2d] border border-slate-800 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold px-2 py-1">
                Slide Navigator
              </span>

              <div className="p-2 rounded-lg bg-[#1a233a] border border-slate-700 text-slate-300 flex items-center justify-between">
                <span className="truncate">1. Project Overview</span>
                <span className="text-[9px] font-mono text-slate-400">01</span>
              </div>
              <div className="p-2 rounded-lg bg-[#1a233a] border border-slate-700 text-slate-300 flex items-center justify-between">
                <span className="truncate">2. Problem Bottlenecks</span>
                <span className="text-[9px] font-mono text-slate-400">02</span>
              </div>
              <div className="p-2 rounded-lg bg-indigo-600/30 border border-indigo-500 text-white font-bold flex items-center justify-between">
                <span className="truncate">4. System Architecture</span>
                <span className="text-[9px] font-mono text-indigo-300">Active</span>
              </div>
              <div className="p-2 rounded-lg bg-[#1a233a] border border-slate-700 text-slate-300 flex items-center justify-between">
                <span className="truncate">5. Pipeline Latency</span>
                <span className="text-[9px] font-mono text-slate-400">05</span>
              </div>
              <div className="p-2 rounded-lg bg-[#1a233a] border border-slate-700 text-slate-300 flex items-center justify-between">
                <span className="truncate">6. Empirical Metrics</span>
                <span className="text-[9px] font-mono text-slate-400">06</span>
              </div>
            </div>

            {/* Center Main Slide (High Fidelity Preview) */}
            <div className="md:col-span-9 rounded-xl border border-slate-800 bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between aspect-[16/9] shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" className="text-[10px]">
                    <Network className="h-3 w-3 mr-1" /> System Architecture
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400">
                    NVIDIA Jetson Nano + FaceNet
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">SLIDE 04</span>
              </div>

              {/* Dynamic diagram */}
              <div className="my-auto py-3 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  Decoupled Hardware-to-Cloud Pipeline Architecture
                </h3>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[8px] text-slate-400 uppercase block font-semibold">
                      Sensor
                    </span>
                    <span className="font-bold text-slate-800">Sony IMX477</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-indigo-50 border-2 border-indigo-600 text-indigo-950 shadow-xs">
                    <span className="text-[8px] text-indigo-700 uppercase block font-bold">
                      Edge AI
                    </span>
                    <span className="font-bold">Jetson Nano GPU</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[8px] text-slate-400 uppercase block font-semibold">
                      Local DB
                    </span>
                    <span className="font-bold text-slate-800">FAISS Index</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[8px] text-slate-400 uppercase block font-semibold">
                      Portal
                    </span>
                    <span className="font-bold text-slate-800">Faculty REST API</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-150 pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Total Latency: 142ms</span>
                <span className="text-emerald-600 font-bold">✓ 99.4% Recognition Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/dashboard">
            <Button size="lg" variant="accent" className="shadow-lg shadow-indigo-600/30 font-bold">
              <span>Try with your own report now</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
