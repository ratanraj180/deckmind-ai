'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function KpiDashboardLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const metrics = Array.isArray(content.metrics) && content.metrics.length > 0
    ? content.metrics
    : [
        { label: 'System Reliability', value: '99.4%', delta: '+6.2% vs Baseline' },
        { label: 'Response Latency', value: '< 45ms', delta: 'Deterministic SLA' },
        { label: 'Throughput Gain', value: '4.8x', delta: 'Multi-stream execution' },
      ];

  const benchmarks = Array.isArray(content.benchmarks) && content.benchmarks.length > 0
    ? content.benchmarks
    : [
        { label: metrics[0]?.label || 'Processing Latency', value: metrics[0]?.value || '42ms', change: 'Validated benchmark' },
        { label: metrics[1]?.label || 'Classification SLA', value: metrics[1]?.value || '99.2%', change: 'Empirical verification' },
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
            VERIFIED TELEMETRY
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isEditorial ? 'font-serif capitalize' : ''}`} style={{ color: pal.primary }}>
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
                  : 'rounded-2xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <span className="text-[9px] font-mono font-bold uppercase opacity-60 tracking-wider">
                {m.label}
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono my-1 tracking-tight" style={{ color: pal.accent }}>
                {m.value}
              </span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {m.delta || '+Verified SLA'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Micro-Benchmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benchmarks.slice(0, 2).map((b: any, idx: number) => (
            <div
              key={idx}
              className={`p-3 flex items-center justify-between ${
                isBrutalist
                  ? 'border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <div>
                <span className="text-xs font-bold block" style={{ color: pal.primary }}>
                  {b.label}
                </span>
                <span className="text-[10px] opacity-70 block">{b.change}</span>
              </div>
              <span className="text-base font-mono font-bold px-2 py-1 rounded" style={{ color: pal.accent, backgroundColor: pal.background }}>
                {b.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>EMPIRICAL TELEMETRY AUDIT</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
