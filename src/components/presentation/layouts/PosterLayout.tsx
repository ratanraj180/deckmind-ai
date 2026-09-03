'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function PosterLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden font-sans"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* ── Top Kicker ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: pal.border }}>
        <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: pal.accent }}>
          // {kicker}
        </span>
        <span className="text-xs font-mono opacity-50">POSTER KEYNOTE</span>
      </div>

      {/* ── Dominant Billboard Headline ─────────────────────────── */}
      <div className="my-auto py-2 space-y-4">
        <h2
          className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-none"
          style={{ color: pal.primary }}
        >
          {slide.title}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-xl font-medium opacity-80 max-w-3xl leading-snug" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}

        {/* 2 Focal Contrast Statement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {items.slice(0, 2).map((it, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold" style={{ color: pal.accent }}>
                  STATEMENT 0{idx + 1}
                </span>
                <h3 className="text-base font-bold leading-tight" style={{ color: pal.primary }}>
                  {it.title}
                </h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[10px] font-mono opacity-50" style={{ borderColor: pal.border }}>
        <span>{template.name.toUpperCase()} POSTER EDITION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
