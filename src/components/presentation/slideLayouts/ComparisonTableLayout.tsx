'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ComparisonTableLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const rows = Array.isArray(content.rows) && content.rows.length > 0
    ? content.rows
    : [
        { dimension: '01. Execution Latency', baseline: 'Manual / High latency (2-5 sec)', proposed: 'Deterministic Real-Time (< 50ms)', status: '30x Faster' },
        { dimension: '02. System Throughput', baseline: 'Single-thread bottleneck', proposed: 'Multi-stream concurrent pipeline', status: '4.8x Scale' },
        { dimension: '03. Error Overhead', baseline: 'Heuristic drift / 12-15% variance', proposed: 'Calibrated algorithmic SLA (99.2%)', status: 'Zero-Drift' },
        { dimension: '04. Operational Cost', baseline: 'High maintenance and manual oversight', proposed: 'Automated micro-architecture', status: '75% Savings' },
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
            // COMPARATIVE BENCHMARK MATRIX
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
            HEAD-TO-HEAD AUDIT
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isEditorial ? 'font-serif capitalize' : ''}`} style={{ color: pal.primary }}>
          {slide.title || 'Baseline vs Proposed Architecture'}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Side-by-Side Comparison Table Matrix */}
      <div
        className={`my-auto p-4 flex-1 flex flex-col justify-between ${
          isBrutalist
            ? 'border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            : 'rounded-xl border'
        }`}
        style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 pb-2 border-b border-current/15 text-[10px] font-mono font-bold uppercase opacity-60">
          <span className="col-span-3">CRITERIA</span>
          <span className="col-span-4 text-rose-500">LEGACY BASELINE</span>
          <span className="col-span-5 text-emerald-600">PROPOSED SOLUTION</span>
        </div>

        {/* Table Rows */}
        <div className="flex-1 flex flex-col justify-between py-1">
          {rows.slice(0, 4).map((r: any, idx: number) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 items-center py-2 px-1 text-xs border-b last:border-0 ${
                idx % 2 === 0 ? 'bg-current/2' : ''
              }`}
              style={{ borderColor: pal.border }}
            >
              <span className="col-span-3 font-bold truncate" style={{ color: pal.primary }}>
                {r.dimension || r.aspect}
              </span>
              <span className="col-span-4 opacity-75 truncate text-[11px]">
                {r.baseline || r.before}
              </span>
              <div className="col-span-5 flex items-center justify-between gap-2">
                <span className="font-semibold truncate text-[11px]" style={{ color: pal.accent }}>
                  {r.proposed || r.after}
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {r.status || 'Verified'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>ARCHITECTURAL BENCHMARKING</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
