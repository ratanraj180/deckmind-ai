'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function CorporateLayout({ slide, template }: LayoutProps) {
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
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: pal.accent }}>
            EXECUTIVE BRIEFING // {kicker}
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border" style={{ borderColor: pal.border, color: pal.secondary }}>
            STRATEGIC COMMITTEE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-80 leading-relaxed font-normal" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Symmetrical 3-Column Executive Strategy Cards ────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-3 items-stretch">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border flex flex-col justify-between shadow-xs relative"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
              style={{ backgroundColor: idx === 0 ? pal.accent : pal.secondary }}
            />

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase block opacity-60">
                PILLAR 0{idx + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold leading-tight" style={{ color: pal.primary }}>
                {it.title}
              </h3>
              <p className="text-xs opacity-75 leading-relaxed">
                {it.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-current/10 mt-3 flex items-center justify-between text-[10px]">
              <span className="font-mono opacity-50">ALIGNMENT</span>
              <span className="font-bold" style={{ color: pal.accent }}>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-50" style={{ borderColor: pal.border }}>
        <span>{template.name.toUpperCase()} STRATEGY DECK</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
