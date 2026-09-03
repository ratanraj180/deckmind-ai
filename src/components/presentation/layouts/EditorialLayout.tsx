'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function EditorialLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden font-serif"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* ── Slide Header: Elegant Serif Crest ────────────────────── */}
      <div className="border-b pb-3 text-center space-y-1" style={{ borderColor: pal.border }}>
        <span
          className="text-[10px] font-sans font-bold tracking-widest uppercase block"
          style={{ color: pal.accent }}
        >
          {kicker} • VOLUME 2026
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm font-sans italic opacity-75 max-w-xl mx-auto leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Two-Column Editorial Spread ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-auto py-4 items-stretch font-sans">
        {/* Left Editorial Narrative */}
        <div
          className="p-5 rounded-xl border flex flex-col justify-between"
          style={{
            backgroundColor: pal.cardBg,
            borderColor: pal.border,
          }}
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold" style={{ color: pal.accent }}>
              PRIMARY THESIS // 01
            </span>
            <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: pal.primary }}>
              {items[0]?.title}
            </h3>
            <p className="text-xs leading-relaxed opacity-80">
              {items[0]?.desc}
            </p>
          </div>
          <div className="pt-3 border-t border-current/10 text-[9px] font-mono opacity-50">
            EMPIRICALLY VALIDATED HYPOTHESIS
          </div>
        </div>

        {/* Right Secondary Commentary Pillars */}
        <div className="flex flex-col gap-3 justify-between">
          {items.slice(1, 3).map((it, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border flex-1 flex flex-col justify-center"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <span className="text-[9px] font-mono opacity-50 font-bold">SECTION 0{idx + 2}</span>
              <h4 className="font-serif text-sm font-bold leading-tight mt-0.5" style={{ color: pal.primary }}>
                {it.title}
              </h4>
              <p className="text-xs opacity-75 leading-relaxed mt-1">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer: Formal Footnote ───────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-sans opacity-50" style={{ borderColor: pal.border }}>
        <span>{template.name} • Academic & Editorial Edition</span>
        <span>Page {slide.slideNumber}</span>
      </div>
    </div>
  );
}
