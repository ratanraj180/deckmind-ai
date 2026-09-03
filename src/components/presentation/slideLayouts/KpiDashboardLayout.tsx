'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function KpiDashboardLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const metrics = Array.isArray(content.metrics) && content.metrics.length > 0
    ? content.metrics
    : [
        { label: 'Classification Accuracy', value: '99.4%', delta: '+6.2%' },
        { label: 'End-to-End Latency', value: '42ms', delta: 'P99 SLA' },
        { label: 'Throughput Speedup', value: '4.8x', delta: 'vs CPU Base' },
      ];

  const benchmarks = Array.isArray(content.benchmarks) && content.benchmarks.length > 0
    ? content.benchmarks
    : [
        { label: 'Face Detection (RetinaFace)', value: '18ms', change: 'FP16 CUDA acceleration' },
        { label: 'Vector Index Match (FAISS)', value: '1.2ms', change: 'Sub-linear L2 distance' },
      ];

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{ color: pal.text }}
    >
      {/* Slide Header */}
      <div className={`border-b pb-3 ${isBrutalist ? 'border-b-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: pal.accent }}>
            // EMPIRICAL VALIDATION & KPI DASHBOARD
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border" style={{ borderColor: pal.border, color: pal.accent }}>
            VERIFIED 10,000 CYCLES
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* KPI Dashboard Metrics Grid */}
      <div className="my-auto py-2 space-y-3 flex-1 flex flex-col justify-center">
        {/* Top 3 Dominant Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {metrics.slice(0, 3).map((m: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 text-center flex flex-col justify-center ${
                isBrutalist
                  ? 'border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="text-2xl sm:text-4xl font-mono font-black tracking-tight" style={{ color: pal.accent }}>
                  {m.value}
                </span>
              </div>
              <span className="text-xs font-bold block" style={{ color: pal.primary }}>
                {m.label}
              </span>
              <span className="text-[9px] font-mono opacity-60 mt-0.5 block">
                {m.delta || m.sub || 'Empirical Result'}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom 2 Detailed Benchmark Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benchmarks.slice(0, 2).map((b: any, idx: number) => (
            <div
              key={idx}
              className={`p-3.5 flex items-center justify-between ${
                isBrutalist
                  ? 'border border-black bg-slate-50'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <div>
                <span className="text-[10px] font-mono opacity-50 block uppercase">STAGE 0{idx + 1}</span>
                <span className="text-xs font-bold" style={{ color: pal.primary }}>{b.label}</span>
                <span className="text-[10px] opacity-70 block">{b.change || 'Validated SLA'}</span>
              </div>
              <span className="text-base sm:text-lg font-mono font-black" style={{ color: pal.primary }}>
                {b.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>QUANTITATIVE PERFORMANCE TELEMETRY</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
