'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Network,
  GitBranch,
  BarChart3,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SlideOutputShowcase() {
  const [activeTab, setActiveTab] = useState<'arch' | 'flow' | 'results' | 'viva'>('arch');

  return (
    <section id="showcase" className="py-20 bg-slate-50/60 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 space-y-3">
          <Badge variant="indigo">Live Output Showcase</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See the visual intelligence in action
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Every concept is transformed into its most effective visual form. Click through below to
            see generated slides from an actual final-year engineering project report.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('arch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'arch'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Network className="h-4 w-4 text-indigo-400" />
            <span>Architecture Diagram</span>
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'flow'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <GitBranch className="h-4 w-4 text-indigo-400" />
            <span>Workflow & Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'results'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            <span>Results & Data</span>
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'viva'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="h-4 w-4 text-indigo-400" />
            <span>Viva Anticipated Q&A</span>
          </button>
        </div>

        {/* 16:9 Interactive Slide Preview Frame */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-lg shadow-slate-100">
          <div className="aspect-[16/9] w-full rounded-xl border border-slate-150 bg-white p-6 sm:p-10 flex flex-col justify-between overflow-hidden relative">
            {/* Top Slide Meta Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>SMART ATTENDANCE SYSTEM</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">FINAL YEAR VIVA DEFENSE</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {activeTab === 'arch' && 'SLIDE 4 OF 10'}
                {activeTab === 'flow' && 'SLIDE 5 OF 10'}
                {activeTab === 'results' && 'SLIDE 6 OF 10'}
                {activeTab === 'viva' && 'SLIDE 8 OF 10'}
              </div>
            </div>

            {/* Slide Body Content dynamically rendered based on activeTab */}
            <div className="my-auto py-4">
              {activeTab === 'arch' && (
                <div className="space-y-6">
                  <div>
                    <Badge variant="indigo" className="mb-2">
                      System Architecture
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Decoupled Edge-to-Cloud System Architecture
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Raw RTSP camera streams are processed strictly within on-premise hardware
                      nodes
                    </p>
                  </div>

                  {/* Visual Node Diagram */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                        Input Sensor
                      </span>
                      <div className="text-xs font-bold text-slate-800">Sony IMX477 12MP</div>
                      <div className="text-[10px] text-slate-500 mt-1">4K @ 30fps RTSP feed</div>
                    </div>

                    <div className="rounded-xl border-2 border-indigo-500 bg-indigo-50/40 p-4 text-center shadow-xs">
                      <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold block mb-1">
                        Edge Compute
                      </span>
                      <div className="text-xs font-bold text-indigo-950">NVIDIA Jetson Nano</div>
                      <div className="text-[10px] text-indigo-700 font-medium mt-1">
                        128-core Maxwell GPU
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                        Local DB
                      </span>
                      <div className="text-xs font-bold text-slate-800">FAISS + SQLite</div>
                      <div className="text-[10px] text-slate-500 mt-1">Sub-ms L2 Similarity</div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                        Sync
                      </span>
                      <div className="text-xs font-bold text-slate-800">Faculty Cloud API</div>
                      <div className="text-[10px] text-slate-500 mt-1">SMS & Attendance Log</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'flow' && (
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Execution Pipeline
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Frame-to-Attendance Pipeline & Latency Breakdown
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Total latency: 142 ms • Optimized with TensorRT FP16 quantization
                    </p>
                  </div>

                  {/* Flowchart Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 text-left">
                    {[
                      { step: '1', name: 'Frame Grab', time: '12ms', tech: 'OpenCV CUDA' },
                      { step: '2', name: 'Face Detect', time: '38ms', tech: 'MTCNN' },
                      { step: '3', name: 'Alignment', time: '8ms', tech: 'Affine Transform' },
                      { step: '4', name: '128-D Vector', time: '64ms', tech: 'FaceNet Triplet' },
                      { step: '5', name: 'Verification', time: '20ms', tech: 'LBP Anti-Spoof' },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-indigo-600 font-bold">
                            STEP 0{s.step}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-0.5">{s.name}</h4>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">{s.tech}</span>
                          <span className="font-mono font-bold text-indigo-600">{s.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-6">
                  <div>
                    <Badge variant="success" className="mb-2">
                      Empirical Benchmarks
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Performance Metrics Across 240 Classroom Sessions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Sub-150ms latency with zero false attendances recorded during pilot phase
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900">99.4%</div>
                      <div className="text-xs text-slate-500 mt-1">Overall Accuracy</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-indigo-600">142 ms</div>
                      <div className="text-xs text-slate-500 mt-1">Pipeline Latency</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-emerald-600">0.008%</div>
                      <div className="text-xs text-slate-500 mt-1">False Acceptance</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900">₹18,500</div>
                      <div className="text-xs text-slate-500 mt-1">Total Unit BOM</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'viva' && (
                <div className="space-y-4">
                  <div>
                    <Badge variant="warning" className="mb-2">
                      Viva Defense Anticipation
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900">
                      AI-Predicted Technical Questions for the Viva Examiner
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Equips students with solid mathematical justifications before facing the
                      external panel
                    </p>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white font-mono">
                        Q
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        How does your model prevent photo/video spoofing on a smartphone screen?
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-indigo-100/60 text-xs text-slate-600">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white font-mono shrink-0">
                        A
                      </span>
                      <p>
                        We implemented Local Binary Pattern (LBP) texture analysis and specular
                        reflection detection. Phone screens exhibit distinctive moiré patterns and
                        high spectral reflectivity that fail our liveness classifier before
                        embedding calculation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Slide Speaker Notes Bar */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Includes AI Speaker Notes & Defense Tips
              </span>
              <span className="font-mono">16:9 Widescreen • Vector PPTX</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to try own document */}
        <div className="mt-10 text-center">
          <Link href="/dashboard">
            <Button size="md" variant="primary">
              <span>Generate slides for your document</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
