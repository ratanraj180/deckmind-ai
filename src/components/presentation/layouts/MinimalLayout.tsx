'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function MinimalLayout({ slide, template }: LayoutProps) {
  const { items, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden font-sans"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* ── Slide Header: Massive Typographic Focus ─────────────── */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base opacity-70 max-w-2xl font-normal leading-relaxed pt-1" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Minimalist 3-Pillar Breathing Canvas ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-auto py-4 items-stretch">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border flex flex-col justify-between transition-all"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
            }}
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest block opacity-40">
                // 0{idx + 1}
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: pal.primary }}>
                {it.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                {it.desc}
              </p>
            </div>

            {it.tag && (
              <div className="pt-4 border-t border-current/10 mt-4">
                <span className="text-[10px] font-mono font-semibold" style={{ color: pal.accent }}>
                  {it.tag}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Slide Footer: Hairline Separation ───────────────────── */}
      <div className="flex items-center justify-between border-t pt-3 text-[10px] opacity-40 font-medium" style={{ borderColor: pal.border }}>
        <span>{template.name}</span>
        <span>{slide.slideNumber}</span>
      </div>
    </div>
  );
}
