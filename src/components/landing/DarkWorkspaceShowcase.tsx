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
    <section id="showcase" className="py-28 mesh-canvas-dark text-white relative overflow-hidden">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-purple-600/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 space-y-3">
          <Badge variant="indigo" className="bg-indigo-950/80 text-indigo-300 border-indigo-700/60 font-semibold uppercase tracking-wider">
            Live Presentation Studio
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Presentations that look designed by{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              senior engineers
            </span>
          </h2>
          <p className="text-base text-slate-400">
            Every slide is rendered in standard 16:9 HD with editable vector shapes, native
            typography, and embedded examiner speaker notes.
          </p>
        </div>

        {/* Realistic Presentation Workspace UI Container */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 shadow-2xl space-y-4">
          {/* Workspace Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 mr-1">
                <div className="h-3 w-3 rounded-full bg-rose-500/90 shadow-xs" />
                <div className="h-3 w-3 rounded-full bg-amber-500/90 shadow-xs" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-xs" />
              </div>
              <span className="text-xs font-bold text-slate-200 truncate max-w-xs sm:max-w-md">
                Smart Attendance System — Final Viva Defense
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
                10 Slides • 10m Viva
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Evaluation Mode
              </span>
              <Link href="/presentation">
                <Button variant="accent" size="sm" className="h-8 text-xs font-bold shadow-md shadow-indigo-500/20">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span>Download .PPTX</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Workspace Body: Left Thumbnails + Main 16:9 Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[380px]">
            {/* Left Thumbnails */}
            <div className="hidden md:flex md:col-span-3 flex-col gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider px-2 py-1">
                Slide Navigator
              </span>

              <div className="p-2.5 rounded-xl bg-[#182035] border border-slate-700/60 text-slate-300 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
                <span className="truncate">1. Project Overview</span>
                <span className="text-[9px] font-mono text-slate-400">01</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#182035] border border-slate-700/60 text-slate-300 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
                <span className="truncate">2. Problem Bottlenecks</span>
                <span className="text-[9px] font-mono text-slate-400">02</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/80 text-white font-bold flex items-center justify-between shadow-xs">
                <span className="truncate text-indigo-200">4. System Topology</span>
                <span className="text-[9px] font-mono text-cyan-300 font-bold bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-700">Active</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#182035] border border-slate-700/60 text-slate-300 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
                <span className="truncate">5. Pipeline Latency</span>
                <span className="text-[9px] font-mono text-slate-400">05</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#182035] border border-slate-700/60 text-slate-300 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
                <span className="truncate">6. Empirical Metrics</span>
                <span className="text-[9px] font-mono text-slate-400">06</span>
              </div>
            </div>

            {/* Center Main Slide (High Fidelity Preview) */}
            <div className="md:col-span-9 rounded-2xl border border-slate-800 bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between aspect-[16/9] shadow-2xl relative overflow-hidden">
              {/* Top Slide Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-bar" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-3 pt-1">
                <div className="flex items-center gap-2.5">
                  <Badge variant="indigo" className="text-[10px] font-bold">
                    <Network className="h-3 w-3 mr-1" /> System Architecture
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    NVIDIA Jetson Nano + FaceNet
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                  SLIDE 04
                </span>
              </div>

              {/* Dynamic diagram */}
              <div className="my-auto py-4 space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                  Decoupled Hardware-to-Cloud Pipeline Architecture
                </h3>

                <div className="grid grid-cols-4 gap-2.5 text-center text-[10px] font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">
                      Sensor
                    </span>
                    <span className="font-bold text-slate-800 text-[11px]">Sony IMX477</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-b from-blue-500 to-violet-600 text-white shadow-md shadow-violet-500/25 border border-white/20">
                    <span className="text-[8px] text-indigo-200 uppercase block font-bold">
                      Edge AI
                    </span>
                    <span className="font-bold text-white text-[11px]">Jetson Nano GPU</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">
                      Local DB
                    </span>
                    <span className="font-bold text-slate-800 text-[11px]">FAISS Index</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">
                      Portal
                    </span>
                    <span className="font-bold text-slate-800 text-[11px]">Faculty REST API</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-150 pt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="font-semibold text-slate-600">Total Latency: 142ms</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  ✓ 99.4% Recognition Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button size="lg" variant="accent" className="shadow-xl shadow-indigo-500/30 font-bold px-8 h-13 rounded-2xl">
              <span>Try with your own report now</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
