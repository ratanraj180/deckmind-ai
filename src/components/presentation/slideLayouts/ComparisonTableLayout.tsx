'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ComparisonTableLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const rows = [
    { dimension: 'Inference Latency', baseline: '1,250ms (Cloud roundtrip)', proposed: '42ms (Embedded edge FP16)', status: '30x Faster' },
    { dimension: 'Network Dependency', baseline: 'Requires 24/7 internet link', proposed: 'Fully air-gapped autonomous', status: 'Offline Ready' },
    { dimension: 'Privacy & Security', baseline: 'Biometrics streamed to cloud', proposed: 'On-device FAISS vector store', status: 'Zero-Trust' },
    { dimension: 'Hardware BOM Cost', baseline: '$1,400+ dedicated server', proposed: '$180 edge single-board compute', status: '87% Savings' },
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
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
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
          {rows.map((r, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 items-center py-2 px-1 text-xs border-b last:border-0 ${
                idx % 2 === 0 ? 'bg-current/2' : ''
              }`}
              style={{ borderColor: pal.border }}
            >
              <span className="col-span-3 font-bold truncate" style={{ color: pal.primary }}>
                {r.dimension}
              </span>
              <span className="col-span-4 text-[11px] opacity-70 truncate text-rose-700">
                ✕ {r.baseline}
              </span>
              <div className="col-span-5 flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-emerald-600 truncate">
                  ✓ {r.proposed}
                </span>
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase shrink-0 hidden sm:inline"
                  style={{ backgroundColor: pal.accent + '15', color: pal.accent }}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>ARCHITECTURAL TRADE-OFF ANALYSIS</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
