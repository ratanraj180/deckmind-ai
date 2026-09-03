'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function DashboardLayout({ slide, template }: LayoutProps) {
  const { items, metrics, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  const displayMetrics = metrics.slice(0, 3);
  const bottomItems = items.slice(0, 2);

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden font-sans"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3" style={{ borderColor: pal.border }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: pal.accent }}>
            // {kicker} • DATA TELEMETRY
          </span>
          <span className="text-[10px] font-mono opacity-60">LIVE BENCHMARKS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Dashboard Content ───────────────────────────────────── */}
      <div className="my-auto py-2 space-y-4 flex-1 flex flex-col justify-center">
        {/* Top Row: 3 Dominant Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {displayMetrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border flex flex-col justify-center text-center relative shadow-sm"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <span className="text-2xl sm:text-4xl font-mono font-black" style={{ color: pal.accent }}>
                {m.value}
              </span>
              <span className="text-xs font-bold mt-1" style={{ color: pal.primary }}>
                {m.label}
              </span>
              <span className="text-[9px] font-mono opacity-60 mt-0.5">
                Empirically Validated
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Row: 2 Comparison Analysis Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bottomItems.map((it, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase" style={{ color: pal.accent }}>
                  DIMENSION 0{idx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                  {it.title}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-50" style={{ borderColor: pal.border }}>
        <span>DATA METRICS ENGINE • {template.name.toUpperCase()}</span>
        <span>PAGE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
