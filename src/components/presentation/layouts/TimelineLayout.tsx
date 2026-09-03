'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function TimelineLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

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
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: pal.accent }}>
          // {kicker} • CHRONOLOGICAL PROGRESSION
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Horizontal Connected Timeline Flow ──────────────────── */}
      <div className="my-auto py-4 flex-1 flex flex-col justify-center">
        {/* Progress connecting track */}
        <div className="relative">
          <div
            className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 z-0"
            style={{ backgroundColor: pal.border }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 items-stretch">
            {items.slice(0, 3).map((it, idx) => (
              <div key={idx} className="space-y-3">
                {/* Milestone Node */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-xs text-white shadow-sm"
                    style={{ backgroundColor: pal.accent }}
                  >
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase opacity-60">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                {/* Milestone Card */}
                <div
                  className="p-4 rounded-xl border flex flex-col justify-between h-44"
                  style={{
                    backgroundColor: pal.cardBg,
                    borderColor: pal.border,
                  }}
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                      {it.title}
                    </h4>
                    <p className="text-xs opacity-75 leading-relaxed line-clamp-4">
                      {it.desc}
                    </p>
                  </div>
                  {it.tag && (
                    <span
                      className="text-[9px] font-mono self-start mt-2 px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
                    >
                      {it.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-50" style={{ borderColor: pal.border }}>
        <span>ROADMAP & TIMELINE HORIZON • {template.name.toUpperCase()}</span>
        <span>STAGE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
